import express from 'express';
import getDb from '../db.js';
import axios from 'axios';

const db = await getDb();
const router = express.Router();




// Inserting URLs
router.post('/insert', (req, res) => {

    const uid = req.body.uid;
    const url = req.body.url;
    const location = req.body.location;
    const query = req.body.query;

    console.log("recieve", uid, url, location, query);

    async function insert() {

        const lastUrl = await db.collection("Urls").find().sort({ id: -1 }).limit(1).toArray();

        let id;

        if(lastUrl.length === 0) {
            id = 1; 
        } else {
            id = lastUrl[0].id + 1 || 1;
        }

        

        await db.collection("Urls").insertOne({id:id, uid:uid, url: url, location: location, query: query, lastChecked: "NA", nrank: "NA", prank:"NA"});
        res.send('success');

    }

    insert();

});

// Deleting URLs
router.delete('/delete/:id', async (req, res) => {
    const id  = Number(req.params.id);
    if (!id) {
        return res.status(400).send('Missing URL id');
    }
    try {
        const result = await db.collection("Urls").deleteOne({ id: id });
        if (result.deletedCount === 0) {
            return res.status(404).send('URL not found');
        }
        res.status(200).send('URL deleted successfully');
    } catch (err) {
        res.status(500).send('Error deleting URL');
    }
});

router.get('/findall/:uid', async (req, res) => {

  const uid = req.params.uid;

  try{

    const response = await db.collection("Urls").find({uid:uid}).toArray();
    
    if(response.length === 0){
      return res.status(404).send('No URLs found for this user');
    }

    res.json(response);

  } catch(err){
    res.status(500).send('Error fetching URLs');
  }


});






router.post("/rank/check/manual", async (req, res) => {
  try {
    const query = String(req.body.query || "").trim();
    const gl = String(req.body.location || "us").toLowerCase(); // e.g. "lk"
    const targetUrl = String(req.body.url || "").trim();
    const uid = parseInt(req.body.uid);

    if (!query || !targetUrl) {
      return res.status(400).json({ error: "query and url are required" });
    }

    const PAGE_SIZE = 10;     // Serper usually returns 10 organic results
    const MAX_RESULTS = 90;   // search up to the top 90 (pages 1..9)
    const USE_PAGE_FALLBACK = true; // try {page:N} if {start:offset} yields empty

    // Build a lenient “key” for equality:
    // - protocol-agnostic
    // - strips "www."
    // - strips query + hash
    // - normalizes trailing slash
    // Then compare host + path.
    const toKey = (u) => {
      try {
        const url = new URL(u);
        let host = url.hostname.toLowerCase();
        if (host.startsWith("www.")) host = host.slice(4);
        let path = url.pathname || "/";
        if (path.length > 1 && path.endsWith("/")) path = path.slice(0, -1);
        return `${host}${path}`;
      } catch {
        return String(u).trim().toLowerCase();
      }
    };

    const targetKey = toKey(targetUrl);

    // Allow matches where either key is a prefix of the other (handles harmless extras)
    const isMatch = (candidateLink) => {
      const k = toKey(candidateLink);
      if (k === targetKey) return true;
      return k.startsWith(targetKey) || targetKey.startsWith(k);
    };

    const fetchPage = async ({ start, page }) => {
      const body = {
        q: query,
        gl: gl,
        hl: "en",
        num: String(PAGE_SIZE),
      };
      if (typeof start === "number") body.start = String(start); // 0,10,20...
      if (typeof page === "number") body.page = String(page);    // 1,2,3...

      const resp = await axios.post("https://google.serper.dev/search", body, {
        headers: {
          "X-API-KEY": process.env.SERPER_API_KEY || "dc224c31193c095ccf61310ce371aba75df40e47",
          "Content-Type": "application/json",
        },
        maxBodyLength: Infinity,
      });

      const serp = Array.isArray(resp?.data?.organic) ? resp.data.organic : [];
      return serp;
    };

    const user = await db.collection("Users").findOne({id:uid});

    

    const  newCredits = user?.credits - 1;

    await db.collection("Users").updateOne(
      { id: uid },
      {$set: { credits: newCredits }}
    );

    for (let start = 0; start < MAX_RESULTS; start += PAGE_SIZE) {
      // Primary attempt: offset-based pagination
      let serp = await fetchPage({ start });

      // Fallback: some plans/endpoints prefer page-based pagination (1-based)
      if (USE_PAGE_FALLBACK && (!serp || serp.length === 0)) {
        const page = Math.floor(start / PAGE_SIZE) + 1;
        serp = await fetchPage({ page });
      }

      if (!serp || serp.length === 0) break; // no more results

      // DEBUG: uncomment to see each page’s links
      // console.log("PAGE", { start, links: serp.map(s => s.link) });

      // First try robust key match
      let idx = serp.findIndex(item => isMatch(item.link));
      // Last-chance hard equality
      if (idx === -1) idx = serp.findIndex(item => item.link === targetUrl);

      if (idx !== -1) {
        const item = serp[idx];
        const absolute = Number.isFinite(item?.position) ? item.position : null;
        const computed = start + idx + 1; // 1-based across pages
        const rank = absolute ?? computed;
        return res.json({
          found: true,
          rank,
          page: Math.floor((rank - 1) / PAGE_SIZE) + 1,
          link: item.link,
          title: item.title,
          snippet : item.snippet,
        });
      }

      // (optional) polite delay to avoid rate limits
      await new Promise(r => setTimeout(r, 150));
    }

    return res.json({ found: false, message: `Not in Top ${MAX_RESULTS}`, rank: null });
  } catch (err) {
    console.error(err?.response?.data || err.message);
    return res.status(500).json({ error: "Failed to check rank" });
  }
});



router.get('/rank/check/home/:uid', async (req, res) => {


const uid = req.params.uid;  

const uidd = parseInt(uid);

const urls = await db.collection("Urls").find({uid:uid}).toArray();

 //Update user credits
    
    const user = await db.collection("Users").findOne({id:uidd});
    const  newCredits = user?.credits - urls.length;

    await db.collection("Users").updateOne(
      { id: uidd },
      {$set: { credits: newCredits }}
    );
    //

if(urls.length === 0)
{
  return res.status(404).send('No URLs found for this user');
}

for (const urlObj of urls) {
  const query = String(urlObj.query || "").trim();
  const gl = String(urlObj.location || "us").toLowerCase();
  const targetUrl = String(urlObj.url || "").trim();
  const id = urlObj.id;

  try {
    // Call the same Serper API you use in /rank/check/manual
    const body = {
      q: query,
      gl: gl,
      hl: "en",
      num: "10",
    };

    const resp = await axios.post("https://google.serper.dev/search", body, {
      headers: {
        "X-API-KEY": process.env.SERPER_API_KEY || "dc224c31193c095ccf61310ce371aba75df40e47",
        "Content-Type": "application/json",
      },
    });

    const serp = Array.isArray(resp?.data?.organic) ? resp.data.organic : [];

    // Function to normalize URLs for comparison
    const toKey = (u) => {
      try {
        const url = new URL(u);
        let host = url.hostname.toLowerCase();
        if (host.startsWith("www.")) host = host.slice(4);
        let path = url.pathname || "/";
        if (path.length > 1 && path.endsWith("/")) path = path.slice(0, -1);
        return `${host}${path}`;
      } catch {
        return String(u).trim().toLowerCase();
      }
    };

   

    const targetKey = toKey(targetUrl);
    const isMatch = (candidate) => {
      const k = toKey(candidate);
      return k === targetKey || k.startsWith(targetKey) || targetKey.startsWith(k);
    };

    // Find the rank
    let idx = serp.findIndex(item => isMatch(item.link));
    if (idx === -1) idx = serp.findIndex(item => item.link === targetUrl);

    let rank = "NA";
    if (idx !== -1) {
      const item = serp[idx];
      rank = item.position || idx + 1; // if position not given, compute manually
    }

    const doc = await db.collection("Urls").findOne({ id: id });
    
    const prank = doc?.nrank || "NA"; // previous rank

    // Update this single URL’s rank and lastChecked
    await db.collection("Urls").updateOne(
      { id: id },
      {
        $set: {
          prank: prank,
          nrank: rank,
          lastChecked: new Date().toLocaleString(),
        },
      }
    );

   
  } catch (err) {
    console.error(`❌ Error checking rank for ${targetUrl}:`, err.message);
  }

  // Optional delay to prevent hitting rate limits
  await new Promise((resolve) => setTimeout(resolve, 150));
}

   return res.json( "Rankings Updated" );

});



export default router;