import arrowDown from "../assets/icons/arrow-down.png";
import arrowUp from "../assets/icons/arrow-up.png";
import backArrow from "../assets/icons/back-arrow.png";
import bills from "../assets/icons/bills.png";
import checkmark from "../assets/icons/check.png";
import close from "../assets/icons/close.png";
import dollar from "../assets/icons/dollar.png";
import sendpassLogo from "../assets/icons/sendpassLogo.png";
import smartphone from "../assets/icons/smartphone.png";

import route from "../assets/icons/route.png";

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
import Danger from "../assets/icons/Danger.png";
import Time from "../assets/icons/Time.png";
import docsImage from "../assets/icons/docsImage.png";
import support from "../assets/icons/support.png";
import point1 from "../assets/icons/point1.png";
import fallbackMap from "../assets/icons/fallbackMap.png";

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
  fallbackMap,
  Danger,
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
  sendpassLogo,
  map,
  smartphone,
  route,
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
    missingFields: "Please enter your Phone number.",
    invalidPhoneNumber: "The phone number must contain exactly 9 numbers ",
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
    missingFields: "يرجى إدخال رقم الجوال.",
    invalidPhoneNumber: "يجب أن يحتوي رقم الهاتف على 9 ارقام",
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
    invalidPhoneNumber: "The phone number must contain exactly 9 numbers ",
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
    invalidPhoneNumber: "يجب أن يحتوي رقم الهاتف على 9 ارقام",
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

export const translationReset = {
  en: {
    title: "Reset Password",
    newPasswordPlaceholder: "New Password",
    confirmPasswordPlaceholder: "Confirm Password",
    successToastTitle: "Done",
    successToastMessage: "Password reset successfully. 👋",
    errorEmptyFields:
      "Please enter the new password and confirmation password.",
    errorMismatch: "Passwords do not match.",
    errorShortPassword: "Password must be longer than 6 characters.",
    errorOldPasswordMissing: "Old password is missing. Please try again later.",
    errorResetFailed: "Failed to reset password. Please try again.",
    confirmButton: "Confirm",
  },
  ar: {
    title: "إعادة تعيين كلمة المرور",
    newPasswordPlaceholder: "كلمة المرور الجديدة",
    confirmPasswordPlaceholder: "تأكيد كلمة المرور",
    successToastTitle: "تم",
    successToastMessage: "تم تغيير كلمة المرور بنجاح.👋",
    errorEmptyFields: "يرجى إدخال كلمة المرور وكلمة المرور الجديدة.",
    errorMismatch: "كلمات المرور غير متطابقة.",
    errorShortPassword: "كلمة المرور يجب أن تكون أطول من 6 أحرف.",
    errorOldPasswordMissing:
      "كلمة المرور القديمة غير موجودة. الرجاء المحاولة لاحقًا.",
    errorResetFailed: "فشل في تغيير كلمة المرور. حاول مرة أخرى.",
    confirmButton: "تأكيد",
  },
} as any;

// Forget Password

export const translationForget = {
  ar: {
    enterPhone: "ادخل رقم جوالك",
    enterEmail: "ادخل بريدك الإلكتروني",
    phoneLabel: "رقم الجوال",
    emailLabel: "البريد الإلكتروني",
    errorEmptyField: "يرجى إدخال رقم الجوال أو البريد الإلكتروني",
    errorPhoneNotFound: "رقم الجوال غير موجود في التطبيق.",
    errorEmailNotFound: "البريد الإلكتروني غير موجود في التطبيق.",
    sendOtpError: "حدث خطأ أثناء إرسال OTP. حاول مرة أخرى.",
    backButton: "رجوع",
    continue: "متابعة",
  },
  en: {
    enterPhone: "Enter your phone number",
    enterEmail: "Enter your email address",
    phoneLabel: "Phone Number",
    emailLabel: "Email Address",
    errorEmptyField: "Please enter your phone number or email address",
    errorPhoneNotFound: "Phone number not found in the app.",
    errorEmailNotFound: "Email not found in the app.",
    sendOtpError: "An error occurred while sending OTP. Please try again.",
    backButton: "Back",
    continue: "Continue",
  },
} as any;

export const translationsVerificationForgot = {
  ar: {
    verifyPhone: "التحقق من رقم الجوال",
    verifyEmail: "التحقق من البريد الإلكتروني",
    otpPromptPhone: "ادخل رمز التحقق المرسل على رقمك",
    otpPromptEmail: "ادخل رمز التحقق المرسل على بريدك الإلكتروني",
    resendCode: "إعادة إرسال الكود",
    codeResent: "تم إعادة إرسال الكود",
    continue: "متابعة",
    fullOtpRequired: "يرجى إدخال رمز التحقق الكامل.",
    otpSuccess: "تم التحقق بنجاح.",
    otpError: "فشل في التحقق من الرمز.",
    resendOtpError: "حدث خطأ أثناء إعادة إرسال رمز التحقق.",
    userNotFound: "فشل في العثور على المستخدم.",
  },
  en: {
    verifyPhone: "Verify Phone Number",
    verifyEmail: "Verify Email Address",
    otpPromptPhone: "Enter the verification code sent to your number",
    otpPromptEmail: "Enter the verification code sent to your email",
    resendCode: "Resend Code",
    codeResent: "Code Resent",
    continue: "Continue",
    fullOtpRequired: "Please enter the full verification code.",
    otpSuccess: "Verification successful.",
    otpError: "Failed to verify the code.",
    resendOtpError: "An error occurred while resending the code.",
    userNotFound: "Failed to find the user.",
  },
} as any;

// Error Modal reset

export const translationModalReset = {
  ar: {
    successTitle: "نجاح",
    errorTitle: "خطاء",
    buttonText: "موافق",
  },
  en: {
    successTitle: "Success",
    errorTitle: "Error",
    buttonText: "OK",
  },
} as any;

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

export function generateRandomPassword(
  length: number = 12, // Default password length
  includeUppercase: boolean = true,
  includeNumbers: boolean = true,
  includeSymbols: boolean = true
): string {
  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numberChars = "0123456789";
  const symbolChars = "!@#$%^&*()_+[]{}|;:,.<>?";

  let characterPool = lowercaseChars;

  if (includeUppercase) characterPool += uppercaseChars;
  if (includeNumbers) characterPool += numberChars;
  if (includeSymbols) characterPool += symbolChars;

  if (characterPool.length === 0) {
    throw new Error("At least one character type must be selected.");
  }

  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characterPool.length);
    password += characterPool[randomIndex];
  }

  return password;
}

// Example Usage:
const password = generateRandomPassword(16, true, true, true);

export const getAvailableRentType = (rentType: any, t: any) => {
  if (rentType?.monthly?.availability) {
    return { type: t.monthly, price: rentType.monthly.price };
  } else if (rentType?.weekly?.availability) {
    return { type: t.weekly, price: rentType.weekly.price };
  } else if (rentType?.daily?.availability) {
    return { type: t.daily, price: rentType.daily.price };
  } else {
    return { type: t.notAvailable, price: t.n }; // Fallback
  }
};

export const cityTranslations = {
  Riyadh: { en: "Riyadh", ar: "الرياض" },
  Jeddah: { en: "Jeddah", ar: "جدة" },
  Dammam: { en: "Dammam", ar: "الدمام" },
  Mecca: { en: "Mecca", ar: "مكة" },
  Medina: { en: "Medina", ar: "المدينة" },
  Khobar: { en: "Khobar", ar: "الخبر" },
  Abha: { en: "Abha", ar: "أبها" },
  Taif: { en: "Taif", ar: "الطائف" },
  Jubail: { en: "Jubail", ar: "الجبيل" },
  Tabuk: { en: "Tabuk", ar: "تبوك" },
  Yanbu: { en: "Yanbu", ar: "ينبع" },
} as any;

export const getTranslations = (language: "en" | "ar", page: string) => {
  const translations: any = {
    bookingPage: {
      en: {
        bookingDetails: "Booking Details",
        selectRentalPeriod: "Select Rental Period",
        daily: "Daily",
        weekly: "Weekly",
        monthly: "Monthly",
        startDate: "Start Date",
        endDate: "End Date",
        selectStartDate: "Select Start Date",
        selectEndDate: "Select End Date",
        totalDays: "Total Days",
        totalPrice: "Total Price",
        confirmBooking: "Confirm Booking",
        invalidBooking: "Invalid Booking",
        invalidBookingMessage: "Please select valid dates for booking.",
        bookingConfirmed: "Booking Confirmed",
        bookingSuccessMessage: "Your booking was successful. Total cost is $",
        errorTitle: "Error",
        errorMessage:
          "An error occurred while creating your booking. Please try again.",
      },
      ar: {
        bookingDetails: "تفاصيل الحجز",
        selectRentalPeriod: "اختر مدة الإيجار",
        daily: "يومي",
        weekly: "أسبوعي",
        monthly: "شهري",
        startDate: "تاريخ البدء",
        endDate: "تاريخ الانتهاء",
        selectStartDate: "حدد تاريخ البدء",
        selectEndDate: "حدد تاريخ الانتهاء",
        totalDays: "إجمالي الأيام",
        totalPrice: "إجمالي السعر",
        confirmBooking: "تأكيد الحجز",
        invalidBooking: "الحجز غير صالح",
        invalidBookingMessage: "يرجى اختيار تواريخ صالحة للحجز.",
        bookingConfirmed: "تم تأكيد الحجز",
        bookingSuccessMessage: "تم حجزك بنجاح. التكلفة الإجمالية هي $",
        errorTitle: "خطأ",
        errorMessage: "حدث خطأ أثناء إنشاء الحجز. يرجى المحاولة مرة أخرى.",
      },
    },
  };

  return translations[page]?.[language] || {};
};

export const calculateDays = (
  startDate: Date | null,
  endDate: Date | null
): number => {
  if (!startDate || !endDate) return 0;

  const diffTime = endDate.getTime() - startDate.getTime(); // Time difference in milliseconds
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Convert to days
  return diffDays;
};

interface Neighborhood {
  name: {
    en: string; // English name
    ar: string; // Arabic name
  };
  lat: number;
  lon: number;
}

interface City {
  name: string;
  neighborhoods: Neighborhood[];
}

export const cities: City[] = [
  {
    name: "Jeddah",
    neighborhoods: [
      {
        name: { en: "Al Safa", ar: "الصّفا" },
        lat: 21.583301,
        lon: 39.205425,
      },
      {
        name: { en: "Al Salamah", ar: "السلامة" },
        lat: 21.584546,
        lon: 39.157053,
      },
      {
        name: { en: "Al Rawdah", ar: "الروضة" },
        lat: 21.568743,
        lon: 39.15774,
      },
      {
        name: { en: "Al Faisaliyah", ar: "الفيصلية" },
        lat: 21.565765,
        lon: 39.182146,
      },
      {
        name: { en: "Al Hamra", ar: "الحمراء" },
        lat: 21.62487,
        lon: 39.125568,
      },
      {
        name: { en: "Al Aziziyah", ar: "العزيزية" },
        lat: 21.55463,
        lon: 39.190225,
      },
      {
        name: { en: "Al Rehab", ar: "الرحاب" },
        lat: 21.548738,
        lon: 39.225671,
      },
      {
        name: { en: "Al Khalidiyah", ar: "الخالدية" },
        lat: 21.556913,
        lon: 39.134286,
      },
      {
        name: { en: "Al Bawadi", ar: "البوادي" },
        lat: 21.604099,
        lon: 39.164518,
      },
      {
        name: { en: "Al Zahra", ar: "الزهراء" },
        lat: 21.592033,
        lon: 39.13511,
      },
      {
        name: { en: "Al Shati", ar: "الشاطئ" },
        lat: 21.581561,
        lon: 39.116352,
      },
      {
        name: { en: "Al Naseem", ar: "النسيم" },
        lat: 21.51923,
        lon: 39.231168,
      },
      {
        name: { en: "Al Andalous", ar: "الأندلس" },
        lat: 21.537035,
        lon: 39.131648,
      },
      {
        name: { en: "Al Balad", ar: "البلد" },
        lat: 21.484396,
        lon: 39.186204,
      },
      {
        name: { en: "Al Mohamadiyah", ar: "المحمدية" },
        lat: 21.645478,
        lon: 39.127077,
      },
      {
        name: { en: "Al Marwah", ar: "المروة" },
        lat: 21.619564,
        lon: 39.200186,
      },
      {
        name: { en: "Al Naeem", ar: "النعيم" },
        lat: 21.620505,
        lon: 39.148591,
      },
      {
        name: { en: "Al Sharafiyah", ar: "الشرفية" },
        lat: 21.525362,
        lon: 39.187825,
      },
      {
        name: { en: "Al Thagher", ar: "الثغر" },
        lat: 21.480003,
        lon: 39.22431,
      },
      {
        name: { en: "Prince Fawaz", ar: "الأمير فواز" },
        lat: 21.424979,
        lon: 39.298643,
      },
      {
        name: { en: "Al Salihiyah", ar: "الصالحية" },
        lat: 21.765829,
        lon: 39.211559,
      },
      // إضافة الحيانية
      {
        name: { en: "Al Hamdaniyah", ar: "الحمدانية" },
        lat: 21.750914,
        lon: 39.195752,
      },
      // الأحياء الجديدة المضافة
      {
        name: { en: "Al Baghdadiyah", ar: "البغدادية" },
        lat: 21.493193,
        lon: 39.178531,
      },
      {
        name: { en: "Al Ruwais", ar: "الرويس" },
        lat: 21.504848,
        lon: 39.169144,
      },
      {
        name: { en: "Al Samer", ar: "السامر" },
        lat: 21.590109,
        lon: 39.243783,
      },
      {
        name: { en: "Al Kandrah", ar: "الكندرة" },
        lat: 21.492566,
        lon: 39.199798,
      },
      {
        name: { en: "Al Murjan", ar: "المرجان" },
        lat: 21.683575,
        lon: 39.103891,
      },
      {
        name: { en: "Al Waha", ar: "الواحة" },
        lat: 21.557057,
        lon: 39.241236,
      },
      {
        name: { en: "Al Sabeel", ar: "السبيل" },
        lat: 21.480362,
        lon: 39.201619,
      },
      {
        name: { en: "Al Nuzha", ar: "النزهة" },
        lat: 21.621447,
        lon: 39.172133,
      },
      {
        name: { en: "Al Rabwah", ar: "الربوة" },
        lat: 21.598497,
        lon: 39.185189,
      },
    ],
  },
  // Add more cities as needed
];
