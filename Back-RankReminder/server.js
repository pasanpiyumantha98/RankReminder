import express from 'express';
import fs from 'fs';


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









app.listen(3000, () => {
  console.log('Server is running on port 3000');
});