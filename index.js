const axios = require("axios");

// Webhook URL
const webhookUrl =
  "https://script.google.com/macros/s/AKfycbyb5skdDLs65DJwonpyDiYlWMGhT-rbxFLqS1EGgm2rhczHHkOTYj3GWbVSz1HCM0Du/exec";

// Payload to be sent
const payload = {
  name: "John Doe",
  age: 40,
  city: "New York",
};

// Function to send POST request
async function sendPostRequest() {
  try {
    const response = await axios.post(webhookUrl, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Log the response data
    console.log("Response:", response.data);

    // Check if the response contains status 'ok'
    if (response.data.status === "success") {
      console.log(
        "Received 'status: ok'. Initiating repeated POST requests every 10 seconds...",
      );

      // Start sending POST requests every 10 seconds
      setInterval(async () => {
        try {
          const intervalResponse = await axios.post(webhookUrl, payload, {
            headers: {
              "Content-Type": "application/json",
            },
          });
          console.log("Interval POST Response:", intervalResponse.data);
        } catch (error) {
          console.error("Error in interval POST request:", error);
        }
      }, 10000); // 10 seconds interval
    } else {
      console.log("Response does not contain 'status: ok'. Stopping.");
    }
  } catch (error) {
    console.error("Error in initial POST request:", error);
  }
}

// Initiate the first POST request
sendPostRequest();
