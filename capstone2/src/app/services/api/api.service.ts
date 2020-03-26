import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class ApiService {
    
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        })
    };

    constructor(private httpClient: HttpClient) {}

    public getSensors(){
        return this.httpClient.get<any>('https://cors-anywhere.herokuapp.com/http://ec2-34-219-51-110.us-west-2.compute.amazonaws.com:8080/vs002', this.httpOptions);
    }


}
