import { PostsModule } from './components/posts/posts.module';
import { LoginComponent } from './components/login/login.component';
import { CreateComponent } from './components/posts/create/create.component';
import { PostComponent } from './components/posts/post/post.component';
import { LayoutComponent } from './components/layout/layout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsComponent } from './components/posts/posts.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    loadChildren: () =>
      import('./components/posts/posts.module').then(
        (m) => m.PostsModule
      )
 },
 { path: 'login',
 loadChildren: () =>
   import('./components/login/login.module').then(
     (m) => m.LoginModule
   ) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
