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


app.get('/projects', async (req, res) => {
    const data = req.query;
  
    if(!data?.user){
        console.log('quitting early')
        res.status(400);
    } else {
        const userHash = await hashValue(data.user, 10);
        
        if(!await tryTofindUser(userHash)){
            res.status(400);  
            console.log("no")          
        } else {
            res.status(200);
            const projects = await getProjects(userHash);  
            res.send({
                projects
            })

           
        }
    }

});

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
        const userPassword = await hashValue(postData.password, 10)
        
        if(await tryTofindUser(userHash)){
            res.status(400);            
        } else {
            insertUser(userHash, userPassword);
            res.status(200);
        }
    }

});


app.post('/create-project', async (req, res) => {
    const postData = req.body;

    const user = postData?.user;
    const projectName = postData?.projectName;

    if(!user){
        res.status(400);
    } else {
        const userHash = await hashValue(user, 10);
        
        if(await !tryTofindUser(userHash)){
            res.status(400);            
        } else {
           if(await createProject(userHash, projectName)){
             res.status(200);
           } else {
            res.status(400)
           }
        }
    }

})

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

const insertUser = async (user, password) => {

    try {
        if(!client){
            console.log("sorry, we could not reach your database");
            return;
         }
     
         await client.query('INSERT INTO users(mail, password) VALUES($1::text, $2::text)', [user, password]);
         
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


const createProject = async (userMailHash, projectName) => {
 
    try {
        if(!client){
            console.log("sorry, we could not reach your database");
            return;
         }

        const result = await client.query('SELECT * FROM users WHERE mail=$1::text;', [userMailHash]);    
        
        const userId = result.rows.length ? result.rows[0]?.id : null;


        if(!userId) {
            return false;
        }

        const foundProject = await client.query('SELECT * FROM projects WHERE name=$1::text;', [projectName]);    


        if(foundProject.rows.length > 0){
            console.log("this project name is already used");
            return false;
        }
        


     await client.query('INSERT INTO projects(user_id, name) VALUES ($1::integer, $2::text)', [userId, projectName] );

    } catch(e) {
        console.log(e);
    }

}



const getProjects = async (userMailHash) => {

    try {
        if(!client){
            console.log("sorry, we could not reach your database");
            return;
         }

        const result = await client.query('SELECT * FROM users WHERE mail=$1::text;', [userMailHash]);    
        
        const userId = result.rows.length ? result.rows[0]?.id : null;


        if(!userId) {
            return false;
        }

        const foundProjects = await client.query('SELECT * FROM projects WHERE user_id=$1::integer;', [userId]);    

        return foundProjects.rows;

    } catch(e) {
        console.log(e);
    }

   

   
}