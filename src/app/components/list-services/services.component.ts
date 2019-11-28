import { Component, OnInit, ViewChild } from "@angular/core";
import { ServicioMecanicoService } from "../../services/servicio-mecanico.service";
import { DetallesContextService } from "../../services/hooks/detalles-context.service";
import {
  MatTableDataSource,
  MatPaginator,
  MatSort,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog
} from "@angular/material";
import { ToastrService } from "ngx-toastr";
import { ConfirmationMessageComponent } from "../confirmation-message/confirmation-message.component";
import { QuickNewServiceComponent } from "../quick-new-service/quick-new-service.component";
import { QuickEditServiceComponent } from "../quick-edit-service/quick-edit-service.component";

@Component({
  selector: "app-services",
  templateUrl: "./services.component.html",
  styleUrls: ["./services.component.sass"]
})
export class ServicesComponent implements OnInit {
  displayedColumns: string[] = [
    "opciones",
    "cliente",
    "servicio",
    "fecha",
    "marca",
    "modelo",
    "placa",
    "monto"
  ];

  servicios: any = [];

  serviciosEliminar: Array<any> = [];

  eliminar: boolean = false;

  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private detallesContext: DetallesContextService,
    private servicioService: ServicioMecanicoService,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) {
    this.getServicios();
  }

  ngOnInit() {}

  openConfirmationMsg() {
    const dialogRef = this.dialog.open(ConfirmationMessageComponent, {
      width: "350px"
    });
    dialogRef
      .afterClosed()
      .subscribe(result => result && this.eliminarServicios());
  }

  openNewServiceModal() {
    const dialogRef = this.dialog.open(QuickNewServiceComponent, {
      width: "750px",
      height: "650px"
    });
    dialogRef
      .afterClosed()
      .subscribe(result => this.detallesContext.setDetalles);
  }

  openEditService(element: any) {
    const dialogRef = this.dialog.open(QuickEditServiceComponent, {
      width: "750px",
      height: "650px",
      data: { detalleServicio: element }
    });
    dialogRef.afterClosed().subscribe(result => this.getServicios());
  }

  getServicios = () =>
    this.detallesContext.currentDetails.subscribe(result => {
      this.dataSource = result;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

  aplicarFiltro = (filterValue: string) =>
    (this.dataSource.filter = filterValue.trim().toLocaleLowerCase());

  checkDetalle(event, servicio: any) {
    let checked = event.checked;

    if (checked) {
      servicio.eliminar = true;
      this.serviciosEliminar.push(servicio);
    } else {
      servicio.eliminar = false;
      this.serviciosEliminar.map(element => {
        if (element === servicio) {
          let target = this.serviciosEliminar.indexOf(element);
          this.serviciosEliminar.splice(target, 1);
        }
      });
    }

    this.eliminar = !this.serviciosEliminar.length ? false : true;
  }

  eliminarServicios() {
    this.serviciosEliminar.map(element => delete element["eliminar"]);
    this.servicioService.deleteServicios(this.serviciosEliminar).subscribe(
      result => {
        this.toastr.success(
          "Operación completada con éxito",
          "Se eliminaron los servicios"
        );
        this.serviciosEliminar = [];
        this.eliminar = false;
        this.detallesContext.getDetalles();
      },
      error => console.error(JSON.stringify(error))
    );
  }
}
