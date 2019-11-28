import { Injectable } from "@angular/core";
import { ServicioMecanicoService } from "../servicio-mecanico.service";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ServiciosContextService {
  private serviciosSource: any = new BehaviorSubject([]);
  currentServicios = this.serviciosSource.asObservable();

  constructor(private serviciosService: ServicioMecanicoService) {
    this.getServicios();
  }

  setServicios = (servicios: any) => this.serviciosSource.next(servicios);

  getServicios = () =>
    this.serviciosService.servicios().subscribe(
      result => this.serviciosSource.next(result),
      error => console.error(JSON.stringify(error))
    );
}
