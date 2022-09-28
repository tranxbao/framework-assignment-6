const db = require('./db');
const helper = require('../helper');

async function getAllTasks() {
    const rows = await db.query('SELECT * FROM task');
    return helper.emptyOrRows(rows);
}

async function addTask(task) {
    const result = await db.query(`INSERT INTO task (description) VALUES ('${task.description}')`)
        task.id = result.insertId
        return task
}

async function removeTask(id) {
    const result = await db.query(`DELETE FROM task WHERE id=${id}`)
    return result
}

async function updateTask(task){
    const result = await db.query(`UPDATE task SET description='${task.description}' WHERE id=${task.id}`)
    return result
}

module.exports = {
    getAllTasks,
    addTask,
    removeTask,
    updateTask
}