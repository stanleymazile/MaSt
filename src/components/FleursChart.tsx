import React, { useState } from 'react';

interface BenchmarkItem {
  name: string;
  score: string;
  value: number;
  height: string;
  bg: string;
  textColor?: string;
  isPrimary?: boolean;
}

export const FleursChart: React.FC = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const benchmarks: BenchmarkItem[] = [
    {
      name: 'Gemini 3.5 Transcribe',
      score: '5.04%',
      value: 5.04,
      height: '35%',
      bg: '#4285f4',
      textColor: 'text-white',
      isPrimary: true,
    },
    {
      name: 'Google Cloud Chirp 3',
      score: '7.20%',
      value: 7.20,
      height: '50%',
      bg: '#8ab4f8',
      textColor: 'text-[#202124]',
    },
    {
      name: 'Deepgram Nova-2',
      score: '9.90%',
      value: 9.90,
      height: '70%',
      bg: '#dadce0',
      textColor: 'text-[#3c4043]',
    },
    {
      name: 'OpenAI Whisper v3',
      score: '8.87%',
      value: 8.87,
      height: '65%',
      bg: '#dadce0',
      textColor: 'text-[#3c4043]',
    },
    {
      name: 'AssemblyAI Conformer 2',
      score: '15.77%',
      value: 15.77,
      height: '90%',
      bg: '#dadce0',
      textColor: 'text-[#3c4043]',
    },
  ];

  return (
    <div id="fleurs-chart-container" className="border border-[#dadce0] dark:border-[#3c4043] rounded-xl p-6 my-8 text-center bg-white dark:bg-[#202124] shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-colors">
      <div className="font-google-sans font-bold text-[18px] text-[#202124] dark:text-[#f1f3f4] tracking-tight">
        FLEURS (top locales*)
      </div>
      <div className="text-[13px] text-[#5f6368] dark:text-[#9aa0a6] mb-6 mt-1">
        Measuring streaming speech recognition accuracy across languages
        <br />
        <span className="text-[12px] font-medium text-[#70757a] dark:text-[#9aa0a6]">(Lower is better)</span>
      </div>

      <div className="flex items-end justify-between h-[170px] px-2 sm:px-4 gap-2 sm:gap-3">
        {benchmarks.map((item, idx) => {
          const isHovered = hoveredIdx === idx;
          return (
            <div
              key={idx}
              className="flex-1 flex flex-col items-center justify-end h-full gap-2 transition-transform duration-200 cursor-pointer"
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              <div
                className={`w-full rounded-t flex items-start justify-center text-[11px] font-bold pt-1.5 transition-all duration-300 ${
                  item.textColor || 'text-white'
                } ${isHovered ? 'brightness-105 scale-[1.02] shadow-md' : ''}`}
                style={{
                  height: item.height,
                  backgroundColor: item.bg,
                }}
              >
                {item.score}
              </div>
              <div
                className={`text-[10px] leading-tight text-center transition-colors ${
                  item.isPrimary ? 'text-[#1a73e8] dark:text-[#8ab4f8] font-semibold' : 'text-[#5f6368] dark:text-[#9aa0a6]'
                }`}
              >
                {item.name}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 text-[11px] text-[#80868b] dark:text-[#9aa0a6] text-right">
        *FLEURS multilingual ASR benchmark evaluation dataset
      </div>
    </div>
  );
};
