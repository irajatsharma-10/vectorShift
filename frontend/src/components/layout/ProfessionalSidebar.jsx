/**
 * @file ProfessionalSidebar.js
 * @description Primary navigation and node palette interface for building workflows.
 * @module ProfessionalSidebar
 */

import { useState, useEffect, useRef } from 'react';
import { useStore } from '../../store';
import { toolbarItems } from '../../features/nodes';
import { startNodeDrag } from '../../utils/dragUtils';
import {
    Search,
    ChevronDown,
    GripVertical,
    Star,
    ArrowRightToLine,
    ArrowRightFromLine,
    Sparkles,
    Type,
    Globe,
    StickyNote,
    GitMerge,
    GitBranch,
    Clock,
    Box
} from 'lucide-react';

const SidebarItem = ({ type, label, isFavorite, onToggleFavorite }) => {
    const getIconColor = (nodeType) => {
        switch (nodeType) {
            case 'customInput': return 'group-hover:text-emerald-500';
            case 'customOutput': return 'group-hover:text-rose-500';
            case 'llm': return 'group-hover:text-purple-500';
            case 'text': return 'group-hover:text-blue-500';
            case 'api': return 'group-hover:text-cyan-500';
            case 'note': return 'group-hover:text-amber-500';
            case 'merge': return 'group-hover:text-orange-500';
            case 'condition': return 'group-hover:text-indigo-500';
            case 'timer': return 'group-hover:text-pink-500';
            default: return 'group-hover:text-neutral-900 dark:group-hover:text-white';
        }
    };

    const getNodeIcon = (nodeType) => {
        const IconClass = `w-[14px] h-[14px] text-neutral-400 dark:text-neutral-500 transition-colors duration-200 ${getIconColor(nodeType)}`;
        switch (nodeType) {
            case 'customInput': return <ArrowRightToLine className={IconClass} />;
            case 'customOutput': return <ArrowRightFromLine className={IconClass} />;
            case 'llm': return <Sparkles className={IconClass} />;
            case 'text': return <Type className={IconClass} />;
            case 'api': return <Globe className={IconClass} />;
            case 'note': return <StickyNote className={IconClass} />;
            case 'merge': return <GitMerge className={IconClass} />;
            case 'condition': return <GitBranch className={IconClass} />;
            case 'timer': return <Clock className={IconClass} />;
            default: return <Box className={IconClass} />;
        }
    };

    return (
        <div
            className="flex items-center justify-between px-2 py-1.5 bg-transparent hover:bg-black/[0.04] dark:hover:bg-white/[0.06] rounded-md cursor-grab text-[13px] font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors duration-150 group"
            draggable
            onDragStart={(e) => startNodeDrag(e, type)}
            onDragEnd={(e) => (e.target.style.cursor = 'grab')}
        >
            <div className="flex items-center gap-3">
                {getNodeIcon(type)}
                <span className="tracking-wide">{label}</span>
            </div>
            <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button
                    onClick={(e) => { e.stopPropagation(); onToggleFavorite(type); }}
                    title={isFavorite ? "Unpin from Navbar" : "Pin to Navbar"}
                    className="p-0.5 hover:bg-black/10 dark:hover:bg-white/10 rounded text-neutral-400 dark:text-neutral-500"
                >
                    <Star className={`w-3.5 h-3.5 ${isFavorite ? 'fill-primary text-primary' : ''}`} />
                </button>
                <div className="p-0.5 cursor-grab text-neutral-400 dark:text-neutral-500">
                    <GripVertical className="w-3.5 h-3.5" />
                </div>
            </div>
        </div>
    );
};

export const ProfessionalSidebar = () => {
    const favorites = useStore(state => state.favorites || []);
    const toggleFavorite = useStore(state => state.toggleFavorite);
    const isSidebarOpen = useStore(state => state.isSidebarOpen);
    const [searchTerm, setSearchTerm] = useState('');
    const [openGroups, setOpenGroups] = useState(
        Array.from(new Set(toolbarItems.map(item => item.group)))
    );
    const searchInputRef = useRef(null);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
                e.preventDefault();
                searchInputRef.current?.focus();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const toggleGroup = (group) => {
        setOpenGroups(prev =>
            prev.includes(group) ? prev.filter(g => g !== group) : [...prev, group]
        );
    };

    const groupedItems = toolbarItems.reduce((acc, item) => {
        if (!acc[item.group]) acc[item.group] = [];
        acc[item.group].push(item);
        return acc;
    }, {});

    const filteredGroups = Object.entries(groupedItems).map(([group, items]) => {
        const filtered = items.filter(item => item.label.toLowerCase().includes(searchTerm.toLowerCase()));
        return [group, filtered];
    }).filter(([_, items]) => items.length > 0);

    // Custom sorting to match the visual requirement: CORE first, AI & LOGIC second, UTILITIES third
    const groupOrder = ['Core', 'AI & Logic', 'Utilities'];
    filteredGroups.sort((a, b) => {
        const idxA = groupOrder.indexOf(a[0]);
        const idxB = groupOrder.indexOf(b[0]);
        if (idxA === -1 && idxB === -1) return a[0].localeCompare(b[0]);
        if (idxA === -1) return 1;
        if (idxB === -1) return -1;
        return idxA - idxB;
    });

    return (
        <div className={`${isSidebarOpen ? 'w-[260px] opacity-100 translate-x-0' : 'w-0 opacity-0 -translate-x-full border-none'} h-full bg-[#FAFAFA] dark:bg-[#0A0A0A] border-r border-black/[0.06] dark:border-white/[0.04] flex flex-col z-20 flex-shrink-0 transition-all duration-300 ease-out whitespace-nowrap`}>
            {/* Header / Search */}
            <div className="p-4 border-b border-black/[0.04] dark:border-white/[0.02]">
                <div className="relative flex items-center group">
                    <Search className="w-4 h-4 text-neutral-400 absolute left-3 group-focus-within:text-neutral-600 dark:group-focus-within:text-neutral-300 transition-colors duration-200" />
                    <input
                        ref={searchInputRef}
                        type="text"
                        placeholder="Search nodes..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full h-9 pl-9 pr-9 bg-black/[0.03] dark:bg-white/[0.03] border border-transparent rounded-lg text-[13px] text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:bg-black/[0.05] dark:focus:bg-white/[0.06] transition-all"
                    />
                    <div className="absolute right-2 pointer-events-none">
                        <kbd className="hidden sm:flex items-center justify-center h-5 w-5 text-[10px] font-sans font-medium text-neutral-500 border border-black/5 dark:border-white/5 rounded bg-black/[0.02] dark:bg-white/[0.05]">
                            /
                        </kbd>
                    </div>
                </div>
            </div>

            {/* Nodes List */}
            <div className="flex-1 overflow-y-auto no-scrollbar py-4 space-y-6 pb-12">
                {filteredGroups.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-32 space-y-2">
                        <Box className="w-6 h-6 text-neutral-300 dark:text-neutral-600" />
                        <span className="text-[12px] font-medium text-neutral-400">No nodes found</span>
                    </div>
                ) : (
                    filteredGroups.map(([group, items]) => (
                        <div key={group} className="space-y-1">
                            <div
                                className="flex items-center justify-between px-4 py-1.5 cursor-pointer group/header transition-colors hover:bg-black/[0.02] dark:hover:bg-white/[0.02]"
                                onClick={() => toggleGroup(group)}
                            >
                                <span className="text-[11px] font-bold tracking-widest text-neutral-500 dark:text-neutral-400 uppercase">{group}</span>
                                <ChevronDown className={`w-3.5 h-3.5 text-neutral-400 transition-transform duration-200 ${openGroups.includes(group) ? 'rotate-0' : '-rotate-90'}`} />
                            </div>

                            <div className={`space-y-0.5 overflow-hidden transition-all duration-300 ease-in-out ${openGroups.includes(group) ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                {items.map((item) => (
                                    <SidebarItem
                                        key={item.type}
                                        type={item.type}
                                        label={item.label}
                                        isFavorite={(favorites || []).includes(item.type)}
                                        onToggleFavorite={toggleFavorite}
                                    />
                                ))}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

