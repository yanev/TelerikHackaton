

var app = app || {};

app.ShowStory = (function () {
    'use strict'

    var showStoryViewModel = (function () {

        var init = function (e) {
            if (e.view.params.story_id) {
              
              $("#showStory").kendoMobileListView({
                dataSource: app.Posts.posts,
                template: $("#post-template").text(),
                /*filterable: {
                    field: "story",
                    operator: "eq",
                    value: e.view.params.story_id
                }*/
            });
            }
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

