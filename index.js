const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose')
const crypto=require('crypto')
const moment=require('moment')

const app=express();
app.use(cors());
app.use(express.json())
const PORT=process.env.PORT||3500;
app.get('/',async (req,res)=>{
    const data=await studentModel.find({})
    res.json({message :true,data:data})
})

app.post('/save',async(req,res)=>{
    
    const dob=moment.utc(req.body.dateOfBirth,'DD/MM/YYYY');
    const datedob=dob.toDate();

     const studentId=crypto.randomUUID();
     schemaData.studentId=studentId;
     schemaData.registerationDate=new Date();
     schemaData.fullName=req.body.fullName;
     schemaData.emailId=req.body.emailId;
     schemaData.mobileNumber=req.body.mobileNumber;
     schemaData.altMobileNumber=req.body.altMobileNumber;
     schemaData.dateOfBirth= datedob;
     schemaData.address=req.body.address;
     schemaData.state=req.body.state;
     schemaData.education=req.body.education;
     schemaData.courseName=req.body.courseName;
     schemaData.trainingCenter=req.body.trainingCenter;
     schemaData.courseFee=req.body.courseFee;
     schemaData.paymentMode=req.body.paymentMode;
     const data=new studentModel(schemaData);
     await data.save();
     res.send({success:true, message:"Data Saved"})
})

const schemaData=mongoose.Schema({
    studentId: String,
    fullName: String,
    emailId: String,
    mobileNumber: String,
    altMobileNumber: String,
    dateOfBirth: Date,
    address: String,
    state: String,
    education: String,
    courseName: String,
    trainingCenter: String,
    courseFee: String,
    paymentMode: String,
    registerationDate:Date

},{
    timestamps:true
})

const stateSchema=mongoose.Schema({
    statecode:String,
    stateName:String
},{timestamps:true})

const studentModel=mongoose.model("StudentDetails",schemaData)
const stateModel=mongoose.model("StateMaster",stateSchema)


mongoose.connect('mongodb://localhost:27017/TrainingProject')
.then(()=>{
    console.log("connected to DB")
    app.listen(PORT,()=>{
        console.log('Server listining on port')
    })

})
.catch((err)=>{console.log(err)})