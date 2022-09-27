const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const config = require('./config');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = 3001

app.get('/', async  (req, res) => {
    try {
        const connection = await mysql.createConnection(config.db);
        const [result,] = await connection.execute('SELECT * FROM task');
        if(!result) result=[];
        res.status(200).json(result);
    } catch (err) {
        res.status(500).send(err.message);
        
    }
});

app.post('/new', async (req, res) => {
    try {
        const connection = await mysql.createConnection(config.db);
        //execute query
        const [result,] = await connection.execute('insert into task (description)value(?)', [req.body.description])
        res.status(200).json({id: result.insertId});
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

app.delete('/delete/:id', async (req, res) => {
    try {
        const connection = await mysql.createConnection(config.db);
        //execute query
         await connection.execute('delete from task where id=?', [req.params.id])
        res.status(200).json({id: req.params.id});
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});
app.listen(port)
