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

  async get () {
    const result = await this._device.get()

    this.lowBatteryPower = result.lowBatteryPower
    this.desiredTemperature = result.desiredTemperature
    this.humidity = result.humidity
    this.temperature = result.temperature
    this.valve = result.valve

    return this
  }

  async put (input) {
    this.desiredTemperature = parseFloat(input.desiredTemperature)

    await this._device.put(this)

    return this.get()
  }
}

module.exports = HomeMaticHeaterController
