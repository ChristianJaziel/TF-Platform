const express = require('express');
const router =express.Router();
const db = require('../database');

router.get('/',(req, res)=>{

});
router.get('/add',(req, res)=>{
    res.render('siembras/add');
});



module.exports = router;
