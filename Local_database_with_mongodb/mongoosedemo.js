const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/EMPLOYEE_INFO", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const app = express();
app.use(bodyparser.urlencoded({extended : false}));
const db = mongoose.connection;

db.on("error", (error) => { console.error(error) });

db.once("open", () => {
  console.log("connected");
})

const collection = db.collection('employee');

app.get('/',async (req,res)=>{
  const data = await collection.find({}).toArray();
  res.send(data);
});

const ObjectId = mongoose.Types.ObjectId;

app.get('/:id',async (req,res)=>{
  // const collection = await db.collection('employee');
  const data = await collection.findOne({_id : new ObjectId(req.params.id)});
  res.send(data);
})

app.post('/add',async (req,res)=>{
  const obj = {
    "EID" : req.body.EID,
    "ENAME" : req.body.ENAME,
    "JOININGDate" : req.body.JOININGDate,
    "SALARY" : req.body.SALARY,
    "CITY" : req.body.CITY
  }
  await collection.insertOne(obj);
  res.send(await collection.find({}).toArray());
});

app.patch('/edit/:id',async(req,res)=>{
  const obj = {
    "EID" : req.body.EID,
    "ENAME" : req.body.ENAME,
    "JOININGDate" : req.body.JOININGDate,
    "SALARY" : req.body.SALARY,
    "CITY" : req.body.CITY
  };
  await collection.updateOne({_id:new ObjectId(req.params.id)},{$set:obj},{upsert:true});
  res.send(await collection.find({}).toArray());
});

app.delete('/delete/:id',async(req,res)=>{
  await collection.deleteOne({_id: new ObjectId(req.params.id)});
  res.send(await collection.find({}).toArray());
})

app.listen(3000, () => {
  console.log('server connected at port 3000');
});
