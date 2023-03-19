import React from 'react';

import { LogoProps } from '@/components/logo/index';

export const Min: React.FC<LogoProps> = ({ height, logoColor, color }) => {
  return (
    <svg height={height || '1.8rem'} viewBox='0 0 64 64' fill='none'>
      <mask
        id='mask0_720_48'
        style={{ maskType: 'alpha' }}
        maskUnits='userSpaceOnUse'
        x='0'
        y='0'
        width='64'
        height='64'
      >
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M39.6361 1.45881L62.5136 24.5928C63.5891 25.6804 64.1269 27.2148 63.9746 28.7617L60.9582 59.407C60.7015 62.0155 58.5756 64 56.0378 64H4.94582C2.21432 64 0 61.7122 0 58.89C0 57.9639 0.24362 57.0551 0.704814 56.2609L31.9357 2.48169C33.341 0.0617038 36.379 -0.723012 38.7213 0.728982C39.0528 0.934482 39.3598 1.17943 39.6361 1.45881Z'
          fill={logoColor || color || 'url(#paint0_linear_720_48)'}
        />
      </mask>
      <g mask='url(#mask0_720_48)'>
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M39.6361 1.45881L62.5136 24.5928C63.5891 25.6804 64.1269 27.2148 63.9746 28.7617L60.9582 59.407C60.7015 62.0155 58.5756 64 56.0378 64H4.94582C2.21432 64 0 61.7122 0 58.89C0 57.9639 0.24362 57.0551 0.704814 56.2609L31.9357 2.48169C33.341 0.0617037 36.379 -0.723012 38.7213 0.728982C39.0528 0.934482 39.3598 1.17943 39.6361 1.45881Z'
          fill={logoColor || color || 'url(#paint1_linear_720_48)'}
        />
        <g filter='url(#filter0_dd_720_48)'>
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M40.9713 8.61837L66.351 34.2826C67.5442 35.4892 68.1407 37.1914 67.9718 38.9075L64.6256 72.9046C64.3407 75.7985 61.9823 78 59.1669 78H2.48676C-0.543491 78 -3 75.462 -3 72.3311C-3 71.3037 -2.72973 70.2955 -2.2181 69.4145L32.4286 9.75313C33.9877 7.06845 37.358 6.19791 39.9564 7.80871C40.3242 8.03669 40.6648 8.30843 40.9713 8.61837Z'
            fill={logoColor || color || 'url(#paint2_linear_720_48)'}
          />
        </g>
      </g>
      <defs>
        <filter
          id='filter0_dd_720_48'
          x='-7'
          y='1'
          width='79'
          height='85'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood floodOpacity='0' result='BackgroundImageFix' />
          <feColorMatrix
            in='SourceAlpha'
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='hardAlpha'
          />
          <feOffset dy='-3' />
          <feGaussianBlur stdDeviation='1.5' />
          <feComposite in2='hardAlpha' operator='out' />
          <feColorMatrix type='matrix' values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.1 0' />
          <feBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_720_48' />
          <feColorMatrix
            in='SourceAlpha'
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='hardAlpha'
          />
          <feOffset dy='4' />
          <feGaussianBlur stdDeviation='2' />
          <feComposite in2='hardAlpha' operator='out' />
          <feColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0' />
          <feBlend
            mode='normal'
            in2='effect1_dropShadow_720_48'
            result='effect2_dropShadow_720_48'
          />
          <feBlend
            mode='normal'
            in='SourceGraphic'
            in2='effect2_dropShadow_720_48'
            result='shape'
          />
        </filter>
        <linearGradient
          id='paint0_linear_720_48'
          x1='53.5'
          y1='-2.06452'
          x2='6.43755'
          y2='63.9555'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#1D4ED8' />
          <stop offset='1' stopColor='#1E40AF' />
        </linearGradient>
        <linearGradient
          id='paint1_linear_720_48'
          x1='53.5'
          y1='-2.06452'
          x2='6.43755'
          y2='63.9555'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#1DD8CD' />
          <stop offset='1' stopColor='#1E41B4' />
        </linearGradient>
        <linearGradient
          id='paint2_linear_720_48'
          x1='56.3516'
          y1='4.70967'
          x2='4.14166'
          y2='77.9506'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#1D4ED8' />
          <stop offset='1' stopColor='#1E40AF' />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default Min;
