import {
  build, complementariesToString, Complementary, DATE_OF_BIRTH, FIRST_NAME, hash, parseComplementaries, Source
} from '../../../lib/src/typescript/index'

describe('HashData', () => {
  describe('build', () => {
    const expected = '29023e05a28a9aa04eb286c4fb6499ebee23409a6a808d4e164e62270de0e9a2'
    it('should build the correct hashData string', () => {
      const firstname: Source = {
        data: 'Cyril',
        complementary: FIRST_NAME
      }
      const dob: Source = {
        data: '19690918',
        complementary: DATE_OF_BIRTH
      }
      const [found, _] = build([firstname, dob]) // eslint-disable-line @typescript-eslint/no-unused-vars
      found.should.equal(expected)
    })
    it('should be deterministic', () => {
      const hashedNormFirstname = hash(Buffer.from('CYRIL'))
      const hashedNormDateOfBirth = hash(Buffer.from('18/09/1969'))
      const rebuilt = hash(Buffer.concat([hashedNormFirstname, hashedNormDateOfBirth]))
      rebuilt.toString('hex').should.equal(expected)
    })
  })
})
describe('Complementary', () => {
  describe('complementariesToString', () => {
    it('should build the right string representation of complementaries', () => {
      const expected = 'dob+firstname'
      const arr: ReadonlyArray<Complementary> = ['dob', 'firstname']
      const found = complementariesToString(arr)
      found.should.equal(expected)
    })
    it('should not keep unknown complementaries unless specified', () => {
      const expected = 'dob+firstname'
      const arr1: ReadonlyArray<Complementary> = ['dob', 'firstname', 'not a valid complementary']
      let found = complementariesToString(arr1)
      found.should.equal(expected)

      const allKept = 'dob+firstname+kept'
      const arr2: ReadonlyArray<Complementary> = ['dob', 'firstname', 'kept']
      found = complementariesToString(arr2, true)
      found.should.equal(allKept)
    })
  })
  describe('parseComplementaries', () => {
    it('should parse a string to the appropriate array of complementary data types', () => {
      const expected: ReadonlyArray<Complementary> = ['dob', 'firstname']
      const str = 'dob+firstname'
      const found = parseComplementaries(str)
      found.should.eqls(expected)
    })
    it('should only keep valid complementaries', () => {
      const str = 'not-a-compl'
      const found = parseComplementaries(str)
      found.should.be.empty
    })
  })
})
