import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})


export class ArticleListComponent implements OnInit {
	list:{};
	commite:{};
	//params:{method:"getArticleList",pagesize:100,pageindex:1,q:'',tag:''} 

    constructor(private http: Http,private router:Router) { }

	ngOnInit() {
	   	
	   var _url = this.router.url.split("/")
	   var _param = ""
	   if(_url.length >= 3) {
	   	  var _tag = _url[1]
	   	  if(_tag == "tag") {
	   	  	 _url[1] = "tagname"
	   	  }
	   	  else if(_tag == "category") {
	   	  	 _url[1] = "name"
	   	  }
	   	  _param = "&tag="+_url[1]+"&q="+_url[2]
	   }

	   this.http
		   .get('http://www.llmztt.com/Api/Result?method=getArticleList&pagesize=100&pageindex=1'+ _param )
		   .subscribe(res =>this.list = res.json())  
	   this.http
		   .get('http://www.llmztt.com/Api/Result?method=getCommitelist' )
		   .subscribe(res =>this.commite = res.json())  		   
	}

	routeChangeSuccess(r){
		console.log(r)
	}
	
}
