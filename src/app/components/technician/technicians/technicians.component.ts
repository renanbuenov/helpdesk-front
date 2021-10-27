import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Technician } from 'src/app/models/technicians';

@Component({
  selector: 'app-technicians',
  templateUrl: './technicians.component.html',
  styleUrls: ['./technicians.component.css']
})
export class TechniciansComponent implements OnInit {

  ELEMENT_DATA: Technician[] = [
    {
      id: 1,
      name:  'Renan Bueno',
      cpf: '086.879.969-69',
      email: 'renan@hotmail.com',
      password: '123',
      profiles: ['0'],
      dateCreation: '26/10/2021'
    }
  ]
  
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'actions'];
  dataSource = new MatTableDataSource<Technician>(this.ELEMENT_DATA);

  constructor() { }
  
  ngOnInit(): void {
  }
  
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}