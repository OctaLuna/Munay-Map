import type { Language } from '@/types'

/**
 * 40 idiomas soportados por la app
 * El selector usa búsqueda sobre estos registros
 */
export const LANGUAGES: Language[] = [
  { code: 'es', nombre: 'Español', nombreEs: 'Español', bandera: '🇪🇸' },
  { code: 'en', nombre: 'English', nombreEs: 'Inglés', bandera: '🇬🇧' },
  { code: 'pt-BR', nombre: 'Português (Brasil)', nombreEs: 'Portugués (Brasil)', bandera: '🇧🇷' },
  { code: 'pt', nombre: 'Português', nombreEs: 'Portugués', bandera: '🇵🇹' },
  { code: 'fr', nombre: 'Français', nombreEs: 'Francés', bandera: '🇫🇷' },
  { code: 'de', nombre: 'Deutsch', nombreEs: 'Alemán', bandera: '🇩🇪' },
  { code: 'it', nombre: 'Italiano', nombreEs: 'Italiano', bandera: '🇮🇹' },
  { code: 'nl', nombre: 'Nederlands', nombreEs: 'Neerlandés', bandera: '🇳🇱' },
  { code: 'pl', nombre: 'Polski', nombreEs: 'Polaco', bandera: '🇵🇱' },
  { code: 'ru', nombre: 'Русский', nombreEs: 'Ruso', bandera: '🇷🇺' },
  { code: 'uk', nombre: 'Українська', nombreEs: 'Ucraniano', bandera: '🇺🇦' },
  { code: 'ja', nombre: '日本語', nombreEs: 'Japonés', bandera: '🇯🇵' },
  { code: 'zh', nombre: '中文 (简体)', nombreEs: 'Chino Simplificado', bandera: '🇨🇳' },
  { code: 'zh-TW', nombre: '中文 (繁體)', nombreEs: 'Chino Tradicional', bandera: '🇹🇼' },
  { code: 'ko', nombre: '한국어', nombreEs: 'Coreano', bandera: '🇰🇷' },
  { code: 'ar', nombre: 'العربية', nombreEs: 'Árabe', bandera: '🇸🇦' },
  { code: 'hi', nombre: 'हिन्दी', nombreEs: 'Hindi', bandera: '🇮🇳' },
  { code: 'bn', nombre: 'বাংলা', nombreEs: 'Bengalí', bandera: '🇧🇩' },
  { code: 'tr', nombre: 'Türkçe', nombreEs: 'Turco', bandera: '🇹🇷' },
  { code: 'vi', nombre: 'Tiếng Việt', nombreEs: 'Vietnamita', bandera: '🇻🇳' },
  { code: 'th', nombre: 'ภาษาไทย', nombreEs: 'Tailandés', bandera: '🇹🇭' },
  { code: 'id', nombre: 'Bahasa Indonesia', nombreEs: 'Indonesio', bandera: '🇮🇩' },
  { code: 'ms', nombre: 'Bahasa Melayu', nombreEs: 'Malayo', bandera: '🇲🇾' },
  { code: 'sv', nombre: 'Svenska', nombreEs: 'Sueco', bandera: '🇸🇪' },
  { code: 'da', nombre: 'Dansk', nombreEs: 'Danés', bandera: '🇩🇰' },
  { code: 'no', nombre: 'Norsk', nombreEs: 'Noruego', bandera: '🇳🇴' },
  { code: 'fi', nombre: 'Suomi', nombreEs: 'Finlandés', bandera: '🇫🇮' },
  { code: 'cs', nombre: 'Čeština', nombreEs: 'Checo', bandera: '🇨🇿' },
  { code: 'sk', nombre: 'Slovenčina', nombreEs: 'Eslovaco', bandera: '🇸🇰' },
  { code: 'hu', nombre: 'Magyar', nombreEs: 'Húngaro', bandera: '🇭🇺' },
  { code: 'ro', nombre: 'Română', nombreEs: 'Rumano', bandera: '🇷🇴' },
  { code: 'he', nombre: 'עברית', nombreEs: 'Hebreo', bandera: '🇮🇱' },
  { code: 'el', nombre: 'Ελληνικά', nombreEs: 'Griego', bandera: '🇬🇷' },
  { code: 'ca', nombre: 'Català', nombreEs: 'Catalán', bandera: '🏴' },
  { code: 'hr', nombre: 'Hrvatski', nombreEs: 'Croata', bandera: '🇭🇷' },
  { code: 'sr', nombre: 'Српски', nombreEs: 'Serbio', bandera: '🇷🇸' },
  { code: 'bg', nombre: 'Български', nombreEs: 'Búlgaro', bandera: '🇧🇬' },
  { code: 'lt', nombre: 'Lietuvių', nombreEs: 'Lituano', bandera: '🇱🇹' },
  { code: 'lv', nombre: 'Latviešu', nombreEs: 'Letón', bandera: '🇱🇻' },
  { code: 'et', nombre: 'Eesti', nombreEs: 'Estonio', bandera: '🇪🇪' },
]

export const DEFAULT_LANGUAGE = LANGUAGES[0] as Language
