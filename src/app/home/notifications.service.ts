import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class NotificationService {

    public data: INotification[];    

    _url_list = "./../../assets/data/mock-notifications-list.json"
    _url_details = "./../../assets/data/mock-notifications-new.json"

    constructor(private http: HttpClient) {}

    
    getNotificationList(): Observable<INotification[]> {
        return this.http.get<INotification[]>(this._url_list);
    }

    getNotificationNew(): Observable<INotification[]> {
        return this.http.get<INotification[]>(this._url_details);
    }

    public static toPascal(o) {
    var newO, origKey, newKey, value
    if (o instanceof Array) {
        return o.map(function(value) {
            if (typeof value === "object") {
            value = this.toPascal(value)
            }
            return value
        })
    } else {
        newO = {}
        for (origKey in o) {
        if (o.hasOwnProperty(origKey)) {
            newKey = (origKey.charAt(0).toUpperCase() + origKey.slice(1) || origKey).toString()
            value = o[origKey]
            if (value instanceof Array || (value !== null && value.constructor === Object)) {
            value = this.toPascal(value)
            }
            newO[newKey] = value
        }
        }
    }
    return newO
    }

}