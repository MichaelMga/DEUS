const { Client } = require('pg');

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'DEUS_DB',
    password: 'psql',
    port: 5432, 
});

export async function connectAndQuery() {
    try {
        await client.connect();
        console.log('Connected to the database');
        const res = await client.query('SELECT $1::text as message', ['Hello world!']);
        console.log(res.rows[0].message);
    } catch (err) {
        console.error('Error connecting to the database', err);
    } finally {
        await client.end();
        console.log('Disconnected from the database');
    }
}

connectAndQuery();
