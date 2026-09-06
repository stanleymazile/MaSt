import React, { useState } from 'react';
import { Copy, Check, X, Twitter, Linkedin, Facebook, Link2 } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, title }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const url = window.location.href;

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        id="share-modal"
        className="bg-white dark:bg-[#202124] rounded-2xl p-6 w-full max-w-md shadow-2xl border border-[#dadce0] dark:border-[#3c4043] animate-in zoom-in-95 duration-200"
      >
        <div className="flex items-center justify-between pb-4 border-b border-[#dadce0] dark:border-[#3c4043]">
          <h3 className="font-google-sans text-lg font-medium text-[#202124] dark:text-[#f1f3f4]">Share this story</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-[#5f6368] dark:text-[#9aa0a6] hover:bg-[#f1f3f4] dark:hover:bg-[#303134] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-sm text-[#5f6368] dark:text-[#bdc1c6] mt-3 mb-4 line-clamp-2">{title}</p>

        {/* Social Share Buttons */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          <button
            onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank')}
            className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl border border-[#dadce0] dark:border-[#3c4043] hover:bg-[#f8f9fa] dark:hover:bg-[#303134] transition-colors text-xs font-medium text-[#3c4043] dark:text-[#e8eaed] cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-[#1da1f2]/10 flex items-center justify-center text-[#1da1f2]">
              <Twitter className="w-4 h-4" />
            </div>
            X (Twitter)
          </button>
          <button
            onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank')}
            className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl border border-[#dadce0] dark:border-[#3c4043] hover:bg-[#f8f9fa] dark:hover:bg-[#303134] transition-colors text-xs font-medium text-[#3c4043] dark:text-[#e8eaed] cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-[#0a66c2]/10 flex items-center justify-center text-[#0a66c2]">
              <Linkedin className="w-4 h-4" />
            </div>
            LinkedIn
          </button>
          <button
            onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank')}
            className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl border border-[#dadce0] dark:border-[#3c4043] hover:bg-[#f8f9fa] dark:hover:bg-[#303134] transition-colors text-xs font-medium text-[#3c4043] dark:text-[#e8eaed] cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-[#1877f2]/10 flex items-center justify-center text-[#1877f2]">
              <Facebook className="w-4 h-4" />
            </div>
            Facebook
          </button>
        </div>

        {/* Copy Link Input */}
        <div className="flex items-center gap-2 p-2 bg-[#f8f9fa] dark:bg-[#303134] border border-[#dadce0] dark:border-[#3c4043] rounded-xl">
          <Link2 className="w-4 h-4 text-[#5f6368] dark:text-[#9aa0a6] ml-2 shrink-0" />
          <input
            type="text"
            readOnly
            value={url}
            className="bg-transparent text-xs text-[#3c4043] dark:text-[#e8eaed] focus:outline-none w-full truncate"
          />
          <button
            onClick={handleCopy}
            className="bg-[#1a73e8] hover:bg-[#1557b0] text-white px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors shrink-0 cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                Copied
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                Copy
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
