import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})

export class ApiService {

    constructor(private httpClient: HttpClient) {}

    public getSensors(){
        if (environment.sensorID == 'vs002') {
            return this.httpClient.get<any>('http://ec2-34-219-51-110.us-west-2.compute.amazonaws.com:8080/vs002', this.httpOptions);
        }

        else if (environment.sensorID == 'vs001') {
            return this.httpClient.get<any>('http://ec2-34-219-51-110.us-west-2.compute.amazonaws.com:8080/vs001', this.httpOptions);
        }
    }


}
