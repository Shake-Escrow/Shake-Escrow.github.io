import fs from 'fs-extra';
import path from 'path';

import eulaPolicyData from '../src/content/eula.json' assert { type: 'json' };

interface EulaSubsection {
  subtitle: string;
  content: string;
}

interface EulaSection {
  title: string;
  content?: string;
  subsections?: EulaSubsection[];
}

interface EulaData {
  title: string;
  companyName: string;
  lastUpdated: string;
  introduction: string;
  sections: EulaSection[];
  acknowledgment?: string;
}

const generateEulaHtml = async () => {
  const data: EulaData = eulaPolicyData;
  const { companyName, lastUpdated, introduction, sections, acknowledgment, title } = data;

  let htmlContent = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Shake Defi ${title}</title>
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
      h2 { font-size: 2rem; font-weight: 900; color: #1f2937; margin-bottom: 1rem; }
      h3 { font-size: 1.25rem; font-weight: 700; color: #1f2937; margin-bottom: 0.75rem; }
      p { font-size: 1rem; color: #374151; margin-bottom: 1rem; }
      ul, ol { margin-left: 1.25rem; margin-bottom: 1rem; }
      hr { margin: 1.5rem 0; border-color: #d1d5db; }
      .header-info { margin-bottom: 2rem; }
      .header-info p { font-size: 1.125rem; font-weight: 600; color: #111827; margin-bottom: 0.25rem; }
      .header-info small { color: #6b7280; }
      .section { margin-bottom: 2.5rem; }
      .ack { background: #111827; color: white; padding: 1.5rem; border-radius: 0.75rem; }
    </style>
  </head>
  <body>
    <h1>${title}</h1>
    
    <div class="header-info">
      <p>${companyName}</p>
      <small><strong>Last Updated:</strong> ${lastUpdated}</small>
    </div>
    <hr>
    <div>${introduction}</div>
  `;

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

  if (acknowledgment) {
    htmlContent += `
    <div class="ack">
      <p>${acknowledgment}</p>
    </div>`;
  }

  htmlContent += `
  </body>
</html>`;

  const outputPath = path.join(process.cwd(), 'public', 'end-user-license-agreement.html');
  await fs.writeFile(outputPath, htmlContent);
  console.log(`✅ Generated static end-user-license-agreement.html from eula.json`);
};

generateEulaHtml().catch(console.error);
