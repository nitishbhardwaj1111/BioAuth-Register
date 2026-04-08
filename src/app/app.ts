import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// import { FaceCapture } from './components/face-capture/face-capture';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FaceRecognitionService } from './services/face-recognition-service';
import { DeepFaceCapture } from './deep-face-capture/deep-face-capture';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DeepFaceCapture, FormsModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  // protected readonly title = signal('face-login');

  // constructor(private faceService: FaceRecognitionService){}
  // patient: any = {
  //   name: 'Nitish',
  //   faceEmbedding: []
  // };
  // embeddingCount = 0;

  // onFaceCaptured(embedding: any) {
  //   console.log(embedding)
  //   this.embeddingCount++;
  //   this.patient.faceEmbedding.push(embedding);
  // }

  // save() {
  //   localStorage.setItem('patient', JSON.stringify(this.patient));
  // }

  // save2() {
  //   const patieint = [JSON.parse(localStorage.getItem('patient') || '')];
  //   this.faceService.facematch(patieint, this.patient.faceEmbedding[0]);
  // }
  
  // createPatient() {
  //   if (this.embeddingCount < 4) {
  //     alert('Atleast 5 embedding')
  //     return;
  //   }
  //   if (!this.patient.name) {
  //     alert('Name is required')
  //     return;
  //   }
  //   const patients = JSON.parse(localStorage.getItem('patient') || '[]');
  //   patients.push(this.patient)
  //   localStorage.setItem('patient', JSON.stringify(patients));
  //   this.reset();
  // }

  // reset() {
  //   this.embeddingCount = 0;
  //   this.patient = {
  //     name: '',
  //     faceEmbedding: []
  //   }
  // }
}
