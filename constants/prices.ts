import {
  FaShoppingBasket,
  FaHome,
  FaChartLine,
  FaGasPump,
  FaPhone,
  FaTruck,
  FaHeartbeat,
  FaGraduationCap,
  FaShoppingBag,
  FaPlane,
  FaBolt
} from 'react-icons/fa';

export const priceCategories = [
  { id: 1, name: 'Хүнс', icon: FaShoppingBasket, color: '#4CAF50' },
  { id: 2, name: 'Үл хөдлөх хөрөнгө', icon: FaHome, color: '#2196F3' },
  { id: 3, name: 'Үнэт цаас', icon: FaChartLine, color: '#FFC107' },
  { id: 4, name: 'Түлш шатахуун', icon: FaGasPump, color: '#FF5722' },
  { id: 5, name: 'Харилцаа холбоо', icon: FaPhone, color: '#9C27B0' },
  { id: 6, name: 'Тээвэр', icon: FaTruck, color: '#607D8B' },
  { id: 7, name: 'Эрүүл мэнд', icon: FaHeartbeat, color: '#E91E63' },
  { id: 8, name: 'Боловсрол', icon: FaGraduationCap, color: '#3F51B5' },
  { id: 9, name: 'Бараа бүтээгдэхүүн', icon: FaShoppingBag, color: '#795548' },
  { id: 10, name: 'Аялал жуулчлал', icon: FaPlane, color: '#00BCD4' },
  { id: 11, name: 'Цахилгаан, дулаан, ус', icon: FaBolt, color: '#FF9800' }
];

export const sources = [
  {
    id: 1,
    name: 'Номин супермаркет',
    location: 'Улаанбаатар, Сүхбаатар',
    type: 'supermarket'
  },
  {
    id: 2,
    name: 'Оргил супермаркет',
    location: 'Улаанбаатар, Хан-Уул',
    type: 'supermarket'
  },
  {
    id: 3,
    name: 'Хүчит шонхор зах',
    location: 'Улаанбаатар, Баянзүрх',
    type: 'market'
  },
  {
    id: 4,
    name: 'Төв зах',
    location: 'Улаанбаатар, Чингэлтэй',
    type: 'market'
  },
  {
    id: 5,
    name: 'Миний дэлгүүр',
    location: 'Дархан, 7-р баг',
    type: 'store'
  },
  {
    id: 6,
    name: 'Petrovis',
    location: 'Улаанбаатар, Баянзүрх',
    type: 'gas_station'
  },
  {
    id: 7,
    name: 'Sodnom petrol',
    location: 'Улаанбаатар, Сүхбаатар',
    type: 'gas_station'
  },
  {
    id: 8,
    name: 'Unitel',
    location: 'Улаанбаатар',
    type: 'telecom'
  },
  {
    id: 9,
    name: 'Mobicom',
    location: 'Улаанбаатар',
    type: 'telecom'
  },
  {
    id: 10,
    name: 'Монголын хөрөнгийн бирж',
    location: 'Улаанбаатар',
    type: 'stock_exchange'
  }
];

export const priceItems = [
  {
    id: 1,
    name: 'Цагаан талх',
    categoryId: 1,
    subcategory: 'Талх',
    description: 'Сайхан чанарын цагаан талх'
  },
  {
    id: 2,
    name: 'Буудай гурил',
    categoryId: 1,
    subcategory: 'Гурил',
    description: '1кг буудай гурил'
  },
  {
    id: 3,
    name: 'Сүү (1л)',
    categoryId: 1,
    subcategory: 'Сүүн бүтээгдэхүүн',
    description: '1 литр сүү'
  },
  {
    id: 4,
    name: 'Өндөг (10ш)',
    categoryId: 1,
    subcategory: 'Өндөг',
    description: '10 ширхэг өндөг'
  },
  {
    id: 5,
    name: 'Мах (1кг)',
    categoryId: 1,
    subcategory: 'Мах',
    description: '1кг үхрийн мах'
  },
  {
    id: 6,
    name: 'АИ-92 бензин',
    categoryId: 4,
    subcategory: 'Шатахуун',
    description: 'АИ-92 бензин'
  },
  {
    id: 7,
    name: 'АИ-95 бензин',
    categoryId: 4,
    subcategory: 'Шатахуун',
    description: 'АИ-95 бензин'
  },
  {
    id: 8,
    name: 'Дизель түлш',
    categoryId: 4,
    subcategory: 'Шатахуун',
    description: 'Дизель түлш'
  },
  {
    id: 9,
    name: 'Unitel утасны үйлчилгээ',
    categoryId: 5,
    subcategory: 'Утасны үйлчилгээ',
    description: 'Сарын үндсэн үйлчилгээ'
  },
  {
    id: 10,
    name: 'Mobicom утасны үйлчилгээ',
    categoryId: 5,
    subcategory: 'Утасны үйлчилгээ',
    description: 'Сарын үндсэн үйлчилгээ'
  },
  {
    id: 11,
    name: 'Интернэт',
    categoryId: 5,
    subcategory: 'Интернэт',
    description: 'Сарын интернэтийн үйлчилгээ'
  },
  {
    id: 12,
    name: 'Цахилгаан (1кВтц)',
    categoryId: 11,
    subcategory: 'Цахилгаан',
    description: '1 кВтц цахилгаан'
  },
  {
    id: 13,
    name: 'Дулаан (1Гкал)',
    categoryId: 11,
    subcategory: 'Дулаан',
    description: '1 Гкал дулаан'
  },
  {
    id: 14,
    name: 'Ус (1м³)',
    categoryId: 11,
    subcategory: 'Ус',
    description: '1 м³ ус'
  },
  {
    id: 15,
    name: 'Ард санхүүгийн нэгдэл ХК',
    categoryId: 3,
    subcategory: 'Үнэт цаас',
    description: 'Симбол: AARD',
    symbol: 'AARD'
  },
  {
    id: 16,
    name: 'Ард кредит ББСБ ХК',
    categoryId: 3,
    subcategory: 'Үнэт цаас',
    description: 'Симбол: ADB',
    symbol: 'ADB'
  },
  {
    id: 17,
    name: 'Хөвсгөл алтан дуулга ХК',
    categoryId: 3,
    subcategory: 'Үнэт цаас',
    description: 'Симбол: ADU',
    symbol: 'ADU'
  },
  {
    id: 18,
    name: 'Ард Даатгал ХК',
    categoryId: 3,
    subcategory: 'Үнэт цаас',
    description: 'Симбол: AIC',
    symbol: 'AIC'
  },
  {
    id: 19,
    name: 'Эрдэнэс сольюшинс ХК',
    categoryId: 3,
    subcategory: 'Үнэт цаас',
    description: 'Симбол: AMT',
    symbol: 'AMT'
  },
  {
    id: 20,
    name: 'АПУ ХК',
    categoryId: 3,
    subcategory: 'Үнэт цаас',
    description: 'Симбол: APU',
    symbol: 'APU'
  },
  {
    id: 21,
    name: 'Могойн гол ХК',
    categoryId: 3,
    subcategory: 'Үнэт цаас',
    description: 'Симбол: BDL',
    symbol: 'BDL'
  },
  {
    id: 22,
    name: 'БиДиСЕК ҮЦК ХК',
    categoryId: 3,
    subcategory: 'Үнэт цаас',
    description: 'Симбол: BDS',
    symbol: 'BDS'
  },
  {
    id: 23,
    name: 'Бөөний худалдаа ХК',
    categoryId: 3,
    subcategory: 'Үнэт цаас',
    description: 'Симбол: BHL',
    symbol: 'BHL'
  },
  {
    id: 24,
    name: 'Бодь Даатгал ХК',
    categoryId: 3,
    subcategory: 'Үнэт цаас',
    description: 'Симбол: BODI',
    symbol: 'BODI'
  },
  {
    id: 25,
    name: 'Увс чацаргана ХК',
    categoryId: 3,
    subcategory: 'Үнэт цаас',
    description: 'Симбол: CHR',
    symbol: 'CHR'
  },
  {
    id: 26,
    name: 'Премиум Нэксус ХК',
    categoryId: 3,
    subcategory: 'Үнэт цаас',
    description: 'Симбол: CUMN',
    symbol: 'CUMN'
  },
  {
    id: 27,
    name: 'Эрдэнэ Ресурс Девелопмент Корпорэйшн',
    categoryId: 3,
    subcategory: 'Үнэт цаас',
    description: 'Симбол: ERDN',
    symbol: 'ERDN'
  },
  {
    id: 28,
    name: 'Э-Транс ложистикс XК',
    categoryId: 3,
    subcategory: 'Үнэт цаас',
    description: 'Симбол: ETR',
    symbol: 'ETR'
  },
  {
    id: 29,
    name: 'Газар Шим Үйлдвэр ХК',
    categoryId: 3,
    subcategory: 'Үнэт цаас',
    description: 'Симбол: GAZR',
    symbol: 'GAZR'
  },
  {
    id: 30,
    name: 'Голомт Банк ХК',
    categoryId: 3,
    subcategory: 'Үнэт цаас',
    description: 'Симбол: GLMT',
    symbol: 'GLMT'
  },
  {
    id: 31,
    name: 'Говь ХК',
    categoryId: 3,
    subcategory: 'Үнэт цаас',
    description: 'Симбол: GOV',
    symbol: 'GOV'
  },
  {
    id: 32,
    name: 'Хэрлэн Хивс ХК',
    categoryId: 3,
    subcategory: 'Үнэт цаас',
    description: 'Симбол: HRL',
    symbol: 'HRL'
  },
  {
    id: 33,
    name: 'Гермес центр ХК',
    categoryId: 3,
    subcategory: 'Үнэт цаас',
    description: 'Симбол: HRM',
    symbol: 'HRM'
  },
  {
    id: 34,
    name: 'Инвескор ББСБ ХК',
    categoryId: 3,
    subcategory: 'Үнэт цаас',
    description: 'Симбол: INV',
    symbol: 'INV'
  },
  {
    id: 35,
    name: 'Айтүүлс ХК',
    categoryId: 3,
    subcategory: 'Үнэт цаас',
    description: 'Симбол: ITLS',
    symbol: 'ITLS'
  },
  {
    id: 36,
    name: 'Женко тур бюро ХК',
    categoryId: 3,
    subcategory: 'Үнэт цаас',
    description: 'Симбол: JTB',
    symbol: 'JTB'
  },
  {
    id: 37,
    name: 'Хаан банк ХК',
    categoryId: 3,
    subcategory: 'Үнэт цаас',
    description: 'Симбол: KHAN',
    symbol: 'KHAN'
  },
  {
    id: 38,
    name: 'ЛэндМН ББСБ ХК',
    categoryId: 3,
    subcategory: 'Үнэт цаас',
    description: 'Симбол: LEND',
    symbol: 'LEND'
  },
  {
    id: 39,
    name: 'Монгол Базальт ХК',
    categoryId: 3,
    subcategory: 'Үнэт цаас',
    description: 'Симбол: MBW',
    symbol: 'MBW'
  },
  {
    id: 40,
    name: 'Монголын цахилгаан холбоо ХК',
    categoryId: 3,
    subcategory: 'Үнэт цаас',
    description: 'Симбол: MCH',
    symbol: 'MCH'
  },
  {
    id: 41,
    name: 'Монос хүнс ХК',
    categoryId: 3,
    subcategory: 'Үнэт цаас',
    description: 'Симбол: MFC',
    symbol: 'MFC'
  },
  {
    id: 42,
    name: 'Мандал Ирээдүйн Өсөлт',
    categoryId: 3,
    subcategory: 'Үнэт цаас',
    description: 'Симбол: MFG',
    symbol: 'MFG'
  },
  {
    id: 43,
    name: 'Эм жи эл акуа ХК',
    categoryId: 3,
    subcategory: 'Үнэт цаас',
    description: 'Симбол: MGLA',
    symbol: 'MGLA'
  },
  {
    id: 44,
    name: 'Мик холдинг ХК',
    categoryId: 3,
    subcategory: 'Үнэт цаас',
    description: 'Симбол: MIK',
    symbol: 'MIK'
  },
  {
    id: 45,
    name: 'Махимпекс ХК',
    categoryId: 3,
    subcategory: 'Үнэт цаас',
    description: 'Симбол: MMX',
    symbol: 'MMX'
  },
  {
    id: 46,
    name: 'Мандал Даатгал ХК',
    categoryId: 3,
    subcategory: 'Үнэт цаас',
    description: 'Симбол: MNDL',
    symbol: 'MNDL'
  },
  {
    id: 47,
    name: 'Монгол шуудан ХК',
    categoryId: 3,
    subcategory: 'Үнэт цаас',
    description: 'Симбол: MNP',
    symbol: 'MNP'
  },
  {
    id: 48,
    name: 'Монголын хөрөнгийн бирж ХК',
    categoryId: 3,
    subcategory: 'Үнэт цаас',
    description: 'Симбол: MSE',
    symbol: 'MSE'
  },
  {
    id: 49,
    name: 'Монгол шевро ХК',
    categoryId: 3,
    subcategory: 'Үнэт цаас',
    description: 'Симбол: MVO',
    symbol: 'MVO'
  },
  {
    id: 50,
    name: 'Дархан нэхий ХК',
    categoryId: 3,
    subcategory: 'Үнэт цаас',
    description: 'Симбол: NEH',
    symbol: 'NEH'
  },
  {
    id: 51,
    name: 'Оллоо ХК',
    categoryId: 3,
    subcategory: 'Үнэт цаас',
    description: 'Симбол: OLL',
    symbol: 'OLL'
  },
  {
    id: 52,
    name: 'Инновэйшн инвестмент ХК',
    categoryId: 3,
    subcategory: 'Үнэт цаас',
    description: 'Симбол: QPAY',
    symbol: 'QPAY'
  },
  {
    id: 53,
    name: 'Ремикон ХК',
    categoryId: 3,
    subcategory: 'Үнэт цаас',
    description: 'Симбол: RMC',
    symbol: 'RMC'
  },
  {
    id: 54,
    name: 'Төрийн Банк ХК',
    categoryId: 3,
    subcategory: 'Үнэт цаас',
    description: 'Симбол: SBM',
    symbol: 'SBM'
  },
  {
    id: 55,
    name: 'Сэндли ББСБ ХК',
    categoryId: 3,
    subcategory: 'Үнэт цаас',
    description: 'Симбол: SEND',
    symbol: 'SEND'
  },
  {
    id: 56,
    name: 'Сүү ХК',
    categoryId: 3,
    subcategory: 'Үнэт цаас',
    description: 'Симбол: SUU',
    symbol: 'SUU'
  },
  {
    id: 57,
    name: 'Худалдаа Хөгжлийн банк',
    categoryId: 3,
    subcategory: 'Үнэт цаас',
    description: 'Симбол: TDB',
    symbol: 'TDB'
  },
  {
    id: 58,
    name: 'Техник импорт ХК',
    categoryId: 3,
    subcategory: 'Үнэт цаас',
    description: 'Симбол: TEX',
    symbol: 'TEX'
  },
  {
    id: 59,
    name: 'Тэнгэр Даатгал ХК',
    categoryId: 3,
    subcategory: 'Үнэт цаас',
    description: 'Симбол: TGI',
    symbol: 'TGI'
  },
  {
    id: 60,
    name: 'Тэнгэрлиг медиа групп',
    categoryId: 3,
    subcategory: 'Үнэт цаас',
    description: 'Симбол: TNGR',
    symbol: 'TNGR'
  },
  {
    id: 61,
    name: 'Таван толгой ХК',
    categoryId: 3,
    subcategory: 'Үнэт цаас',
    description: 'Симбол: TTL',
    symbol: 'TTL'
  },
  {
    id: 62,
    name: 'Түмэн шувуут ХК',
    categoryId: 3,
    subcategory: 'Үнэт цаас',
    description: 'Симбол: TUM',
    symbol: 'TUM'
  },
  {
    id: 63,
    name: 'Улсын их дэлгүүр ХК',
    categoryId: 3,
    subcategory: 'Үнэт цаас',
    description: 'Симбол: UID',
    symbol: 'UID'
  },
  {
    id: 64,
    name: 'Хас Банк',
    categoryId: 3,
    subcategory: 'Үнэт цаас',
    description: 'Симбол: XAC',
    symbol: 'XAC'
  },
  {
    id: 65,
    name: 'Үндэсний хувьчлалын сан',
    categoryId: 3,
    subcategory: 'Үнэт цаас',
    description: 'Симбол: XOC',
    symbol: 'XOC'
  },
  {
    id: 66,
    name: 'Авто импекс ХК',
    categoryId: 3,
    subcategory: 'Үнэт цаас',
    description: 'Симбол: AOI',
    symbol: 'AOI'
  },
  {
    id: 67,
    name: 'Багануур ХК',
    categoryId: 3,
    subcategory: 'Үнэт цаас',
    description: 'Симбол: BAN',
    symbol: 'BAN'
  },
  {
    id: 68,
    name: 'Дархан зочид буудал ХК',
    categoryId: 3,
    subcategory: 'Үнэт цаас',
    description: 'Симбол: DZG',
    symbol: 'DZG'
  },
  {
    id: 69,
    name: 'Монгол алт ХК',
    categoryId: 3,
    subcategory: 'Үнэт цаас',
    description: 'Симбол: ERS',
    symbol: 'ERS'
  },
  {
    id: 70,
    name: 'Ган хийц ХК',
    categoryId: 3,
    subcategory: 'Үнэт цаас',
    description: 'Симбол: GHC',
    symbol: 'GHC'
  },
  {
    id: 71,
    name: 'Хүннү менежмент ХК',
    categoryId: 3,
    subcategory: 'Үнэт цаас',
    description: 'Симбол: HBZ',
    symbol: 'HBZ'
  },
  {
    id: 72,
    name: 'Монложистикс Холдинг ХК',
    categoryId: 3,
    subcategory: 'Үнэт цаас',
    description: 'Симбол: MLG',
    symbol: 'MLG'
  },
  {
    id: 73,
    name: 'Монноос ХК',
    categoryId: 3,
    subcategory: 'Үнэт цаас',
    description: 'Симбол: MNS',
    symbol: 'MNS'
  },
  {
    id: 74,
    name: 'Монгол шилтгээн ХК',
    categoryId: 3,
    subcategory: 'Үнэт цаас',
    description: 'Симбол: MSH',
    symbol: 'MSH'
  },
  {
    id: 75,
    name: 'Сор ХК',
    categoryId: 3,
    subcategory: 'Үнэт цаас',
    description: 'Симбол: SOR',
    symbol: 'SOR'
  },
  {
    id: 76,
    name: 'Талх чихэр ХК',
    categoryId: 3,
    subcategory: 'Үнэт цаас',
    description: 'Симбол: TCK',
    symbol: 'TCK'
  },
  {
    id: 77,
    name: 'Баянгол зочид буудал ХК',
    categoryId: 3,
    subcategory: 'Үнэт цаас',
    description: 'Симбол: BNG',
    symbol: 'BNG'
  },
  {
    id: 78,
    name: 'Улаанбаатар БҮК ХК',
    categoryId: 3,
    subcategory: 'Үнэт цаас',
    description: 'Симбол: BUK',
    symbol: 'BUK'
  }
];

export const sourceInfo = [
  {
    itemId: 1,
    sourceId: 1,
    price: 1800,
    unit: 'ширхэг',
    date: '2024-04-22',
    isPromotion: false,
    previousPrice: null
  },
  {
    itemId: 1,
    sourceId: 2,
    price: 1900,
    unit: 'ширхэг',
    date: '2024-04-22',
    isPromotion: true,
    previousPrice: 2100
  },
  {
    itemId: 1,
    sourceId: 3,
    price: 1500,
    unit: 'ширхэг',
    date: '2024-04-22',
    isPromotion: false,
    previousPrice: null
  },
  {
    itemId: 2,
    sourceId: 1,
    price: 4500,
    unit: 'кг',
    date: '2024-04-22',
    isPromotion: false,
    previousPrice: null
  },
  {
    itemId: 3,
    sourceId: 1,
    price: 3500,
    unit: 'литр',
    date: '2024-04-22',
    isPromotion: false,
    previousPrice: null
  },
  {
    itemId: 4,
    sourceId: 1,
    price: 5500,
    unit: '10ш',
    date: '2024-04-22',
    isPromotion: false,
    previousPrice: null
  },
  {
    itemId: 5,
    sourceId: 1,
    price: 12000,
    unit: 'кг',
    date: '2024-04-22',
    isPromotion: false,
    previousPrice: null
  },
  {
    itemId: 6,
    sourceId: 6,
    price: 2350,
    unit: 'литр',
    date: '2024-04-22',
    isPromotion: false,
    previousPrice: null
  },
  {
    itemId: 7,
    sourceId: 6,
    price: 2450,
    unit: 'литр',
    date: '2024-04-22',
    isPromotion: false,
    previousPrice: null
  },
  {
    itemId: 8,
    sourceId: 6,
    price: 2250,
    unit: 'литр',
    date: '2024-04-22',
    isPromotion: false,
    previousPrice: null
  },
  {
    itemId: 9,
    sourceId: 8,
    price: 15000,
    unit: 'сар',
    date: '2024-04-22',
    isPromotion: false,
    previousPrice: null
  },
  {
    itemId: 10,
    sourceId: 9,
    price: 14500,
    unit: 'сар',
    date: '2024-04-22',
    isPromotion: false,
    previousPrice: null
  },
  {
    itemId: 11,
    sourceId: 8,
    price: 35000,
    unit: 'сар',
    date: '2024-04-22',
    isPromotion: false,
    previousPrice: null
  },
  {
    itemId: 12,
    sourceId: 5,
    price: 120,
    unit: 'кВтц',
    date: '2024-04-22',
    isPromotion: false,
    previousPrice: null
  },
  {
    itemId: 13,
    sourceId: 5,
    price: 15000,
    unit: 'Гкал',
    date: '2024-04-22',
    isPromotion: false,
    previousPrice: null
  },
  {
    itemId: 14,
    sourceId: 5,
    price: 800,
    unit: 'м³',
    date: '2024-04-22',
    isPromotion: false,
    previousPrice: null
  },
  {
    itemId: 15,
    sourceId: 10,
    price: 2476,
    unit: 'ширхэг',
    date: '2025-04-21',
    isPromotion: false,
    previousPrice: null,
    priceRange: '2,380 - 3,064'
  },
  {
    itemId: 16,
    sourceId: 10,
    price: 103,
    unit: 'ширхэг',
    date: '2025-04-21',
    isPromotion: false,
    previousPrice: null,
    priceRange: '85 - 117'
  },
  {
    itemId: 17,
    sourceId: 10,
    price: 328,
    unit: 'ширхэг',
    date: '2025-04-21',
    isPromotion: false,
    previousPrice: null,
    priceRange: '240 - 407'
  },
  {
    itemId: 18,
    sourceId: 10,
    price: 646,
    unit: 'ширхэг',
    date: '2025-04-21',
    isPromotion: false,
    previousPrice: null,
    priceRange: '623 - 800'
  },
  {
    itemId: 19,
    sourceId: 10,
    price: 9,
    unit: 'ширхэг',
    date: '2025-04-21',
    isPromotion: false,
    previousPrice: null,
    priceRange: '5 - 12'
  },
  {
    itemId: 20,
    sourceId: 10,
    price: 901,
    unit: 'ширхэг',
    date: '2025-04-21',
    isPromotion: false,
    previousPrice: null,
    priceRange: '901 - 1,084'
  },
  {
    itemId: 21,
    sourceId: 10,
    price: 16500,
    unit: 'ширхэг',
    date: '2025-04-21',
    isPromotion: false,
    previousPrice: null,
    priceRange: '9,500 - 26,500'
  },
  {
    itemId: 22,
    sourceId: 10,
    price: 1400,
    unit: 'ширхэг',
    date: '2025-04-21',
    isPromotion: false,
    previousPrice: null,
    priceRange: '1,250 - 1,750'
  },
  {
    itemId: 23,
    sourceId: 10,
    price: 700,
    unit: 'ширхэг',
    date: '2025-04-21',
    isPromotion: false,
    previousPrice: null,
    priceRange: '450 - 700'
  },
  {
    itemId: 24,
    sourceId: 10,
    price: 89,
    unit: 'ширхэг',
    date: '2025-04-21',
    isPromotion: false,
    previousPrice: null,
    priceRange: '75 - 94'
  },
  {
    itemId: 25,
    sourceId: 10,
    price: 353,
    unit: 'ширхэг',
    date: '2025-04-21',
    isPromotion: false,
    previousPrice: null,
    priceRange: '351 - 488'
  },
  {
    itemId: 26,
    sourceId: 10,
    price: 187,
    unit: 'ширхэг',
    date: '2025-04-21',
    isPromotion: false,
    previousPrice: null,
    priceRange: '135 - 6,800'
  },
  {
    itemId: 27,
    sourceId: 10,
    price: 2100,
    unit: 'ширхэг',
    date: '2025-04-21',
    isPromotion: false,
    previousPrice: null,
    priceRange: '914 - 2,100'
  },
  {
    itemId: 28,
    sourceId: 10,
    price: 111,
    unit: 'ширхэг',
    date: '2025-04-21',
    isPromotion: false,
    previousPrice: null,
    priceRange: '105 - 137'
  },
  {
    itemId: 29,
    sourceId: 10,
    price: 45,
    unit: 'ширхэг',
    date: '2025-04-21',
    isPromotion: false,
    previousPrice: null,
    priceRange: '44 - 52'
  },
  {
    itemId: 30,
    sourceId: 10,
    price: 1078,
    unit: 'ширхэг',
    date: '2025-04-21',
    isPromotion: false,
    previousPrice: null,
    priceRange: '898 - 1,403'
  },
  {
    itemId: 31,
    sourceId: 10,
    price: 270,
    unit: 'ширхэг',
    date: '2025-04-21',
    isPromotion: false,
    previousPrice: null,
    priceRange: '214 - 274'
  },
  {
    itemId: 32,
    sourceId: 10,
    price: 56,
    unit: 'ширхэг',
    date: '2025-04-21',
    isPromotion: false,
    previousPrice: null,
    priceRange: '54 - 79'
  },
  {
    itemId: 33,
    sourceId: 10,
    price: 190,
    unit: 'ширхэг',
    date: '2025-04-21',
    isPromotion: false,
    previousPrice: null,
    priceRange: '151 - 238'
  },
  {
    itemId: 34,
    sourceId: 10,
    price: 9215,
    unit: 'ширхэг',
    date: '2025-04-21',
    isPromotion: false,
    previousPrice: null,
    priceRange: '6,500 - 9,700'
  },
  {
    itemId: 35,
    sourceId: 10,
    price: 82,
    unit: 'ширхэг',
    date: '2025-04-21',
    isPromotion: false,
    previousPrice: null,
    priceRange: '56 - 84'
  },
  {
    itemId: 36,
    sourceId: 10,
    price: 46,
    unit: 'ширхэг',
    date: '2025-04-21',
    isPromotion: false,
    previousPrice: null,
    priceRange: '37 - 70'
  },
  {
    itemId: 37,
    sourceId: 10,
    price: 1061,
    unit: 'ширхэг',
    date: '2025-04-21',
    isPromotion: false,
    previousPrice: null,
    priceRange: '1,008 - 1,330'
  },
  {
    itemId: 38,
    sourceId: 10,
    price: 150,
    unit: 'ширхэг',
    date: '2025-04-21',
    isPromotion: false,
    previousPrice: null,
    priceRange: '84 - 179'
  },
  {
    itemId: 39,
    sourceId: 10,
    price: 174,
    unit: 'ширхэг',
    date: '2025-04-21',
    isPromotion: false,
    previousPrice: null,
    priceRange: '170 - 208'
  },
  {
    itemId: 40,
    sourceId: 10,
    price: 800,
    unit: 'ширхэг',
    date: '2025-04-21',
    isPromotion: false,
    previousPrice: null,
    priceRange: '475 - 950'
  },
  {
    itemId: 41,
    sourceId: 10,
    price: 80,
    unit: 'ширхэг',
    date: '2025-04-21',
    isPromotion: false,
    previousPrice: null,
    priceRange: '77 - 95'
  },
  {
    itemId: 42,
    sourceId: 10,
    price: 879,
    unit: 'ширхэг',
    date: '2025-04-21',
    isPromotion: false,
    previousPrice: null,
    priceRange: '780 - 1,198'
  },
  {
    itemId: 43,
    sourceId: 10,
    price: 200,
    unit: 'ширхэг',
    date: '2025-04-21',
    isPromotion: false,
    previousPrice: null,
    priceRange: '166 - 206'
  },
  {
    itemId: 44,
    sourceId: 10,
    price: 12250,
    unit: 'ширхэг',
    date: '2025-04-21',
    isPromotion: false,
    previousPrice: null,
    priceRange: '12,250 - 19,400'
  },
  {
    itemId: 45,
    sourceId: 10,
    price: 3900,
    unit: 'ширхэг',
    date: '2025-04-21',
    isPromotion: false,
    previousPrice: null,
    priceRange: '3,520 - 4,500'
  },
  {
    itemId: 46,
    sourceId: 10,
    price: 62,
    unit: 'ширхэг',
    date: '2025-04-21',
    isPromotion: false,
    previousPrice: null,
    priceRange: '58 - 95'
  },
  {
    itemId: 47,
    sourceId: 10,
    price: 604,
    unit: 'ширхэг',
    date: '2025-04-21',
    isPromotion: false,
    previousPrice: null,
    priceRange: '558 - 790'
  },
  {
    itemId: 48,
    sourceId: 10,
    price: 239,
    unit: 'ширхэг',
    date: '2025-04-21',
    isPromotion: false,
    previousPrice: null,
    priceRange: '205 - 503'
  },
  {
    itemId: 49,
    sourceId: 10,
    price: 1236,
    unit: 'ширхэг',
    date: '2025-04-21',
    isPromotion: false,
    previousPrice: null,
    priceRange: '1,099 - 1,454'
  },
  {
    itemId: 50,
    sourceId: 10,
    price: 23,
    unit: 'ширхэг',
    date: '2025-04-21',
    isPromotion: false,
    previousPrice: null,
    priceRange: '16 - 27'
  },
  {
    itemId: 51,
    sourceId: 10,
    price: 23,
    unit: 'ширхэг',
    date: '2025-04-21',
    isPromotion: false,
    previousPrice: null,
    priceRange: '16 - 27'
  },
  {
    itemId: 52,
    sourceId: 10,
    price: 198,
    unit: 'ширхэг',
    date: '2025-04-21',
    isPromotion: false,
    previousPrice: null,
    priceRange: '190 - 260'
  },
  {
    itemId: 53,
    sourceId: 10,
    price: 70,
    unit: 'ширхэг',
    date: '2025-04-21',
    isPromotion: false,
    previousPrice: null,
    priceRange: '44 - 80'
  },
  {
    itemId: 54,
    sourceId: 10,
    price: 446,
    unit: 'ширхэг',
    date: '2025-04-21',
    isPromotion: false,
    previousPrice: null,
    priceRange: '425 - 548'
  },
  {
    itemId: 55,
    sourceId: 10,
    price: 136,
    unit: 'ширхэг',
    date: '2025-04-21',
    isPromotion: false,
    previousPrice: null,
    priceRange: '125 - 213'
  },
  {
    itemId: 56,
    sourceId: 10,
    price: 599,
    unit: 'ширхэг',
    date: '2025-04-21',
    isPromotion: false,
    previousPrice: null,
    priceRange: '346 - 700'
  },
  {
    itemId: 57,
    sourceId: 10,
    price: 21840,
    unit: 'ширхэг',
    date: '2025-04-21',
    isPromotion: false,
    previousPrice: null,
    priceRange: '20,420 - 27,780'
  },
  {
    itemId: 58,
    sourceId: 10,
    price: 25200,
    unit: 'ширхэг',
    date: '2025-04-21',
    isPromotion: false,
    previousPrice: null,
    priceRange: '25,200 - 39,800'
  },
  {
    itemId: 59,
    sourceId: 10,
    price: 740,
    unit: 'ширхэг',
    date: '2025-04-21',
    isPromotion: false,
    previousPrice: null,
    priceRange: '720 - 803'
  },
  {
    itemId: 60,
    sourceId: 10,
    price: 5365,
    unit: 'ширхэг',
    date: '2025-04-21',
    isPromotion: false,
    previousPrice: null,
    priceRange: '3,595 - 6,180'
  },
  {
    itemId: 61,
    sourceId: 10,
    price: 26220,
    unit: 'ширхэг',
    date: '2025-04-21',
    isPromotion: false,
    previousPrice: null,
    priceRange: '21,920 - 37,280'
  },
  {
    itemId: 62,
    sourceId: 10,
    price: 355,
    unit: 'ширхэг',
    date: '2025-04-21',
    isPromotion: false,
    previousPrice: null,
    priceRange: '327 - 414'
  },
  {
    itemId: 63,
    sourceId: 10,
    price: 3184,
    unit: 'ширхэг',
    date: '2025-04-21',
    isPromotion: false,
    previousPrice: null,
    priceRange: '2,432 - 4,513'
  },
  {
    itemId: 64,
    sourceId: 10,
    price: 850,
    unit: 'ширхэг',
    date: '2025-04-21',
    isPromotion: false,
    previousPrice: null,
    priceRange: '701 - 35,860'
  },
  {
    itemId: 65,
    sourceId: 10,
    price: 82,
    unit: 'ширхэг',
    date: '2025-04-21',
    isPromotion: false,
    previousPrice: null,
    priceRange: '80 - 117'
  },
  {
    itemId: 66,
    sourceId: 10,
    price: 1000,
    unit: 'ширхэг',
    date: '2025-04-18',
    isPromotion: false,
    previousPrice: null,
    priceRange: '1,000 - 1,518'
  },
  {
    itemId: 67,
    sourceId: 10,
    price: 1600,
    unit: 'ширхэг',
    date: '2025-04-18',
    isPromotion: false,
    previousPrice: null,
    priceRange: '850 - 2,700'
  },
  {
    itemId: 68,
    sourceId: 10,
    price: 161,
    unit: 'ширхэг',
    date: '2025-04-18',
    isPromotion: false,
    previousPrice: null,
    priceRange: '135 - 220'
  },
  {
    itemId: 69,
    sourceId: 10,
    price: 17700,
    unit: 'ширхэг',
    date: '2025-04-18',
    isPromotion: false,
    previousPrice: null,
    priceRange: '13,000 - 27,000'
  },
  {
    itemId: 70,
    sourceId: 10,
    price: 3445,
    unit: 'ширхэг',
    date: '2025-04-18',
    isPromotion: false,
    previousPrice: null,
    priceRange: '3,445 - 6,610'
  },
  {
    itemId: 71,
    sourceId: 10,
    price: 3523,
    unit: 'ширхэг',
    date: '2025-04-18',
    isPromotion: false,
    previousPrice: null,
    priceRange: '1,415 - 7,935'
  },
  {
    itemId: 72,
    sourceId: 10,
    price: 193,
    unit: 'ширхэг',
    date: '2025-04-18',
    isPromotion: false,
    previousPrice: null,
    priceRange: '160 - 195'
  },
  {
    itemId: 73,
    sourceId: 10,
    price: 29000,
    unit: 'ширхэг',
    date: '2025-04-18',
    isPromotion: false,
    previousPrice: null,
    priceRange: '19,030 - 44,880'
  },
  {
    itemId: 74,
    sourceId: 10,
    price: 250,
    unit: 'ширхэг',
    date: '2025-04-18',
    isPromotion: false,
    previousPrice: null,
    priceRange: '250 - 330'
  },
  {
    itemId: 75,
    sourceId: 10,
    price: 13000,
    unit: 'ширхэг',
    date: '2025-04-18',
    isPromotion: false,
    previousPrice: null,
    priceRange: '750 - 13,800'
  },
  {
    itemId: 76,
    sourceId: 10,
    price: 28040,
    unit: 'ширхэг',
    date: '2025-04-18',
    isPromotion: false,
    previousPrice: null,
    priceRange: '28,040 - 34,000'
  },
  {
    itemId: 77,
    sourceId: 10,
    price: 35000,
    unit: 'ширхэг',
    date: '2025-04-17',
    isPromotion: false,
    previousPrice: null,
    priceRange: '30,000 - 37,480'
  },
  {
    itemId: 78,
    sourceId: 10,
    price: 350,
    unit: 'ширхэг',
    date: '2025-04-17',
    isPromotion: false,
    previousPrice: null,
    priceRange: '260 - 399'
  }
];
