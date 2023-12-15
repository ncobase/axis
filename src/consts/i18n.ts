interface Language {
  key: string;
  dir?: 'ltr' | 'rtl';
  fontScale?: number;
}

export const DEFAULT_LANGUAGE_KEY: Language['key'] = 'zh';

export const AVAILABLE_LANGUAGES: Language[] = [
  {
    key: 'zh'
  }
];
