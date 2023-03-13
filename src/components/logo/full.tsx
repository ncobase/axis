import React from 'react';

import { LogoProps } from '@/components/logo/index';

const Full: React.FC<LogoProps> = ({ height, logoColor, textColor, color, ...rest }) => {
  return (
    <svg height={height || '1.8rem'} viewBox='0 0 331 64' fill='none' {...rest}>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M39.6361 1.45881L62.5136 24.5928C63.5891 25.6804 64.1269 27.2148 63.9746 28.7617L60.9582 59.407C60.7015 62.0155 58.5756 64 56.0378 64H4.94582C2.21432 64 0 61.7122 0 58.89C0 57.9639 0.24362 57.0551 0.704814 56.2609L31.9357 2.48169C33.341 0.0617037 36.379 -0.723012 38.7213 0.728982C39.0528 0.934482 39.3598 1.17943 39.6361 1.45881Z'
        fill={logoColor || color || 'url(#paint0_linear_720_28)'}
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M100.82 15C96.412 15 92.758 15.986 89.858 17.958C86.784 20.046 85.276 22.888 85.276 26.542C85.276 30.138 86.842 32.922 90.032 34.836C91.308 35.532 94.44 36.634 99.544 38.258L101.499 38.8588C104.911 39.9206 106.993 40.6483 107.78 41.042C110.39 42.376 111.724 44.174 111.724 46.494C111.724 48.35 110.796 49.8 108.94 50.844C107.084 51.888 104.59 52.468 101.458 52.468C97.978 52.468 95.426 51.83 93.744 50.554C91.888 49.162 90.728 46.784 90.264 43.536H84C84.348 48.756 86.204 52.584 89.626 55.02C92.468 56.992 96.412 58.036 101.458 58.036C106.678 58.036 110.738 56.992 113.638 54.904C116.538 52.758 117.988 49.858 117.988 46.146C117.988 42.318 116.19 39.36 112.652 37.214C111.028 36.228 107.374 34.894 101.806 33.154L100.648 32.8034C97.5668 31.8556 95.6014 31.1279 94.7152 30.6572L94.614 30.602C92.526 29.5 91.54 28.05 91.54 26.194C91.54 24.193 92.339 22.7247 93.9881 21.789L94.208 21.67C95.658 20.858 97.746 20.452 100.472 20.452C103.604 20.452 105.924 21.032 107.548 22.25C109.172 23.41 110.216 25.382 110.796 28.05H117.06C116.654 23.526 115.03 20.22 112.13 18.074C109.404 15.986 105.634 15 100.82 15ZM120.656 15.812V21.206H134.518V57.224H140.782V21.206H154.586V15.812H120.656ZM162.996 21.206C166.592 17.03 171.58 15 177.902 15C184.166 15 189.154 17.03 192.808 21.148C196.288 25.034 198.028 30.196 198.028 36.576C198.028 42.898 196.288 48.002 192.808 51.946C189.154 56.006 184.166 58.036 177.902 58.036C171.58 58.036 166.592 55.948 162.996 51.888C159.516 47.944 157.834 42.84 157.834 36.576C157.834 30.254 159.516 25.15 162.996 21.206ZM177.902 20.568C182.31 20.568 185.732 21.96 188.11 24.86C190.43 27.702 191.648 31.588 191.648 36.576C191.648 41.506 190.43 45.392 188.11 48.176C185.732 51.018 182.31 52.468 177.902 52.468C173.494 52.468 170.072 50.96 167.636 48.06C165.316 45.218 164.156 41.39 164.156 36.576C164.156 31.704 165.316 27.876 167.636 25.034C170.072 22.018 173.494 20.568 177.902 20.568ZM207.308 21.554C210.788 17.146 215.776 15 222.388 15C227.202 15 231.204 16.218 234.336 18.77C237.352 21.206 239.208 24.57 239.846 28.746H233.698C233.002 25.962 231.668 23.874 229.696 22.54C227.724 21.206 225.288 20.568 222.272 20.568C217.806 20.568 214.442 22.076 212.18 25.15L211.962 25.4417C209.963 28.1992 208.99 31.928 208.99 36.576C208.99 41.564 210.034 45.392 212.122 48.118C214.326 51.018 217.748 52.468 222.388 52.468C225.404 52.468 227.956 51.714 229.928 50.206C232.016 48.582 233.466 46.146 234.278 42.898H240.426C239.498 47.712 237.352 51.482 233.93 54.208C230.74 56.76 226.912 58.036 222.446 58.036C215.66 58.036 210.556 55.832 207.134 51.54C204.118 47.828 202.668 42.84 202.668 36.576C202.668 30.428 204.176 25.44 207.308 21.554ZM246.806 15.812V57.224H253.128V27.644H253.36L266.062 47.224H271.514L284.216 27.644H284.448V57.224H290.77V15.812H283.288L268.904 38.988H268.73L254.288 15.812H246.806ZM324.7 18.074C321.974 15.986 318.204 15 313.39 15C308.982 15 305.328 15.986 302.428 17.958C299.354 20.046 297.846 22.888 297.846 26.542C297.846 30.138 299.412 32.922 302.602 34.836C303.646 35.4055 305.932 36.2467 309.525 37.4233L312.114 38.258C316.418 39.5656 319.085 40.4638 320.161 40.9525L320.35 41.042C322.96 42.376 324.294 44.174 324.294 46.494C324.294 48.35 323.366 49.8 321.51 50.844C319.654 51.888 317.16 52.468 314.028 52.468C310.548 52.468 307.996 51.83 306.314 50.554C304.458 49.162 303.298 46.784 302.834 43.536H296.57C296.918 48.756 298.774 52.584 302.196 55.02C305.038 56.992 308.982 58.036 314.028 58.036C319.248 58.036 323.308 56.992 326.208 54.904C329.108 52.758 330.558 49.858 330.558 46.146C330.558 42.318 328.76 39.36 325.222 37.214C323.694 36.286 320.367 35.0497 315.339 33.4569L314.376 33.154C310.49 31.994 308.112 31.124 307.184 30.602L306.929 30.4624C305.016 29.3785 304.11 27.9727 304.11 26.194C304.11 24.106 304.98 22.598 306.778 21.67L307.026 21.5384C308.462 20.8141 310.467 20.452 313.042 20.452C316.174 20.452 318.494 21.032 320.118 22.25C321.742 23.41 322.786 25.382 323.366 28.05H329.63C329.224 23.526 327.6 20.22 324.7 18.074Z'
        fill={textColor || color || 'black'}
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M84 9.568V1H87.828C88.62 1 89.256 1.192 89.724 1.576C90.18 1.96 90.408 2.488 90.408 3.16C90.408 3.64 90.276 4.06 90.024 4.408C89.76 4.72 89.412 4.948 88.98 5.092C89.544 5.188 89.976 5.428 90.288 5.788C90.6 6.148 90.768 6.604 90.768 7.18C90.768 8.02 90.468 8.644 89.88 9.052C89.376 9.388 88.68 9.568 87.804 9.568H84ZM87.6 1.828H84.984V4.744H87.588C88.188 4.744 88.644 4.612 88.956 4.372C89.268 4.12 89.436 3.748 89.436 3.256C89.436 2.776 89.28 2.416 88.968 2.176C88.656 1.936 88.2 1.828 87.6 1.828ZM84.984 5.56H87.72C88.38 5.56 88.884 5.68 89.232 5.944C89.592 6.208 89.784 6.616 89.784 7.168C89.784 7.72 89.568 8.14 89.148 8.404C88.788 8.62 88.32 8.74 87.72 8.74H84.984V5.56ZM92.424 4.168C92.952 3.52 93.66 3.196 94.56 3.196C95.556 3.196 96.312 3.532 96.816 4.204C97.272 4.804 97.512 5.656 97.536 6.736H92.64C92.688 7.432 92.868 7.972 93.204 8.356C93.54 8.74 94.008 8.932 94.596 8.932C95.1 8.932 95.52 8.8 95.832 8.548C96.096 8.332 96.3 8.008 96.456 7.576H97.416C97.272 8.176 96.996 8.656 96.576 9.04C96.06 9.496 95.4 9.736 94.596 9.736C93.708 9.736 92.988 9.436 92.46 8.86C91.908 8.26 91.644 7.468 91.644 6.46C91.644 5.548 91.896 4.78 92.424 4.168ZM94.584 4C95.76 4 96.42 4.66 96.54 5.992H92.664C92.724 5.38 92.916 4.9 93.252 4.54C93.588 4.18 94.032 4 94.584 4ZM99.372 1.756L100.32 1.36V3.364H101.856V4.168H100.32V8.116C100.32 8.344 100.356 8.512 100.452 8.608C100.536 8.704 100.692 8.764 100.908 8.764H101.7V9.568H100.764C100.26 9.568 99.888 9.436 99.672 9.172C99.468 8.932 99.372 8.584 99.372 8.116V4.168H98.124V3.364H99.372V1.756ZM105.624 3.196C104.88 3.196 104.292 3.34 103.836 3.628C103.332 3.94 103.008 4.432 102.876 5.08L103.824 5.152C103.92 4.756 104.124 4.456 104.448 4.264C104.736 4.072 105.108 3.988 105.564 3.988C106.644 3.988 107.184 4.504 107.184 5.548V5.872L105.696 5.896C104.76 5.908 104.04 6.088 103.536 6.424C102.96 6.784 102.684 7.312 102.684 8.02C102.684 8.524 102.876 8.944 103.26 9.268C103.632 9.58 104.124 9.736 104.748 9.736C105.324 9.736 105.84 9.604 106.296 9.352C106.68 9.136 107.004 8.86 107.244 8.524V9.568H108.144V5.584C108.144 4.864 107.952 4.3 107.592 3.892C107.16 3.424 106.512 3.196 105.624 3.196ZM107.184 7.12V6.592L105.756 6.616C104.364 6.64 103.668 7.096 103.668 7.996C103.668 8.284 103.776 8.512 104.016 8.704C104.256 8.884 104.568 8.98 104.952 8.98C105.54 8.98 106.056 8.788 106.512 8.404C106.956 8.032 107.184 7.6 107.184 7.12Z'
        fill={textColor || color || 'black'}
      />
      <defs>
        <linearGradient
          id='paint0_linear_720_28'
          x1='276.326'
          y1='-2.06452'
          x2='262.841'
          y2='95.6428'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#1D4ED8' />
          <stop offset='1' stopColor='#1E40AF' />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default Full;
