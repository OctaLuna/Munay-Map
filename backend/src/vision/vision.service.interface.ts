export interface VisionAnalysisResult {
  labels: string[];
  landmark?: {
    name: string;
    lat: number;
    lng: number;
  };
  detectedText?: string[];
}

export interface VisionServicePort {
  analyzeImage(imageBase64: string): Promise<VisionAnalysisResult>;
}
