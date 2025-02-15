import { customAlphabet } from 'nanoid/non-secure';

import { LOWERCASE, NUMBER, SYMBOL, UPPERCASE } from '../consts/char';

interface GeneratorOptions {
  /** 生成的字符串长度，默认为 11 */
  size?: number;
  /** 自定义字母表，默认使用数字 + 小写字母 + 大写字母 */
  alphabet?: string;
}

type NanoidGenerator = (size?: number) => string;

/**
 * ID 生成器
 * 基于 nanoid 实现的安全的随机字符串生成器
 */
class Generator {
  /** 默认字母表 */
  private static readonly DEFAULT_ALPHABET = NUMBER + LOWERCASE + UPPERCASE;
  /** 默认长度 */
  private static readonly DEFAULT_SIZE = 11;
  /** 主键长度 */
  static readonly PRIMARY_KEY_SIZE = Generator.DEFAULT_SIZE;
  /** 默认字母表长度 */
  static readonly DEFAULT_ALPHABET_LENGTH = Generator.DEFAULT_ALPHABET.length;

  /**
   * 创建一个自定义的生成器函数
   */
  private static createGenerator(options?: GeneratorOptions): NanoidGenerator {
    const alphabet = options?.alphabet ?? Generator.DEFAULT_ALPHABET;
    const defaultSize = options?.size ?? Generator.DEFAULT_SIZE;
    const generator = customAlphabet(alphabet);
    return (size?: number) => generator(size ?? defaultSize);
  }

  /**
   * 生成一个随机字符串
   */
  static string(options?: GeneratorOptions): string {
    return Generator.createGenerator(options)();
  }

  /**
   * 生成一个仅包含小写字母的随机字符串
   */
  static lowercase(size?: number): string {
    return Generator.createGenerator({ size, alphabet: LOWERCASE })();
  }

  /**
   * 生成一个仅包含大写字母的随机字符串
   */
  static uppercase(size?: number): string {
    return Generator.createGenerator({ size, alphabet: UPPERCASE })();
  }

  /**
   * 生成一个仅包含数字的随机字符串
   */
  static number(size?: number): string {
    return Generator.createGenerator({ size, alphabet: NUMBER })();
  }

  /**
   * 生成一个仅包含特殊符号的随机字符串
   */
  static symbol(size?: number): string {
    return Generator.createGenerator({ size, alphabet: SYMBOL })();
  }

  /**
   * 创建一个主键生成器
   */
  static primaryKey(size?: number): () => string {
    const generator = Generator.createGenerator({
      size: size ?? Generator.PRIMARY_KEY_SIZE,
      alphabet: Generator.DEFAULT_ALPHABET
    });
    return () => generator();
  }

  /**
   * 检查字符串是否符合主键格式
   */
  static isPrimaryKey(id: string): boolean {
    if (!id || id.length !== Generator.PRIMARY_KEY_SIZE) {
      return false;
    }

    // 检查所有字符是否都在字母表中
    const isValidChars = [...id].every(char => Generator.DEFAULT_ALPHABET.includes(char));

    // 检查熵是否足够
    const hasEnoughEntropy =
      Generator.DEFAULT_ALPHABET_LENGTH * Generator.PRIMARY_KEY_SIZE >= id.length * 4;

    return isValidChars && hasEnoughEntropy;
  }

  /**
   * 生成一个新的主键
   */
  static generatePrimaryKey(): string {
    return Generator.string({ size: Generator.PRIMARY_KEY_SIZE });
  }
}

export const nanoid = Generator;
export const Nanoid = Generator;
