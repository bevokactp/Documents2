
export const FREQUENCY_MAIN = 432;

export default class Instrument {
	constructor(name, width, height, length, materials, weight, colors) {
		this.name = name;
		this.width = width;
		this.height = height;
		this.length = length;
		this.materials = materials;
		this.weight = weight;
		this.colors = colors;
	}

	calculateFrequency() {
		throw new Error('calculateFrequency method should be implemented in derived classes');
	}

	getClassification() {
		return [];
	}

	calculateVolume() {
		// Check for diameter and height (for cylindrical shapes)
		if (this.diameter && this.height) {
			return Math.PI * Math.pow(this.diameter / 2, 2) * this.height;
		}
		// Check for length, width, and height (for rectangular shapes)
		else if (this.length && this.width && this.height) {
			return this.length * this.width * this.height;
		}
		// Return 0 if none of the conditions are met
		else {
			return 0;
		}
	}

	displayInfo() {
		return `Name: ${this.name}, Width: ${this.width}, Height: ${this.height}, Length: ${this.length}, Materials: ${this.materials.join(", ")}, Weight: ${this.weight}kg, Colors: ${this.colors.join(", ")}`;
	}
}


export const StringMixin = Base =>
	class extends Base {
		constructor(...args) {
			super(...args);
			this.stringCount = 0;
		}

		setStringCount(count) {
			this.stringCount = count;
		}

		getClassification() {
			return [...super.getClassification(), 'String'];
		}
	};

export const PluckedMixin = Base =>
	class extends Base {
		constructor(...args) {
			super(...args);
			this.plucked = true;
		}

		isPlucked() {
			return this.plucked;
		}

		getClassification() {
			return [...super.getClassification(), 'Plucked'];
		}
	};

export const PercussionMixin = Base =>
	class extends Base {
		constructor(...args) {
			super(...args);
			this.drumDiameter = 0;
		}

		setDrumDiameter(diameter) {
			this.drumDiameter = diameter;
		}

		getClassification() {
			return [...super.getClassification(), 'Percussion'];
		}
	};

export const KeyboardMixin = Base =>
	class extends Base {
		constructor(...args) {
			super(...args);
			this.keyCount = 0;
		}

		setKeyCount(count) {
			this.keyCount = count;
		}

		getKeyCount() {
			return this.keyCount;
		}

		getClassification() {
			return [...super.getClassification(), 'Keyboard'];
		}
	};

export const WindMixin = Base =>
	class extends Base {
		constructor(...args) {
			super(...args);
			this.pipeCount = 0;
		}

		setPipeCount(count) {
			this.pipeCount = count;

		}

		getPipeCount() {
			return this.pipeCount;
		}

		getClassification() {
			return [...super.getClassification(), 'Wind'];
		}
	};

export const WaterMixin = Base =>
	class extends Base {
		constructor(...args) {
			super(...args);
			this.waterVolume = 0; // Default water volume
		}

		setWaterVolume(volume) {
			this.waterVolume = volume;
		}

		getWaterVolume() {
			return this.waterVolume;
		}

		getClassification() {
			return [...super.getClassification(), 'Water'];
		}

		displayInfo() {
			// Ensure to call the parent displayInfo method and include water volume
			return `${super.displayInfo()}, Water Volume: ${this.waterVolume}`;
		}
	};
