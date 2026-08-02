/**
 * @file RunWorkflowButton.js
 * @description Control component for executing the current workflow pipeline.
 * @module RunWorkflowButton
 */

// RunWorkflowButton.js

import { useState, useEffect, useCallback } from 'react';
import { useStore } from '../../store';
import { shallow } from 'zustand/shallow';
import { analyzePipeline, executePipeline } from '../../services/api';
import { toast } from 'sonner';
import { Play, Loader2 } from 'lucide-react';

const selector = (state) => ({
    nodes: state.nodes,
    edges: state.edges,
});

export const RunWorkflowButton = () => {
    const { nodes, edges } = useStore(selector, shallow);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = useCallback(async () => {
        if (isLoading) return;
        setIsLoading(true);
        
        try {
            const result = await executePipeline(nodes, edges);
            
            if (result.status === 'success') {
                toast.success('Execution Complete', {
                    description: `Output: ${result.output}`
                });
            } else {
                toast.error('Execution Failed', {
                    description: result.message || 'Pipeline failed to execute.'
                });
            }
        } catch (error) {
            console.error('Submission failed:', error);
            toast.error('Connection Failed', {
                description: 'Failed to execute pipeline. Ensure the backend is running on port 8000.'
            });
        } finally {
            setIsLoading(false);
        }
    }, [nodes, edges, isLoading]);

    // Keyboard shortcut: Cmd/Ctrl + Enter
    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
                e.preventDefault();
                handleSubmit();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleSubmit]);

    return (
        <button 
            type="button" 
            onClick={handleSubmit}
            disabled={isLoading}
            className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-primary hover:from-purple-400 hover:to-purple-500 text-white text-[11px] font-bold tracking-wider uppercase py-1.5 px-4 rounded-lg transition-all duration-300 active:opacity-80 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(124,58,237,0.2)] hover:shadow-[0_0_20px_rgba(124,58,237,0.4)] border border-white/10"
        >
            {isLoading ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
                <Play className="w-3.5 h-3.5 fill-white" />
            )}
            Run
        </button>
    );
};
