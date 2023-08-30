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

router.get('/allpr', async(req, res)=>{
    const producto = 
    res.send(producto);
});

router.get('/all', async (req,res)=>{
    const producto = await db.query('SELECT * FROM inventario WHERE cantidad_sembrada < cantidad_inicial');
    res.send(producto);
});

router.get('/buscar', async (req,res)=>{
    let buscarpe = [];
    let buscarpr = [];
    buscarpr = await db.query('SELECT nombre_pro as Nombre_producto FROM inventario');
    buscarpr = buscarpr.map(item => item.Nombre_producto);
    buscarpe = await db.query('SELECT CONCAT(nombres_persona, " ",a_paterno , " ", a_materno) as Nombre_persona from personas');
    buscarpe = buscarpe.map(item => item.Nombre_persona);
    const busqueda = buscarpr.concat(buscarpe);
    res.send(busqueda);
});

router.post('/busqueda', async (req,res)=>{
    const producto = await db.query('SELECT * FROM inventario');
    const personas = await db.query('SELECT * FROM personas');
    const {buscar} = req.body;
    const {selector} = req.body;  
    let buscarobj;
    let obj="";
    let seekobj;
    seekobj = producto.filter(prod =>{
        if(prod.nombre_pro === buscar){obj = "producto"};
    } );
    seekobj = personas.filter(pers =>{
        const nombres_persona = pers.nombres_persona + " " + pers.a_paterno + " " + pers.a_materno;
        if(nombres_persona === buscar){obj = "persona"};
    });
    console.log(obj);
    if(selector == "siembra" && obj == "producto"){
        buscarobj = await db.query('SELECT * from siembra where nom_productoSi = ?',[buscar]);
        res.render('siembras/list', {siembra : buscarobj});
    }else if(selector == "siembra" && obj == "persona"){
        buscarobj = await db.query('SELECT * from siembra where CONCAT(nombres_persona, " ", a_paterno, " ", a_materno) = ?',[buscar]);
        res.render('siembras/list', {siembra : buscarobj});
    }
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
    const{nombre_pro,cantidad_nec,cantidad_inicial,descripcion_cant,genero} = req.body;
    const newRegistro = {nombre_pro,cantidad_nec, cantidad_inicial,descripcion_cant,genero}
    await db.query('UPDATE inventario set ? WHERE id_pro_inv =?',[newRegistro, id]);
    res.redirect('/inventario/');
 });
 router.get('/delete/:id', async (req,res)=>{
    const {id} = req.params;
    await db.query('DELETE FROM inventario WHERE id_pro_inv = ?',[id]);
    res.redirect('/inventario');
 });
module.exports = router;