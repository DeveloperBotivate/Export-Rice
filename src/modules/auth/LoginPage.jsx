import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, LogIn } from 'lucide-react';

const USERS = [
  {
    id: 'admin',
    password: 'admin123',
    role: 'Super Admin',
    allowedGroups: ['*'],
    icon: '👑',
  },
  {
    id: 'user',
    password: 'user123',
    role: 'User',
    allowedGroups: ['Core System', 'Inventory Management', 'Manufacturing', 'Packing & Finished Goods', 'Sales', 'Audit & Reports'],
    icon: '👤',
  },
];

export { USERS };

export const LoginPage = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    const found = USERS.find(u => u.id === userId.trim() && u.password === password.trim());
    if (!found) {
      setError('Invalid User ID or Password.');
      return;
    }
    setLoading(true);
    localStorage.setItem('rm_user', JSON.stringify({
      role: found.role,
      id: found.id,
      allowedGroups: found.allowedGroups,
      icon: found.icon,
    }));
    setTimeout(() => navigate('/'), 700);
  };

  const handleQuickFill = (u) => {
    setUserId(u.id);
    setPassword(u.password);
    setError('');
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-600 mb-4 shadow-lg">
            <span className="text-3xl">🌾</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-800">Rice Mill ERP</h1>
          <p className="text-slate-500 text-sm mt-1">Sign in to your account</p>
        </div>

        {/* Card */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-8">

          <form onSubmit={handleLogin} className="space-y-5">
            {/* User ID */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">User ID</label>
              <input
                type="text"
                value={userId}
                onChange={e => { setUserId(e.target.value); setError(''); }}
                placeholder="Enter user ID"
                required
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => { setPassword(e.target.value); setError(''); }}
                  placeholder="Enter password"
                  required
                  className="w-full px-4 py-2.5 pr-11 border border-slate-300 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
                <button type="button" onClick={() => setShowPassword(p => !p)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-200 px-3 py-2 rounded-lg">{error}</p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg text-sm flex items-center justify-center gap-2 transition-colors disabled:opacity-60"
            >
              {loading
                ? <><svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4"/><path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg> Signing in...</>
                : <><LogIn size={16} /> Sign In</>
              }
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 pt-5 border-t border-slate-100">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Demo Credentials</p>
            <div className="space-y-2">
              {USERS.map(u => (
                <button
                  key={u.id}
                  onClick={() => handleQuickFill(u)}
                  className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 rounded-lg transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{u.icon}</span>
                    <div className="text-left">
                      <p className="text-sm font-semibold text-slate-700 group-hover:text-blue-700">{u.role}</p>
                      <p className="text-xs text-slate-500">
                        ID: <span className="font-mono text-blue-600">{u.id}</span>
                        &nbsp;·&nbsp;
                        Pass: <span className="font-mono text-blue-600">{u.password}</span>
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-blue-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">Use →</span>
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
