import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Client } from 'src/app/models/client';
import { Technician } from 'src/app/models/technician';
import { Ticket } from 'src/app/models/ticket';
import { ClientService } from 'src/app/services/client.service';
import { TechnicianService } from 'src/app/services/technician.service';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-ticket-update',
  templateUrl: './ticket-update.component.html',
  styleUrls: ['./ticket-update.component.css']
})
export class TicketUpdateComponent implements OnInit {

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

  clients:  Client[] = []
  technicians: Technician[] = []

  priority:     FormControl = new FormControl(null, Validators.required)
  status:       FormControl = new FormControl(null, Validators.required)
  title:        FormControl = new FormControl(null, Validators.required)
  observation: FormControl = new FormControl(null, Validators.required)
  technician:   FormControl = new FormControl(null, Validators.required)
  client:       FormControl = new FormControl(null, Validators.required)

  constructor(
    private ticketService:     TicketService,
    private clientService:     ClientService,
    private technicianService: TechnicianService,
    private toastService:      ToastrService,
    private router:            Router,
    private route:             ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.ticket.id = this.route.snapshot.paramMap.get('id');
    this.findById();
    this.findAllClients();
    this.findAllTechnicians();
  }

  findById(): void {
    this.ticketService.findById(this.ticket.id).subscribe(answer => {
      this.ticket = answer;
    }, ex => {
      this.toastService.error(ex.error.error);
    })
  }  

  update(): void {
    this.ticketService.update(this.ticket).subscribe(answer => {
      this.toastService.success('Ticket updated successfully', 'Updated ticket');
      this.router.navigate(['tickets']);
    }, ex => {
      console.log(ex)
      this.toastService.error(ex.error.error);
    })
  }

  findAllClients(): void {
    this.clientService.findAll().subscribe(answer => {
      this.clients = answer;
    })
  }

  
  findAllTechnicians(): void {
    this.technicianService.findAll().subscribe(answer => {
      this.technicians = answer;
    })
  }

  validateField(): boolean {
    return this.priority.valid && this.status.valid &&
           this.title.valid && this.observation.valid &&
           this.technician.valid && this.client.valid
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
