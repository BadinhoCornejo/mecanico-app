import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.sass"]
})
export class HeaderComponent implements OnInit {
  usuario: any;

  constructor() {}

  ngOnInit() {
    this.getUsuario();
  }

  getUsuario() {
    sessionStorage.getItem("usuario")
      ? (this.usuario = sessionStorage.getItem("usuario"))
      : (this.usuario = null);
  }

  signOut() {
    sessionStorage.removeItem("usuario");
    sessionStorage.removeItem("basicauth");
    window.location.reload();
  }
}
