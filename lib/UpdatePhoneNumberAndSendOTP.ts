import { Alert } from "react-native";

type Language = "en" | "ar";

// Localized error messages for English and Arabic
const errorMessages: { [key in Language]: { failedUpdate: string } } = {
  en: {
    failedUpdate: "Failed to update phone number or send OTP",
  },
  ar: {
    failedUpdate: "فشل في تحديث رقم الهاتف أو إرسال رمز التحقق",
  },
};

export const UpdatePhoneNumberAndSendOTP = async (
  phone: string,
  language: Language
): Promise<void> => {
  console.log(phone);

  try {
    const request = new XMLHttpRequest();
    request.open("POST", "https://api.authentica.sa/api/sdk/v1/sendOTP");
    request.setRequestHeader("Content-Type", "application/json");
    request.setRequestHeader("Accept", "application/json");
    request.setRequestHeader(
      "X-Authorization",
      "$2y$10$P7V123TDwDF5bGBqP3D3f.LXr8NyXfu5Vo6CAilmL66tHS9w6jPPq"
    );

    // Define the request body with explicit typing
    const body: {
      phone: string;
      method: "sms";
      template_id: string;
      otp_format: "numeric";
      number_of_digits: string;
    } = {
      phone: phone,
      method: "sms",
      template_id: "20",
      otp_format: "numeric",
      number_of_digits: "4",
    };

    // Handle the response
    request.onreadystatechange = function () {
      if (this.readyState === 4) {
        try {
          console.log("Status:", this.status);
          console.log("Headers:", this.getAllResponseHeaders());
          console.log("Body:", this.responseText);
        } catch (responseError) {
          console.error("Error processing response:", responseError);
        }
      }
    };

    // Send the request with the JSON stringified body
    request.send(JSON.stringify(body));
  } catch (error) {
    console.error("Failed to update phone number or send OTP:", error);

    // Get the localized error message
    const localizedErrorMessage = errorMessages[language].failedUpdate;

    // Display an alert with the localized error message
    if (typeof Alert !== "undefined") {
      Alert.alert(
        "Error",
        `${localizedErrorMessage}: ${(error as Error).message}`
      );
    }
  }
};
