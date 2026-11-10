import React, { useEffect } from 'react';
import SectionHeading from '../components/common/SectionHeading';
import BrainWatermark from '../components/animations/BrainWatermark';
import { Mail, Phone, MapPin, ExternalLink, Clock } from 'lucide-react';
import PrimaryButton from '../components/buttons/PrimaryButton';

export default function Contact() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="py-12 md:py-20 relative">
      <BrainWatermark mode="watermark" />
      <div className="wrap relative z-10">
        <SectionHeading
          eyebrow="Reach Us"
          title="Contact"
          highlightWord="&amp; Location"
          subtitle="Get in touch with the CONFLUENCE 2026 Organising Secretariat at Seth GS Medical College & KEM Hospital, Mumbai."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          <div className="lg:col-span-6 space-y-6">
            <div className="card-glass p-7 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/[0.08] flex items-center justify-center text-confluence-sky flex-shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-lg text-white mb-1">
                  Conference Secretariat Venue
                </h4>
                <p className="text-muted text-sm leading-relaxed mb-2">
                  Seth GS Medical College &amp; King Edward VII Memorial Hospital, Acharya Donde Marg, Parel, Mumbai, Maharashtra 400012, India.
                </p>
                <span className="text-xs text-confluence-sky">Nearest Railway Station: Parel / Prabhadevi / Dadar</span>
              </div>
            </div>

            <div className="card-glass p-7 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/[0.08] flex items-center justify-center text-confluence-sky flex-shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-lg text-white mb-1">
                  Email Correspondence
                </h4>
                <p className="text-muted text-sm leading-relaxed mb-2">
                  For delegate enquiries, scientific submissions, and sponsorship:
                </p>
                <a href="mailto:confluence.gsmc@gmail.com" className="text-confluence-sky font-semibold hover:underline text-sm">
                  confluence.gsmc@gmail.com
                </a>
              </div>
            </div>

            <div className="card-glass p-7 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/[0.08] flex items-center justify-center text-confluence-sky flex-shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-lg text-white mb-1">
                  Secretariat Helpline
                </h4>
                <p className="text-muted text-sm leading-relaxed mb-2">
                  Office Hours: Monday to Friday (9:00 AM - 5:00 PM IST)
                </p>
                <span className="text-white font-semibold text-sm">+91 22 2410 7000</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 card-glass p-7 md:p-8 flex flex-col justify-between">
            <div>
              <h3 className="font-heading font-bold text-2xl text-white mb-2">
                Send an Enquiry
              </h3>
              <p className="text-muted text-sm leading-relaxed mb-6">
                Have questions regarding registration, paper submissions, or travel accommodation in Mumbai? Drop our delegate support team a message.
              </p>

              <form onSubmit={(e) => { e.preventDefault(); alert('Thank you for contacting CONFLUENCE 2026. The organizing committee will get back to you shortly.'); }} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-confluence-sky uppercase tracking-wider mb-1.5">Your Full Name</label>
                  <input type="text" required placeholder="Dr. / Medical Student Name" className="w-full px-4 py-3 rounded-xl bg-white/[0.08] border border-white/[0.16] text-white text-sm focus:outline-none focus:border-confluence-sky" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-confluence-sky uppercase tracking-wider mb-1.5">Email Address</label>
                  <input type="email" required placeholder="name@college.edu" className="w-full px-4 py-3 rounded-xl bg-white/[0.08] border border-white/[0.16] text-white text-sm focus:outline-none focus:border-confluence-sky" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-confluence-sky uppercase tracking-wider mb-1.5">College / Institution</label>
                  <input type="text" required placeholder="Seth GSMC / AIIMS / Medical College" className="w-full px-4 py-3 rounded-xl bg-white/[0.08] border border-white/[0.16] text-white text-sm focus:outline-none focus:border-confluence-sky" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-confluence-sky uppercase tracking-wider mb-1.5">Message / Query</label>
                  <textarea rows="3" required placeholder="Inquire about workshops, delegate cards, or competition rules..." className="w-full px-4 py-3 rounded-xl bg-white/[0.08] border border-white/[0.16] text-white text-sm focus:outline-none focus:border-confluence-sky resize-none" />
                </div>
                <PrimaryButton type="submit" className="w-full mt-2">
                  Submit Enquiry
                </PrimaryButton>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

