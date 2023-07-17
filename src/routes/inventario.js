const express = require('express');
const router =express.Router();
const db = require('../database');

router.get('/', async(req, res)=> {
    const inventario = await db.query('SELECT * FROM inventario');
    res.render('inventario/list', {inventario : inventario});
});

router.get('/add',async (req,res)=>{
    res.render('inventario/add');
});

router.get('/all', async (req,res)=>{
    const producto = await db.query('SELECT * FROM inventario');
    res.send(producto);
});

router.post('/add',async(req,res)=>{
    const {nombre_pro,cantidad_nec,cantidad_inicial,descripcion_cant,genero} = req.body;
    const newRegistro = {nombre_pro,cantidad_nec,cantidad_inicial,descripcion_cant,genero};
    await db.query('INSERT INTO inventario SET ?', [newRegistro]);
    res.redirect('/inventario/');
});
router.get('/edit/:id', async (req, res)=>{
    const {id}=req.params;
    const rg = await db.query('SELECT * FROM inventario WHERE id_pro_inv = ?',[id]);
    res.render('inventario/edit', {inventario: rg[0]});
});
router.post('/edit/:id',async (req, res)=>{
    const {id} = req.params;
    const{nombre_pro,cantidad_nec,descripcion_cant,genero} = req.body;
    const newRegistro = {nombre_pro,cantidad_nec,descripcion_cant,genero}
    await db.query('UPDATE inventario set ? WHERE id_pro_inv =?',[newRegistro, id]);
    res.redirect('/inventario/');
 });
 router.get('/delete/:id', async (req,res)=>{
    const {id} = req.params;
    await db.query('DELETE FROM inventario WHERE id_pro_inv = ?',[id]);
    res.redirect('/inventario');
 });
module.exports = router;