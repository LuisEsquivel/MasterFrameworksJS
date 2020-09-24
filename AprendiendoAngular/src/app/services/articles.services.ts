

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from './global';
import { Article } from '../models/article';
import { IfStmt } from '@angular/compiler';


@Injectable()

export class ArticleService {

    public url: string;

    selectedFile: File = null;
    fd = new FormData();


    constructor(private _httpClient: HttpClient) {
        var g = new Global();
        this.url = g.url();
    }


    pruebas() {
        alert("soy el servicio de articulos");
    }


    getArticles(last: any = false, id:any = null): Observable<any> {

        var param = 'articles/null/null';

        if (last) {
            param = 'articles/last/null'
        }

        if(id != null){
           param = 'articles/null/'+id;
        }

        return this._httpClient.get(this.url + param);

    }


    search(param : any):Observable<any>{

        return this._httpClient.get(this.url+"search/"+param);

    }


    create(article) : Observable<any>{

        let objeto = JSON.stringify(article);
        let headers = new HttpHeaders().set("Content-Type" , "application/json")

        return this._httpClient.post(this.url+"save/", objeto, {headers:headers});

    }

    update(article, updateImage:boolean = false) : Observable<any>{

        let objeto = JSON.stringify(article);
        let headers = new HttpHeaders().set("Content-Type" , "application/json")
       
        if(updateImage){
          return this._httpClient.put(this.url+"article/"+updateImage, objeto, {headers : headers});
        }
        
        return this._httpClient.put(this.url+"article/"+false, objeto, {headers : headers});

    }


    delete(id): Observable<any>{
        return this._httpClient.delete(this.url+"article/"+id);
    }  

    uploadImage(event, id): Observable<any>{

        if(event != null){

        this.selectedFile = <File>event.target.files[0];
        this.fd.append('file', this.selectedFile, id + ".jpg");
        return this._httpClient.post(this.url+"article-image/", this.fd);

        }
  
    }

}