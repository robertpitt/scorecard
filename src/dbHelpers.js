var Mongo = require('mongodb');
var MongoClient = Mongo.MongoClient;

//password hard coded
var url = 'mongodb://demo:password@ds051980.mongolab.com:51980/demo'

//Get every course document
module.exports.getCourses = function (){
    MongoClient.connect(url, function(err, db){
        var courses = db.collection('courses');
        var docs = courses.find({}).toArray(function(err, docs){
            db.close();

            if(!err){
                console.log(docs)
                return docs;
            }
        });
    });

};