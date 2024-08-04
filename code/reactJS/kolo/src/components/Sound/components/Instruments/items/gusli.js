import Instrument, { FREQUENCY_MAIN, StringMixin, PluckedMixin } from './_instrument';


export class Gusli extends StringMixin(PluckedMixin(Instrument)) {
	constructor(name, width, height, length, materials, weight, colors, stringCount, shape) {
	  super(name, width, height, length, materials, weight, colors);
	  this.setStringCount(stringCount);
	  this.shape = shape; // форма гуслей
	}

	calculateFrequency() {
	  // Gusli frequency calculation could be based on string count and length
	  return FREQUENCY_MAIN / this.stringCount; // Example calculation
	}

	displayInfo() {
	  return `${super.displayInfo()}, String Count: ${this.stringCount}, Shape: ${this.shape}`;
	}
}
