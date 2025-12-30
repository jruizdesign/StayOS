import { defineSecret } from "firebase-functions/params";
import { onRequest } from "firebase-functions/v2/https";

// Define the secret (must exist in Google Cloud Secret Manager)
const apiKey = defineSecret("GEMINI_API_KEY");

export const mySecureFunction = onRequest(
  { secrets: [apiKey] }, // Allow this function to access the secret
  (request, response) => {
    // Access the value
    console.log(apiKey.value()); 
    response.send("Function executed securely.");
  }
);
