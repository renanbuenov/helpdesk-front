import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-client-update',
  templateUrl: './client-update.component.html',
  styleUrls: ['./client-update.component.css']
})
export class ClientUpdateComponent implements OnInit {

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
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.client.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void {
    this.service.findById(this.client.id).subscribe(answer => {
      answer.profiles = [];
      this.client = answer;
    })
  }

  update(): void {
    this.service.update(this.client).subscribe(() => {
      this.toast.success("Updated client successfull", "Update");
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
