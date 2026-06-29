/**
 * Admin Dashboard Page - NOT part of static export
 * This page is intentionally not built into the static export
 * Instead, it should be served from Cloudflare Worker or a separate admin domain
 * 
 * For development/testing, remove from next.config.js output: 'export'
 * or run as dynamic app: next start
 */

'use client';

import { useState } from 'react';

export default function AdminDashboard() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_WORKER_URL + '/admin/login',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ password }),
        }
      );

      if (response.ok) {
        setAuthenticated(true);
        setPassword('');
      } else {
        alert('Invalid password');
      }
    } catch (error) {
      alert('Login failed');
    } finally {
      setLoading(false);
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-600 to-sky-800 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Login</h1>
          <p className="text-gray-600 mb-6">Vidhyalakshmi School Dashboard</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 bg-sky-600 text-white font-semibold rounded-lg hover:bg-sky-700 disabled:opacity-50"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="mt-6 p-4 bg-blue-50 rounded text-sm text-blue-800">
            <p>
              This is a restricted area. Only authorized administrators can access the dashboard.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-sky-600">Admin Dashboard</h1>
          <button
            onClick={async () => {
              await fetch(process.env.NEXT_PUBLIC_WORKER_URL + '/admin/logout', {
                method: 'POST',
                credentials: 'include',
              });
              setAuthenticated(false);
            }}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: 'Content', icon: '📝', desc: 'Manage site content' },
            { title: 'Gallery', icon: '🖼️', desc: 'Upload & manage images' },
            { title: 'Videos', icon: '🎥', desc: 'Manage video content' },
            { title: 'Forms', icon: '📋', desc: 'View form submissions' },
          ].map((item) => (
            <div key={item.title} className="bg-white rounded-lg shadow p-6 cursor-pointer hover:shadow-lg transition">
              <div className="text-4xl mb-4">{item.icon}</div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h2>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Content Manager */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Content Manager</h2>

          <div className="space-y-4">
            {['site.json', 'navigation.json', 'announcements.json', 'homepage.json'].map((file) => (
              <div key={file} className="flex items-center justify-between p-4 bg-gray-50 rounded border border-gray-200">
                <span className="font-mono text-sm text-gray-700">{file}</span>
                <div className="flex gap-2">
                  <button className="px-3 py-1 text-sm bg-sky-600 text-white rounded hover:bg-sky-700">
                    Edit
                  </button>
                  <button className="px-3 py-1 text-sm bg-gray-600 text-white rounded hover:bg-gray-700">
                    Backup
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Media Upload */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Media Upload</h2>

          <div className="border-2 border-dashed border-sky-300 rounded-lg p-8 text-center hover:border-sky-500 transition cursor-pointer">
            <div className="text-4xl mb-2">📁</div>
            <p className="font-semibold text-gray-900 mb-1">Drag and drop files here</p>
            <p className="text-sm text-gray-600">or click to browse</p>
            <input type="file" multiple className="hidden" />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Folder
            </label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded">
              <option>gallery/2024/</option>
              <option>videos/2024/</option>
              <option>newsletters/</option>
              <option>management/</option>
            </select>
          </div>

          <button className="mt-4 w-full py-2 bg-sky-600 text-white font-semibold rounded hover:bg-sky-700">
            Upload
          </button>
        </div>
      </div>
    </div>
  );
}
