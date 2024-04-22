import { Component, ViewChild, ElementRef  } from '@angular/core';
import { UrlShortenService } from 'src/app/services/urlShorten/url-shorten.service';
import {jwtDecode} from 'jwt-decode';
import { MatDialog } from '@angular/material/dialog';
import { QrcodePopupComponent } from '../qrcode-popup/qrcode-popup.component';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {
  originalUrl!: string;
  shortenedUrl!: string;
  email!: string;

  @ViewChild('shortenedInput') shortenedInput!: ElementRef;


  constructor(private urlService: UrlShortenService, private dialog:MatDialog) { }

  ngOnInit () {
    const token= localStorage.getItem('jwtToken');
    if(token){
      const decodedtoken:any= jwtDecode(token);
      this.email= decodedtoken.email;
    }
  }

  shortenUrl() {
    const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
    if (this.originalUrl.match(urlPattern)) {
      this.urlService.generateShortenUrl(this.email,this.originalUrl).subscribe((data)=>{
        this.originalUrl = '';
        console.log(data);
        const shortId = data.id
        this.shortenedUrl =`http://localhost:3000/${shortId}`
      })
    } else {
      alert('Please enter a valid URL.');
    }
  }

  copyToClipboard() {
    this.shortenedInput.nativeElement.select();
    navigator.clipboard.writeText(this.shortenedInput.nativeElement.value)
        .then(() => {
            console.log('URL copied to clipboard:', this.shortenedInput.nativeElement.value);
        })
        .catch(err => {
            console.error('Failed to copy URL to clipboard:', err);
        });
  }


  openQrCode(){
    const dialogRef = this.dialog.open(QrcodePopupComponent, {
      width: '300px',
      height:'400px',
      data:{shortenedUrl:this.shortenedUrl}
    });
  }

}
