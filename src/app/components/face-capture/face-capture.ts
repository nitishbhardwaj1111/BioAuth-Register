// face-capture.component.ts
import {
  Component,
  ElementRef,
  ViewChild,
  Output,
  EventEmitter,
  OnInit,
  Input
} from '@angular/core';
import { FaceRecognitionService } from '../../services/face-recognition-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-face-capture',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './face-capture.html',
  styleUrl: './face-capture.scss',
})
export class FaceCapture implements OnInit {

  @ViewChild('video') videoRef!: ElementRef<HTMLVideoElement>;
  @Output() faceCaptured = new EventEmitter<number[]>();
  @Input() embeddingCount: any

  loading = true;
  error = '';

  constructor(private faceService: FaceRecognitionService) {}

  async ngOnInit() {
    try {
      await this.faceService.loadModels();
      await this.faceService.startCamera(this.videoRef.nativeElement);
      this.loading = false;
    } catch (err) {
      this.error = 'Camera or model failed to load';
    }
  }

  async capture() {
    const descriptor = await this.faceService.getFaceEmbedding(
      this.videoRef.nativeElement
    );

    if (!descriptor) {
      this.error = 'No face detected. Try again.';
      return;
    }
    this.faceCaptured.emit(Array.from(descriptor));
  }

  async searchPatient() {
    const descriptor = await this.faceService.getFaceEmbedding(
      this.videoRef.nativeElement
    );

    if (!descriptor) {
      this.error = 'No face detected. Try again.';
      return;
    }
    const descriptor1: any = Array.from(descriptor);
    const patieint = JSON.parse(localStorage.getItem('patient') || '[]');
    this.faceService.facematch(patieint, descriptor1);
  }

  

  
}