import Instrument, { FREQUENCY_MAIN, PluckedMixin, StringMixin } from './_instrument';

export class Ukulele extends PluckedMixin(StringMixin(Instrument)) {
	constructor(name, width, height, length, materials, weight, colors, stringCount) {
	  super(name, width, height, length, materials, weight, colors);
	  this.setStringCount(stringCount);
	}

	calculateFrequency() {
	  // Ukulele frequency based on string count
	  return FREQUENCY_MAIN / this.stringCount; // Example calculation
	}
}
