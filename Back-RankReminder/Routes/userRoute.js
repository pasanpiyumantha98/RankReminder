import express from 'express';
import getDb from '../db.js';

const db = await getDb();

const router = express.Router();


// Registering Users
router.post('/insert', (req, res) => {

    const fname = req.body.fname;
    const lname = req.body.lname;
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

        await db.collection("Users").insertOne({id:id, fname:fname, lname:lname, tier:"Free", email:email, password:password});

        res.send('User inserted successfully');

    }

    insertUser();


})







export default router;


