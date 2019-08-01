 const express = require('express');
 const app = express();
 const bodyParser = require('body-parser');

 app.set('view engine', 'ejs');

 app.use(bodyParser.urlencoded({ extended: true }))
 app.use(bodyParser.json())

 // Connect to DB
const mongoose = require('mongoose');
        mongoose.Promise = global.Promise;
        mongoose.connection
            .on('error', error => reject(error))
            .on('open', () => {
                const info = (mongoose.connections[0]);
                console.log(`Connect to ${info.host}:${info.port}/${info.name}`)
            })
            .on('close', () => console.log('Database connection close'));

        mongoose.connect('mongodb://localhost/example', {useNewUrlParser: true});

const Schema = mongoose.Schema;
const schema = new Schema({
    DataToDB:{
        type:String,
        required: true
    }
});
schema.set('toJSON', {
    virtuals:true
})

const Post = mongoose.model('Post', schema);
app.get('/',(req, res) => res.render('index.ejs'));
app.post('/', (req,res) => {

    const {DataFromInput} = req.body;
    Post.create({
        DataToDB: DataFromInput
    }).then(any_name1 => console.log(any_name1.id, any_name1.DataToDB));
    res.redirect('/exit')
})


 app.get('/exit',(req,res) => {
    Post.find({}).then( any_name2=>{
         res.render('exit', {NameToHTML:any_name2})
   })
 })

app.listen(3000);
