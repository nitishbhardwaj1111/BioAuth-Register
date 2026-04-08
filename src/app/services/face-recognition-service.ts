// face-recognition.service.ts
import { Injectable } from '@angular/core';
import * as faceapi from 'face-api.js';

@Injectable({
  providedIn: 'root'
})
export class FaceRecognitionService {

  private modelsLoaded = false;

  async loadModels(): Promise<void> {
    if (this.modelsLoaded) return;

    const MODEL_URL = '/models';

    await Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
      faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
      faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL)
    ]);

    this.modelsLoaded = true;
  }

  async startCamera(video: HTMLVideoElement): Promise<void> {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;

    return new Promise(resolve => {
      video.onloadedmetadata = () => resolve();
    });
  }

  async getFaceEmbedding(video: HTMLVideoElement): Promise<Float32Array | null> {
    const detection = await faceapi
      .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceDescriptor();

    return detection ? detection.descriptor : null;
  }

  calculateDistance(desc1: Float32Array, desc2: Float32Array): number {
    let sum = 0;
    for (let i = 0; i < desc1.length; i++) {
      sum += Math.pow(desc1[i] - desc2[i], 2);
    }
    return Math.sqrt(sum);
  }

  facematch(patients: any[], currentDescriptor: any) {
    // This method can be implemented to compare the captured face embedding with stored embeddings
    const labeledDescriptors = patients.map(p => {
      return new faceapi.LabeledFaceDescriptors(
        p.name,
        p.faceEmbedding.map((e: any) => new Float32Array(e))
      );
    });
    const matcher = new faceapi.FaceMatcher(labeledDescriptors, 0.6);
    const result = matcher.findBestMatch(currentDescriptor);
    console.log(result.label); // patientId or 'unknown'
  }
}