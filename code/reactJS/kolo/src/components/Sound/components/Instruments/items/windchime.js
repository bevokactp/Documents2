import Instrument, { FREQUENCY_MAIN, PercussionMixin, WindMixin } from './_instrument';

export class WindChime extends PercussionMixin(WindMixin(Instrument)) {
	constructor(name, width, height, length, materials, weight, colors, drumDiameter, pipeCount) {
	  super(name, width, height, length, materials, weight, colors);
	  this.setDrumDiameter(drumDiameter);
	  this.setPipeCount(pipeCount);
	}

	calculateFrequency() {
	  // WindChime frequency based on diameter and pipe count
	  return FREQUENCY_MAIN * (this.drumDiameter / 20 + this.pipeCount / 10); // Example calculation
	}

	displayInfo() {
	  return `${super.displayInfo()}, Drum Diameter: ${this.drumDiameter}, Pipe Count: ${this.pipeCount}`;
	}
}
