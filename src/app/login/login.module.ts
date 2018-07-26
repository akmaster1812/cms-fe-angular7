import { CommonModule }  from '@angular/common';
import { NgModule }      from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule }     from '@angular/platform-browser';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { LoginComponent }    from './login.component';
import { AuthService }       from '@utils/auth/auth.service';

@NgModule({
  imports: [
    FormsModule, ReactiveFormsModule,
    CommonModule,
    NgZorroAntdModule.forRoot(),
  ],
  declarations: [
    LoginComponent,
  ],
  providers: [
    AuthService
  ],
})
export class LoginModule {}
