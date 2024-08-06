

// Функции склонения для разных падежей
const declineNominative = (word) => word; // Пример для Именительного падежа
const declineGenitive = (word) => word + 'а'; // Пример для Родительного падежа
const declineDative = (word) => word + 'у'; // Пример для Дательного падежа
const declineAccusative = (word) => word + 'у'; // Пример для Винительного падежа
const declineInstrumental = (word) => word + 'ом'; // Пример для Творительного падежа
const declinePrepositional = (word) => 'о ' + word; // Пример для Предложного падежа
const declineVocative = (word) => word; // Пример для Звательного падежа (в русском языке не всегда используется отдельно)
const declineLocative = (word) => 'в ' + word; // Пример для Локатив (используется в некоторых языках, в русском не употребляется)
const declineAblative = (word) => 'из ' + word; // Пример для Аблатив
const declineAllative = (word) => 'в ' + word; // Пример для Алатив
const declineElative = (word) => 'из ' + word; // Пример для Элатив
const declineIllative = (word) => 'в ' + word; // Пример для Иллатив
const declineTerminative = (word) => 'до ' + word; // Пример для Терминатив
const declineEssive = (word) => 'в качестве ' + word; // Пример для Эссив


export const casesData = {
	nominative: {
		name: 'Именительный',
		questions: ['кто?', 'что?'],
		declineFunction: declineNominative
	},
	genitive: {
		name: 'Родительный',
		questions: ['кого?', 'чего?'],
		declineFunction: declineGenitive
	},
	dative: {
		name: 'Дательный',
		questions: ['кому?', 'чему?'],
		declineFunction: declineDative
	},
	accusative: {
		name: 'Винительный',
		questions: ['кого?', 'что?'],
		declineFunction: declineAccusative
	},
	instrumental: {
		name: 'Творительный',
		questions: ['кем?', 'чем?'],
		declineFunction: declineInstrumental
	},
	prepositional: {
		name: 'Предложный',
		questions: ['о ком?', 'о чём?'],
		declineFunction: declinePrepositional
	},
	vocative: {
		name: 'Звательный',
		questions: ['обращение'],
		declineFunction: declineVocative
	},
	locative: {
		name: 'Локатив',
		questions: ['где?'],
		declineFunction: declineLocative
	},
	ablative: {
		name: 'Аблатив',
		questions: ['откуда?', 'с кого?', 'с чего?'],
		declineFunction: declineAblative
	},
	allative: {
		name: 'Алатив',
		questions: ['к чему?', 'куда?'],
		declineFunction: declineAllative
	},
	elative: {
		name: 'Элатив',
		questions: ['из чего?'],
		declineFunction: declineElative
	},
	illative: {
		name: 'Иллатив',
		questions: ['во что?', 'куда?'],
		declineFunction: declineIllative
	},
	terminative: {
		name: 'Терминатив',
		questions: ['до чего?'],
		declineFunction: declineTerminative
	},
	essive: {
		name: 'Эссив',
		questions: ['в качестве кого/чего?', 'кем/чем?'],
		declineFunction: declineEssive
	}
};


export class Case {
	constructor(name, questions, declineFunction) {
		this.name = name;
		this.questions = questions;
		this.declineFunction = declineFunction;
	}

	decline(word) {
		return this.declineFunction(word);
	}
}


export class Cases {
	constructor() {
		this.cases = {};
		for (const caseData of Object.values(casesData)) {
			this.cases[caseData.name] = new Case(caseData.name, caseData.questions, caseData.declineFunction);
		}
	}

	getNumberOfCases() {
		return Object.keys(this.cases).length;
	}

	getCase(name) {
		return this.cases[name];
	}
}
