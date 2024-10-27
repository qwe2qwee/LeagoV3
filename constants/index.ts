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
import global from "../assets/icons/profile-icons/global.png";
import InfoCircle from "../assets/icons/profile-icons/InfoCircle.png";
import location from "../assets/icons/profile-icons/location.png";
import lockPass from "../assets/icons/profile-icons/lock.png";
import moon from "../assets/icons/profile-icons/moon.png";
import notification from "../assets/icons/profile-icons/notification.png";
import profileInfo from "../assets/icons/profile-icons/profile.png";
import wallet from "../assets/icons/profile-icons/wallet-2.png";
import hyundai from "../assets/icons/hyundai1.png";

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
  people,
  checkmark,
  phone,
  close,
  dollar,
  email,
  eyecross,
  google,
  backHome,
  home,
  list,
  lock,
  map,
  marker,
  out,
  person,
  pin,
  point,
  profile,
  search,
  star,
  target,
  to,
};

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

export type TranslationSignUpKeys = keyof typeof translationsignUp;

// Profile Page

export const profilePage = {
  en: {
    personalInfo: {
      icon: profileInfo,
      title: "Personal Information",
    },
    documents: {
      icon: wallet,
      title: "Your Identity",
    },
    address: {
      icon: location,
      title: "My Address",
    },
    changePass: {
      icon: lockPass,
      title: "Change Password",
    },
    generalInfo: {
      notification: {
        icon: notification,
        title: "Notification",
      },
      languages: {
        icon: global,
        title: "Languages",
      },
      help: {
        icon: InfoCircle,
        title: "Help and Support",
      },
    },
  },
  ar: {
    personalInfo: {
      icon: profileInfo,
      title: "المعلومات الشخصية",
    },
    documents: {
      icon: wallet,
      title: "المستندات",
    },
    address: {
      icon: location,
      title: "العنوان",
    },
    changePass: {
      icon: lockPass,
      title: "تغيير كلمة المرور",
    },
    generalInfo: {
      notification: {
        icon: notification,
        title: "التنبيهات",
      },
      languages: {
        icon: global,
        title: "اللغة",
      },
      help: {
        icon: InfoCircle,
        title: "المساعدة و الدعم",
      },
    },
  },
};
