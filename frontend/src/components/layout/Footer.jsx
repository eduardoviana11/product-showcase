import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#141512] text-[#F4F2E9] py-10 px-6 sm:px-12 lg:px-16 mt-auto border-t-2 border-[#141512]">
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        {/* Brand & Study Project Info */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
          <Link
            to="/"
            className="font-['Anton'] text-3xl text-[#F4F2E9] tracking-wider uppercase leading-none hover:text-[#C5F43B] transition-colors"
          >
            ZUNO
          </Link>
          <p className="font-['Inter'] text-xs sm:text-sm text-[#DADCD3]/80">
            Projeto de estudos de vitrine de discos e objetos musicais.
          </p>
        </div>

        {/* Author & GitHub Link */}
        <div className="font-['IBM_Plex_Mono'] text-xs text-[#DADCD3]/90 flex flex-wrap items-center gap-1.5">
          <span>Desenvolvido por</span>
          <a
            href="https://github.com/eduardoviana11"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#C5F43B] font-semibold underline underline-offset-4 hover:text-white transition-colors"
          >
            Eduardo Viana
          </a>
        </div>
      </div>
    </footer>
  );
}
