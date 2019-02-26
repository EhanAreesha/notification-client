import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NotificationService } from './notifications.service';
import * as signalR from '@aspnet/signalr';
declare var $: any;

@Component({
    selector: 'notification-list',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent {

    home: IHome;
    private hubConnection: signalR.HubConnection

    constructor(private _notificationService: NotificationService) {
    }

    ngOnInit(): void {
        this.home = {notifications: [], unreadMessage: 0}
        this._notificationService.getNotificationList().subscribe((data: INotification[]) => {
            this.home.notifications = data;           
            this.home.unreadMessage = data.length;            
        });
        this.receiveLiveData();
    }

    private receiveLiveData() {
        this.hubConnection = new signalR.HubConnectionBuilder()
            .withUrl('https://localhost:5001/notification')
            .build();
        this.hubConnection
            .start()
            .then(() => console.log('Connection started! 222222'))
            .catch(err => console.log('Error while establishing connection :('));
        this.hubConnection.on('transferNotificationData', (data) => {
            this.home.notifications.push(NotificationService.toPascal(data));
            this.home.unreadMessage = this.home.notifications.length;
        });
    }

    ngAfterViewInit() {
        $('.dropdown-toggle-1').on('click', function (e) {
            console.log("Toggle fired")
            $(this).next().toggle();
        });
    }

    collapseMessage(notification:INotification) {
        $('#'+notification.Id).toggleClass('single-line');
        $('#content').toggle();
        if(notification.IsUnread == true) {
            console.log(notification);
            notification.IsUnread = false;
            console.log(notification);
            this.home.unreadMessage -= 1;
        }
    }

    notificationDetails(id:string) {
        console.log(id)
    }
}