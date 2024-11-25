import arrowDown from "../assets/icons/arrow-down.png";
import arrowUp from "../assets/icons/arrow-up.png";
import backArrow from "../assets/icons/back-arrow.png";
import bills from "../assets/icons/bills.png";
import checkmark from "../assets/icons/check.png";
import close from "../assets/icons/close.png";
import dollar from "../assets/icons/dollar.png";
import email from "../assets/icons/email.png";
import eyecross from "../assets/icons/eyecross.png";
import google from "../assets/icons/google.png";
import home from "../assets/icons/home.png";
import list from "../assets/icons/list.png";
import lock from "../assets/icons/lock.png";
import map from "../assets/icons/map.png";
import marker from "../assets/icons/marker.png";
import out from "../assets/icons/out.png";
import person from "../assets/icons/person.png";
import pin from "../assets/icons/pin.png";
import point from "../assets/icons/point.png";
import profile from "../assets/icons/profile.png";
import search from "../assets/icons/search.png";
import star from "../assets/icons/star.png";
import target from "../assets/icons/target.png";
import to from "../assets/icons/to.png";
import people from "../assets/icons/people.png";
import phone from "../assets/icons/Phone.png";
import backHome from "../assets/icons/backHome.png";
import hyundai from "../assets/icons/hyundai1.png";
import HeartD from "../assets/icons/HeartD.png";
import Time from "../assets/icons/Time.png";
import docsImage from "../assets/icons/docsImage.png";
import support from "../assets/icons/support.png";
import point1 from "../assets/icons/point1.png";

import camera from "../assets/icons/camera.png";
import Illustration from "../assets/icons/Illustration.png";

//Images

import onboarding1_en from "../assets/images/onboarding1_en.png";
import onboarding1_ar from "../assets/images/onboarding1_ar.png";
// import onboarding2_en from "../assets/images/onboarding2_en.png";
import onboarding2 from "../assets/images/onboarding2.png";
import onboarding3 from "../assets/images/onboarding3.png";
import signUpCar from "../assets/images/signUpCar.png";

export const images = {
  onboarding1_en,
  onboarding1_ar,
  onboarding2,
  // onboarding2_ar,
  onboarding3,
  // onboarding3_ar,
  // getStarted,
  signUpCar,
  // check,
  // noResult,
  // message,
};

export const icons = {
  arrowDown,
  arrowUp,
  backArrow,
  bills,
  hyundai,
  search,
  camera,
  people,
  Illustration,
  checkmark,
  phone,
  Time,
  support,
  close,
  docsImage,
  dollar,
  email,
  eyecross,
  google,
  backHome,
  HeartD,
  home,
  list,
  lock,
  map,
  marker,
  out,
  person,
  pin,
  point,
  point1,

  profile,
  star,
  target,
  to,
};

// Define the Colors object and its type
export const Colors = {
  RED: "#FF0000",
  BLUE: "#0000FF",
  GREEN: "#008000",
  YELLOW: "#FFFF00",
  ORANGE: "#FFA500",
  PURPLE: "#800080",
  PINK: "#FFC0CB",
  BROWN: "#A52A2A",
  BLACK: "#000000",
  WHITE: "#FFFFFF",
  GRAY: "#808080",
  CYAN: "#00FFFF",
  MAGENTA: "#FF00FF",
  LIME: "#00FF00",
  NAVY: "#000080",
  TEAL: "#008080",
  OLIVE: "#808000",
  MAROON: "#800000",
  SILVER: "#C0C0C0",
  GOLD: "#FFD700",
} as const;

type ColorName = keyof typeof Colors;

export function getColorHashCode(colorName: string): string {
  // Convert the color name to uppercase
  const colorNameUpperCase = colorName.toUpperCase() as ColorName;

  // Check if the color name exists in the Colors object
  if (colorNameUpperCase in Colors) {
    return Colors[colorNameUpperCase];
  } else {
    return "Color not found";
  }
}

export const onboarding = [
  {
    id: 1,
    skip: {
      en: "Skip",
      ar: "تخطى",
    },
    title: {
      en: "Find the perfect ride near you!",
      ar: "اعثر على السيارة المثالية بالقرب منك!",
    },
    description: {
      en: "Choose from a variety of cars at our convenient branch locations.",
      ar: "اختر من بين مجموعة متنوعة من السيارات في فروعنا القريبة.",
    },
    image: {
      en: images.onboarding1_en, // English image variant
      ar: images.onboarding1_ar, // Arabic image variant
    },
  },
  {
    id: 2,
    skip: {
      en: "Skip",
      ar: "تخطى",
    },
    title: {
      en: "Easy car rental at your nearest branch",
      ar: "تأجير السيارات بسهولة في أقرب فرع لك",
    },
    description: {
      en: "Our branches are ready to serve you. Just book and pick up your car.",
      ar: "فروعنا جاهزة لخدمتك. فقط احجز واستلم سيارتك.",
    },
    image: {
      en: images.onboarding2, // English image variant
      ar: images.onboarding2, // Arabic image variant
    },
  },
  {
    id: 3,
    title: {
      en: "Your ride, your rules!",
      ar: "رحلتك، قواعدك!",
    },
    description: {
      en: "Drive away in your chosen car. Pick it up from the nearest branch.",
      ar: "قد سيارتك التي اخترتها. استلمها من أقرب فرع.",
    },
    image: {
      en: images.onboarding3, // English image variant
      ar: images.onboarding3, // Arabic image variant
    },
  },
];

export const onboardingDocs = [
  {
    id: 1,
    skip: {
      en: "Next",
      ar: "التالي",
    },
    title: {
      en: "Upload Your Identity",
      ar: "تحميل وثيقة هويتك",
    },
    description: {
      en: "For secure rentals, upload a clear photo of your ID or driver’s license. This step ensures your profile is verified and ready to start renting cars.",
      ar: "للحصول على تأجير آمن، قم بتحميل صورة واضحة لهويتك أو رخصة قيادتك. تضمن هذه الخطوة التحقق من ملفك الشخصي ليكون جاهزًا لاستئجار السيارات.",
    },
    selectUsersDocument: {
      en: "Select Identity",
      ar: " اختر هويتك",
    },
  },
  {
    id: 2,
    skip: {
      en: "Upload",
      ar: "تحميل",
    },
    title: {
      en: "Upload Your License",
      ar: "تحميل وثيقة رخصتك",
    },
    description: {
      en: "To ensure compliance and safety, please select the type of license you hold. This helps us match you with vehicles that suit your license qualifications.",
      ar: "لضمان الامتثال والسلامة، يرجى اختيار نوع الرخصة التي تحملها. سيساعدنا ذلك على مطابقتك مع السيارات المناسبة لمؤهلات رخصتك.",
    },
    selectUsersDocument: {
      en: "Select License",
      ar: " اختر رخصتك",
    },
  },
];

export const data = {
  onboarding,
};

export const buttonTitles = {
  en: {
    getStarted: "Get Started",
    next: "Next",
  },
  ar: {
    getStarted: "ابدأ الآن",
    next: "التالي",
  },
};

export const translationsLogin = {
  en: {
    loginTitle: "Welcome Back!",
    fillData: "Please fill in the data to log in to your account",
    email: "Email",
    password: "Password",
    signIn: "Log In",
    forgotPassword: "Forgot Password?",
    noAccount: "Don't have an account?",
    createAccount: "Create one",
    error: "Error",
    missingFields: "Please enter both email and password.",
  },
  ar: {
    loginTitle: "مرحبًا بعودتك!",
    fillData: "يرجى ملء البيانات لتسجيل الدخول إلى حسابك",
    email: "البريد الإلكتروني",
    password: "كلمة المرور",
    signIn: "تسجيل الدخول",
    forgotPassword: "هل نسيت كلمة المرور؟",
    noAccount: "ليس لديك حساب؟",
    createAccount: "إنشاء حساب",
    error: "خطأ",
    missingFields: "يرجى إدخال البريد الإلكتروني وكلمة المرور.",
  },
};

// Basic translations for English and Arabic For Sign Up
export const translationsignUp = {
  en: {
    createAccount: "Create Your Account",
    fillData: "Please fill in the required data below",
    name: "Name",
    email: "Email",
    phone: "Phone Number",
    password: "Password",
    placeHol: "Enter your phone number without the country code",
    signUp: "Sign Up",
    alreadyAccount: "Already have an account?",
    signIn: "Sign In",
    error: "Error",
    missingFields: "Please fill all fields",
    invalidEmail: "Invalid email format",
    invalidPhone: "Phone number must be 13 digits (including country code)",
    weakPassword: "Password must be at least 8 characters",
    emailExists: "Email already exists",
    phoneNumberExists: "Phone number already exists",
  },
  ar: {
    createAccount: "إنشاء حسابك",
    fillData: "يرجى ملء البيانات المطلوبة أدناه",
    name: "الاسم",
    email: "البريد الإلكتروني",
    phone: "رقم الهاتف",
    password: "كلمة المرور",
    placeHol: "أدخل رقم هاتفك بدون رمز الدولة",
    signUp: "تسجيل",
    alreadyAccount: "هل لديك حساب بالفعل؟",
    signIn: "تسجيل الدخول",
    error: "خطأ",
    missingFields: "يرجى ملء جميع الحقول",
    invalidEmail: "صيغة البريد الإلكتروني غير صحيحة",
    invalidPhone: "يجب أن يتكون رقم الهاتف من 13 رقمًا (بما في ذلك رمز الدولة)",
    weakPassword: "يجب أن تكون كلمة المرور 8 أحرف على الأقل",
    emailExists: "البريد الإلكتروني موجود بالفعل",
    phoneNumberExists: "رقم الهاتف موجود بالفعل",
  },
};

export const bookingPage = {
  en: {
    bookingDetails: "Booking Details",
    selectRentalPeriod: "Select Rental Period",
    startDate: "Start Date",
    endDate: "End Date",
    selectStartDate: "Select Start Date",
    selectEndDate: "Select End Date",
    totalDays: "Total Days",
    totalPrice: "Total Price",
    confirmBooking: "Confirm Booking",
    invalidBooking: "Invalid booking",
    invalidBookingMessage: "Please select valid dates for your booking.",
    bookingConfirmed: "Booking confirmed",
    bookingSuccessMessage:
      "Your rental has been booked successfully! Total price: $",
  },
  ar: {
    bookingDetails: "تفاصيل الحجز",
    selectRentalPeriod: "اختر مدة الإيجار",
    startDate: "تاريخ البدء",
    endDate: "تاريخ الانتهاء",
    selectStartDate: "اختر تاريخ البدء",
    selectEndDate: "اختر تاريخ الانتهاء",
    totalDays: "إجمالي الأيام",
    totalPrice: "السعر الإجمالي",
    confirmBooking: "تأكيد الحجز",
    invalidBooking: "الحجز غير صالح",
    invalidBookingMessage: "يرجى اختيار تواريخ صالحة للحجز.",
    bookingConfirmed: "تم تأكيد الحجز",
    bookingSuccessMessage: "تم حجز الإيجار بنجاح! السعر الإجمالي: $",
  },
};

// Mock function to fetch car details (replace with actual Appwrite query)
export async function fetchCarDetails(
  carId: string
): Promise<{ name: string | null; year: string | null; color: string | null }> {
  try {
    console.log(`Fetching car details for carId: ${carId}`);
    // Replace the following line with actual Appwrite database query
    return {
      name: `CarName-${carId}`,
      year: `Year-${carId}`,
      color: `Color-${carId}`,
    };
  } catch (error) {
    console.error("Error fetching car details:", error);
    return { name: null, year: null, color: null };
  }
}

export type TranslationSignUpKeys = keyof typeof translationsignUp;
