import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material'
import { Interpolation } from '@angular/compiler';

@Component({
   selector: 'app-login',
   templateUrl: './login.component.html',
   styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
   constructor(private router: Router) { }
   username: string;
   password: string;

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
         particleground(document.getElementById('particles'), {
            dotColor: 'black',
            lineColor: '#283593',
            proximity: 120
            //  minSpeedX: 0.6,
            //  minSpeedY: 0.6
         });
         // var content = document.getElementById('content');
         // content.style.marginTop = - content.offsetHeight / 2 + 'px';
      }, false);
   }


}