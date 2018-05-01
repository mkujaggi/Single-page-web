const express=require('express');
const http=require('http');
const path=require('path');
const socketIO = require('socket.io');
const MongoClient=require('mongodb').MongoClient;

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var env = process.env.NODE_ENV || 'development';
if (env === 'development'){
    process.env.MONGODB_URI = 'mongodb://localhost:27017/Request';
}

app.use(express.static(publicPath));
io.on('connection',(socket)=>{
    socket.on('formSubmit',(req,callback)=>{
        MongoClient.connect(process.env.MONGODB_URI,(err,client)=>{
            if(err){
                console.log('Unable to connect to database.');
            }
            const db=client.db('Request');
            db.collection('Query').insertOne(req,(err,result)=>{
                if (err) {
                    return console.log('Unable to insert data', err);
                }
                console.log(JSON.stringify(result.ops,undefined,2));
            })
        });
        callback();
    })
});
server.listen(port,()=>{
    console.log(`Server is up at ${port}`)
});