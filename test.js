'use strict'

const Lab     = require('lab')
const Code    = require('code')

var tabular   = require('./')()

const lab = exports.lab = Lab.script()
const test = lab.test
const expect = Code.expect


test('should tabularize a simple object without specified options', (done) => {

  tabular.row({'a': 1, 'b': 'asd', 'c': new Date(1463587887203)}, (result) => {

    expect(result).to.equal('1,asd,1463587887203')
    done()

  })

})


test('should tabularize a simple object using defaults', (done) => {

  tabular = require('./')({})
  tabular.row({'a': 1, 'b': 'asd', 'c': new Date(1463587887203)}, (result) => {

    expect(result).to.equal('1,asd,1463587887203')
    done()

  })

})


test('should tabularize a simple object using isostring', (done) => {

  tabular = require('./')({
    datefmt: 'isostring'
  })

  tabular.row({'a': 1, 'b': 'asd', 'c': new Date(1463587887203)}, (result) => {

    expect(result).to.equal('1,asd,2016-05-18T16:11:27.203Z')
    done()

  })

})


test('should tabularize a simple object using a schema', (done) => {

  tabular = require('./')({
    datefmt: 'isostring',
    schema: ['a', 'c', 'b']
  })

  tabular.row({'a': 1, 'b': 'asd', 'c': new Date(1463587887203)}, (result) => {

    expect(result).to.equal('1,2016-05-18T16:11:27.203Z,asd')
    done()

  })

})


test('should handle undefined values during schema conversion with default', (done) => {

  tabular = require('./')({
    datefmt: 'isostring',
    schema: ['a', 'c', 'b', 'nothere']
  })

  tabular.row({'a': 1, 'b': 'asd', 'c': new Date(1463587887203)}, (result) => {

    expect(result).to.equal('1,2016-05-18T16:11:27.203Z,asd,')
    done()

  })

})


test('should handle undefined values during schema conversion with specified default', (done) => {

  tabular = require('./')({
    datefmt: 'isostring',
    schema: ['a', 'c', 'b', 'nothere'],
    undefinedrep: 'NOTSET'
  })

  tabular.row({'a': 1, 'b': 'asd', 'c': new Date(1463587887203)}, (result) => {

    expect(result).to.equal('1,2016-05-18T16:11:27.203Z,asd,NOTSET')
    done()

  })

})


test('should handle default even when badly specified', (done) => {

  tabular = require('./')({
    datefmt: 'isostring',
    schema: ['a', 'c', 'b', 'nothere'],
    undefinedrep: [1,2,3]
  })

  tabular.row({'a': 1, 'b': 'asd', 'c': new Date(1463587887203)}, (result) => {

    expect(result).to.equal('1,2016-05-18T16:11:27.203Z,asd,')
    done()

  })

})
