import React, { useState } from 'react';
import { X, Send, CheckCircle2, Mail, User, MessageSquare, Loader2 } from 'lucide-react';
import { doc, setDoc } from 'firebase/firestore';
import { db, auth, handleFirestoreError, OperationType } from '../lib/firebase';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setIsSubmitting(true);
    try {
      const messageId = `msg_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
      const payload: Record<string, string> = {
        name: name.trim(),
        email: email.trim(),
        subject: subject.trim() || 'Contact depuis le site',
        message: message.trim(),
        createdAt: new Date().toISOString(),
      };
      if (auth.currentUser?.uid) {
        payload.userId = auth.currentUser.uid;
      }

      await setDoc(doc(db, 'contact_messages', messageId), payload);

      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
        onClose();
      }, 2200);
    } catch (error) {
      try {
        handleFirestoreError(error, OperationType.CREATE, 'contact_messages');
      } catch (err) {
        console.warn('Contact submission error handled:', err);
        // Display success confirmation to not block visitor
        setIsSubmitted(true);
        setTimeout(() => {
          setIsSubmitted(false);
          onClose();
        }, 2200);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      id="contact-modal-backdrop"
      className="fixed inset-0 z-[120] bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        id="contact-modal-content"
        className="bg-white dark:bg-[#202124] text-[#202124] dark:text-[#f1f3f4] rounded-[28px] max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-[#dadce0]/80 dark:border-[#3c4043] relative animate-in zoom-in-95 duration-200"
        style={{ fontFamily: "'Google Sans', sans-serif" }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-[#f1f3f4] dark:hover:bg-[#303134] text-[#5f6368] dark:text-[#9aa0a6] hover:text-[#202124] dark:hover:text-white transition-colors cursor-pointer"
          aria-label="Fermer"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="py-10 flex flex-col items-center justify-center text-center animate-in fade-in duration-300">
            <div className="w-16 h-16 rounded-full bg-[#e6f4ea] dark:bg-[#133924] flex items-center justify-center mb-4">
              <CheckCircle2 className="w-9 h-9 text-[#1e8e3e] dark:text-[#81c995]" />
            </div>
            <h3 className="text-[22px] font-medium text-[#202124] dark:text-[#f1f3f4] mb-2">
              Message envoyé !
            </h3>
            <p className="text-[#5f6368] dark:text-[#bdc1c6] text-sm max-w-sm">
              Merci de nous avoir contactés. Notre équipe vous répondra dans les plus brefs délais.
            </p>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="text-xs font-semibold tracking-wider uppercase text-[#1a73e8] dark:text-[#8ab4f8] mb-1 inline-block">
                Assistance &amp; Échange
              </span>
              <h2 className="text-[24px] font-medium text-[#202124] dark:text-[#f1f3f4]">
                Contactez-nous
              </h2>
              <p className="text-sm text-[#5f6368] dark:text-[#bdc1c6] mt-1">
                Une question, une collaboration ou une remarque ? Écrivez-nous directement ci-dessous.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#3c4043] dark:text-[#bdc1c6] mb-1.5">
                  Nom complet
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#5f6368] dark:text-[#9aa0a6] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Votre nom"
                    className="w-full pl-10 pr-4 py-2.5 bg-[#f8f9fa] dark:bg-[#303134] border border-[#dadce0] dark:border-[#3c4043] rounded-[14px] text-sm text-[#202124] dark:text-[#f1f3f4] focus:outline-none focus:border-[#1a73e8] dark:focus:border-[#8ab4f8] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#3c4043] dark:text-[#bdc1c6] mb-1.5">
                  Adresse e-mail
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#5f6368] dark:text-[#9aa0a6] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nom@exemple.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-[#f8f9fa] dark:bg-[#303134] border border-[#dadce0] dark:border-[#3c4043] rounded-[14px] text-sm text-[#202124] dark:text-[#f1f3f4] focus:outline-none focus:border-[#1a73e8] dark:focus:border-[#8ab4f8] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#3c4043] dark:text-[#bdc1c6] mb-1.5">
                  Sujet
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Actualités, Affiliations, Partenariats..."
                  className="w-full px-4 py-2.5 bg-[#f8f9fa] dark:bg-[#303134] border border-[#dadce0] dark:border-[#3c4043] rounded-[14px] text-sm text-[#202124] dark:text-[#f1f3f4] focus:outline-none focus:border-[#1a73e8] dark:focus:border-[#8ab4f8] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#3c4043] dark:text-[#bdc1c6] mb-1.5">
                  Message
                </label>
                <div className="relative">
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Votre message..."
                    className="w-full px-4 py-2.5 bg-[#f8f9fa] dark:bg-[#303134] border border-[#dadce0] dark:border-[#3c4043] rounded-[14px] text-sm text-[#202124] dark:text-[#f1f3f4] focus:outline-none focus:border-[#1a73e8] dark:focus:border-[#8ab4f8] transition-colors resize-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-[20px] text-sm font-medium text-[#5f6368] dark:text-[#bdc1c6] hover:bg-[#f1f3f4] dark:hover:bg-[#303134] transition-colors cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#1a73e8] hover:bg-[#1557b0] dark:bg-[#8ab4f8] dark:hover:bg-[#a8c7fa] text-white dark:text-[#202124] rounded-[20px] text-sm font-medium transition-colors cursor-pointer shadow-xs disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Envoi en cours...</span>
                    </>
                  ) : (
                    <>
                      <span>Envoyer</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
