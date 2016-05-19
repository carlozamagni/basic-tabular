'use strict'

function tabular(opts){

  let datefmt
  let schema
  let notdefined = ''

  // date conversion function definition
  if(opts != null && 'datefmt' in opts){
    switch(opts.datefmt){

      case 'isostring':
        datefmt = function(d){ return d.toISOString() }
        break

      case 'epoch':
        datefmt = function(d){ return d.getTime().toString() }
        break

      default:
        datefmt = function(d){ return d.getTime().toString() }

    }

  }else{
    datefmt = function(d){ return d.getTime().toString() }
  }

  // schema definition
  if(opts != null && 'schema' in opts){
    schema = opts.schema
  }

  // default for undefined values
  if(opts != null &&
    'undefinedrep' in opts &&
    (typeof(opts.undefinedrep) === 'string')){
    notdefined = opts.undefinedrep
  }


  const methods = {
    row: (schema != null) ? schemaRow : schemalessRow
  }

  return methods

  function stringify(val){
    if(val instanceof Date){
      return datefmt(val)
    }

    return val.toString()
  }

  function schemaRow(obj, cb){

    const values = []

    for(var i=0; i<schema.length; i++){
      var current = obj[schema[i]]

      if(current == null){
        values.push(notdefined)
      }else{
        values.push(stringify(current))
      }
    }

    cb(values.join())
  }

  function schemalessRow(obj, cb){

    var values = Object.keys(obj).map((k) => {
      return stringify(obj[k])
    })

    cb(values.join())
  }

}

module.exports = tabular
