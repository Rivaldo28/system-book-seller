import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor(private router: Router) { } // 1. Injeta o Router

  ngOnInit(): void {
  }

  // 2. Cria o método para navegação programática
  navigateToLivros(): void {
    this.router.navigate(['/livros']);
  }

}
