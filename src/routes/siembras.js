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
        id_prod_inv,
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
        id_prod_inv,
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
    await db.query('UPDATE inventario set cantidad_nec = cantidad_nec - ? where id_pro_inv = ?', [cantidad_donar, id_prod_inv]);
    await db.query('UPDATE inventario set cantidad_sembrada = cantidad_sembrada + ? where id_pro_inv = ?',[cantidad_promesa, id_prod_inv]);
    id_r = await db.query('SELECT MAX(id_siembra) as id from siembra');
    const {id} = id_r[0];
    const id_siembra_r = id;
    const registroSiembra ={
        id_siembra_r,
        id_prod_inv,
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
        id_prod_inv,
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
    const idprod = id_prod_inv;
    const newRegistro = {
        id_prod_inv,
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
    //se actualizan los datos de la siembra con su respectivo id
    await db.query('UPDATE siembra set ? where id_siembra = ?', [newRegistro, id]);
    //.........................................................................................................................................
    //se extrae el id de la recien actualizacion y se pasa como objeto a id_r
    const id_siembra_r = id;
    const oldc = await db.query('SELECT MAX(cantidad_donar) as cantidad_ant from registro_siembra WHERE id_siembra_r = ?', [id]);
    const {cantidad_ant} = oldc[0];
    const registroSiembra ={
        id_siembra_r,
        id_prod_inv,
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
    //se crea un registro con los mismos datos de la siembra para llevar un control de actualizaciones sobre la siembra actualizada
    await db.query('INSERT INTO registro_siembra SET ?', [registroSiembra]);
    const newc = await db.query('SELECT MAX(cantidad_donar) as cantidad_nue from registro_siembra WHERE id_siembra_r = ?', [id_siembra_r]);
    const {cantidad_nue} = newc[0];
    console.log("cantidad ant, cantidad nue ",cantidad_ant, cantidad_nue);
    const result = cantidad_nue - cantidad_ant;
    console.log("result ",result);
    console.log("idprod: ", idprod);
    await db.query('UPDATE inventario set cantidad_nec = cantidad_nec - ? where id_pro_inv = ?', [result, idprod]);
    res.redirect('/siembras/');
});

router.get('/delete/:id', async (req,res)=>{
    const {id} = req.params;
    const cant_sem = await db.query('SELECT cantidad_promesa from siembra where id_siembra= ?',[id]);
    const {cantidad_promesa} = cant_sem[0]
    console.log(cantidad_promesa);
    const idprod = await db.query('SELECT id_prod_inv from siembra where id_siembra = ?', [id]);
    const inv = await db.query('Select cantidad_donar from siembra where id_siembra = ?',[id]);
    const {cantidad_donar} = inv[0];
    const {id_prod_inv} = idprod[0];  
    await db.query('UPDATE inventario set cantidad_sembrada = cantidad_sembrada - ? where id_pro_inv = ?', [cantidad_promesa,id_prod_inv]);
    await db.query('UPDATE inventario set cantidad_nec = cantidad_nec + ? where id_pro_inv = ?', [cantidad_donar,id_prod_inv]);
    await db.query('DELETE FROM registro_siembra where id_siembra_r = ?', [id]);
    await db.query('DELETE FROM siembra WHERE id_siembra = ?',[id]);
    res.redirect('/siembras');
 });
module.exports = router;
