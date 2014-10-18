/**
 * AddActivity view model
 */

var app = app || {};

app.CreateStory = (function () {
    'use strict'

    var createStoryViewModel = (function () {

        var $newStatus;
        var validator;

        var init = function () {

            var users = app.Users.users();
            if (!users) {
                app.helper.reload();
            }

            validator = $('#enterStatus').kendoValidator().data("kendoValidator");
            $newStatus = $('#newStatus');
        };

        var show = function () {

            // Clear field on view show
            $newStatus.val('');
            validator.hideMessages();
        };

        var saveStory = function () {

            // Validating of the required fields
            if (validator.validate()) {

                // Adding new activity to Activities model
                var stories = app.Stories.stories;
                var story = stories.add();

                story.name = $newStatus.val();
                story.UserId = app.Users.currentUser.get('data').Id;

                stories.one('sync', function () {
                    app.mobileApp.navigate('views/postsView.html?story_id=' + story.Id);
                });

                stories.sync();
            }
        };

        return {
            init: init,
            show: show,
            me: app.Users.currentUser,
            saveStory: saveStory
        };

    }());

    return createStoryViewModel;

}());
