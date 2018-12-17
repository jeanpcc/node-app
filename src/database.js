const mongoose = require('mongoose');
const config = require('./config/config');

const urldev = 'mongodb://'+config.dev+'/notes-db-app';
const urlprod = 'mongodb://'+config.prod+'/notes-db-app';

mongoose.connect(urldev,{
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
})
    .then(db => console.log('BD is connected'))
    .catch(err => console.error(err));
    




