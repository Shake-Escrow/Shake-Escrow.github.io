import { useEffect, useMemo, useRef, useState } from 'react';
import { MessageCircle, Send, X } from 'lucide-react';

type ChatRole = 'assistant' | 'user';

interface ChatMessage {
  id: string;
  role: ChatRole;
  text: string;
  isError?: boolean;
}

interface ChatApiResponse {
  success?: boolean;
  reply?: string;
  error?: string;
}

const INITIAL_MESSAGE: ChatMessage = {
  id: 'welcome',
  role: 'assistant',
  text: 'Hi — I can answer questions about Shake, escrow, fees, supported crypto, disputes, and how the platform works.'
};

const buildChatEndpoint = (): string => {
  const explicitChatEndpoint = import.meta.env.VITE_CHAT_API_ENDPOINT;
  if (explicitChatEndpoint) {
    return explicitChatEndpoint;
  }

  const websiteEndpoint = import.meta.env.VITE_API_ENDPOINT;
  if (websiteEndpoint) {
    return websiteEndpoint.replace(/\/api\/website\/?$/, '/api/website/chat');
  }

  return '/api/website/chat';
};

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const chatEndpoint = useMemo(() => buildChatEndpoint(), []);

  useEffect(() => {
    if (isOpen) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOpen, messages, isLoading]);

  const appendMessage = (message: ChatMessage) => {
    setMessages((currentMessages) => [...currentMessages, message]);
  };

  const submitMessage = async () => {
    const trimmedMessage = input.trim();
    if (!trimmedMessage || isLoading) {
      return;
    }

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: trimmedMessage
    };

    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch(chatEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: trimmedMessage,
          page: window.location.pathname,
          history: nextMessages.slice(-8).map(({ role, text }) => ({ role, text }))
        })
      });

      const data = (await response.json()) as ChatApiResponse;

      if (!response.ok || !data.success || !data.reply) {
        throw new Error(data.error || 'Unable to get a response right now.');
      }

      appendMessage({
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        text: data.reply
      });
    } catch (error) {
      appendMessage({
        id: `assistant-error-${Date.now()}`,
        role: 'assistant',
        text: error instanceof Error
          ? error.message
          : 'Something went wrong while contacting support chat.',
        isError: true
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed bottom-24 right-4 z-[60] w-[calc(100vw-2rem)] max-w-sm overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl sm:right-6">
          <div className="flex items-center justify-between bg-secondary-dark px-5 py-4 text-white">
            <div>
              <p className="font-display text-lg">Ask Shake</p>
              <p className="font-body text-sm text-slate-200">Website questions answered here</p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-full p-2 transition hover:bg-white/10"
              aria-label="Close chat"
            >
              <X size={18} />
            </button>
          </div>

          <div className="h-96 space-y-3 overflow-y-auto bg-slate-50 px-4 py-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={[
                    'max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-6 shadow-sm',
                    message.role === 'user'
                      ? 'bg-accent text-secondary-dark'
                      : message.isError
                        ? 'bg-red-50 text-red-700'
                        : 'bg-white text-secondary-dark'
                  ].join(' ')}
                >
                  {message.text}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="rounded-2xl bg-white px-4 py-3 text-sm text-secondary shadow-sm">
                  Thinking...
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <div className="border-t border-slate-200 bg-white p-3">
            <div className="flex items-end gap-2">
              <textarea
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' && !event.shiftKey) {
                    event.preventDefault();
                    void submitMessage();
                  }
                }}
                placeholder="Ask about Shake..."
                rows={2}
                className="min-h-[56px] flex-1 resize-none rounded-2xl border border-slate-300 px-4 py-3 text-sm text-secondary-dark outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
              />
              <button
                type="button"
                onClick={() => {
                  void submitMessage();
                }}
                disabled={isLoading || input.trim().length === 0}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-secondary-dark shadow-md transition hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
                aria-label="Send message"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((currentValue) => !currentValue)}
        className="fixed bottom-4 right-4 z-[60] flex h-16 w-16 items-center justify-center rounded-full bg-accent text-secondary-dark shadow-xl transition duration-200 hover:-translate-y-1 hover:scale-105 hover:shadow-2xl sm:bottom-6 sm:right-6"
        aria-label={isOpen ? 'Close website chat' : 'Open website chat'}
      >
        {isOpen ? <X size={26} /> : <MessageCircle size={26} />}
      </button>
    </>
  );
};

export default ChatWidget;