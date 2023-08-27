import { Tuple } from '@mantine/core';

export const colors = {
  whiteAlpha: [
    'rgba(255, 255, 255, 0.04)',
    'rgba(255, 255, 255, 0.06)',
    'rgba(255, 255, 255, 0.08)',
    'rgba(255, 255, 255, 0.16)',
    'rgba(255, 255, 255, 0.24)',
    'rgba(255, 255, 255, 0.36)',
    'rgba(255, 255, 255, 0.48)',
    'rgba(255, 255, 255, 0.64)',
    'rgba(255, 255, 255, 0.80)',
    'rgba(255, 255, 255, 0.92)'
  ],
  blackAlpha: [
    'rgba(0, 0, 0, 0.04)',
    'rgba(0, 0, 0, 0.06)',
    'rgba(0, 0, 0, 0.08)',
    'rgba(0, 0, 0, 0.16)',
    'rgba(0, 0, 0, 0.24)',
    'rgba(0, 0, 0, 0.36)',
    'rgba(0, 0, 0, 0.48)',
    'rgba(0, 0, 0, 0.64)',
    'rgba(0, 0, 0, 0.80)',
    'rgba(0, 0, 0, 0.92)'
  ],
  dark: [
    '#C1C2C5',
    '#A6A7AB',
    '#909296',
    '#5c5f66',
    '#373A40',
    '#2C2E33',
    '#25262b',
    '#1A1B1E',
    '#141517',
    '#101113'
  ],
  brand: [
    '#EFF6FF',
    '#DBEAFE',
    '#BFDBFE',
    '#93C5FD',
    '#60A5FA',
    '#3B82F6',
    '#2563EB',
    '#1D4ED8',
    '#1E40AF',
    '#1E3A8A'
  ],
  slate: [
    '#F8FAFC',
    '#F1F5F9',
    '#E2E8F0',
    '#CBD5E1',
    '#94A3B8',
    '#64748B',
    '#475569',
    '#334155',
    '#1E293B',
    '#0F172A'
  ],
  success: [
    '#F0FDF4',
    '#DCFCE7',
    '#BBF7D0',
    '#86EFAC',
    '#4ADE80',
    '#22C55E',
    '#16A34A',
    '#15803D',
    '#166534',
    '#14532D'
  ],
  error: [
    '#FEF2F2',
    '#FEE2E2',
    '#FECACA',
    '#FCA5A5',
    '#F87171',
    '#EF4444',
    '#DC2626',
    '#B91C1C',
    '#991B1B',
    '#7F1D1D'
  ],
  warning: [
    '#FFF7ED',
    '#FFEDD5',
    '#FED7AA',
    '#FDBA74',
    '#FB923C',
    '#F97316',
    '#EA580C',
    '#C2410C',
    '#9A3412',
    '#7C2D12'
  ]
} as Record<string, Tuple<string, 10> | string>;
