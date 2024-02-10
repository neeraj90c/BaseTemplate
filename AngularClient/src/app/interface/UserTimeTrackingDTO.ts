export interface UserTimeTrack{
    actionUser:number;
    duration:number;
    endTime:Date;
    pageCode:string;
    startTime:Date;
   
}

export interface UserTimeTrackingData{
    list:UserTimeTrack[];
}