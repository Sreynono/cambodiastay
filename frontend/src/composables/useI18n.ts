import { ref } from 'vue';
import en from '@/locales/en';
import km from '@/locales/km';

export type LanguageCode = 'en' | 'km';

export interface LanguageOption {
  code: LanguageCode;
  name: string;
  nativeName: string;
  flag: string;
}

export const availableLanguages: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'km', name: 'Khmer', nativeName: 'ភាសាខ្មែរ', flag: '🇰🇭' },
];

const messages: Record<LanguageCode, Record<string, any>> = {
  en,
  km,
};

// Initial language detection from localStorage
const savedCode = (typeof localStorage !== 'undefined' ? (localStorage.getItem('camstay_lang') || localStorage.getItem('cambodiastay_lang')) : null) as LanguageCode | null;
const initialLang: LanguageCode = savedCode === 'km' ? 'km' : 'en';

export const currentLang = ref<LanguageCode>(initialLang);

// Ensure html lang attribute is synced on startup
if (typeof document !== 'undefined') {
  document.documentElement.lang = initialLang;
}

/**
 * Set current application language and persist in localStorage
 */
export function setLanguage(lang: LanguageCode) {
  currentLang.value = lang;
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('camstay_lang', lang);
  }
  if (typeof document !== 'undefined') {
    document.documentElement.lang = lang;
  }
}

/**
 * Translate a dot-notation key (e.g. 'nav.home')
 */
export function t(path: string, params?: Record<string, string | number>): string {
  const keys = path.split('.');
  
  // 1. Try active language
  let result: any = messages[currentLang.value];
  for (const k of keys) {
    if (result && result[k] !== undefined) {
      result = result[k];
    } else {
      result = undefined;
      break;
    }
  }

  // 2. Fallback to English if key missing in active language
  if (result === undefined && currentLang.value !== 'en') {
    let fallback: any = messages['en'];
    for (const k of keys) {
      if (fallback && fallback[k] !== undefined) {
        fallback = fallback[k];
      } else {
        fallback = undefined;
        break;
      }
    }
    result = fallback;
  }

  // 3. Fallback to key path itself
  if (result === undefined || typeof result !== 'string') {
    return path;
  }

  // 4. Substitute parameters e.g. {count}
  if (params) {
    let text = result;
    for (const [paramKey, paramVal] of Object.entries(params)) {
      text = text.replace(new RegExp(`\\{${paramKey}\\}`, 'g'), String(paramVal));
    }
    return text;
  }

  return result;
}

/**
 * Translate Cambodian province names
 */
export function translateProvince(provinceName?: string): string {
  if (!provinceName) return '';
  const trimmed = provinceName.trim();
  const provMap = messages[currentLang.value]?.provinces;
  if (provMap && provMap[trimmed]) {
    return provMap[trimmed];
  }
  return trimmed;
}

export function useI18n() {
  return {
    currentLang,
    availableLanguages,
    setLanguage,
    t,
    translateProvince,
  };
}
