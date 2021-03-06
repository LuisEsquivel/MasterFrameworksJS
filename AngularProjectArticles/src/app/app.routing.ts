

//Importar los modulos de rutas de angular
import {ModuleWithProviders} from '@angular/core';
import {Routes , RouterModule} from '@angular/router';


//Imprtar los componentes a los cuales les quiero aplicar una ruta
import {HomeComponent}  from './components/home/home.component';
import {BlogComponent}  from './components/blog/blog.component';
import {FormularioComponent} from './components/formulario/formulario.component';
import {PeliculasComponent} from './components/peliculas/peliculas.component';
import {PaginaComponent} from './components/pagina/pagina.component';
import {ArticleComponent} from './components/article/article.component';
import {SearchComponent} from './components/search/search.component';
import {ArticleNewComponent} from './components/article-new/article-new.component';
import {ArticleUpdateComponent} from './components/article-update/article-update.component';

//Ruta de error debe de ser la última siempre
import {ErrorComponent} from './components/error/error.component';



//Array de rutas
const appRoutes: Routes =[
   {path : '', component:HomeComponent},
   {path : 'home', component:HomeComponent},
   {path : 'blog', component:BlogComponent},
   {path : 'blog/articulo/:id', component:ArticleComponent},
   {path : 'formulario', component:FormularioComponent},
   {path : 'peliculas', component:PeliculasComponent},
   {path : 'pagina-de-pruebas', component:PaginaComponent},
   {path : 'pagina-de-pruebas/:nombre/:apellidos', component:PaginaComponent},
   {path : 'buscar/:search', component: SearchComponent},
   {path : 'crear-articulo', component : ArticleNewComponent},
   {path : 'actualizar-articulo/:id', component : ArticleUpdateComponent},

   //Ruta de error debe de ser la última siempre
   {path : '**', component:ErrorComponent}
]

//Exportar el modulo de rutas
export const appRoutingProviders : any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);