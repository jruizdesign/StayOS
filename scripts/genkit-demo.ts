
// import the Genkit and Google AI plugin libraries
import { googleAI } from '@genkit-ai/googleai';
import { genkit } from 'genkit';
import * as dotenv from 'dotenv';

// Load environment variables if running locally
dotenv.config();

// configure a Genkit instance
const ai = genkit({
  plugins: [googleAI()],
});

const helloFlow = ai.defineFlow('helloFlow', async (name) => {
  // make a generation request
  console.log(`Sending request for ${name}...`);
  try {
      // Try gemini-pro which is widely available
      const { text } = await ai.generate({
          model: 'googleai/gemini-pro',
          prompt: `Hello Gemini, my name is ${name}`
      });
      console.log(text);
      return text;
  } catch (e: any) {
      console.error("Error generating content:", e.message);
      return null;
  }
});

// Execute the flow if this file is run directly
if (import.meta.url === `file://${process.argv[1]}`) {
    helloFlow('Chris').catch(console.error);
}

export { helloFlow };
