import global from "../../assets/icons/profile-icons/global.png";
import InfoCircle from "../../assets/icons/profile-icons/InfoCircle.png";
import location from "../../assets/icons/profile-icons/location.png";
import lockPass from "../../assets/icons/profile-icons/lock.png";
import notification from "../../assets/icons/profile-icons/notification.png";
import profileInfo from "../../assets/icons/profile-icons/profile.png";
import wallet from "../../assets/icons/profile-icons/wallet-2.png";
import calindar from "../../assets/icons/profile-icons/Calendar.png";

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
