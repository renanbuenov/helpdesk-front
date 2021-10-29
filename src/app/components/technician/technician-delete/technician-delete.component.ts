import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Technician } from 'src/app/models/technician';
import { TechnicianService } from 'src/app/services/technician.service';

@Component({
  selector: 'app-technician-delete',
  templateUrl: './technician-delete.component.html',
  styleUrls: ['./technician-delete.component.css']
})
export class TechnicianDeleteComponent implements OnInit {

  technician: Technician = {
    id: '',
    name: '',
    cpf: '',
    email: '',
    password: '',
    profiles: [],
    dateCreation: '',
    
  }

  constructor(
    private service: TechnicianService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.technician.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void {
    this.service.findById(this.technician.id).subscribe(answer => {
      answer.profiles = [];
      this.technician = answer;
    })
  }

  delete(): void {
    this.service.delete(this.technician.id).subscribe(() => {
      this.toast.success("Deleted technician successfull", "Delete");
      this.router.navigate(['technicians'])
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
}

