vue init webpack soulution-name
npm run dev
npm run build


����������

1.ʵ����v1�� href="{{path}}/assets/themes/style.css" ����htmlԪ�����Բ�ֵ
  ��v2��Ӧ����ôд :href="path+'/assets/themes/style.css'" 
  ����pathΪdata����

2.ҳ���м���css
  ��ҳ����ֱ�������Ǵ���ģ��������·������ȷ�ģ�Ҳ�޼�����
  ��Ҫ��dev-server.js������express
  //ʹ�þ�̬�ļ�����css Ŀ¼ָ����'./src/assets'
  //��/assets����
  app.use('/assets',express.static('./src/assets'))
  ���磺
  <link rel='stylesheet' id='style-css' :href="path+'/assets/themes/style.css?ver=0.9'" type='text/css' media='screen' />

3.��methods���ܹ�ʹ��domԪ�� 
  �󶨷�����ʱ��
  <div class="box" @click="bindClick('123',$event)"></div>
  ��һ��$event�Ĳ���
  ��methods�оͿ���ʹ��event
  bindClick:function(param,event){
      console.log(param,event)
      //��ǰ����
      var _target = event.target
	
  }

4.������������ݸ������
  ��data�ж���һ������
  return {
     path:configs.path
  }
  ��������ϰ�ֵ
  <web-container :path="path"></web-container>
  ������������ʹ��path
  ��Ҫ�����props
  export default {
     props:["path"]
  }
  ��template�п���ֱ������ path ����
  ����һ��
  path����������Դ���N�������
  ֻҪ��������ж�����props
  ��������������ֵ��ȥ
  <web-right :path="path"></web-right>
  
5.��Ҫ��Vue.http.get���߷���ֵ
  1).ʹ�� Promise
  2).�����귽�� ʹ��then ��ȡ����ֵ


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

����

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


6.ģ�帴����ɵ����ݲ�����
������ģ���ʱ��������������ڹ��Ӳ����ٱ�����
�ڵ�ǰvue�� ���watch���$route
watch: {
    '$route' (to, from) { 
      //�������
      this.art         = "" 
      //���»�ȡ����
      this.getItem(to.params.id)
      
    }
}
  

7.SyntaxHighlighter���������router��ʧЧ
����SyntaxHighlighter.all()
��SyntaxHighlighter.highlight()
����ʹ��setTimeout�ӳٴ���
initHightlighter:function(){
     setTimeout(function(){
        SyntaxHighlighter.highlight()
     },2000) 
}

