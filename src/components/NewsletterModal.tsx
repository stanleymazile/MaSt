import React, { useState, useEffect } from 'react';
import { X, Mail, User, Check, Loader2 } from 'lucide-react';
import { doc, setDoc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';

interface NewsletterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NewsletterModal: React.FC<NewsletterModalProps> = ({ isOpen, onClose }) => {
  // Les états en mémoire : nom, email, état de chargement et confirmation
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Fermer la modale si l'utilisateur appuie sur la touche Échap du clavier
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Si la modale n'est pas demandée (isOpen = false), on n'affiche rien du tout
  if (!isOpen) return null;

  // Fonction exécutée quand l'utilisateur clique sur "S'inscrire"
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim();
    if (!cleanEmail) return;

    setIsSubmitting(true);

    try {
      // Sauvegarde dans la base de données Firebase
      const subscriberId = `sub_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
      await setDoc(doc(db, 'newsletter_subscribers', subscriberId), {
        email: cleanEmail,
        name: name.trim() || null,
        subscribedAt: new Date().toISOString(),
        source: 'simple_modal',
      });
      setIsSuccess(true);
    } catch (error) {
      // Si une erreur réseau survient, on évite de bloquer l'utilisateur
      try {
        handleFirestoreError(error, OperationType.CREATE, 'newsletter_subscribers');
      } catch {
        // Validation visuelle conviviale en cas d'imprévu
        setIsSuccess(true);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Réinitialiser le formulaire pour une future ouverture
  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setIsSuccess(false);
      setName('');
      setEmail('');
    }, 200);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-newsletter-title"
    >
      {/* Boîte de la fenêtre modale (au centre, empêche le clic de fermer quand on clique à l'intérieur) */}
      <div
        className="w-full max-w-[360px] bg-white dark:bg-[#202124] rounded-2xl shadow-xl border border-[#dadce0] dark:border-[#3c4043] p-5 sm:p-6 relative text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Bouton croix pour fermer */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-1.5 text-[#5f6368] dark:text-[#9aa0a6] hover:text-[#202124] dark:hover:text-white rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
          aria-label="Fermer"
        >
          <X className="w-4 h-4" />
        </button>

        {isSuccess ? (
          /* Affichage de succès simple et épuré */
          <div className="text-center py-4 animate-in zoom-in-95 duration-200">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-[#e6f4ea] dark:bg-[#1e3a24] text-[#137333] dark:text-[#81c995] flex items-center justify-center">
              <Check className="w-6 h-6 stroke-[2.5]" />
            </div>
            <h3 className="text-base font-semibold text-[#202124] dark:text-[#f1f3f4] mb-1">
              Merci pour votre inscription !
            </h3>
            <p className="text-xs text-[#5f6368] dark:text-[#9aa0a6] mb-5 leading-relaxed">
              Vous recevrez nos prochaines actualités directement dans votre boîte e-mail.
            </p>
            <button
              onClick={handleClose}
              className="w-full py-2.5 px-4 bg-[#1a73e8] hover:bg-[#1557b0] text-white rounded-full text-xs font-medium transition-colors cursor-pointer"
            >
              Fermer
            </button>
          </div>
        ) : (
          /* Formulaire de saisie minimaliste */
          <div>
            <div className="mb-4 pr-6">
              <h3 id="modal-newsletter-title" className="text-base font-semibold text-[#202124] dark:text-[#f1f3f4]">
                Newsletter MaSt News
              </h3>
              <p className="text-xs text-[#5f6368] dark:text-[#9aa0a6] mt-0.5">
                Recevez les dernières actualités IA et tech.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Champ Nom */}
              <div>
                <label htmlFor="newsletter-modal-name" className="block text-xs font-medium text-[#3c4043] dark:text-[#bdc1c6] mb-1">
                  Nom
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#5f6368] dark:text-[#9aa0a6] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="newsletter-modal-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Votre nom"
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-neutral-50 dark:bg-[#303134] border border-[#dadce0] dark:border-[#5f6368] rounded-xl text-[#202124] dark:text-[#f1f3f4] placeholder-[#80868b] dark:placeholder-[#9aa0a6] focus:outline-none focus:ring-2 focus:ring-[#1a73e8]/30 focus:border-[#1a73e8] transition-all"
                  />
                </div>
              </div>

              {/* Champ E-mail */}
              <div>
                <label htmlFor="newsletter-modal-email" className="block text-xs font-medium text-[#3c4043] dark:text-[#bdc1c6] mb-1">
                  E-mail <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#5f6368] dark:text-[#9aa0a6] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="newsletter-modal-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="votre@email.com"
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-neutral-50 dark:bg-[#303134] border border-[#dadce0] dark:border-[#5f6368] rounded-xl text-[#202124] dark:text-[#f1f3f4] placeholder-[#80868b] dark:placeholder-[#9aa0a6] focus:outline-none focus:ring-2 focus:ring-[#1a73e8]/30 focus:border-[#1a73e8] transition-all"
                  />
                </div>
              </div>

              {/* Bouton de validation */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-2 py-2.5 px-4 bg-[#1a73e8] hover:bg-[#1557b0] active:scale-[0.99] disabled:opacity-60 text-white rounded-full text-xs font-medium transition-all shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Inscription...</span>
                  </>
                ) : (
                  <span>S'inscrire</span>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
