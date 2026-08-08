import React from 'react';
import { ApiReferenceReact } from '@scalar/api-reference-react';
import '@scalar/api-reference-react/style.css';
import SEO from '../components/common/seo';

const ApiDocs: React.FC = () => {
  return (
    <div className="min-h-screen">
      <SEO
        title="API Documentation - Shake Defi"
        description="Shake Defi API reference documentation for escrow integration and platform API."
        canonical="/api-docs"
      />
      <ApiReferenceReact
        configuration={{
          spec: {
            url: '/docs/platform-openapi.yaml'
          }
        }}
      />
    </div>
  );
};

export default ApiDocs;
