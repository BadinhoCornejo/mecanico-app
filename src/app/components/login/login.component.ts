import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ServicioUsuarioService } from "../../services/servicio-usuario.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.sass"]
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  usuario: any;
  userNotFoundMessage: String = "";

  constructor(
    private usuarioService: ServicioUsuarioService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.form = formBuilder.group({
      username: ["", Validators.required],
      password: ["", [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {
    this.verificarSesion();
  }

  verificarSesion = () =>
    sessionStorage.getItem("usuario")
      ? this.router.navigateByUrl("admin")
      : (this.usuario = null);

  setUserNotFoundMessage = () =>
    (this.userNotFoundMessage = "No se encontró un usuario con esta cuenta 🙁");

  goRegistry = () => this.router.navigateByUrl("signup");

  get f() {
    return this.form.controls;
  }

  submitLogin() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    let _usuario = this.form.value;

    this.usuarioService.login(_usuario).subscribe(
      result => {
        this.usuario = result;

        if (this.usuario) {
          let authString =
            "Basic " +
            btoa(this.usuario.username + ":" + this.form.value.password);
          sessionStorage.setItem("usuario", JSON.stringify(this.usuario));
          sessionStorage.setItem("basicauth", authString);
          this.usuarioService.setIsAdminLog(true);
          this.router.navigateByUrl("admin");
        }
      },
      error => {
        this.setUserNotFoundMessage();
        console.error(JSON.stringify(error));
      }
    );
  }
}
