import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { headers } from "../../headers.js";

@Injectable({
  providedIn: "root"
})
export class ServicioUsuarioService {
  private isAdminLog: Boolean = false;
  usuario: any;
  constructor(private httpClient: HttpClient) {
    this.usuario = JSON.parse(sessionStorage.getItem("usuario"));
    if (this.usuario === null) {
      this.isAdminLog = false;
    } else if (this.usuario.role.roleID === 2) {
      this.isAdminLog = true;
    }
  }

  setIsAdminLog(value: Boolean) {
    this.isAdminLog = value;
  }

  get isAdmin() {
    return this.isAdminLog;
  }

  /**
   * Login
   */
  public login(usuario: any) {
    let _usuario = JSON.stringify(usuario);

    return this.httpClient.post("api/usuario/login", _usuario, {
      headers: headers
    });
  }

  /**
   * Registrar
   */

  public newUser(usuario: any) {
    return this.httpClient.post("api/usuario/new", usuario, {
      headers: headers
    });
  }

  /**
   * Verificar si existe nombre de usuario
   */
  public checkUsername(username: String) {
    return this.httpClient.get(`api/usuario/checkUsername/${username}`, {
      headers: headers
    });
  }
}
