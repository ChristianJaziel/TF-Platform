const express = require('express');
const router =express.Router();
const db = require('../database');

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
    res.redirect('/registropersonas');
});

router.post('/edit/:id',async (req, res)=>{
   const {id} = req.params;
   const{
    nombres_persona, 
    a_paterno, 
    a_materno, 
    calle, 
    numero_casa, 
    colonia, 
    num_tel
} = req.body;

const newRegistro = {
    nombres_persona, 
    a_paterno, 
    a_materno, 
    calle, 
    numero_casa, 
    colonia, 
    num_tel
};
    await db.query('UPDATE personas set ? WHERE id_persona =?',[newRegistro, id]);
    res.redirect('/registropersonas');
});

router.get('/',async (req, res)=>{
   const personas = await db.query('SELECT * FROM personas');
   res.render('personas/list', {personas : personas});
});

router.get('/delete/:id', async (req, res)=>{
    const {id} = req.params;
    await db.query('DELETE FROM personas WHERE id_persona = ?',[id]);
    res.redirect('/registropersonas');
});

router.get('/edit/:id', async (req, res)=>{
    const {id}=req.params;
    const rg = await db.query('SELECT * FROM personas WHERE id_persona = ?',[id]);
    res.render('personas/edit', {personas: rg[0]});
});
module.exports= router;