'use client';
import { useEffect, useRef, useState } from 'react';
import { Terminal } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
import '@xterm/xterm/css/xterm.css';
import { Send } from 'lucide-react';

export default function ConsolePage() {
  const terminalRef = useRef<HTMLDivElement>(null);
  const xtermRef = useRef<Terminal | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const [command, setCommand] = useState('');

  useEffect(() => {
    if (!terminalRef.current) return;

    const term = new Terminal({
      theme: {
        background: '#000000',
        foreground: '#c9d1d9',
        cursor: '#c9d1d9',
      },
      fontFamily: 'Menlo, Monaco, "Courier New", monospace',
      fontSize: 14,
      convertEol: true,
    });

    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);
    term.open(terminalRef.current);
    fitAddon.fit();
    
    xtermRef.current = term;

    const token = localStorage.getItem('token');
    const ws = new WebSocket(`wss://api.meritmc.net?token=${token}`);
    wsRef.current = ws;

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.type === 'console') {
        term.write(msg.data);
      }
    };

    const handleResize = () => fitAddon.fit();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      ws.close();
      term.dispose();
    };
  }, []);

  const sendCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!command.trim() || !wsRef.current) return;
    
    wsRef.current.send(JSON.stringify({ type: 'command', data: command }));
    setCommand('');
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">Server Console</h1>
      </div>
      
      <div className="flex-1 bg-black rounded-t-xl p-4 border border-pterodactyl-light overflow-hidden">
        <div ref={terminalRef} className="h-full w-full" />
      </div>

      <form onSubmit={sendCommand} className="bg-pterodactyl-dark border-x border-b border-pterodactyl-light rounded-b-xl p-4 flex gap-4">
        <input
          type="text"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          placeholder="Type a command..."
          className="flex-1 bg-pterodactyl-darker border border-pterodactyl-light rounded-lg px-4 py-2 text-white focus:outline-none focus:border-pterodactyl-accent"
        />
        <button
          type="submit"
          className="bg-pterodactyl-accent hover:bg-pterodactyl-accent-hover text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Send size={18} />
          Send
        </button>
      </form>
    </div>
  );
}
