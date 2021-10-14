const express=require("express")
const path=require("path") //to join strings
const app=express()
const port=80
//const bodyParser=require("body-parser")
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(express.urlencoded({extended:false}));


var mongoose=require("mongoose")
mongoose.connect('mongodb://localhost/kartutions',{useNewUrlParser:true})   //connecting to our database

//defining schema
var contactSchema = new mongoose.Schema({
      name: String,
      phone:String,
      email: String,
      interest: String,
      others: String,

    });
var Contact = mongoose.model('Contact', contactSchema);

// To serve static files such as images, CSS files, and JavaScript files, use the express.static built-in middleware function in Express.
// The function signature is:
// express.static(root, [options])

//app.use(express.static('static',options)) same can be written as below for improved performance
app.use('/static',express.static('static')) //second static is folder name
app.use(express.urlencoded({ extended: true }))               //to save data in txt file since we are not using backend



app.set('view engine','pug')                 //set template engine as pug
app.set('views',path.join(__dirname,'views'))//set the view directory

app.get('/',(req,res)=>{
    const params={ }
    res.status(200).render('home.pug',params)  //render is used insted of send for views
})

app.get('/contact',(req,res)=>{
    const params={ }
    res.status(200).render('contact.pug',params)  
})

app.post('/contact', (req, res)=>{ 
      var myData = new Contact(req.body);
      myData.save().then(()=>{
          res.send("This item has been saved to the database")
      }).catch(()=>{
          res.status(400).send("item was not saved to the database")
      })

  })

 

app.get('/locations',(req,res)=>{
    const params={ }
    res.status(200).render('locations.pug',params)  
})

app.get('/services',(req,res)=>{
    const params={ }
    res.status(200).render('services.pug',params)
})

app.get('/faculty',(req,res)=>{
    const params={ }
    res.status(200).render('faculty.pug',params)
})
app.get('/carrers',(req,res)=>{
    const params={ }
    res.status(200).render('carrers.pug',params)
})

app.listen(port,()=>{
    console.log(`Application started successfully on port${port}`)
})

