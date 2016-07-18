'use strict'

const context = require('dark-horse-thing/context')
const url = require('url')
const Gateway = require('mediola-aio-gateway')
const Thing = require('dark-horse-thing/Thing')
const RawHomeMaticTemperatureSensor = require('mediola-aio-gateway/HomeMaticTemperatureSensor')

class HomeMaticTemperatureSensor extends Thing {
  constructor (iri, config) {
    super(iri, {type: [context.Hygrometer, context.Thermometer]})

    this._gateway = new Gateway(url.resolve(config.endpoint, '..'))
    this._device = new RawHomeMaticTemperatureSensor(this._gateway, config.endpoint.split('/').pop())
  }

  get () {
    return this._device.get().then((result) => {
      this.lowBatteryPower = result.lowBatteryPower
      this.humidity = result.humidity
      this.temperature = result.temperature

      return this
    })
  }
}

module.exports = HomeMaticTemperatureSensor
