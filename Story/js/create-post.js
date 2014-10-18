/**
 * AddActivity view model
 */

var app = app || {};

app.CreatePost = (function () {
    'use strict'

    var createPostViewModel = (function () {

        var $newPost;
        var $newImage;
        var validator;

        var init = function () {

            var users = app.Users.users();
            if (!users) {
                app.helper().reload();
            }

            validator = $('#enterPost').kendoValidator().data("kendoValidator");
            $newPost = $('#postText');
            $newImage = $('#postImage');
        };

        var addImage = function() {
            var success = function (data) {
                var filename = Math.random().toString(36).substring(2, 15) + ".jpg";

                var fileObj = {
                    "Filename"    : filename,
                    "ContentType" : 'image/jpeg',
                    "base64"      : data
                };

                $('.create-post-image')
                    .attr('src', "data:image/jpeg;base64," + data)
                    .removeClass('hidden');

                $.ajax({
                    type: "POST",
                    url: 'https://api.everlive.com/v1/' + appSettings.everlive.apiKey + '/Files',
                    contentType: "application/json",
                    data: JSON.stringify(fileObj),
                    error: function(error){
                        navigator.notification.alert(JSON.stringify(error));
                    }
                }).done(function(data){
                    // var item = imagesViewModel.images.add();
                    // item.Title = that.get('picTitle');
                    // item.Picture = data.Result.Id;
                    $('.create-post-image').data('imageId', data.Result.Id);
                });

                // app.everlive().Files.create({
                //     Filename: filename,
                //     ContentType: "image/jpeg",
                //     base64: data
                // }).then(function(result) {
                //     // Show the captured photo.
                //     $('.create-post-image')
                //         .attr('src', "data:image/jpeg;base64," + data)
                //         .removeClass('hidden')
                //         .data('filename', filename)
                //         .data('base64', data);
                // });
            };
            var error = function () {
                navigator.notification.alert("Unfortunately we could not add the image");
            };
            var config = {
                destinationType: Camera.DestinationType.DATA_URL,
                targetHeight: 400,
                targetWidth: 400
            };
            navigator.camera.getPicture(success, error, config);
        };

        var show = function () {

            // Clear field on view show
            $newPost.val('');
            validator.hideMessages();
        };

        var savePost = function () {

            // Validating of the required fields
            if (validator.validate()) {

                // Adding new activity to Activities model
                var posts = app.Posts.posts;
                var post = posts.add();

                post.text = $newPost.val();
                post.story = app.postsCurrentStory;

                post.image = $('.create-post-image').data('imageId');
                post.UserId = app.Users.currentUser.get('data').Id;

                posts.one('sync', function () {
                    app.mobileApp.navigate('views/postsView.html');
                });

                posts.sync();
            }
        };

        return {
            init: init,
            show: show,
            me: app.Users.currentUser,
            savePost: savePost,
            addImage: addImage
        };

    }());

    return createPostViewModel;

}());
