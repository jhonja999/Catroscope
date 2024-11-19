import { horoscopeData } from "./horoscopeData";
import { Activity, CatHoroscope } from "./types";
type RecipientType = "self" | "other" | "human";

// HoroscopeGenerator.ts
export class HoroscopeGenerator {
  private getRandomElement<T>(array: T[]): T {
    if (!array || array.length === 0) {
      throw new Error('El array está vacío o no es válido.');
    }
    return array[Math.floor(Math.random() * array.length)];
  }

  private getRandomNumber(min: number, max: number): number {
    if (min > max) {
      throw new Error('El valor mínimo no puede ser mayor que el máximo.');
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private generateActivity(activityType: keyof typeof horoscopeData.activities): Activity {
    const activityData = horoscopeData.activities[activityType];
    if (!activityData || !activityData.predictions || !activityData.contexts) {
      throw new Error(`Datos de actividad no encontrados para el tipo: ${activityType}`);
    }

    const prediction = this.getRandomElement(activityData.predictions);
    const context = this.getRandomElement(activityData.contexts);

    return {
      name: activityType,
      prediction: `${prediction} ${context}`,
      favorability: this.getRandomNumber(2, 5),
    };
  }
  public generateHumanHoroscope(values: { humanName: string; recipient: 'self' | 'other'; recipientName?: string }): CatHoroscope {
    const { humanName, recipient, recipientName } = values;
  
    // Validación de entrada
    if (!humanName || typeof humanName !== 'string') {
      throw new Error('El nombre del humano debe ser una cadena válida.');
    }
  
    const activities = Object.keys(horoscopeData.activities)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map((activity) => this.generateActivity(activity as keyof typeof horoscopeData.activities));
  
    const luckLevel = this.getRandomNumber(1, 10);
    const luckySpot = this.getRandomElement(horoscopeData.luckySpots);
    const compatibility = Array.from(
      { length: 2 },
      () => this.getRandomElement(horoscopeData.compatibility)
    );
    const advice = this.getRandomElement(horoscopeData.advice);
  
    // Definir el mensaje de introducción basado en el destinatario
    const intro = recipient === 'self'
      ? `${humanName}, las estrellas indican que`
      : `Querido ${recipientName}, las estrellas indican que ${humanName}`;
  
    return {
      dailyMessage: `${intro} hoy ${activities[0].prediction.toLowerCase()}.`,
      activities,
      luckySpot,
      luckLevel,
      compatibility,
      advice,
    };
  }

  public generateHoroscope(values: { 
    catName: string; 
    recipient: RecipientType; 
    recipientName?: string 
  }): CatHoroscope {
    const { catName, recipient, recipientName } = values;
    
    if (!catName || typeof catName !== 'string') {
      throw new Error('El nombre del gato debe ser una cadena válida.');
    }
  
    const activities = Object.keys(horoscopeData.activities)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map((activity) => this.generateActivity(activity as keyof typeof horoscopeData.activities));
  
    const luckLevel = this.getRandomNumber(1, 10);
    const luckySpot = this.getRandomElement(horoscopeData.luckySpots);
    const compatibility = Array.from(
      { length: 2 },
      () => this.getRandomElement(horoscopeData.compatibility)
    );
    const advice = this.getRandomElement(horoscopeData.advice);
  
    // Adjust the introduction text based on the recipient type
    const intro = recipient === "self" 
      ? `${catName}, las estrellas indican que`
      : recipient === "human" 
        ? `Querido ${recipientName || "humano"}, las estrellas indican que`
        : `Querido ${recipientName}, las estrellas indican que`;
  
    return {
      dailyMessage: `${intro} hoy ${activities[0].prediction.toLowerCase()}.`,
      activities,
      luckySpot,
      luckLevel,
      compatibility,
      advice,
    };
  } 
  
  
}
