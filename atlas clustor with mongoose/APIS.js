const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Faculty = require("./model/Faculty");
const cors = require("cors");

mongoose.connect("mongodb+srv://GohelKrish173:<password>@cluster0.tj8zjyr.mongodb.net/",{useNewUrlParser : true})
.then(()=>{
    const app = express();
    app.use(express.json());
    app.use(bodyParser.urlencoded({extended : false}));
    // app.use(cors());

    app.get("/faculties",async (req,res)=>{
       const faculties = await Faculty.find();
       res.send(faculties); 
    });

    app.get("/faculties/:id",async (req,res)=>{
        const faculty = await Faculty.findOne({_id : req.params.id});
        res.send(faculty);
    });

    app.delete("/faculties/:id",async (req,res)=>{
        const faculty =await Faculty.findOne({_id : req.params.id})
        await faculty.deleteOne();
        res.send(faculty);
    })

    app.post("/add",async (req,res)=>{
        const fac = new Faculty({
        _id : new mongoose.Types.ObjectId(),
        Name : req.body.Name,
        Image : req.body.Image,
        FacId : req.body.FacId,
        Dept : req.body.Dept,
        Salary  : req.body.Salary
    });

    const fac1 = new Faculty({_id:new mongoose.Types.ObjectId(),...req.body});
    await fac1.save();
    res.send(fac1); 
    });

    app.patch("/edit/:id",async (req,res)=>{
        const fac =await Faculty.findOne({_id : req.params.id});
        fac.Name = req.body.Name,
        fac.Image = req.body.Image,
        fac.FacId = req.body.FacId,
        fac.Dept = req.body.Dept,
        fac.Salary = req.body.Salary
        await fac.save();
        res.send(fac);
    });

    app.listen(8000,()=>{
        console.log("Server 8000 is connected.");
    })
});
