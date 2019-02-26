import { Component } from '@angular/core';
import { NotificationService } from './home/notifications.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  template: `
  <router-outlet class="top_margin"></router-outlet>`
})
export class AppComponent {
  constructor(public signalRService: NotificationService, private http: HttpClient) {
  }

  ngOnInit() {    
    this.startHttpRequest();
  }
 
  private startHttpRequest = () => {
    this.http.get('https://localhost:5001/api/notification')
      .subscribe(res => {
        console.log(res);
      })
  }
}
