import { Head, Link, router } from '@inertiajs/react';
import {
    Bot,
    Check,
    CheckCircle2,
    Cpu,
    FileCheck2,
    FileText,
    HelpCircle,
    Loader2,
    Plus,
    PlusCircle,
    Presentation,
    SlidersHorizontal,
    Sparkles,
    Tag,
    UploadCloud,
    Wand2,
    X,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { CreatedReviewerModal } from '@/components/student/created-reviewer-modal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { mockStudentSubjects } from '@/data/mock-reviewers';

interface UploadedFileItem {
    id: string;
    name: string;
    type: string;
    size: string;
}

export default function CreateReviewer() {
    const [subjects, setSubjects] = useState(mockStudentSubjects);
    const [subject, setSubject] = useState('Database Management');
    const [isAddingSubject, setIsAddingSubject] = useState(false);
    const [newSubjectInput, setNewSubjectInput] = useState('');
    const [name, setName] = useState('Final Exam Reviewer');
    const [description, setDescription] = useState(
        'Course materials for the database management final exam.',
    );
    const [files, setFiles] = useState<UploadedFileItem[]>([
        
    ]);

    // AI & Prompt Settings
    const [aiEngine, setAiEngine] = useState<'api' | 'local'>('api');
    const [systemMessage, setSystemMessage] = useState(
        'You are an expert academic tutor. Analyze the uploaded files and produce a structured, high-yield study reviewer with key definitions, core concepts, formulas/rules, step-by-step examples, and summary takeaways formatted cleanly for exam preparation.',
    );
    const [showAdvancedAi, setShowAdvancedAi] = useState(true);

    // Loading & Generation State
    const [isGenerating, setIsGenerating] = useState(false);
    const [generationStep, setGenerationStep] = useState(1);
    const [generationProgress, setGenerationProgress] = useState(15);
    const [isCreatedModalOpen, setIsCreatedModalOpen] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleRemoveFile = (id: string) => {
        setFiles((prev) => prev.filter((f) => f.id !== id));
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const newFiles: UploadedFileItem[] = Array.from(e.target.files).map(
            (file, idx) => ({
                id: `new-${Date.now()}-${idx}`,
                name: file.name,
                type: file.name.split('.').pop()?.toUpperCase() || 'FILE',
                size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
            }),
        );
        setFiles((prev) => [...prev, ...newFiles]);
    };

    const handleAddInlineSubject = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmed = newSubjectInput.trim();
        if (!trimmed) return;
        const isDuplicate = subjects.some(
            (s) => s.name.toLowerCase() === trimmed.toLowerCase(),
        );
        if (!isDuplicate) {
            setSubjects((prev) => [
                ...prev,
                {
                    id: `subj-${Date.now()}`,
                    name: trimmed,
                    reviewerCount: 0,
                    createdAt: new Date().toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                    }),
                },
            ]);
            setSubject(trimmed);
        } else {
            setSubject(trimmed);
        }
        setIsAddingSubject(false);
        setNewSubjectInput('');
    };

    // 3-second Static Loading Simulation
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (files.length === 0) {
            alert('Please upload at least one document before generating.');
            return;
        }

        setIsGenerating(true);
        setGenerationStep(1);
        setGenerationProgress(20);

        // Timeline:
        // 0s - 1.0s: Step 1 (Extract & translate files)
        // 1.0s - 2.2s: Step 2 (LLM Context & Prompt Processing)
        // 2.2s - 3.0s: Step 3 (Reviewer Synthesis)
        // 3.0s: Finish and open modal

        const timer1 = setTimeout(() => {
            setGenerationStep(2);
            setGenerationProgress(60);
        }, 1000);

        const timer2 = setTimeout(() => {
            setGenerationStep(3);
            setGenerationProgress(90);
        }, 2200);

        const timerFinal = setTimeout(() => {
            setGenerationProgress(100);
            setIsGenerating(false);
            setIsCreatedModalOpen(true);
        }, 3000);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timerFinal);
        };
    };

    return (
        <>
            <Head title="Create Reviewer" />

            <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-6 p-4 sm:p-6 lg:p-8">
                {/* Page Title */}
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl dark:text-neutral-50">
                        Create Reviewer
                    </h1>
                    <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                        Start an AI-assisted reviewer from your course materials and customize the generation prompt.
                    </p>
                </div>

                <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-3">
                    {/* Left Form (2 cols) */}
                    <div className="rounded-xl border border-neutral-200/80 bg-white p-6 shadow-xs sm:p-7 lg:col-span-2 dark:border-neutral-800 dark:bg-neutral-900">
                        <div className="mb-6">
                            <h2 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                                Reviewer Configuration
                            </h2>
                            <p className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400">
                                Set your subject, upload lecture files, and customize AI system instructions.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <h3 className="mb-4 text-xs font-bold tracking-wider text-neutral-900 uppercase dark:text-neutral-100">
                                    General Details
                                </h3>

                                <div className="space-y-4">
                                    {/* Subject */}
                                    <div className="space-y-1.5">
                                        <div className="flex items-center justify-between">
                                            <Label
                                                htmlFor="subject"
                                                className="text-xs font-semibold text-neutral-700 dark:text-neutral-300"
                                            >
                                                Subject{' '}
                                                <span className="text-red-500">
                                                    *
                                                </span>
                                            </Label>
                                            <Link
                                                href="/subjects"
                                                className="inline-flex items-center gap-1 text-[11px] text-blue-600 hover:underline dark:text-blue-400"
                                            >
                                                <Tag className="size-3" />
                                                Manage subjects
                                            </Link>
                                        </div>

                                        {isAddingSubject ? (
                                            <div className="flex items-center gap-2">
                                                <Input
                                                    autoFocus
                                                    id="new-inline-subject"
                                                    value={newSubjectInput}
                                                    onChange={(e) =>
                                                        setNewSubjectInput(
                                                            e.target.value,
                                                        )
                                                    }
                                                    placeholder="e.g. Calculus, English Literature"
                                                    className="h-9 flex-1 text-xs"
                                                    maxLength={80}
                                                />
                                                <Button
                                                    type="button"
                                                    size="sm"
                                                    onClick={handleAddInlineSubject}
                                                    className="h-9 bg-blue-600 px-3 text-xs text-white hover:bg-blue-700"
                                                >
                                                    Add
                                                </Button>
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="sm"
                                                    className="h-9 px-3 text-xs"
                                                    onClick={() => {
                                                        setIsAddingSubject(
                                                            false,
                                                        );
                                                        setNewSubjectInput('');
                                                    }}
                                                >
                                                    Cancel
                                                </Button>
                                            </div>
                                        ) : (
                                            <>
                                                <Select
                                                    value={subject}
                                                    onValueChange={setSubject}
                                                >
                                                    <SelectTrigger
                                                        id="subject"
                                                        className="h-10 text-xs"
                                                    >
                                                        <SelectValue placeholder="Select subject" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {subjects.map((s) => (
                                                            <SelectItem
                                                                key={s.id}
                                                                value={s.name}
                                                                className="text-xs"
                                                            >
                                                                {s.name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setIsAddingSubject(true)
                                                    }
                                                    className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-medium text-blue-600 hover:underline dark:text-blue-400"
                                                >
                                                    <PlusCircle className="size-3" />
                                                    Add a new subject
                                                </button>
                                            </>
                                        )}
                                    </div>

                                    {/* Reviewer Name */}
                                    <div className="space-y-1.5">
                                        <Label
                                            htmlFor="reviewer-name"
                                            className="text-xs font-semibold text-neutral-700 dark:text-neutral-300"
                                        >
                                            Reviewer Name{' '}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </Label>
                                        <Input
                                            id="reviewer-name"
                                            value={name}
                                            onChange={(e) =>
                                                setName(e.target.value)
                                            }
                                            placeholder="e.g. Midterm Reviewer"
                                            className="h-10 text-xs"
                                            required
                                        />
                                    </div>

                                    {/* Description */}
                                    <div className="space-y-1.5">
                                        <Label
                                            htmlFor="description"
                                            className="text-xs font-semibold text-neutral-700 dark:text-neutral-300"
                                        >
                                            Description (optional)
                                        </Label>
                                        <textarea
                                            id="description"
                                            rows={2}
                                            value={description}
                                            onChange={(e) =>
                                                setDescription(e.target.value)
                                            }
                                            placeholder="Course materials for the database management final exam."
                                            className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-xs text-neutral-900 shadow-xs placeholder:text-neutral-400 focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:text-neutral-100"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Upload Materials Section */}
                            <div className="pt-2">
                                <h3 className="mb-3 text-xs font-bold tracking-wider text-neutral-900 uppercase dark:text-neutral-100">
                                    Upload Materials
                                </h3>

                                {/* Dropzone */}
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    multiple
                                    accept=".pdf,.docx,.pptx"
                                    onChange={handleFileSelect}
                                    className="hidden"
                                />

                                <div
                                    onClick={() =>
                                        fileInputRef.current?.click()
                                    }
                                    className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-neutral-200 bg-neutral-50/50 p-7 text-center transition-colors hover:border-blue-400 dark:border-neutral-800 dark:bg-neutral-900/40 dark:hover:border-blue-600"
                                >
                                    <div className="mb-3 flex size-11 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-600 dark:border-blue-900/40 dark:bg-blue-950/60 dark:text-blue-400">
                                        <UploadCloud className="size-5.5" />
                                    </div>
                                    <p className="text-xs font-semibold text-neutral-900 dark:text-neutral-100">
                                        Drag and drop your lecture slides or notes
                                    </p>
                                    <p className="mt-0.5 mb-3 text-[11px] text-neutral-500 dark:text-neutral-400">
                                        The AI will extract text, tables, and definitions from these files
                                    </p>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        className="h-8 px-4 text-xs"
                                    >
                                        Browse files
                                    </Button>
                                    <p className="mt-3 text-[10px] text-neutral-400 dark:text-neutral-500">
                                        PDF, DOCX, PPTX · Up to 20 MB per file
                                    </p>
                                </div>

                                {/* Uploaded files list */}
                                {files.length > 0 && (
                                    <div className="mt-4 space-y-2">
                                        <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
                                            <span className="font-semibold text-neutral-700 dark:text-neutral-300">
                                                Uploaded materials for AI ingestion
                                            </span>
                                            <span>
                                                {files.length} files selected
                                            </span>
                                        </div>

                                        <div className="space-y-2">
                                            {files.map((file) => (
                                                <div
                                                    key={file.id}
                                                    className="flex items-center justify-between rounded-lg border border-neutral-200/80 bg-white p-3 dark:border-neutral-800 dark:bg-neutral-900"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">
                                                            {file.type ===
                                                            'PPTX' ? (
                                                                <Presentation className="size-4" />
                                                            ) : (
                                                                <FileText className="size-4" />
                                                            )}
                                                        </div>
                                                        <div>
                                                            <p className="text-xs font-semibold text-neutral-900 dark:text-neutral-100">
                                                                {file.name}
                                                            </p>
                                                            <p className="text-[11px] text-neutral-400 dark:text-neutral-500">
                                                                {file.type} ·{' '}
                                                                {file.size}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleRemoveFile(
                                                                file.id,
                                                            )
                                                        }
                                                        className="inline-flex items-center gap-1 p-1 text-xs text-neutral-500 hover:text-red-600 dark:hover:text-red-400"
                                                    >
                                                        <X className="size-3.5" />
                                                        <span>Remove</span>
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                 

                            {/* Form Actions */}
                            <div className="flex items-center justify-end gap-3 border-t border-neutral-100 pt-4 dark:border-neutral-800">
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    asChild
                                    className="h-9 px-4 text-xs"
                                >
                                    <Link href="/reviewers">Cancel</Link>
                                </Button>
                                <Button
                                    type="submit"
                                    size="sm"
                                    disabled={isGenerating}
                                    className="inline-flex h-9 items-center gap-1.5 bg-blue-600 px-5 text-xs font-semibold text-white shadow-xs hover:bg-blue-700"
                                >
                                    {isGenerating ? (
                                        <>
                                            <Loader2 className="size-4 animate-spin" />
                                            <span>Creating Reviewer (3s)...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Sparkles className="size-4" />
                                            <span>Create Reviewer</span>
                                        </>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </div>

                    {/* Right Guidance Card (1 col) */}
                    <div className="space-y-4 rounded-xl border border-neutral-200/80 bg-white p-6 shadow-xs dark:border-neutral-800 dark:bg-neutral-900">
                        <div className="flex items-center gap-2 text-neutral-900 dark:text-neutral-100">
                            <HelpCircle className="size-4.5 text-blue-600 dark:text-blue-400" />
                            <h3 className="text-sm font-bold">
                                How ReviewIt AI Works
                            </h3>
                        </div>

                        <ul className="space-y-3 text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">
                            <li className="flex items-start gap-2">
                                <span className="mt-0.5 text-blue-600 dark:text-blue-400 font-bold">
                                    1.
                                </span>
                                <span>
                                    <strong>Document Extraction:</strong> Reads your PDF, DOCX, and PPTX lecture files.
                                </span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="mt-0.5 text-blue-600 dark:text-blue-400 font-bold">
                                    2.
                                </span>
                                <span>
                                    <strong>LLM Context Ingestion:</strong> Formats and parses text with your customized system prompt.
                                </span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="mt-0.5 text-blue-600 dark:text-blue-400 font-bold">
                                    3.
                                </span>
                                <span>
                                    <strong>Reviewer & Test Generation:</strong> Generates the study reviewer first, ready to export as PDF or test with practice exams.
                                </span>
                            </li>
                        </ul>

                        <div className="rounded-lg border border-blue-100 bg-blue-50/70 p-3.5 dark:border-blue-900/40 dark:bg-blue-950/30">
                            <p className="text-xs leading-relaxed text-blue-700 dark:text-blue-300">
                                💡 <strong>Tip:</strong> Once created, you can edit the reviewer notes, download them as PDF, and generate multiple choice, evaluation, or essay tests!
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Static 3-Second Loading Dialog Overlay */}
            <Dialog open={isGenerating} onOpenChange={() => {}}>
                <DialogContent className="[&>button]:hidden max-w-md p-6 text-center sm:max-w-md">
                    <div className="flex flex-col items-center justify-center space-y-4 py-2">
                        {/* Glowing animated spinner */}
                        <div className="relative flex size-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 shadow-md ring-8 ring-blue-50/50 dark:bg-blue-950/60 dark:ring-blue-950/30">
                            <Loader2 className="size-8 animate-spin text-blue-600 dark:text-blue-400" />
                            <Sparkles className="absolute -top-1 -right-1 size-4 text-amber-500 animate-pulse" />
                        </div>

                        <div>
                            <DialogTitle className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
                                Generating Your Reviewer...
                            </DialogTitle>
                            <DialogDescription className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                                Analyzing documents and structuring study materials
                            </DialogDescription>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full space-y-1.5">
                            <div className="flex justify-between text-[11px] font-medium text-neutral-500">
                                <span>Progress</span>
                                <span>{generationProgress}%</span>
                            </div>
                            <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-800">
                                <div
                                    className="h-full bg-blue-600 transition-all duration-500 ease-out dark:bg-blue-500"
                                    style={{ width: `${generationProgress}%` }}
                                />
                            </div>
                        </div>

                        {/* Step checklist */}
                        <div className="w-full space-y-2 rounded-lg border border-neutral-100 bg-neutral-50/80 p-3 text-left text-xs dark:border-neutral-800 dark:bg-neutral-900/60">
                            <div className="flex items-center gap-2">
                                {generationStep > 1 ? (
                                    <CheckCircle2 className="size-4 shrink-0 text-emerald-600" />
                                ) : (
                                    <Loader2 className="size-4 shrink-0 animate-spin text-blue-600" />
                                )}
                                <span
                                    className={
                                        generationStep >= 1
                                            ? 'font-medium text-neutral-900 dark:text-neutral-100'
                                            : 'text-neutral-400'
                                    }
                                >
                                    Translating uploaded documents into LLM context
                                </span>
                            </div>

                            <div className="flex items-center gap-2">
                                {generationStep > 2 ? (
                                    <CheckCircle2 className="size-4 shrink-0 text-emerald-600" />
                                ) : generationStep === 2 ? (
                                    <Loader2 className="size-4 shrink-0 animate-spin text-blue-600" />
                                ) : (
                                    <div className="size-4 rounded-full border border-neutral-300 shrink-0" />
                                )}
                                <span
                                    className={
                                        generationStep >= 2
                                            ? 'font-medium text-neutral-900 dark:text-neutral-100'
                                            : 'text-neutral-400'
                                    }
                                >
                                    Applying system instructions & model inference
                                </span>
                            </div>

                            <div className="flex items-center gap-2">
                                {generationStep === 3 ? (
                                    <Loader2 className="size-4 shrink-0 animate-spin text-blue-600" />
                                ) : (
                                    <div className="size-4 rounded-full border border-neutral-300 shrink-0" />
                                )}
                                <span
                                    className={
                                        generationStep === 3
                                            ? 'font-medium text-neutral-900 dark:text-neutral-100'
                                            : 'text-neutral-400'
                                    }
                                >
                                    Finalizing reviewer notes & study points
                                </span>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Created Reviewer Modal (Appears immediately after 3-second loading) */}
            <CreatedReviewerModal
                open={isCreatedModalOpen}
                onOpenChange={setIsCreatedModalOpen}
                title={name}
                subject={subject}
                initialSystemMessage={systemMessage}
                filesCount={files.length}
                onSaveReviewer={(updatedContent) => {
                    console.log('Saved reviewer content:', updatedContent);
                }}
            />
        </>
    );
}

CreateReviewer.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'My Reviewers', href: '/reviewers' },
        { title: 'Create Reviewer', href: '/reviewers/create' },
    ],
};
