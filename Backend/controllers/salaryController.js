const Salary = require('../models/salaryModel');
const mongoose = require("mongoose");


//get all Salary
const getSalaries=async(req,res)=>{

    const salaries=await Salary.find({}).sort({createdAt:-1})

    res.status(200).json(salaries)
}

//get a single workout
const getSalary=async(req,res)=>{
    const { id }=req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such Salary'})
    }

    const salary=await Salary.findById(id)
    if(!salary){
       return res.status(404).json({error:'No such salary'})
    }
    res.status(200).json(salary)

}

//create new salary
const createSalary=async(req,res)=>{
    const{fname,lname,email,role,base,otRate,otHours,bonus,reason,finalSal}=req.body
    //add doc to db
try{
  const salary=await Salary.create({fname,lname,email,role,base,otRate,otHours,bonus,reason,finalSal})
res.status(200).json(salary)
}catch(error){
  res.status(400).json({error:error.message})

}
}

//delete Salary
const deleteSalary=async(req,res)=>{
    const { id }=req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such Salary'})
    }

    const salary= await Salary.findOneAndDelete({_id:id})
    if(!salary){
        return res.status(404).json({error:'No such salary'})
     }
     res.status(200).json(salary)
 


}

//update Salary
const updateSalary=async(req,res)=>{
    const { id }=req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such Salary'})
    }
    const salary =await Salary.findOneAndUpdate({_id:id},{
       ...req.body
     })
 
     if(!salary){
        return res.status(404).json({error:'No such salary'})
     }
     res.status(200).json(salary)
 

}

module.exports={
    createSalary,
    getSalary,
    getSalaries,
    deleteSalary,
    updateSalary
}