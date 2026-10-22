"use client";

import { useEffect, useRef, useState } from 'react';
import { MessageCircle, X, Send, Bot } from 'lucide-react';
import { getData } from '@/lib/api';
import { useSite } from './SiteProvider';
import { useConnection } from './ConnectionModal';
import type { Package, Area, PaymentMethod } from '@/lib/types';

type Msg = { from: 'bot' | 'user'; text: string; chips?: { label: string; key: string }[] };

const MENU_CHIPS = [
  { label: '📦 প্যাকেজ ও দাম', key: 'packages' },
  { label: '📍 এরিয়া কভারেজ', key: 'coverage' },
  { label: '💳 বিল পেমেন্ট', key: 'payment' },
  { label: '🔌 নতুন কানেকশন', key: 'connect' },
  { label: '📞 যোগাযোগ', key: 'contact' },
];

export default function LiveChat() {
  const { settings } = useSite();
  const { open: openConnection } = useConnection();
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [data, setData] = useState<{ packages: Package[]; areas: Area[]; pay: PaymentMethod[] }>({ packages: [], areas: [], pay: [] });
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    Promise.all([
      getData<Package[]>('/packages', []),
      getData<Area[]>('/areas', []),
      getData<PaymentMethod[]>('/payment-methods', []),
    ]).then(([packages, areas, pay]) => setData({ packages, areas, pay }));
  }, []);

  useEffect(() => {
    if (open && msgs.length === 0) {
      setMsgs([{ from: 'bot', text: `আসসালামু আলাইকুম! 👋 আমি MaxTopNet-এর সহকারী। কীভাবে সাহায্য করতে পারি?`, chips: MENU_CHIPS }]);
    }
  }, [open]);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: 'smooth' });
  }, [msgs, typing]);

  const push = (m: Msg) => setMsgs((p) => [...p, m]);

  const botReply = (userText: string): Msg => {
    const t = userText.toLowerCase();
    const money = (p: Package) => `• ${p.speed} ${p.unit} — ৳${p.price}/${p.period} (${p.name})`;

    if (/packag|plan|দাম|প্যাকেজ|price|mbps|speed/.test(t)) {
      const list = data.packages.slice(0, 6).map(money).join('\n');
      return { from: 'bot', text: `আমাদের ইন্টারনেট প্যাকেজসমূহ:\n\n${list || 'শীঘ্রই আসছে'}\n\nসব প্যাকেজে অপটিক্যাল ফাইবার, ফ্রি কানেকশন চার্জ ও ২৪/৭ সাপোর্ট আছে। 😊`, chips: [{ label: '🔌 কানেকশন নিতে চাই', key: 'connect' }, { label: '🏠 মেনু', key: 'menu' }] };
    }
    if (/cover|area|এলাকা|কভার|location/.test(t)) {
      const avail = data.areas.filter((a) => a.status === 'available').map((a) => a.name).join(', ');
      return { from: 'bot', text: `বর্তমানে আমরা এই এলাকাগুলোতে সেবা দিচ্ছি:\n\n${avail || 'Banaripara ও আশপাশ'}\n\nআপনার এলাকা তালিকায় না থাকলে কানেকশন রিকোয়েস্ট দিন — আমরা ব্যবস্থা করব!`, chips: [{ label: '🔌 কানেকশন রিকোয়েস্ট', key: 'connect' }, { label: '🏠 মেনু', key: 'menu' }] };
    }
    if (/pay|bill|bkash|nagad|rocket|পেমেন্ট|বিল|টাকা/.test(t)) {
      const methods = data.pay.map((m) => m.name).join(', ');
      return { from: 'bot', text: `আপনি সহজেই অনলাইনে বিল পরিশোধ করতে পারেন:\n\n${methods || 'bKash, Nagad, Rocket, Upay, SSLCommerz'}\n\nPayment পেজে গিয়ে "Pay Bill" বাটনে ক্লিক করুন। 💳`, chips: [{ label: '🏠 মেনু', key: 'menu' }] };
    }
    if (/connect|সংযোগ|কানেকশন|new|নতুন/.test(t)) {
      setTimeout(() => openConnection(), 400);
      return { from: 'bot', text: `দারুণ! 🎉 কানেকশন ফর্মটি খুলে দিচ্ছি — নাম, নম্বর ও ঠিকানা দিলেই আমরা দ্রুত যোগাযোগ করব।`, chips: [{ label: '🏠 মেনু', key: 'menu' }] };
    }
    if (/contact|phone|call|যোগাযোগ|নম্বর|number/.test(t)) {
      return { from: 'bot', text: `যেকোনো প্রয়োজনে যোগাযোগ করুন:\n\n📞 ${settings.phone}\n✉️ ${settings.email}\n📍 ${settings.address}\n\n২৪/৭ আমরা আপনার সেবায় আছি!`, chips: [{ label: '🔌 কানেকশন', key: 'connect' }, { label: '🏠 মেনু', key: 'menu' }] };
    }
    if (/hi|hello|হ্যালো|সালাম|assalam|help|সাহায্য/.test(t)) {
      return { from: 'bot', text: `কেমন আছেন? 😊 নিচের যেকোনো অপশন বেছে নিন অথবা প্রশ্ন লিখুন।`, chips: MENU_CHIPS };
    }
    return { from: 'bot', text: `দুঃখিত, ঠিক বুঝতে পারিনি। 🙏 নিচের অপশনগুলো দেখুন অথবা সরাসরি কল করুন: ${settings.topbarPhone}`, chips: MENU_CHIPS };
  };

  const send = (text: string, isChipKey?: string) => {
    const clean = text.trim();
    if (!clean && !isChipKey) return;
    if (isChipKey === 'menu') {
      push({ from: 'user', text: 'মেনু' });
    } else {
      push({ from: 'user', text: clean });
    }
    setInput('');
    setTyping(true);
    const query = isChipKey && isChipKey !== 'menu' ? isChipKey : clean;
    setTimeout(() => {
      setTyping(false);
      if (isChipKey === 'menu') {
        push({ from: 'bot', text: 'কীভাবে সাহায্য করতে পারি?', chips: MENU_CHIPS });
      } else {
        push(botReply(query));
      }
    }, 700);
  };

  return (
    <>
      <button className="chat-fab" onClick={() => setOpen((o) => !o)} aria-label="Live chat">
        {open ? <X size={26} /> : <MessageCircle size={28} />}
        {!open && <span className="chat-fab-dot" />}
      </button>

      <div className={`chat-panel ${open ? 'open' : ''}`}>
        <div className="chat-header">
          <span className="chat-avatar"><Bot size={22} /></span>
          <div style={{ flex: 1 }}>
            <strong>MaxTopNet সহকারী</strong>
            <span className="chat-online">● অনলাইন</span>
          </div>
          <button onClick={() => setOpen(false)} aria-label="Close" style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer' }}><X size={20} /></button>
        </div>

        <div className="chat-body" ref={bodyRef}>
          {msgs.map((m, i) => (
            <div key={i} className={`chat-msg ${m.from}`}>
              <div className="chat-bubble">{m.text}</div>
              {m.chips && (
                <div className="chat-chips">
                  {m.chips.map((c) => (
                    <button key={c.key} onClick={() => send(c.label, c.key)} className="chat-chip">{c.label}</button>
                  ))}
                </div>
              )}
            </div>
          ))}
          {typing && (
            <div className="chat-msg bot"><div className="chat-bubble chat-typing"><span /><span /><span /></div></div>
          )}
        </div>

        <form className="chat-input" onSubmit={(e) => { e.preventDefault(); send(input); }}>
          <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="আপনার প্রশ্ন লিখুন..." />
          <button type="submit" aria-label="Send"><Send size={18} /></button>
        </form>
      </div>

      <style>{`
        .chat-fab { position: fixed; bottom: 26px; right: 26px; z-index: 1900; width: 60px; height: 60px; border-radius: 50%; background: var(--primary); color: var(--ink); border: none; display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 10px 28px var(--primary-glow); transition: transform 0.2s; }
        .chat-fab:hover { transform: scale(1.07); }
        .chat-fab-dot { position: absolute; top: 12px; right: 12px; width: 11px; height: 11px; border-radius: 50%; background: #16a34a; border: 2px solid #fff; }
        .chat-panel { position: fixed; bottom: 98px; right: 26px; z-index: 1900; width: 370px; max-width: calc(100vw - 32px); height: 540px; max-height: calc(100vh - 140px); background: #fff; border-radius: 18px; box-shadow: 0 24px 60px rgba(15,27,45,0.3); display: flex; flex-direction: column; overflow: hidden; opacity: 0; transform: translateY(20px) scale(0.96); pointer-events: none; transition: all 0.28s cubic-bezier(0.22,1,0.36,1); }
        .chat-panel.open { opacity: 1; transform: none; pointer-events: auto; }
        .chat-header { background: linear-gradient(120deg, var(--ink), var(--ink-700)); color: #fff; padding: 14px 16px; display: flex; align-items: center; gap: 12px; }
        .chat-avatar { width: 40px; height: 40px; border-radius: 50%; background: var(--primary); color: var(--ink); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .chat-header strong { display: block; font-size: 1rem; font-family: var(--font-display); }
        .chat-online { font-size: 0.75rem; color: #86efac; }
        .chat-body { flex: 1; overflow-y: auto; padding: 16px; background: var(--surface); display: flex; flex-direction: column; gap: 12px; }
        .chat-msg { display: flex; flex-direction: column; max-width: 90%; }
        .chat-msg.bot { align-self: flex-start; align-items: flex-start; }
        .chat-msg.user { align-self: flex-end; align-items: flex-end; }
        .chat-bubble { padding: 10px 14px; border-radius: 14px; font-size: 0.9rem; line-height: 1.5; white-space: pre-line; box-shadow: var(--shadow-sm); }
        .chat-msg.bot .chat-bubble { background: #fff; color: var(--ink); border-bottom-left-radius: 4px; }
        .chat-msg.user .chat-bubble { background: var(--primary); color: var(--ink); border-bottom-right-radius: 4px; font-weight: 500; }
        .chat-chips { display: flex; flex-wrap: wrap; gap: 7px; margin-top: 9px; }
        .chat-chip { background: #fff; border: 1px solid var(--primary); color: var(--primary-700); border-radius: 20px; padding: 7px 13px; font-size: 0.8rem; font-weight: 600; cursor: pointer; transition: all 0.2s; }
        .chat-chip:hover { background: var(--primary); color: var(--ink); }
        .chat-typing { display: flex; gap: 4px; padding: 14px; }
        .chat-typing span { width: 7px; height: 7px; border-radius: 50%; background: #9fb0c2; animation: chatBlink 1.2s infinite; }
        .chat-typing span:nth-child(2){ animation-delay: 0.2s; } .chat-typing span:nth-child(3){ animation-delay: 0.4s; }
        @keyframes chatBlink { 0%,60%,100%{ opacity: 0.3; } 30%{ opacity: 1; } }
        .chat-input { display: flex; gap: 8px; padding: 12px; border-top: 1px solid var(--border); background: #fff; }
        .chat-input input { flex: 1; border: 1.5px solid var(--border); border-radius: 24px; padding: 10px 16px; font-size: 0.9rem; outline: none; font-family: var(--font-sans); }
        .chat-input input:focus { border-color: var(--primary); }
        .chat-input button { width: 42px; height: 42px; border-radius: 50%; background: var(--primary); color: var(--ink); border: none; display: flex; align-items: center; justify-content: center; cursor: pointer; flex-shrink: 0; }
        @media (max-width: 480px){ .chat-fab { bottom: 18px; right: 18px; width: 54px; height: 54px; } .chat-panel { right: 12px; bottom: 82px; height: 70vh; } }
      `}</style>
    </>
  );
}
