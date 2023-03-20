const express = require('express');
const router =express.Router();
const db = require('../database');

router.get('/',(req, res)=>{
    res.send("Holas");
});

router.get('/add',(req, res)=>{
    res.render('personas/add');
});

router.post('/add',(req, res)=>{
    res.send("Recibido");
});

module.exports= router;