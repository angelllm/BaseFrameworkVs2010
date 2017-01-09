<template>
<div id="index"> 
    <router-link to="/" class="back">&lt;&lt;返回</router-link>
    <h1>Merry Christmas</h1>
    <center>
        <h3>有奖翻牌,不要相信眼睛看到的!</h3>
        <h4>机会只有一次!</h4>
        <a id="info" v-if="isError" class="btn green" data-toggle="modal" href="#basic">
            机会只有一次哦!
        </a>
    </center>
    <ul id="card-ul">
        <li id="li-1">
            <div class="door">1</div>
        </li>
        <li id="li-2">
            <div class="door">2</div>
        </li>
        <li id="li-3">
            <div class="door">3</div>
        </li>
        <li id="li-4">
            <div class="door">4</div>
        </li>
        <li id="li-5">
            <div class="door">5</div>
        </li>
        <li id="li-6">
            <div class="door">6</div>
        </li>
        <li id="li-7">
            <div class="door">7</div>
        </li>
        <li id="li-8">
            <div class="door">8</div>
        </li>
        <li id="li-9">
            <div class="door">9</div>
        </li>
        <li id="li-10">
            <div class="door">10</div>
        </li>
        
    </ul> 
    <p id="message"></p>

</div>
</template>

<script>
if (!Array.prototype.shuffle) {
    Array.prototype.shuffle = function() {
        for(var j, x, i = this.length; i; j = parseInt(Math.random() * i), x = this[--i], this[i] = this[j], this[j] = x);
        return this;
    };
}

import Vue          from 'vue' 
import $            from 'jquery' 

export default {
  
  data: function() {
    return { 
       click:0,
       time1:5000,
       time2:6000, 
       id:"",
       isError:false
    }
  },
  mounted: function() {

    var words = ["火锅", "水果盒子", "4亿", "飞吻", "谢谢", "谢谢", "谢谢", "谢谢", "谢谢", "谢谢"];
    var _this = this

    $("#card-ul li").on("click", function() {
        if (_this.id == "")  _this.id = $(this).attr("id")
        if (_this.id == $(this).attr("id") || _this.id == "") { 
            $(this).children(".door").toggleClass("open");
            $(this).removeClass("jiggle");
        } 
        else if (_this.click >= 1) {
            _this.isError = true
            return
        } 
        _this.click ++ 
        
    });

    this.getCard(words,function(){
        words.shuffle().shuffle().shuffle()
        setTimeout(function(){
            _this.getCard(words,function(){},false)
        },_this.time2)
        
    },true) 
  },
  computed: function() {
      
  },
  methods:{

     getCard:function(words,callback,isOpen){

         var message = "";
         var scrolled = false;
         var timeDelay = 200;
         var timeDelay2 = this.time1;
         var _lis = $("#card-ul li")
         var _length = _lis.length
         _lis.each(function(index) {
            var adventwindow = index + 1;
            var item = $(this); 
            if (isOpen) {
                window.setTimeout(function() {
                    item.children(".door").addClass("open");
                }, timeDelay);

                window.setTimeout(function() {
                    item.children(".door").removeClass("open");
                }, timeDelay2); 
                
                timeDelay += 100;
                timeDelay2 += 100;
            }
            
          
            var word = words[index];
            if (item.find(".revealed")[0]) {
                item.find(".revealed").text(word)
            }else{
                item.append('<div class="revealed">' + word + '</div>');
            }
            message = message + " " + word;
              
            if (index == _length - 1 && isOpen) {
                callback()
            }

        });

     }
  },
  components: {  }
}  
</script>

<style>
@import 'http://fonts.googleapis.com/css?family=Oleo+Script)';
body {
    background: url("http://llmztt.com/assets/images/xmas.jpg");
    color: #fff;
    font-family: 'Oleo Script', cursive;
    padding: 20px 0;
    font-weight: 400;
}
h1 {
    margin: 0;
    font-size: 75px;
    line-height: 75px;
    text-align: center;
    font-weight: 400;
}
ul {
    margin: 0 auto 0px auto;
    padding: 0;
    list-style-type: none;
    max-width: 900px;
    width: 100%;
    text-align: center;
    user-select: none;
}
li {
    font-weight: 400;
    background-color: #fff;
    box-sizing: border-box;
    border-radius: 6px;
    display: inline-block;
    color: #111;
    cursor: pointer;
    font-size: 26px;
    padding: 15px;
    margin: 25px 12px;
    width: 130px;
    height: 130px;
    line-height: 100px;
    text-align: center;
    position: relative;
    vertical-align: top;
    user-select: none;
    perspective: 800px;
    transition: all 0.4s ease-in-out;
}

.door {
    user-select: none;
    color: #fff;
    font-size: 70px;
    position: absolute;
    top: 0;
    left: 0;
    background-color: #91c1cc;
    box-sizing: border-box;
    border-top: 2px #eee dashed;
    border-right: 2px #eee dashed;
    border-bottom: 2px #eee dashed;
    border-left: 1px #eee solid;
    border-radius: 6px;
    padding: 15px;
    width: 130px;
    height: 130px;
    transform-origin: 0 40%;
    transition: all 0.4s ease-in-out;
    transform-style: preserve-3d;
}
.current .door {
    background-color: #7EAD44;
}
.current .door.open {
    color: #7EAD44;
}

.revealed {
    user-select: none;
    line-height: normal;
    display: inline-block;
    width: 70px;
}
#message {
    box-sizing: border-box;
    color: #222;
    display: none;
    font-size: 24px;
    padding: 20px;
    background: #eddecb;
    max-width: 500px;
    width: 100%;
    border-radius: 15px;
    margin: 0 auto;
}
.open {
    box-shadow: 14px 0px 15px -1px rgba(0, 0, 0, 0.2);
    color: #91c1cc;
    transform: rotate3d(0, 1, 0, -98deg);
}
.jiggle {
    animation: jiggle 0.2s infinite;
    transform: rotate(-1deg);
}
@keyframes jiggle {
    0% {
        transform: rotate(-1deg);
    }
    50% {
        transform: rotate(1deg);
    }
}
@media screen and (min-width: 480px) {
    li {
        margin: 25px 20px;
    }
}
@media screen and (min-width: 768px) {
    body {
        background-size: 150px;
    }
    p {
        right: 6%;
        top: 20%;
        bottom: auto;
        margin-left: auto;
        left: auto;
    }
}
.back{position: absolute;right: 10px;top:10px;color: #fff;display: inline-block;background: #20A0FF;border-radius: 5px;text-decoration: none;padding: 1px 10px; }
</style>
