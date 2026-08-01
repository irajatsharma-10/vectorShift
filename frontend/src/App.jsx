/**
 * @file App.js
 * @description Root application component orchestrating the main layout and global state providers.
 * @module App
 */

import { useEffect } from 'react';
import { Toaster } from 'sonner';

import { WorkflowCanvas } from './components/workflow/WorkflowCanvas';
import { X, Sun, Moon, Sidebar } from 'lucide-react';
import { useStore } from './store';
import { ProfessionalSidebar } from './components/layout/ProfessionalSidebar';
import { RunWorkflowButton } from './components/workflow/RunWorkflowButton';

import { startNodeDrag } from './utils/dragUtils';

const NavbarNodeItem = ({ type, label, onRemove }) => {

  return (
    <div
      draggable
      onDragStart={(e) => startNodeDrag(e, type)}
      className="flex items-center justify-between px-2.5 py-1.5 bg-neutral-100 dark:bg-[#18181B] border border-neutral-200 dark:border-[#27272A] hover:border-primary/50 dark:hover:border-primary/50 rounded-lg cursor-grab text-[12px] font-medium text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-all shadow-sm group"
    >
      <span>{label}</span>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
        className="p-0.5 hover:bg-neutral-200 dark:hover:bg-[#27272A] rounded-full transition-colors"
      >
        <X className="w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-600 dark:group-hover:text-neutral-300" />
      </button>
    </div>
  );
};

function App() {
  const favorites = useStore((state) => state.favorites || []);
  const toggleFavorite = useStore((state) => state.toggleFavorite);
  const theme = useStore((state) => state.theme);
  const toggleTheme = useStore((state) => state.toggleTheme);
  const isSidebarOpen = useStore((state) => state.isSidebarOpen);
  const toggleSidebar = useStore((state) => state.toggleSidebar);

  // Map known favorites to labels
  const favoriteItems = favorites.map(f => {
    return { type: f, label: f.replace(/([A-Z])/g, ' $1').trim().replace(/^./, str => str.toUpperCase()) }
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div className="flex flex-col w-screen h-screen bg-neutral-50 dark:bg-[#000000] text-neutral-900 dark:text-white overflow-hidden font-sans transition-colors duration-300">

      <Toaster position="top-center" richColors theme={theme} />

      {/* Top Navbar */}
      <nav className="h-[60px] border-b border-neutral-200 dark:border-[#27272A] bg-white/80 dark:bg-[#09090B]/80 backdrop-blur-xl flex items-center px-6 z-30 relative justify-between transition-colors duration-300">

        {/* Left Side: Logo & Frequently Used */}
        <div className="flex items-center gap-6 flex-1">
          <div className="flex items-center gap-3 shrink-0">
            <div className="relative flex items-center justify-center w-8 h-8 rounded-[8px] bg-[#09090B] dark:bg-white shadow-sm border border-black/10 dark:border-white/10 overflow-hidden shrink-0">
              <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent dark:from-black/10 dark:to-transparent pointer-events-none" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-[18px] h-[18px] text-white dark:text-[#09090B] relative z-10 translate-y-[0.5px]"
              >
                <path d="M4 10l8 8 8-8" />
                <path d="M4 4l8 8 8-8" className="opacity-30" />
              </svg>
            </div>
            <span className="font-bold text-[17px] tracking-tight text-neutral-900 dark:text-white">VectorShift</span>
          </div>

          <div className="h-6 w-px bg-neutral-200 dark:bg-[#27272A]"></div>

          {/* Quick Access / Frequently Used bar */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar mask-fade-edges pb-1 max-w-[600px]">
            <span className="text-[10px] font-bold tracking-wider text-neutral-400 dark:text-neutral-500 uppercase mr-2 shrink-0">Frequent</span>
            {favoriteItems.length > 0 ? (
              favoriteItems.map(item => (
                <NavbarNodeItem
                  key={item.type}
                  type={item.type}
                  label={item.label}
                  onRemove={() => toggleFavorite(item.type)}
                />
              ))
            ) : (
              <span className="text-xs text-neutral-400 dark:text-neutral-500 italic">Pin nodes from the sidebar</span>
            )}
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4 shrink-0">
          <button
            onClick={toggleSidebar}
            className={`p-2 rounded-lg text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white hover:bg-neutral-200 dark:hover:bg-[#27272A] transition-colors shadow-sm ${!isSidebarOpen ? 'bg-neutral-100 dark:bg-[#18181B]' : 'bg-transparent'}`}
            title="Toggle Sidebar"
          >
            <Sidebar className="w-4 h-4" />
          </button>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white bg-neutral-100 hover:bg-neutral-200 dark:bg-[#18181B] dark:hover:bg-[#27272A] transition-colors shadow-sm"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <RunWorkflowButton />
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden relative">
        <ProfessionalSidebar />
        <WorkflowCanvas />
      </div>

    </div>
  );
}

export default App;
