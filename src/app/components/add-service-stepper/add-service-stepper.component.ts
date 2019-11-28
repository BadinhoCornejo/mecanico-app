import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
  AfterViewInit,
  DoCheck
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatStepper } from "@angular/material";

import { ServiciosContextService } from "../../services//hooks/servicios-context.service";
import { DetallesContextService } from "../../services/hooks/detalles-context.service";

import { ServicioMecanicoService } from "../../services/servicio-mecanico.service";

@Component({
  selector: "app-add-service-stepper",
  templateUrl: "./add-service-stepper.component.html",
  styleUrls: ["./add-service-stepper.component.sass"]
})
export class AddServiceStepperComponent implements OnInit, OnChanges, DoCheck {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  @Input() show: boolean = true;
  reset: boolean = false;

  servmcID: string;

  submitFirstStep: boolean = false;
  submitSecondStep: boolean = false;

  firstStepReady: boolean = false;
  secondStepReady: boolean = false;

  firstStepDone: boolean = false;
  secondStepDone: boolean = false;

  stepIndex: number;

  processDone: boolean = false;

  @ViewChild("stepper", { static: true }) private myStepper: MatStepper;

  constructor(
    private detallesContext: DetallesContextService,
    private serviciosContext: ServiciosContextService,
    private servicioService: ServicioMecanicoService,
    private formBuilder: FormBuilder
  ) {
    this.firstFormGroup = formBuilder.group({
      firstSubmitted: ["", Validators.required]
    });
    this.secondFormGroup = formBuilder.group({
      secondSubmitted: ["", Validators.required]
    });
  }

  ngOnInit() {
    this.myStepper.disableRipple = true;
  }

  ngOnChanges(changes: SimpleChanges): void {}

  ngDoCheck(): void {
    this.stepIndex = this.myStepper._getFocusIndex();
    console.log("STEP", this.stepIndex);
    if (this.stepIndex === 0) {
      this.myStepper.animationDone.subscribe(result => (this.reset = false));
    }
  }

  done() {
    if (this.firstStepReady) {
      if (this.secondStepReady) {
        this.submitFirstStep = true;
        this.myStepper.next();
      }
    }
  }

  getServmcID($event) {
    this.servmcID = $event;
  }

  getFirstStepReady($event) {
    this.firstStepReady = $event;
    if (this.firstStepReady) {
      this.firstFormGroup.controls["firstSubmitted"].setValue(true);
    }
    console.log("FIRST STEP READY?", this.firstStepReady);
  }

  getSecondStepReady($event) {
    this.secondStepReady = $event;

    console.log("SECOND STEP READY?", this.secondStepReady);
  }

  getFirstStepDone($event) {
    this.firstStepDone = $event;
    if (this.firstStepDone) {
      this.submitSecondStep = true;

      this.secondFormGroup.controls["secondSubmitted"].setValue(true);
    }
    this.submitFirstStep = false;
    console.log("FIRST STEP DONE?", this.firstStepDone);
  }

  getSecondStepDone($event) {
    this.secondStepDone = $event;

    this.submitSecondStep = false;
    this.processDone = true;
    this.myStepper.next();
    this.servicioService
      .list()
      .subscribe((result: Array<any>) =>
        this.detallesContext.setDetalles(result)
      );
    console.log("SECOND STEP DONE?", this.secondStepDone);
  }

  onReset(stepper: MatStepper) {
    this.processDone = false;
    stepper.reset();
    this.reset = true;
    this.firstFormGroup.reset();
    this.secondFormGroup.reset();
  }
}
