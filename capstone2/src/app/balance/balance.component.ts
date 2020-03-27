import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api/api.service';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css']
})
export class BalanceComponent implements OnInit {

  sensors: any[];

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.getSensors();
  }

  getSensors(){
    this.api.getSensors().subscribe(res => {
      console.log(res);
      res = Object.values(res);
      this.sensors = res.map(function(value){
        return parseFloat(parseFloat(value).toPrecision(3));
      });
      console.log(this.sensors);
    });
  }

  colorSensor(sensor){
    if(sensor>=0 && sensor<=5) return 0;
    else if(sensor>5 && sensor<=15) return 1;
    else return 2;
  }



}
