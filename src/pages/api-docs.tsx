import React from 'react';
import { ApiReferenceReact } from '@scalar/api-reference-react';
import '@scalar/api-reference-react/style.css';

const ApiDocs: React.FC = () => {
  return (
    <div className="min-h-screen">
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
