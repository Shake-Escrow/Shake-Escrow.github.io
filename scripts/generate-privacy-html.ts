import fs from 'fs-extra';
import path from 'path';

// Reuse your exact interfaces from privacy-policy.tsx
interface Subsection {
  subtitle: string;
  content: string;
}

interface PolicySection {
  title: string;
  content?: string;
  subsections?: Subsection[];
}

interface PrivacyPolicyData {
  lastUpdated: string;
  effectiveDate: string;
  companyName: string;
  sections: PolicySection[];
}

// Import your JSON (same path as in the component)
import privacyPolicyData from '../src/content/privacy.json' assert { type: 'json' };

const generatePrivacyHtml = async () => {
  const data: PrivacyPolicyData = privacyPolicyData;
  const { lastUpdated, effectiveDate, companyName, sections } = data;

  // Build the HTML string (mirrors your PrivacyPolicyContent component)
  let htmlContent = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Shake Defi Privacy Policy</title>
    <link href="https://fonts.googleapis.com/css2?family=Lexend+Deca:wght@400;500;600;700&family=Lexend+Exa:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
      body { 
        font-family: 'Lexend Deca', sans-serif; 
        line-height: 1.6; 
        max-width: 800px; 
        margin: 0 auto; 
        padding: 2rem; 
        color: #333; 
        background: white;
      }
      h1, h2, h3 { font-family: 'Lexend Exa', sans-serif; }
      h1 { font-size: 3rem; font-weight: 900; color: #1f2937; margin-bottom: 2rem; }
      h2 { font-size: 2rem; font-weight: 900; color: #1f2937; margin-bottom: 1rem; margin-top: 2rem; }
      h3 { font-size: 1.25rem; font-weight: 700; color: #1f2937; margin-bottom: 0.75rem; margin-top: 1.5rem; }
      p { font-size: 1rem; color: #374151; margin-bottom: 1rem; }
      hr { margin: 1.5rem 0; border-color: #d1d5db; }
      .header-info { margin-bottom: 2rem; }
      .header-info p { font-size: 1.125rem; font-weight: 600; color: #111827; margin-bottom: 0.25rem; }
      .header-info small { color: #6b7280; }
      .section { margin-bottom: 2.5rem; }
      ul, ol { margin: 0.75rem 0 1rem 1.5rem; }
      li { margin-bottom: 0.5rem; color: #374151; }
      a { color: #2563eb; text-decoration: none; }
      a:hover { text-decoration: underline; }
      strong { color: #1f2937; }
    </style>
  </head>
  <body>
    <h1>Privacy Policy</h1>
    
    <div class="header-info">
      <p>${companyName}</p>
      <small><strong>Effective Date:</strong> ${effectiveDate}</small><br>
      <small><strong>Last Updated:</strong> ${lastUpdated}</small>
    </div>
    <hr>
  `;

  // Dynamically render sections/subsections (same logic as your component)
  sections.forEach((section, index) => {
    const sectionNum = index + 1;
    htmlContent += `<div class="section">
      <h2>${sectionNum}. ${section.title}</h2>`;
    
    if (section.subsections) {
      section.subsections.forEach((subsection, subIndex) => {
        const subNum = subIndex + 1;
        htmlContent += `
        <h3>${sectionNum}.${subNum} ${subsection.subtitle}</h3>
        <div>${subsection.content}</div>`;
      });
    } else if (section.content) {
      htmlContent += `<div>${section.content}</div>`;
    }
    
    htmlContent += `</div>`;
  });

  htmlContent += `
  </body>
</html>`;

  // Write to public/ (Vite will copy to dist/ on build)
  const outputPath = path.join(process.cwd(), 'public', 'privacy-policy.html');
  await fs.writeFile(outputPath, htmlContent);
  console.log(`✅ Generated static privacy-policy.html from privacy.json`);
};

generatePrivacyHtml().catch(console.error);