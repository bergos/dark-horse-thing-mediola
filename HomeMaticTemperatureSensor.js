'use strict'

const url = require('url')
const Gateway = require('mediola-aio-gateway')
const Thermometer = require('dark-horse-thing/device/Thermometer')
const RawHomeMaticTemperatureSensor = require('mediola-aio-gateway/HomeMaticTemperatureSensor')

class HomeMaticTemperatureSensor extends Thermometer {
  constructor (iri, type, deviceUrl, gateway) {
    super(iri, type)

    this._gateway = gateway || new Gateway(url.resolve(deviceUrl, '..'))
    this._device = new RawHomeMaticTemperatureSensor(this._gateway, deviceUrl.split('/').pop())
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
