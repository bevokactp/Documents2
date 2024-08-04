import Instrument, { FREQUENCY_MAIN, PercussionMixin } from './_instrument';

export class Hang extends PercussionMixin(Instrument) {
	constructor(name, width, height, length, materials, weight, drumDiameter) {
	  super(name, width, height, length, materials, weight);
	  this.setDrumDiameter(drumDiameter);
	}

	calculateFrequency() {
	  // Hang frequency can be estimated based on drum diameter
	  return FREQUENCY_MAIN * (this.drumDiameter / 20); // Example calculation
	}

	displayInfo() {
	  return `${super.displayInfo()}, Drum Diameter: ${this.drumDiameter}`;
	}
}
