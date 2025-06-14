import React from 'react';
import { ShieldCheck, Zap, DollarSign, Sparkles } from 'lucide-react';
import Section from '../common/Section';
import styles from './Features.module.css';
import siteContent from '../../content/siteContent.json';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Feature: React.FC<FeatureProps> = ({ icon, title, description }) => {
  return (
    <div className={styles.flipCard}>
      <div className={styles.flipInner + ' w-full h-80 cursor-pointer'}>
        {/* Front Side */}
        <div className={styles.flipFront + ' flex flex-col items-center justify-center text-center p-8 rounded-xl shadow-sm'} style={{ background: '#2d3440', color: '#c1e534' }}>
          <div className="mb-6">{icon}</div>
          <h3 className="text-2xl font-bold" style={{ color: '#e6e9ed', fontFamily: 'Lexend Deca, Arial, Helvetica, sans-serif' }}>{title.split('\n').map((line, idx) => (<React.Fragment key={idx}>{line}{idx < title.split('\n').length - 1 && <br />}</React.Fragment>))}</h3>
        </div>
        {/* Back Side */}
        <div className={styles.flipBack + ' flex items-center justify-center text-center p-8 rounded-xl shadow-xl'} style={{ background: '#2d3440', color: '#c1e534' }}>
          <p className="font-body text-base" style={{ color: '#e6e9ed' }}>{description}</p>
        </div>
      </div>
    </div>
  );
};

const featureIcons = [
  <Zap size={40} className="text-accent" />,
  <ShieldCheck size={40} className="text-accent" />,
  <DollarSign size={40} className="text-accent" />,
  <Sparkles size={40} className="text-accent" />
];

const Features: React.FC = () => {
  return (
    <Section id="features" bgColor="bg-white" className="py-24">
      <div className="text-center mb-16">
        <h2 className="font-display text-hero text-4xl md:text-5xl text-secondary-dark mb-6">
          {siteContent.home.features.headline.split('\n').map((line, idx) => (
            <React.Fragment key={idx}>{line}<br/></React.Fragment>
          ))}
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-24">
        {siteContent.home.features.items.map((feature, index) => (
          <Feature
            key={index}
            icon={featureIcons[index]}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </Section>
  );
};

export default Features;