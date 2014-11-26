
angular.module('golfscores',[]).controller('MainCtrl', ['$scope','$http',function($scope, $http){

    $scope.courseName = courseName;
    $scope.scoreCardId = null;
    $scope.lastSave = "";
    $scope.dateOfRound = new Date();
    $scope.results = "";
    $scope.previousResults = null;

    if($scope.courseName != null){
        $(".loader").css("display","block");
        $http.get('/api/course/'+$scope.courseName).success(function(data){
            $scope.courseDetails = data.data[0].holes;
            $(".loader").css("display","none");
            $(".holesCollection,.btnGroup-scAction").css("display","block");
            
        });
    };

   var _saveScore = function saveScore(){
       var scores = {};
       scores.name = $scope.courseName;
       scores.holes = $scope.courseDetails;
       scores.scoreCardId = $scope.scoreCardId;
       scores.dateOfRound = $scope.dateOfRound;

       $http.post('/api/scores',scores,'').success(function(data){
           if(data.scoreCardId != 0) {
                $scope.scoreCardId = data.scoreCardId;
               $("#completeBtn").css({"display":"block"});
           }
           var now = new Date();
           //move in to its own function
           var strDateTime = [[AddZero(now.getDate()), AddZero(now.getMonth() + 1), now.getFullYear()].join("/"), [AddZero(now.getHours()), AddZero(now.getMinutes())].join(":"), now.getHours() >= 12 ? "PM" : "AM"].join(" ");
           $scope.lastSave = "Last save: " + strDateTime;
       });
   };

   var _endRound = function (){
       var confirmation = confirm("This will end your round and edits will not long be allowed\nWould you like to proceed?")
       if(confirmation){
           $scope.scoreCardId = null;
           $scope.lastSave = "";
           $scope.dateOfRound = new Date();

           $http.get('/api/course/' + $scope.courseName).success(function (data) {
               $scope.courseDetails = data.data[0].holes;
           });

           $("#completeBtn").css({"display":"none"});
           _showPreviousResults();
       }
   };


   var _showPreviousResults = function(){

       changeTab('results');
        $(".loader").css("display","block");
       $("#previousRoundSelector").css("display","none");
       $("#previousScoreCard").css("display","none");

       $http.get('/api/results').success(function(data){
           $scope.results = data.results;
           $(".loader").css("display","none");
           $("#previousRoundSelector").css("display","block")
       });

   };

   var _AddStroke = function setAddStroke(details, type, value, event){
        var holeItem = $scope.courseDetails[details.hole.number - 1];
        var currentVals =$(event.target).parent().find('.currentValue');
       
        holeItem.score[type] = function(){
            var newValue, oldValue;
            oldValue = holeItem.score[type]
            if(oldValue == ""){
                oldValue = 0;
            };
            newValue = oldValue + value;
            if (newValue < 0){
                newValue = 0;
            };
            return newValue;
        }();

        currentVals.html("("+holeItem.score[type]+")");
        holeItem.score["total"] = holeItem.score["putts"] + holeItem.score["shots"];
   };


    var _roundSelected = function(scoreCardId){
        $(".loader").css("display","block");
        $("#previousScoreCard").css("display","none");
        $("#previousRoundSelector").css("display","none");
        $http.get('/api/scorecard/'+scoreCardId).success(function(data){
            $scope.previousResults = data.results.data[0].holes;
            $(".loader").css("display","none");
            $("#previousScoreCard").css("display","block");
        });
    };

    /*private functions*/
    function AddZero(num) {
        return (num >= 0 && num < 10) ? "0" + num : num + "";
    }

    /* template - helpers */
    $scope.removeDashes= function(exp){
        return exp.replace(/\-/, " ");

    };
    $scope.formatDate= function(strDate){
        var date = new Date(strDate);
        return [[AddZero(date.getDate()), AddZero(date.getMonth() + 1), date.getFullYear()].join("/"), [AddZero(date.getHours()), AddZero(date.getMinutes())].join(":"), date.getHours() >= 12 ? "PM" : "AM"].join(" ");
    };

    $scope.addStroke = _AddStroke;
    $scope.saveScore = _saveScore;
    $scope.endRound = _endRound;
    $scope.showPreviousResults = _showPreviousResults;
    $scope.roundSelected = _roundSelected;

}]).config(function($interpolateProvider) {
    //Got to change delimiters as Handlebar is used on the server
    $interpolateProvider.startSymbol('{[{');
    $interpolateProvider.endSymbol('}]}');
});



