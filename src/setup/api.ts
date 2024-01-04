interface HostConfig {
  HOST: string;
  PORT: string;
  PATH: string;
}

type Environment = 'production' | 'test' | 'development';

interface HostMap {
  [key: string]: HostConfig;
}

interface UserConfig {
  username: string;
  password: string;
  keep_ticket?: boolean;
}

const HOST: HostMap = {
  development: {
    HOST: '',
    PORT: '',
    PATH: ''
  },
  production: {
    HOST: '',
    PORT: '',
    PATH: ''
  },
  test: {
    HOST: '',
    PORT: '',
    PATH: ''
  }
};

const defOps = (env: Environment): UserConfig => {
  switch (env) {
    case 'production':
      return { username: '', password: '' };
    default:
      return { username: '', password: '' };
  }
};

const env: Environment = (process.env.NODE_ENV as Environment) || 'development';

const HOST_ENV: HostConfig = HOST[env];
const Endpoint: string =
  HOST_ENV.PORT !== ''
    ? `${HOST_ENV.HOST}:${HOST_ENV.PORT}${HOST_ENV.PATH}`
    : `${HOST_ENV.HOST}${HOST_ENV.PATH}`;

const FIXED_PARAM = {
  endpoint: Endpoint,
  authorization: `${Endpoint}/wxqy/authorization`,
  cros: [''],
  default_user: defOps(env)
};

type ApiMaps = { [key: string]: any | ApiMaps };

const urlHandle = (obj: ApiMaps, url: string): ApiMaps => {
  Object.keys(obj).forEach(key => {
    const value = obj[key];
    if (typeof value === 'object') {
      obj[key] = urlHandle(value as ApiMaps, url);
    } else if (typeof value === 'string' && value.includes(url)) {
      obj[key] = value.replace(url, '');
    } else {
      obj[key] = `${url}${value}`;
    }
  });
  return obj;
};

const API_MAPS: ApiMaps = {
  simple: '/simple', // after: https://api.domain.com/simple
  dictionary: {
    industry: '/dictionary/industry'
  }
};

export const apis = { ...FIXED_PARAM, ...urlHandle(API_MAPS, Endpoint) };
