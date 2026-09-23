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

/**
 * Translate homestay landscape / environment types
 */
export function translateLandscape(landscape?: string): string {
  if (!landscape) return '';
  const trimmed = landscape.trim();
  if (currentLang.value === 'km') {
    const landMap: Record<string, string> = {
      Mountain: 'តំបន់ភ្នំ',
      'Eco-Lodge': 'ផ្ទះលំហែអេកូ',
      EcoLodge: 'ផ្ទះលំហែអេកូ',
      Lake: 'មាត់បឹង',
      River: 'មាត់ស្ទឹង/ទន្លេ',
      Farm: 'កសិដ្ឋានស្រែ',
      Forest: 'ព្រៃព្រឹក្សា',
      Culture: 'ភូមិបុរាណ & វប្បធម៌',
      Sea: 'សមុទ្រ',
    };
    return landMap[trimmed] || trimmed;
  }
  return trimmed;
}

/**
 * Translate common homestay experiences and farm activities
 */
export function translateExperience(exp?: string): string {
  if (!exp) return '';
  const trimmed = exp.trim();
  if (currentLang.value === 'km') {
    const expMap: Record<string, string> = {
      'Organic Farming': 'កសិកម្មសរីរាង្គ',
      'Rural Hospitality': 'ការបដិសណ្ឋារកិច្ចជនបទ',
      'Khmer Cooking': 'រៀនធ្វើម្ហូបខ្មែរ',
      'Traditional Weaving': 'តម្បាញសូត្រប្រពៃណី',
      Trekking: 'ដើរព្រៃកម្សាន្ត',
      'Campfire Gathering': 'ជួបជុំដុតភ្លើងជំរំ',
      'Fruit Picking': 'បេះផ្លែឈើក្នុងចម្ការ',
      'Bicycle Touring': 'ជិះកង់កម្សាន្តតាមភូមិ',
      'Fishing Experience': 'បទពិសោធន៍ស្ទូចត្រី',
      'Pottery Making': 'ធ្វើក្អមឆ្នាំងដីបុរាណ',
      'Tea & Herb Harvesting': 'ប្រមូលផលតែ និងឱសថធម្មជាតិ',
      'Buffalo Riding': 'ជិះក្របីកម្សាន្ត',
      'Rice Harvesting': 'ច្រូតស្រូវ និងស្ទូងស្រូវ',
      'Farm Life': 'ជីវិតកសិដ្ឋាន',
      'Eco Tourism': 'អេកូទេសចរណ៍',
    };
    return expMap[trimmed] || trimmed;
  }
  return trimmed;
}

/**
 * Translate common price inclusion text
 */
export function translateInclusion(inc?: string): string {
  if (!inc) return '';
  const trimmed = inc.trim();
  if (currentLang.value === 'km') {
    const incMap: Record<string, string> = {
      'Breakfast Included': 'រាប់បញ្ចូលអាហារពេលព្រឹក',
      'Free Breakfast': 'អាហារពេលព្រឹកឥតគិតថ្លៃ',
      'Dinner Included': 'រាប់បញ្ចូលអាហារពេលល្ងាច',
      'Free WiFi': 'វ៉ាយហ្វាយឥតគិតថ្លៃ',
      'Bicycle Rental': 'កង់ជិះកម្សាន្តឥតគិតថ្លៃ',
      'Tour Guide': 'មគ្គុទ្ទេសក៍ទេសចរណ៍',
    };
    return incMap[trimmed] || trimmed;
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
    translateLandscape,
    translateExperience,
    translateInclusion,
  };
}
