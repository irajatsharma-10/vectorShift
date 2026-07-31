/**
 * @file apiNode.js
 * @description Logic node for executing external HTTP requests and REST API integrations.
 * @module apiNode
 */

import { useState } from 'react';
import { useStore } from '../../store';
import { NodeShell } from '../../components/ui/NodeShell';
import { Globe } from 'lucide-react';

export const type = 'api';
export const label = 'API Request';
export const group = 'AI & Logic';

export const ApiNode = (props) => {
  const { id, data } = props;
  const updateNodeField = useStore((s) => s.updateNodeField);
  
  const [method, setMethod] = useState(data?.method || 'GET');
  const [url, setUrl] = useState(data?.url || '');
  const [headers, setHeaders] = useState(data?.headers || '{\n  "Content-Type": "application/json"\n}');
  const [body, setBody] = useState(data?.body || '');

  const handleMethodChange = (e) => {
    setMethod(e.target.value);
    updateNodeField(id, 'method', e.target.value);
  };

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
    updateNodeField(id, 'url', e.target.value);
  };

  const handleHeadersChange = (e) => {
    setHeaders(e.target.value);
    updateNodeField(id, 'headers', e.target.value);
  };

  const handleBodyChange = (e) => {
    setBody(e.target.value);
    updateNodeField(id, 'body', e.target.value);
  };

  return (
    <NodeShell 
      id={id}
      title="API Request" 
      icon={Globe}
      handles={[
        { type: 'target', position: 'left', id: 'url' },
        { type: 'target', position: 'left', id: 'headers' },
        { type: 'target', position: 'left', id: 'body' },
        { type: 'source', position: 'right', id: 'response' },
        { type: 'source', position: 'right', id: 'error' },
      ]}
    >
      <div className="flex flex-col gap-3 min-w-[200px]">
        <div className="flex gap-2">
          <div className="flex flex-col gap-1 w-1/3">
            <label className="text-[11px] font-semibold text-neutral-600 dark:text-neutral-300">Method</label>
            <select 
              value={method} 
              onChange={handleMethodChange}
              className="w-full bg-neutral-100 dark:bg-[#18181B] border border-neutral-300 dark:border-[#27272A] rounded-md px-2 py-1.5 text-xs font-medium text-neutral-800 dark:text-neutral-200 outline-none focus:border-blue-500 transition-colors"
            >
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="DELETE">DELETE</option>
            </select>
          </div>
          <div className="flex flex-col gap-1 w-2/3">
            <label className="text-[11px] font-semibold text-neutral-600 dark:text-neutral-300">URL</label>
            <input 
              type="text" 
              value={url} 
              onChange={handleUrlChange}
              placeholder="https://api.example.com"
              className="w-full bg-neutral-100 dark:bg-[#18181B] border border-neutral-300 dark:border-[#27272A] rounded-md px-2 py-1.5 text-xs text-neutral-800 dark:text-neutral-200 outline-none focus:border-blue-500 transition-colors font-mono"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-semibold text-neutral-600 dark:text-neutral-300">Headers (JSON)</label>
          <textarea 
            value={headers} 
            onChange={handleHeadersChange}
            className="w-full bg-neutral-100 dark:bg-[#18181B] border border-neutral-300 dark:border-[#27272A] rounded-md px-2 py-1.5 text-[11px] text-neutral-800 dark:text-neutral-200 outline-none focus:border-blue-500 transition-colors font-mono resize-none h-16 leading-relaxed"
          />
        </div>

        {method !== 'GET' && method !== 'DELETE' && (
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-semibold text-neutral-600 dark:text-neutral-300">Body</label>
            <textarea 
              value={body} 
              onChange={handleBodyChange}
              placeholder={'{\n  "key": "value"\n}'}
              className="w-full bg-neutral-100 dark:bg-[#18181B] border border-neutral-300 dark:border-[#27272A] rounded-md px-2 py-1.5 text-[11px] text-neutral-800 dark:text-neutral-200 outline-none focus:border-blue-500 transition-colors font-mono resize-none h-16 leading-relaxed"
            />
          </div>
        )}
      </div>
    </NodeShell>
  );
};
