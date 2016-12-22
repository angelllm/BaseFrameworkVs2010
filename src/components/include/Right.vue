<template>
	<div class="rightbar">
		<web-about :path="path"></web-about>
		<div class="sidebar-contentWrapper">
			<web-categories :type-list="typeList"></web-categories>
			<web-blogstat></web-blogstat>
			<web-archive></web-archive>
			<web-tag></web-tag>
			<web-comment></web-comment>
	     </div>		    
     </div>	
</template>

<script>
import WebAbout    		from 'components/include/About'
import WebCategories    from 'components/include/Categories'
import WebBlogstat   	from 'components/include/Blogstat'
import WebTag    		from 'components/include/Tag'
import WebComment    	from 'components/include/Comment'
import WebArchive    	from 'components/include/Archive'


export default {
  props:["path","typeList"], 
  data: function() {
    return { 
    	
    }
  }
  ,
  components:{ WebAbout,WebCategories,WebBlogstat,WebTag,WebComment,WebArchive }
}
</script>
 
<style scoped>
 
</style>