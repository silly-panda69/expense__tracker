//packages
const express=require('express');
const mongoose=require('mongoose');

//imports
const expenseRoute=require('./routes/expense');
const userRoute=require('./routes/user'); 

const app=express();

app.use(express.json());

mongoose.connect(process.env.MONGO_DB)
    .then(()=>{
        app.listen(process.env.SERVER,()=>{
            console.log('Listening on port 4000');
        });
    })
    .catch(err=>{
        console.log(err);
    });

app.use((req,res,next)=>{
    console.log('Request Generated');
    next();
});

app.use('/expense/user/',userRoute);
app.use('/expense/tracker/',expenseRoute);
