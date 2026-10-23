import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#141512] text-[#F4F2E9] py-16 px-6 sm:px-12 lg:px-16 mt-auto">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-12 border-b border-[#F4F2E9]/20">
        {/* Brand Info */}
        <div className="lg:col-span-2">
          <Link to="/" className="font-['Anton'] text-4xl text-[#F4F2E9] tracking-wider uppercase mb-3 inline-block">
            ZUNO
          </Link>
          <p className="font-['Inter'] text-sm text-[#DADCD3]/80 max-w-sm leading-relaxed mb-6">
            Curadoria musical para quem nunca termina de descobrir música. Clássicos, novidades e objetos da cena.
          </p>
          <div className="font-['IBM_Plex_Mono'] text-[11px] text-[#C5F43B] uppercase tracking-wider">
            FORTALEZA · BRASIL · 2026
          </div>
        </div>

        {/* Explore Column */}
        <div>
          <h4 className="font-['IBM_Plex_Mono'] text-xs uppercase tracking-wider font-semibold text-[#F4F2E9] mb-4">
            EXPLORE
          </h4>
          <ul className="space-y-2.5 font-['Inter'] text-sm text-[#DADCD3]/80">
            <li>
              <Link to="/discos" className="hover:text-[#C5F43B]">
                Todos os discos
              </Link>
            </li>
            <li>
              <Link to="/discos?tab=new" className="hover:text-[#C5F43B]">
                Novidades
              </Link>
            </li>
            <li>
              <Link to="/discos?tab=featured" className="hover:text-[#C5F43B]">
                Em destaque
              </Link>
            </li>
            <li>
              <Link to="/objetos" className="hover:text-[#C5F43B]">
                Objetos da cena
              </Link>
            </li>
            <li>
              <Link to="/newsletter" className="hover:text-[#C5F43B]">
                Carta da Estante (Newsletter)
              </Link>
            </li>
          </ul>
        </div>

        {/* Conte com a gente */}
        <div>
          <h4 className="font-['IBM_Plex_Mono'] text-xs uppercase tracking-wider font-semibold text-[#F4F2E9] mb-4">
            CONTE COM A GENTE
          </h4>
          <ul className="space-y-2.5 font-['Inter'] text-sm text-[#DADCD3]/80">
            <li>
              <span className="hover:text-[#C5F43B] cursor-pointer">Entrega e frete</span>
            </li>
            <li>
              <span className="hover:text-[#C5F43B] cursor-pointer">Trocas e devoluções</span>
            </li>
            <li>
              <span className="hover:text-[#C5F43B] cursor-pointer">Fale com a curadoria</span>
            </li>
          </ul>
        </div>

        {/* A cena continua */}
        <div>
          <h4 className="font-['IBM_Plex_Mono'] text-xs uppercase tracking-wider font-semibold text-[#F4F2E9] mb-4">
            A MÚSICA CONTINUA
          </h4>
          <div className="space-y-2.5 font-['IBM_Plex_Mono'] text-xs text-[#DADCD3]/80 leading-relaxed">
            <p className="text-[#C5F43B]">contato@zuno.com.br</p>
            <p>PIX e cartão em até 3x sem juros</p>
            <p>Seg a Sex · 10h às 18h</p>
          </div>
        </div>
      </div>

      {/* Bottom copyright line */}
      <div className="max-w-[1440px] mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-['IBM_Plex_Mono'] text-[11px] text-[#DADCD3]/60">
        <p>© 2026 ZUNO · TODOS OS DIREITOS RESERVADOS</p>
      </div>
    </footer>
  );
}
