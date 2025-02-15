export type Complementary = string

export const SEP_COMPLEMENTARY = '+'

// TODO Enrich with each new complementary data type
export const DATE_OF_BIRTH: Complementary = 'dob'
export const FIRST_NAME: Complementary = 'firstname'
export const GENDER: Complementary = 'gender'
export const LAST_NAME: Complementary = 'lastname'
export const MIDDLE_NAMES: Complementary = 'middle'

const availableComplementaries = [DATE_OF_BIRTH, FIRST_NAME, GENDER, LAST_NAME, MIDDLE_NAMES]

/**
 * Build the string representation of complementaries.
 * 
 * @param arr The array of complementary data types to use
 * @param keepAll If set to `true`, even unknown complementaries will be kept in the output result (default: `false`)
 * @return the string representation of complementaries
 */
export const complementariesToString = (arr: ReadonlyArray<Complementary>, keepAll?: boolean): string =>
  arr.map(c => {
    if (keepAll === true) {
      return c
    } else {
      if (availableComplementaries.includes(c)) {
        return c
      } else {
        return ''
      }
    }
  }).filter(_ => _ !== '')
    .join(SEP_COMPLEMENTARY)

/**
 * Parse the string representation of complementaries to its array of Complementary.
 * 
 * NB: It only keeps available complementaries.
 * 
 * @param compl The complementary string to parse, eg. `dob+firstname`
 * @returns the array of complementaries
 */
export const parseComplementaries = (compl: string): ReadonlyArray<Complementary> =>
  compl.split(SEP_COMPLEMENTARY).map(s => {
    if (availableComplementaries.includes(s)) {
      return s
    }
  }).filter(_ => _) as ReadonlyArray<Complementary> // eslint-disable-line @typescript-eslint/strict-boolean-expressions
