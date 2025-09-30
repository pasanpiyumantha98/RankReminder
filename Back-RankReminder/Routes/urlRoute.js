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
    const keyword = req.body.keyword;

    async function insert() {

        const lastUrl = await db.collection("Urls").find().sort({ id: -1 }).limit(1).toArray();

        let id;

        if(lastUrl.length === 0) {
            id = 1; 
        } else {
            id = lastUrl[0].id + 1 || 1;
        }

        

        await db.collection("Urls").insertOne({id:id, uid:uid, url: url, location: location, keyword: keyword});
        res.send('URL inserted successfully');

    }

    insert();

});

// Deleting URLs
router.post('/delete', async (req, res) => {
    const { id } = req.body;
    if (!id) {
        return res.status(400).send('Missing URL id');
    }
    try {
        const result = await db.collection("Urls").deleteOne({ id: id });
        if (result.deletedCount === 0) {
            return res.status(404).send('URL not found');
        }
        res.send('URL deleted successfully');
    } catch (err) {
        res.status(500).send('Error deleting URL');
    }
});



// Checking Rank Manually After Entering Details
router.post('/rank/check/manual', async (req, res) => {

    let query = req.body.query;
    let location = req.body.location;
    const url = req.body.url;

    let data = JSON.stringify({
    q: query,
    gl: location
});

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://google.serper.dev/search',
  headers: { 
    'X-API-KEY': 'dc224c31193c095ccf61310ce371aba75df40e47', 
    'Content-Type': 'application/json'
  },
  data : data
};

async function makeRequest() {
  try {
    const response = await axios.request(config);

    const serp = response.data.organic; // Dealing with the organic components of the search results array


    let result = serp.find(item => item.link == url);

    res.send(String(result?.position ?? 9999) ); //return 9999 if not found

    }
  catch (error) {
    res.send("error");
  }
    
    
  
}

makeRequest();




})


export default router;