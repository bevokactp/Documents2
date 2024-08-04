import Instrument, { FREQUENCY_MAIN, PluckedMixin } from './_instrument';

export class Kalimba extends PluckedMixin(Instrument) {
	constructor(name, width, height, length, materials, weight, colors) {
	  super(name, width, height, length, materials, weight, colors);
	}

	calculateFrequency() {
	  // Kalimba frequency might be based on string count or size
	  return FREQUENCY_MAIN / 10; // Example calculation
	}
}
