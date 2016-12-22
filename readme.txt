vue init webpack soulution-name
npm run dev
npm run build


遇到的问题

1.实现与v1中 href="{{path}}/assets/themes/style.css" 类似html元素属性插值
  在v2中应该这么写 :href="path+'/assets/themes/style.css'" 
  其中path为data数据

2.页面中加载css
  在页面上直接引用是错误的，尽管你的路径是正确的，也无济于事
  需要在dev-server.js中配置express
  //使用静态文件比如css 目录指向是'./src/assets'
  //用/assets调用
  app.use('/assets',express.static('./src/assets'))
  例如：
  <link rel='stylesheet' id='style-css' :href="path+'/assets/themes/style.css?ver=0.9'" type='text/css' media='screen' />

3.让methods中能够使用dom元素 
  绑定方法的时候
  <div class="box" @click="bindClick('123',$event)"></div>
  给一个$event的参数
  在methods中就可以使用event
  bindClick:function(param,event){
      console.log(param,event)
      //当前对象
      var _target = event.target
	
  }

4.父组件传递数据给子组件
  在data中定义一个参数
  return {
     path:configs.path
  }
  在子组件上绑定值
  <web-container :path="path"></web-container>
  最后在子组件中使用path
  需要定义个props
  export default {
     props:["path"]
  }
  在template中可以直接引用 path 参数
  还有一点
  path这个参数可以传递N个子组件
  只要在子组件中定义了props
  可以像这样传递值下去
  <web-right :path="path"></web-right>
  
5.需要在Vue.http.get或者返回值
  1).使用 Promise
  2).调用完方法 使用then 获取返回值


import Vue          from 'vue' 
import VueResource  from 'vue-resource'

Vue.use(VueResource) 

export default {

	getViewWebData:function(dataUrl,params){
        
        return new Promise(function (resolve, reject) {    
            Vue.http.get(dataUrl,{params:params} )
            .then(function(response) {
                resolve(response.data)
               
            }, function(response) {
                console.log('fail ' + response.status + "," + response.statusText)
            })
            .catch(function(response) {
                console.log(response)
            })
            .finally(function(){

            }) 
        })

    }
}

调用

export default {
  
  data: function() {
    return { 
        
    }
  },
  mounted: function() {
    var _this = this
    Func.getViewWebData(this.dataUrl,this.params).then(function(data){
       _this.typeList = data
    })
  }

}


6.模板复用造成的数据不更新
当复用模板的时候组件的生命周期钩子不会再被调用
在当前vue中 添加watch监控$route
watch: {
    '$route' (to, from) { 
      //清空数据
      this.art         = "" 
      //重新获取数据
      this.getItem(to.params.id)
      
    }
}
  

7.SyntaxHighlighter代码高亮在router中失效
不用SyntaxHighlighter.all()
用SyntaxHighlighter.highlight()
并且使用setTimeout延迟触发
initHightlighter:function(){
     setTimeout(function(){
        SyntaxHighlighter.highlight()
     },2000) 
}

