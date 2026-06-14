'use client';
import { User, Shield, Key } from 'lucide-react';

export default function UsersPage() {
  const users = [
    { id: 1, username: 'admin', email: 'admin@example.com', role: 'owner', status: 'active' },
    { id: 2, username: 'moderator1', email: 'mod1@example.com', role: 'moderator', status: 'active' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">User Management</h1>
        <button className="bg-pterodactyl-accent hover:bg-pterodactyl-accent-hover text-white px-4 py-2 rounded-lg transition-colors">
          Create User
        </button>
      </div>

      <div className="bg-pterodactyl-dark border border-pterodactyl-light rounded-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-pterodactyl-light text-pterodactyl-muted text-sm">
              <th className="px-6 py-4 font-medium">User</th>
              <th className="px-6 py-4 font-medium">Role</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-pterodactyl-light/50 hover:bg-pterodactyl-light/30 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-pterodactyl-darker rounded-lg text-pterodactyl-muted">
                      <User size={20} />
                    </div>
                    <div>
                      <p className="text-white font-medium">{user.username}</p>
                      <p className="text-pterodactyl-muted text-sm">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-pterodactyl-muted">
                    <Shield size={16} className={user.role === 'owner' ? 'text-red-400' : 'text-blue-400'} />
                    <span className="capitalize">{user.role}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400">
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button className="p-2 text-blue-400 hover:bg-blue-500/20 rounded-lg transition-colors" title="Reset Password">
                    <Key size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
