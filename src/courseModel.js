
var Mongo = require('mongodb');
var MongoClient = Mongo.MongoClient;

//password hard coded
var url = 'mongodb://demo:password@ds051980.mongolab.com:51980/demo';

var reportErr = function(res, err){
    res.render('error', {
        message: err.errmsg,
        error: "Connection Error"
    });
};

module.exports.getCourseModel = function (req, res, next) {
    MongoClient.connect(url, function(err, db){
        if(err != null){
            reportErr(res, err);
        }else{
            var courses = db.collection('courses');
            var docs = courses.find({}).toArray(function(err, docs){
                db.close();
                if(!err){
                    next(null, {"data": docs});
                }
        });
        }
    });
};

module.exports.getCourseDetailsModel = function (course, res, next) {
    MongoClient.connect(url, function(err, db){
        if(err != null){
            reportErr(res, err);
        }else{
            var courses = db.collection('courses');
            var docs = courses.find({"name": course.replace("-"," ")}).toArray(function(err, docs){
                db.close();
                if(!err){
                    next(null, {"data": docs});
                }
            });
        }
    });
};

module.exports.insertScore = function(req, res, next){
    MongoClient.connect(url, function(err, db){
        if(err != null){
            reportErr(res, err);
        }else{
            var scores = db.collection('scores');
            //create a random guid
            req.body.scoreCardId = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                return v.toString(16);
            });
            var docs = scores.insert(req.body,(function(err, docs){
            db.close();
            if(!err){
                next(null, '{"scoreCardId":"'+ docs[0].scoreCardId+'"}');
            }
            })
        )}
})};
module.exports.updateScore = function(req, res, next){
    MongoClient.connect(url, function(err, db){
        if(err != null){
            reportErr(res, err);
        }else{

            var scores = db.collection('scores');
            var docs = scores.update(   {"scoreCardId": req.body.scoreCardId },
                                        {$set:{"holes": req.body.holes}},
                                        (function(err, docs){
                                            db.close();
                                            if(!err){
                                                next(null, '{"scoreCardId":0}');
                                            }
                                        })
                                    )
        }
})};

module.exports.fetchResults = function(req, res, next){
    MongoClient.connect(url, function(err, db){
        if(err != null){
            reportErr(res, err);
        }else{
            var scores = db.collection('scores');
            var docs = scores.find({}).toArray(function(err, docs){
            db.close();
            if(!err){
                next(null,  docs );
            }
        });
        }
    });
};
module.exports.getScorecardModel = function(scid, res, next){
    MongoClient.connect(url, function(err, db){
        if(err != null){
            reportErr(res, err);
        }else{
            var courses = db.collection('scores');
            var docs = courses.find({"scoreCardId": scid}).toArray(function(err, docs){
            db.close();
            if(!err){
                next(null, {"data": docs});
            }
        });
        }
    });
};