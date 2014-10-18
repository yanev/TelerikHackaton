/**
 * AddActivity view model
 */

var app = app || {};

app.CreateStory = (function () {
    'use strict'

    var createStoryViewModel = (function () {

        var $storyName;
        var $storyStatus;
        var $storyStatusButtons;
        var $helpStoryStatus;
        var validator;

        var init = function () {

            var users = app.Users.users();
            if (!users) {
                app.helper.reload();
            }

            validator = $('#enterStory').kendoValidator().data("kendoValidator");
            $storyName = $('#storyName');
            $storyStatus = $('#storyStatus');
            $storyStatusButtons = $("#select-story-status").kendoMobileButtonGroup({
                select: function(e, data) {
                    $storyStatus.val(app.Stories.storyType[this.current().index()]);                     
                },
                index: 0
            });
            $helpStoryStatus = $('#helpStoryStatus')
                .bind('click', function() {
                    app.mobileApp.navigate('views/storyStatusHelpView.html');
                });
        };

        var show = function () {

            // Clear field on view show
            $storyName.val('');
            $storyStatus.val('');
            validator.hideMessages();
        };

        var saveStory = function () {

            // Validating of the required fields
            if (validator.validate()) {

                // Adding new activity to Activities model
                var stories = app.Stories.stories;
                var story = stories.add();

                story.name = $storyName.val();
                story.status = $storyStatus.val();
                //story.UserId = app.Users.currentUser.get('data').Id;

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
