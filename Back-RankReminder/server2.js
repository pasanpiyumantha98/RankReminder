
import { MongoClient, ServerApiVersion }from 'mongodb';
import dns from "node:dns";
dns.setServers(["1.1.1.1", "8.8.8.8"]);


const uri = "mongodb+srv://pasanpiyumantha98_db_user:ofRC6ikOUBpbUwwN@cluster0.kzo6buv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("RankReminder").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
