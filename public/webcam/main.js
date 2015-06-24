/*
 *  Copyright (c) 2014 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */

'use strict';

// Put variables in global scope to make them available to the browser console.
var video = document.querySelector('video');
var canvas = window.canvas = document.querySelector('#layer1');
var overlay = document.querySelector('#layer2');
var ga = 0.0;
var timerId = 0;
canvas.width = 480;
canvas.height = 360;

overlay.width = 480;
overlay.height = 360;

var context = overlay.getContext("2d");
function fadeIn()
{
    context.clearRect(0,0, overlay.width,overlay.height);
    context.globalAlpha = ga;
    var ie = new Image();
    ie.onload = function()
    {
        context.drawImage(ie, 0, 0, canvas.width, canvas.height);
    };
    ie.src = "brandmeyer.jpg";

    ga = ga + 0.1;
    if (ga > 1.0)
    {
        clearInterval(timerId);
    }
}

var button = document.querySelector('button');
button.onclick = function() {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').
        drawImage(video, 0, 0, canvas.width, canvas.height);

    overlay.width = video.videoWidth;
    overlay.height = video.videoHeight;
    timerId = setInterval("fadeIn()", 100);



};

var constraints = {
    audio: false,
    video: true
};

function successCallback(stream) {
    window.stream = stream; // make stream available to browser console
    attachMediaStream(video, stream);
}

function errorCallback(error) {
    console.log('navigator.getUserMedia error: ', error);
}

navigator.getUserMedia(constraints, successCallback, errorCallback);