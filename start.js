const MongoClient = require('mongodb')
const assert = require('assert')
const taskAPI = require('express')()
const bodyParser = require('body-parser')
const upload = require('multer')();



(async () => {
    taskAPI.use(bodyParser.json())
    taskAPI.use(bodyParser.urlencoded({ extended: true }))
    taskAPI.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
    const db = await MongoClient.connect('mongodb://psearcy.com:27017/taskList')
    console.log("Connected correctly to server")
    const urgent = db.collection('urgent')
    const highPriority = db.collection('highPriority')
    const mediumPriority = db.collection('mediumPriority')
    const lowPriority = db.collection('lowPriority')
    const other = db.collection('other')
    //Get tasks
    taskAPI
        .get('/urgent',(req,res)=>{
            urgent.find().toArray().then(data => res.send(data))
        })
        .get('/highPriority', (req, res) => {
            highPriority.find().toArray().then(data => res.send(data))
        })
        .get('/mediumPriority', (req, res) => {
            mediumPriority.find().toArray().then(data => res.send(data))
        })
        .get('/lowPriority', (req, res) => {
            lowPriority.find().toArray().then(data => res.send(data))
        })
        .get('/other', (req, res) => {
            other.find().toArray().then(data => res.send(data))
        })
    //Create new task
    taskAPI
        .post('/urgent', (req, res) => {
            urgent.insertOne(
                {
                    "taskName": req.body.taskName,
                    "taskDetail": req.body.taskDetail
                }
            ).then(confirmation => res.send(confirmation))
        })
        .post('/highPriority', (req, res) => {
            highPriority.insertOne(
                {
                    "taskName": req.body.taskName,
                    "taskDetail": req.body.taskDetail
                }
            )
            highPriority.find().toArray().then(confirmation => res.send(confirmation))
        })
        .post('/mediumPriority', (req, res) => {
            mediumPriority.insertOne(
                {
                    "taskName": req.body.taskName,
                    "taskDetail": req.body.taskDetail
                }
            )
            mediumPriority.find().toArray().then(confirmation => res.send(confirmation))
        })
        .post('/lowPriority', (req, res) => {
            lowPriority.insertOne(
                {
                    "taskName": req.body.taskName,
                    "taskDetail": req.body.taskDetail
                }
            )
            lowPriority.find().toArray().then(confirmation => res.send(confirmation))
        })
        .post('/other', (req, res) => {
            other.insertOne(
                {
                    "taskName": req.body.taskName,
                    "taskDetail": req.body.taskDetail
                }
            )
            other.find().toArray().then(confirmation => res.send(confirmation))
        })

    //Update tasks
    taskAPI
        .put('/urgent', bodyParser.json() , (req, res) => {
            urgent.update(
                {"_id": req.body._id},
                {
                    "taskName": req.body.taskName,
                    "taskDetail": req.body.taskDetail
                }
            )
            urgent.find().toArray().then(confirmation => res.send(confirmation))
        })
        .put('/highPriority', (req, res) => {
            highPriority.update(
                { "_id": req.body._id },
                {
                    "taskName": req.body.taskName,
                    "taskDetail": req.body.taskDetail
                }
            )
            highPriority.find().toArray().then(confirmation => res.send(confirmation))
        })
        .put('/mediumPriority', (req, res) => {
            mediumPriority.update(
                { "_id": req.body._id },
                {
                    "taskName": req.body.taskName,
                    "taskDetail": req.body.taskDetail
                }
            )
            mediumPriority.find().toArray().then(confirmation => res.send(confirmation))
        })
        .put('/lowPriority', (req, res) => {
            lowPriority.update(
                { "_id": req.body._id },
                {
                    "taskName": req.body.taskName,
                    "taskDetail": req.body.taskDetail
                }
            )
            lowPriority.find().toArray().then(confirmation => res.send(confirmation))
        })
        .put('/other', (req, res) => {
            other.update(
                { "_id": req.body._id },
                {
                    "taskName": req.body.taskName,
                    "taskDetail": req.body.taskDetail
                }
            )
            other.find().toArray().then(confirmation => res.send(confirmation))
        })

    taskAPI.listen(3000, () => console.log('Port 3000'))

})()