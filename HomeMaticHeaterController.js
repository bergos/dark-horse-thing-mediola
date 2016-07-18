'use strict'

const url = require('url')
const Gateway = require('mediola-aio-gateway')
const HeaterController = require('dark-horse-thing/device/HeaterController')
const RawHomeMaticHeaterController = require('mediola-aio-gateway/HomeMaticHeaterController')

class HomeMaticHeaterController extends HeaterController {
  constructor (iri, config) {
    super(iri)

    this._gateway = new Gateway(url.resolve(config.endpoint, '..'))
    this._device = new RawHomeMaticHeaterController(this._gateway, config.endpoint.split('/').pop())
  }

  get () {
    return this._device.get().then((result) => {
      this.lowBatteryPower = result.lowBatteryPower
      this.desiredTemperature = result.desiredTemperature
      this.humidity = result.humidity
      this.temperature = result.temperature
      this.valve = result.valve

      return this
    })
  }
}

module.exports = HomeMaticHeaterController
