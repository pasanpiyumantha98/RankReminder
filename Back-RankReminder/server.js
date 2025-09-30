import express from 'express';
import fs from 'fs';

import getDb from './db.js';

const db = await getDb();

console.log("Connected to MongoDB");


const app = express();

app.use(express.json());

app.get('/', (req, res) => {

    res.send('Hello World!');
});



app.get('/api/users', (req, res) => {
    
 fs.readFile('txts/user.txt', 'utf-8', (err,data) =>{

    if(err)
        res.send('Error reading file');
    else
        res.send(data);
 });


});


 app.post('/api/users/add', (req, res) => {

    const name = req.body.name;

    fs.appendFile('txts/user.txt', `\n${name}`, (err) => {
        if(err)
            res.send('Error writing to file');
        else
            res.send('User added successfully');

    })

});


app.post('/api/url/insert', (req,res) =>{


    
    const uid = req.body.uid;
    const url = req.body.url;
    const location = req.body.location;
    const keyword = req.body.keyword;




    async function run() {

        const lastUrl = await db.collection("Urls").find().sort({ id: -1 }).limit(1).toArray();

        const id = lastUrl[0].id + 1 || 1; // If no documents, start with id 1

        await db.collection("Urls").insertOne({id:id, uid:uid, url: url, location: location, keyword: keyword});
        res.send('URL inserted successfully');


    }

    run();



});









app.listen(3000, () => {
  console.log('Server is running on port 3000');
});