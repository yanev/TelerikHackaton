

var app = app || {};

app.ShowStory = (function () {
    'use strict'

    var showStoryViewModel = (function () {

        var init = function (e) {
            if (e.view.params.story_id) {
                var storiesData, story;


                app.Stories.stories.fetch(function(data) {

                    story = $.grep(data.items, function (e2) {
                        return e2.Id === e.view.params.story_id;
                    })[0];

                    $('.story-title').text(story.name).show();
                    $('.story-cover').attr('src', app.helper().resolvePictureUrl(story.cover)).show();
                });

                // var story = app.Stories.stories.get(e.view.params.story_id);

                app.Posts.posts.filter({
                    'field': 'story',
                    'operator': 'eq',
                    'value': e.view.params.story_id
                });

                $("#showStory").kendoMobileListView({
                    dataSource: app.Posts.posts,
                    template: $("#post-template").text(),
                });
            }
        };

        var show = function () {

        };

        return {
            init: init,
            show: show,
            me: app.Users.currentUser,
            name: 'test'
        };

    }());

    return showStoryViewModel;

}());

