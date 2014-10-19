

var app = app || {};

app.ShowStory = (function () {
    'use strict'

    var showStoryViewModel = (function () {

        var init = function (e) {
            alert(e.view.params.story_id);
        };

        var show = function () {

        };

        return {
            init: init,
            show: show,
            me: app.Users.currentUser
        };

    }());

    return showStoryViewModel;

}());

