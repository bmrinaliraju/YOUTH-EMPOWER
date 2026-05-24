import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Image as ImageIcon, Loader2, Trash2, Bot, User, ChevronDown } from 'lucide-react';

// ── Groq free API key ──────────────────────────────────────────────────────────
const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const TEXT_MODEL = 'llama-3.3-70b-versatile';          // current free model on Groq
const VISION_MODEL = 'llama-3.2-90b-vision-preview';   // current vision model on Groq

const SYSTEM_PROMPT = `You are an intelligent AI assistant embedded in the YOUTH Empower Portal — a unified platform for Indian youth cadets. You help cadets with:
- YOUTH information, its history, wings (Army/Navy/Air), motto "Unity and Discipline"
- Exam prep: SSB, NDA, UPSC, SSCGD guidance
- Science & technology: cybersecurity, robotics, AIML, avionics advice
- Blood donation eligibility, local civic issue reporting, volunteer activities
- Career guidance for defence, engineering, medicine fields
- General knowledge, current affairs, geopolitics
- General conversational assistance

Be helpful, encouraging, accurate, and concise. Use simple language suitable for students aged 16-25. If you analyse an uploaded image, describe what you see and connect it to YOUTH or cadet context if relevant.`;

// ── Groq chat completion fetch ─────────────────────────────────────────────────
async function askGroq(messages, hasImage) {
  const model = hasImage ? VISION_MODEL : TEXT_MODEL;
  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${GROQ_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
      temperature: 0.7,
      max_tokens: 1024,
    }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message || `API error ${res.status}`);
  }
  const data = await res.json();
  return data.choices[0].message.content;
}

// ── Convert file to base64 data URL ───────────────────────────────────────────
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// ── Main Chatbot Component ─────────────────────────────────────────────────────
const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: '🪖 Jai Hind! I am your YOUTH AI Assistant. Ask me anything — exam prep, defence news, volunteer activities, or just chat!',
      imagePreview: null,
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState('');
  const [unread, setUnread] = useState(0);

  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Track unread when closed
  useEffect(() => {
    if (!open && messages.length > 1) {
      setUnread(prev => prev + 0); // reset is handled on open
    }
  }, [messages]);

  const handleOpen = () => {
    setOpen(true);
    setUnread(0);
  };

  const handleImageSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    const preview = await fileToBase64(file);
    setImagePreview(preview);
    e.target.value = '';
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const handleSend = async () => {
    const text = input.trim();
    if (!text && !imageFile) return;

    setError('');
    const userMsg = { role: 'user', content: text, imagePreview };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    removeImage();
    setLoading(true);

    // Build API message list
    const apiMessages = messages
      .filter(m => m.role !== 'system')
      .map(m => {
        if (m.imagePreview) {
          return {
            role: m.role,
            content: [
              { type: 'image_url', image_url: { url: m.imagePreview } },
              { type: 'text', text: m.content || 'Analyse this image.' },
            ],
          };
        }
        return { role: m.role, content: m.content };
      });

    // Add current user message
    if (imagePreview) {
      apiMessages.push({
        role: 'user',
        content: [
          { type: 'image_url', image_url: { url: imagePreview } },
          { type: 'text', text: text || 'Analyse this image.' },
        ],
      });
    } else {
      apiMessages.push({ role: 'user', content: text });
    }

    try {
      const reply = await askGroq(apiMessages, !!userMsg.imagePreview);
      setMessages(prev => [...prev, { role: 'assistant', content: reply, imagePreview: null }]);
      if (!open) setUnread(prev => prev + 1);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearChat = () => {
    setMessages([{
      role: 'assistant',
      content: '🪖 Chat cleared! How can I assist you today?',
      imagePreview: null,
    }]);
    setError('');
  };

  return (
    <>
      {/* Floating toggle button */}
      <button
        onClick={handleOpen}
        aria-label="Open AI Chatbot"
        className={`fixed bottom-6 right-6 z-[9999] w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 ${open ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
          } bg-gradient-to-br from-[#0B3D91] to-[#1a5abf] hover:from-[#092e6e] hover:to-[#0B3D91] text-white`}
      >
        <Bot size={26} />
        {unread > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full text-[10px] flex items-center justify-center font-bold">
            {unread}
          </span>
        )}
      </button>

      {/* Chatbot Panel */}
      <div
        className={`fixed bottom-6 right-6 z-[9999] w-[370px] max-w-[calc(100vw-2rem)] flex flex-col rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 origin-bottom-right ${open ? 'scale-100 opacity-100' : 'scale-75 opacity-0 pointer-events-none'
          }`}
        style={{ height: '540px' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-[#0B3D91] to-[#1a5abf] text-white flex-shrink-0">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <Bot size={18} />
            </div>
            <div>
              <p className="font-bold text-sm">YOUTH AI Assistant</p>
              <p className="text-[10px] text-blue-200">Powered by Groq · Llama 3</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={clearChat}
              title="Clear Chat"
              className="text-white/70 hover:text-white transition-colors p-1 rounded"
            >
              <Trash2 size={15} />
            </button>
            <button
              onClick={() => setOpen(false)}
              title="Close"
              className="text-white/70 hover:text-white transition-colors p-1 rounded"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-white dark:bg-gray-900">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex items-end gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              {/* Avatar */}
              <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs font-bold ${msg.role === 'user' ? 'bg-[#556B2F]' : 'bg-[#0B3D91]'
                }`}>
                {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
              </div>

              {/* Bubble */}
              <div className={`max-w-[78%] rounded-2xl px-3 py-2 text-sm leading-relaxed shadow-sm ${msg.role === 'user'
                ? 'bg-[#0B3D91] text-white rounded-br-sm'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-bl-sm'
                }`}>
                {msg.imagePreview && (
                  <img
                    src={msg.imagePreview}
                    alt="uploaded"
                    className="rounded-lg mb-2 max-h-40 object-cover w-full"
                  />
                )}
                {msg.content && (
                  <p className="whitespace-pre-wrap break-words">{msg.content}</p>
                )}
              </div>
            </div>
          ))}

          {/* Loading indicator */}
          {loading && (
            <div className="flex items-end gap-2">
              <div className="w-7 h-7 rounded-full bg-[#0B3D91] flex items-center justify-center flex-shrink-0">
                <Bot size={14} className="text-white" />
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl rounded-bl-sm px-4 py-3">
                <div className="flex space-x-1 items-center">
                  <span className="w-2 h-2 bg-[#0B3D91] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-[#0B3D91] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-[#0B3D91] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="text-xs text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 rounded-lg px-3 py-2">
              ⚠️ {error}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Image Preview Strip */}
        {imagePreview && (
          <div className="flex-shrink-0 px-3 py-2 border-t border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 flex items-center gap-2">
            <div className="relative">
              <img
                src={imagePreview}
                alt="preview"
                className="h-12 w-16 object-cover rounded-lg border border-gray-200 dark:border-gray-600"
              />
              <button
                onClick={removeImage}
                className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center"
              >
                <X size={9} />
              </button>
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400">Image attached</span>
          </div>
        )}

        {/* Input Area */}
        <div className="flex-shrink-0 border-t border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 p-3">
          <div className="flex items-end gap-2">
            {/* Image upload */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              title="Upload Image"
              className="flex-shrink-0 text-gray-400 hover:text-[#0B3D91] dark:hover:text-blue-400 transition-colors p-1.5 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20"
            >
              <ImageIcon size={20} />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageSelect}
            />

            {/* Text input */}
            <textarea
              ref={textareaRef}
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything..."
              className="flex-1 resize-none text-sm border border-gray-200 dark:border-gray-600 rounded-xl px-3 py-2 bg-gray-50 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0B3D91] dark:focus:ring-blue-500 max-h-24 overflow-y-auto"
              style={{ lineHeight: '1.5' }}
            />

            {/* Send */}
            <button
              onClick={handleSend}
              disabled={loading || (!input.trim() && !imageFile)}
              className="flex-shrink-0 w-9 h-9 rounded-xl bg-[#0B3D91] hover:bg-[#092e6e] text-white flex items-center justify-center transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow"
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={15} />}
            </button>
          </div>
          <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-1.5 text-center">
            Press Enter to send · Shift+Enter for new line
          </p>
        </div>
      </div>
    </>
  );
};

export default Chatbot;
