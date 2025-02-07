import React, { useState } from 'react';
import { Button, TextField, CircularProgress } from '@mui/material';
// Crea un archivo styles.module.css
import styles from './styles.module.css';
import { getRandomAnswer } from '../lib/magicball';

const MagicBall = () => {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState<{ text: string; emoji: string } | null>(null);
    const [isLoading, setIsLoading] = useState(false);
  
    const handleSubmit = async () => {
      if (!question.trim()) return;
      
      setIsLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      setAnswer(getRandomAnswer());
      setIsLoading(false);
    };
  
    return (
      <div className="max-w-md p-6 bg-sky-950 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-white">
          🎱 Bola Mágica Gatuna
        </h2>
        
        <div className="space-y-4">
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Pregunta al oráculo felino..."
            className="w-full p-3 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 bg-slate-700 focus:border-transparent text-white"
            rows={3}
          />
          
          <button
            onClick={handleSubmit}
            disabled={isLoading || !question.trim()}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Consultando...
              </span>
            ) : (
              <span className="flex items-center justify-center">
                🐱 Consultar Destino
              </span>
            )}
          </button>
          
          {answer && (
            <div className="mt-6 p-4 bg-slate-700 rounded-lg shadow border border-purple-200">
              <p className="text-lg text-center text-purple-900">
                {answer.text} {answer.emoji}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };
  
  export default MagicBall;