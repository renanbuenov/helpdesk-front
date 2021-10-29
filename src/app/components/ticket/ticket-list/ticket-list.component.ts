import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Ticket } from 'src/app/models/ticket';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {

  ELEMENT_DATA: Ticket[] = [
    {
      id:                             1,
      dateOpened:          '21/06/2021',
      dateClosed:          '21/06/2021',
      priority:                  'ALTA',
      status:               'ANDAMENTO',
      title:                'Chamado 1',
      observation:    'Teste chamado 1',
      technician:             	  	  1,
      client:                         6,
      nameClient:         'Renan Bueno',
      nameTechnician: 'Albert Einstein',
    }
  ]
  
  displayedColumns: string[] = ['id', 'title', 'client', 'technician', 'dateOpened', 'priority', 'status', 'actions']
  dataSource = new MatTableDataSource<Ticket>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor() { }

  ngOnInit(): void {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}


