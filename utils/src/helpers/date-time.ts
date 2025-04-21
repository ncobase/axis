import { format, isValid } from 'date-fns';

type DateFormatType = 'year' | 'month' | 'day' | 'date' | 'time' | 'dateTime';

const getFormatPattern = (type: DateFormatType) => {
  switch (type) {
    case 'year':
      return 'yyyy';
    case 'month':
      return 'MM';
    case 'day':
      return 'dd';
    case 'date':
      return 'yyyy-MM-dd';
    case 'time':
      return 'HH:mm:ss';
    case 'dateTime':
      return 'yyyy-MM-dd HH:mm:ss';
  }
};

/**
 * Format date and time
 * @param dateTime Date time value as string or Date object
 * @param type Format type, defaults to 'dateTime'. Available options: 'year' | 'month' | 'day' | 'date' | 'time' | 'dateTime'
 * @returns Formatted date/time string or null if input is invalid
 */
export const formatDateTime = (
  dateTime?: string | Date,
  type: DateFormatType = 'dateTime'
): string | null => {
  if (!dateTime) return null;

  const parseDate = new Date(dateTime);
  if (!isValid(parseDate)) return null;

  const pattern = getFormatPattern(type);
  return format(parseDate, pattern);
};
