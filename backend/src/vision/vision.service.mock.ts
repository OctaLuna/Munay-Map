import { Injectable } from '@nestjs/common';
import type {
  VisionServicePort,
  VisionAnalysisResult,
} from './vision.service.interface';

@Injectable()
export class VisionServiceMock implements VisionServicePort {
  // eslint-disable-next-line @typescript-eslint/require-await
  async analyzeImage(_imageBase64: string): Promise<VisionAnalysisResult> {
    return {
      labels: [
        'ruinas antiguas',
        'monumento de piedra',
        'arqueologia',
        'cultura andina',
      ],
      landmark: { name: 'Tiwanaku', lat: -16.5547, lng: -68.6733 },
      detectedText: [],
    };
  }
}
