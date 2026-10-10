import { Head, Link, router } from '@inertiajs/react';
import {
    FileText,
    HelpCircle,
    Plus,
    Presentation,
    UploadCloud,
    X,
} from 'lucide-react';
import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { subjectOptions } from '@/data/mock-reviewers';

interface UploadedFileItem {
    id: string;
    name: string;
    type: string;
    size: string;
}

export default function CreateReviewer() {
    const [subject, setSubject] = useState('Database Management');
    const [name, setName] = useState('Final Exam Reviewer');
    const [description, setDescription] = useState(
        'Course materials for the database management final exam.',
    );
    const [files, setFiles] = useState<UploadedFileItem[]>([
        {
            id: 'f1',
            name: 'Database_Concepts.pdf',
            type: 'PDF',
            size: '2.4 MB',
        },
        {
            id: 'f2',
            name: 'SQL_Lecture_Notes.docx',
            type: 'DOCX',
            size: '840 KB',
        },
        {
            id: 'f3',
            name: 'Normalization_Slides.pptx',
            type: 'PPTX',
            size: '3.1 MB',
        },
    ]);

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // UI only: simulate successful creation and redirect to reviewers
        router.visit('/reviewers');
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
                        Start a reviewer from your course materials
                    </p>
                </div>

                <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-3">
                    {/* Left Form (2 cols) */}
                    <div className="rounded-xl border border-neutral-200/80 bg-white p-6 shadow-xs sm:p-7 lg:col-span-2 dark:border-neutral-800 dark:bg-neutral-900">
                        <div className="mb-6">
                            <h2 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                                Create a new reviewer
                            </h2>
                            <p className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400">
                                Add the details below, then upload your learning
                                materials.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <h3 className="mb-4 text-xs font-bold tracking-wider text-neutral-900 uppercase dark:text-neutral-100">
                                    Reviewer details
                                </h3>

                                <div className="space-y-4">
                                    {/* Subject */}
                                    <div className="space-y-1.5">
                                        <Label
                                            htmlFor="subject"
                                            className="text-xs font-semibold text-neutral-700 dark:text-neutral-300"
                                        >
                                            Subject{' '}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </Label>
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
                                                {subjectOptions.map((opt) => (
                                                    <SelectItem
                                                        key={opt}
                                                        value={opt}
                                                        className="text-xs"
                                                    >
                                                        {opt}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
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
                                            rows={3}
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
                                    className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-neutral-200 bg-neutral-50/50 p-8 text-center transition-colors hover:border-blue-400 dark:border-neutral-800 dark:bg-neutral-900/40 dark:hover:border-blue-600"
                                >
                                    <div className="mb-3 flex size-11 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-600 dark:border-blue-900/40 dark:bg-blue-950/60 dark:text-blue-400">
                                        <UploadCloud className="size-5.5" />
                                    </div>
                                    <p className="text-xs font-semibold text-neutral-900 dark:text-neutral-100">
                                        Drag and drop your files here
                                    </p>
                                    <p className="mt-0.5 mb-3 text-[11px] text-neutral-500 dark:text-neutral-400">
                                        or choose files from your computer
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
                                                Uploaded files
                                            </span>
                                            <span>
                                                {files.length} files · 6.3 MB
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
                                    className="inline-flex h-9 items-center gap-1.5 bg-blue-600 px-4 text-xs font-medium text-white shadow-xs hover:bg-blue-700"
                                >
                                    <Plus className="size-4" />
                                    Create Reviewer
                                </Button>
                            </div>
                        </form>
                    </div>

                    {/* Right Guidance Card (1 col) */}
                    <div className="space-y-4 rounded-xl border border-neutral-200/80 bg-white p-6 shadow-xs dark:border-neutral-800 dark:bg-neutral-900">
                        <div className="flex items-center gap-2 text-neutral-900 dark:text-neutral-100">
                            <HelpCircle className="size-4.5 text-blue-600 dark:text-blue-400" />
                            <h3 className="text-sm font-bold">
                                Before you create
                            </h3>
                        </div>

                        <ul className="space-y-3 text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">
                            <li className="flex items-start gap-2">
                                <span className="mt-1 text-neutral-400 dark:text-neutral-500">
                                    •
                                </span>
                                <span>
                                    Keep materials for the same subject in one
                                    reviewer.
                                </span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="mt-1 text-neutral-400 dark:text-neutral-500">
                                    •
                                </span>
                                <span>
                                    Use a clear name so you can find your
                                    reviewer later.
                                </span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="mt-1 text-neutral-400 dark:text-neutral-500">
                                    •
                                </span>
                                <span>
                                    Upload readable, unlocked PDF, DOCX or PPTX
                                    files.
                                </span>
                            </li>
                        </ul>

                        <div className="rounded-lg border border-blue-100 bg-blue-50/70 p-3.5 dark:border-blue-900/40 dark:bg-blue-950/30">
                            <p className="text-xs leading-relaxed text-blue-700 dark:text-blue-300">
                                Your reviewer may show Processing while your
                                materials are being prepared.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
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
