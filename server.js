const { Client } = require('pg');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use(cors());


app.post('/login', async (req, res) => {
    const postData = req.body;

    console.log(req);

    const user = await tryTofindUser(postData?.user);
    res.status(user ? 200 : 400);
    res.send(user? postData?.user + " identifié" : "Utilisateur non identifié" );
});

app.post('/register', (req, res) => {
    const postData = req.body;

    if(postData){
       insertUser(postData?.user);
    }

    res.send('POST request received');
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


const tryTofindUser = async (user) => {

    try {
        if(!client){
            console.log("sorry, we could not reach your database");
            return;
         }
     
         const result = await client.query('SELECT * FROM users WHERE mail=$1::text;', [user]);
        return result.rows.length > 0; 
    
    } catch(e) {
        console.log(e);
    }

}