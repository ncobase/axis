import { customAlphabet } from 'nanoid/non-secure';

import { LOWERCASE, NUMBER, SYMBOL, UPPERCASE } from '../consts/char';

interface GeneratorOptions {
  /** String length to generate, defaults to 11 */
  size?: number;
  /** Custom alphabet, defaults to numbers + lowercase + uppercase letters */
  alphabet?: string;
}

// eslint-disable-next-line no-unused-vars
type NanoidGenerator = (size?: number) => string;

/**
 * ID Generator
 * A secure random string generator based on nanoid
 */
class Generator {
  /** Default alphabet */
  private static readonly DEFAULT_ALPHABET = NUMBER + LOWERCASE + UPPERCASE;
  /** Default size */
  private static readonly DEFAULT_SIZE = 11;
  /** Primary key size */
  static readonly PRIMARY_KEY_SIZE = Generator.DEFAULT_SIZE;
  /** Default alphabet length */
  static readonly DEFAULT_ALPHABET_LENGTH = Generator.DEFAULT_ALPHABET.length;

  /**
   * Create a custom generator function
   */
  private static createGenerator(options?: GeneratorOptions): NanoidGenerator {
    const alphabet = options?.alphabet ?? Generator.DEFAULT_ALPHABET;
    const defaultSize = options?.size ?? Generator.DEFAULT_SIZE;
    const generator = customAlphabet(alphabet);
    return (size?: number) => generator(size ?? defaultSize);
  }

  /**
   * Generate a random string
   */
  static string(options?: GeneratorOptions): string {
    return Generator.createGenerator(options)();
  }

  /**
   * Generate a random string containing only lowercase letters
   */
  static lowercase(size?: number): string {
    return Generator.createGenerator({ size, alphabet: LOWERCASE })();
  }

  /**
   * Generate a random string containing only uppercase letters
   */
  static uppercase(size?: number): string {
    return Generator.createGenerator({ size, alphabet: UPPERCASE })();
  }

  /**
   * Generate a random string containing only numbers
   */
  static number(size?: number): string {
    return Generator.createGenerator({ size, alphabet: NUMBER })();
  }

  /**
   * Generate a random string containing only special symbols
   */
  static symbol(size?: number): string {
    return Generator.createGenerator({ size, alphabet: SYMBOL })();
  }

  /**
   * Create a primary key generator
   */
  static primaryKey(size?: number): () => string {
    const generator = Generator.createGenerator({
      size: size ?? Generator.PRIMARY_KEY_SIZE,
      alphabet: Generator.DEFAULT_ALPHABET
    });
    return () => generator();
  }

  /**
   * Check if a string matches primary key format
   */
  static isPrimaryKey(id: string): boolean {
    if (!id || id.length !== Generator.PRIMARY_KEY_SIZE) {
      return false;
    }

    // Check if all characters are in the alphabet
    const isValidChars = [...id].every(char => Generator.DEFAULT_ALPHABET.includes(char));

    // Check if entropy is sufficient
    const hasEnoughEntropy =
      Generator.DEFAULT_ALPHABET_LENGTH * Generator.PRIMARY_KEY_SIZE >= id.length * 4;

    return isValidChars && hasEnoughEntropy;
  }

  /**
   * Generate a new primary key
   */
  static generatePrimaryKey(): string {
    return Generator.string({ size: Generator.PRIMARY_KEY_SIZE });
  }
}

export const nanoid = Generator;
export const Nanoid = Generator;
