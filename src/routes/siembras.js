const express = require('express');
const router =express.Router();
const db = require('../database');

router.get('/',(req, res)=>{

});
router.get('/add',(req, res)=>{
    res.render('siembras/add');
});

router.post('/add',async(req, res)=>{
    
});

module.exports = router;
