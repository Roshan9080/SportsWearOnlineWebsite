import React, { useState } from 'react';
import {
  X,
  Database,
  FileCode,
  Download,
  Copy,
  Check,
  Server,
  FolderTree,
  Terminal,
  Layers,
  GraduationCap
} from 'lucide-react';
import {
  SQL_SCHEMA_CODE,
  PHP_DB_CODE,
  PHP_REGISTER_CODE,
  PHP_LOGIN_CODE,
  PHP_PRODUCTS_CODE,
  PHP_CART_CODE,
  PHP_CHECKOUT_CODE,
  PHP_ADMIN_PRODUCTS_CODE,
  XAMPP_SETUP_GUIDE
} from '../data/collegeProjectCode';

interface CollegeProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CollegeProjectModal: React.FC<CollegeProjectModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<
    'xampp-guide' | 'sql-schema' | 'db-php' | 'register-php' | 'login-php' | 'products-php' | 'cart-php' | 'checkout-php' | 'admin-php'
  >('xampp-guide');

  const [copied, setCopied] = useState(false);

  const getActiveCode = () => {
    switch (activeTab) {
      case 'xampp-guide':
        return XAMPP_SETUP_GUIDE;
      case 'sql-schema':
        return SQL_SCHEMA_CODE;
      case 'db-php':
        return PHP_DB_CODE;
      case 'register-php':
        return PHP_REGISTER_CODE;
      case 'login-php':
        return PHP_LOGIN_CODE;
      case 'products-php':
        return PHP_PRODUCTS_CODE;
      case 'cart-php':
        return PHP_CART_CODE;
      case 'checkout-php':
        return PHP_CHECKOUT_CODE;
      case 'admin-php':
        return PHP_ADMIN_PRODUCTS_CODE;
      default:
        return '';
    }
  };

  const handleCopy = () => {
    const text = getActiveCode();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadActive = () => {
    const text = getActiveCode();
    let filename = 'sportzone-code.txt';
    if (activeTab === 'xampp-guide') filename = 'SPORTZONE_XAMPP_README.md';
    else if (activeTab === 'sql-schema') filename = 'sportzone_schema.sql';
    else if (activeTab === 'db-php') filename = 'db.php';
    else if (activeTab === 'register-php') filename = 'register.php';
    else if (activeTab === 'login-php') filename = 'login.php';
    else if (activeTab === 'products-php') filename = 'products.php';
    else if (activeTab === 'cart-php') filename = 'cart.php';
    else if (activeTab === 'checkout-php') filename = 'checkout.php';
    else if (activeTab === 'admin-php') filename = 'admin_products.php';

    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/85 backdrop-blur-md" onClick={onClose} />

      {/* Modal Window */}
      <div
        id="college-project-modal"
        className="relative z-10 w-full max-w-5xl bg-[#080D1A] border border-slate-800 rounded-3xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden text-slate-200"
      >
        {/* Modal Top Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-950 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-blue-600/20 border border-blue-500/30 text-blue-400">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-white uppercase tracking-tight">
                COLLEGE FULL-STACK PROJECT PACKAGE
              </h2>
              <p className="text-[11px] text-slate-400">
                MySQL Database Schema (.sql) & Standalone PHP Backend Scripts for XAMPP
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                  <span>Copy Code</span>
                </>
              )}
            </button>

            <button
              onClick={handleDownloadActive}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md shadow-blue-600/20"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download File</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Tabs & Code Viewer */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Left Side File Selector */}
          <div className="w-full md:w-64 bg-slate-950/80 border-r border-slate-800 p-4 space-y-1 overflow-y-auto text-xs shrink-0">
            <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-2 py-1 mb-1">
              DOCUMENTATION
            </div>
            <button
              onClick={() => setActiveTab('xampp-guide')}
              className={`w-full text-left px-3 py-2 rounded-xl flex items-center gap-2 transition-all ${
                activeTab === 'xampp-guide'
                  ? 'bg-blue-600 text-white font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Server className="w-3.5 h-3.5" />
              <span>XAMPP Setup Guide</span>
            </button>

            <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-2 py-1 mt-4 mb-1">
              DATABASE
            </div>
            <button
              onClick={() => setActiveTab('sql-schema')}
              className={`w-full text-left px-3 py-2 rounded-xl flex items-center gap-2 transition-all ${
                activeTab === 'sql-schema'
                  ? 'bg-blue-600 text-white font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Database className="w-3.5 h-3.5 text-amber-400" />
              <span>sportzone_db.sql</span>
            </button>

            <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-2 py-1 mt-4 mb-1">
              PHP BACKEND FILES
            </div>
            {[
              { id: 'db-php', label: 'db.php', icon: FileCode },
              { id: 'register-php', label: 'register.php', icon: FileCode },
              { id: 'login-php', label: 'login.php', icon: FileCode },
              { id: 'products-php', label: 'products.php', icon: FileCode },
              { id: 'cart-php', label: 'cart.php', icon: FileCode },
              { id: 'checkout-php', label: 'checkout.php', icon: FileCode },
              { id: 'admin-php', label: 'admin_products.php', icon: FileCode },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveTab(f.id as any)}
                className={`w-full text-left px-3 py-1.5 rounded-xl flex items-center gap-2 transition-all ${
                  activeTab === f.id
                    ? 'bg-blue-600 text-white font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <f.icon className="w-3.5 h-3.5 text-blue-400" />
                <span>{f.label}</span>
              </button>
            ))}
          </div>

          {/* Right Code Display Area */}
          <div className="flex-1 bg-[#060912] p-4 sm:p-6 overflow-y-auto font-mono text-xs text-slate-300 leading-relaxed select-text">
            <pre className="whitespace-pre-wrap font-mono">{getActiveCode()}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};
