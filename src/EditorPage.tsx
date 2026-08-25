/// <reference types="vite/client" />
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import { FolderOpen, FileJson, ChevronRight, Download, ChevronDown, Code, Eye, Check } from 'lucide-react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { UI_LABELS } from './constants/uiLabels';
import { useLanguage } from './context/LanguageContext';
import Navbar from './components/Navbar';
import { QuranPreview } from './components/QuranPreview';

// Dynamically discover all JSON files inside /languages
const rawModules = import.meta.glob(['/languages/**/*.json', './languages/**/*.json'], {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

interface FileInfo {
  fullPath: string;
  folder: string;
  fileName: string;
  content: string;
}

function HighlightJsonLine({ line }: { line: string }) {
  if (!line && line !== '') return null;
  if (line === '') return <br />;

  const tokenRegex = /("(\\u[a-fA-F0-9]{4}|\\[^u]|[^\\"])*"\s*:?|\b(?:true|false|null)\b|-?\d+(?:\.\d+)?(?:[eE][+\-]?\d+)?|[{} \[\],])/g;

  const elements: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = tokenRegex.exec(line)) !== null) {
    const textBefore = line.substring(lastIndex, match.index);
    if (textBefore) {
      elements.push(<span key={`txt-${lastIndex}`}>{textBefore}</span>);
    }

    const token = match[0];
    const keyIndex = match.index;

    if (token.startsWith('"')) {
      if (token.endsWith(':')) {
        const keyText = token.slice(0, -1);
        elements.push(
          <span key={`key-${keyIndex}`} className="text-[#9cdcfe] font-medium">
            {keyText}
          </span>
        );
        elements.push(
          <span key={`col-${keyIndex}`} className="text-[#d4d4d4]">
            :
          </span>
        );
      } else {
        elements.push(
          <span key={`str-${keyIndex}`} className="text-[#ce9178]">
            {token}
          </span>
        );
      }
    } else if (token === 'true' || token === 'false') {
      elements.push(
        <span key={`bool-${keyIndex}`} className="text-[#569cd6] font-semibold">
          {token}
        </span>
      );
    } else if (token === 'null') {
      elements.push(
        <span key={`null-${keyIndex}`} className="text-[#569cd6] italic">
          {token}
        </span>
      );
    } else if (/^-?\d+(?:\.\d+)?(?:[eE][+\-]?\d+)?$/.test(token)) {
      elements.push(
        <span key={`num-${keyIndex}`} className="text-[#b5cea8]">
          {token}
        </span>
      );
    } else if (['{', '}', '[', ']'].includes(token)) {
      elements.push(
        <span key={`punc-${keyIndex}`} className="text-[#ffd700] font-bold">
          {token}
        </span>
      );
    } else if (token === ',') {
      elements.push(
        <span key={`comma-${keyIndex}`} className="text-[#808080]">
          {token}
        </span>
      );
    } else {
      elements.push(<span key={`def-${keyIndex}`}>{token}</span>);
    }

    lastIndex = tokenRegex.lastIndex;
  }

  const textAfter = line.substring(lastIndex);
  if (textAfter) {
    elements.push(<span key={`end-${lastIndex}`}>{textAfter}</span>);
  }

  return <>{elements}</>;
}

function JsonSyntaxViewer({ jsonString }: { jsonString: string }) {
  const lines = useMemo(() => jsonString.split('\n'), [jsonString]);

  return (
    <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain bg-[#1e1e1e] text-[#d4d4d4] font-mono text-xs sm:text-sm leading-6 select-text">
      <div className="py-3">
        {lines.map((line, index) => (
          <div key={index} className="flex hover:bg-[#2a2d2e] transition-colors px-2 py-0.5">
            <span className="w-11 shrink-0 select-none text-right pr-3 text-[#6e7681] text-xs leading-6 font-mono border-r border-[#30363d] mr-3">
              {index + 1}
            </span>
            <span className="flex-1 whitespace-pre-wrap break-all font-mono leading-6">
              <HighlightJsonLine line={line} />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

interface DropdownOption {
  value: string;
  label: string;
  subLabel?: string;
  icon?: React.ReactNode;
}

interface BreadcrumbDropdownProps {
  value: string;
  options: DropdownOption[];
  onSelect: (value: string) => void;
  icon?: React.ReactNode;
  accentClass?: string;
  isMono?: boolean;
}

function BreadcrumbDropdown({
  value,
  options,
  onSelect,
  icon,
  accentClass = 'bg-stone-100 text-stone-800 border-stone-200 hover:bg-stone-200/80',
  isMono = false,
}: BreadcrumbDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.value === value) || options[0];

  return (
    <div className="relative inline-block text-left" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all duration-150 cursor-pointer select-none ${accentClass} ${
          isOpen ? 'ring-2 ring-emerald-600/20 border-emerald-600 shadow-xs scale-[1.01]' : 'shadow-2xs hover:shadow-xs'
        }`}
      >
        {icon}
        <span className={isMono ? 'font-mono' : 'font-semibold'}>
          {selectedOption ? selectedOption.label : value || '—'}
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 opacity-60 transition-transform duration-200 ${
            isOpen ? 'rotate-180 opacity-100 text-emerald-600' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1.5 z-50 min-w-[200px] max-w-[280px] bg-white border border-stone-200 rounded-xl shadow-xl py-1.5 max-h-64 overflow-y-auto overscroll-contain animate-in fade-in slide-in-from-top-1 duration-150">
          {options.length === 0 ? (
            <div className="px-3 py-2 text-xs text-stone-400 italic text-center">
              No options available
            </div>
          ) : (
            options.map((option) => {
              const isSelected = option.value === value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onSelect(option.value);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left flex items-center justify-between px-3 py-2 text-xs transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-50 text-emerald-950 font-medium'
                      : 'text-stone-700 hover:bg-emerald-50/60 hover:text-emerald-900'
                  }`}
                >
                  <div className="flex items-center space-x-2 min-w-0 pr-2">
                    {option.icon && (
                      <span className={`shrink-0 ${isSelected ? 'text-emerald-600' : 'text-stone-400'}`}>
                        {option.icon}
                      </span>
                    )}
                    <span className={`truncate ${isMono ? 'font-mono' : ''}`}>
                      {option.label}
                    </span>
                  </div>

                  <div className="flex items-center space-x-1.5 shrink-0">
                    {option.subLabel && (
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                          isSelected
                            ? 'bg-emerald-200/80 text-emerald-900 font-medium'
                            : 'bg-stone-100 text-stone-500'
                        }`}
                      >
                        {option.subLabel}
                      </span>
                    )}
                    {isSelected && <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
                  </div>
                </button>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}

export default function App() {
  const { appLanguage } = useLanguage();
  const labels = UI_LABELS[appLanguage] || UI_LABELS['English'];

  // Parse discovering files into structured data
  const files: FileInfo[] = useMemo(() => {
    const list: FileInfo[] = [];
    for (const [path, content] of Object.entries(rawModules)) {
      // Normalize path: e.g., '/languages/Indonesia/Al-Fatihah.json' -> 'Indonesia/Al-Fatihah.json'
      const cleanPath = path.replace(/^(\.\/|\/)?languages\//, '');
      const parts = cleanPath.split('/');
      if (parts.length >= 2) {
        const folder = parts[0];
        const fileName = parts.slice(1).join('/');
        list.push({
          fullPath: path,
          folder,
          fileName,
          content: typeof content === 'string' ? content : JSON.stringify(content, null, 2),
        });
      }
    }
    return list;
  }, []);

  // Extract unique folders (e.g., 'Indonesia', 'Arab')
  const folders = useMemo(() => {
    const set = new Set<string>();
    files.forEach((f) => set.add(f.folder));
    return Array.from(set).sort();
  }, [files]);

  const [searchParams] = useSearchParams();
  const location = useLocation();

  const paramFolder = searchParams.get('folder') || searchParams.get('lang');
  const paramFile = searchParams.get('file') || searchParams.get('surah');
  const paramVerseStr = searchParams.get('verse') || searchParams.get('ayat') || (location.hash.startsWith('#verse-') ? location.hash.replace('#verse-', '') : null);
  const paramVerse = paramVerseStr ? parseInt(paramVerseStr, 10) : null;

  // Selected folder and file states
  const [selectedFolder, setSelectedFolder] = useState<string>(() => {
    if (paramFolder) {
      const matched = folders.find((f) => f.toLowerCase() === paramFolder.toLowerCase());
      if (matched) return matched;
    }
    return folders[0] || 'Bahasa Indonesia';
  });

  const [viewMode, setViewMode] = useState<'code' | 'preview'>('preview');

  // If search params change
  useEffect(() => {
    if (paramFolder) {
      const matched = folders.find((f) => f.toLowerCase() === paramFolder.toLowerCase());
      if (matched && matched !== selectedFolder) {
        setSelectedFolder(matched);
      }
    }
  }, [paramFolder, folders]);

  // Ensure viewMode is 'preview' when verse param is present
  useEffect(() => {
    if (paramVerse) {
      setViewMode('preview');
    }
  }, [paramVerse]);
  
  // Get list of files in the selected folder, sorted by surah_number in JSON
  const folderFiles = useMemo(() => {
    const list = files.filter((f) => f.folder === selectedFolder);
    return list.sort((a, b) => {
      let numA = 999;
      let numB = 999;
      try {
        const parsedA = JSON.parse(a.content);
        if (typeof parsedA.surah_number === 'number') numA = parsedA.surah_number;
      } catch {}
      try {
        const parsedB = JSON.parse(b.content);
        if (typeof parsedB.surah_number === 'number') numB = parsedB.surah_number;
      } catch {}

      if (numA !== numB) return numA - numB;
      return a.fileName.localeCompare(b.fileName);
    });
  }, [files, selectedFolder]);

  const [selectedFileName, setSelectedFileName] = useState<string>(() => {
    if (paramFile) {
      const matchedFile = files.find((f) => 
        (paramFolder ? f.folder.toLowerCase() === paramFolder.toLowerCase() : true) &&
        (f.fileName.toLowerCase() === paramFile.toLowerCase() || f.fileName.toLowerCase().includes(paramFile.toLowerCase()))
      );
      if (matchedFile) return matchedFile.fileName;
    }

    const currentFolderFiles = files.filter((f) => f.folder === (paramFolder || folders[0] || 'Bahasa Indonesia'));
    const sorted = [...currentFolderFiles].sort((a, b) => {
      let numA = 999;
      let numB = 999;
      try {
        const parsedA = JSON.parse(a.content);
        if (typeof parsedA.surah_number === 'number') numA = parsedA.surah_number;
      } catch {}
      try {
        const parsedB = JSON.parse(b.content);
        if (typeof parsedB.surah_number === 'number') numB = parsedB.surah_number;
      } catch {}
      return numA - numB;
    });
    return sorted[0] ? sorted[0].fileName : '';
  });

  useEffect(() => {
    if (paramFile) {
      const matchedFile = folderFiles.find((f) =>
        f.fileName.toLowerCase() === paramFile.toLowerCase() || f.fileName.toLowerCase().includes(paramFile.toLowerCase())
      );
      if (matchedFile && matchedFile.fileName !== selectedFileName) {
        setSelectedFileName(matchedFile.fileName);
      }
    }
  }, [paramFile, folderFiles]);

  // Active file content object
  const activeFile = useMemo(() => {
    return files.find((f) => f.folder === selectedFolder && f.fileName === selectedFileName) || folderFiles[0] || null;
  }, [files, selectedFolder, selectedFileName, folderFiles]);

  // Options for Language Folder Dropdown
  const folderOptions: DropdownOption[] = useMemo(() => {
    return folders.map((folder) => {
      const count = files.filter((f) => f.folder === folder).length;
      return {
        value: folder,
        label: folder,
        subLabel: `${count} ${count === 1 ? 'file' : 'files'}`,
        icon: <FolderOpen className="w-4 h-4 text-emerald-600 shrink-0" />,
      };
    });
  }, [folders, files]);

  // Options for JSON File Dropdown
  const fileOptions: DropdownOption[] = useMemo(() => {
    return folderFiles.map((file) => ({
      value: file.fileName,
      label: file.fileName,
      icon: <FileJson className="w-4 h-4 text-amber-500 shrink-0" />,
    }));
  }, [folderFiles]);

  const handleSelectFolder = (folderName: string) => {
    setSelectedFolder(folderName);
    const targetFolderFiles = files.filter((f) => f.folder === folderName).sort((a, b) => {
      let numA = 999;
      let numB = 999;
      try {
        const parsedA = JSON.parse(a.content);
        if (typeof parsedA.surah_number === 'number') numA = parsedA.surah_number;
      } catch {}
      try {
        const parsedB = JSON.parse(b.content);
        if (typeof parsedB.surah_number === 'number') numB = parsedB.surah_number;
      } catch {}
      return numA - numB;
    });
    if (targetFolderFiles.length > 0) {
      setSelectedFileName(targetFolderFiles[0].fileName);
    } else {
      setSelectedFileName('');
    }
  };

  const handleDownloadLanguages = () => {
    const zip = new JSZip();
    const languagesFolder = zip.folder('languages');

    // Ensure all discovered folders are added
    folders.forEach((folder) => {
      languagesFolder?.folder(folder);
    });

    // Add all JSON files under their respective folder inside languages/
    files.forEach((file) => {
      languagesFolder?.file(`${file.folder}/${file.fileName}`, file.content);
    });

    // Generate ZIP file and trigger download
    zip.generateAsync({ type: 'blob' }).then((blob) => {
      saveAs(blob, 'languages.zip');
    });
  };

  // Format content for display
  const formattedContent = useMemo(() => {
    if (!activeFile) return '';
    try {
      const parsed = JSON.parse(activeFile.content);
      return JSON.stringify(parsed, null, 2);
    } catch {
      return activeFile.content;
    }
  }, [activeFile]);

  return (
    <div className="h-screen bg-stone-50 text-slate-800 flex flex-col font-sans overflow-hidden">
      {/* Shared Navbar (Identical to Landing Page) */}
      <Navbar />

      {/* Sub Topbar (Modern Breadcrumb Toolbar) */}
      <div className="w-full bg-white/95 backdrop-blur-md border-b border-stone-200/80 shadow-2xs z-30 shrink-0">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 py-2 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2.5 text-xs text-stone-600">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-400 select-none pl-0.5">
              {labels.languagesBreadcrumb}
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-stone-300 shrink-0" />

            {/* Folder Inline Dropdown */}
            <BreadcrumbDropdown
              value={selectedFolder}
              options={folderOptions}
              onSelect={handleSelectFolder}
              icon={<FolderOpen className="w-3.5 h-3.5 text-emerald-700 shrink-0" />}
              accentClass="bg-emerald-50/70 text-emerald-950 border-emerald-200/80 hover:bg-emerald-100/80"
            />

            <ChevronRight className="w-3.5 h-3.5 text-stone-300 shrink-0" />

            {/* File Inline Dropdown */}
            <BreadcrumbDropdown
              value={activeFile?.fileName || selectedFileName}
              options={fileOptions}
              onSelect={setSelectedFileName}
              icon={<FileJson className="w-3.5 h-3.5 text-amber-600 shrink-0" />}
              accentClass="bg-stone-50 text-stone-800 border-stone-200/80 hover:bg-stone-100/80"
              isMono={true}
            />

            {/* View Mode Segmented Pill */}
            <div className="inline-flex items-center p-1 bg-stone-100/80 border border-stone-200/70 rounded-lg ml-1 font-sans shrink-0 gap-0.5">
              <button
                type="button"
                onClick={() => setViewMode('code')}
                className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-md transition-all duration-150 cursor-pointer ${
                  viewMode === 'code'
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-950 hover:bg-stone-200/50'
                }`}
              >
                <Code className="w-3.5 h-3.5" />
                <span>{labels.codeToggle}</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('preview')}
                className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-md transition-all duration-150 cursor-pointer ${
                  viewMode === 'preview'
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-950 hover:bg-stone-200/50'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{labels.previewToggle}</span>
              </button>
            </div>
          </div>

          {/* Right section: metadata badge */}
          {activeFile && (
            <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-stone-100/80 border border-stone-200/60 text-[11px] font-mono text-stone-500">
              <span>{formattedContent.length} {labels.charactersLabel}</span>
              <span className="text-stone-300">•</span>
              <span>{formattedContent.split('\n').length} {labels.linesLabel}</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 min-h-0 p-3 sm:p-4 md:p-6 flex flex-col z-20 max-w-[1920px] w-full mx-auto">
        
        {/* Content Box (Code / Preview) */}
        <div className="w-full flex-1 min-h-0 bg-white border border-stone-200 rounded-xl shadow-2xs flex flex-col overflow-hidden">
          {/* Viewer Content Body (Only area that scrolls) */}
          {activeFile ? (
            viewMode === 'code' ? (
              <JsonSyntaxViewer jsonString={formattedContent} />
            ) : (
              <QuranPreview
                jsonString={formattedContent}
                appLanguage={appLanguage}
                folder={selectedFolder}
                fileName={activeFile?.fileName || selectedFileName}
                initialVerse={paramVerse}
              />
            )
          ) : (
            <div className="flex-1 min-h-0 flex flex-col items-center justify-center text-stone-500 text-center space-y-2 bg-[#1e1e1e] p-5">
              <FileJson className="w-10 h-10 stroke-1 text-stone-600" />
              <p className="text-sm">{labels.noFileSelected}</p>
            </div>
          )}

        </div>

      </main>
    </div>
  );
}

