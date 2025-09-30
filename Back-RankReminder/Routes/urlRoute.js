import express from 'express';
import getDb from '../db.js';

const db = await getDb();
const router = express.Router();


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

export default router;