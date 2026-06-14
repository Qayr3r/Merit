'use client';
import { useState, useEffect } from 'react';
import { Activity, Cpu, HardDrive, MemoryStick, Play, Square, RotateCw } from 'lucide-react';
import axios from 'axios';

export default function DashboardPage() {
  const [status, setStatus] = useState('offline');

  // Simulated metrics for visual effect
  const metrics = [
    { label: 'CPU Usage', value: '45%', icon: Cpu, color: 'text-blue-400' },
    { label: 'RAM Usage', value: '2.4 GB / 8 GB', icon: MemoryStick, color: 'text-green-400' },
    { label: 'Disk Usage', value: '12 GB / 50 GB', icon: HardDrive, color: 'text-yellow-400' },
    { label: 'Online Players', value: '12 / 50', icon: Activity, color: 'text-purple-400' },
  ];

  const handleAction = async (action: string) => {
    try {
      // Assuming a token is stored in localStorage after login
      const token = localStorage.getItem('token');
      await axios.post(`https://api.meritmc.net/api/server/${action}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Need a proper WS or polling for status, here we just set it optimistically or wait for WS
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Server Dashboard</h1>
        <div className="flex items-center gap-4">
          <div className={`px-4 py-2 rounded-full font-semibold flex items-center gap-2 ${
            status === 'online' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
          }`}>
            <span className={`w-3 h-3 rounded-full ${status === 'online' ? 'bg-green-400' : 'bg-red-400'}`}></span>
            {status.toUpperCase()}
          </div>
          <button onClick={() => handleAction('start')} className="bg-pterodactyl-accent hover:bg-pterodactyl-accent-hover text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
            <Play size={18} /> Start
          </button>
          <button onClick={() => handleAction('restart')} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
            <RotateCw size={18} /> Restart
          </button>
          <button onClick={() => handleAction('stop')} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
            <Square size={18} /> Stop
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((m, i) => {
          const Icon = m.icon;
          return (
            <div key={i} className="bg-pterodactyl-dark border border-pterodactyl-light p-6 rounded-xl hover:border-pterodactyl-accent/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg bg-pterodactyl-light ${m.color}`}>
                  <Icon size={24} />
                </div>
                <div>
                  <p className="text-pterodactyl-muted text-sm font-medium">{m.label}</p>
                  <p className="text-2xl font-bold text-white mt-1">{m.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
         <div className="bg-pterodactyl-dark border border-pterodactyl-light rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Resource Graph</h2>
            <div className="h-64 flex items-center justify-center text-pterodactyl-muted bg-pterodactyl-darker rounded-lg border border-pterodactyl-light border-dashed">
                [Chart Placeholder]
            </div>
         </div>
         <div className="bg-pterodactyl-dark border border-pterodactyl-light rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-pterodactyl-darker">
                   <div className="w-2 h-2 rounded-full bg-pterodactyl-accent"></div>
                   <div>
                     <p className="text-white text-sm">Server restarted by admin</p>
                     <p className="text-pterodactyl-muted text-xs">2 hours ago</p>
                   </div>
                </div>
              ))}
            </div>
         </div>
      </div>
    </div>
  );
}
