// lib/types.ts
export interface Activity {
    name: string;
    prediction: string;
    favorability: number;
  }
  
  export interface CatHoroscope {
    dailyMessage: string;
    activities: Activity[];
    luckySpot: string;
    luckLevel: number;
    compatibility: string[];
    advice: string;
  }
  
  export interface HoroscopeData {
    activities: {
      [key: string]: {
        predictions: string[];
        contexts: string[];
      };
    };
    luckySpots: string[];
    compatibility: string[];
    advice: string[];
  }
  
  export interface HoroscopeResponse {
    success: boolean;
    data: CatHoroscope;
  }