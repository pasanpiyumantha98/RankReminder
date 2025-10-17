import express from 'express';
import getDb from '../db.js';

const db = await getDb();

const router = express.Router();


// Registering Users
router.post('/insert', (req, res) => {

    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;



    async function insertUser() {


        const lastUser = await db.collection("Users").find().sort({id:-1}).limit(1).toArray();  

        let id;

        if(lastUser.length === 0) {
             id = 1; // If no users, start with id 1
        } else {
                 id = lastUser[0].id + 1 || 1;
        }

        const userExsists = await db.collection("Users").findOne({username: username});
        if(userExsists) {
            res.send('UnameExists');
            return;
        }

        const emailExists = await db.collection("Users").findOne({email: email});
        if(emailExists) {
            res.send('EmailExists');
            return;
        }

        await db.collection("Users").insertOne({id:id, username:username, email:email, tier:"Free", password:password});

        res.send('success');

    }

    insertUser();


})







export default router;


