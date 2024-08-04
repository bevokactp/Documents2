import Instrument, { FREQUENCY_MAIN, WindMixin } from './_instrument';

export class Flute extends WindMixin(Instrument) {
	constructor(name, width, height, length, materials, weight, colors, type, pipeCount) {
	  super(name, width, height, length, materials, weight, colors);
	  this.setPipeCount(pipeCount);
	  this.type = type; // pan, simple
	}

	calculateFrequency() {
	  // Flute frequency can be estimated based on pipe length
	  return FREQUENCY_MAIN / this.pipeCount; // Example calculation
	}

	displayInfo() {
	  return `${super.displayInfo()}, Type: ${this.type}, Pipe Count: ${this.pipeCount}`;
	}
}
