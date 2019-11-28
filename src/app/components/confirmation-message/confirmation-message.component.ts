import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "app-confirmation-message",
  templateUrl: "./confirmation-message.component.html",
  styleUrls: ["./confirmation-message.component.sass"]
})
export class ConfirmationMessageComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationMessageComponent>
  ) {

  }

  ngOnInit() {}
}
