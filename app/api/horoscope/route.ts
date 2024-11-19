// app/api/horoscope/route.ts
import { NextResponse } from 'next/server';
import { HoroscopeGenerator } from '@/lib/horoscopeGenerator';

// Marcar explícitamente como ruta dinámica
export const dynamic = 'force-dynamic';
export const runtime = 'edge'; // Opcional: usar el runtime de edge para mejor rendimiento

const generator = new HoroscopeGenerator();

export async function POST(request: Request) {
  try {
    const { name } = await request.json();
    
    if (!name || typeof name !== 'string') {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Se requiere un nombre válido para el gato.' 
        },
        { status: 400 }
      );
    }
    
    const horoscope = generator.generateHoroscope(name);
    
    return NextResponse.json({
      success: true,
      data: horoscope
    });
  } catch (error) {
    console.error('Error generando el horóscopo:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Error generando el horóscopo' 
      },
      { status: 500 }
    );
  }
}

/* import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const activities = [
  "napping in sunbeams",
  "chasing mysterious red dots",
  "knocking things off tables",
  "demanding treats",
  "hunting toy mice",
  "climbing cat trees",
  "watching birds through windows",
  "grooming sessions",
  "exploring cardboard boxes",
  "midnight zoomies",
];

export async function POST(request: Request) {
  try {
    const { catName, recipient, recipientName } = await request.json();

    const prompt = `Generate a playful and personalized daily horoscope for a cat named ${catName}. 
    Include specific cat activities like ${activities.join(", ")}. 
    The horoscope should be ${recipient === "self" ? "written directly to the owner" : 
    `addressed to ${recipientName} about their friend's cat`}. 
    Make it fun, specific to cats, and include at least one prediction about ${catName}'s behavior today.
    Keep it under 150 words.`;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
      temperature: 0.7,
      max_tokens: 200,
    });

    const horoscope = completion.choices[0].message.content;

    return NextResponse.json({ horoscope });
  } catch (error) {
    console.error("Error generating horoscope:", error);
    return NextResponse.json(
      { error: "Failed to generate horoscope" },
      { status: 500 }
    );
  }
} */