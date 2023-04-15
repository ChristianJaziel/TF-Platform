const express = require('express');
const router =express.Router();
const db = require('../database');

router.get('/',(req, res)=>{

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
    res.send("Enviado");
    //await db.query('INSERT INTO siembra SET ?', [newRegistro]);

});

module.exports = router;
