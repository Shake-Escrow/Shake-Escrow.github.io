/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_ENDPOINT?: string;
  readonly VITE_CHAT_API_ENDPOINT?: string;
}

interface Window {
  gtag?: (...args: unknown[]) => void;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}