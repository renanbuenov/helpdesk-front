import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-client-create',
  templateUrl: './client-create.component.html',
  styleUrls: ['./client-create.component.css']
})
export class ClientCreateComponent implements OnInit {

  client: Client = {
    id: '',
    name: '',
    cpf: '',
    email: '',
    password: '',
    profiles: [],
    dateCreation: '',
    
  }

  name: FormControl = new FormControl(null, Validators.minLength(3));
  cpf: FormControl = new FormControl(null, Validators.required);
  email: FormControl = new FormControl(null, Validators.email);
  password: FormControl = new FormControl(null, Validators.minLength(3));
  
  constructor(
    private service: ClientService,
    private toast: ToastrService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  create(): void {
    this.service.create(this.client).subscribe(() => {
      this.toast.success("Registered client successfull", "Registration");
      this.router.navigate(['clients'])
    }, ex => {
      if(ex.error.errors) {
        ex.error.errors.forEach(element => {
          this.toast.error(element.message);
        });      
      } else {
        this.toast.error(ex.error.nessage);
      }
    })
  }

  addProfile(profile: any): void {
    if(this.client.profiles.includes(profile)) {
      this.client.profiles.splice(this.client.profiles.indexOf(profile), 1);
    } else {
      this.client.profiles.push(profile);
    }
  }
  
  validateField(): boolean {
    return this.name.valid && this.cpf.valid
    && this.email.valid && this.password.valid
  }
}
