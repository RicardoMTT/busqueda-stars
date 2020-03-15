import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  searchFC = new FormControl(null);

  constructor(private router:Router){}

  ngOnInit(): void {
    this.searchFC.valueChanges
    .pipe(debounceTime(500))
    .subscribe(val=>{
      this.buscarStar( );
    })
  }

  buscarStar(){
    let termino:string = this.searchFC.value;
    console.log(termino);
    this.router.navigate(['/resultado',termino]);
  }

}
