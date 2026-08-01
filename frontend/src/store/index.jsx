/**
 * @file index.js
 * @description Global Zustand state management for the workflow builder, managing nodes and edges.
 * @module index
 */

// builderStore.js

import { create } from "zustand";
import {
    addEdge,
    applyNodeChanges,
    applyEdgeChanges,
    MarkerType,
  } from 'reactflow';

export const useStore = create((set, get) => ({
    nodes: [],
    edges: [],
    nodeIDs: {},
    theme: localStorage.getItem('theme') || 'dark',
    toggleTheme: () => {
      const newTheme = get().theme === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', newTheme);
      set({ theme: newTheme });
    },
    isSidebarOpen: localStorage.getItem('isSidebarOpen') !== 'false',
    toggleSidebar: () => {
      const newState = !get().isSidebarOpen;
      localStorage.setItem('isSidebarOpen', newState);
      set({ isSidebarOpen: newState });
    },
    favorites: JSON.parse(localStorage.getItem('vectorShiftFavorites') || '[]'),
    toggleFavorite: (type) => {
        set((state) => {
            const newFavs = state.favorites.includes(type) 
                ? state.favorites.filter(t => t !== type) 
                : [...state.favorites, type];
            localStorage.setItem('vectorShiftFavorites', JSON.stringify(newFavs));
            return { favorites: newFavs };
        });
    },
    getNodeID: (type) => {
        const newIDs = {...get().nodeIDs};
        if (newIDs[type] === undefined) {
            newIDs[type] = 0;
        }
        newIDs[type] += 1;
        set({nodeIDs: newIDs});
        return `${type}-${newIDs[type]}`;
    },
    addNode: (node) => {
        set({
            nodes: [...get().nodes, node]
        });
    },
    removeNode: (nodeId) => {
      set({
        nodes: get().nodes.filter((node) => node.id !== nodeId),
        edges: get().edges.filter((edge) => edge.source !== nodeId && edge.target !== nodeId),
      });
    },
    onNodesChange: (changes) => {
      set({
        nodes: applyNodeChanges(changes, get().nodes),
      });
    },
    onEdgesChange: (changes) => {
      set({
        edges: applyEdgeChanges(changes, get().edges),
      });
    },
    onConnect: (connection) => {
      set({
        edges: addEdge({...connection, type: 'smoothstep', animated: true, style: { strokeWidth: 2, stroke: '#52525B', strokeDasharray: '5 5' }, markerEnd: { type: MarkerType.ArrowClosed, width: 12, height: 12, color: '#52525B' } }, get().edges),
      });
    },
    updateNodeField: (nodeId, fieldName, fieldValue) => {
      set({
        nodes: get().nodes.map((node) => {
          if (node.id === nodeId) {
            node.data = { ...node.data, [fieldName]: fieldValue };
          }
  
          return node;
        }),
      });
    },
  }));
