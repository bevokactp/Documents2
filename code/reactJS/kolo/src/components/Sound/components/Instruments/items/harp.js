import Instrument, { FREQUENCY_MAIN, PluckedMixin, StringMixin } from './_instrument';

export class Harp extends PluckedMixin(StringMixin(Instrument)) {
	constructor(name, width, height, length, materials, weight, stringCount) {
	  super(name, width, height, length, materials, weight);
	  this.setStringCount(stringCount);
	}

	calculateFrequency() {
	  // Harp frequency calculation based on string count and length
	  return FREQUENCY_MAIN / this.stringCount; // Example calculation
	}

	displayInfo() {
	  return `${super.displayInfo()}, String Count: ${this.stringCount}`;
	}
}
