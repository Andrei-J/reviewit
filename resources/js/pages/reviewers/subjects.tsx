import { Head, Link } from '@inertiajs/react';
import { BookOpen, PlusCircle, Tag, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    mockStudentSubjects,
    type StudentSubject,
} from '@/data/mock-reviewers';

export default function SubjectsIndex() {
    const [subjects, setSubjects] =
        useState<StudentSubject[]>(mockStudentSubjects);
    const [newSubjectName, setNewSubjectName] = useState('');
    const [isAdding, setIsAdding] = useState(false);
    const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

    const handleAddSubject = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmed = newSubjectName.trim();
        if (!trimmed) return;

        const isDuplicate = subjects.some(
            (s) => s.name.toLowerCase() === trimmed.toLowerCase(),
        );
        if (isDuplicate) return;

        const newSubject: StudentSubject = {
            id: `subj-${Date.now()}`,
            name: trimmed,
            reviewerCount: 0,
            createdAt: new Date().toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
            }),
        };

        setSubjects((prev) => [...prev, newSubject]);
        setNewSubjectName('');
        setIsAdding(false);
    };

    const handleDelete = (id: string) => {
        setSubjects((prev) => prev.filter((s) => s.id !== id));
        setDeleteConfirmId(null);
    };

    return (
        <>
            <Head title="My Subjects" />

            <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-6 p-4 sm:p-6 lg:p-8">
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl dark:text-neutral-50">
                            My Subjects
                        </h1>
                        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                            Add and manage the subjects you study. These will be
                            available when creating a reviewer.
                        </p>
                    </div>
                    <Button
                        size="sm"
                        onClick={() => setIsAdding(true)}
                        className="inline-flex h-9 shrink-0 items-center gap-1.5 bg-blue-600 px-4 text-xs font-medium text-white shadow-xs hover:bg-blue-700"
                    >
                        <PlusCircle className="size-3.5" />
                        Add Subject
                    </Button>
                </div>

                <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-3">
                    {/* Main table */}
                    <div className="lg:col-span-2">
                        {/* Add subject inline form */}
                        {isAdding && (
                            <div className="mb-4 rounded-xl border border-blue-200/60 bg-blue-50/40 p-4 dark:border-blue-900/40 dark:bg-blue-950/20">
                                <p className="mb-3 text-xs font-semibold text-neutral-900 dark:text-neutral-100">
                                    New subject
                                </p>
                                <form
                                    onSubmit={handleAddSubject}
                                    className="flex items-center gap-2"
                                >
                                    <Input
                                        autoFocus
                                        id="new-subject-name"
                                        value={newSubjectName}
                                        onChange={(e) =>
                                            setNewSubjectName(e.target.value)
                                        }
                                        placeholder="e.g. Calculus, Physics, English Literature"
                                        className="h-9 flex-1 text-xs"
                                        required
                                        maxLength={80}
                                    />
                                    <Button
                                        type="submit"
                                        size="sm"
                                        className="h-9 bg-blue-600 px-4 text-xs text-white hover:bg-blue-700"
                                    >
                                        Save
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        className="h-9 px-3 text-xs"
                                        onClick={() => {
                                            setIsAdding(false);
                                            setNewSubjectName('');
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                </form>
                            </div>
                        )}

                        {/* Subjects table */}
                        <div className="overflow-hidden rounded-xl border border-neutral-200/80 bg-white shadow-xs dark:border-neutral-800 dark:bg-neutral-900">
                            {subjects.length === 0 ? (
                                <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
                                    <div className="flex size-12 items-center justify-center rounded-xl border border-neutral-200 bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800">
                                        <Tag className="size-5 text-neutral-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                                            No subjects yet
                                        </p>
                                        <p className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400">
                                            Add your first subject to get
                                            started.
                                        </p>
                                    </div>
                                    <Button
                                        size="sm"
                                        onClick={() => setIsAdding(true)}
                                        className="mt-1 h-9 bg-blue-600 px-4 text-xs text-white hover:bg-blue-700"
                                    >
                                        <PlusCircle className="mr-1.5 size-3.5" />
                                        Add subject
                                    </Button>
                                </div>
                            ) : (
                                <table className="w-full text-xs">
                                    <thead>
                                        <tr className="border-b border-neutral-100 bg-neutral-50/60 dark:border-neutral-800 dark:bg-neutral-900/60">
                                            <th className="px-4 py-3 text-left font-semibold tracking-wider text-neutral-500 uppercase dark:text-neutral-400">
                                                Subject name
                                            </th>
                                            <th className="px-4 py-3 text-center font-semibold tracking-wider text-neutral-500 uppercase dark:text-neutral-400">
                                                Reviewers
                                            </th>
                                            <th className="px-4 py-3 text-left font-semibold tracking-wider text-neutral-500 uppercase dark:text-neutral-400">
                                                Created
                                            </th>
                                            <th className="px-4 py-3 text-right font-semibold tracking-wider text-neutral-500 uppercase dark:text-neutral-400">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
                                        {subjects.map((subject) => (
                                            <tr
                                                key={subject.id}
                                                className="group transition-colors hover:bg-neutral-50/60 dark:hover:bg-neutral-800/40"
                                            >
                                                <td className="px-4 py-3.5">
                                                    <div className="flex items-center gap-2.5">
                                                        <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
                                                            <Tag className="size-3.5" />
                                                        </div>
                                                        <span className="font-medium text-neutral-900 dark:text-neutral-100">
                                                            {subject.name}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3.5 text-center">
                                                    <span className="inline-flex items-center gap-1 rounded-full border border-neutral-200/60 bg-neutral-50 px-2 py-0.5 text-[11px] font-semibold text-neutral-600 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300">
                                                        <BookOpen className="size-3" />
                                                        {subject.reviewerCount}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3.5 text-neutral-500 dark:text-neutral-400">
                                                    {subject.createdAt}
                                                </td>
                                                <td className="px-4 py-3.5 text-right">
                                                    {deleteConfirmId ===
                                                    subject.id ? (
                                                        <div className="flex items-center justify-end gap-1.5">
                                                            <span className="text-[11px] text-neutral-500">
                                                                Delete?
                                                            </span>
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    handleDelete(
                                                                        subject.id,
                                                                    )
                                                                }
                                                                className="rounded px-2 py-0.5 text-[11px] font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40"
                                                            >
                                                                Yes
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    setDeleteConfirmId(
                                                                        null,
                                                                    )
                                                                }
                                                                className="rounded px-2 py-0.5 text-[11px] font-semibold text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                                                            >
                                                                No
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                setDeleteConfirmId(
                                                                    subject.id,
                                                                )
                                                            }
                                                            className="inline-flex items-center gap-1 rounded p-1.5 text-neutral-400 opacity-0 transition-opacity hover:bg-red-50 hover:text-red-600 group-hover:opacity-100 dark:hover:bg-red-950/40 dark:hover:text-red-400"
                                                            title="Delete subject"
                                                        >
                                                            <Trash2 className="size-3.5" />
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>

                    {/* Right sidebar */}
                    <div className="space-y-4 rounded-xl border border-neutral-200/80 bg-white p-6 shadow-xs dark:border-neutral-800 dark:bg-neutral-900">
                        <div className="flex items-center gap-2 text-neutral-900 dark:text-neutral-100">
                            <Tag className="size-4 text-blue-600 dark:text-blue-400" />
                            <h3 className="text-sm font-bold">
                                About subjects
                            </h3>
                        </div>

                        <ul className="space-y-3 text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">
                            <li className="flex items-start gap-2">
                                <span className="mt-1 text-neutral-400 dark:text-neutral-500">
                                    •
                                </span>
                                <span>
                                    Subjects you add here will appear as options
                                    when creating a reviewer.
                                </span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="mt-1 text-neutral-400 dark:text-neutral-500">
                                    •
                                </span>
                                <span>
                                    You can reuse the same subject across
                                    multiple reviewers.
                                </span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="mt-1 text-neutral-400 dark:text-neutral-500">
                                    •
                                </span>
                                <span>
                                    Deleting a subject does not delete any
                                    existing reviewers that use it.
                                </span>
                            </li>
                        </ul>

                        <div className="border-t border-neutral-100 pt-3 dark:border-neutral-800">
                            <Link
                                href="/reviewers/create"
                                className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:underline dark:text-blue-400"
                            >
                                <PlusCircle className="size-3.5" />
                                Create a reviewer
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

SubjectsIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'My Subjects', href: '/subjects' },
    ],
};
