import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { headers } from "../../headers.js";

@Injectable({
  providedIn: "root"
})
export class ServicioMecanicoService {
  constructor(private httpClient: HttpClient) {}

  /**
   * Agregar un servicio
   */
  public add(servicio: any) {
    return this.httpClient.post("api/servicio/agregarServicio", servicio, {
      headers: headers
    });
  }

  /**
   * Buscar un servicio mecanico
   */
  public findServicioMecanico(servmcID: number) {
    return this.httpClient.get(`api/servicio/buscarSrvMecanico/${servmcID}`, {
      headers: headers
    });
  }

  public findServicioMecanicoByFecha(servicioMecanico: number) {
    return this.httpClient.post(
      "api/servicio/servicioByFecha",
      servicioMecanico,
      {
        headers: headers
      }
    );
  }

  /**
   * Buscar un detalle
   */
  public findDetalle(servdtID: number) {
    return this.httpClient.get(`api/servicio/buscarDetalle/${servdtID}`, {
      headers: headers
    });
  }

  /**
   * Eliminar un servicio
   */
  public deleteServicios(servicios: any) {
    return this.httpClient.post(`api/servicio/eliminarServicios`, servicios, {
      headers: headers
    });
  }

  /**
   * Agregar un detalle
   */
  public addDetalle(detalleServicio: any) {
    return this.httpClient.post(
      "api/servicio/agregarDetalle",
      detalleServicio,
      { headers: headers }
    );
  }

  /**
   * Editar un detalle
   */
  public editDetalle(detalleServicio: any) {
    return this.httpClient.put("api/servicio/editarServicio", detalleServicio, {
      headers: headers
    });
  }

  /**
   * Listado de servicios
   */
  public list() {
    return this.httpClient.get("api/servicio/serviciosDetalle", {
      headers: headers
    });
  }

  /**
   * Listado de servicios
   */
  public servicios() {
    return this.httpClient.get("api/servicio/servicios", { headers: headers });
  }
}
