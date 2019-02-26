
interface INotification {
    Id?:string;
    Message?:string;
    CreatedDate?:string;
    IsUnread?:boolean;
}

interface IHome {
    unreadMessage?:number;
    notifications?: INotification[];
}
