<template>
	<div id="main">
        <!-- content -->		
        <div id="content">
            <transition name="fade">
                <router-view :base="base"></router-view>
            </transition>
        </div>
        <!-- content --> 
    </div>

</template>

<script>

export default {
  props:["base"],  
  data: function() {
    return { 
      
    }
  }  
}
</script> 
 
<style>
 
</style> 