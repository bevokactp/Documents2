export const partsData = {
	noun: {
		name: 'Существительное',
		description: 'обозначаетъ предмет или явление',
		types: {
			animate: {
				name: 'Одушевлённые',
				description: 'обозначающие живых существ',
				questions: ['кто?'],
				examples: ['человек', 'собака']
			},
			inanimate: {
				name: 'Неодушевлённые',
				description: 'обозначающие неживые предметы',
				questions: ['что?'],
				examples: ['дерево', 'стол']
			},
			proper: {
				name: 'Собственные',
				description: 'обозначающие уникальные объекты или имена',
				questions: ['кто?'],
				examples: ['Москва', 'Пётр']
			},
			common: {
				name: 'Нарицательные',
				description: 'обозначающие общие понятия или классы объектов',
				questions: ['что?'],
				examples: ['город', 'студент']
			},
			abstract: {
				name: 'Абстрактные',
				description: 'обозначающие нематериальные понятия',
				questions: ['что?'],
				examples: ['любовь', 'счастье']
			},
			collective: {
				name: 'Собирательные',
				description: 'обозначающие группы предметов или людей',
				questions: ['что?'],
				examples: ['детвора', 'листва']
			},
			concrete: {
				name: 'Конкретные',
				description: 'обозначающие предметы, имеющие физическое существование',
				questions: ['что?'],
				examples: ['стол', 'стул']
			},
			material: {
				name: 'Вещественные',
				description: 'обозначающие вещества или материалы',
				questions: ['что?'],
				examples: ['сахар', 'вода']
			}
		}
	},
	adjective: {
		name: 'Прилагательное',
		description: 'обозначаетъ признак предмета',
		types: {
			qualitative: {
				name: 'Качественные',
				description: 'описывающие внутренние свойства предмета',
				questions: ['какой?'],
				examples: ['красивый', 'умный']
			},
			relative: {
				name: 'Относительные',
				description: 'указывающие на отношение к другому предмету',
				questions: ['какой?'],
				examples: ['деревянный', 'осенний']
			},
			possessive: {
				name: 'Притяжательные',
				description: 'показывающие принадлежность предмета',
				questions: ['чей?'],
				examples: ['материн', 'волчий']
			}
		}
	},
	numeral: {
		name: 'Числительное',
		description: 'обозначаетъ количество или порядок',
		types: {
			quantitative: {
				name: 'Количественные',
				description: 'обозначающие количество предметов',
				questions: ['сколько?'],
				examples: ['три', 'пять']
			},
			ordinal: {
				name: 'Порядковые',
				description: 'обозначающие порядок предметов',
				questions: ['который по счету?'],
				examples: ['первый', 'десятый']
			},
			fractional: {
				name: 'Дробные',
				description: 'обозначающие части целого',
				questions: ['сколько?'],
				examples: ['половина', 'треть']
			},
			collective: {
				name: 'Коллективные',
				description: 'обозначающие количество предметов, рассматриваемых как группа',
				questions: ['сколько?'],
				examples: ['двое', 'трое']
			}
		}
	},
	pronoun: {
		name: 'Местоимение',
		description: 'заменяющая существительное',
		types: {
			personal: {
				name: 'Личные',
				description: 'указывающие на конкретного человека или предмет',
				questions: ['кто?', 'что?'],
				examples: ['я', 'ты', 'он']
			},
			reflexive: {
				name: 'Возвратные',
				description: 'указывающие на действие, возвращающееся к субъекту',
				questions: ['кого?'],
				examples: ['себя']
			},
			possessive: {
				name: 'Притяжательные',
				description: 'показывающие принадлежность',
				questions: ['чей?'],
				examples: ['мой', 'твой']
			},
			demonstrative: {
				name: 'Указательные',
				description: 'указывающие на определённый предмет или лицо',
				questions: ['какой?'],
				examples: ['этот', 'тот']
			},
			interrogative: {
				name: 'Вопросительные',
				description: 'используемые для формирования вопросов',
				questions: ['кто?', 'что?'],
				examples: ['кто?', 'что?']
			},
			relative: {
				name: 'Относительные',
				description: 'указывающие на связь с другим элементом предложения',
				questions: ['который?'],
				examples: ['который', 'чей']
			},
			indefinite: {
				name: 'Неопределённые',
				description: 'не указывающие на конкретное лицо или предмет',
				questions: ['какой?'],
				examples: ['некто', 'нечто']
			},
			negative: {
				name: 'Отрицательные',
				description: 'обозначающие отрицание',
				questions: ['кто?'],
				examples: ['никто', 'ничто']
			},
			definite: {
				name: 'Определительные',
				description: 'указывающие на всёобъемлющие или неопределённые понятия',
				questions: ['какой?'],
				examples: ['весь', 'всякий', 'любой']
			}
		}
	},
	verb: {
		name: 'Глагол',
		description: 'обозначаетъ действие или состояние',
		types: {
			perfective: {
				name: 'Совершенный вид',
				description: 'обозначающие завершённое действие',
				questions: ['что сделать?'],
				examples: ['написать']
			},
			imperfective: {
				name: 'Несовершенный вид',
				description: 'обозначающие процесс или незавершённое действие',
				questions: ['что делать?'],
				examples: ['писать']
			},
			transitive: {
				name: 'Переходные',
				description: 'требующие наличия объекта действия',
				questions: ['что делать?'],
				examples: ['читать книгу']
			},
			intransitive: {
				name: 'Непереходные',
				description: 'не требующие наличия объекта действия',
				questions: ['что делать?'],
				examples: ['спать', 'думать']
			},
			reflexive: {
				name: 'Возвратные',
				description: 'действие которых возвращается к субъекту',
				questions: ['что сделать?'],
				examples: ['умыться', 'одеться']
			}
		}
	},
	adverb: {
		name: 'Наречие',
		description: 'обозначаетъ признак действия, состояния или признака',
		types: {
			manner: {
				name: 'Образ действия',
				description: 'описывающие способ действия',
				questions: ['как?'],
				examples: ['быстро', 'медленно']
			},
			place: {
				name: 'Места',
				description: 'указывающие на место действия',
				questions: ['где?'],
				examples: ['здесь', 'там']
			},
			time: {
				name: 'Времени',
				description: 'указывающие на время действия',
				questions: ['когда?'],
				examples: ['вчера', 'сейчас']
			},
			reason: {
				name: 'Причины',
				description: 'объясняющие причину действия',
				questions: ['почему?'],
				examples: ['поэтому', 'из-за']
			},
			purpose: {
				name: 'Цели',
				description: 'указывающие на цель действия',
				questions: ['зачем?'],
				examples: ['для этого', 'чтобы']
			},
			frequency: {
				name: 'Частоты',
				description: 'указывающие на частоту действия',
				questions: ['как часто?'],
				examples: ['часто', 'редко']
			}
		}
	},
	preposition: {
		name: 'Предлог',
		description: 'обозначает отношение между предметами',
		types: {
			location: {
				name: 'Местоположение',
				description: 'указывающие на местоположение',
				questions: ['где?'],
				examples: ['на', 'в', 'под']
			},
			time: {
				name: 'Время',
				description: 'указывающие на время',
				questions: ['когда?'],
				examples: ['до', 'после', 'в']
			},
			means: {
				name: 'Средство',
				description: 'указывающие на средство действия',
				questions: ['чем?'],
				examples: ['с', 'через', 'на']
			},
			purpose: {
				name: 'Цель',
				description: 'указывающие на цель действия',
				questions: ['для чего?'],
				examples: ['для', 'ради']
			},
			origin: {
				name: 'Происхождение',
				description: 'указывающие на источник или начало',
				questions: ['откуда?'],
				examples: ['из', 'от']
			},
			association: {
				name: 'Связь',
				description: 'указывающие на ассоциацию или связь',
				questions: ['с чем?'],
				examples: ['с', 'о']
			}
		}
	},
	conjunction: {
		name: 'Союз',
		description: 'соединяющая слова, группы слов или предложения',
		types: {
			coordinating: {
				name: 'Сочинительные',
				description: 'соединяющие однородные члены предложения или простые предложения',
				examples: ['и', 'но', 'или']
			},
			subordinating: {
				name: 'Подчинительные',
				description: 'соединяющие главные и придаточные предложения',
				examples: ['потому что', 'чтобы']
			}
		}
	},
	particle: {
		name: 'Частица',
		description: 'которая модифицирует или изменяет смысл других частей речи',
		types: {
			formative: {
				name: 'Формообразующие',
				description: 'изменяющие форму слов',
				examples: ['бы', 'пусть']
			},
			negative: {
				name: 'Отрицательные',
				description: 'обозначающие отрицание',
				examples: ['не', 'ни']
			},
			intensifying: {
				name: 'Усилительные Знаменательные',
				description: 'усиливающие выражение',
				examples: ['даже', 'ещё']
			}
		}
	},
	interjection: {
		name: 'Междометие',
		description: 'выражающая эмоции или волеизъявления',
		types: {
			expressive: {
				name: 'Выразительные Эмоциональные',
				description: 'выражающие эмоции и чувства',
				examples: ['ах', 'ой']
			},
			calling: {
				name: 'Призывные Волеизъявительные',
				description: 'используемые для привлечения внимания',
				examples: ['эй', 'алло']
			}
		}
	},
	stateCategory: {
		name: 'Категория состояния',
		description: 'обозначает состояние или настроение',
		questions: ['каково?', 'в каком состоянии?'],
		examples: ['тепло', 'холодно', 'радостно']
	},
	article: {
		name: 'Артикль',
		description: 'Часть речи, которая используется для определения или уточнения существительного в предложении',
		types: {
			definite: {
				name: 'Определённые',
				description: 'указывающие на конкретное, известное слушателю или читателю существительное',
				examples: ['the', 'der', 'le']
			},
			indefinite: {
				name: 'Неопределённые',
				description: 'указывающие на не конкретное, а любое существительное из класса',
				examples: ['a', 'ein', 'un']
			}
		}
	},
	infinitive: {
		name: 'Инфинитив',
		description: 'Основная форма глагола, не изменённая по лицам и числам',
		questions: ['что делать?', 'что сделать?'],
		examples: ['to eat', 'comer']
	}
};
