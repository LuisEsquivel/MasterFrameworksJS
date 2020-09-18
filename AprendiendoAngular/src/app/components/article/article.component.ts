import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ArticleService } from '../../services/articles.services';
import { Article } from '../../models/article';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = require('sweetalert');

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],

  providers:[ ArticleService ]
})
export class ArticleComponent implements OnInit {

  public article : Article[];

  constructor(
    private _articleService : ArticleService,
    private _router : Router,
    private _route : ActivatedRoute


  ) { }

  ngOnInit(): void {

    this._route.params.subscribe( params => {

       var id = params['id'];
      

       this._articleService.getArticles(false, id).subscribe( 

        response=>{
  
          if(response.articles){
           
            this.article = response.articles;

          }else{
            this.article = [];
          }
        
        }, 
        error=>{
           console.log(error);
           this.article = [];
        }
  
       );

     

    } );

  }


  Delete(){
    
    swal({
      title: "¿Estás seguro(a) de eliminar este artículo?",
      text: "¡Una vez eliminado no se podrá recuperar!",
      icon: "warning",
      buttons: ['Cancelar', 'Confirmar']
    })
    .then((willDelete) => {
      if (willDelete) {

        this._articleService.delete(this.article[0]._id).subscribe(
           
          response=>{
               if(response.status == "success"){
                swal("¡El artículo se ha eliminado!", {
                  icon: "success",
                });
                this._router.navigate(['/blog']);
               }else{
                swal("Algo salió mal", "¡No se pudo eliminar el artículo!", "error");
               }
          },

          error=>{
            swal("Algo salió mal", "¡No se eliminar el artículo!", "error");
          }
          
        )

      } else {
        swal("Ok el artículo no se eliminó :)");
      }
    });

  }


}
