type DateFormatType = 'year' | 'month' | 'day' | 'date' | 'time' | 'dateTime';

const getDateTimeFormatOptions = (type: DateFormatType): Intl.DateTimeFormatOptions => {
  switch (type) {
    case 'year':
      return { year: 'numeric' };
    case 'month':
      return { month: '2-digit' };
    case 'day':
      return { day: '2-digit' };
    case 'date':
      return {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      };
    case 'time':
      return {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
    case 'dateTime':
      return {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
  }
};

/**
 * Format date and time
 * @param dateTime Date time value as string or Date object
 * @param type Format type, defaults to 'dateTime'. Available options: 'year' | 'month' | 'day' | 'date' | 'time' | 'dateTime'
 * @param locale Locale string (e.g. 'en-US', 'zh-CN'). If not provided, uses browser's default locale
 * @returns Formatted date/time string or empty string if input is invalid
 */
export const formatDateTime = (
  dateTime?: string | Date,
  type: DateFormatType = 'dateTime',
  locale?: string
): string => {
  if (!dateTime) return '';

  const parseDate = new Date(dateTime);
  if (isNaN(parseDate.getTime())) return '';

  const options = getDateTimeFormatOptions(type);
  // Use provided locale or fallback to system default
  const userLocale = locale || navigator.language || 'en-US';
  return new Intl.DateTimeFormat(userLocale, options).format(parseDate);
};

/**
 * Format relative time from a date
 * @param date Date to calculate relative time from
 * @param labels Optional labels for minutes/hours/days display
 * @param reverse If true, calculates future time instead of past time
 * @returns Formatted relative time string
 */
export const formatRelativeTime = (
  date: Date,
  labels?: {
    minutes?: string;
    hours?: string;
    days?: string;
  },
  reverse: boolean = false
) => {
  const now = new Date();
  const diffMs = reverse ? date.getTime() - now.getTime() : now.getTime() - date.getTime();
  const diffMinutes = Math.floor(diffMs / 60000);

  const defaultLabels = {
    minutes: reverse ? 'minutes from now' : 'minutes ago',
    hours: reverse ? 'hours from now' : 'hours ago',
    days: reverse ? 'days from now' : 'days ago'
  };

  const finalLabels = { ...defaultLabels, ...labels };

  // Remove any {{}} patterns from labels and ensure string values
  Object.keys(finalLabels).forEach(key => {
    const labelKey = key as keyof typeof finalLabels;
    const value = finalLabels[labelKey];
    if (value) {
      finalLabels[labelKey] = String(value).replace(/\{\{.*?\}\}/g, '');
    }
  });

  // Handle negative values for past times
  const absMinutes = Math.abs(diffMinutes);
  const absHours = Math.floor(absMinutes / 60);
  const absDays = Math.floor(absHours / 24);

  if (absMinutes < 60) {
    return `${absMinutes} ${finalLabels.minutes}`;
  } else if (absHours < 24) {
    return `${absHours} ${finalLabels.hours}`;
  } else {
    return `${absDays} ${finalLabels.days}`;
  }
};
