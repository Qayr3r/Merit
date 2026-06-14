'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Server, Lock, User } from 'lucide-react';
import axios from 'axios';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await axios.post('http://meritmc.net/api/auth/login', {
        username,
        password
      });

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      router.push('/');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-pterodactyl-darker flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-pterodactyl-light mb-4">
            <Server className="w-8 h-8 text-pterodactyl-accent" />
          </div>
          <h1 className="text-3xl font-bold text-white">MC Panel</h1>
          <p className="text-pterodactyl-muted mt-2">Sign in to manage your server</p>
        </div>

        <form onSubmit={handleLogin} className="bg-pterodactyl-dark p-8 rounded-2xl border border-pterodactyl-light shadow-2xl">
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm text-center">
              {error}
            </div>
          )}

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-pterodactyl-muted mb-2">Username</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-pterodactyl-muted" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-pterodactyl-darker border border-pterodactyl-light rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-pterodactyl-accent focus:ring-1 focus:ring-pterodactyl-accent transition-colors"
                  placeholder="Enter your username"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-pterodactyl-muted mb-2">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-pterodactyl-muted" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-pterodactyl-darker border border-pterodactyl-light rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-pterodactyl-accent focus:ring-1 focus:ring-pterodactyl-accent transition-colors"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-pterodactyl-accent hover:bg-pterodactyl-accent-hover text-white font-bold py-3 px-4 rounded-lg transition-colors flex justify-center items-center"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
