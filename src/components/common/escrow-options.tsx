import { useContent } from '../../hooks/useContent';
import { ArrowDown, Clock3, LockKeyhole, Scale, Store, UserRound } from 'lucide-react';

export default function EscrowOptions() {
  const { options } = useContent('sitecontent').howItWorks;
  const { diagram } = options;
  const participants = {
    buyer: { label: diagram.buyer, Icon: UserRound },
    seller: { label: diagram.seller, Icon: Store },
    arbiter: { label: diagram.arbiter, Icon: Scale },
  };
  const pairs = [['buyer', 'seller'], ['buyer', 'arbiter'], ['seller', 'arbiter']] as const;
  return (
    <section aria-labelledby="escrow-options-title" className="max-w-5xl mx-auto px-4 py-12 text-left">
      <h2 id="escrow-options-title" className="font-display text-2xl md:text-3xl text-secondary-dark mb-6">
        {options.title}
      </h2>
      <div className="grid md:grid-cols-2 gap-6 font-body text-secondary leading-relaxed">
        <article className="rounded-2xl border border-gray-200 bg-white p-6">
          <h3 className="font-display text-xl text-secondary-dark mb-3">{options.timedTitle}</h3>
          <div role="group" aria-label={diagram.timedLabel} className="my-5 flex flex-col items-center gap-2 rounded-xl bg-gray-50 p-4 text-center text-sm">
            <div className="flex items-center gap-2"><LockKeyhole size={18} aria-hidden="true" />{diagram.deposit}</div>
            <ArrowDown size={18} aria-hidden="true" />
            <div className="flex items-center gap-2"><Clock3 size={18} className="shrink-0" aria-hidden="true" />{diagram.holding}</div>
            <ArrowDown size={18} aria-hidden="true" />
            <div className="font-semibold text-secondary-dark">{diagram.outcome}</div>
          </div>
          <p>{options.timedBody}</p>
        </article>
        <article className="rounded-2xl border border-gray-200 bg-white p-6 space-y-3">
          <h3 className="font-display text-xl text-secondary-dark">{options.quorumTitle}</h3>
          <div role="group" aria-label={diagram.quorumLabel} className="rounded-xl bg-gray-50 p-4 text-center text-sm">
            <p className="mb-3">{diagram.quorumLabel}</p>
            {pairs.map((pair, index) => (
              <div key={pair.join('-')}>
                {index > 0 && <div className="my-1 text-xs">{diagram.or}</div>}
                <div className="flex items-center justify-center gap-2">
                  {pair.map((role, participantIndex) => {
                    const { label, Icon } = participants[role];
                    return (
                      <div key={role} className="flex min-w-0 items-center gap-2">
                        {participantIndex > 0 && <span aria-hidden="true">+</span>}
                        <span className="flex min-w-0 flex-col items-center rounded-lg border border-gray-200 bg-white px-3 py-2">
                          <Icon size={18} aria-hidden="true" />
                          <span>{label}</span>
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
            <ArrowDown size={18} className="mx-auto my-2" aria-hidden="true" />
            <p className="font-semibold text-secondary-dark">{diagram.outcome}</p>
            <p className="mt-1 text-xs">{diagram.confirmed}</p>
          </div>
          <p>{options.quorumBody}</p>
          <p>{options.fee}</p>
          <p className="font-semibold text-secondary-dark">{options.lock}</p>
        </article>
      </div>
      <div className="mt-6 space-y-3 font-body text-secondary leading-relaxed">
        <p>{options.identity}</p>
        <p>{options.ratings}</p>
      </div>
    </section>
  );
}
