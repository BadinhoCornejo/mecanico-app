import { Injectable } from "@angular/core";
import {
  CanActivate,
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from "@angular/router";
import { Observable } from "rxjs";
import { ServicioUsuarioService } from "./services/servicio-usuario.service";

@Injectable({
  providedIn: "root"
})
export class AppAuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private router: Router,
    private userService: ServicioUsuarioService
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.validate();
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.validate();
  }

  validate = () =>
    this.userService.isAdmin ? true : this.router.navigateByUrl("") && false;
}
