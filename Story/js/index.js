/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        navigator.splashscreen.hide();
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },

    service: function() {
        var el = el || new Everlive({
            apiKey: appSettings.everlive.apiKey,
            scheme: appSettings.everlive.scheme
        });

        return el;
    },
    helper: function() {
        return {

            // Return user profile picture url
            resolveProfilePictureUrl: function (id) {
                if (id && id !== emptyGuid) {
                    return el.Files.getDownloadUrl(id);
                } else {
                    return '/images/avatar.png';
                }
            },

            // Return current activity picture url
            resolvePictureUrl: function (id) {
                if (id && id !== emptyGuid) {
                    return el.Files.getDownloadUrl(id);
                } else {
                    return '';
                }
            },

            // Date formatter. Return date in d.m.yyyy format
            formatDate: function (dateString) {

                var months = [
                    'Jan', 'Feb', 'Mar',
                    'Apr', 'May', 'Jun',
                    'Jul', 'Aug', 'Sep',
                    'Oct', 'Nov', 'Dec'
                ];
                var date = new Date(dateString);
                var year = date.getFullYear();
                var month = months[ date.getMonth() ];
                var day = date.getDate();

                return month + ' ' + day + ', ' + year;
            },

            // Current user logout
            logout: function () {
                if (analytics.isAnalytics()) {
                    analytics.Stop();
                }
                return el.Users.logout();
            },

            reload: function () {
                if (!window.location.origin) {
                  window.location.origin = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
                }
                window.location.replace(window.location.origin);
            }
        };
    }
};