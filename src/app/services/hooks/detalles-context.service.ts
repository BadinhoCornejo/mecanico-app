import { Injectable, ViewChild } from "@angular/core";
import { ServicioMecanicoService } from "../servicio-mecanico.service";
import { BehaviorSubject } from "rxjs";
import {
  MatTableDataSource,
  MatPaginator,
  MatSort,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog
} from "@angular/material";

@Injectable({
  providedIn: "root"
})
export class DetallesContextService {
  servicios: any = [];
  dataSource: MatTableDataSource<any>;
  private detallesSource: any = new BehaviorSubject(MatTableDataSource);
  currentDetails = this.detallesSource.asObservable();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private serviciosService: ServicioMecanicoService) {
    this.getDetalles();
  }

  setDetalles = (detalles: Array<any>) => {
    detalles.map(element => (element["eliminar"] = false));
    this.dataSource = new MatTableDataSource<any>(detalles);

    this.detallesSource.next(this.dataSource);
  };

  getDetalles = () =>
    this.serviciosService.list().subscribe(
      result => {
        this.servicios = result;
        this.servicios.map(element => (element["eliminar"] = false));
        this.dataSource = new MatTableDataSource<any>(this.servicios);

        this.detallesSource.next(this.dataSource);
      },
      error => console.error(JSON.stringify(error))
    );
}
