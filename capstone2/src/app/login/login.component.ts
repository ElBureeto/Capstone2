import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material'
import { Interpolation } from '@angular/compiler';

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

    username: string;
    password: string;

    constructor(
        private router: Router
    ) {}

    ngOnInit() {
        this.particlesBackground();
    }

    login(): void {
        if (this.username == 'admin' && this.password == 'admin') {
            this.router.navigate(["user"]);
        } else {
            alert("Invalid credentials");
        }
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