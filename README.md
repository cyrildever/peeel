# peeel
_Compact identity footprint_

![GitHub tag (latest by date)](https://img.shields.io/github/v/tag/cyrildever/peeel)
![npm](https://img.shields.io/npm/dw/peeel)
![GitHub last commit](https://img.shields.io/github/last-commit/cyrildever/peeel)
![GitHub issues](https://img.shields.io/github/issues/cyrildever/peeel)
![NPM](https://img.shields.io/npm/l/peeel)

This is a TypeScript library for building a simple contact data footprint as a hash. It's working in both the browser and a NodeJS environment.

### Motivation

For anyone who needs to have consistent ways to compare identity data.

### Description

The Peeel&trade; algorithm is used to create a unique string from complementary data of a contact data (like in the `hashData` field of the *Controllers* in the Fruuut&trade; and Rooot&trade; systems).

It follows the rules below:
- each source data must first be normalized according to the Empreinte Sociométrique's standards;
- the normalized data should then be hashed using the SHA-256 algorithm applied twice;
- the hashed data should then be concatenated in the exact order of the complementaries' code (eg. hashed date of birth then hashed firstname for `dob+firstname`);
- this concatenation should itself be hashed using the SHA-256 algorithm twice to form the final hash data.

The result passed to the `hashData` field is the hexadecimal string representation of the returned hash.

As of this version, the available complementary data are the following:
- `dob`: a date of birth (respecting the ISO format, ie. `YYYYMMDD`);
- `gender`: `1` for male, `2` for female, or `0` for unknown;
- `firstname`: a first name;
- `lastname`: a last name;
- `middle`: the middle names or initials (eg. the `F.` in `John F. Kennedy`).

For further details, you might want to check our [white paper](documentation/src/latex/peeel_whitepaper.pdf).


### Usage

```
npm i peeel
```

```typescript
import { build, complementariesToString, FIRST_NAME, LAST_NAME, parseComplementaries, Source } from 'peeel'

const firstname: Source = {
  data: 'John',
  complementary: FIRST_NAME
}
const dob: Source = {
  data: '20000101',
  complementary: DATE_OF_BIRTH
}
const [hashData, compl] = build([firstname, dob])

// ae76d56055a9acb1fddde77074dcf5353724cb0f6bcb64110f698b19c34be32b
console.log(hashData)

const complStr = complementariesToString(compl)
// firstname+dob
console.log(complStr)

const complementaries = parseComplementaries(complStr)
console.assert(complementaries === compl)
```

##### Dependencies

This library relies on the following peer dependency:
* [`es-normalizer`](https://www.npmjs.com/package/es-normalizer).

Besides, to run the tests, you would need to install [`live-server`|(https://www.npmjs.com/package/live-server):
```console
npm i -g live-server
```


### License

This module is distributed under a MIT license.
See the [LICENSE](LICENSE) file.


<hr />
&copy; 2020-2021 Cyril Dever. All rights reserved.