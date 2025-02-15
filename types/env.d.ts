/**
 * 主机环境变量配置
 */
export interface HostVariables {
  /** 主机地址 */
  readonly HOST: string;
  /** 端口号 */
  readonly PORT: string;
  /** 路径 */
  readonly PATH: string;
}

/** 环境类型 */
export type Environment = 'production' | 'development' | 'test';

/** 环境配置映射 */
export interface EnvironmentConfig {
  [key: string]: HostVariables;
}
