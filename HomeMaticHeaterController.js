'use strict'

const url = require('url')
const Gateway = require('mediola-aio-gateway')
const HeaterController = require('dark-horse-thing/device/HeaterController')
const RawHomeMaticHeaterController = require('mediola-aio-gateway/HomeMaticHeaterController')

class HomeMaticHeaterController extends HeaterController {
  constructor (iri, type, deviceUrl, gateway) {
    super(iri, type)

    this._gateway = gateway || new Gateway(url.resolve(deviceUrl, '..'))
    this._device = new RawHomeMaticHeaterController(this._gateway, deviceUrl.split('/').pop())
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
