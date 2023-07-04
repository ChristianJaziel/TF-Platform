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
        cantidad_promesa,
        cantidad_donar,
        descripcion_cant_p,
        descripcion_cant_d,
        genero_producto,
        id_personaSi,
        nombresSi,
        a_paterno,
        a_materno,
        num_tel,
        nom_recibe,
        fecha_recibe,
        recibido
    } = req.body;
    const newRegistro = {
        nom_productoSi,
        cantidad_promesa,
        cantidad_donar,
        descripcion_cant_p,
        descripcion_cant_d,
        genero_producto,
        id_personaSi,
        nombresSi,
        a_paterno,
        a_materno,
        num_tel,
        nom_recibe,
        fecha_recibe,
        recibido
    };
    await db.query('INSERT INTO siembra SET ?', [newRegistro]);
    id_r = await db.query('SELECT MAX(id_siembra) as id from siembra');
    const {id} = id_r[0];
    const id_siembra_r = id;
    const registroSiembra ={
        id_siembra_r,
        nom_productoSi,
        cantidad_promesa,
        cantidad_donar,
        descripcion_cant_p,
        descripcion_cant_d,
        genero_producto,
        id_personaSi,
        nombresSi,
        a_paterno,
        a_materno,
        num_tel,
        nom_recibe,
        fecha_recibe,
        recibido
    };
    await db.query('INSERT INTO registro_siembra SET ?', [registroSiembra]);
    res.redirect('/siembras/');
});

router.get('/view/:id', async(req,res)=>{
    const {id} = req.params;
    const rg = await db.query('SELECT * FROM registro_siembra WHERE id_siembra_r = ?', [id]);
    res.render('siembras/view',{rg_siembra : rg});
});

router.get('/edit/:id', async (req, res)=>{
    const {id} = req.params;
    const inventario = await db.query('SELECT * FROM inventario');
    const rg = await db.query('SELECT * FROM siembra WHERE id_siembra = ?',[id]);
    res.render('siembras/edit',{siembra : rg[0], inventario:inventario});
});

router.post('/edit/:id', async (req, res)=>{
    const {id} = req.params;
    const {
        nom_productoSi,
        cantidad_promesa,
        cantidad_donar,
        descripcion_cant_p,
        descripcion_cant_d,
        genero_producto,
        id_personaSi,
        nombresSi,
        a_paterno,
        a_materno,
        num_tel,
        nom_recibe,
        fecha_recibe,
        recibido
    } = req.body;
    const newRegistro = {
        nom_productoSi,
        cantidad_promesa,
        cantidad_donar,
        descripcion_cant_p,
        descripcion_cant_d,
        genero_producto,
        id_personaSi,
        nombresSi,
        a_paterno,
        a_materno,
        num_tel,
        nom_recibe,
        fecha_recibe,
        recibido
    };
    await db.query('UPDATE siembra set ? where id_siembra = ?', [newRegistro, id]);
    id_r = await db.query('SELECT MAX(id_siembra) as idr from siembra');
    const {idr} = id_r[0];
    const id_siembra_r = idr;
    const registroSiembra ={
        id_siembra_r,
        nom_productoSi,
        cantidad_promesa,
        cantidad_donar,
        descripcion_cant_p,
        descripcion_cant_d,
        genero_producto,
        id_personaSi,
        nombresSi,
        a_paterno,
        a_materno,
        num_tel,
        nom_recibe,
        fecha_recibe,
        recibido
    };
    await db.query('INSERT INTO registro_siembra SET ?', [registroSiembra]);
    res.redirect('/siembras/');
});

router.get('/delete/:id', async (req,res)=>{
    const {id} = req.params;
    await db.query('DELETE FROM siembra WHERE id_siembra = ?',[id]);
    res.redirect('/siembras');
 });
module.exports = router;
