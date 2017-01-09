<template>
	<div class="box">
		<div class="leftbar_bg"></div>
		<div class="leftbar">
			<!-- 左菜单 -->
			<div class="left_menu">
				<ul class="menu_link">
	                <li><router-link to="/" class="simptip-position-left simptip-smooth simptip-movable pjax" data-tooltip="主页"><i class="fa fa-paper-plane"></i><span>主页</span><div class="clearfix"></div></router-link></li>
	                <li><router-link to="/list/" class="simptip-position-left simptip-smooth simptip-movable pjax" data-tooltip="日志"><i class="fa fa-book"></i><span>日志</span><div class="clearfix"></div></router-link></li>
	                <li><router-link to="/about/" class="simptip-position-left simptip-smooth simptip-movable pjax" data-tooltip="关于我"><i class="fa fa-anchor"></i><span>关于我</span><div class="clearfix"></div></router-link></li>
	                <li><router-link to="/music/" class="simptip-position-left simptip-smooth simptip-movable pjax" data-tooltip="音乐"><i class="fa fa-music"></i><span>音乐</span><div class="clearfix"></div></router-link></li>
	            </ul>
	        </div>
		</div>
	    <div class="wrapper_bg"></div>
	</div>
</template>

<script>
export default {
   
  data () {
    return {
    }
  }
}
</script>
 
<style scoped>
 
</style>