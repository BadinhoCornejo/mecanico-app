import { Component, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "app-quick-new-service",
  templateUrl: "./quick-new-service.component.html",
  styleUrls: ["./quick-new-service.component.sass"]
})
export class QuickNewServiceComponent implements OnInit {
  show: boolean = false;

  constructor(public dialogRef: MatDialogRef<QuickNewServiceComponent>) {}

  ngOnInit() {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
