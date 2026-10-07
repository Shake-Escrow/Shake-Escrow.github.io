import { useContent } from '../../hooks/useContent';
import { Clock3, Scale } from 'lucide-react';

export default function EscrowOptions() {
  const { options } = useContent('sitecontent').howItWorks;

  return (
    <section aria-labelledby="escrow-options-title" className="max-w-5xl mx-auto py-6 mb-8 text-left">
      <h2 id="escrow-options-title" className="font-display text-2xl md:text-3xl text-secondary-dark mb-6">
        {options.title}
      </h2>
      <div className="grid md:grid-cols-2 gap-6 font-body text-secondary leading-relaxed">
        <article className="rounded-2xl border border-gray-200 bg-white p-6">
          <h3 className="flex items-center gap-3 font-display text-xl text-secondary-dark mb-3">
            <Clock3 size={24} className="shrink-0" aria-hidden="true" />
            {options.timedTitle}
          </h3>
          <p>{options.timedBody}</p>
        </article>
        <article className="rounded-2xl border border-gray-200 bg-white p-6">
          <h3 className="flex items-center gap-3 font-display text-xl text-secondary-dark mb-3">
            <Scale size={24} className="shrink-0" aria-hidden="true" />
            {options.quorumTitle}
          </h3>
          <p>{options.quorumBody}</p>
        </article>
      </div>
    </section>
  );
}
