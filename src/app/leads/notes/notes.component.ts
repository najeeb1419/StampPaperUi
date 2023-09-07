import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiProxyService } from 'src/app/api-proxy-service';
import { DatePipe } from '@angular/common';
import { faPaperclip } from '@fortawesome/free-solid-svg-icons';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/app/environments/environment';
@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  faPaperclip = faPaperclip;
  UpdateNoteFrom: FormGroup;
  tenantId: number;
  UserId: number;
  LeadProfileId: number
  LeadNotes: any = []
  showFormArray: boolean[] = [];
  showForm: boolean;
  Loader: boolean = false;
  AddNoteForm: FormGroup;
  FileName:any
  file: File;
  imgURL: string;
  private apiBaseUrl = environment.baseUrl;
  init={
    height: 300,
    menubar: false,
    plugins: [
      'advlist autolink lists link image charmap print preview anchor',
      'searchreplace visualblocks code fullscreen',
      'insertdatetime media table paste code help wordcount'
    ],
    toolbar:
      'undo redo | formatselect | bold italic backcolor | \
      alignleft aligncenter alignright alignjustify | \
      bullist numlist outdent indent | removeformat | help'
  }

  constructor(private formBuilder: FormBuilder
    , private apiService: ApiProxyService
    , private route: Router,private http: HttpClient) {
    this.tenantId = Number(localStorage.getItem("TenantId"));
    this.UserId = Number(localStorage.getItem("userId"));
    this.LeadProfileId = history.state.id;
  }

  ngOnInit(): void {

    this.GetNotes();

    this.showFormArray = Array(this.LeadNotes.length).fill(false);
  }
  ngAfterViewInit() {
    this.AddNoteForm = this.formBuilder.group({
      description: ['', Validators.required]
    });
    this.UpdateNoteFrom = this.formBuilder.group({
      description: [''],
    });
  }
  async UpdateNote(NoteId: number, userId: number) {
    if (this.UpdateNoteFrom.valid) {
      this.Loader = true;
      const formData = {
        noteId: NoteId,
        description: this.UpdateNoteFrom.value.description,
        lastModifierUserId: this.UserId
      };

      const response = await this.apiService.putRequest('Note/UpdateNote?NoteId=' + NoteId, formData);
      response.subscribe(res => {
        this.GetNotes();
        this.UpdateNoteFrom.reset();
        this.showFormArray = Array(this.LeadNotes.length).fill(false);
        this.Loader = false;
      },
        (error:any) => {
          this.Loader = false; // Set the saving flag back to false even in case of error
          // Handle error if needed
        }
      );

    }
    else {

    }
  }


  getFileUrl(fileUrl:any) {
    debugger
    const relativeUrl = fileUrl; // Get the relative file URL
    const fullUrl = `${this.apiBaseUrl}${relativeUrl}`; // Combine with the API base URL
    return fullUrl;
  }
  async GetNotes() {


    const parameters = {
      'LeadProfileId': this.LeadProfileId,
      'TenantId': this.tenantId,
      // Add more parameters as needed
    };

    try {
      const response = await this.apiService.getRequestByMultipleParams('Note/GetLeadNotes', parameters);
      response.subscribe((res) => {
        this.LeadNotes = res;
        console.log(this.LeadNotes);
      });
    } catch (error) {
      console.error(error);
    }




  }
  toggleForm(index: number) {
    const descriptionValue = this.LeadNotes[index].description;
    this.UpdateNoteFrom.get('description')?.setValue(descriptionValue);
    this.showFormArray[index] = !this.showFormArray[index]; // Toggle the form visibility
  }
  showAddNoteForm() {
    this.AddNoteForm.reset();
    this.showForm = !this.showForm; // Assuming you have a property `showForm` to control the visibility of the form
  }

  async AddNote() {
    if (this.AddNoteForm.valid) {
      // let filePath:string="";
      // if (this.file != null) {
      //   const fileParameter: any = { data: this.file, fileName: this.file.name };
      //   const fullPath = (await this.uploadFile(fileParameter));
      //   filePath =String(fullPath);
      // }
      const formData = {
        "description": this.AddNoteForm.value.description,
        "creatorUserId": this.UserId,
        "tenantId": this.tenantId,
        "isActive": true,
        "userid": this.UserId,
        "leadProfileId": this.LeadProfileId,
        "file":this.file
      };

      let frmData = new FormData();
      frmData.append('description',this.AddNoteForm.value.description)
      frmData.append('creatorUserId',this.UserId.toString())
      frmData.append('tenantId', this.tenantId.toString())
      frmData.append('isActive',"true")
      frmData.append('userid',this.UserId.toString())
      frmData.append('leadProfileId',this.LeadProfileId.toString())
      frmData.append('file',this.file)


      console.log(formData)
      ;(await this.apiService.postWithFilesRequest('Note/AddNote', frmData)).subscribe(
        (res:any) => {
          this.GetNotes();
          this.AddNoteForm.reset();
          this.showForm = false;
        },
        (error:any) => {
          // Handle error if needed
        }
      );
    }
  }
  async Remove(noteID: number) {

    const confirmDelete = window.confirm('Are you sure you want to delete this note?');

    if (confirmDelete) {
      (await this.apiService.deleteRequest('Note/RemoveNote', noteID)).subscribe(
        (res) => {
          this.GetNotes();
        }
      );
    }
  }

  uploadFile = (files:any) => {
    if (files.length === 0) {
      return;
    }
     this.file = <File>files[0];
     this.FileName   =this.file.name
  }

  onBookAdded(eventData: any) {
this.file=eventData;
console.log(eventData)
    }
  }

