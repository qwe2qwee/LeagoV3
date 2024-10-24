export const UpdatePhoneNumberAndSendOTP = async (form) => {
  try {
    // // Update phone number
    // const updatePhoneResult = await Fanticon.account.updatePhone(
    //   phone,
    //   password
    // );
    // console.log("Phone number updated successfully:", updatePhoneResult);

    // Send OTP
    const request = new XMLHttpRequest();
    request.open("POST", "https://api.authentica.sa/api/sdk/v1/sendOTP");
    request.setRequestHeader("Content-Type", "application/json");
    request.setRequestHeader("Accept", "application/json");
    request.setRequestHeader(
      "X-Authorization",
      "7A34918259A0BE78E5C18029963B9A91"
    );
    const body = {
      phone: `+966${form.phone}`,
      method: "sms",
      template_id: "20",
      otp_format: "numeric",
      number_of_digits: "4",
    };

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

    request.send(JSON.stringify(body));
  } catch (error) {
    console.error("Failed to update phone number or send OTP:", error);
    Alert.alert(
      "Error",
      "Failed to update phone number or send OTP: " + error.message
    );
  }
};
