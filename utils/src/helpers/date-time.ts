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
 * @returns Formatted date/time string or null if input is invalid
 */
export const formatDateTime = (
  dateTime?: string | Date,
  type: DateFormatType = 'dateTime',
  locale?: string
): string | null => {
  if (!dateTime) return null;

  const parseDate = new Date(dateTime);
  if (isNaN(parseDate.getTime())) return null;

  const options = getDateTimeFormatOptions(type);
  // Use provided locale or fallback to system default
  const userLocale = locale || navigator.language || 'en-US';
  return new Intl.DateTimeFormat(userLocale, options).format(parseDate);
};
/**
 * Format relative time from a date
 * @param date Date to calculate relative time from
 * @param name Optional display name to prepend to the relative time
 * @param labels Optional labels for minutes/hours/days display
 * @returns Formatted relative time string with optional name
 */
export const formatRelativeTime = (
  date: Date,
  name?: string,
  labels?: {
    minutes?: string;
    hours?: string;
    days?: string;
  }
) => {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMinutes = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  const defaultLabels = {
    minutes: 'minutes ago',
    hours: 'hours ago',
    days: 'days ago'
  };

  const finalLabels = { ...defaultLabels, ...labels };

  let timeAgo;
  if (diffMinutes < 60) {
    timeAgo = `${diffMinutes} ${finalLabels.minutes}`;
  } else if (diffHours < 24) {
    timeAgo = `${diffHours} ${finalLabels.hours}`;
  } else {
    timeAgo = `${diffDays} ${finalLabels.days}`;
  }

  return name ? `${name} ${timeAgo}` : timeAgo;
};
