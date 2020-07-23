const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const carisch = mongoose.Schema({
    idAnggota : {type : String},
    dataSearch : {type : Array}
});
const Cari = mongoose.model('Cari', carisch);

router.post('/', async (req, res, next) => {
    const cari = new Cari({
        idAnggota : req.body.idAnggota,
        dataSearch : req.body.dataSearch
    })
    await cari.save();
    res.status(201).json({
        message : "data created",
        Cari : cari
    });
});

router.put('/update/:idAnggota', async (req,res,next) => {
    await Cari.updateOne({idAnggota : req.params.idAnggota},{$set : {dataSearch : []}})
    res.status(200).json({
        "reset dataSearch" : req.params.idAnggota
    });

})

router.get('/:idAnggota', async (req, res, next) => {
    console.log(req.query)
    let e = await Cari.find({idAnggota : req.params.idAnggota})
    //console.log(e);
    let tmpData = new Array()
    tmpData = e[0].dataSearch;
    //console.log(tmpData)
    let i = parseInt(req.query.skip);
    let len = parseInt(req.query.limit);
    console.log(i)
    console.log(len);
    let resData = new Array();
    while(i<len){
        resData.push(tmpData[i]);
        i++;
    }
    console.log(resData);
    res.status(200).send({result:resData});
})

module.exports = router;