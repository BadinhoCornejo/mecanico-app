import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";

@Component({
  selector: "app-admin-layout",
  templateUrl: "./admin-layout.component.html",
  styleUrls: ["./admin-layout.component.sass"]
})
export class AdminLayoutComponent implements OnInit {
  usuario: any;
  constructor(private toastr: ToastrService, private router: Router) {
    this.setUsername();
    this.toastr.show("Te extrañamos, " + this.usuario.username);
  }

  ngOnInit() {}
  setUsername = () =>
    (this.usuario = JSON.parse(sessionStorage.getItem("usuario")));

  goNewService = () => this.router.navigateByUrl("admin/newService");
  goServices = () => this.router.navigateByUrl("admin/services");
}
