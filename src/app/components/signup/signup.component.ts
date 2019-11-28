import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ServicioUsuarioService } from "../../services/servicio-usuario.service";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.sass"]
})
export class SignupComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  usuario: any;
  userExists: String;

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

  goLogin = () => this.router.navigateByUrl("");

  verificarUsername(event?, username?: String) {
    let _username = event ? event.target.value : username;

    this.usuarioService.checkUsername(_username).subscribe(
      result => {
        this.usuario = result;
        this.userExists = this.usuario ? "Nombre de usuario ya en uso" : " ";
      },
      error => console.error(JSON.stringify(error))
    );
  }

  get f() {
    return this.form.controls;
  }

  submitRegistry() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    let _usuario = this.form.value;

    this.verificarUsername(_usuario.username);

    if (this.userExists === " ") {
      this.usuarioService.newUser(_usuario).subscribe(
        result => this.goLogin(),
        error => console.error(JSON.stringify(error))
      );
    }
  }
}
