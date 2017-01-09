$(document).ready(function(){

    $(".bg-white-only").addClass("bg-black").removeClass("bg-white-only");
    $(".doc-buttons").remove();
    paylist = [];
    $.each($(".play-list-item"), function (index, item) {
        var $this = $(item);
        //console.log($this.attr("data-bind"));
        $.ajax({
            type: "POST",
            url: "/Music/GetMusic/",
            async: false,
            data: {
                songid: $this.attr("data-bind")
            },
            beforeSend: function () {
                 
            },
            success: function (result) {
                //console.log(result);
                result = eval("(" + result + ")");
                //console.log(result);
                try {
                    var bitrate = result.bitrate[0];
                    var song = result.songinfo;
                    //$("audio source").attr("src", bitrate.file_link);
                    //console.log(bitrate);
                    //console.log(song);
                    //console.log(song.song_id + "" + $this.find(".text-ellipsis span").text());
                    var time = bitrate.file_duration;
                    $this.find(".text-muted").append(TimeDiff(time));
                    $this.find(".icon-cloud-download").parent().attr("href", "javascript:;").attr("data-bind", bitrate.file_link).click(function () {
                        art.dialog({
                            title: '\u4e0b\u8f7d\u4fe1\u606f',
                            id: "win_tip", 
                            content: '<h4>'+song.title+'<small><i class="glyphicon glyphicon-cloud-download"></i> '+song.author+' '+(parseInt(bitrate.file_size/1024/1024))+' MB / mp3  </small></h4><div class="alert alert-warning">\u56e0\u767e\u5ea6\u9632\u76d7\u94fe\u8bbe\u7f6e\uff0c\u8bf7\u76f4\u63a5\u590d\u5236\u94fe\u63a5\u5730\u5740\u4e0b\u8f7d\u3002</div><div class="alert alert-success"><span class="label label-success">\u4e0b\u8f7d\u5730\u5740 </span>' + bitrate.file_link + '</div><div class="alert alert-info"><span class="label label-info">\u6b4c\u8bcd </span><a href="' + song.lrclink + '" target="_blank">' + song.lrclink + '</a></div>',
                            resize: false,  
                            lock: true

                        });
                    });

                    $this.find(".icon-close").click(function () {
                        $(this).parent().parent().parent().slideUp(200);
                    });
                  
                    //console.log(song.title);
                    paylist.push(
                        {
                            title: song.title ,
                            artist: song.author, 
                            //mp3: bitrate.file_link,
                            mp3: bitrate.show_link,
                            poster: song.pic_premium
                        }
                        );

                } catch (e) {
                    $this.find(".text-muted").append("00:00");
                }
                if (index == $(".play-list-item").length - 1) {
                    initPlayList();
                }
            },
            error: function () {

            }
        })
    });

     

    function TimeDiff(timelength){
        timelength = parseInt(timelength);
        return "0" + ((timelength / 60) | 0) + ":" + (timelength % 60);
    }

    function initPlayList() {

        var myPlaylist = new jPlayerPlaylist(
        {
            jPlayer: "#jplayer_N",
            cssSelectorAncestor: "#jp_container_N"
        },
            paylist
           ,
            {
                playlistOptions: {
                    enableRemoveControls: true,
                    autoPlay: true
                },
                swfPath: "js/jPlayer",
                supplied: "webmv, ogv, m4v, oga, mp3",
                smoothPlayBar: true,
                keyEnabled: true,
                audioFullScreen: false
            });

        $(document).on($.jPlayer.event.pause, myPlaylist.cssSelector.jPlayer, function () {
            $('.musicbar').removeClass('animate');
            $('.jp-play-me').removeClass('active');
            $('.jp-play-me').parent('li').removeClass('active');
        });

        $(document).on($.jPlayer.event.play, myPlaylist.cssSelector.jPlayer, function () {
            $('.musicbar').addClass('animate');
        });

        $(document).on('click', '.jp-play-me', function (e) {
            e && e.preventDefault();
            var $this = $(e.target);
            if (!$this.is('a')) $this = $this.closest('a');

            $('.jp-play-me').not($this).removeClass('active');
            $('.jp-play-me').parent('li').not($this.parent('li')).removeClass('active');

            $this.toggleClass('active');
            $this.parent('li').toggleClass('active');
            if (!$this.hasClass('active')) {
                myPlaylist.pause();
            } else {
                //var i = Math.floor(Math.random() * (1 + 7 - 1));
                //console.log(i);
                var inds = parseInt($this.attr("data-bind")) - 1;
                myPlaylist.play(inds);
                $("#pos-rlt .img-full").attr("src", paylist[inds]["poster"]);
                $("#pos-rlt .h2").text(paylist[inds]["title"] + " by " + paylist[inds]["artist"]);
            }
            //console.log("xxx");
        });

    }

  // video

  $("#jplayer_1").jPlayer({
    ready: function () {
      $(this).jPlayer("setMedia", {
        title: "Big Buck Bunny",
        m4v: "http://flatfull.com/themes/assets/video/big_buck_bunny_trailer.m4v",
        ogv: "http://flatfull.com/themes/assets/video/big_buck_bunny_trailer.ogv",
        webmv: "http://flatfull.com/themes/assets/video/big_buck_bunny_trailer.webm",
        poster: "images/m41.jpg"
      });
    },
    swfPath: "js",
    supplied: "webmv, ogv, m4v",
    size: {
      width: "100%",
      height: "auto",
      cssClass: "jp-video-360p"
    },
    globalVolume: true,
    smoothPlayBar: true,
    keyEnabled: true
  });

});