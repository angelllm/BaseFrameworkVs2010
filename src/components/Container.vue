<template>
<div id="wp_box" class="container">  
    <!-- leftbar -->	
	  <web-left></web-left>
    <div id="wrapper" class="toggle-wrapper">
        <!-- main -->
      <web-content :base="base"></web-content>
	    <!-- rightbar -->
	    <web-right :type-list="typeList"></web-right>
  	</div>
  	<div class="clearfix"></div>
</div>
</template>

<script type="text/javascript">

import WebLeft    from 'components/include/Left'
import WebContent from 'components/Content' 
import WebRight   from 'components/include/Right' 
export default {
  props:["base","typeList"], 
  data: function() {
    return { 
       
    }
  },
  created:function(){
    //console.log(props)
  } 
  ,
  components:{ WebLeft,WebRight,WebContent }
}
</script>