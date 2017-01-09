import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';


@Injectable()
export class ViewArticleDataService {

    constructor (private http: Http) {
    	//http.get('http://www.llmztt.com/Vue2/Result?method=getArticleList').subscribe(res=> res.json());
    }
   
 	getViewData() {
        http.get('http://www.llmztt.com/Vue2/Result?method=getArticleList').subscribe(res=> res.json());
    }

}
