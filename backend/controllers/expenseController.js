//packages
const express=require('express');
const mongoose=require('mongoose');

//imports
const Expense=require('../models/expenseModel');

const getExpense=async(req,res)=>{
    try{
        const user_id=req.user._id;
        const exp=await Expense.find({user_id}).sort({createdAt: -1});
        res.status(200).json(exp);
    }catch(err){
        res.status(400).json({error: err.message});
    }
}

const postExpense=async(req,res)=>{
    try{
        const user_id=req.user._id;
        const {name,category,amount,flow}=req.body;
        const exp=await Expense.create({name,category,amount,flow,user_id});
        res.status(200).json(exp);
    }catch(err){
        res.status(400).json({error: err.message});
    }
}

const deleteExpense=async(req,res)=>{
    try{
        const id=req.params.id;
        const exp=await Expense.deleteOne({_id: id});
        res.status(200).json(exp);
    }catch(err){
        res.status(400).json({error: err.message});
    }
}

const patchExpense=async(req,res)=>{
    try {
        const id=req.params.id;
        const {name,category,amount,flow}=req.body;
        const exp=await Expense.updateOne({_id: id},{
            name: name,
            category: category,
            amount: amount,
            flow: flow,
        })
        return res.status(200).json(exp);
    }catch (err) {
        return res.status(400).json({error: err.message})
    }
}

module.exports={
    getExpense,
    postExpense,
    deleteExpense,
    patchExpense
}
