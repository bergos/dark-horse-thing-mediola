'use strict'

const url = require('url')
const Gateway = require('mediola-aio-gateway')
const PowerSocket = require('dark-horse-thing/device/PowerSocket')
const RawElroPowerSocket = require('mediola-aio-gateway/ElroPowerSocket')

class ElroPowerSocket extends PowerSocket {
  constructor (iri, config) {
    super(iri, {type: config.type})

    this._gateway = new Gateway(url.resolve(config.endpoint, '..'))
    this._device = new RawElroPowerSocket(this._gateway, config.endpoint.split('/').pop())
  }

  put (input) {
    super.put(input)

    return this._device.put(input)
  }
}

module.exports = ElroPowerSocket
