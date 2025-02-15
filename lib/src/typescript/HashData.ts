import * as esNormalizer from 'es-normalizer'

import { Complementary, DATE_OF_BIRTH, FIRST_NAME, GENDER, LAST_NAME, MIDDLE_NAMES } from './Complementary'
import { hash } from '.'

// The Peeel algorithm is used to create a unique string from complementary data
// (like the `hashData` field for the Controllers in the Fruuut and Rooot systems).
//
// It follows the rules below:
// - each source data must first be normalized according to the Empreinte Sociométrique's standards;
// - the normalized data should then be hashed using the SHA-256 algorithm applied twice;
// - the hashed data should then be concatenated in the exact order of the complementaries' code
//   (eg. hashed date of birth then hashed firstname for `dob+firstname`);
// - this concatenation should itself be hashed using the SHA-256 algorithm twice to form the final hash data.
//
// The result passed to the `hashData` field should be the hexadecimal string representation of the returned hash data.

export type HashData = string

export interface Source {
  data: string
  complementary: Complementary
}

/**
 * Takes an array of source data and returns the `hashData` value as well as the complementaries sequence.
 * 
 * IMPORTANT: any date must be provided in the ISO format, ie. `YYYYMMDD` (eg. "20200923").
 * 
 * @param {ReadonlyArray<Source>} src The sequence of source data to use
 * @returns the tuple (hashData, complementaries)
 * @throws {NoValidDataError}
 */
export const build = (src: ReadonlyArray<Source>): [HashData, ReadonlyArray<Complementary>] => {
  const compl = new Array<Complementary>()

  // 1- Normalize each source
  const normalized = src.map(s => {
    let norm = ''
    switch (s.complementary) { // TODO Enrich with new complementary data types
      case DATE_OF_BIRTH:
        norm = esNormalizer.normalize(s.data, esNormalizer.DateOfBirth()).getOrElse('')
        break
      case FIRST_NAME:
        norm = esNormalizer.normalize(s.data, esNormalizer.FirstName).getOrElse('')
        break
      case GENDER:
        norm = esNormalizer.normalize(s.data, esNormalizer.Title).getOrElse('')
        break
      case LAST_NAME:
        norm = esNormalizer.normalize(s.data, esNormalizer.Any).getOrElse('')
        break
      case MIDDLE_NAMES:
        norm = esNormalizer.normalize(s.data, esNormalizer.Any).getOrElse('')
        break
    }
    if (norm !== '') {
      compl.push(s.complementary)
    }
    return norm
  }).filter(_ => _) as ReadonlyArray<string> // eslint-disable-line @typescript-eslint/strict-boolean-expressions

  if (normalized.length === 0) {
    throw new NoValidDataError()
  }

  // 2- Hash each normalized data
  const hashedData = normalized.map(norm => hash(Buffer.from(norm)))

  // 3- Hash the concatenation of normalized hashed data
  const hashed = hash(Buffer.concat(hashedData))

  return [hashed.toString('hex'), compl]
}

export class NoValidDataError extends Error {
  constructor() {
    super('no valid data')
    Object.setPrototypeOf(this, NoValidDataError.prototype)
  }
}
