/**
 * Stories view model
 */

var app = app || {};

app.Stories = (function () {
    'use strict'

    // Stories model
    var storiesModel = (function () {

        var storyModel = {

            id: 'Id',
            fields: {
                name: {
                    field: 'name',
                    defaultValue: ''
                },
                CreatedAt: {
                    field: 'CreatedAt',
                    defaultValue: new Date()
                },
                status: {
                    field: 'status',
                    defaultValue: null
                },
                cover: {
                    field: 'cover',
                    defaultValue: null
                },
                UserId: {
                    field: 'UserId',
                    defaultValue: null
                },
            },
            CreatedAtFormatted: function () {

                return app.helper().formatDate(this.get('CreatedAt'));
            },
            CoverUrl: function () {
                return app.helper().resolvePictureUrl(this.get('cover'));
            },
            User: function () {

                var userId = this.get('UserId');

                var user = $.grep(app.Users.users(), function (e) {
                    return e.Id === userId;
                })[0];

                return user ? {
                    DisplayName: user.DisplayName,
                    PictureUrl: app.helper().resolveProfilePictureUrl(user.Picture)
                } : {
                    DisplayName: 'Anonymous',
                    PictureUrl: app.helper().resolveProfilePictureUrl()
                };
            },
            isVisible: function () {
                var currentUserId = app.Users.currentUser.data.Id;
                var userId = this.get('UserId');

                return currentUserId === userId;
            }
        };

        // Stories data source. The Backend Services dialect of the Kendo UI DataSource component
        // supports filtering, sorting, paging, and CRUD operations.
        var storiesDataSource = new kendo.data.DataSource({
            type: 'everlive',
            schema: {
                model: storyModel
            },
            transport: {
                // Required by Backend Services
                typeName: 'Stories'
            },
            change: function (e) {
                if (e.items && e.items.length > 0) {
                    $('#no-stories').hide();
                } else {
                    $('#no-stories').show();
                }
            },
            sort: { field: 'CreatedAt', dir: 'desc' }
        });

        return {
            stories: storiesDataSource,
            storyType: ['public', 'private']
        };

    }());

    // Stories view model
    var storiesViewModel = (function () {

        var init = function () {
            var users = app.Users.users();
            if (!users) {
                app.helper().reload();
            }
        };

        // Navigate to activityView When some activity is selected
        var storySelected = function (e) {

            app.mobileApp.navigate('views/storyView.html?uid=' + e.data.uid);
        };

        // Navigate to app home
        var navigateHome = function () {

            app.mobileApp.navigate('#welcome');
        };

        // Logout user
        var logout = function () {
            app.helper().logout()
            .then(navigateHome, function (err) {
                app.showError(err.message);
                navigateHome();
            });
        };
      
        var storyNavigate = function (e) {
            app.mobileApp.navigate('views/showStoryView.html?story_id=' + e.data.Id);
        };

        return {
            init: init,
            stories: storiesModel.stories,
            storySelected: storySelected,
            logout: logout,
            storyType: storiesModel.storyType,
            storyNavigate: storyNavigate
        };

    }());

    return storiesViewModel;

}());
