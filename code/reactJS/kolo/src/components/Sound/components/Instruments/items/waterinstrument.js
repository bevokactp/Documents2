import Instrument, {FREQUENCY_MAIN, WaterMixin } from './_instrument';

export class WaterInstrument extends WaterMixin(Instrument) {
	constructor(name, width, height, length, frequency, materials, weight, waterVolume) {
	  super(name, width, height, length, frequency, materials, weight);
	  this.setWaterVolume(waterVolume);
	}

	calculateFrequency() {
	  // WaterInstrument frequency might be based on water volume
	  return FREQUENCY_MAIN * (this.waterVolume / 1000); // Example calculation
	}
}
