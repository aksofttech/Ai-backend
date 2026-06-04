"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Mail, Lock, User, ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Placeholder for actual signup logic
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    alert('Signup successful! Redirecting to login...');
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col justify-center items-center font-sans selection:bg-neon-purple selection:text-white px-4 relative overflow-hidden">
      {/* Background glowing effects */}
      <div className="absolute w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-green/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-neon-purple/20 rounded-full blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="glass-panel p-10 rounded-3xl w-full max-w-md z-10 relative"
      >
        <div className="flex flex-col items-center mb-8">
          <Link href="/">
            <div className="w-16 h-16 rounded-2xl bg-emerald-green/20 flex items-center justify-center mb-6 cursor-pointer hover:bg-emerald-green/30 transition-colors">
              <Brain className="w-8 h-8 text-emerald-green" />
            </div>
          </Link>
          <h2 className="text-3xl font-bold tracking-tight">Create an Account</h2>
          <p className="text-gray-400 mt-2 text-sm text-center">Join YugSoft AI and supercharge your teaching.</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-500" />
              </div>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-glass-border rounded-xl bg-black/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-green focus:border-transparent transition-all"
                placeholder="Jane Doe"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-500" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-glass-border rounded-xl bg-black/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-green focus:border-transparent transition-all"
                placeholder="you@school.edu"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-500" />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-glass-border rounded-xl bg-black/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-green focus:border-transparent transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 mt-6 bg-emerald-green text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-[#059669] transition-colors shadow-[0_0_15px_rgba(16,185,129,0.3)] disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Sign Up'}
            {!isLoading && <ArrowRight className="w-4 h-4" />}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-400">
          Already have an account?{' '}
          <Link href="/login" className="text-emerald-green font-medium hover:text-white transition-colors">
            Log in instead
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
