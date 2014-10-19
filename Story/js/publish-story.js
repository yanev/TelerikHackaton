
var app = app || {};

app.PublishStory = (function () {
    'use strict'

    var selectedStory;
  
    var publishStoryViewModel = (function () {

        var init = function (e) {
            if (e.view.params.story_id) {
              selectedStory = e.view.params.story_id;
            }
        };

        var show = function () {

        };

        var publishStory = function () {
            app.mobileApp.navigate('views/showStoryView.html?story_id=' + selectedStory);
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

