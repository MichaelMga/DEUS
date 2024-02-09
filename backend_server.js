const { Client } = require('pg');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require("dotenv");
const crypto = require('crypto');


dotenv.config()

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());


app.post('/login', async (req, res) => {
    const postData = req.body;

    if(!postData?.user){
        res.status(400);
    } else {
        
     const userHash = await hashValue(postData?.user);
     const user = await tryTofindUser(userHash);

     res.status(user ? 200 : 400);
     res.send(user? postData?.user + " identifié" : "Utilisateur non identifié" );

    }
});

app.post('/register', async (req, res) => {
    const postData = req.body;

    if(!postData?.user){
        res.status(400);
    } else {
        const userHash = await hashValue(postData.user, 10);
        
        if(await tryTofindUser(userHash)){
            res.status(400);            
        } else {
            insertUser(userHash);
            res.status(200);
        }
    }

});


app.listen(3000, () => {
    connectDB();
    console.log('Server is running on port 3000');
});

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'DEUS_DB',
    password: 'psql',
    port: 5432, 
});

async function connectDB() {
    try {
        await client.connect();
    } catch (err) {
        console.error('Error connecting to the database', err);
    } 
}

const insertUser = async (user) => {

    try {
        if(!client){
            console.log("sorry, we could not reach your database");
            return;
         }
     
         await client.query('INSERT INTO users(mail) VALUES($1::text)', [user]);
    } catch(e) {
        console.log(e);
    }

}

const hashValue = (value) => {
    return crypto.createHash('sha256').update(value).digest('hex');
}


const tryTofindUser = async (user) => {

    try {
        if(!client){
            console.log("sorry, we could not reach your database");
            return;
         }

        const result = await client.query('SELECT * FROM users WHERE mail=$1::text;', [user]);    

        console.log("rows >>")
        
        console.log(result.rows);
         
        return result.rows.length > 0; 
    
    } catch(e) {
        console.log(e);
    }

}