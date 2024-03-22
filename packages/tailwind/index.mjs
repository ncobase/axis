import resolveConfig from 'tailwindcss/resolveConfig';

import config from './tailwind.config.mjs';

const tailwindConfig = resolveConfig(config);

export default tailwindConfig;
export { tailwindConfig };
