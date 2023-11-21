import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-notiland',
  templateUrl: './notiland.component.html',
  styleUrls: ['./notiland.component.scss'],
})
export class NotilandComponent {
  isNotchClicked: boolean = false;
  isNotchMiniExpanded: boolean = false;
  hideUI: boolean = true;
  confirmAnimation: AnimationOptions = {
    path: 'assets/images/common/confirmation.json',
    loop: true,
    autoplay: true,
  };

  constructor(
    public dialogRef: MatDialogRef<NotilandModel>,
    @Inject(MAT_DIALOG_DATA) public data: NotilandComponent | any
  ) {
    setTimeout(() => {
      this.hideUI = false;
    }, 200);

    setTimeout(() => {
      this.isNotchMiniExpanded = true;
    }, 600);
  }

  ngOnDestroy(): void {
    this.isNotchMiniExpanded = false;
  }

  onAccept() {
    this.dialogRef.close(true);
  }

  onDecline() {
    this.dialogRef.close(false);
  }
}

export class NotilandModel {
  constructor(public warnMessage: string) {}
}
