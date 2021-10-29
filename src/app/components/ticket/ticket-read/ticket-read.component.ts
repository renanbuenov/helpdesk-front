import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Ticket } from 'src/app/models/ticket';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-ticket-read',
  templateUrl: './ticket-read.component.html',
  styleUrls: ['./ticket-read.component.css']
})
export class TicketReadComponent implements OnInit {

  ticket: Ticket = {
    priority:       '',
    status:         '',
    title:          '',
    observation:   '',
    technician:     '',
    client:         '',
    nameClient:     '',
    nameTechnician: '',
  }

  constructor(
    private ticketService:     TicketService,
    private toastService:      ToastrService,
    private route:             ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.ticket.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void {
    this.ticketService.findById(this.ticket.id).subscribe(answer => {
      this.ticket = answer;
    }, ex => {
      this.toastService.error(ex.error.error);
    })
  }  

  returnStatus(status: any): string {
    if(status == '0') {
      return 'OPENED'
    } else if(status == '1') {
      return 'IN PROGRESS'
    } else {
      return 'CLOSED'
    }
  }

  returnPriority(priority: any): string {
    if(status == '0') {
      return 'LOW'
    } else if(status == '1') {
      return 'AVERAGE'
    } else {
      return 'HIGH'
    }
  }
}
