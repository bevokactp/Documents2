import Instrument, { FREQUENCY_MAIN, WindMixin } from './_instrument';

export class Trumpet extends WindMixin(Instrument) {
	constructor(name, width, height, length, materials, weight, colors, pipeCount) {
	  super(name, width, height, length, materials, weight, colors);
	  this.setPipeCount(pipeCount);
	}

	calculateFrequency() {
	  // Trumpet frequency based on pipe count
	  return FREQUENCY_MAIN * (this.pipeCount / 10); // Example calculation
	}
}
