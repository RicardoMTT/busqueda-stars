import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StarService } from 'src/app/services/star.service';

@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.component.html',
  styleUrls: ['./resultado.component.css']
})
export class ResultadoComponent implements OnInit {

  constructor(private activatedRoute:ActivatedRoute,
            private svcStar:StarService) { }

  starArr:any[];
  termino:string;
  ngOnInit(): void {
    
  }

}