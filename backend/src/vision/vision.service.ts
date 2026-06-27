import { Injectable, Logger } from '@nestjs/common';
import { ImageAnnotatorClient } from '@google-cloud/vision';
import type {
  VisionServicePort,
  VisionAnalysisResult,
} from './vision.service.interface';

@Injectable()
export class VisionService implements VisionServicePort {
  private readonly logger = new Logger(VisionService.name);
  private client = new ImageAnnotatorClient();

  async analyzeImage(imageBase64: string): Promise<VisionAnalysisResult> {
    this.logger.log('Calling Google Vision AI...');
    const [result] = await this.client.annotateImage({
      image: { content: imageBase64 },
      features: [
        { type: 'LABEL_DETECTION', maxResults: 10 },
        { type: 'LANDMARK_DETECTION', maxResults: 3 },
        { type: 'TEXT_DETECTION' },
      ],
    });

    const labels =
      result.labelAnnotations
        ?.map((l) => l.description ?? '')
        .filter(Boolean) ?? [];

    const landmarkAnnotation = result.landmarkAnnotations?.[0];
    const landmark = landmarkAnnotation
      ? {
          name: landmarkAnnotation.description ?? '',
          lat: landmarkAnnotation.locations?.[0]?.latLng?.latitude ?? 0,
          lng: landmarkAnnotation.locations?.[0]?.latLng?.longitude ?? 0,
        }
      : undefined;

    const detectedText =
      result.textAnnotations
        ?.slice(1)
        .map((t) => t.description ?? '')
        .filter(Boolean) ?? [];

    return { labels, landmark, detectedText };
  }
}
