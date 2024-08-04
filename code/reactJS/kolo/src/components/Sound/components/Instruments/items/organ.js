import Instrument, { FREQUENCY_MAIN, WindMixin, WaterMixin } from './_instrument';

export class Organ extends WindMixin(WaterMixin(Instrument)) {
	constructor(name, width, height, length, materials, weight, colors, pipeCount, waterVolume, type) {
	  super(name, width, height, length, materials, weight, colors);
	  this.setPipeCount(pipeCount);
	  this.setWaterVolume(waterVolume);
	  this.type = type; // "hydraulic" or "pneumatic"
	}

	calculateFrequency() {
	  // Organ frequency calculation based on type and pipe count
	  return (this.type === "hydraulic" ? FREQUENCY_MAIN * 1.2 : FREQUENCY_MAIN) / this.pipeCount; // Example calculation
	}

	displayInfo() {
	  return `${super.displayInfo()}, Pipe Count: ${this.pipeCount}, Water Volume: ${this.waterVolume}, Type: ${this.type}`;
	}
}
