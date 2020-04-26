import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api/api.service';
import { NgxSpinnerService } from "ngx-spinner";

class CircuitData {
  circuit1: number[][] = [];
  circuit2: number[][] = []; 
  circuitUsage: number[] = [0.0, 0.0];
}

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css']
})
export class BalanceComponent implements OnInit {
  data: CircuitData;
  savings: number = 0.0;
  balanced: boolean = false;
  constructor(
    private api: ApiService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.data = new CircuitData();
    this.getSensors();
  }

  getSensors(): void {
    this.spinner.show();
    this.api.getSensors().subscribe(res => {
      this.spinner.hide();
      res = Object.values(res);
      let id: number = 1;
      let sensors: number[][] = res.map(function (value) {
        return [id++, parseFloat(parseFloat(value).toPrecision(3))];
      });
      // this.data.circuit1 = sensors.slice(0, sensors.length/2);
      // this.data.circuit2 = sensors.slice(sensors.length/2, sensors.length);

      for (var i=0; i<sensors.length/2; i++) {
        this.data.circuit1.push(sensors[i*2]);
        this.data.circuit2.push(sensors[(i*2)+1]);
      }

      this.calculateCircuitUsage(this.data);
      this.savings = this.calculateSavings(this.data);
    });
  }
  calculateCircuitUsage(data: CircuitData) {
    for (var i = 0; i < data.circuit1.length; i++) {
      data.circuitUsage[0] += data.circuit1[i][1];
    }
    for (var i = 0; i < data.circuit2.length; i++) {
      data.circuitUsage[1] += data.circuit2[i][1];
    }
  }

  calculateSavings(data: CircuitData): number {
    let tempData: CircuitData = JSON.parse(JSON.stringify(data));

    this.balanceSensors(tempData);

    tempData.circuitUsage = [0.0, 0.0];
    this.calculateCircuitUsage(tempData);
    
    return Math.abs(data.circuitUsage[0] - data.circuitUsage[1]) - Math.abs(tempData.circuitUsage[0] - tempData.circuitUsage[1]);
  }

  colorSensor(sensor: number): number {
    if (sensor >= 0 && sensor <= 5) return 0;
    else if (sensor > 5 && sensor <= 15) return 1;
    else return 2;
  }

  balanceSensors(data: CircuitData): CircuitData {
    let sensors = data.circuit1.concat(data.circuit2);
    sensors.sort(function (a, b) { return b[1] > a[1] ? 1 : -1 });

    let tempCircuit1 = [];
    let tempCircuit2 = [];
    let tempCircuitUsage = [0.0, 0.0];
    for (var i = 0; i < 10; i++) {
      if (tempCircuitUsage[0] > tempCircuitUsage[1]) {
        tempCircuitUsage[1] += sensors[i][1];
        tempCircuit2.push(sensors[i]);
      }
      else {
        tempCircuitUsage[0] += sensors[i][1];
        tempCircuit1.push(sensors[i]);
      }
    }
    data.circuit1 = tempCircuit1;
    data.circuit2 = tempCircuit2;
    data.circuitUsage = tempCircuitUsage;

    this.savings = 0;

    return data;
  }
}
