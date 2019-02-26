import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { LazyLoadEvent } from 'primeng/api';
import { NotificationService } from '../notifications.service';
import * as signalR from '@aspnet/signalr';
declare var $: any;

@Component({
    selector: 'notification-details',
    templateUrl: './notifications.component.html',
    styleUrls: ['./notifications.component.scss']
})
export class NotificationComponent {

    notificationObj: INotifications;
    private hubConnection: signalR.HubConnection

    constructor(private _notificationService: NotificationService) {
    }

    ngOnInit(): void {
        this.notificationObj = {notificationsTemp: [], totalRecords: 0, unreadMessage: 0}
        this._notificationService.getNotificationNew().subscribe((data: INotification[]) => {
            this.notificationObj.notifciations = data;
            this.notificationObj.totalRecords = data.length;
            this.notificationObj.unreadMessage = data.length;
            this.notificationObj.notificationsTemp = this.notificationObj.notifciations.slice(0, 2);
        });
        this.receiveLiveData();
    }
   
    private receiveLiveData() {
        this.hubConnection = new signalR.HubConnectionBuilder()
            .withUrl('https://localhost:5001/notification')
            .build();
        this.hubConnection
            .start()
            .then(() => console.log('Connection started!'))
            .catch(err => console.log('Error while establishing connection :('));
        this.hubConnection.on('transferNotificationData', (data) => {
            this.notificationObj.notifciations.push(NotificationService.toPascal(data));
            this.notificationObj.unreadMessage = this.notificationObj.notifciations.length;
            this.notificationObj.notificationsTemp = this.notificationObj.notifciations.slice(0, 2);            
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
            this.notificationObj.unreadMessage -= 1;
        }
    }
    loadNotifications(event: LazyLoadEvent) {
        setTimeout(() => {
            if(this.notificationObj.notifciations) {
                this.notificationObj.notificationsTemp = this.notificationObj.notifciations.slice(event.first, event.first+event.rows);
            }
        }, 250);
    }
}