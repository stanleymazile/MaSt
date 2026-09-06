import React from 'react';
import { Play } from 'lucide-react';
import { FleursChart } from './FleursChart';

interface GeminiTranscribeSectionProps {
  onListenArticle: () => void;
  onOpenVideoDemo: () => void;
}

export const GeminiTranscribeSection: React.FC<GeminiTranscribeSectionProps> = ({
  onListenArticle,
  onOpenVideoDemo,
}) => {
  return (
    <article id="gemini-transcribe-article">
      {/* Audio Badge */}
      <button
        id="listen-to-article-badge"
        onClick={onListenArticle}
        className="inline-flex items-center gap-2 bg-[#f1f3f4] dark:bg-[#303134] hover:bg-[#e8eaed] dark:hover:bg-[#3c4043] active:bg-[#dadce0] px-4 py-2 rounded-full text-sm text-[#202124] dark:text-[#f1f3f4] mb-6 cursor-pointer transition-colors group focus:outline-none"
      >
        <svg className="w-4 h-4 fill-[#1a73e8] dark:fill-[#8ab4f8] group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z" />
        </svg>
        <span className="font-medium">Listen to article</span>
        <span className="text-[#5f6368] dark:text-[#9aa0a6]">• 3:30 minutes</span>
      </button>

      {/* Main Title */}
      <h1 className="font-google-sans text-[32px] sm:text-[38px] leading-[1.2] font-normal text-[#202124] dark:text-[#f1f3f4] mb-6 tracking-tight">
        Introducing Gemini 3.5 Transcribe
      </h1>

      <div className="text-[17px] leading-[1.65] text-[#3c4043] dark:text-[#bdc1c6] space-y-6">
        <p>
          Today, we're introducing <b className="font-medium text-[#202124] dark:text-[#f1f3f4]">Gemini 3.5 Transcribe</b>, our most precise speech-to-text model yet, designed for <a href="#" className="text-[#1a73e8] dark:text-[#8ab4f8] hover:underline font-medium">intelligent voice interactions</a>. Unlike conventional <a href="#" className="text-[#1a73e8] dark:text-[#8ab4f8] hover:underline font-medium">speech recognition models</a> that struggle with background noise, complex jargon, and disfluency cleanup, Gemini 3.5 Transcribe converts raw audio directly into accurate, polished, formatted text.
        </p>

        <p>
          Across our products like the Gemini app and on Android, we've seen consumers already benefiting from this transcription model with new voice capabilities like{' '}
          <a href="#" className="text-[#1a73e8] dark:text-[#8ab4f8] hover:underline font-medium">
            Rambler on Android
          </a>{' '}
          and in the Gemini app on macOS. Now, developers can build similar capabilities with Gemini 3.5 Transcribe via the{' '}
          <a href="#" className="text-[#1a73e8] dark:text-[#8ab4f8] hover:underline font-medium">
            Gemini API in Google AI Studio
          </a>{' '}
          and{' '}
          <a href="#" className="text-[#1a73e8] dark:text-[#8ab4f8] hover:underline font-medium">
            Gemini Enterprise Agent Platform
          </a>
          .
        </p>

        <p>
          We've built 3.5 Transcribe to plug seamlessly into your developer workflows, whether you're building voice agents, real-time captioning tools, or post-call analytics pipelines. The model is available across two separate APIs:
        </p>

        <ul className="list-disc pl-5 space-y-3 my-6">
          <li className="text-[16px] leading-[1.6]">
            <b className="font-medium text-[#202124] dark:text-[#f1f3f4]">Real-time streaming:</b> Delivers continuous, bidirectional streaming with sub-second latency for interactive voice apps via the{' '}
            <a href="#" className="text-[#1a73e8] dark:text-[#8ab4f8] hover:underline font-medium">
              Live API
            </a>{' '}
            using <code className="bg-[#f1f3f4] dark:bg-[#303134] text-[#202124] dark:text-[#e8eaed] px-1.5 py-0.5 rounded text-sm font-mono">gemini-3.5-transcribe-live</code>.
          </li>
          <li className="text-[16px] leading-[1.6]">
            <b className="font-medium text-[#202124] dark:text-[#f1f3f4]">Pre-recorded audio processing:</b> Transcribes recorded audio, meetings, call logs, and more with speaker attribution and word-level timestamps via the{' '}
            <a href="#" className="text-[#1a73e8] dark:text-[#8ab4f8] hover:underline font-medium">
              Interactions API
            </a>{' '}
            using <code className="bg-[#f1f3f4] dark:bg-[#303134] text-[#202124] dark:text-[#e8eaed] px-1.5 py-0.5 rounded text-sm font-mono">gemini-3.5-transcribe</code>.
          </li>
        </ul>

        <h2 className="font-google-sans text-2xl font-normal text-[#202124] dark:text-[#f1f3f4] mt-10 mb-4 leading-[1.3] tracking-tight">
          Get more precise and intelligent transcription
        </h2>

        <p>
          Gemini 3.5 Transcribe is designed to capture your natural speaking style to better understand your intent and recognize custom vocabulary, so you can execute tasks with your voice.
        </p>

        <ul className="list-disc pl-5 space-y-3 my-6">
          <li className="text-[16px] leading-[1.6]">
            <b className="font-medium text-[#202124] dark:text-[#f1f3f4]">Smart transcription:</b> Seamlessly handles self-corrections (like "let's meet Tuesday-- no, Wednesday"), removes filler words ("ums" and "ahs"), auto-formats your text.
          </li>
          <li className="text-[16px] leading-[1.6]">
            <b className="font-medium text-[#202124] dark:text-[#f1f3f4]">Function calling:</b> The model can delegate complex tasks (such as image generation and file analysis) to other Gemini models via function calls. Currently available in the{' '}
            <a href="#" className="text-[#1a73e8] dark:text-[#8ab4f8] hover:underline font-medium">
              Gemini macOS app
            </a>
            .
          </li>
          <li className="text-[16px] leading-[1.6]">
            <b className="font-medium text-[#202124] dark:text-[#f1f3f4]">More precise transcription:</b> As measured by Artificial Analysis, achieves an average Word Error Rate (WER) of 4.0% for streaming and 2.6% for non-streaming use cases.
          </li>
          <li className="text-[16px] leading-[1.6]">
            <b className="font-medium text-[#202124] dark:text-[#f1f3f4]">Custom vocabulary:</b> Recognizes specialized jargon and unique spellings by seamlessly adapting transcriptions to your provided custom vocabulary.
          </li>
          <li className="text-[16px] leading-[1.6]">
            <b className="font-medium text-[#202124] dark:text-[#f1f3f4]">Global language support:</b> Automatically detects and transcribes over 85 languages, seamlessly handling regional accents and diverse dialects.
          </li>
          <li className="text-[16px] leading-[1.6]">
            <b className="font-medium text-[#202124] dark:text-[#f1f3f4]">Multi-speaker identification:</b> Accurately attributes speech in pre-recorded audio with timestamps for up to three speakers (support for 3+ speakers is experimental).
          </li>
        </ul>

        {/* Video / Media Card */}
        <div
          id="transcribe-video-demo-card"
          onClick={onOpenVideoDemo}
          className="w-full rounded-2xl overflow-hidden my-8 bg-[#202124] relative cursor-pointer group shadow-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 700 380"
            className="w-full h-auto opacity-90 group-hover:opacity-100 transition-opacity"
          >
            <rect width="100%" height="100%" fill="#1a1c1e" />
            <circle cx="350" cy="150" r="54" fill="#9a7b66" opacity="0.8" />
            <rect x="230" y="220" width="240" height="130" rx="16" fill="#2d2f31" />
            <rect x="250" y="245" width="200" height="12" rx="6" fill="#8ab4f8" opacity="0.7" />
            <rect x="250" y="270" width="160" height="10" rx="5" fill="#dadce0" opacity="0.4" />
            <rect x="250" y="292" width="180" height="10" rx="5" fill="#dadce0" opacity="0.3" />
            {/* Audio Wave Graphics */}
            <path
              d="M 60 190 Q 150 140 240 190 T 420 190 T 640 190"
              fill="none"
              stroke="#4285f4"
              strokeWidth="3"
              opacity="0.3"
            />
          </svg>

          {/* Centered Play Button */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-black/60 backdrop-blur-xs rounded-full flex items-center justify-center group-hover:scale-110 group-hover:bg-[#1a73e8] transition-all shadow-lg border border-white/20">
            <svg className="w-6 h-6 fill-white ml-0.5" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>

        <div className="text-[13px] text-[#5f6368] dark:text-[#9aa0a6] mb-8 mt-[-16px]">
          Gemini 3.5 Transcribe handles live language switches and seamless streaming transcription
        </div>

        <p>
          Gemini 3.5 Transcribe's performance represents a major advancement from our previous transcription model, <a href="#" className="text-[#1a73e8] dark:text-[#8ab4f8] hover:underline font-medium">Chirp 3</a>, offering new capabilities, improved word error rates, and significantly better latency. As measured by <a href="#" className="text-[#1a73e8] dark:text-[#8ab4f8] hover:underline font-medium">Artificial Analysis</a>, time to final transcription, for example, improves by 70%. On the <a href="#" className="text-[#1a73e8] dark:text-[#8ab4f8] hover:underline font-medium">FLEURS benchmark</a> across a set of top languages and locales, the model delivers precise multilingual performance, improving over Chirp 3, and achieving a 5.50% WER in streaming mode and 5.04% WER in non-streaming use-cases.
        </p>

        {/* FLEURS Benchmark Chart */}
        <FleursChart />

        <h2 className="font-google-sans text-2xl font-normal text-[#202124] dark:text-[#f1f3f4] mt-10 mb-4 leading-[1.3] tracking-tight">
          Experience smart transcription and advanced dictation
        </h2>

        <p>
          In addition to the Gemini API in the Google AI Studio and Gemini Enterprise Agent Platform, 3.5 Transcribe goes further than standard speech-to-text to make working across Google feel more natural and intuitive. By bringing context-aware understanding directly into everyday surfaces like Board, Antigravity, the Gemini app, and Chrome, it captures nuances, intent, and inline edits with ease.
        </p>

        <ul className="list-disc pl-5 space-y-3 my-6">
          <li className="text-[16px] leading-[1.6]">
            On <b className="font-medium text-[#202124] dark:text-[#f1f3f4]">Board on Android</b>, through the new Rambler feature, 3.5 Transcribe transforms spoken thoughts into well-formatted text, filtering out filler words. You can also use your voice to make edits, correct misspellings, and change the writing style.
          </li>
          <li className="text-[16px] leading-[1.6]">
            On <b className="font-medium text-[#202124] dark:text-[#f1f3f4]">Google Antigravity</b>, 3.5 Transcribe pairs screen context and chat history, with your permission, to ensure pinpoint transcription accuracy across file names, agent thoughts, and active documents.
          </li>
          <li className="text-[16px] leading-[1.6]">
            In <b className="font-medium text-[#202124] dark:text-[#f1f3f4]">Google AI Studio</b>, you can access 3.5 Transcribe in Build mode to vibe code apps with your voice on the fly.
          </li>
          <li className="text-[16px] leading-[1.6]">
            In the <b className="font-medium text-[#202124] dark:text-[#f1f3f4]">Gemini app on macOS</b>, 3.5 Transcribe not only transcribes your free natural speech into clean formatted text, but also enables voice commands that can pair seamlessly with screen context to power complex workflows. By calling on other Gemini models in the background to handle the heavy lifting, the model makes it effortless to summarize local files, repurpose text across apps, or generate images right at your cursor—using just your voice.
          </li>
          <li className="text-[16px] leading-[1.6]">
            Coming soon to <b className="font-medium text-[#202124] dark:text-[#f1f3f4]">Chrome</b>, you'll be able to talk to type in any web field — making it effortless to dictate replies, draft posts, or prompt Gemini in Chrome more naturally and easily with your voice.
          </li>
        </ul>

        {/* Testimonial Quote Card (vivo) */}
        <div className="bg-[#f8f9fa] dark:bg-[#202124] border border-[#dadce0]/60 dark:border-[#3c4043] rounded-2xl p-8 my-10 shadow-xs">
          <div className="font-google-sans text-[20px] leading-[1.4] font-medium text-[#202124] dark:text-[#f1f3f4] mb-5">
            “At vivo, we're committed to building AI experiences that break language barriers for users around the world. Leveraging Google's Gemini 3.5 Transcribe enables us to deliver fast, accurate multilingual transcription and translation — turning speech into text people can understand in their own language. It's a truly meaningful step toward borderless communication.”
          </div>
          <div className="text-sm font-medium text-[#202124] dark:text-[#e8eaed]">Chao Min</div>
          <div className="text-[13px] text-[#5f6368] dark:text-[#9aa0a6] mb-4">
            Senior Director of AI Engineering, vivo
          </div>
          <div className="font-google-sans text-2xl font-bold tracking-tighter text-[#202124] dark:text-[#f1f3f4]">
            vivo
          </div>
        </div>

        <h2 className="font-google-sans text-2xl font-normal text-[#202124] dark:text-[#f1f3f4] mt-10 mb-4 leading-[1.3] tracking-tight">
          Start using 3.5 Transcribe today
        </h2>

        <ul className="list-disc pl-5 space-y-3 my-6">
          <li className="text-[16px] leading-[1.6]">
            <b className="font-medium text-[#202124] dark:text-[#f1f3f4]">For developers:</b> In public preview in the{' '}
            <a href="#" className="text-[#1a73e8] dark:text-[#8ab4f8] hover:underline font-medium">
              Gemini API via Google AI Studio
            </a>{' '}
            and{' '}
            <a href="#" className="text-[#1a73e8] dark:text-[#8ab4f8] hover:underline font-medium">
              Google Antigravity
            </a>
            .
          </li>
          <li className="text-[16px] leading-[1.6]">
            <b className="font-medium text-[#202124] dark:text-[#f1f3f4]">For enterprises:</b> In public preview via{' '}
            <a href="#" className="text-[#1a73e8] dark:text-[#8ab4f8] hover:underline font-medium">
              Gemini Enterprise Agent Platform
            </a>{' '}
            and coming soon to{' '}
            <a href="#" className="text-[#1a73e8] dark:text-[#8ab4f8] hover:underline font-medium">
              Gemini Enterprise for Customer Experience
            </a>
            .
          </li>
          <li className="text-[16px] leading-[1.6]">
            <b className="font-medium text-[#202124] dark:text-[#f1f3f4]">For everyone:</b> In Gemini app on macOS in English,{' '}
            <a href="#" className="text-[#1a73e8] dark:text-[#8ab4f8] hover:underline font-medium">
              Rambler on Android
            </a>{' '}
            in select{' '}
            <a href="#" className="text-[#1a73e8] dark:text-[#8ab4f8] hover:underline font-medium">
              countries and languages
            </a>
            , and coming soon to Chrome.
          </li>
        </ul>

        {/* Posted in Tag */}
        <div className="mt-8 pt-2 flex items-center gap-2">
          <span className="text-sm text-[#5f6368] dark:text-[#9aa0a6]">Posted in:</span>
          <span className="bg-[#f1f3f4] dark:bg-[#303134] text-[#202124] dark:text-[#e8eaed] px-3 py-1.5 rounded-full text-[13px] font-medium hover:bg-[#e8eaed] dark:hover:bg-[#3c4043] transition-colors cursor-pointer">
            Gemini models
          </span>
        </div>
      </div>
    </article>
  );
};
