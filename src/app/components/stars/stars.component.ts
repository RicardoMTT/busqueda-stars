import { Component, OnInit } from '@angular/core';
import { StarService } from 'src/app/services/star.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';


import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.css']
})
export class StarsComponent implements OnInit {

  inicio:number=0;
  stars:any[];
  lleno:boolean=false;

  searchFC = new FormControl(null);

  constructor(private svcStar:StarService,private router:Router,
              public dialog: MatDialog) { }
 
  ngOnInit(): void {
    this.stars = this.svcStar.getStars(this.inicio);
    console.log(this.lleno);
    this.searchFC.valueChanges
    .pipe(debounceTime(1200))
    .subscribe((val)=>{
      console.log('VALORRRR',val);
      
      this.buscarStar();
    })
    
  }

  buscarStar(){
    let termino:string = this.searchFC.value;
    console.log(termino);
    this.router.navigate(['/resultado',termino]);
  }

  /*buscarStar(termino:string){
    this.router.navigate(['/resultado',termino]);
  } 
*/
  verMas(){
    this.inicio = this.inicio + 1;
    if(this.inicio ==1){
      this.stars = this.svcStar.getStars(this.inicio);
      this.lleno = true;
    }
    
  }
  openDialog(i){
    console.log('index',i);
    var starrr = this.svcStar.getStar(i);
    console.log(starrr);
    
    const dialogRef = this.dialog.open(ConfirmDialogComponent,{
      data:{
        image:starrr.image
      }
    });

    dialogRef.afterClosed().subscribe(resp => {
      console.log('xd',resp);

    });
  }
}
