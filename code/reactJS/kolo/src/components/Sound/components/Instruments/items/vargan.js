import Instrument, { FREQUENCY_MAIN, WindMixin } from './_instrument';

export class Vargan extends WindMixin(Instrument) {
	constructor(name, width, height, length, frequency, materials, weight, colors, pipeCount) {
	  super(name, width, height, length, frequency, materials, weight, colors);
	  this.setPipeCount(pipeCount);
	}

	calculateFrequency() {
	  // Vargan frequency based on pipe count
	  return FREQUENCY_MAIN / this.pipeCount; // Example calculation
	}
}
