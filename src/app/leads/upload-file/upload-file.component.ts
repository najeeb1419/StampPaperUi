import { HttpClient, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent {
  progress: number;
  message: string;
  FileName: string;
  @Output() public bookTitleCreated = new EventEmitter();
  
  constructor(private http: HttpClient) { }
  ngOnInit() {
  }
  uploadFile = (files:any) => {
    if (files.length === 0) {
      return;
    }
    debugger
    let fileToUpload = <File>files[0];
    const formData = new FormData();
 this.FileName   =fileToUpload.name
    formData.append('file', fileToUpload, fileToUpload.name);
    this.bookTitleCreated.emit(fileToUpload);
    // this.http.post('https://localhost:7191/api/Note/AddFile', formData, {reportProgress: true, observe: 'events'})
    //   .subscribe({
    //     next: (event) => {
    //       debugger
    //     if (event.type === HttpEventType.UploadProgress && event.total)
    //       this.progress = Math.round(100 * event.loaded / event.total);
    //     else if (event.type === HttpEventType.Response) {
    //       this.message = 'Upload success.';
  
    //     }
    //   },
    //   error: (err: HttpErrorResponse) => console.log(err)
    // });
  }
}

