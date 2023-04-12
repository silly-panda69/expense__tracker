const mongoose=require('mongoose');

//new schema
const Schema=mongoose.Schema;

//mongoose model based on the newly created schema
const expenseSchema=new Schema({
    name:{
        type: String,
        required: true,
    },
    category:{
        type: String,
        required: true,
    },
    amount:{
        type: Number,
        required: true,
    },
    flow:{
        type: String,
        required: true,
    },
    user_id: {
        type: String,
        required: true,
    }
},{timestamps: true});

//exporting model
module.exports=mongoose.model('Expense',expenseSchema);