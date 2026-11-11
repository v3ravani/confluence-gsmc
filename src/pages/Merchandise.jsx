import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShoppingBag, Package, Shirt } from 'lucide-react';
import BrainWatermark from '../components/animations/BrainWatermark';
import MobilePageHero from '../components/common/MobilePageHero';
import SectionHeading from '../components/common/SectionHeading';

// ── Configurable placeholder content ────────────────────────────────────────
const merchandiseInfo = {
  intro: 'The official CONFLUENCE 2026 merchandise collection features premium conference apparel and delegate items. Actual product details, pricing and ordering information will be released with the official brochure.',
  note:  'Merchandise pricing, size availability and pre-order windows will be announced shortly. Items can be collected at the GSMC registration desk or shipped to your address.',
  items: [
    { id: 1, title: 'Conference Hoodie', tag: 'Apparel', desc: 'Bio-washed premium hoodie with the official CONFLUENCE 2026 emblem. Available in multiple sizes.' },
    { id: 2, title: 'Delegate T-Shirt', tag: 'Apparel', desc: 'Comfortable graphic tee for CONFLUENCE 2026 delegates. Included in selected delegate packages.' },
    { id: 3, title: 'Clinical Scrubs Set', tag: 'Clinical Wear', desc: 'Official CONFLUENCE 2026 scrubs for workshop participants. Limited quantities available.' },
    { id: 4, title: 'Delegate Kit Bag', tag: 'Accessories', desc: 'Premium tote bag with conference essentials: notebook, pen, lanyard and event schedule.' },
    { id: 5, title: 'Stationery Collection', tag: 'Stationery', desc: 'Notebook, branded pen set and sticky-note pads with the CONFLUENCE 2026 visual identity.' },
    { id: 6, title: 'Collectible Pin Set', tag: 'Collectibles', desc: 'Limited-edition enamel pin set featuring the CONFLUENCE emblem and medical motifs.' },
  ],
};

function MerchCard({ item }) {
  return (
    <div className="rounded-2xl bg-[#ece1cf] border border-[rgba(100,85,70,0.18)] p-6 group shadow-sm hover:shadow-md hover:border-[#2d508a] transition-all duration-300">
      <span className="inline-block text-[10px] font-semibold tracking-[0.18em] uppercase text-[#913433] mb-3">
        {item.tag}
      </span>
      <h3 className="font-heading font-extrabold text-[#121110] text-base md:text-lg mb-2 leading-snug group-hover:text-[#2d508a] transition-colors">
        {item.title}
      </h3>
      <p className="text-sm text-[#2d2b28] leading-relaxed">{item.desc}</p>
      <div className="mt-4 pt-4 border-t border-[rgba(100,85,70,0.14)]">
        <span className="text-[11px] font-semibold text-[#6b6459] uppercase tracking-wider">
          Price TBA · Pre-order available soon
        </span>
      </div>
    </div>
  );
}

export default function Merchandise() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="pt-0 pb-12 md:py-20 relative min-h-screen">
      <BrainWatermark mode="watermark" />
      <MobilePageHero title="MERCHANDISE" />
      <div className="wrap relative z-10">
        <Link to="/" className="hidden md:inline-flex items-center gap-2 text-sm text-[#6b6459] hover:text-[#121110] transition-colors mb-8 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        <SectionHeading
          eyebrow="Official Store"
          title="Conference"
          highlightWord="Merchandise"
          subtitle={merchandiseInfo.intro}
        />

        <div className="grid grid-cols-3 gap-4 mb-12 max-w-lg">
          {[
            { icon: <Shirt className="w-4 h-4" />, label: 'Apparel', val: '3+ Items' },
            { icon: <Package className="w-4 h-4" />, label: 'Accessories', val: '3+ Items' },
            { icon: <ShoppingBag className="w-4 h-4" />, label: 'Pre-order', val: 'Soon' },
          ].map(s => (
            <div key={s.label} className="p-4 text-center rounded-xl bg-[#ece1cf] border border-[rgba(100,85,70,0.18)] shadow-xs">
              <div className="text-[#2d508a] flex justify-center mb-1">{s.icon}</div>
              <b className="font-heading text-[#121110] text-lg block">{s.val}</b>
              <span className="text-[10px] text-[#6b6459] uppercase tracking-wider font-semibold">{s.label}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {merchandiseInfo.items.map(item => <MerchCard key={item.id} item={item} />)}
        </div>

        <div className="p-5 rounded-2xl bg-[#ece1cf] border border-[rgba(100,85,70,0.18)] flex items-start gap-3">
          <span className="text-[#913433] mt-0.5 flex-shrink-0">✦</span>
          <p className="text-sm text-[#2d2b28] leading-relaxed">{merchandiseInfo.note}</p>
        </div>
      </div>
    </div>
  );
}
