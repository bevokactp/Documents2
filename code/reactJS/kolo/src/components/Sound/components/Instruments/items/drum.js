
import Instrument, { FREQUENCY_MAIN, PercussionMixin } from './_instrument';

export class Drum extends PercussionMixin(Instrument) {
	constructor(name, width, height, length, materials, weight, colors, drumDiameter) {
	  super(name, width, height, length, materials, weight, colors);
	  this.setDrumDiameter(drumDiameter);
	}

	calculateFrequency() {
	  // Drum frequency calculation can be based on diameter or tension
	  return FREQUENCY_MAIN * (this.drumDiameter / 15); // Example calculation
	}

	displayInfo() {
	  return `${super.displayInfo()}, Drum Diameter: ${this.drumDiameter}`;
	}
}
