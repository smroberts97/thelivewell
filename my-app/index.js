const express = require('express');
const mysql = require('mysql');
const db = require('./server/db');
const app = express();
const { resolve } = require('path');
const PORT = process.env.PORT || 9000;

app.use(express.static(resolve(__dirname,'client','dist')));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

function errorHandling(req, res){
    res.status(req.status || 500).send(req.error || 'Server Error');
}

app.get('/api/home', async (req, res, next) => {
    try {
        const query = 'SELECT * FROM ??';
        const inserts = ['fish'];

        const sql = mysql.format(query, inserts);

        const userInfo = await db.query(sql);
        res.send({
            success: true,
            userInfo
        });

    } catch (err){
        console.log('Error:', err);
        req.status = 500;
        req.error = 'Error getting user information';

        return next();
    }
    
}, errorHandling);

app.patch('/api/add_species/:species/location/:location/total/:total', async (req, res, next)=>{
    try {
        const {species, location, total} = req.params;

        const query = 'INSERT INTO ?? (??, ??, ??) VALUES (?, ?, ?)';
        const inserts = ['fish', 'species', 'location', 'total', species, location, total];

        const sql = mysql.format(query, inserts);

        const results = await db.query(sql);

        res.send({
            success: true,
            results
        });
    } catch(err) {
        req.status = 500;
        req.error = 'Error posting category';

        return next();
    }
}, errorHandling);

app.get('/api/statistics', async (req, res, next) => {
    try {
        const query = 'SELECT  * FROM ??';
        const inserts = ['fish'];

        const sql = mysql.format(query, inserts);

        const userInfo = await db.query(sql);
        res.send({
            success: true,
            userInfo
        });

    } catch (err){
        console.log('Error:', err);
        req.status = 500;
        req.error = 'Error getting user information';

        return next();
    }
    
}, errorHandling);

app.post('/api/update/species/:species/location/:location/total/:total/ID/:ID', async (req, res, next)=>{
    try {
        const {species, location, total, ID} = req.params;
        const query = 'UPDATE ?? SET ?? = ?, ?? = ?, ?? =? WHERE ?? = ?';
        const inserts = ['fish', 'species', species, 'location', location, 'total', total, 'ID',  ID];

        const sql = mysql.format(query, inserts);

        const results = await db.query(sql);

        res.send({
            success: true,
            results
        });
    } catch(err) {
        req.status = 500;
        req.error = 'Error';

        return next();
    }
}, errorHandling);

app.patch('/update/:ID', async (req, res, next)=>{
    try {
        const {ID} = req.params;

        const query = 'DELETE FROM ?? WHERE ?? = ?';
        const inserts = ['fish', 'ID', ID];

        const sql = mysql.format(query, inserts);

        const results = await db.query(sql);

        res.send({
            success: true,
            results
        });
    } catch(err) {
        req.status = 500;
        req.error = 'Error';

        return next();
    }
}, errorHandling);

app.patch('/api/delete/:ID', async (req, res, next)=>{
    try {
        const {ID} = req.params;

        const query = 'DELETE FROM ?? WHERE ?? = ?';
        const inserts = ['fish', 'ID', ID];

        const sql = mysql.format(query, inserts);

        const results = await db.query(sql);

        res.send({
            success: true,
            results
        });
    } catch(err) {
        req.status = 500;
        req.error = 'Error posting category';

        return next();
    }
}, errorHandling);



//starts Express server on defined port
app.listen(PORT, ()=>{
    console.log('Server running on PORT:', PORT);
});

// add routes to express app
// routes(app);

app.get('*', (req, res) => {
    res.sendFile(resolve(__dirname, 'client', 'dist', 'index.html'));
});