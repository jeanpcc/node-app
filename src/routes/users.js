const router = require('express').Router();
const User = require('../models/User'); 

router.get('/users/signin', (req, res) => {
    res.render('users/singin');
});


router.get('/users/signup', (req, res) => {
    res.render('users/singup');
})

router.post('/users/signup', async (req, res) => {
    const { name , email, password, confirmed_password} = req.body;
    const errors = [] 
    if(name.length <= 0 ){
        errors.push({text:'Please insert your name'});
    }

    if(password != confirmed_password){
        errors.push({text:'Password do not match'});
    }

    if(password.length < 4 ){
        errors.push({text:'Password must be at last 4 characters'})
    }

    if(errors.length > 0){
        res.render('/users/singup',{errors, name, email, password, confirmed_password});
    }
    else{
        const emailUser = await User.findOne({email :email});

        if(emailUser){
            req.flash('error_msg','This Email is already in use');
            res.redirect('users/singup');
        }

        const newUser = new User({name,email,password});
        newUser.password = await newUser.encryptPassword(password);
        await newUser.save();

        req.flash('success_msg','You are registered');
        res.redirect('/users/signin');
    }
})


module.exports = router;