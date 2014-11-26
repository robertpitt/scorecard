//controller
var courseModel = require('./courseModel');

module.exports.getCourses = function(req, res){
    courseModel.getCourseModel(req, res, function(err, data){
        res.render('golfScore', data);
    });
};

module.exports.getCourseDetails = function(req, res){
    courseModel.getCourseDetailsModel(req.params.course, res, function(err, data){
        res.render('golfScore', data);
    });
};
module.exports.getCourseDetailsAPI = function(req, res){
    courseModel.getCourseDetailsModel(req.params.course, res, function(err, data){
        //sending data as string as angularjs with parse it
        res.send(data);
    });
};
module.exports.saveScore = function(req, res){
    /*
        Scorecard id is passed back after insert
        It's then added to the angularjs Model in the client
    */
    if(req.body.scoreCardId == null) {
        courseModel.insertScore(req, res, function (err, data) {
            //sending data as string as angularjs with parse it
            res.end(data);
        });
    }else{
        courseModel.updateScore(req, res, function (err, data) {
            //sending data as string as angularjs with parse it
            res.end(data);
        });
    }
};

module.exports.getResultsAPI = function(req, res){
    courseModel.fetchResults(req, res, function (err, data) {
        //sending data as json - could send as string (as above);
        res.setHeader('Content-Type','application/JSON');
        res.end(JSON.stringify({"results":data}));
    });
};

module.exports.getScorecardAPI = function(req,res){
    courseModel.getScorecardModel(req.params.scorecardId, res, function(err, data){
        //sending data as json - could send as string (as above);
        res.setHeader('Content-Type','application/JSON');
        res.end(JSON.stringify({"results":data}));
    });
};