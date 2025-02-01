import global from "../../assets/icons/profile-icons/global.png";
import InfoCircle from "../../assets/icons/profile-icons/InfoCircle.png";
import location from "../../assets/icons/profile-icons/location.png";
import lockPass from "../../assets/icons/profile-icons/lock.png";
import notification from "../../assets/icons/profile-icons/notification.png";
import profileInfo from "../../assets/icons/profile-icons/profile.png";
import wallet from "../../assets/icons/profile-icons/wallet-2.png";
import calindar from "../../assets/icons/profile-icons/Calendar.png";
import route from "../../assets/icons/route.png";
import vector from "../../assets/icons/checkbox/Vector.png";
import unchecked from "../../assets/icons/checkbox/unchecked.png";
import Address from "@/app/screens/profilePage/Address";

// radio button

export const radioButton = {
  vector,
  unchecked,
  radio: {
    en: {
      gender: "gender",
      male: "Male",
      female: "Female",
    },
    ar: {
      gender: "الجنس",
      male: "ذكر",
      female: "أنثى",
    },
  },
} as any;

// Profile Page

export const profileSections = {
  en: {
    account: "Account",
    security: "Security",
    general: "General",
    buttonT: "Logout",
    usernull: "logIn",
  },
  ar: {
    account: "إدارة الحساب",
    security: "الأمان",
    general: "عام",
    buttonT: "تسجيل الخروج",
    usernull: "سجل الدخول",
  },
};

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
      location: {
        icon: route,
        title: "Location",
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
      location: {
        icon: route,
        title: "موقعك",
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

export const pageTitle = {
  en: {
    personalInfo: "Personal Info",
    myAddress: "My Address",
    legalAndPolicies: "Legal and Policies",
    language: "Language",
    HelpAndSupport: "Help and Support",
  },
  ar: {
    personalInfo: "المعلومات الشخصية",
    myAddress: "العنوان",
    legalAndPolicies: "الشروط و الأحكام",
    language: "اللغة",
    HelpAndSupport: "المساعدة و الدعم",
  },
};

export const personalInfoPage = {
  en: {
    fullName: "Full Name",
    dateOfBirth: "Date of Birth",
    gender: "Gender",
    mobileNo: "Mobile Number",
    email: "Email",
    icon: calindar,
  },
  ar: {
    fullName: "الاسم",
    dateOfBirth: "تاريخ الميلاد",
    gender: "الجنس",
    mobileNo: "رقم الجوال",
    email: "البريد الإلكتروني",
    icon: calindar,
  },
};

export const address = {
  en: {
    country: "Country",
    region: "Region",
    city: "City",
    district: "District",
    street: "Street",
    building: "Building Number",
  },
  ar: {
    country: "الدولة",
    region: "المنطقة",
    city: "المدينة",
    district: "اسم الحي",
    street: "اسم الشارع",
    building: "رقم المبنى",
  },
};

export const languageChoices = {
  en: {
    title: "Language",
    english: "English",
    arabic: "Arabic",
  },
  ar: {
    title: "اللغة",
    english: "الإنقليزية",
    arabic: "العربية",
  },
};

export const logOutModal = {
  en: {
    question: "Are you sure want to Log Out ?",
    yes: "Log Out",
    cancel: "Cancel",
  },
  ar: {
    question: "هل أنت متأكد من تسجيل الخروج ؟!",
    yes: "نعم ، تسجيل خروج",
    cancel: "إلغاء",
  },
};

export const companyAddress = {
  en: {
    companyName: "Basmat Tareeq Company",
    Address: "Jeddah, Saudi Arabia",
  },
  ar: {
    companyName: "شركة بسمة طريق",
    Address: "جدة، المملكة العربية السعودية",
  },
};

export const pageButton = {
  en: {
    accept: "Accept",
    cancel: "Cancel",
    saveChanges: "Save Changes",
    agreementQuestion: "Are you sure to save changes ?",
  },
  ar: {
    accept: "موافق",
    cancel: "إلغاء",
    saveChanges: "حفظ التغييرات",
    agreementQuestion: "هل تريد حفظ التغييرات ؟",
  },
};
