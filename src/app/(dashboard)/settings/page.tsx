'use client';

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Settings</h1>

      <div className="bg-pterodactyl-dark border border-pterodactyl-light rounded-xl p-6 max-w-2xl">
        <h2 className="text-xl font-bold text-white mb-6">Server Configuration</h2>
        
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-pterodactyl-muted mb-2">Startup Command</label>
            <input 
              type="text" 
              defaultValue="java -Xms128M -Xmx1024M -jar server.jar"
              className="w-full bg-pterodactyl-darker border border-pterodactyl-light rounded-lg px-4 py-2 text-white focus:outline-none focus:border-pterodactyl-accent" 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-pterodactyl-muted mb-2">Server Timezone</label>
            <select className="w-full bg-pterodactyl-darker border border-pterodactyl-light rounded-lg px-4 py-2 text-white focus:outline-none focus:border-pterodactyl-accent">
              <option value="UTC">UTC</option>
              <option value="Asia/Ho_Chi_Minh">Asia/Ho_Chi_Minh</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-pterodactyl-muted mb-2">Maximum Auto-Backups</label>
            <input 
              type="number" 
              defaultValue={3}
              className="w-full bg-pterodactyl-darker border border-pterodactyl-light rounded-lg px-4 py-2 text-white focus:outline-none focus:border-pterodactyl-accent" 
            />
          </div>

          <div className="pt-4 border-t border-pterodactyl-light">
            <button type="button" className="bg-pterodactyl-accent hover:bg-pterodactyl-accent-hover text-white px-6 py-2 rounded-lg transition-colors">
              Save Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
