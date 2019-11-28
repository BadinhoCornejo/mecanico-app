import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  NgZone,
  ViewChild,
  Output,
  EventEmitter
} from "@angular/core";

import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { CdkTextareaAutosize } from "@angular/cdk/text-field";
import { take } from "rxjs/operators";

import { ServicioMecanicoService } from "../../services/servicio-mecanico.service";
import { ServiciosContextService } from "../../services//hooks/servicios-context.service";

@Component({
  selector: "app-add-detail",
  templateUrl: "./add-detail.component.html",
  styleUrls: ["./add-detail.component.sass"]
})
export class AddDetailComponent implements OnInit, OnChanges {
  @Input() submit: boolean = false;
  @Input() servmcID: string;
  @Input() reset: boolean;
  @Input() modal: boolean;

  @Output() secondStepReady = new EventEmitter<boolean>();
  @Output() secondStepDone = new EventEmitter<boolean>();

  form: FormGroup;
  submitted = false;

  detalleServicio: any = {
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
    private _ngZone: NgZone,
    private formBuilder: FormBuilder,
    private serviciosContext: ServiciosContextService,
    private servicioService: ServicioMecanicoService
  ) {
    this.getServicios();
  }

  @ViewChild("autosize", { static: false }) autosize: CdkTextareaAutosize;

  ngOnInit() {
    this.form = this.formBuilder.group({
      servicioID: ["", Validators.required],
      marca: ["", Validators.required],
      modelo: ["", Validators.required],
      placa: ["", Validators.required],
      contenido: ["", Validators.required]
    });
  }

  triggerResize() {
    this._ngZone.onStable
      .pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }

  ngDoCheck(): void {
    //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
    //Add 'implements DoCheck' to the class.
    console.log(this.servmcID);

    console.log("ADD DETAIL DO CHECK", this.submit);
    if (this.form.invalid) {
      this.secondStepReady.emit(false);
    } else {
      this.secondStepReady.emit(true);
    }

    if (this.submit) {
      this.secondStepDone.emit(true);
      this.submitDetalle();
      console.log(
        "---------------------SE AGREGÓ EL DETALLE------------------"
      );
      this.onDisable();
    }

    if (this.reset) {
      this.form.enable();
      this.onReset();
    }
  }

  getServicios = () =>
    this.servicioService.servicios().subscribe(
      (value: Array<any>) => (this.servicios = value),
      (error: any) => console.error(JSON.stringify(error))
    );

  getDetalles = () =>
    this.servicioService.list().subscribe(
      result => this.serviciosContext.setServicios(result),
      error => console.error(JSON.stringify(error))
    );

  onReset() {
    this.submitted = false;
    this.form.reset();
  }

  onDisable() {
    this.submitted = false;
    this.form.disable();
  }

  submitDetalle() {
    this.submitted = true;
    if (this.form.invalid) {
      this.secondStepDone.emit(false);
      return;
    }

    this.detalleServicio.servicioMecanico.servmcID = this.servmcID;
    this.detalleServicio.servicio.servicioID = this.form.value.servicioID;
    this.detalleServicio.marca = this.form.value.marca;
    this.detalleServicio.modelo = this.form.value.modelo;
    this.detalleServicio.placa = this.form.value.placa;
    this.detalleServicio.contenido = this.form.value.contenido;

    this.servicioService.addDetalle(this.detalleServicio).subscribe(
      result => {
        this.secondStepDone.emit(true);
      },
      error => {
        console.error(JSON.stringify(error));

        this.secondStepDone.emit(false);
      }
    );
  }
}
