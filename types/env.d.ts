/**
 * Host environment variable configuration
 */
export interface HostVariables {
  /** Host address */
  readonly HOST: string;
  /** Port number */
  readonly PORT: string;
  /** Path */
  readonly PATH: string;
}

/** Environment type */
export type Environment = 'production' | 'development' | 'test';

/** Environment configuration mapping */
export interface EnvironmentConfig {
  [key: string]: HostVariables;
}
