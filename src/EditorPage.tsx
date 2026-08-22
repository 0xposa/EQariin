/// <reference types="vite/client" />
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Folder, FolderOpen, FileJson, ChevronRight, Copy, Check, BookOpen, Layers, Download, Info, ChevronDown, ExternalLink, User, TrendingUp, Code, Eye, Globe } from 'lucide-react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { AppLanguage, APP_LANGUAGES, UI_LABELS } from './constants/uiLabels';
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
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs font-medium transition-all cursor-pointer select-none ${accentClass} ${
          isOpen ? 'ring-2 ring-emerald-500/30 border-emerald-500 shadow-xs' : 'shadow-2xs'
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

  // Selected folder and file states
  const [selectedFolder, setSelectedFolder] = useState<string>(() => folders[0] || 'Bahasa Indonesia');
  const [viewMode, setViewMode] = useState<'code' | 'preview'>('code');
  
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
    const indonesiaFiles = files.filter((f) => f.folder === (folders[0] || 'Bahasa Indonesia'));
    const sorted = [...indonesiaFiles].sort((a, b) => {
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

  const [copied, setCopied] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const aboutRef = useRef<HTMLDivElement>(null);

  const [appLanguage, setAppLanguage] = useState<AppLanguage>('Bahasa Indonesia');
  const labels = UI_LABELS[appLanguage] || UI_LABELS['Bahasa Indonesia'];
  const [isAppLangOpen, setIsAppLangOpen] = useState(false);
  const appLangRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (aboutRef.current && !aboutRef.current.contains(event.target as Node)) {
        setIsAboutOpen(false);
      }
      if (appLangRef.current && !appLangRef.current.contains(event.target as Node)) {
        setIsAppLangOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

  const handleCopy = () => {
    if (!activeFile) return;
    navigator.clipboard.writeText(activeFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
    <div className="fixed inset-0 bg-stone-50 text-slate-800 flex flex-col font-sans overflow-hidden">
      {/* Top Header (Fixed at top) */}
      <header className="fixed top-0 left-0 right-0 h-[65px] bg-white border-b border-stone-200 z-50 px-4 md:px-6 py-3.5 shadow-sm flex items-center justify-between">
        <div className="w-full max-w-[1920px] mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-emerald-50 text-emerald-700 rounded-lg">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-stone-900 tracking-tight">
                Muslim Plus
              </h1>
              <p className="text-xs text-stone-500">
                Global Quran Metadata
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100/80 text-emerald-800 border border-emerald-200/60">
              <Layers className="w-3.5 h-3.5 mr-1" />
              {folders.length} {labels.languagesAvailableBadge}
            </span>

            {/* About Us Dropdown */}
            <div className="relative" ref={aboutRef}>
              <button
                onClick={() => setIsAboutOpen(!isAboutOpen)}
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-stone-100 text-stone-700 font-medium text-xs rounded-lg border border-stone-200 transition-colors shadow-2xs cursor-pointer"
                title={labels.aboutUsButton}
              >
                <Info className="w-3.5 h-3.5 text-emerald-700" />
                <span>{labels.aboutUsButton}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-stone-400 transition-transform duration-200 ${isAboutOpen ? 'rotate-180' : ''}`} />
              </button>

              {isAboutOpen && (
                <div className="absolute right-0 mt-2 w-[340px] bg-white rounded-xl shadow-lg border border-stone-200 p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-3">
                    {labels.aboutTitle}
                  </div>
                  
                  <div className="flex items-start space-x-3 p-2.5 bg-stone-50 rounded-lg border border-stone-100">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden bg-stone-200 shrink-0 border border-stone-200 mt-0.5">
                      <img
                        src="https://unavatar.io/x/0xposa"
                        alt="0xposa Twitter Profile"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fallback avatar icon if unavatar fails
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                      <div className="w-full h-full flex items-center justify-center bg-emerald-700 text-white font-bold text-sm">
                        0x
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <h3 className="font-bold text-stone-900 text-sm leading-snug">
                          HARI-HARI BINTANG PERUBAHAN
                        </h3>
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200/80 shrink-0">
                          {labels.founderTitle}
                        </span>
                      </div>
                      <p className="text-xs text-stone-500 font-mono mt-0.5">
                        @0xposa
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-stone-100 flex flex-col gap-2">
                    <a
                      href="https://x.com/EQariin"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between px-3 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-medium transition-colors shadow-2xs"
                    >
                      <div className="flex items-center gap-2">
                        {/* Twitter / X Logo standard vector */}
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                        </svg>
                        <span>{labels.followX}</span>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
                    </a>

                    <a
                      href="https://discord.gg/XsHdgf4Eb"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between px-3 py-2 bg-[#5865F2] hover:bg-[#4752C4] text-white rounded-lg text-xs font-medium transition-colors shadow-2xs"
                    >
                      <div className="flex items-center gap-2">
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                        </svg>
                        <span>{labels.joinDiscord}</span>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-[#C4C9FA]" />
                    </a>

                    <a
                      href="https://wa.me/6282197362062"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between px-3 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-medium transition-colors shadow-2xs"
                    >
                      <div className="flex items-center gap-2">
                        <svg className="w-3.5 h-3.5 fill-current text-white" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c-.001 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                        </svg>
                        <span>{labels.contactWA}</span>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-emerald-200" />
                    </a>
                  </div>

                  <div className="mt-3 pt-3 border-t border-stone-100 flex flex-col gap-2">
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-stone-400 px-1 pb-1">
                      {labels.investorRelations}
                    </div>
                    <a
                      href="https://wa.me/6282197362062?text=Hello%20I%20am%20interested%20in%20becoming%20an%20investor%20for%20Muslim%20Plus"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between px-3 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-medium transition-colors shadow-2xs"
                    >
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{labels.supportVision}</span>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* App Language Dropdown */}
            <div className="relative" ref={appLangRef}>
              <button
                onClick={() => setIsAppLangOpen(!isAppLangOpen)}
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-stone-100 text-stone-700 font-medium text-xs rounded-lg border border-stone-200 transition-colors shadow-2xs cursor-pointer"
                title={labels.selectAppLanguageHeader}
              >
                <Globe className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <span className="text-stone-900 font-semibold">{appLanguage}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-stone-400 shrink-0 transition-transform duration-200 ${isAppLangOpen ? 'rotate-180' : ''}`} />
              </button>

              {isAppLangOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-lg border border-stone-200 py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150 max-h-72 overflow-y-auto">
                  <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-stone-400 border-b border-stone-100 mb-1">
                    {labels.selectAppLanguageHeader}
                  </div>
                  {APP_LANGUAGES.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        setAppLanguage(lang);
                        setIsAppLangOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-stone-50 transition-colors cursor-pointer ${
                        appLanguage === lang ? 'font-semibold text-emerald-700 bg-emerald-50/60' : 'text-stone-700'
                      }`}
                    >
                      <span>{lang}</span>
                      {appLanguage === lang && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={handleDownloadLanguages}
              className="inline-flex items-center gap-2 px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-medium text-xs rounded-lg transition-colors shadow-2xs cursor-pointer"
              title={labels.downloadLanguagesButton}
            >
              <Download className="w-3.5 h-3.5" />
              <span>{labels.downloadLanguagesButton}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area (Fixed Block beneath Header, dynamically occupying remaining viewport height) */}
      <main className="fixed top-[65px] left-0 right-0 bottom-0 p-3 sm:p-4 md:p-6 flex flex-col z-30 max-w-[1920px] mx-auto">
        
        {/* Single Combined Fixed Container for Dropdowns + Code Box */}
        <div className="w-full flex-1 min-h-0 bg-white border border-stone-200 rounded-xl shadow-2xs flex flex-col overflow-hidden">
          
          {/* Header Bar: Breadcrumb Dropdowns + File Metadata + Copy Button */}
          <div className="bg-white border-b border-stone-200 px-4 sm:px-5 py-3 flex flex-wrap items-center justify-between gap-3 shrink-0 z-20">
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-stone-600">
              <span className="text-stone-400 font-medium select-none">{labels.languagesBreadcrumb}</span>
              <ChevronRight className="w-3.5 h-3.5 text-stone-300 shrink-0" />

              {/* Folder Inline Dropdown */}
              <BreadcrumbDropdown
                value={selectedFolder}
                options={folderOptions}
                onSelect={handleSelectFolder}
                icon={<FolderOpen className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
                accentClass="bg-emerald-50 text-emerald-900 border-emerald-200/90 hover:bg-emerald-100/90"
              />

              <ChevronRight className="w-3.5 h-3.5 text-stone-300 shrink-0" />

              {/* File Inline Dropdown */}
              <BreadcrumbDropdown
                value={activeFile?.fileName || selectedFileName}
                options={fileOptions}
                onSelect={setSelectedFileName}
                icon={<FileJson className="w-3.5 h-3.5 text-amber-500 shrink-0" />}
                accentClass="bg-stone-100 text-stone-900 border-stone-200/90 hover:bg-stone-200/90"
                isMono={true}
              />

              {/* View Mode Toggle Switch */}
              <div className="inline-flex items-center p-0.5 bg-stone-100/90 border border-stone-200/90 rounded-md ml-1 font-sans shrink-0">
                <button
                  type="button"
                  onClick={() => setViewMode('code')}
                  className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded transition-all cursor-pointer ${
                    viewMode === 'code'
                      ? 'bg-stone-900 text-white shadow-2xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <Code className="w-3.5 h-3.5" />
                  <span>{labels.codeToggle}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('preview')}
                  className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded transition-all cursor-pointer ${
                    viewMode === 'preview'
                      ? 'bg-emerald-700 text-white shadow-2xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{labels.previewToggle}</span>
                </button>
              </div>
            </div>

            {activeFile && (
              <div className="flex items-center space-x-3">
                <span className="text-[11px] text-stone-400 font-mono hidden sm:inline-block">
                  {formattedContent.length} {labels.charactersLabel} | {formattedContent.split('\n').length} {labels.linesLabel}
                </span>
                <button
                  onClick={handleCopy}
                  className="flex items-center space-x-1.5 px-3 py-1.5 bg-white border border-stone-200 text-stone-700 hover:bg-stone-50 hover:border-stone-300 rounded-lg text-xs font-medium transition-all shadow-2xs cursor-pointer"
                  title={labels.copyJsonButton}
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700 font-semibold">{labels.copiedStatus}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-stone-500" />
                      <span>{labels.copyJsonButton}</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Viewer Content Body (Only area that scrolls) */}
          {activeFile ? (
            viewMode === 'code' ? (
              <JsonSyntaxViewer jsonString={formattedContent} />
            ) : (
              <QuranPreview jsonString={formattedContent} appLanguage={appLanguage} />
            )
          ) : (
            <div className="flex-1 min-h-0 flex flex-col items-center justify-center text-stone-500 text-center space-y-2 bg-[#1e1e1e] p-5">
              <FileJson className="w-10 h-10 stroke-1 text-stone-600" />
              <p className="text-sm">{labels.noFileSelected}</p>
            </div>
          )}

          {/* Viewer Footer Bar */}
          <div className="bg-stone-50 border-t border-stone-200 px-4 sm:px-5 py-2.5 text-xs text-stone-500 flex items-center justify-between shrink-0">
            <span>Status: <strong className="text-emerald-700 font-medium">{labels.statusConnected}</strong></span>
            <span className="font-mono text-[11px] text-stone-400 truncate max-w-[200px] sm:max-w-none ml-2">
              {activeFile ? activeFile.fullPath : ''}
            </span>
          </div>

        </div>

      </main>
    </div>
  );
}

