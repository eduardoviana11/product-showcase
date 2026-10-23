import React, { useState } from 'react';
import Button from '../components/ui/Button';

export default function Newsletter({ onAddToCart }) {
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const premiumProduct = {
    name: 'CARTA DA ESTANTE PREMIUM',
    price: 29.9,
    formatted_price: 'R$ 29,90',
    type: 'subscription',
  };

  const handleFreeSubscribe = (e) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
      setEmailInput('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 py-12 lg:py-16">
      {/* Header */}
      <div className="mb-12 pb-6 border-b-2 border-[#141512]">
        <span className="font-['IBM_Plex_Mono'] text-xs font-semibold text-[#141512] uppercase tracking-[0.08em] block mb-2">
          PUBLICAÇÃO DIGITAL & CURADORIA · CARTA DA ESTANTE
        </span>
        <h1 className="font-['Anton'] text-5xl sm:text-7xl text-[#141512] uppercase tracking-wide leading-none">
          A MÚSICA EM PROFUNDIDADE.
        </h1>
        <p className="font-['Inter'] text-base sm:text-lg text-[#141512]/80 mt-3 max-w-2xl leading-relaxed">
          Sem algoritmos, sem ruído. Uma leitura quinzenal com ensaios sobre gravações históricas, bastidores de estúdio e recomendações que você não encontra em playlists automáticas.
        </p>
      </div>

      {/* Plans Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch mb-16">
        {/* Free Plan */}
        <div className="bg-[#DADCD3] border-2 border-[#141512] p-8 flex flex-col justify-between">
          <div>
            <span className="font-['IBM_Plex_Mono'] text-xs font-semibold uppercase tracking-wider text-[#141512] block mb-2">
              PLANO GRATUITO
            </span>
            <h2 className="font-['Anton'] text-3xl uppercase tracking-wide text-[#141512] mb-2">
              CARTA DA ESTANTE BÁSICA
            </h2>
            <div className="font-['IBM_Plex_Mono'] text-2xl font-bold text-[#141512] mb-6">
              R$ 0,00 <span className="text-xs font-normal">/ para sempre</span>
            </div>

            <ul className="space-y-3 font-['Inter'] text-sm text-[#141512]/85 mb-8">
              <li className="flex items-center gap-2">
                <span className="font-bold text-[#141512]">✓</span> Edição quinzenal com destaques do mês
              </li>
              <li className="flex items-center gap-2">
                <span className="font-bold text-[#141512]">✓</span> Agenda de lançamentos físicos
              </li>
              <li className="flex items-center gap-2">
                <span className="font-bold text-[#141512]">✓</span> Acesso aos artigos da Revista ZUNO
              </li>
            </ul>
          </div>

          <div>
            {subscribed ? (
              <div className="bg-[#141512] text-[#F4F2E9] p-4 text-center font-['IBM_Plex_Mono'] text-xs uppercase font-semibold">
                ✓ Inscrição confirmada na versão gratuita!
              </div>
            ) : (
              <form onSubmit={handleFreeSubscribe} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="voce@exemplo.com.br"
                  className="flex-grow bg-[#F4F2E9] border-2 border-[#141512] px-4 py-3 font-['IBM_Plex_Mono'] text-xs text-[#141512] placeholder-[#141512]/50 focus:bg-white focus:outline-none"
                />
                <Button variant="dark" size="md" type="submit">
                  Inscrever Grátis
                </Button>
              </form>
            )}
          </div>
        </div>

        {/* Premium Paid Plan */}
        <div className="bg-[#141512] text-[#F4F2E9] border-2 border-[#141512] p-8 flex flex-col justify-between shadow-[8px_8px_0px_#C5F43B] relative overflow-hidden">
          <div className="absolute top-4 right-4 bg-[#C5F43B] text-[#141512] px-3 py-1 font-['IBM_Plex_Mono'] text-[10px] uppercase font-bold tracking-widest">
            MAIS POPULAR
          </div>

          <div>
            <span className="font-['IBM_Plex_Mono'] text-xs font-semibold uppercase tracking-wider text-[#C5F43B] block mb-2">
              ASSINATURA PREMIUM
            </span>
            <h2 className="font-['Anton'] text-3xl uppercase tracking-wide text-[#F4F2E9] mb-2">
              CARTA DA ESTANTE PREMIUM
            </h2>
            <div className="font-['IBM_Plex_Mono'] text-3xl font-bold text-[#C5F43B] mb-6">
              R$ 29,90 <span className="text-xs text-[#DADCD3]/70 font-normal">/ mês · cancelamento a qualquer momento</span>
            </div>

            <ul className="space-y-3 font-['Inter'] text-sm text-[#DADCD3]/90 mb-8">
              <li className="flex items-center gap-2">
                <span className="font-bold text-[#C5F43B]">✓</span> Todas as vantagens do plano gratuito
              </li>
              <li className="flex items-center gap-2">
                <span className="font-bold text-[#C5F43B]">✓</span> Ensaios inéditos e análises faixa-a-faixa exclusivas
              </li>
              <li className="flex items-center gap-2">
                <span className="font-bold text-[#C5F43B]">✓</span> Reserva antecipada em tiragens limitadas de vinil
              </li>
              <li className="flex items-center gap-2">
                <span className="font-bold text-[#C5F43B]">✓</span> 10% de desconto permanente em todo o acervo de discos
              </li>
              <li className="flex items-center gap-2">
                <span className="font-bold text-[#C5F43B]">✓</span> Envio quinzenal direto para sua caixa de entrada
              </li>
            </ul>
          </div>

          <div>
            <Button
              variant="primary"
              size="lg"
              className="w-full"
              onClick={() => onAddToCart && onAddToCart(premiumProduct)}
            >
              Assinar Plano Premium (R$ 29,90) ↗
            </Button>
            <p className="font-['IBM_Plex_Mono'] text-[10px] text-[#DADCD3]/60 text-center mt-3 uppercase tracking-wider">
              Cobrança mensal segura · Sem fidelidade
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
