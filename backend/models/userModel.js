const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const validator=require('validator');

const Schema=mongoose.Schema;

const userSchema=new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

userSchema.statics.signup=async function(username,email,password){
    //validation
    if(!username || !email || !password){
        throw Error('All fields must be filled');
    }
    if(!validator.isEmail(email)){
        throw Error('Email is not valid');
    }
    if(!validator.isStrongPassword(password)){
        throw Error('Password not strong enough');
    }
    if(!validator.isAlphanumeric(username)){
        throw Error('Username can contain only letters and numbers');
    }
    const emailexists=await this.findOne({email});
    if(emailexists){
        throw Error('Email already in use');
    }
    const unameExists=await this.findOne({username});
    if(unameExists){
        throw Error('Username already in use');
    }
    const salt=await bcrypt.genSalt(10);
    const hash=await bcrypt.hash(password,salt);
    const user=await this.create({username,email,password: hash});
    return user;
}

userSchema.statics.login=async function(email,password){
    if(!email || !password){
        throw Error('All fields must be filled');
    }
    if(!validator.isEmail(email)){
        throw Error('Email is not valid');
    }
    const user=await this.findOne({email});
    if(!user){
        throw Error('Incorrect Email');
    }
    const match=await bcrypt.compare(password,user.password);
    if(!match){
        throw Error('Incorrect Password');
    }
    return user;
}

module.exports=mongoose.model('User',userSchema);