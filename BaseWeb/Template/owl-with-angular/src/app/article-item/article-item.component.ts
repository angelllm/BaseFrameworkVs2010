import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
 

@Component({
  selector: 'app-article-item',
  templateUrl: './article-item.component.html',
  styleUrls: ['./article-item.component.css']
})

export class ArticleItemComponent implements OnInit {
  allList = {};
  art = {};
  alist = {};
  c = {};

  constructor(private http: Http,private router:Router) { }
  
  ngOnInit() {
  	var _split = this.router.url.split("/")
  	var _id = _split[_split.length-1] 
  	
  	this.http
		   .get('http://www.llmztt.com/Api/Result?method=getItem&id='+_id )
		   .subscribe(res =>(this.allList = res.json(), this.art = res.json()[0]))  

  }
 
}
