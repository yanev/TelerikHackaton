/**
 * Login view model
 */

var app = app || {};

app.Home = (function () {
    'use strict';

    var homeViewModel = (function () {

        var init = function () {

            $("#trending-listview").kendoMobileListView({
                dataSource: app.Stories.stories,
                template: $("#trending-template").text()
                // filterable: {
                //     field: "name",
                //     operator: "startswith"
                // }
            });
        };

        var show = function () {

        };

        var storyNavigate = function (e) {
            app.mobileApp.navigate('views/showStoryView.html?story_id=' + e.data("Id"));
        };

        return {
            init: init,
            show: show
        };

    }());

    return homeViewModel;

}());

