import { createHash } from 'crypto'

export class UrlShortenerService {
  private readonly alphabet =
    '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  private readonly base = this.alphabet.length

  private toBase62(buffer: Buffer, length = 6): string {
    let num = BigInt('0x' + buffer.toString('hex'))
    let code = ''

    while (code.length < length && num > 0) {
      const rem = num % BigInt(this.base)
      code = this.alphabet[Number(rem)] + code
      num = num / BigInt(this.base)
    }

    return code.padStart(length, this.alphabet[0])
  }

  public generateShortCode(originalUrl: string, length = 6): string {
    const hash = createHash('sha256').update(originalUrl).digest()
    return this.toBase62(hash, length)
  }
}
