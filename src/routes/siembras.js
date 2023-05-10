const express = require('express');
const router =express.Router();
const db = require('../database');

router.get('/',async(req, res)=>{
    const siembra = await db.query('SELECT * FROM siembra');
    res.render('siembras/list',{siembra: siembra});
});
router.get('/add',(req, res)=>{
    res.render('siembras/add');
});

router.post('/add',async(req, res)=>{
    const {
        nom_productoSi,
        cantidad,
        descripcion_cant,
        genero_producto,
        id_personaSi,
        nombresSi,
        a_paterno,
        a_materno,
        num_tel,
        nom_recibe,
        fecha_recibe
    } = req.body;
    const newRegistro = {
        nom_productoSi,
        cantidad,
        descripcion_cant,
        genero_producto,
        id_personaSi,
        nombresSi,
        a_paterno,
        a_materno,
        num_tel,
        nom_recibe,
        fecha_recibe
    };
    console.log(newRegistro);
    await db.query('INSERT INTO siembra SET ?', [newRegistro]);
    res.redirect('/siembras/');
});

router.get('/edit/:id', async (req, res)=>{
    const {id} = req.params;
    const rg = await db.query('SELECT * FROM siembra WHERE id_siembra = ?',[id]);
    res.render('siembras/edit',{siembra : rg[0]});
});
module.exports = router;
