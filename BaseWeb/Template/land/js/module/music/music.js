define(function (require, exports, module) {

    require("vendor/plug/mediaelement-and-player.min")
    var init = function () {
        	setTimeout(function(){
            	$('audio,video').mediaelementplayer()
            },1000)
        }

    init()


})