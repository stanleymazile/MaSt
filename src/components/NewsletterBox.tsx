import React, { useState } from 'react';
import { Check, Mail } from 'lucide-react';

export const NewsletterBox: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail('');
      }, 4000);
    }
  };

  return (
    <div id="newsletter-section" className="bg-[#f8f9fa] dark:bg-[#202124] rounded-2xl p-8 mt-16 text-center border border-[#dadce0] dark:border-[#3c4043] transition-colors">
      <h3 className="font-google-sans text-xl font-medium text-[#202124] dark:text-[#f1f3f4]">
        Get the latest news from Google in your inbox
      </h3>
      <p className="text-sm text-[#5f6368] dark:text-[#9aa0a6] mt-2 mb-6 max-w-md mx-auto">
        Sign up for our newsletters with product updates, event information, special offers, and more.
      </p>

      {subscribed ? (
        <div className="bg-[#e6f4ea] dark:bg-[#1e3a24] text-[#137333] dark:text-[#81c995] px-6 py-3 rounded-full text-sm font-medium inline-flex items-center gap-2 animate-in zoom-in-95">
          <Check className="w-4 h-4" />
          Thank you! You're subscribed to Google News updates.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-[450px] mx-auto">
          <div className="relative flex-1">
            <Mail className="w-4 h-4 text-[#5f6368] dark:text-[#9aa0a6] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              required
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full py-2.5 pl-10 pr-4 border border-[#dadce0] dark:border-[#5f6368] rounded-full text-sm text-[#202124] dark:text-[#f1f3f4] focus:outline-none focus:border-[#1a73e8] focus:ring-1 focus:ring-[#1a73e8] bg-white dark:bg-[#303134]"
            />
          </div>
          <button
            type="submit"
            className="bg-[#1a73e8] hover:bg-[#1557b0] active:bg-[#174ea6] text-white px-6 py-2.5 rounded-full font-google-sans text-sm font-medium transition-colors shadow-sm cursor-pointer whitespace-nowrap"
          >
            Subscribe
          </button>
        </form>
      )}
    </div>
  );
};
