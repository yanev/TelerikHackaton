/**
 * Posts view model
 */

var app = app || {};

app.Posts = (function () {
    'use strict'


    // e.view.params.story_id
    // Posts model
    var postsModel = (function () {

        var postModel = {

            id: 'Id',
            fields: {
                text: {
                    field: 'text',
                    defaultValue: ''
                },
                CreatedAt: {
                    field: 'CreatedAt',
                    defaultValue: new Date()
                },
                image: {
                    fields: 'image',
                    defaultValue: null
                },
                is_hidden: {
                    fields: 'is_hidden',
                    defaultValue: null
                },
                position: {
                    fields: 'position',
                    defaultValue: null
                },
                status: {
                    fields: 'status',
                    defaultValue: null
                },
                story: {
                    fields: 'story',
                    defaultValue: null
                },
                story_id: {
                    fields: 'story_id',
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
            ImageUrl: function () {
                return app.helper().resolvePictureUrl(this.get('image'));
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

        // Posts data source. The Backend Services dialect of the Kendo UI DataSource component
        // supports filtering, sorting, paging, and CRUD operations.
        var postsDataSource = new kendo.data.DataSource({
            type: 'everlive',
            schema: {
                model: postModel
            },
            transport: {
                // Required by Backend Services
                typeName: 'Posts'
            },
            change: function (e) {

                $('#no-posts').show();

                // if (e.items && e.items.length > 0) {
                //     $('#no-posts').hide();
                // } else {
                //     $('#no-posts').show();
                // }
            },
            sort: { field: 'CreatedAt', dir: 'asc' }
        });

        return {
            posts: postsDataSource
        };

    }());

    // Posts view model
    var postsViewModel = (function () {

        var init = function (e) {
            var users = app.Users.users();

            $('.btn.btn-circle').attr('href', "views/createPostView.html?story_id=" + e.view.params.story_id);

            if (e.view.params.story_id) {

                postsModel.posts.filter({
                    'field': 'story',
                    'operator': 'eq',
                    'value': e.view.params.story_id
                });
                app.postsCurrentStory = e.view.params.story_id;
            }

            if (!users) {
                app.helper().reload();
            }

            // e.view.element.find("#posts-listview").kendoMobileListView({
            //     dataSource: postsModel.posts,
            //     template: $("#postTemplate").html()
            // })//.kendoTouch({
            //     filter: ">li",
            //     enableSwipe: true,
            //     touchstart: touchstart,
            //     tap: navigate,
            //     swipe: swipe
            // });


            // function navigate(e) {
            //     var itemUID = $(e.touch.currentTarget).data("uid");
            //     // kendo.mobile.application.navigate("#edit-detailview?uid=" + itemUID);
            // }

            // function swipe(e) {
            //     var button = kendo.fx($(e.touch.currentTarget).find(".post-action-hide"));
            //     console.log('swipe called');
            //     button.expand().duration(200).play();
            // }

            // function touchstart(e) {
            //     var target = $(e.touch.initialTouch),
            //         listview = $("#posts-listview").data("kendoMobileListView"),
            //         model,
            //         button = $(e.touch.target).find(".post-action-hide");

            //     if (target.closest(".post-action-hide")[0]) {
            //         model = dataSource.getByUid($(e.touch.target).attr("data-uid"));
            //         dataSource.remove(model);

            //         //prevent `swipe`
            //         this.events.cancel();
            //         e.event.stopPropagation();
            //     } else if (button[0]) {
            //         button.hide();
            //         //prevent `swipe`
            //         this.events.cancel();
            //     } else {
            //         listview.items().find(".post-action-hide").hide();
            //     }
            // }
        };

        // Navigate to postView When some post is selected
        var postSelected = function (e) {

            app.mobileApp.navigate('views/postView.html?uid=' + e.data.uid);
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

        return {
            init: init,
            posts: postsModel.posts,
            postSelected: postSelected,
            logout: logout
        };

    }());

    return postsViewModel;

}());
