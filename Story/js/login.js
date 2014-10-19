/**
 * Login view model
 */

var app = app || {};

app.Login = (function () {
    'use strict';

    var loginViewModel = (function () {

        var $loginUsername;
        var $loginPassword;
        var isHttp = (appSettings.everlive.scheme === 'http');

        var isFacebookLogin = app.isKeySet(appSettings.facebook.appId) && app.isKeySet(appSettings.facebook.redirectUri);
      
        var $slides;
        var $slide_buttons;

        var init = function () {
            if (!app.isKeySet(appSettings.everlive.apiKey)) {
                app.mobileApp.navigate('views/noApiKey.html', 'fade');
            }

            $loginUsername = $('#loginUsername');
            $loginPassword = $('#loginPassword');

            if (!isFacebookLogin) {
                $('#loginWithFacebook').addClass('disabled');
                console.log('Facebook Client ID and/or Redirect URI not set. You cannot use Facebook login.');
            }

            $slides = $('.login-screen');
            $slides.on("click", changeSLide);
            $slide_buttons = $('#login-screen-tab');
            if (1 || localStorage && !localStorage.getItem('firstOpen'))
            {
              $slides.hide();
              $slides.eq(0).show();
  
              $slide_buttons.kendoMobileButtonGroup({
                  select: function(e, data) {
                      if (this.current().index() > 2) return;
                      $slides.hide();
                      $slides.eq(this.current().index()).show();
                    
                      if (localStorage) {
                          localStorage.setItem('firstOpen', true);
                      }
                    
                      if (this.current().index() >= 2) {
                        $slide_buttons.hide();
                      }
                  },
                  index: 0
              });
            } else {
                $slide_buttons.hide();
            }
        };
      
        var changeSLide = function () {
          var buttongroup = $slide_buttons.data("kendoMobileButtonGroup");
          var nextSlide = buttongroup.current().index()+1;
          
          if (nextSlide > 2) return;

          // selects by jQuery object
          buttongroup.select(nextSlide);
          
          $slides.hide();
          $slides.eq(nextSlide).show();
        
          if (localStorage) {
              localStorage.setItem('firstOpen', true);
          }
          
          if (nextSlide >= 2) {
            $slide_buttons.hide();
          }
        };

        var show = function () {
            $loginUsername.val('test');
            $loginPassword.val('1234');
        };

        var getYear = function () {
            var currentTime = new Date();
            return currentTime.getFullYear();
        };

        // Authenticate to use Backend Services as a particular user
        var login = function () {

            var username = $loginUsername.val();
            var password = $loginPassword.val();

            // Authenticate using the username and password
            app.everlive().Users.login(username, password)
            .then(function () {
                // EQATEC analytics monitor - track login type
                return app.Users.load();
            })
            .then(function () {
                app.mobileApp.navigate('views/createStoryView.html');
            })
            .then(null,
                  function (err) {
                      app.showError(err.message);
                  }
            );
        };

        // Authenticate using Facebook credentials
        var loginWithFacebook = function() {

            if (!isFacebookLogin) {
                return;
            }

            var facebook = new FacebookIdentityProvider(appSettings.facebook.appId);
            facebook.init();
            app.mobileApp.showLoading();

            facebook.getAccessToken(function(token) {
                if (token) {
                    app.everlive().Users.loginWithFacebook(token)
                    .then(function () {
                        // EQATEC analytics monitor - track login type
                        if (isAnalytics) {
                            analytics.Start();
                            analytics.TrackFeature('Login.Facebook');
                        }
                        return app.Users.load();
                    })
                    .then(function () {
                        app.mobileApp.hideLoading();
                        app.mobileApp.navigate('views/createStoryView.html');
                    })
                    .then(null, function (err) {
                        app.mobileApp.hideLoading();
                        if (err.code == 214) {
                            app.showError('The specified identity provider is not enabled in the backend portal.');
                        } else {
                            app.showError(err.message);
                        }
                    });
                } else {
                    app.mobileApp.hideLoading();
                }
            });
        };

        return {
            init: init,
            show: show,
            getYear: app.getYear,
            login: login,
            loginWithFacebook: loginWithFacebook
        };

    }());

    return loginViewModel;

}());

