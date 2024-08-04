import Instrument, { FREQUENCY_MAIN, PercussionMixin } from './_instrument';

export class Cymbals extends PercussionMixin(Instrument) {
	constructor(name, width, height, length, materials, weight, colors, drumDiameter) {
	  super(name, width, height, length, materials, weight, colors);
	  this.setDrumDiameter(drumDiameter);
	}

	calculateFrequency() {
	  // Cymbals typically do not have a fixed frequency, but you might estimate it based on diameter
	  return FREQUENCY_MAIN * (this.drumDiameter / 10); // Example calculation
	}

	displayInfo() {
	  return `${super.displayInfo()}, Drum Diameter: ${this.drumDiameter}`;
	}
}
