const express = require('express');
const cors = require('cors');
const todoRouter = require('./routes/todo');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/',todoRouter);

const port = 3001

app.use ((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message,err.stack)
    res.status(statusCode).json({error: err.message});
    return
});

// app.get('/', async  (req, res) => {
//     try {
//         // const connection = await mysql.createConnection(config.db);
//         // const [result,] = await connection.execute('SELECT * FROM task');
//         //const result = await db.query('SELECT * FROM task');
//         const result = await todo.getAllTasks();
//         if(!result) result=[];   // if no data, return empty array
//         res.status(200).json(result);
//     } catch (err) {
//         res.status(500).send(err.message);
        
//     }
// });

// app.post('/new', async (req, res) => {
//     try {
//         // const connection = await mysql.createConnection(config.db);
//         // //execute query
//         // const [result,] = await connection.execute('insert into task (description)value(?)', [req.body.description])
        
//         // const result = await db.query('insert into task (description)value(?)', [req.body.description])
//         const result = await todo.addTask(req.body);
//         res.status(200).json({id: result.insertId});
//     } catch (err) {
//         res.status(500).json({error: err.message});
//     }
// });

// app.delete('/delete/:id', async (req, res) => {
//     try {
//         // const connection = await mysql.createConnection(config.db);
//         // //execute query
//         //  await connection.execute('delete from task where id=?', [req.params.id])
        
//         //  await db.query('delete from task where id=?', [req.params.id])
//         await todo.removeTask(req.params.id);
//         res.status(200).json({id: req.params.id});
//     } catch (err) {
//         res.status(500).json({error: err.message});
//     }
// });
app.listen(port)
