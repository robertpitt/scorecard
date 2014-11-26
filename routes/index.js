/*
Defining routes
 */
var express = require('express');
var router = express.Router();
/* Fake CMS data would typically be store in Database with accessible front end */
var cms_data = require('../src/cms');
/*controller for the golf app*/
var golfScore = require('../src/golfScoreCont');



/* GET text only  pages.
*   -- Home
* */
router.get('/', function(req, res) {
  cms_data.getText(req, res, 'index');
  
});
/*
*   -- About
 */
router.get('/about', function(req, res) {
  cms_data.getText(req, res, 'about');
});
/*Routes for the golf app
*   -- Get the list of course
*/
router.get('/golfScores', function(req, res) {
  golfScore.getCourses(req, res);
});
/*
*   -- Get the course details (hole/par/si etc...) - This route was use parsing course details on the server with handlebars
*   (not currently using this route, but might change back - hence no detailed )
*/
router.get('/golfScores/:course', function(req, res) {
  golfScore.getCourseDetails(req, res);
});
/*
*   -- Get the course details (hole/par/si etc...) - Returns JSON
*/
router.get('/api/course/:course', function(req, res) {
  golfScore.getCourseDetailsAPI(req, res);
});
/*
*   -- Get the list of results  - Returns JSON
*/
router.get('/api/results', function(req, res) {
  golfScore.getResultsAPI(req, res);
});
/*
*   -- Save the list of results - Returns JSON
*/
router.post('/api/scores', function(req, res){
    golfScore.saveScore(req, res);

});
/*
*   -- Get scorecard - Returns JSON
*/
router.get('/api/scorecard/:scorecardId', function(req, res) {
  golfScore.getScorecardAPI(req, res);
});



module.exports = router;
