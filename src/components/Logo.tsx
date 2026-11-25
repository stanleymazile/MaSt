export function LogoMark({ className = "h-[31px] w-[31px]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false" className={className}>
      <path d="M8 37V13l9 10" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M24 13 17.5 26.5h4.5L19.5 37 29.5 22.5h-4.7z" fill="#fff" />
      <path d="M31 23l9-10v24" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function LogoBadge() {
  return (
    <span className="inline-flex h-10 w-10 flex-none rotate-[-4deg] items-center justify-center rounded-[10px] bg-[linear-gradient(140deg,#a100ff_0%,#7b00e0_55%,#5800ad_100%)] shadow-[inset_0_0_0_2px_rgba(255,255,255,.35),0_2px_6px_rgba(0,0,0,.3)]">
      <LogoMark />
    </span>
  );
}

export function LogoTexte({ avecBaseline = false }: { avecBaseline?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <LogoBadge />
      <span className="font-display text-[30px] font-black leading-none tracking-[-0.5px] text-white">
        Ma<span className="text-[#e2c6ff]">St</span>
        {avecBaseline && (
          <small className="mt-0.5 hidden text-[10.5px] font-bold uppercase tracking-[1.6px] min-[720px]:block">
            Ciné · Tech · IA · Sport
          </small>
        )}
      </span>
    </span>
  );
}
