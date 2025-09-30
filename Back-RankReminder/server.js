import express from 'express';
import userRoute from './Routes/userRoute.js';
import urlRoute from './Routes/urlRoute.js';

const app = express();

app.use(express.json());




app.get('/', (req, res) => {

    res.send('Hello World!');
});


app.use('/api/url', urlRoute); // URL Routes

app.use('/api/user', userRoute); // User Routes




app.listen(3000, () => {
  console.log('Server is running on port 3000');
});