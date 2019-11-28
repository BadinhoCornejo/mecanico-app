import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
  DoCheck
} from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { ServicioMecanicoService } from "../../services/servicio-mecanico.service";
import { ServicioPersonalService } from "../../services/servicio-personal.service";
import { ServicioClienteService } from "../../services/servicio-cliente.service";

@Component({
  selector: "app-new-service",
  templateUrl: "./new-service.component.html",
  styleUrls: ["./new-service.component.sass"]
})
export class NewServiceComponent implements OnInit, OnChanges, DoCheck {
  @Input() submit: boolean;
  @Input() reset: boolean;

  @Output() servmcID = new EventEmitter<string>();
  @Output() firstStepReady = new EventEmitter<boolean>();
  @Output() firstStepDone = new EventEmitter<boolean>();

  inservmcID: any;
  personals: any = [];
  clientes: any = [];

  form: FormGroup;
  submitted = false;

  servicioMecanico: any = {
    fecha: "",
    personal: {
      personalID: ""
    },
    cliente: {
      clienteID: ""
    }
  };

  constructor(
    private formBuilder: FormBuilder,
    private servicioService: ServicioMecanicoService,
    private personalService: ServicioPersonalService,
    private clienteService: ServicioClienteService,
    private router: Router
  ) {
    this.form = formBuilder.group({
      fecha: [
        "2018-02-25T19:24",
        Validators.compose([
          Validators.required,
          Validators.pattern(`[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}`)
        ])
      ],
      personalID: ["", Validators.required],
      clienteID: ["", Validators.required]
    });

    this.getPersonals();
    this.getClientes();
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    console.log("NEW SERVICE");
  }

  ngDoCheck(): void {
    //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
    //Add 'implements DoCheck' to the class.
    console.log("NEW SERVICE DO CHECK", this.submit);
    if (this.form.invalid) {
      this.firstStepReady.emit(false);
    } else {
      this.firstStepReady.emit(true);
    }

    if (this.submit) {
      this.firstStepDone.emit(true);
      this.submitServicio();
      console.log(
        "--------------------SE AGREGÓ NUEVO SERVICIO-----------------"
      );
      this.onDisable();
      this.servmcID.emit("1");
      //this.submitServicio();
    }

    console.log(this.reset);

    if (this.reset) {
      this.form.enable();
      this.onReset();
    }
  }

  getPersonals = () =>
    this.personalService.list().subscribe(
      result => (this.personals = result),
      error => console.error(JSON.stringify(error))
    );

  getClientes = () =>
    this.clienteService.list().subscribe(
      result => (this.clientes = result),
      error => console.error(JSON.stringify(error))
    );

  goServicios = () => this.router.navigateByUrl("admin/services");

  get f() {
    return this.form.controls;
  }

  onReset() {
    this.submitted = false;
    this.form.reset();
  }

  onDisable() {
    this.submitted = true;
    this.form.disable();
  }

  submitServicio() {
    this.submitted = true;
    if (this.form.invalid) {
      this.firstStepDone.emit(false);
      return;
    }

    this.servicioMecanico.fecha = this.form.value.fecha;
    this.servicioMecanico.personal.personalID = this.form.value.personalID;
    this.servicioMecanico.cliente.clienteID = this.form.value.clienteID;

    this.servicioService.add(this.servicioMecanico).subscribe(
      result => {
        this.servicioMecanico = result;
        this.servicioService
          .findServicioMecanicoByFecha(this.servicioMecanico)
          .subscribe(
            result => {
              this.inservmcID = result;
              this.servmcID.emit(this.inservmcID.servmcID);
              this.firstStepDone.emit(true);
            },
            error => console.error(JSON.stringify(error))
          );
      },
      error => {
        console.error(JSON.stringify(error));
        this.firstStepDone.emit(true);
      }
    );
  }
}
