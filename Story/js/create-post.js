/**
 * AddActivity view model
 */

var app = app || {};

app.CreatePost = (function () {
    'use strict'

    var createPostViewModel = (function () {

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

        var savePost = function () {

            // Validating of the required fields
            if (validator.validate()) {

                // Adding new activity to Activities model
                var posts = app.Stories.posts;
                var post = posts.add();

                post.Text = $newStatus.val();
                post.UserId = app.Users.currentUser.get('data').Id;

                posts.one('sync', function () {
                    app.mobileApp.navigate('#:back');
                });

                posts.sync();
            }
        };

        return {
            init: init,
            show: show,
            me: app.Users.currentUser,
            savePost: savePost
        };

    }());

    return createPostViewModel;

}());
