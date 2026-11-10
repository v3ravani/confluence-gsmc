import React from 'react';
import { Calendar, MapPin, Users, TicketCheck } from 'lucide-react';
import SectionHeading from '../../components/common/SectionHeading';
import { conferenceInfo } from '../../data/events';

export default function EventInfo() {
  const details = [
    {
      id:      'date',
      label:   'DATE',
      value:   conferenceInfo.dates,
      icon:    <Calendar className="w-5 h-5" style={{ color: 'var(--dusty-400)' }} />,
      subtext: '5 days of clinical & research immersion',
    },
    {
      id:      'venue',
      label:   'VENUE',
      value:   conferenceInfo.venue,
      icon:    <MapPin className="w-5 h-5" style={{ color: 'var(--accent-blush)' }} />,
      subtext: 'Parel, Mumbai — 400012, Maharashtra',
    },
    {
      id:      'opento',
      label:   'OPEN TO',
      value:   conferenceInfo.openTo,
      icon:    <Users className="w-5 h-5" style={{ color: 'var(--sage-400)' }} />,
      subtext: 'Undergraduate & Postgraduate medical fraternity',
    },
    {
      id:      'registration',
      label:   'REGISTRATION',
      value:   conferenceInfo.registrationStatus,
      icon:    <TicketCheck className="w-5 h-5" style={{ color: 'var(--dusty-400)' }} />,
      subtext: 'Online portal & spot verification desks',
    },
  ];

  return (
    <section className="py-16 md:py-24 relative border-b border-[rgba(196,216,232,0.08)]">
      <div className="wrap">
        <SectionHeading
          eyebrow="Key Details"
          title="Event"
          highlightWord="Information"
          subtitle="Essential conference parameters for attendees, delegates and participating medical institutions."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {details.map((item) => (
            <div key={item.id} className="card-glass p-6 md:p-7 flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[rgba(74,106,138,0.12)]
                                border border-[rgba(196,216,232,0.16)]
                                flex items-center justify-center mb-5
                                group-hover:scale-105 group-hover:bg-[rgba(74,106,138,0.22)]
                                transition-all duration-300">
                  {item.icon}
                </div>
                <small className="text-xs font-semibold tracking-[0.16em] uppercase
                                  text-[var(--dusty-400)] block mb-2">
                  {item.label}
                </small>
                <h3 className="font-heading font-bold text-white text-lg sm:text-xl leading-snug mb-3">
                  {item.value}
                </h3>
              </div>
              <div className="pt-4 border-t border-[rgba(196,216,232,0.08)]">
                <p className="text-xs text-[var(--muted)]">{item.subtext}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
