import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { headers } from "../../headers.js";

@Injectable({
  providedIn: "root"
})
export class ServicioPersonalService {
  constructor(private httpClient: HttpClient) {}

  public list = () =>
    this.httpClient.get("api/personal/listaPersonal", { headers: headers });
}
