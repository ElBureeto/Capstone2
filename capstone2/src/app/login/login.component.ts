import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material'
import { Interpolation } from '@angular/compiler';
import { environment } from 'src/environments/environment';

declare var $: JQuery;

declare global {
  interface JQuery {
    (selector: string): JQuery;
    particleground(dotColor): JQuery;
  }
}

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    @ViewChild("sensorID", {static: true}) sensorID: ElementRef;

    constructor(
        private router: Router
    ) {}

    ngOnInit() {
        this.particlesBackground();
    }

    changeSensorID() {
        environment.sensorID = this.sensorID.nativeElement.value.toString();
        console.log(this.sensorID.nativeElement.value.toString());
    }

    particlesBackground() {
        document.addEventListener('DOMContentLoaded', function () {
            //works
            $("#particles").particleground({
                dotColor: '#283593',
                lineColor: '#283593',
                proximity: 200
            });
                
            // particleground(document.getElementById('particles'), {
            //     dotColor: '#283593',
            //     lineColor: '#283593',
            //     proximity: 200,
            //     // minSpeedX: 0.01,
            //     // minSpeedY: 0.01
            // });
            //   var content = document.getElementById('content');
            //   content.style.marginTop = - content.offsetHeight / 2 + 'px';
        }, false);
    }
}