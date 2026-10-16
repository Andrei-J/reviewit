import { router, usePage } from '@inertiajs/react';
import {
    AlertCircle,
    Bot,
    CheckCircle2,
    ChevronDown,
    Cloud,
    CpuIcon,
    EyeIcon,
    EyeOffIcon,
    HardDrive,
    Key,
    Link2,
    Loader2,
    RefreshCw,
    Sparkles,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import AiSettingsController from '@/actions/App/Http/Controllers/Settings/AiSettingsController';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { SharedData } from '@/types';

type OllamaModel = {
    name: string;
    size: number | null;
    modified_at: string | null;
};

type AiProvider = 'local' | 'cloud';

export default function AiSettings() {
    const { auth } = usePage<SharedData>().props;

    const [aiProvider, setAiProvider] = useState<AiProvider>(
        (auth?.user?.ai_provider as AiProvider) || 'local',
    );
    const [selectedModel, setSelectedModel] = useState<string>(
        (auth?.user?.ai_model as string) || '',
    );
    const [cloudApiKey, setCloudApiKey] = useState<string>(
        (auth?.user?.cloud_ai_api_key as string) || '',
    );
    const [cloudBaseUrl, setCloudBaseUrl] = useState<string>(
        (auth?.user?.cloud_ai_base_url as string) || '',
    );
    const [showApiKey, setShowApiKey] = useState(false);

    const [ollamaAvailable, setOllamaAvailable] = useState<boolean | null>(null);
    const [ollamaModels, setOllamaModels] = useState<OllamaModel[]>([]);
    const [scanning, setScanning] = useState(false);
    const [scanError, setScanError] = useState<string | null>(null);

    const [aiSaving, setAiSaving] = useState(false);
    const [aiSaved, setAiSaved] = useState(false);
    const [modelDropdownOpen, setModelDropdownOpen] = useState(false);
    const modelDropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown on outside click
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                modelDropdownRef.current &&
                !modelDropdownRef.current.contains(event.target as Node)
            ) {
                setModelDropdownOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const scanOllama = async () => {
        setScanning(true);
        setScanError(null);
        setOllamaAvailable(null);
        setOllamaModels([]);

        try {
            const res = await fetch(AiSettingsController.scanOllamaModels.url(), {
                headers: {
                    Accept: 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                },
            });
            const data = await res.json();
            setOllamaAvailable(data.available);
            setOllamaModels(data.models ?? []);
            if (data.models?.length && !selectedModel) {
                setSelectedModel(data.models[0].name);
            }
        } catch {
            setScanError('Could not reach the server. Please try again.');
        } finally {
            setScanning(false);
        }
    };

    const handleAiSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setAiSaving(true);
        setAiSaved(false);

        router.patch(
            AiSettingsController.update.url(),
            {
                ai_provider: aiProvider,
                ai_model: aiProvider === 'local' ? selectedModel : null,
                cloud_ai_api_key: aiProvider === 'cloud' ? cloudApiKey : null,
                cloud_ai_base_url: aiProvider === 'cloud' ? cloudBaseUrl : null,
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setAiSaved(true);
                    setTimeout(() => setAiSaved(false), 3000);
                },
                onFinish: () => {
                    setAiSaving(false);
                },
            },
        );
    };

    const formatModelSize = (bytes: number | null): string => {
        if (!bytes) return '';
        const gb = bytes / 1e9;
        return gb >= 1 ? `${gb.toFixed(1)} GB` : `${(bytes / 1e6).toFixed(0)} MB`;
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2">
                <div className="flex size-7 items-center justify-center rounded-lg bg-violet-100 text-violet-600 dark:bg-violet-950/60 dark:text-violet-400">
                    <Bot className="size-4" />
                </div>
                <h2 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                    AI System Instructions &amp; Tailoring
                </h2>
            </div>

            <form
                id="ai-settings-form"
                onSubmit={handleAiSubmit}
                className="space-y-4 rounded-xl border border-neutral-200/80 bg-white p-6 shadow-xs dark:border-neutral-800 dark:bg-neutral-900"
            >
                {/* Provider toggle */}
                <div className="space-y-2">
                    <Label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                        AI Inference Provider
                    </Label>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {/* Cloud option */}
                        <button
                            type="button"
                            id="ai-provider-cloud"
                            onClick={() => setAiProvider('cloud')}
                            className={`flex items-center gap-3 rounded-xl border p-4 text-left transition-all duration-200 ${
                                aiProvider === 'cloud'
                                    ? 'border-blue-500 bg-blue-50/60 ring-1 ring-blue-500 dark:border-blue-400 dark:bg-blue-950/30 dark:ring-blue-400'
                                    : 'border-neutral-200 bg-white hover:border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800/60 dark:hover:border-neutral-600'
                            }`}
                        >
                            <div
                                className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${
                                    aiProvider === 'cloud'
                                        ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/60 dark:text-blue-400'
                                        : 'bg-neutral-100 text-neutral-500 dark:bg-neutral-700 dark:text-neutral-400'
                                }`}
                            >
                                <Cloud className="size-4.5" />
                            </div>
                            <div className="min-w-0">
                                <p className="text-xs font-bold text-neutral-900 dark:text-neutral-100">
                                    Cloud AI API
                                </p>
                                <p className="truncate text-[11px] text-neutral-500 dark:text-neutral-400">
                                    OpenAI / Claude / Gemini
                                </p>
                            </div>
                        </button>

                        {/* Local option */}
                        <button
                            type="button"
                            id="ai-provider-local"
                            onClick={() => setAiProvider('local')}
                            className={`flex items-center gap-3 rounded-xl border p-4 text-left transition-all duration-200 ${
                                aiProvider === 'local'
                                    ? 'border-violet-500 bg-violet-50/60 ring-1 ring-violet-500 dark:border-violet-400 dark:bg-violet-950/30 dark:ring-violet-400'
                                    : 'border-neutral-200 bg-white hover:border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800/60 dark:hover:border-neutral-600'
                            }`}
                        >
                            <div
                                className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${
                                    aiProvider === 'local'
                                        ? 'bg-violet-100 text-violet-600 dark:bg-violet-900/60 dark:text-violet-400'
                                        : 'bg-neutral-100 text-neutral-500 dark:bg-neutral-700 dark:text-neutral-400'
                                }`}
                            >
                                <CpuIcon className="size-4.5" />
                            </div>
                            <div className="min-w-0">
                                <p className="text-xs font-bold text-neutral-900 dark:text-neutral-100">
                                    Local AI Model
                                </p>
                                <p className="truncate text-[11px] text-neutral-500 dark:text-neutral-400">
                                    Ollama / Offline
                                </p>
                            </div>
                        </button>
                    </div>
                </div>

                {/* ── Local (Ollama) panel ── */}
                {aiProvider === 'local' && (
                    <div className="space-y-4 rounded-xl border border-violet-100 bg-violet-50/40 p-4 dark:border-violet-900/40 dark:bg-violet-950/20">
                        <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-2">
                                <HardDrive className="size-4 text-violet-600 dark:text-violet-400" />
                                <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                                    Available Ollama Models
                                </span>
                            </div>
                            <Button
                                type="button"
                                size="sm"
                                variant="outline"
                                id="scan-ollama-btn"
                                onClick={scanOllama}
                                disabled={scanning}
                                className="h-8 gap-1.5 border-violet-200 text-xs text-violet-700 hover:border-violet-300 hover:bg-violet-50 dark:border-violet-800 dark:text-violet-400 dark:hover:bg-violet-950/40"
                            >
                                {scanning ? (
                                    <Loader2 className="size-3.5 animate-spin" />
                                ) : (
                                    <RefreshCw className="size-3.5" />
                                )}
                                {scanning ? 'Scanning…' : 'Scan for models'}
                            </Button>
                        </div>

                        {/* Scan result states */}
                        {scanError && (
                            <div className="flex items-center gap-2 rounded-lg border border-rose-200/60 bg-rose-50 px-3 py-2.5 text-xs text-rose-700 dark:border-rose-800/60 dark:bg-rose-950/30 dark:text-rose-400">
                                <AlertCircle className="size-3.5 shrink-0" />
                                <span>{scanError}</span>
                            </div>
                        )}

                        {ollamaAvailable === false && !scanError && (
                            <div className="flex items-center gap-2 rounded-lg border border-amber-200/60 bg-amber-50 px-3 py-2.5 text-xs text-amber-700 dark:border-amber-800/60 dark:bg-amber-950/30 dark:text-amber-400">
                                <AlertCircle className="size-3.5 shrink-0" />
                                <span>
                                    Ollama is not running or not installed. Start it with{' '}
                                    <code className="rounded bg-amber-100 px-1 py-0.5 font-mono text-[10px] dark:bg-amber-900/40">
                                        ollama serve
                                    </code>{' '}
                                    and scan again.
                                </span>
                            </div>
                        )}

                        {ollamaAvailable === true && ollamaModels.length === 0 && (
                            <div className="flex items-center gap-2 rounded-lg border border-blue-200/60 bg-blue-50 px-3 py-2.5 text-xs text-blue-700 dark:border-blue-800/60 dark:bg-blue-950/30 dark:text-blue-400">
                                <Sparkles className="size-3.5 shrink-0" />
                                <span>
                                    Ollama is running but no models are pulled yet. Run{' '}
                                    <code className="rounded bg-blue-100 px-1 py-0.5 font-mono text-[10px] dark:bg-blue-900/40">
                                        ollama pull llama3
                                    </code>
                                </span>
                            </div>
                        )}

                        {ollamaAvailable === true && ollamaModels.length > 0 && (
                            <div className="space-y-2">
                                <div className="flex items-center gap-1.5 text-[11px] text-emerald-600 dark:text-emerald-400">
                                    <CheckCircle2 className="size-3.5" />
                                    Ollama is running · {ollamaModels.length}{' '}
                                    {ollamaModels.length === 1 ? 'model' : 'models'} found
                                </div>

                                {/* Model selector */}
                                <div className="relative" ref={modelDropdownRef}>
                                    <button
                                        type="button"
                                        id="model-selector"
                                        onClick={() => setModelDropdownOpen((o) => !o)}
                                        className="flex w-full items-center justify-between rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-left text-xs transition-colors hover:border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800 dark:hover:border-neutral-600"
                                    >
                                        <div className="flex items-center gap-2">
                                            <Bot className="size-3.5 text-violet-500" />
                                            <span className="font-medium text-neutral-900 dark:text-neutral-100">
                                                {selectedModel || 'Select a model…'}
                                            </span>
                                        </div>
                                        <ChevronDown
                                            className={`size-3.5 text-neutral-400 transition-transform duration-200 ${modelDropdownOpen ? 'rotate-180' : ''}`}
                                        />
                                    </button>

                                    {modelDropdownOpen && (
                                        <div className="absolute z-20 mt-1.5 w-full overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-lg dark:border-neutral-700 dark:bg-neutral-800">
                                            {ollamaModels.map((m) => (
                                                <button
                                                    key={m.name}
                                                    type="button"
                                                    onClick={() => {
                                                        setSelectedModel(m.name);
                                                        setModelDropdownOpen(false);
                                                    }}
                                                    className={`flex w-full items-center justify-between px-3 py-2.5 text-left text-xs transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-700/60 ${
                                                        selectedModel === m.name
                                                            ? 'bg-violet-50 text-violet-700 dark:bg-violet-950/30 dark:text-violet-300'
                                                            : 'text-neutral-700 dark:text-neutral-300'
                                                    }`}
                                                >
                                                    <div className="flex items-center gap-2">
                                                        {selectedModel === m.name ? (
                                                            <CheckCircle2 className="size-3.5 text-violet-500" />
                                                        ) : (
                                                            <div className="size-3.5" />
                                                        )}
                                                        <span className="font-medium">{m.name}</span>
                                                    </div>
                                                    {m.size && (
                                                        <span className="text-[10px] text-neutral-400">
                                                            {formatModelSize(m.size)}
                                                        </span>
                                                    )}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* When no scan has been done yet */}
                        {ollamaAvailable === null && !scanning && (
                            <p className="text-[11px] text-neutral-400 dark:text-neutral-500">
                                Click &quot;Scan for models&quot; to detect locally running Ollama models.
                            </p>
                        )}
                    </div>
                )}

                {/* ── Cloud API panel ── */}
                {aiProvider === 'cloud' && (
                    <div className="space-y-4 rounded-xl border border-blue-100 bg-blue-50/40 p-4 dark:border-blue-900/40 dark:bg-blue-950/20">
                        <div className="flex items-center gap-2">
                            <Cloud className="size-4 text-blue-600 dark:text-blue-400" />
                            <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                                Cloud AI Credentials
                            </span>
                        </div>

                        {/* API Key */}
                        <div className="space-y-1.5">
                            <Label
                                htmlFor="cloud-api-key"
                                className="flex items-center gap-1.5 text-xs font-semibold text-neutral-700 dark:text-neutral-300"
                            >
                                <Key className="size-3.5" />
                                API Key
                            </Label>
                            <div className="relative">
                                <Input
                                    id="cloud-api-key"
                                    type={showApiKey ? 'text' : 'password'}
                                    value={cloudApiKey}
                                    onChange={(e) => setCloudApiKey(e.target.value)}
                                    placeholder="sk-••••••••••••••••••••••••••••••"
                                    className="h-10 pr-10 font-mono text-xs"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowApiKey((v) => !v)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 transition-colors hover:text-neutral-600 dark:hover:text-neutral-300"
                                >
                                    {showApiKey ? (
                                        <EyeOffIcon className="size-4" />
                                    ) : (
                                        <EyeIcon className="size-4" />
                                    )}
                                </button>
                            </div>
                            <p className="text-[11px] text-neutral-400 dark:text-neutral-500">
                                Your key is stored securely and never shared.
                            </p>
                        </div>

                        {/* Base URL */}
                        <div className="space-y-1.5">
                            <Label
                                htmlFor="cloud-base-url"
                                className="flex items-center gap-1.5 text-xs font-semibold text-neutral-700 dark:text-neutral-300"
                            >
                                <Link2 className="size-3.5" />
                                API Base URL
                            </Label>
                            <Input
                                id="cloud-base-url"
                                type="url"
                                value={cloudBaseUrl}
                                onChange={(e) => setCloudBaseUrl(e.target.value)}
                                placeholder="https://api.openai.com/v1"
                                className="h-10 font-mono text-xs"
                            />
                            <p className="text-[11px] text-neutral-400 dark:text-neutral-500">
                                Leave blank to use the provider default. Use a custom URL for proxies or self-hosted endpoints.
                            </p>
                        </div>
                    </div>
                )}

                {/* Save button */}
                <div className="flex items-center justify-end gap-2 border-t border-neutral-100 pt-3 dark:border-neutral-800">
                    {aiSaved && (
                        <span className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400">
                            <CheckCircle2 className="size-3.5" />
                            Saved!
                        </span>
                    )}
                    <Button
                        type="submit"
                        size="sm"
                        disabled={aiSaving}
                        className="h-9 gap-1.5 bg-violet-600 px-4 text-xs font-medium text-white hover:bg-violet-700 disabled:opacity-60"
                    >
                        {aiSaving ? (
                            <Loader2 className="size-3.5 animate-spin" />
                        ) : (
                            <Sparkles className="size-3.5" />
                        )}
                        {aiSaving ? 'Saving…' : 'Save AI settings'}
                    </Button>
                </div>
            </form>
        </div>
    );
}
