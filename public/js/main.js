
$(function() {

    /*Get heights*/
    var screenHeight = $(window).height();
    $(".slide").css("height",screenHeight);
    $(".slide-count-1").css("height",screenHeight);

    var s = skrollr.init({
        constants : {
            vp: screenHeight
        }
    });

    $(".toastClose").on("click", function(){
        $(this).parent().hide()
    })


    /*temp fix until i properly sort out the skrollr issue*/
    fixHeightForMobileSkrollr();
    window.addEventListener("resize", function() {
	    fixHeightForMobileSkrollr();
    }, false);
});

function ytdMessage(type){
    /*temp function*/
    var msg;

    if (type == 'signin'){
        msg = "The sign in process has not yet been completed.";
    }
    if (type == 'newCourse'){
        msg = "Sorry the 'Add new course' functionality has not yet been completed";
    }
    $(".toast p").html(msg);
    $(".toast").show();
    return false;
}
/*temp fix until i properly sort out the skrollr issue*/
function fixHeightForMobileSkrollr(){
    setTimeout(function(){
        var skrollrHeight = $(".topRow").height();
        $("#skrollr-body").css("height", skrollrHeight + "px");
    },500);

}
function changeTab(tab){
    $("#myTab a[href='#"+tab+"']").tab('show');
}

function showAllRounds(){
    $("#previousScoreCard").css("display","none");
    $("#previousRoundSelector").css("display","block");
    return false;
}