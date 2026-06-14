'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Server, Terminal, Folder, Settings, Users, LogOut } from 'lucide-react';

const navItems = [
  { name: 'Dashboard', href: '/', icon: Server },
  { name: 'Console', href: '/console', icon: Terminal },
  { name: 'File Manager', href: '/files', icon: Folder },
  { name: 'Users', href: '/users', icon: Users },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-pterodactyl-dark h-screen border-r border-pterodactyl-light flex flex-col">
      <div className="p-6">
        <h1 className="text-xl font-bold text-white flex items-center gap-2">
          <Server className="text-pterodactyl-accent" />
          MC Panel
        </h1>
      </div>
      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-pterodactyl-light text-white'
                  : 'text-pterodactyl-muted hover:bg-pterodactyl-light/50 hover:text-white'
              }`}
            >
              <Icon size={20} />
              {item.name}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-pterodactyl-light">
        <button className="flex items-center gap-3 px-4 py-3 w-full text-left text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </div>
  );
}
