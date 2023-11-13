const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express()
app.use(cors())
app.use(express.json())

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123123',
    database: 'healthcare'

})

app.get('/api/users', (req, res)=>{
    const params = req.query;
    const query = `SELECT * FROM users WHERE singpass_id='${params.singpassID}'and password='${params.password}'`;
    db.query(query,(err,data)=>{
        if(err) return res.json(err);
        return res.json(data)
    })
})

app.post('/api/users', (req, res)=>{
    const params = req.body;
    const query = `INSERT INTO users (name, singpass_id, password) VALUES ('${params.name}', '${params.nric}', '${params.password}')`;
    db.query(query,(err,data)=>{
        if(err) return res.json(err);
    })
    return res.json("User registered successfully")
})

app.get('/api/patients', (req, res)=>{
    const params = req.query;
    const query = `SELECT * FROM patients where caretaker_id='${params.singpassID}'`
    db.query(query,(err,data)=>{
        if(err) return res.json(err);
        return res.json(data)
    })
})

app.listen(5000, ()=>{
    console.log("Server running on port 5000")
})