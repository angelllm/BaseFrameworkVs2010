<template>
    <div class="box">
    	<div id="banner" class="with-tooltip"  data-tooltip=""></div>	
		<div class="banner_bg"></div> 
    </div>
</template>

<script>
export default {
  data: function() {
    return {
       
    }
  },
  methods: {


  } 
  ,
  mounted:function(){
	//this.$nextTick(function(){})
    rainBanner()
  }
}

import jQuery   from 'assets/plug/jquery-1.9.1.min'
import RainyDay from 'assets/plug/rainyday'
var rain = function(src) {
	var _image = new Image()
	_image.style.opacity = 0
	_image.onload = function() {
		var engine = new RainyDay({
			image: this
		}) 
		engine.rain([ [3, 2, 2] ], 100)
		/*engine.rain([
			[3, 3, 0.88],
			[5, 5, 0.9],
			[6, 2, 1]
		], 100)*/

	}
	_image.src = src
	var _banner = document.getElementById('banner')
	_banner.appendChild(_image)
	return _image 
}
var bannerlist = []
var initBanner = function(count) {
	for (var i = 0; i < count; i++) {
		bannerlist.push('/assets/images/banner-' + i + '.jpg')
	}
}

var rainBanner = function (speed,count) {
	initBanner(count || 3)
	var _img    = rain(bannerlist[0])
	var _speed  = speed || 120000
	var _index  = 0
	var _length = bannerlist.length
	var _banner = setInterval(function(){
		_index ++ 
		if (_index == _length) {
			_index = 0
		}
		jQuery("canvas").remove()
		_img.src = bannerlist[_index]
	},_speed)
}

 
</script>
 
<style scoped>
 
</style>

