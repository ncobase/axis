import { JSEncrypt } from 'jsencrypt';

/**
 * RSA utility class for encryption, decryption, signing, and verification
 */
interface RsaOptions {
  keySize?: '1024' | '2048' | '4096';
}

type DigestMethod = (str: string) => Promise<string>;

export class Rsa {
  private static instance: JSEncrypt | null = null;
  private static options: RsaOptions = {
    keySize: '2048'
  };

  /**
   * Lazy load JSEncrypt instance
   * @returns {JSEncrypt} The JSEncrypt instance
   */
  private static getInstance(): JSEncrypt {
    if (!Rsa.instance) {
      Rsa.instance = new JSEncrypt({ default_key_size: Rsa.options.keySize });
    }
    return Rsa.instance;
  }

  /**
   * Update RSA options and reset instance
   * @param {RsaOptions} options - The new options to set
   */
  static setOptions(options: RsaOptions): void {
    Rsa.options = { ...Rsa.options, ...options };
    Rsa.instance = null; // Reset instance
  }

  /**
   * Set the public key after validation
   * @param {string} publicKey - The public key in PEM format
   * @returns {boolean} True if the key was set successfully, false otherwise
   */
  static setPublicKey(publicKey: string): boolean {
    if (!publicKey || !Rsa.isValidPublicKey(publicKey)) {
      console.error('Invalid public key format');
      return false;
    }
    Rsa.getInstance().setPublicKey(publicKey);
    return true;
  }

  /**
   * Set the private key after validation
   * @param {string} privateKey - The private key in PEM format
   * @returns {boolean} True if the key was set successfully, false otherwise
   */
  static setPrivateKey(privateKey: string): boolean {
    if (!privateKey || !Rsa.isValidPrivateKey(privateKey)) {
      console.error('Invalid private key format');
      return false;
    }
    Rsa.getInstance().setPrivateKey(privateKey);
    return true;
  }

  /**
   * Get the current public key
   * @returns {string | false} The public key or false if not set
   */
  static getPublicKey(): string | false {
    const publicKey = Rsa.getInstance().getPublicKey();
    return publicKey || false;
  }

  /**
   * Get the current private key
   * @returns {string | false} The private key or false if not set
   */
  static getPrivateKey(): string | false {
    const privateKey = Rsa.getInstance().getPrivateKey();
    return privateKey || false;
  }

  /**
   * Validate public key format
   * @param {string} key - The public key to validate
   * @returns {boolean} True if the key is valid, false otherwise
   */
  static isValidPublicKey(key: string): boolean {
    const pemRegex =
      /^-----BEGIN PUBLIC KEY-----\r?\n([A-Za-z0-9+/=\r\n]+)\r?\n-----END PUBLIC KEY-----$/;
    return pemRegex.test(key.trim());
  }

  /**
   * Validate private key format
   * @param {string} key - The private key to validate
   * @returns {boolean} True if the key is valid, false otherwise
   */
  static isValidPrivateKey(key: string): boolean {
    const pemRegex =
      /^-----BEGIN (RSA )?PRIVATE KEY-----\r?\n([A-Za-z0-9+/=\r\n]+)\r?\n-----END (RSA )?PRIVATE KEY-----$/;
    return pemRegex.test(key.trim());
  }

  /**
   * Encrypt data using the public key
   * @param {string | object} data - The data to encrypt
   * @returns {string | false} The encrypted data or false if encryption failed
   */
  static encrypt(data: string | object): string | false {
    const instance = Rsa.getInstance();
    if (!instance.getPublicKey()) {
      console.error('Public key is not set');
      return false;
    }
    const stringData = typeof data === 'string' ? data : JSON.stringify(data);
    const encrypted = instance.encrypt(stringData);
    if (!encrypted) {
      console.error('Encryption failed');
      return false;
    }
    return encrypted;
  }

  /**
   * Decrypt data using the private key
   * @param {string} data - The data to decrypt
   * @returns {string | false} The decrypted data or false if decryption failed
   */
  static decrypt(data: string): string | false {
    const instance = Rsa.getInstance();
    if (!instance.getPrivateKey()) {
      console.error('Private key is not set');
      return false;
    }
    const decrypted = instance.decrypt(data);
    if (!decrypted) {
      console.error('Decryption failed');
      return false;
    }
    return decrypted;
  }

  /**
   * Sign data using the private key
   * @param {string} str - The data to sign
   * @param {DigestMethod} digestMethod - The digest method to use
   * @param {string} digestName - The name of the digest algorithm
   * @returns {Promise<string | false>} The signature or false if signing failed
   */
  static async sign(
    str: string,
    digestMethod: DigestMethod = Rsa.sha256,
    digestName: string = 'SHA-256'
  ): Promise<string | false> {
    const instance = Rsa.getInstance();
    if (!instance.getPrivateKey()) {
      console.error('Private key is not set');
      return false;
    }
    try {
      const digest = await digestMethod(str);
      const signature = instance.sign(digest, (str: string) => str, digestName);
      if (!signature) {
        console.error('Signing failed');
        return false;
      }
      return signature;
    } catch (error) {
      console.error('Error during signing', error);
      return false;
    }
  }

  /**
   * Verify signature using the public key
   * @param {string} str - The original data
   * @param {string} signature - The signature to verify
   * @param {DigestMethod} digestMethod - The digest method to use
   * @returns {Promise<boolean>} True if the signature is valid, false otherwise
   */
  static async verify(
    str: string,
    signature: string,
    digestMethod: DigestMethod = Rsa.sha256
  ): Promise<boolean> {
    const instance = Rsa.getInstance();
    if (!instance.getPublicKey()) {
      console.error('Public key is not set');
      return false;
    }
    try {
      const digest = await digestMethod(str);
      const isValid = instance.verify(digest, signature, (str: string) => str);
      return isValid;
    } catch (error) {
      console.error('Error during verification', error);
      return false;
    }
  }

  /**
   * Generate a new key pair
   * @param {RsaOptions['keySize']} [keySize] - The key size to use for generation. If not provided, uses the default from options.
   * @returns {{ publicKey: string; privateKey: string } | false} The generated key pair or false if generation failed
   */
  static generateKeyPair(
    keySize: RsaOptions['keySize'] = Rsa.options.keySize
  ): { publicKey: string; privateKey: string } | false {
    const instance = new JSEncrypt({ default_key_size: keySize });
    const publicKey = instance.getPublicKey();
    const privateKey = instance.getPrivateKey();
    if (!publicKey || !privateKey) {
      console.error('Key pair generation failed');
      return false;
    }
    return { publicKey, privateKey };
  }

  /**
   * Utility function to create a SHA-256 hash
   * @param {string} str - The string to hash
   * @returns {Promise<string>} The hashed string
   */
  private static async sha256(str: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(str);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }
}
