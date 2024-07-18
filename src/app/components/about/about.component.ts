import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  imageSource: string = 'meapc.jpg';
  imageHeightPercent: number = 100;

  name: string = ''; 
  email: string = ''; 
  message: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  handleSubmit(event: Event) {
    event.preventDefault();
    const subject = encodeURIComponent(`New Message from ${this.name}`);
    const body = encodeURIComponent(this.message);
    const mailtoLink = `mailto:furkan0tr0arslan@gmail.com?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;
  }

  scrollTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }


}
