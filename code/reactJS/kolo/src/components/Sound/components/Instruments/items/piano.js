import Instrument, { FREQUENCY_MAIN, PercussionMixin, KeyboardMixin } from './_instrument';

export class Piano extends KeyboardMixin(PercussionMixin(Instrument)) {
	constructor(name, width, height, length, materials, weight, colors, keyCount, drumDiameter) {
	  super(name, width, height, length, materials, weight, colors);
	  this.setKeyCount(keyCount);
	  this.setDrumDiameter(drumDiameter);
	  this.whiteKeys = 0;
	  this.blackKeys = 0;
	  this.grayKeys = 0;
	}

	getTotalCountKeys() {
	  return this.whiteKeys + this.blackKeys + this.grayKeys;
	}

	calculateFrequency() {
	  // Piano frequency calculation based on key count or other factors
	  return FREQUENCY_MAIN * (this.keyCount / 88); // Example calculation assuming 88 keys
	}

	displayInfo() {
	  return `${super.displayInfo()}, Key Count: ${this.getTotalCountKeys()}, Drum Diameter: ${this.drumDiameter}`;
	}
}
