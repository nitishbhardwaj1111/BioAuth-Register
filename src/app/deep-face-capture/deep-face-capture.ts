import { Component, OnInit } from '@angular/core';
import { WebcamModule } from 'ngx-webcam';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { WebcamImage, WebcamInitError } from 'ngx-webcam';
import { CommonModule, JsonPipe } from '@angular/common'; // ✅ Import the pipe

@Component({
  selector: 'app-deep-face-capture',
  standalone: true,
  imports: [WebcamModule, JsonPipe, CommonModule],
  templateUrl: './deep-face-capture.html',
  styleUrl: './deep-face-capture.scss',
})
export class DeepFaceCapture implements OnInit {
  public webcamImage: WebcamImage | null = null;
  private trigger: Subject<void> = new Subject<void>();
  embedding: number[] | null = null;
  verificationResult: any | null = null;
  isBrowser = false;

  ngOnInit() {
    this.isBrowser = typeof navigator !== 'undefined';
  }


  constructor(private http: HttpClient) { }

  public triggerSnapshot(): void {
    this.trigger.next();
  }

  public handleImage(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  // sendEmbedding(): void {
  //   if (!this.webcamImage) return;
  //   const payload = { image: this.webcamImage.imageAsDataUrl };
  //   this.http.post('http://localhost:5000/embedding', payload)
  //     .subscribe((res: any) => this.embedding = res.embedding);
  // }

  sendEmbedding(): void {
    // if (!this.selectedImage) return;

    // const payload = { image: this.selectedImage };

    // this.http.post('http://localhost:5000/faceembedding', payload)
    //   .subscribe((res: any) => this.embedding = res.embedding);


    const imageData = this.webcamImage?.imageAsDataUrl || this.selectedImage;
    if (!imageData) return;

    const payload = { image: imageData };

    this.http.post('http://localhost:5000/faceembedding', payload)
      .subscribe((res: any) => {
        const patients = JSON.parse(localStorage.getItem('patients') || '[]');
        patients.push({
          "id": `patient_${patients.length + 1}`,
          "embedding": res.embeddings[0]
        });
        localStorage.setItem('patients', JSON.stringify(patients));
    });
  }

  verifyFaceWithStoredEmbedding(): void {
    if (!this.webcamImage) return;
    const patients = localStorage.getItem('patients');
    if (!patients) {
      alert('No stored embedding found. Please capture and save an embedding first.');
      return;
    }
    
    const payload = { image: this.webcamImage.imageAsDataUrl, patients: JSON.parse(patients || '[]') };
    this.http.post('http://localhost:5000/match', payload)
      .subscribe((res: any) => {
        console.log('Verification result:', res);
        this.verificationResult = res;
      });
  }

  selectedImage: string | null = null;
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      this.selectedImage = reader.result as string; // base64 string
    };
    reader.readAsDataURL(file);
  }

  verifyFace(otherImageDataUrl: string): void {
    if (!this.webcamImage) return;
    const payload = {
      image1: this.webcamImage.imageAsDataUrl,
      image2: otherImageDataUrl
    };
    this.http.post('http://localhost:5000/verify', payload)
      .subscribe((res: any) => this.verificationResult = res);
  }
}