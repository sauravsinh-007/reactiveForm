import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-empolye',
  templateUrl: './empolye.component.html',
  styleUrls: ['./empolye.component.scss'],
})
export class EmpolyeComponent {
  emolyeForm!: FormGroup;
  isForm: boolean = false;
  employeDataStore: any[] = [];
  isEditMode: boolean = false;
  editedIndex: number = -1;

  constructor(
    private _formBuilder: FormBuilder,
    private _employeeService: EmployeeService
  ) {}
  ngOnInit() {
    this.emolyeForm = this._formBuilder.group({
      fullName: ['', [Validators.required, Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]],
      mobileNumber: ['', [Validators.required]],
      salary: ['', [Validators.required]],
    });
    this.getUserData();
  }
  getUserData() {
    this._employeeService.getEmployees().subscribe((res: any) => {
      console.log(res, 'res');
      this.employeDataStore = res;
    });
  }
  onSubmit() {
    if (this.emolyeForm.valid) {
      const formData = this.emolyeForm.value;
      if (this.isEditMode) {
        formData.id = this.employeDataStore[this.editedIndex].id; // Ensure id is set in edit mode
        this._employeeService.updateEmployee(formData).subscribe((res: any) => {
          console.log(res, 'updated');
          this.isForm = false;
          this.getUserData();
        });
      } else {
        formData.id =
          Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
        this._employeeService.createEmployee(formData).subscribe((res: any) => {
          console.log(res, 'created');
          this.isForm = false;
          this.getUserData();
        });
      }
      this.emolyeForm.reset();
    }
  }
  onAddEmploye() {
    this.isForm = true;
    this.isEditMode = false;
    this.editedIndex = -1;
    this.emolyeForm.reset();
  }

  OnInputChange(event: any) {
    event.target.value = event.target.value.replace(/[^0-9]/g, '');
  }
  onClose() {
    this.isForm = false;
    this.isEditMode = false;
    this.editedIndex = -1;
    this.emolyeForm.reset();
  }

  onEdit(employeData: any) {
    this.isForm = true;
    this.isEditMode = true;
    this.editedIndex = this.employeDataStore.indexOf(employeData);
    this.emolyeForm.patchValue(employeData);
  }
  onDelete(id: any) {
    this._employeeService.deleteEmployee(id).subscribe((res) => {
      console.log(res);
      this.getUserData();
    });
  }
}
