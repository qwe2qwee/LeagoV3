// Define brand-model mapping
export const modelToBrandMap: { [model: string]: string } = {
  // Toyota Models in English
  Yaris: "Toyota",
  Corolla: "Toyota",
  Camry: "Toyota",
  Avalon: "Toyota",
  Prius: "Toyota",
  Supra: "Toyota",
  Sienna: "Toyota",
  Highlander: "Toyota",
  "Land Cruiser": "Toyota",
  Sequoia: "Toyota",
  "4Runner": "Toyota",
  Tacoma: "Toyota",
  Tundra: "Toyota",
  "C-HR": "Toyota",
  RAV4: "Toyota",
  Venza: "Toyota",
  Mirai: "Toyota",
  bZ4X: "Toyota",

  // Honda Models in English
  Civic: "Honda",
  Accord: "Honda",
  "CR-V": "Honda",
  Pilot: "Honda",
  Odyssey: "Honda",
  Passport: "Honda",
  Insight: "Honda",
  "HR-V": "Honda",
  Ridgeline: "Honda",
  Fit: "Honda",
  Prelude: "Honda",
  Element: "Honda",
  Clarity: "Honda",
  Legend: "Honda",
  Stepwgn: "Honda",

  // Toyota Models in Arabic
  ياريس: "Toyota",
  كورولا: "Toyota",
  كامري: "Toyota",
  أفالون: "Toyota",
  بريوس: "Toyota",
  سوبرا: "Toyota",
  سيينا: "Toyota",
  هايلاندر: "Toyota",
  "لاند كروزر": "Toyota",
  سيكويا: "Toyota",
  "4 رنر": "Toyota",
  تاكوما: "Toyota",
  تندرا: "Toyota",
  "سي-اتش ار": "Toyota",
  "راف 4": "Toyota",
  فينزا: "Toyota",
  ميراي: "Toyota",
  "بي زد فور اكس": "Toyota",

  // Honda Models in Arabic
  سيفيك: "Honda",
  أكورد: "Honda",
  "سي آر-في": "Honda",
  بايلوت: "Honda",
  أوديسي: "Honda",
  باسبورت: "Honda",
  إنسايت: "Honda",
  "اتش آر-في": "Honda",
  ريدجلاين: "Honda",
  فيت: "Honda",
  بريليود: "Honda",
  اليمنت: "Honda",
  كلاريتي: "Honda",
  ليجيند: "Honda",
  "ستيب واجن": "Honda",

  // Mitsubishi Models in English
  Outlander: "Mitsubishi",
  "Eclipse Cross": "Mitsubishi",
  Mirage: "Mitsubishi",
  Lancer: "Mitsubishi",
  ASX: "Mitsubishi",
  Pajero: "Mitsubishi",
  Xpander: "Mitsubishi",
  Galant: "Mitsubishi",
  Eclipse: "Mitsubishi",
  Montero: "Mitsubishi",
  Delica: "Mitsubishi",
  Diamante: "Mitsubishi",

  // Mitsubishi Models in Arabic
  اوتلاندر: "Mitsubishi",
  "إكليبس كروس": "Mitsubishi",
  ميراج: "Mitsubishi",
  لانسر: "Mitsubishi",
  "ايه اس اكس": "Mitsubishi",
  باجيرو: "Mitsubishi",
  إكسباندر: "Mitsubishi",
  جالانت: "Mitsubishi",
  إكليبس: "Mitsubishi",
  مونتيرو: "Mitsubishi",
  ديليكا: "Mitsubishi",
  ديامانتي: "Mitsubishi",

  // MG Models in Arabic
  "ام جي 3": "MG",
  "ام جي 5": "MG",
  "ام جي 6": "MG",
  "ام جي زد اس": "MG",
  "ام جي هيكتور": "MG",
  "ام جي اتش اس": "MG",
  "ام جي ار اكس 5": "MG",

  // MG Models in English
  MG3: "MG",
  MG5: "MG",
  MG6: "MG",
  "MG ZS": "MG",
  "MG Hector": "MG",
  "MG HS": "MG",
  "MG RX5": "MG",

  // Nissan Models in English
  Altima: "Nissan",
  Maxima: "Nissan",
  Sentra: "Nissan",
  Versa: "Nissan",
  Rogue: "Nissan",
  Pathfinder: "Nissan",
  Murano: "Nissan",
  Armada: "Nissan",
  Titan: "Nissan",
  Frontier: "Nissan",
  "370Z": "Nissan",
  "GT-R": "Nissan",
  Patrol: "Nissan",
  Juke: "Nissan",
  Kicks: "Nissan",

  // Nissan Models in Arabic
  التيما: "Nissan",
  ماكسيما: "Nissan",
  سنترا: "Nissan",
  فيرسا: "Nissan",
  روغ: "Nissan",
  باثفايندر: "Nissan",
  مورانو: "Nissan",
  ارمادا: "Nissan",
  تايتان: "Nissan",
  فرونتير: "Nissan",
  "زد 370": "Nissan",
  "جي تي-آر": "Nissan",
  باترول: "Nissan",
  جوك: "Nissan",
  كيكس: "Nissan",

  // Hyundai Models in Arabic
  النترا: "Hyundai",
  سوناتا: "Hyundai",
  اكسنت: "Hyundai",
  توسان: "Hyundai",
  "سانتا في": "Hyundai",
  باليسايد: "Hyundai",
  كونا: "Hyundai",
  فينيو: "Hyundai",
  كريتا: "Hyundai",
  ازيرا: "Hyundai",
  جينيسيس: "Hyundai",
  فيلوستر: "Hyundai",
  ايونيك: "Hyundai",

  // Hyundai Models in English
  Elantra: "Hyundai",
  Sonata: "Hyundai",
  Accent: "Hyundai",
  Tucson: "Hyundai",
  "Santa Fe": "Hyundai",
  Palisade: "Hyundai",
  Kona: "Hyundai",
  Venue: "Hyundai",
  Creta: "Hyundai",
  Azera: "Hyundai",
  Genesis: "Hyundai",
  Veloster: "Hyundai",
  Ioniq: "Hyundai",

  // Kia Models in English
  Rio: "Kia",
  Cerato: "Kia",
  Optima: "Kia",
  Sportage: "Kia",
  Sorento: "Kia",
  Telluride: "Kia",
  Seltos: "Kia",
  Stinger: "Kia",
  Carnival: "Kia",
  K900: "Kia",
  Soul: "Kia",
  Picanto: "Kia",

  // Kia Models in Arabic
  ريو: "Kia",
  سيراتو: "Kia",
  اوبتيما: "Kia",
  سبورتاج: "Kia",
  سورينتو: "Kia",
  تيلورايد: "Kia",
  سيلتوس: "Kia",
  ستينجر: "Kia",
  كرنفال: "Kia",
  "كي 900": "Kia",
  سول: "Kia",
  بيكانتو: "Kia",
  // Lexus Models in English
  ES: "Lexus",
  LS: "Lexus",
  RX: "Lexus",
  NX: "Lexus",
  UX: "Lexus",
  GX: "Lexus",
  LX: "Lexus",
  RC: "Lexus",
  LC: "Lexus",

  // Lexus Models in Arabic
  "اي اس": "Lexus",
  "ال اس": "Lexus",
  "ار اكس": "Lexus",
  "ان اكس": "Lexus",
  "يو اكس": "Lexus",
  "جي اكس": "Lexus",
  "ال اكس": "Lexus",
  "ار سي": "Lexus",
  "ال سي": "Lexus",

  // Chevrolet Models in English
  Camaro: "Chevrolet",
  Corvette: "Chevrolet",
  Malibu: "Chevrolet",
  Impala: "Chevrolet",
  Traverse: "Chevrolet",
  Equinox: "Chevrolet",
  Tahoe: "Chevrolet",
  Suburban: "Chevrolet",
  Blazer: "Chevrolet",
  Trailblazer: "Chevrolet",
  Silverado: "Chevrolet",
  Colorado: "Chevrolet",
  Spark: "Chevrolet",

  // Chevrolet Models in Arabic
  كامارو: "Chevrolet",
  كورفيت: "Chevrolet",
  ماليبو: "Chevrolet",
  إمبالا: "Chevrolet",
  ترافيرس: "Chevrolet",
  إكوينوكس: "Chevrolet",
  تاهو: "Chevrolet",
  سوبربان: "Chevrolet",
  بليزر: "Chevrolet",
  "تريل بليزر": "Chevrolet",
  سيلفرادو: "Chevrolet",
  كولورادو: "Chevrolet",
  سبارك: "Chevrolet",

  // Jeep Models in English
  Wrangler: "Jeep",
  Cherokee: "Jeep",
  "Grand Cherokee": "Jeep",
  Compass: "Jeep",
  Renegade: "Jeep",
  Gladiator: "Jeep",
  Patriot: "Jeep",
  Liberty: "Jeep",

  // Jeep Models in Arabic
  رانجلر: "Jeep",
  شيروكي: "Jeep",
  "جراند شيروكي": "Jeep",
  كومباس: "Jeep",
  رينيجيد: "Jeep",
  جلاديتور: "Jeep",
  باتريوت: "Jeep",
  ليبرتي: "Jeep",

  // Chery Models in English
  "Tiggo 2": "Chery",
  "Tiggo 3": "Chery",
  "Tiggo 4": "Chery",
  "Tiggo 5": "Chery",
  "Tiggo 7": "Chery",
  "Tiggo 8": "Chery",
  "Arrizo 3": "Chery",
  "Arrizo 5": "Chery",
  "Arrizo 6": "Chery",
  "Arrizo 7": "Chery",
  "Arrizo GX": "Chery",
  QQ: "Chery",
  E5: "Chery",

  // Chery Models in Arabic
  "تيجو 2": "Chery",
  "تيجو 3": "Chery",
  "تيجو 4": "Chery",
  "تيجو 5": "Chery",
  "تيجو 7": "Chery",
  "تيجو 8": "Chery",
  "أريزو 3": "Chery",
  "أريزو 5": "Chery",
  "أريزو 6": "Chery",
  "أريزو 7": "Chery",
  "أريزو جي اكس": "Chery",
  "كيو كيو": "Chery",
  "إي 5": "Chery",

  Mustang: "Ford",
  // Add more models and their respective brands as needed
};

// Function to find brand by exact or partial model name
export function findBrandByPartialModel(
  partialModel: string
): { brandName: string; nameItself: string } | null {
  // Convert partialModel to lowercase for case-insensitive matching
  const normalizedPartialModel = partialModel.toLowerCase();

  // Check for an exact match
  if (modelToBrandMap[partialModel]) {
    return {
      brandName: modelToBrandMap[partialModel],
      nameItself: partialModel,
    };
  }

  // Search for partial matches in a case-insensitive manner
  const possibleMatches = Object.keys(modelToBrandMap).filter((model) =>
    model.toLowerCase().includes(normalizedPartialModel)
  );

  // If there are matches, return an object with the brand and model name of the longest match
  if (possibleMatches.length > 0) {
    const closestMatch = possibleMatches.reduce((a, b) =>
      a.length > b.length ? a : b
    );
    return {
      brandName: modelToBrandMap[closestMatch],
      nameItself: closestMatch,
    };
  }

  // Return null if no match is found
  return null;
}

// Arabic to English model name mapping
const arabicToEnglishMap: { [arabicModel: string]: string } = {
  // Chery Models in Arabic
  "تيجو 2": "Tiggo 2",
  "تيجو 3": "Tiggo 3",
  "تيجو 4": "Tiggo 4",
  "تيجو 5": "Tiggo 5",
  "تيجو 7": "Tiggo 7",
  "تيجو 8": "Tiggo 8",
  "أريزو 3": "Arrizo 3",
  "أريزو 5": "Arrizo 5",
  "أريزو 6": "Arrizo 6",
  "أريزو 7": "Arrizo 7",
  "أريزو جي اكس": "Arrizo GX",
  "كيو كيو": "QQ",
  "إي 5": "E5",

  // Jeep Models in Arabic
  رانجلر: "Wrangler",
  شيروكي: "Cherokee",
  "جراند شيروكي": "Grand Cherokee",
  كومباس: "Compass",
  رينيجيد: "Renegade",
  جلاديتور: "Gladiator",
  باتريوت: "Patriot",
  ليبرتي: "Liberty",

  // Chevrolet Models in Arabic
  كامارو: "Camaro",
  كورفيت: "Corvette",
  ماليبو: "Malibu",
  إمبالا: "Impala",
  ترافيرس: "Traverse",
  إكوينوكس: "Equinox",
  تاهو: "Tahoe",
  سوبربان: "Suburban",
  بليزر: "Blazer",
  "تريل بليزر": "Trailblazer",
  سيلفرادو: "Silverado",
  كولورادو: "Colorado",
  سبارك: "Spark",

  // Lexus Models in Arabic
  "اي اس": "ES",
  "ال اس": "LS",
  "ار اكس": "RX",
  "ان اكس": "NX",
  "يو اكس": "UX",
  "جي اكس": "GX",
  "ال اكس": "LX",
  "ار سي": "RC",
  "ال سي": "LC",

  // Kia Models in Arabic
  ريو: "Rio",
  سيراتو: "Cerato",
  اوبتيما: "Optima",
  سبورتاج: "Sportage",
  سورينتو: "Sorento",
  تيلورايد: "Telluride",
  سيلتوس: "Seltos",
  ستينجر: "Stinger",
  كرنفال: "Carnival",
  "كي 900": "K900",
  سول: "Soul",
  بيكانتو: "Picanto",

  // Nissan Models in Arabic
  التيما: "Altima",
  ماكسيما: "Maxima",
  سنترا: "Sentra",
  فيرسا: "Versa",
  روغ: "Rogue",
  باثفايندر: "Pathfinder",
  مورانو: "Murano",
  ارمادا: "Armada",
  تايتان: "Titan",
  فرونتير: "Frontier",
  "زد 370": "370Z",
  "جي تي-آر": "GT-R",
  باترول: "Patrol",
  جوك: "Juke",
  كيكس: "Kicks",

  // Hyundai Models in Arabic
  النترا: "Elantra",
  سوناتا: "Sonata",
  اكسنت: "Accent",
  توسان: "Tucson",
  "سانتا في": "Santa Fe",
  باليسايد: "Palisade",
  كونا: "Kona",
  فينيو: "Venue",
  كريتا: "Creta",
  ازيرا: "Azera",
  جينيسيس: "Genesis",
  فيلوستر: "Veloster",
  ايونيك: "Ioniq",

  // Mitsubishi Models in Arabic
  اوتلاندر: "Outlander",
  "إكليبس كروس": "Eclipse Cross",
  ميراج: "Mirage",
  لانسر: "Lancer",
  "ايه اس اكس": "ASX",
  باجيرو: "Pajero",
  إكسباندر: "Xpander",
  جالانت: "Galant",
  إكليبس: "Eclipse",
  مونتيرو: "Montero",
  ديليكا: "Delica",
  ديامانتي: "Diamante",

  // MG Models in Arabic
  "ام جي 3": "MG3",
  "ام جي 5": "MG5",
  "ام جي 6": "MG6",
  "ام جي زد اس": "MG ZS",
  "ام جي هيكتور": "MG Hector",
  "ام جي اتش اس": "MG HS",
  "ام جي ار اكس 5": "MG RX5",

  // Toyota Models in Arabic
  ياريس: "Yaris",
  كورولا: "Corolla",
  كامري: "Camry",
  أفالون: "Avalon",
  بريوس: "Prius",
  سوبرا: "Supra",
  سيينا: "Sienna",
  هايلاندر: "Highlander",
  "لاند كروزر": "Land Cruiser",
  سيكويا: "Sequoia",
  "4 رنر": "4Runner",
  تاكوما: "Tacoma",
  تندرا: "Tundra",
  "سي-اتش ار": "C-HR",
  "راف 4": "RAV4",
  فينزا: "Venza",
  ميراي: "Mirai",
  "بي زد فور اكس": "bZ4X",

  // Honda Models in Arabic
  سيفيك: "Civic",
  أكورد: "Accord",
  "سي آر-في": "CR-V",
  بايلوت: "Pilot",
  أوديسي: "Odyssey",
  باسبورت: "Passport",
  إنسايت: "Insight",
  "اتش آر-في": "HR-V",
  ريدجلاين: "Ridgeline",
  فيت: "Fit",
  بريليود: "Prelude",
  اليمنت: "Element",
  كلاريتي: "Clarity",
  ليجيند: "Legend",
  "ستيب واجن": "StepWGN",
};

// Function to get English model name
export function getEnglishModelName(modelName: string): string | any {
  // Check if the model name is in Arabic and map to English
  if (arabicToEnglishMap[modelName]) {
    return arabicToEnglishMap[modelName];
  }

  // If the model name is already in English, return it if it exists in the map
  if (modelToBrandMap[modelName]) {
    return modelName;
  }

  // Return null if no match is found
  return null;
}
