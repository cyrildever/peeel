export type Complementary = string

export const SEP_COMPLEMENTARY = '+'

// TODO Enrich with new complementary data types
export const DATE_OF_BIRTH: Complementary = 'dob'
export const FIRST_NAME: Complementary = 'firstname'
export const LAST_NAME: Complementary = 'lastname'

const availableComplementaries = [DATE_OF_BIRTH, FIRST_NAME, LAST_NAME]

/**
 * Build the string representation of complementaries
 * 
 * @param arr The array of complementary data types to use
 * @return the string representation of complementaries
 */
export const complementariesToString = (arr: ReadonlyArray<Complementary>): string =>
  arr.join(SEP_COMPLEMENTARY)

/**
 * Parse the string representation of complementaries to its array of Complementary
 * 
 * @param compl The complementary string to parse, eg. `dob+firstname`
 * @returns the array of complementaries
 */
export const parseComplementaries = (compl: string): ReadonlyArray<Complementary> =>
  compl.split(SEP_COMPLEMENTARY).map(s => {
    if (availableComplementaries.includes(s)) {
      return s
    }
  }).filter(_ => _) as ReadonlyArray<Complementary>
