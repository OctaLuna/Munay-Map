export interface TtsSynthesizeRequest {
  text: string;
  /** BCP-47 language code, e.g. 'es', 'en', 'ja' */
  languageCode: string;
}

export interface TtsSynthesizeResult {
  /** MP3 audio encoded as base64 string */
  audioBase64: string;
}

export interface TtsServicePort {
  synthesize(request: TtsSynthesizeRequest): Promise<TtsSynthesizeResult>;
}
