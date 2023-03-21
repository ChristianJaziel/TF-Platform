const express = require('express');
const router =express.Router();
const db = require('../database');

router.get('/',(req, res)=>{
    res.send("Holas");
});

router.get('/add',(req, res)=>{
    res.render('personas/add');
});

router.post('/add',async (req, res)=>{
    const { nombres_persona, a_paterno, a_materno, calle, numero_casa, colonia, num_tel} = req.body;
    const newRegistro = {
        nombres_persona, 
        a_paterno, 
        a_materno, 
        calle, 
        numero_casa, 
        colonia, 
        num_tel
    };
    await db.query('INSERT INTO personas SET ?', [newRegistro]);
    res.send("Recibido");
});

module.exports= router;