import { Component, OnInit, Inject } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ServicioMecanicoService } from "src/app/services/servicio-mecanico.service";
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from "@angular/material";
import { QuickAddDetailComponent } from "../quick-add-detail/quick-add-detail.component";
import { ServiciosContextService } from "../../services//hooks/servicios-context.service";

@Component({
  selector: "app-quick-edit-service",
  templateUrl: "./quick-edit-service.component.html",
  styleUrls: ["./quick-edit-service.component.sass"]
})
export class QuickEditServiceComponent implements OnInit {
  form: FormGroup;

  submitted = false;

  detalleServicio: any = {
    servdtID: "",
    servicioMecanico: {
      servmcID: ""
    },
    servicio: {
      servicioID: ""
    },
    marca: "",
    modelo: "",
    placa: "",
    contenido: ""
  };

  servicios: any = [];

  constructor(
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private servicioContext: ServiciosContextService,
    private servicioService: ServicioMecanicoService,
    public dialogRef: MatDialogRef<QuickEditServiceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.detalleServicio = data.detalleServicio;
    this.form = formBuilder.group({
      servicioID: [
        this.detalleServicio.servicio.servicioID,
        Validators.required
      ],
      marca: [this.detalleServicio.marca, Validators.required],
      modelo: [this.detalleServicio.modelo, Validators.required],
      placa: [this.detalleServicio.placa, Validators.required],
      contenido: [this.detalleServicio.contenido, Validators.required]
    });
    this.getServicios();
  }

  ngOnInit() {}
  onNoClick(): void {
    this.dialogRef.close();
  }

  getServicios = () =>
    this.servicioService.servicios().subscribe(
      result => (this.servicios = result),
      error => console.error(JSON.stringify(error))
    );

  openNewDetailModal() {
    console.log("DETALLE SERVICIO", this.detalleServicio);

    const dialogRef = this.dialog.open(QuickAddDetailComponent, {
      width: "750px",
      height: "650px",
      data: { servmcID: this.detalleServicio.servicioMecanico.servmcID }
    });
    this.onNoClick();
    dialogRef
      .afterClosed()
      .subscribe(result =>
        this.servicioService
          .list()
          .subscribe(result => this.servicioContext.setServicios(result))
      );
  }

  submitDetalle() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    this.detalleServicio.servicio.servicioID = this.form.value.servicioID;
    this.detalleServicio.marca = this.form.value.marca;
    this.detalleServicio.modelo = this.form.value.modelo;
    this.detalleServicio.placa = this.form.value.placa;
    this.detalleServicio.contenido = this.form.value.contenido;

    this.servicioService.editDetalle(this.detalleServicio).subscribe(
      result => this.onNoClick(),
      error => console.error(JSON.stringify(error))
    );
  }
}
