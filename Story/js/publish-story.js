
var app = app || {};

app.PublishStory = (function () {
    'use strict'

    var publishStoryViewModel = (function () {

        var init = function () {

        };

        var show = function () {

        };

        var publishStory = function () {
            app.mobileApp.navigate('views/showStoryView.html');
        };

        return {
            init: init,
            show: show,
            me: app.Users.currentUser,
            publishStory: publishStory,
        };

    }());

    return publishStoryViewModel;

}());

