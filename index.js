const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const port = process.env.PORT || 3000

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))

var task = ["buy milk", "learn javascript", "learn express"];
var complete = ["finish learning nodejs"];


app.post('/addTask', (req, res) => {
    let newTask = req.body.newtask
    task.push(newTask)
    res.redirect('/')
});


app.get('/', (req,res) => (
    res.render('index', {task:task, complete: complete})
));

app.post('/removetask', (req, res) => {
    let completeTask = req.body.check;
    if( typeof completeTask === "string") {
        complete.push(completeTask)
        task.splice(task.indexOf(completeTask), 1);
    }else if(typeof completeTask === "object") {
        for(let i=0; i < completeTask.length; i++) {
            complete.push(completeTask[i]);
            task.splice(task.indexOf(completeTask[i]), 1)
        }
    }
    res.redirect("/");
})
app.listen(port, (err) => {
    if(err) {
        console.log(err)
    } else {
        console.log('running on port', port)
    }
})