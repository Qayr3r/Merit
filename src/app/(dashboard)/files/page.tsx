'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Folder, FileText, Download, Trash2, FileEdit, Upload } from 'lucide-react';

interface FileItem {
  name: string;
  isDirectory: boolean;
  size: number;
  modifiedAt: string;
}

export default function FilesPage() {
  const [currentPath, setCurrentPath] = useState('/');
  const [files, setFiles] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFiles(currentPath);
  }, [currentPath]);

  const fetchFiles = async (dir: string) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`http://api.meritmc.net/api/files/list?dir=${encodeURIComponent(dir)}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Sort directories first
      const sorted = res.data.sort((a: FileItem, b: FileItem) => {
        if (a.isDirectory && !b.isDirectory) return -1;
        if (!a.isDirectory && b.isDirectory) return 1;
        return a.name.localeCompare(b.name);
      });
      setFiles(sorted);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const navigateTo = (folder: string) => {
    if (folder === '..') {
      const parts = currentPath.split('/').filter(Boolean);
      parts.pop();
      setCurrentPath('/' + parts.join('/'));
    } else {
      setCurrentPath(currentPath === '/' ? `/${folder}` : `${currentPath}/${folder}`);
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">File Manager</h1>
        <div className="flex gap-4">
          <button className="bg-pterodactyl-light hover:bg-pterodactyl-muted/20 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
            <Upload size={18} /> Upload
          </button>
        </div>
      </div>

      <div className="bg-pterodactyl-dark border border-pterodactyl-light rounded-xl overflow-hidden">
        <div className="p-4 bg-pterodactyl-darker border-b border-pterodactyl-light flex items-center gap-2 text-pterodactyl-muted">
          <span className="text-white font-mono">{currentPath}</span>
        </div>
        
        {loading ? (
          <div className="p-8 text-center text-pterodactyl-muted">Loading files...</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-pterodactyl-light text-pterodactyl-muted text-sm">
                <th className="px-6 py-4 font-medium">Name</th>
                <th className="px-6 py-4 font-medium">Size</th>
                <th className="px-6 py-4 font-medium">Last Modified</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentPath !== '/' && (
                <tr className="border-b border-pterodactyl-light/50 hover:bg-pterodactyl-light/30 transition-colors cursor-pointer" onClick={() => navigateTo('..')}>
                  <td className="px-6 py-4 flex items-center gap-3 text-white">
                    <Folder className="text-pterodactyl-accent" size={20} />
                    ..
                  </td>
                  <td className="px-6 py-4 text-pterodactyl-muted">-</td>
                  <td className="px-6 py-4 text-pterodactyl-muted">-</td>
                  <td className="px-6 py-4 text-right"></td>
                </tr>
              )}
              {files.map((file) => (
                <tr key={file.name} className="border-b border-pterodactyl-light/50 hover:bg-pterodactyl-light/30 transition-colors">
                  <td className="px-6 py-4 flex items-center gap-3 text-white cursor-pointer" onClick={() => file.isDirectory && navigateTo(file.name)}>
                    {file.isDirectory ? (
                      <Folder className="text-pterodactyl-accent" size={20} />
                    ) : (
                      <FileText className="text-pterodactyl-muted" size={20} />
                    )}
                    {file.name}
                  </td>
                  <td className="px-6 py-4 text-pterodactyl-muted">
                    {file.isDirectory ? '-' : formatSize(file.size)}
                  </td>
                  <td className="px-6 py-4 text-pterodactyl-muted">
                    {new Date(file.modifiedAt).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    {!file.isDirectory && (
                      <>
                        <button className="p-2 text-blue-400 hover:bg-blue-500/20 rounded-lg transition-colors" title="Edit">
                          <FileEdit size={16} />
                        </button>
                        <button className="p-2 text-green-400 hover:bg-green-500/20 rounded-lg transition-colors" title="Download">
                          <Download size={16} />
                        </button>
                      </>
                    )}
                    <button className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors" title="Delete">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
