


'use strict'


var validator = require('validator');
var Article = require('../models/article');
const article = require('../models/article');
var fs = require('fs');
var path = require('path');

var controller = {

    datosCurso : (req, res) => {
  
        return res.status(200).send({
         curso : "del poderoso Luis",
         perro : "spolon"

        } )
    },



    test : (req, res) => {
        return res.status(200).send({
            message: 'Soy la acción test de mi controlador articulos'
        })
    },


    save : (req, res) => {

        // Recoger parámetros por post
            var params = req.body;

        try{

            
            // Validar parámetros con la librería validator
            var validate_title  = !validator.isEmpty(params.title);
            var validate_content  = !validator.isEmpty(params.content);

        }catch(err){
            return res.status(200).send({
                  status : 'error',
                  message : 'perra'
            });
        }



      
        if(validate_title && validate_content){
      
    
        //Crear el objeto a guardar
        var article = new Article();

        // Asignar valores
        article.title = params.title;
        article.content = params.content;
        article.image = null;

        //Guardar el articulo
        article.save( (err, articleStored) => 
        {

           if(err || !articleStored){
               return res.status(400).send( {
                status : 'error',
                message : 'El artículo no se ha guardado !!!'
               });
           }  



         // Devolver una respuesta
        return res.status(200).send({
           message : 'success',
           article : articleStored
        });

        });
        


        }else{
                 return res.status(404).send({
                    status : 'error', 
                    message : 'Faltan datos por enviar !!!'
            });
        }


    }  ,
    


    getArticles: (req, res) => {


        var query = Article.find({});
        var last = req.params.last;
         
        if(last && last != undefined){
            query.limit(5);
        }

        query.sort('-_id').exec( (err, articles) => {

            if(err){
                return res.status(500).send({
                    status : 'error', 
                    message : 'Error al devolver los artículos!!!'
            });
           }

           if(!articles){
            return res.status(404).send({
                status : 'error', 
                message : 'No hay artículos!!!'
        });
       }


       return res.status(200).send({
        status : 'success', 
        articles
      });


    });//end query.sort


    },


    updateArticle: (req, res) => {

        try {
            var params = req.body;
            var validatorTitle = !validator.isEmpty(params.title);
            var validatorContent = !validator.isEmpty(params.content);
            var articleId = req.params.id;

            if(validatorTitle && validatorContent){
                
              
              Aritcle.findOneAndUpdate({_id: articleId}, params, {new:true}, (err, articleUpdated) =>{
                 
                 if(err || !articleUpdated){
                    return res.status(500).send({
                        status : 'error', 
                        message : 'No se pudo actualizar el articulo !!!'
                      });
                 }else{
                    return res.status(200).send({
                        status : 'success', 
                        articleUpdated
                      });
                 }

              } );
                

            }else{

                return res.status(500).send({
                    status : 'error', 
                    message : 'La validación no es correcta !!!'
                  });

            }
            
        } catch (error) {

            return res.status(404).send({
                status : 'success', 
                articles
              });
            
        }

    },



    deleteArticle: (req, res) =>{

     try {

        var articleId = req.params.id;

        if(articleId && articleId != null){

            Article.findOneAndDelete({_id:articleId}, (err, articleDeleted) => {


                if(err || articleDeleted){

                    return res.status(200).send( {          
                      status: 'success',
                      message: articleDeleted
                    });

                }else{

                    return res.status(500).send( {          
                        status: 'error',
                        message: 'No se encontró el artículo, probablemente no exista en la base de datos!!!'
                      });

                }

            });

        }else{

            return res.status(500).send( {          
                status: 'error',
                message: 'No se encontró el artículo, probablemente no exista en la base de datos!!!'
              });
        }
         
     } catch (error) {

        return res.status(404).send( {          
            status: 'error',
            message: 'No se pudo eliminar el articulo !!!'
          });
         
     }

    },


  
  upload: (req, res) => {

  try {

    var file_name = 'Imagen no subida';

    if(!req.files){
        return res.status(404).send( {          
            status: 'error',
            message: file_name
          });
    }


    var file_path = req.files.files0.path;
    var file_split = file_path.file_split('\\');
    
    file_name = file_split[2];

    var extension_split = file_name.split('\.');
    var file_ext = extension_split[1];

    if(file_ext != 'png'  && file_split.file_ext != 'jpg' && file_ext != 'jpeg' && file_ext != '.gif'){
      
         fs.unlink(file_path, (err) =>{
            return res.status(200).send( {          
                status: 'error',
                message: 'La extensión de la imagen no es valida'
              });
         } );

    }else{


        //Buscar el articulo y actualizar la imágen
        var articleId = req.params.id;
        Article.findOneAndUpdate( {_id:articleId}, {image:file_name}, {new:true}, (err, articleUpdated) =>{
          
           if(err || !articleUpdated){
            return res.status(200).send( {          
                status: 'error',
                message: 'Error al guardar la imagen'
              });
           }

            return res.status(200).send( {          
                status: 'success',
                article: articleUpdated
              });

        });


    }
      
  } catch (error) {

    return res.status(404).send( {          
        status: 'error',
        message: 'Algo salio mal!!!'
      });
      
  }


  },



  getImage: (req, res) =>{

   var file = req.params.image;
   var path_file = './upload/articles/'+file

   fs.existsSync(path_file, (exists) => {

      if(exists){

        return res.sendFile(path.resolve(path_file));

      }else{
        return res.status(404).send( {          
            status: 'error',
            message: 'La imagen no existe!!!'
          });
      }

   });

  }



}// end controller



module.exports = controller;