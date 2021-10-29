import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  ) { }

  ngOnInit(): void {
    this.findAllClients();
    this.findAllTechnicians();
  }

  create(): void {
    this.ticketService.create(this.ticket).subscribe(answer => {
      this.toastService.success('Ticket created successfully', 'New ticket');
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

}
