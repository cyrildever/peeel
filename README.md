# peeel
_Simple data footprint_

![GitHub tag (latest by date)](https://img.shields.io/github/v/tag/cyrildever/peeel)
![npm](https://img.shields.io/npm/dw/peeel)
![GitHub last commit](https://img.shields.io/github/last-commit/cyrildever/peeel)
![GitHub issues](https://img.shields.io/github/issues/cyrildever/peeel)
![NPM](https://img.shields.io/npm/l/peeel)

This is a TypeScript library for building a simple data footprint as a hash. It's working in both the browser and a NodeJS environment.

### Motivation

For anyone who needs to have consistent ways to compare data.


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

This library relies on the following peer dependencies:
* [`es-normalizer`](https://www.npmjs.com/package/es-normalizer).


### License

This module is distributed under a MIT license.
See the [LICENSE](LICENSE) file.


<hr />
&copy; 2020 Cyril Dever. All rights reserved.