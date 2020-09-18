import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Article } from '../../models/article';
import { ArticleService } from '../../services/articles.services';
import { SweetAlert } from 'sweetalert/typings/core';
import { stringify } from 'querystring';
const swal: SweetAlert = require('sweetalert');

@Component({
  selector: 'app-article-update',
  templateUrl: './article-update.component.html',
  styleUrls: ['./article-update.component.css'],

  providers: [ArticleService]
})
export class ArticleUpdateComponent implements OnInit {

  public article : Article;

  constructor(private http : ArticleService,
              private router :  Router,
              private route : ActivatedRoute     
             ) {
                  this.article = new Article('', '', '' ,'' , Date.now);
               }

  ngOnInit(): void {

    this.route.params.subscribe( params =>{

         let id = params['id'];
         
         this.http.getArticles('null', id).subscribe(

          response=>{

            if(response.articles){               
              this.article._id = response.articles[0]._id;
              this.article.title = response.articles[0].title;
              this.article.content = response.articles[0].content;
            }else{
              this.article = null;
            }

          },
          error=>{
            this.article = null;
          }

         )

    } );

  }



  onSubmit(){

    this.http.update(this.article).subscribe(

      response=>{
         if(response.status == 'success'){
          swal("Mensaje", "¡Artículo Actualizado!", "success");
          this.router.navigate(['/blog/articulo' , response.article._id]);
         }else{
          swal("Algo salió mal", "¡No se actualizó el artículo!" , "error");

         }
      },

      error=>{
        swal("Algo salió mal", "¡No se actualizó el artículo! "+ JSON.stringify(error), "error");
      }

    )

  }

}