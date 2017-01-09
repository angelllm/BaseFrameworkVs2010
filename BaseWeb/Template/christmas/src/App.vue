<template>
  <div class="box">
     <div class="content" v-if="!isStart" >
        <div class="loader" v-if="isLoading"><span class="loader_letter">L</span><span class="loader_letter">O</span><span class="loader_letter">A</span><span class="loader_letter">D</span><span class="loader_letter">I</span><span class="loader_letter">N</span><span class="loader_letter">G</span></div>
        <a @click.stop-1="handleMusic" @click.stop-2="handleElement" v-if="!isLoading" class="start">开启圣诞之旅</a></div>
     <div :class="{'loading-content':true,'loading':isStart}">
       <router-view></router-view>
       <span @click="handleMusic" class="music">音乐</span>
       <video class="hide" id="video"  loop="" src="http://llmztt.com/assets/song.mp3"></video>
     </div>
     
  </div>
</template>

<script>
import Vue            from 'vue' 
import indexComponent from './components/indexComponent' 

export default {
  
  data: function() {
    return { 
       isPlay:false,
       isLoading:false,
       isStart:true
    }
  },
  mounted: function() {
      //document.getElementById("video").play() 
      var _this = this
      setTimeout(function(){
        _this.isLoading = false
      },3000)
  },
  computed: function() {
      
  },
  methods:{
     handleMusic:function(){
        this.isPlay = !this.isPlay
        if(this.isPlay)
           document.getElementById("video").play()  
        else 
           document.getElementById("video").pause()  

        //console.log(this.isPlay)
     },
     handleElement:function(){
        this.isStart = true
        this.isLoading = false
        //console.log("handleElement")
     }
  },
  components: { indexComponent }
}  
</script>

<style>
.music{display: inline-block;position: absolute;left: 10px;top:10px;cursor:pointer;color: #fff;z-index: 99999; }
.hide{display: none;}
.content {
    background: #9C27B0;
    animation: hue 10s linear infinite;
    min-height: 100%;
    z-index: 99999;
    position: absolute;
    left:0;
    top:0;
    width: 100%;
}
.start{width: 200px;height: 50px;background: #1D8CE0;border-radius: 5px;color: #fff;position: absolute;line-height: 50px;
    text-align: center;top: 45%;left:20%;}
.loading-content{opacity: 0}
.loading{opacity: 1}
.loader {
    position: absolute;
    text-align: center;
    width: 100%;
    height: 2em;
    top: 50%;
    margin-top: -1em;
}
.loader_letter {
    text-transform: uppercase;
    color: #fff;
    font-family: "Helvetica", sans-serif;
    font-weight: bold;
    padding: 0 .2em;
    font-size: 2em;
    line-height: 1;
    position: relative;
    display: inline-block;
    animation: bounce 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) infinite alternate;
}
.loader_letter:nth-child(1) {
    animation-delay: 0s;
}
.loader_letter:nth-child(2) {
    animation-delay: 0.05s;
}
.loader_letter:nth-child(3) {
    animation-delay: 0.1s;
}
.loader_letter:nth-child(4) {
    animation-delay: 0.15s;
}
.loader_letter:nth-child(5) {
    animation-delay: 0.2s;
}
.loader_letter:nth-child(6) {
    animation-delay: 0.25s;
}
.loader_letter:nth-child(7) {
    animation-delay: 0.3s;
}
@keyframes bounce {
    0% {
        transform: translateY(0px);
    }
    100% {
        transform: translateY(-1em);
    }
}
@keyframes hue {
    0% {
        filter: hue-rotate(0deg);
    }
    100% {
        filter: hue-rotate(360deg);
    }
}
</style>
