"use strict";


var handlebars = require('express3-handlebars');

module.exports = {

    isActive: function (current, link) {
        var className;

        if(current == link){
            className = "active";
        }else{
            className = "";
        }

        return className;
    },

    json: function(context){
      return JSON.stringify(context);
    },

    isSingleCourse: function(context){
        if(context.length == 1){
            return true;
        }else{
            return false;
        }
    },

    urlFriendly: function(name){
        return name.replace(/\s/g, "-");


    }
};