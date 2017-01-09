npm install -g typescript typings
npm install -g angular-cli

ng new owl-with-angular
cd owl-with-angular

ng serve 

//创建一个叫small-header的组件
ng g component small-header
//常见一个叫viewArticleData的服务
ng g service viewArticleData
ng build