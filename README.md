# Basic-Tabular
basic-tabular helps you pass between dictionary and CSV representations. It can be used to convert generic dictionaries using all the keys they contain or a schema can be applied to force basic-tabular to only insert selected keys with a specified order into the final representation.

```
tabular.row({'a': 1, 'b': 'asd', 'c': new Date(1463587887203)}, (result) => {

    console.log(result)

  })
```
produces the string:

```
'1,asd,1463587887203'
```

At the moment only 'epoch' and 'isostring' formats are supported for the Date() representation:

```
tabular = require('tabular')({
    datefmt: 'isostring'
  })

  tabular.row({'a': 1, 'b': 'asd', 'c': new Date(1463587887203)}, (result) => {

    console.log(result)

  })
```
```
=> '1,asd,2016-05-18T16:11:27.203Z'
```

Schemas can be applied to insert specific fields with a given order into the final representation:

```
tabular = require('tabular')({
    datefmt: 'isostring',
    schema: ['a', 'c', 'b', 'nothere']
  })

  tabular.row({'a': 1, 'b': 'asd', 'c': new Date(1463587887203)}, (result) => {

    console.log(result)

  })
```

This way, we have:
```
'1,2016-05-18T16:11:27.203Z,asd,'
```

**Note**: the schema contained an extra field that wasn't included into the dictionary, so basic-tabular inserted an empty string into the string representation.
This is the default behaviour and can be customized with the `undefinedrep` options:

```
tabular = require('tabular')({
    datefmt: 'isostring',
    schema: ['a', 'c', 'b', 'nothere'],
    undefinedrep: 'NOTSET'
  })
```
would have produced
```
'1,2016-05-18T16:11:27.203Z,asd,NOTSET'
```

## Options ##

* `datefmt`: specifies an output format for dates (currently `isostring` and `epoch` are supported). Epoch is used by default.
* `schema`: forces a schema on the output representation, missing keys on the source dictionary are treated as empty strings by default and can be customized via `undefinedrep` parameter. Keys not specified are not included into the final string; the order the keys are listed is used to build the string.
* `undefinedrep`: specifies a string to be used in case of missing keys.
