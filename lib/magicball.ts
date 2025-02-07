// /lib/magicball.ts

export interface MagicAnswer {
    text: string;
    emoji: string;
  }
  
  export const MAGIC_ANSWERS: MagicAnswer[] = [
    {
      text: "Las vibraciones cósmicas dicen que sí, después de una siesta",
      emoji: "😼"
    },
    {
      text: "El destino huele a atún fresco esta noche",
      emoji: "🐟"
    },
    {
      text: "Pregunta de nuevo tras 3 saltos místicos",
      emoji: "🐾"
    },
    {
      text: "El universo ronronea un 'tal vez' con retraso",
      emoji: "⏳"
    },
    {
      text: "Los bigotes del destino apuntan a que sí",
      emoji: "🐱"
    },
    {
      text: "Mi bola de lana dice que no",
      emoji: "🧶"
    },
    {
      text: "Las estrellas felinas están alineadas para tu suerte",
      emoji: "⭐"
    },
    {
      text: "Mejor pregunta después de mi siesta de 4 horas",
      emoji: "😴"
    },
    {
      text: "Mi intuición gatuna dice que es posible",
      emoji: "🔮"
    },
    {
      text: "Las señales son confusas, necesito más croquetas para pensar",
      emoji: "🍜"
    },

    {
        text: "El ronroneo del destino dice que sí",
        emoji: "🐈"
    },
    {
        text: "Las patas del misterio están en movimiento... aún no se sabe",
        emoji: "👣"
    },
    {
        text: "El espíritu del gato ancestral dice que no",
        emoji: "👻"
    },
    {
        text: "Un rayo de sol ilumina la respuesta: definitivamente sí",
        emoji: "🌞"
    },
    {
        text: "Un humano abrirá una lata, pero la respuesta sigue en duda",
        emoji: "🥫"
    },
    {
        text: "El viento susurra un 'quizás' en lenguaje gatuno",
        emoji: "🌬️"
    },
    {
        text: "Los dioses felinos no están seguros, intenta más tarde",
        emoji: "⏳"
    },
    {
        text: "Veo un gran 'sí' en la caja del destino",
        emoji: "📦"
    },
    {
        text: "No mires atrás, la respuesta está en tu interior",
        emoji: "🌀"
    },
    {
        text: "El oráculo de los gatos dice que no esta vez",
        emoji: "🚫"
    },
    {
        text: "Es un misterio tan grande como el paradero de mi juguete",
        emoji: "🕵️"
    },
    {
        text: "Siento un fuerte impulso de decir que sí",
        emoji: "🔥"
    },
    {
        text: "No puedo ver el futuro, pero huele sospechoso",
        emoji: "👃"
    },
    {
        text: "Las estrellas dicen que sí, pero tu humano dice que no",
        emoji: "💫"
    },
    {
        text: "Corre en círculos y vuelve a preguntar",
        emoji: "🔄"
    },
    {
        text: "La caja de Schrödinger contiene un sí y un no",
        emoji: "📦"
    },
    {
        text: "Si ves un rayo de sol, es un sí. Si no, es un no",
        emoji: "🌅"
    },
    {
        text: "El gran gato cósmico ha hablado: todo es posible",
        emoji: "🌌"
    },
    {
        text: "Hoy no es el día, pero mañana podría serlo",
        emoji: "📅"
    }

  ];
  
  export const getRandomAnswer = (): MagicAnswer => {
    return MAGIC_ANSWERS[Math.floor(Math.random() * MAGIC_ANSWERS.length)];
  };