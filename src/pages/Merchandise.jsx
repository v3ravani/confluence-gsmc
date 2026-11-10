import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShoppingBag, Package, Shirt } from 'lucide-react';
import BrainWatermark from '../components/animations/BrainWatermark';
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
    <div className="card-glass p-6 group">
      <span className="inline-block text-[10px] font-semibold tracking-[0.18em] uppercase
                       text-[var(--accent-blush)] mb-3">
        {item.tag}
      </span>
      <h3 className="font-heading font-bold text-white text-base md:text-lg mb-2 leading-snug
                     group-hover:text-[var(--dusty-200)] transition-colors">
        {item.title}
      </h3>
      <p className="text-sm text-[var(--muted)] leading-relaxed">{item.desc}</p>
      <div className="mt-4 pt-4 border-t border-[rgba(196,216,232,0.10)]">
        <span className="text-[11px] font-semibold text-[var(--dusty-400)] uppercase tracking-wider">
          Price TBA · Pre-order available soon
        </span>
      </div>
    </div>
  );
}

export default function Merchandise() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="py-12 md:py-20 relative min-h-screen">
      <BrainWatermark mode="watermark" />
      <div className="wrap relative z-10">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-[var(--dusty-400)]
                                hover:text-white transition-colors mb-8 group">
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
            <div key={s.label} className="card-glass p-4 text-center">
              <div className="text-[var(--blush-300)] flex justify-center mb-1">{s.icon}</div>
              <b className="font-heading text-white text-lg block">{s.val}</b>
              <span className="text-[10px] text-[var(--muted)] uppercase tracking-wider">{s.label}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {merchandiseInfo.items.map(item => <MerchCard key={item.id} item={item} />)}
        </div>

        <div className="p-5 rounded-2xl bg-[rgba(74,106,138,0.08)] border border-[rgba(196,216,232,0.14)]
                        flex items-start gap-3">
          <span className="text-[var(--accent-blush)] mt-0.5 flex-shrink-0">✦</span>
          <p className="text-sm text-[var(--muted)] leading-relaxed">{merchandiseInfo.note}</p>
        </div>
      </div>
    </div>
  );
}
