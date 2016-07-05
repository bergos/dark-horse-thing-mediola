'use strict'

const url = require('url')
const Gateway = require('mediola-aio-gateway')
const PowerSocket = require('dark-horse-thing/device/PowerSocket')
const RawElroPowerSocket = require('mediola-aio-gateway/ElroPowerSocket')

class ElroPowerSocket extends PowerSocket {
  constructor (iri, type, deviceUrl, gateway) {
    super(iri, type)

    this._gateway = gateway || new Gateway(url.resolve(deviceUrl, '..'))
    this._device = new RawElroPowerSocket(this._gateway, deviceUrl.split('/').pop())
  }

  put (input) {
    super.put(input)

    let json = {
      state: input.state.iri().toString()
    }

    return this._device.put(json)
  }
}

module.exports = ElroPowerSocket
