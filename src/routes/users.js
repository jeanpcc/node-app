const router = require('express').Router();
 

router.get('/users/signin', (req, res) => {
    res.render('users/singin');
});


router.get('/users/signup', (req, res) => {
    res.render('users/singup');
})



module.exports = router;