import { Component, Inject , ViewChild, ElementRef} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-qrcode-popup',
  templateUrl: './qrcode-popup.component.html',
  styleUrls: ['./qrcode-popup.component.css']
})
export class QrcodePopupComponent {
  shortenedUrl:string = '';
  @ViewChild('qrCodeElement') qrCodeElement!: ElementRef;

  constructor (@Inject(MAT_DIALOG_DATA) private data: any, private dialogRef: MatDialogRef<QrcodePopupComponent>) {}

  ngOnInit(): void {

    this.shortenedUrl = this.data.shortenedUrl;

  }

  downloadQRCode() {
    if (this.qrCodeElement && this.qrCodeElement.nativeElement) {
      const qrCodeImg = this.qrCodeElement.nativeElement.toDataURL('image/png');

      // Create a temporary anchor element
      const downloadLink = document.createElement('a');
      downloadLink.href = qrCodeImg;
      downloadLink.download = 'qr_code.png'; // Set the file name
      downloadLink.click(); // Simulate a click to trigger the download
    } else {
      console.error('QR code element is not available.');
    }
  }
  
}
