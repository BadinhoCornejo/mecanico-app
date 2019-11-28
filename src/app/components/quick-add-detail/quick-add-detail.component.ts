import {
  Component,
  OnInit,
  Inject,
  OnChanges,
  DoCheck,
  SimpleChanges
} from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { ServiciosContextService } from "../../services//hooks/servicios-context.service";
import { ServicioMecanicoService } from "../../services/servicio-mecanico.service";
import { DetallesContextService } from "../../services/hooks/detalles-context.service";

@Component({
  selector: "app-quick-add-detail",
  templateUrl: "./quick-add-detail.component.html",
  styleUrls: ["./quick-add-detail.component.sass"]
})
export class QuickAddDetailComponent implements OnInit {
  servmcID: string;
  secondStepDone: boolean = false;
  secondStepReady: boolean = false;

  constructor(
    private detallesContext: DetallesContextService,
    private servicioService: ServicioMecanicoService,
    private serviciosContext: ServiciosContextService,
    public dialogRef: MatDialogRef<QuickAddDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    console.log(this.data.servmcID);

    this.servmcID = this.data.servmcID;
  }

  getSecondStepDone(event) {
    this.servicioService
      .list()
      .subscribe((result:Array<any>) => this.detallesContext.setDetalles(result));
    this.onNoClick();
  }
  getSecondStepReady(event) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
