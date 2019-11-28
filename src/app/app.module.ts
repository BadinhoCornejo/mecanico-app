import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

//ROUTING
import { RouterModule } from "@angular/router";

//Html Client
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

//UI
//Toast
import { ToastrModule } from "ngx-toastr";
//Forms
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
//ANGULAR MATERIAL
import { MatMenuModule } from "@angular/material/menu";
import { MatListModule } from "@angular/material/list";

import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatSelectModule } from "@angular/material/select";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatDialogModule } from "@angular/material/dialog";
import { MatStepperModule } from "@angular/material/stepper";
import { TextFieldModule } from "@angular/cdk/text-field";

import { MatSidenavModule } from "@angular/material/sidenav";

import { MatIconModule } from "@angular/material/icon";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

//SERVICIOS
import { ServicioMecanicoService } from "./services/servicio-mecanico.service";
import { ServicioUsuarioService } from "./services/servicio-usuario.service";
import { BasicAuthInterceptorService } from "./services/basic-auth-interceptor.service";

//AUTH
import { AppAuthGuard } from "./app-auth.guard";

import { AppComponent } from "./app.component";
import { LoginComponent } from "./components/login/login.component";
import { LayoutComponent } from "./components/layout/layout.component";
import { SignupComponent } from "./components/signup/signup.component";
import { HeaderComponent } from "./components/header/header.component";
import { NewServiceComponent } from "./components/new-service/new-service.component";
import { ServicesComponent } from "./components/list-services/services.component";
import { EditServiceComponent } from "./components/edit-service/edit-service.component";
import { AddDetailComponent } from "./components/add-detail/add-detail.component";
import { AdminLayoutComponent } from "./components/admin-layout/admin-layout.component";
import { QuickNewServiceComponent } from "./components/quick-new-service/quick-new-service.component";
import { QuickAddDetailComponent } from "./components/quick-add-detail/quick-add-detail.component";
import { QuickEditServiceComponent } from "./components/quick-edit-service/quick-edit-service.component";
import { ConfirmationMessageComponent } from "./components/confirmation-message/confirmation-message.component";
import { ServicioClienteService } from "./services/servicio-cliente.service";
import { ServicioPersonalService } from "./services/servicio-personal.service";
import { AddServiceStepperComponent } from "./components/add-service-stepper/add-service-stepper.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LayoutComponent,
    SignupComponent,
    HeaderComponent,
    NewServiceComponent,
    ServicesComponent,
    EditServiceComponent,
    AddDetailComponent,
    AdminLayoutComponent,
    QuickNewServiceComponent,
    QuickAddDetailComponent,
    QuickEditServiceComponent,
    ConfirmationMessageComponent,
    AddServiceStepperComponent
  ],
  entryComponents: [
    QuickAddDetailComponent,
    QuickNewServiceComponent,
    QuickEditServiceComponent,
    ConfirmationMessageComponent
  ],
  imports: [
    BrowserModule,
    MatMenuModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatListModule,
    MatInputModule,
    MatSidenavModule,
    MatIconModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatSelectModule,
    MatDatepickerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatStepperModule,
    TextFieldModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: "toast-top-right",
      preventDuplicates: true
    }),
    RouterModule.forRoot([
      {
        path: "",
        component: LoginComponent
      },
      {
        path: "signup",
        component: SignupComponent
      },
      {
        path: "admin",
        component: LayoutComponent,
        canActivate: [AppAuthGuard],
        canActivateChild: [AppAuthGuard],
        children: [
          {
            path: "",
            component: AdminLayoutComponent
          },
          {
            path: "newService",
            component: AddServiceStepperComponent
          },
          {
            path: "addDetail",
            component: AddDetailComponent
          },
          {
            path: "services",
            component: ServicesComponent
          }
        ]
      }
    ])
  ],
  providers: [
    AppAuthGuard,
    ServicioMecanicoService,
    ServicioUsuarioService,
    ServicioClienteService,
    ServicioPersonalService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BasicAuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
