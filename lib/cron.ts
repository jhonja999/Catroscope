import cron from "node-cron";
import { HoroscopeGenerator } from "@/lib/horoscopeGenerator";

const generator = new HoroscopeGenerator();

export const initializeCronJob = () => {
  // Programar una tarea que se ejecute todos los días a la medianoche
  const job = cron.schedule('0 0 * * *', async () => {
    try {
      // Generar el horóscopo diario
      const dailyHoroscope = generator.generateHoroscope({
        catName: 'Michi',
        recipient: 'self',
      });
      
      console.log('Horóscopo diario generado:', dailyHoroscope);
      
      // TODO: Implementar almacenamiento en base de datos o algún sistema persistente
    } catch (error) {
      console.error('Error en el cron job:', error);
    }
  });

  // Iniciar el cron job
  job.start();
};

/* import cron from "node-cron";
import OpenAI from "openai";
import { writeFile } from "fs/promises";
import { join } from "path";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Generate daily base horoscopes at midnight
cron.schedule("0 0 * * *", async () => {
  try {
    const horoscopes = await generateDailyBaseHoroscopes();
    await saveHoroscopes(horoscopes);
  } catch (error) {
    console.error("Error in cron job:", error);
  }
});

async function generateDailyBaseHoroscopes() {
  const prompt = `Generate 12 unique, playful daily horoscope templates for cats, 
  one for each zodiac sign. Each horoscope should be adaptable to individual cats 
  and include typical cat activities. Keep each horoscope template under 100 words.`;

  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-3.5-turbo",
    temperature: 0.8,
    max_tokens: 1000,
  });

  return completion.choices[0].message.content;
}

async function saveHoroscopes(horoscopes: string) {
  const date = new Date().toISOString().split("T")[0];
  const filePath = join(process.cwd(), "data", `horoscopes-${date}.json`);
  await writeFile(filePath, JSON.stringify({ horoscopes, date }));
} */