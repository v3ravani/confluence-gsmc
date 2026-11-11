import React, { useEffect } from 'react';
import SectionHeading from '../components/common/SectionHeading';
import BrainWatermark from '../components/animations/BrainWatermark';
import MobilePageHero from '../components/common/MobilePageHero';
import { Mail, Phone, MapPin, ExternalLink, Clock } from 'lucide-react';
import PrimaryButton from '../components/buttons/PrimaryButton';

export default function Contact() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-0 pb-12 md:py-20 relative">
      <BrainWatermark mode="watermark" />
      <MobilePageHero title="CONTACT" />
      <div className="wrap relative z-10">
        <SectionHeading
          eyebrow="Reach Us"
          title="Contact"
          highlightWord="&amp; Location"
          subtitle="Get in touch with the CONFLUENCE 2026 Organising Secretariat at Seth GS Medical College & KEM Hospital, Mumbai."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          <div className="lg:col-span-6 space-y-6">
            <div className="rounded-2xl bg-[#ece1cf] dark:bg-[#2B2D30] border border-[rgba(100,85,70,0.18)] dark:border-[#3B3D41] p-7 flex items-start gap-4 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-[#f7f1e6] dark:bg-[#323438] border border-[rgba(100,85,70,0.20)] dark:border-[#3B3D41] flex items-center justify-center text-[#913433] dark:text-[#F14666] flex-shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-heading font-extrabold text-lg text-[#121110] dark:text-[#F2F0ED] mb-1">
                  Conference Secretariat Venue
                </h4>
                <p className="text-[#2d2b28] dark:text-[#B5B3B0] text-sm leading-relaxed mb-2">
                  Seth GS Medical College &amp; King Edward VII Memorial Hospital, Acharya Donde Marg, Parel, Mumbai, Maharashtra 400012, India.
                </p>
                <span className="text-xs text-[#913433] dark:text-[#F14666] font-medium">Nearest Railway Station: Parel / Prabhadevi / Dadar</span>
              </div>
            </div>

            <div className="rounded-2xl bg-[#ece1cf] dark:bg-[#2B2D30] border border-[rgba(100,85,70,0.18)] dark:border-[#3B3D41] p-7 flex items-start gap-4 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-[#f7f1e6] dark:bg-[#323438] border border-[rgba(100,85,70,0.20)] dark:border-[#3B3D41] flex items-center justify-center text-[#913433] dark:text-[#F14666] flex-shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-heading font-extrabold text-lg text-[#121110] dark:text-[#F2F0ED] mb-1">
                  Email Correspondence
                </h4>
                <p className="text-[#2d2b28] dark:text-[#B5B3B0] text-sm leading-relaxed mb-2">
                  For delegate enquiries, scientific submissions, and sponsorship:
                </p>
                <a href="mailto:confluence.gsmc@gmail.com" className="text-[#913433] dark:text-[#F14666] hover:text-[#782827] dark:hover:text-[#EE9590] font-semibold hover:underline text-sm">
                  confluence.gsmc@gmail.com
                </a>
              </div>
            </div>

            <div className="rounded-2xl bg-[#ece1cf] dark:bg-[#2B2D30] border border-[rgba(100,85,70,0.18)] dark:border-[#3B3D41] p-7 flex items-start gap-4 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-[#f7f1e6] dark:bg-[#323438] border border-[rgba(100,85,70,0.20)] dark:border-[#3B3D41] flex items-center justify-center text-[#913433] dark:text-[#F14666] flex-shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-heading font-extrabold text-lg text-[#121110] dark:text-[#F2F0ED] mb-1">
                  Secretariat Helpline
                </h4>
                <p className="text-[#2d2b28] dark:text-[#B5B3B0] text-sm leading-relaxed mb-2">
                  Office Hours: Monday to Friday (9:00 AM - 5:00 PM IST)
                </p>
                <span className="text-[#121110] dark:text-[#F2F0ED] font-semibold text-sm">+91 22 2410 7000</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 rounded-2xl bg-[#ece1cf] dark:bg-[#2B2D30] border border-[rgba(100,85,70,0.18)] dark:border-[#3B3D41] p-7 md:p-8 flex flex-col justify-between shadow-xs">
            <div>
              <h3 className="font-heading font-extrabold text-2xl text-[#121110] dark:text-[#F2F0ED] mb-2">
                Send an Enquiry
              </h3>
              <p className="text-[#2d2b28] dark:text-[#B5B3B0] text-sm leading-relaxed mb-6">
                Have questions regarding registration, paper submissions, or travel accommodation in Mumbai? Drop our delegate support team a message.
              </p>

              <form onSubmit={(e) => { e.preventDefault(); alert('Thank you for contacting CONFLUENCE 2026. The organizing committee will get back to you shortly.'); }} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#913433] dark:text-[#F14666] uppercase tracking-wider mb-1.5">Your Full Name</label>
                  <input type="text" required placeholder="Dr. / Medical Student Name" className="w-full px-4 py-3 rounded-xl bg-[#f7f1e6] dark:bg-[#323438] border border-[rgba(100,85,70,0.22)] dark:border-[#3B3D41] text-[#121110] dark:text-[#F2F0ED] placeholder-[#6b6459] dark:placeholder-[#898A89] text-sm focus:outline-none focus:border-[#913433] dark:focus:border-[#F14666]" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#913433] dark:text-[#F14666] uppercase tracking-wider mb-1.5">Email Address</label>
                  <input type="email" required placeholder="name@college.edu" className="w-full px-4 py-3 rounded-xl bg-[#f7f1e6] dark:bg-[#323438] border border-[rgba(100,85,70,0.22)] dark:border-[#3B3D41] text-[#121110] dark:text-[#F2F0ED] placeholder-[#6b6459] dark:placeholder-[#898A89] text-sm focus:outline-none focus:border-[#913433] dark:focus:border-[#F14666]" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#913433] dark:text-[#F14666] uppercase tracking-wider mb-1.5">College / Institution</label>
                  <input type="text" required placeholder="Seth GSMC / AIIMS / Medical College" className="w-full px-4 py-3 rounded-xl bg-[#f7f1e6] dark:bg-[#323438] border border-[rgba(100,85,70,0.22)] dark:border-[#3B3D41] text-[#121110] dark:text-[#F2F0ED] placeholder-[#6b6459] dark:placeholder-[#898A89] text-sm focus:outline-none focus:border-[#913433] dark:focus:border-[#F14666]" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#913433] dark:text-[#F14666] uppercase tracking-wider mb-1.5">Message / Query</label>
                  <textarea rows="3" required placeholder="Inquire about workshops, delegate cards, or competition rules..." className="w-full px-4 py-3 rounded-xl bg-[#f7f1e6] dark:bg-[#323438] border border-[rgba(100,85,70,0.22)] dark:border-[#3B3D41] text-[#121110] dark:text-[#F2F0ED] placeholder-[#6b6459] dark:placeholder-[#898A89] text-sm focus:outline-none focus:border-[#913433] dark:focus:border-[#F14666] resize-none" />
                </div>
                <button
                  type="submit"
                  className="w-full mt-2 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-semibold text-sm text-white bg-[#913433] hover:bg-[#782827] dark:bg-[#F14666] dark:hover:bg-[#e03253] shadow-[0_8px_20px_-8px_rgba(145,52,51,0.50)] hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
                >
                  Submit Enquiry
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

