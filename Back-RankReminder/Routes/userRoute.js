import express from 'express';
import getDb from '../db.js';
import bcrypt from 'bcrypt';

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

        const hasshedPass = await bcrypt.hash(password, 10);

        await db.collection("Users").insertOne({id:id, username:username, email:email, tier:"Free", password:hasshedPass, credits:150});

        res.send('success');

    }

    insertUser();


})


router.post('/login', (req,res)=>{

const email = req.body.email;
const password = req.body.password;


async function loginUser() {

const user = await db.collection("Users").findOne({email: email});

if(!user)
{
    return res.send('NoUser');
}

const passMatch = await bcrypt.compare(password, user.password);

if(!passMatch)
{
    return res.send('WrongPass');
}
else{
    return res.send({status:'success', username:user.username, tier:user.tier, id:user.id});    
}

}

loginUser();



})


router.get('/details/:uid', (req,res)=>{

    const uid = parseInt(req.params.uid);

    async function getUserDetails() {

    const user = await db.collection("Users").findOne({id: uid});

        return res.send(user);

    }
    
    getUserDetails();   


    })


router.post('/change/password', (req,res)=>{

    const cpass = req.body.cpass;
    const npass = req.body.npass;
    const uid = parseInt(req.body.uid);


    async function changePassword() {

        const user = await db.collection("Users").findOne({id: uid});

        const passmatch = await bcrypt.compare(cpass, user.password);

        if(!passmatch)
        {
            return res.send('WrongPass');
        }
        else{
            const hasshedPass = await bcrypt.hash(npass, 10);
            await db.collection("Users").updateOne({id:uid},{$set:{password:hasshedPass}});

        }

        

        return res.send('success');


    }    
    changePassword();


})


router.post('/deactivate/account', async(req,res)=>{

    const uid = req.body.uid;


    async function deleteAcc()
    {
        await db.collection("Users").deleteOne({id:parseInt(uid)});

        await db.collection("Urls").deleteMany({uid:uid});

        return res.send('success');

    }

    deleteAcc();

})




export default router;


