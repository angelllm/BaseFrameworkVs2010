import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-left-bar',
  templateUrl: './left-bar.component.html',
  styleUrls: ['./left-bar.component.css']
})
export class LeftBarComponent implements OnInit {

  constructor(private http: Http,private router:Router) { }
  commite:{}; 
  typeList:{};
  tagList:{}; 
  blogstat = {};

  ngOnInit() {

  	this.http
		   .get('http://www.llmztt.com/Api/Result?method=getCommitelist' )
		   .subscribe(res =>this.commite = res.json())  

	this.http
		   .get('http://www.llmztt.com/Api/Result?method=getBlogstat' )
		   .subscribe(res =>this.blogstat = res.json())

	this.http
		   .get('http://www.llmztt.com/Api/Result?method=typeList' )
		   .subscribe(res =>this.typeList = res.json())

	this.http
		   .get('http://www.llmztt.com/Api/Result?method=getTaglist' )
		   .subscribe(res =>this.tagList = res.json())


  }

  ngOnChange() {
  	console.log("change")
  }

}
