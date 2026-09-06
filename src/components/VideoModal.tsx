import React, { useState, useEffect } from 'react';
import { X, Play, Pause, Volume2, Mic, CheckCircle2, Sparkles, RefreshCw } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [step, setStep] = useState(0);

  const transcripts = [
    {
      time: '0:01',
      lang: 'English (US)',
      raw: 'Um, let\'s book a flight to Tokyo on Thursday... wait no, Friday morning.',
      cleaned: 'Let\'s book a flight to Tokyo on Friday morning.',
      action: 'Search nonstop flights SFO → HND'
    },
    {
      time: '0:03',
      lang: 'Japanese (日本語)',
      raw: '羽田空港の近くのホテルも探してください。4つ星以上で。',
      cleaned: '羽田空港の近くのホテルも探してください。4つ星以上で。',
      action: 'Filter: Hotels near Haneda (4★+)'
    },
    {
      time: '0:06',
      lang: 'English / French',
      raw: 'And make sure to, uh, reserve the breakfast buffet s\'il vous plaît.',
      cleaned: 'And make sure to reserve the breakfast buffet please.',
      action: 'Add itinerary note: Breakfast buffet included'
    }
  ];

  useEffect(() => {
    let interval: any;
    if (isOpen && isPlaying) {
      interval = setInterval(() => {
        setStep((prev) => (prev + 1) % transcripts.length);
      }, 3500);
    }
    return () => clearInterval(interval);
  }, [isOpen, isPlaying]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#202124] text-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl border border-[#3c4043] animate-in zoom-in-95">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#3c4043]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#34a853] animate-pulse"></span>
            <h3 className="font-google-sans text-base font-medium text-white">
              Gemini 3.5 Transcribe Live Interactive Demo
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-[#9aa0a6] hover:text-white hover:bg-[#3c4043] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Canvas Demo Screen */}
        <div className="p-6 bg-[#171717] min-h-[320px] flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-[#2d2f31]">
            <div className="flex items-center gap-2 text-xs text-[#8ab4f8]">
              <Mic className="w-4 h-4 text-[#4285f4]" />
              <span>Real-time stream: <code className="bg-[#2a2b2e] px-1.5 py-0.5 rounded text-white">gemini-3.5-transcribe-live</code></span>
            </div>
            <span className="text-xs bg-[#303134] text-[#9aa0a6] px-2 py-0.5 rounded">
              Sub-second latency (280ms)
            </span>
          </div>

          {/* Audio Wave Simulation */}
          <div className="flex items-center justify-center gap-1.5 my-6 py-4">
            {[40, 65, 30, 85, 95, 45, 75, 100, 60, 80, 50, 90, 70, 35, 85, 45].map((h, i) => (
              <div
                key={i}
                className="w-1.5 bg-[#4285f4] rounded-full transition-all duration-300"
                style={{
                  height: isPlaying ? `${Math.max(12, (h * ((step + i) % 3 + 1)) / 3.5)}px` : '8px',
                  opacity: isPlaying ? 0.9 : 0.4
                }}
              />
            ))}
          </div>

          {/* Real-time transcription display */}
          <div className="bg-[#202124] rounded-xl p-4 border border-[#303134] space-y-3">
            <div className="flex items-center justify-between text-xs text-[#9aa0a6]">
              <span>Spoken Input ({transcripts[step].lang})</span>
              <span className="text-[#34a853] flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Auto-disfluency cleanup active
              </span>
            </div>
            <div className="text-sm text-[#bdc1c6] italic">
              "{transcripts[step].raw}"
            </div>
            <div className="pt-2 border-t border-[#303134]">
              <div className="text-xs text-[#8ab4f8] font-medium mb-1 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#4285f4]" /> Polished Structured Output:
              </div>
              <div className="text-base text-white font-medium">
                {transcripts[step].cleaned}
              </div>
            </div>
            <div className="bg-[#303134]/60 px-3 py-1.5 rounded-lg text-xs text-[#e8eaed] flex items-center justify-between">
              <span>Automated Action:</span>
              <span className="text-[#8ab4f8] font-mono">{transcripts[step].action}</span>
            </div>
          </div>
        </div>

        {/* Video Controls Footer */}
        <div className="px-6 py-3.5 bg-[#202124] flex items-center justify-between border-t border-[#3c4043]">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 rounded-full bg-[#4285f4] text-white hover:bg-[#1a73e8] transition-colors"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
            </button>
            <button
              onClick={() => setStep((prev) => (prev + 1) % transcripts.length)}
              className="text-xs text-[#9aa0a6] hover:text-white flex items-center gap-1 bg-[#303134] px-2.5 py-1.5 rounded-lg"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Next sample
            </button>
          </div>
          <span className="text-xs text-[#9aa0a6]">
            Interactive demo preview
          </span>
        </div>
      </div>
    </div>
  );
};
