/*****
*This is a fake CMS.
*
*It would not normally be a blob of json hard coded in a file. Only like this for simplicity.
*
****/

"use strict";

module.exports.getText = function (req, res, page){
    getCMSModelData(page, function(err, data, page){
        res.render(page, data);
    })
};


var getCMSModelData = function(page, next){
        var text = {
            index: {
                pageName : "home",
                title: "Demo: Golf scorecard app",
                splashText: "A slightly contrived demonstration of Node and other coding 'bits and bobs'. ",
                paragraphs : [{
                        header: "About this demo",
                        text: "The aim of this sample project was to create an easy to use Golf Scorecard.<br/><br/> This demonstration app was create using various tool and techniques. This include Node.js (express and handlebars), AngularJS and more",
                        link: {
                            href: "/about",
                            text: "read more..."
                        }
                    },
                    {
                        header: "Golf Scorecard App",
                        text: "<img src='/img/screenshot.jpg' class='screenshot' alt='Screenshot of Golf Scorecard App' />",
                        link: {
                            href: "/golfScores",
                            text: "Go to the app",
                            className: "btn btn-default"
                        }
                    }]
            },
            about: {
                pageName : "about",
                title: "About this demo",
                splashText: "Libraries and excuses",
                paragraph1: "<strong>Had less time than i had hoped, I hope to work on this demo over the weekend - hopefully I'll get to fix some of the issues</strong><h3>General Architecture</h3><p>Node.js app connects to a MongoDB instance (@mongolab.com). HTML is created by parsing the template using Handlebar templates. In the client the page is a AngularJS application. </p> <h3>Other libraries</h3> <p>JQuery, twitter bootstrap, Skrollr (might not use this)</p> <h3>Important notes</h3><p> Please note this is a demo application and in no-way a final production ready system. I've listed changes that I intend to make over the next few weeks. </p><p> <strong>Angular JS</strong> - I am not using routes, this means you can't go directly to a results page - creating a poor UX. Possibly split up the controllers as well.</p><p> <strong>Graphical Design</strong> - No significant effort has gone in to creating a design - it just uses lots of bootstrap defaults. </p><p><strong>Node.js</strong> - I am not handling errs and empty recordsets correctly. </p><p> <strong>General</strong> There are situations where Node should do the parsing of data into a HTML document, instead of angular requests: i.e. I don't see the point of a page loading then immediately calling back to the server for information, which is then parsed in the client. </p><h3>Functionality</h3><p>Loads of functionality missing, i.e. total score, previous results should be listed and much more</p>"
            },
            golfscores: {
                pageName : "golfScores",
                title: "Don't know what goes here yet",
                splashText: "blur",
                paragraph1: ""
            }
        };

   next(null,text[page],page);
}