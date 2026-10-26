import {
    Bot,
    Check,
    CheckCircle2,
    Clock,
    Copy,
    Download,
    Edit3,
    ExternalLink,
    FileCheck,
    FileSpreadsheet,
    FileText,
    HelpCircle,
    Info,
    ListChecks,
    Loader2,
    Play,
    RefreshCw,
    Save,
    Share2,
    Sliders,
    Sparkles,
    Timer,
    X,
} from 'lucide-react';
import React, { useState } from 'react';
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

export interface CreatedReviewerModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    subject: string;
    initialSystemMessage: string;
    filesCount: number;
    onSaveReviewer?: (updatedContent: string) => void,
    initialContent?: string;
}

export function CreatedReviewerModal({
    open,
    onOpenChange,
    title,
    subject,
    initialSystemMessage,
    filesCount,
    onSaveReviewer,
    initialContent
}: CreatedReviewerModalProps) {
    const [activeTab, setActiveTab] = useState<'reviewer' | 'test' | 'prompt'>('reviewer');

    // Reviewer Content State
    const [reviewerText, setReviewerText] = useState(initialContent || '');
    const [isEditingContent, setIsEditingContent] = useState(false);
    const [savedNotification, setSavedNotification] = useState(false);
    const [downloadingPdf, setDownloadingPdf] = useState(false);

    // AI System Message State
    const [systemMessage, setSystemMessage] = useState(initialSystemMessage);
    const [isRegenerating, setIsRegenerating] = useState(false);

    // Test Generation Configuration State
    const [testType, setTestType] = useState<'multiple_choice' | 'evaluation' | 'essay'>('multiple_choice');
    const [totalTestTime, setTotalTestTime] = useState<string>('30'); // in minutes
    const [timePerQuestion, setTimePerQuestion] = useState<string>('60'); // in seconds
    const [questionCount, setQuestionCount] = useState<string>('10');
    const [isTestGenerated, setIsTestGenerated] = useState(false);
    const [isGeneratingTest, setIsGeneratingTest] = useState(false);
    const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
    const [showAnswerKey, setShowAnswerKey] = useState(false);

    React.useEffect(() => {
        setReviewerText(initialContent || '');
    }, [initialContent]);


    // Handle Saving Content Changes
    const handleSaveContent = () => {
        setIsEditingContent(false);
        setSavedNotification(true);
        if (onSaveReviewer) {
            onSaveReviewer(reviewerText);
        }
        setTimeout(() => setSavedNotification(false), 3000);
    };

    // Handle PDF Download Simulation
    const handleDownloadPdf = () => {
        setDownloadingPdf(true);
        setTimeout(() => {
            setDownloadingPdf(false);
            // Create a downloadable mock text file as PDF representation
            const element = document.createElement('a');
            const file = new Blob([reviewerText], { type: 'text/markdown' });
            element.href = URL.createObjectURL(file);
            element.download = `${title.toLowerCase().replace(/\s+/g, '_')}_reviewer.md`;
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
        }, 1200);
    };

    // Handle Regenerate Reviewer with updated System Message
    const handleRegenerateReviewer = () => {
        setIsRegenerating(true);
        setTimeout(() => {
            setIsRegenerating(false);
            setReviewerText(
                (reviewerText || initialContent || '') +
                    `\n\n---\n### ⚡ Refined with System Prompt:\n*"${systemMessage}"*\n- Tailored custom review notes generated successfully.`
            );
            setActiveTab('reviewer');
        }, 3000);
    };

    // Handle Generate Test
    const handleGenerateTest = () => {
        setIsGeneratingTest(true);
        setTimeout(() => {
            setIsGeneratingTest(false);
            setIsTestGenerated(true);
        }, 1800);
    };

    // Mock Questions based on chosen test type
    const multipleChoiceQuestions = [
        {
            id: 1,
            question: 'Which normal form eliminates partial dependency on a composite primary key?',
            options: ['First Normal Form (1NF)', 'Second Normal Form (2NF)', 'Third Normal Form (3NF)', 'Boyce-Codd Normal Form (BCNF)'],
            correct: 'Second Normal Form (2NF)',
            explanation: '2NF requires tables to be in 1NF and guarantees that all non-prime attributes are fully functionally dependent on candidate keys.',
        },
        {
            id: 2,
            question: 'What ACID property guarantees that committed transactions survive subsequent system crashes?',
            options: ['Atomicity', 'Consistency', 'Isolation', 'Durability'],
            correct: 'Durability',
            explanation: 'Durability ensures that once a transaction commits, its modifications are permanently written to persistent non-volatile storage.',
        },
        {
            id: 3,
            question: 'Which SQL clause is strictly evaluated AFTER group aggregations are calculated?',
            options: ['WHERE', 'ORDER BY', 'HAVING', 'JOIN'],
            correct: 'HAVING',
            explanation: 'WHERE filters individual tuples before grouping, whereas HAVING evaluates predicates against aggregated group buckets.',
        },
    ];

    const evaluationQuestions = [
        {
            id: 1,
            type: 'True / False',
            question: 'A table in 3NF is inherently guaranteed to satisfy Boyce-Codd Normal Form (BCNF).',
            correct: 'False',
            explanation: 'BCNF is strictly more restrictive; 3NF permits non-superkey determinants if the dependent attribute is prime.',
        },
        {
            id: 2,
            type: 'Identification',
            question: 'Identify the property in database transactions representing the "All-or-Nothing" execution guarantee.',
            correct: 'Atomicity',
            explanation: 'Atomicity ensures all sub-operations inside a unit of work succeed or roll back completely.',
        },
        {
            id: 3,
            type: 'True / False',
            question: 'The SQL clause `HAVING` can filter rows based on aggregate metrics like `COUNT()` and `AVG()`.',
            correct: 'True',
            explanation: 'Aggregate functions can be utilized inside HAVING conditions.',
        },
    ];

    const essayQuestions = [
        {
            id: 1,
            question: 'Critique the trade-offs between database normalization (up to 3NF/BCNF) and denormalization for high-throughput read-heavy applications.',
            rubric: 'Examine redundancy elimination vs join overhead; discuss caching, query latency, and data integrity concerns.',
        },
        {
            id: 2,
            question: 'Explain the isolation anomalies (Dirty Read, Non-Repeatable Read, Phantom Read) and how transaction isolation levels mitigate each.',
            rubric: 'Provide definitions for each anomaly and map them to Read Uncommitted, Read Committed, Repeatable Read, and Serializable.',
        },
    ];

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-h-[92vh] w-full max-w-4xl overflow-y-auto p-0 sm:max-w-4xl">
                {/* Header banner */}
                <div className="border-b border-neutral-200/80 bg-neutral-50/80 px-6 py-5 dark:border-neutral-800 dark:bg-neutral-900/60">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <div className="flex items-center gap-2">
                                <Badge className="bg-blue-600/10 text-blue-700 hover:bg-blue-600/20 dark:bg-blue-500/15 dark:text-blue-300">
                                    <Sparkles className="mr-1 size-3" />
                                    AI Reviewer Generated
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                    {subject}
                                </Badge>
                            </div>
                            <DialogTitle className="mt-1.5 text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl dark:text-neutral-50">
                                {title}
                            </DialogTitle>
                            <DialogDescription className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400">
                                Generated from {filesCount} uploaded files · Ready for review, PDF download, and test generation
                            </DialogDescription>
                        </div>

                        {/* Top action buttons */}
                        <div className="flex flex-wrap items-center gap-2">
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={handleDownloadPdf}
                                disabled={downloadingPdf}
                                className="h-9 gap-1.5 text-xs font-medium"
                            >
                                {downloadingPdf ? (
                                    <>
                                        <Loader2 className="size-3.5 animate-spin text-blue-600" />
                                        <span>Exporting...</span>
                                    </>
                                ) : (
                                    <>
                                        <Download className="size-3.5 text-neutral-600 dark:text-neutral-400" />
                                        <span>Download PDF</span>
                                    </>
                                )}
                            </Button>

                            <Button
                                size="sm"
                                onClick={() => setActiveTab('test')}
                                className="h-9 gap-1.5 bg-blue-600 text-xs font-semibold text-white shadow-xs hover:bg-blue-700"
                            >
                                <Sparkles className="size-3.5" />
                                <span>Generate Test</span>
                            </Button>
                        </div>
                    </div>

                    {/* Navigation Tabs */}
                    <div className="mt-5 flex items-center gap-1 border-b border-neutral-200 dark:border-neutral-800">
                        <button
                            type="button"
                            onClick={() => setActiveTab('reviewer')}
                            className={`flex items-center gap-2 border-b-2 px-4 py-2.5 text-xs font-semibold transition-colors ${
                                activeTab === 'reviewer'
                                    ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                                    : 'border-transparent text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200'
                            }`}
                        >
                            <FileText className="size-4" />
                            Reviewer Material
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveTab('test')}
                            className={`flex items-center gap-2 border-b-2 px-4 py-2.5 text-xs font-semibold transition-colors ${
                                activeTab === 'test'
                                    ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                                    : 'border-transparent text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200'
                            }`}
                        >
                            <ListChecks className="size-4" />
                            Generate Test
                            {isTestGenerated && (
                                <span className="ml-1 rounded-full bg-emerald-100 px-1.5 py-0.2 text-[10px] font-bold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400">
                                    Ready
                                </span>
                            )}
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveTab('prompt')}
                            className={`flex items-center gap-2 border-b-2 px-4 py-2.5 text-xs font-semibold transition-colors ${
                                activeTab === 'prompt'
                                    ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                                    : 'border-transparent text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200'
                            }`}
                        >
                            <Bot className="size-4" />
                            System Message & Prompt
                        </button>
                    </div>
                </div>

                {/* Tab 1: Reviewer Material (Editable) */}
                {activeTab === 'reviewer' && (
                    <div className="p-6">
                        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-neutral-200/80 bg-neutral-50/50 p-3.5 dark:border-neutral-800 dark:bg-neutral-900/50">
                            <div className="flex items-center gap-2">
                                <Info className="size-4 text-blue-600 dark:text-blue-400" />
                                <span className="text-xs text-neutral-600 dark:text-neutral-300">
                                    You can modify notes, add remarks, or revise summary points before saving.
                                </span>
                            </div>

                            <div className="flex items-center gap-2">
                                {savedNotification && (
                                    <span className="flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                                        <Check className="size-3.5" />
                                        Saved successfully!
                                    </span>
                                )}

                                {isEditingContent ? (
                                    <Button
                                        size="sm"
                                        onClick={handleSaveContent}
                                        className="h-8 gap-1.5 bg-emerald-600 text-xs text-white hover:bg-emerald-700"
                                    >
                                        <Save className="size-3.5" />
                                        Save Changes
                                    </Button>
                                ) : (
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => setIsEditingContent(true)}
                                        className="h-8 gap-1.5 text-xs"
                                    >
                                        <Edit3 className="size-3.5" />
                                        Edit Reviewer
                                    </Button>
                                )}
                            </div>
                        </div>

                        {/* Content Viewer / Editor */}
                        {isEditingContent ? (
                            <div className="space-y-2">
                                <Label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                                    Editor (Markdown & Text Supported)
                                </Label>
                                <textarea
                                    value={reviewerText}
                                    onChange={(e) => setReviewerText(e.target.value)}
                                    rows={18}
                                    className="w-full rounded-lg border border-neutral-300 bg-white p-4 font-mono text-xs leading-relaxed text-neutral-900 shadow-inner focus:border-blue-500 focus:outline-none dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-100"
                                    placeholder="Type or edit your reviewer notes here..."
                                />
                            </div>
                        ) : (
                            <div className="max-h-[500px] overflow-y-auto rounded-xl border border-neutral-200/90 bg-white p-6 shadow-xs dark:border-neutral-800 dark:bg-neutral-950">
                                <div className="prose prose-sm max-w-none dark:prose-invert">
                                    <pre className="whitespace-pre-wrap font-sans text-xs leading-relaxed text-neutral-800 dark:text-neutral-200">
                                        {reviewerText}
                                    </pre>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Tab 2: Test Generator & Interactive Questions */}
                {activeTab === 'test' && (
                    <div className="p-6">
                        {/* Test Configuration Box */}
                        <div className="mb-6 rounded-xl border border-neutral-200 bg-neutral-50/70 p-5 dark:border-neutral-800 dark:bg-neutral-900/60">
                            <div className="mb-4 flex items-center justify-between">
                                <div>
                                    <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                                        Configure Test Assessment
                                    </h4>
                                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                                        Select test format, duration, and question timings tailored to your practice goals.
                                    </p>
                                </div>
                                <Badge variant="outline" className="gap-1 border-blue-200 bg-blue-50 text-[11px] text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300">
                                    <Sliders className="size-3" />
                                    Customizable Exam
                                </Badge>
                            </div>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                                {/* Test Type */}
                                <div className="space-y-1.5">
                                    <Label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                                        Test Type
                                    </Label>
                                    <Select
                                        value={testType}
                                        onValueChange={(val: 'multiple_choice' | 'evaluation' | 'essay') => {
                                            setTestType(val);
                                            setIsTestGenerated(false);
                                        }}
                                    >
                                        <SelectTrigger className="h-9 text-xs">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="multiple_choice" className="text-xs">
                                                Multiple Choice
                                            </SelectItem>
                                            <SelectItem value="evaluation" className="text-xs">
                                                Evaluation (T/F & Identification)
                                            </SelectItem>
                                            <SelectItem value="essay" className="text-xs">
                                                Essay / Explanatory
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Total Test Duration */}
                                <div className="space-y-1.5">
                                    <Label className="flex items-center gap-1 text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                                        <Clock className="size-3 text-neutral-500" />
                                        Total Test Time
                                    </Label>
                                    <Select value={totalTestTime} onValueChange={setTotalTestTime}>
                                        <SelectTrigger className="h-9 text-xs">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="15" className="text-xs">
                                                15 Minutes
                                            </SelectItem>
                                            <SelectItem value="30" className="text-xs">
                                                30 Minutes
                                            </SelectItem>
                                            <SelectItem value="45" className="text-xs">
                                                45 Minutes
                                            </SelectItem>
                                            <SelectItem value="60" className="text-xs">
                                                60 Minutes
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Per Question Timer */}
                                <div className="space-y-1.5">
                                    <Label className="flex items-center gap-1 text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                                        <Timer className="size-3 text-neutral-500" />
                                        Time per Question
                                    </Label>
                                    <Select value={timePerQuestion} onValueChange={setTimePerQuestion}>
                                        <SelectTrigger className="h-9 text-xs">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="0" className="text-xs">
                                                Untimed (Flexible)
                                            </SelectItem>
                                            <SelectItem value="45" className="text-xs">
                                                45 Seconds
                                            </SelectItem>
                                            <SelectItem value="60" className="text-xs">
                                                60 Seconds
                                            </SelectItem>
                                            <SelectItem value="90" className="text-xs">
                                                90 Seconds
                                            </SelectItem>
                                            <SelectItem value="120" className="text-xs">
                                                120 Seconds
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Number of Questions */}
                                <div className="space-y-1.5">
                                    <Label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                                        Number of Questions
                                    </Label>
                                    <Select value={questionCount} onValueChange={setQuestionCount}>
                                        <SelectTrigger className="h-9 text-xs">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="5" className="text-xs">
                                                5 Questions (Quick Quiz)
                                            </SelectItem>
                                            <SelectItem value="10" className="text-xs">
                                                10 Questions (Standard)
                                            </SelectItem>
                                            <SelectItem value="20" className="text-xs">
                                                20 Questions (Full Mock)
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-neutral-200/60 pt-3 dark:border-neutral-800">
                                <div className="flex items-center gap-2">
                                    {/* Google Forms button (Coming soon indicator as specified) */}
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        disabled
                                        className="h-8 gap-1.5 text-xs text-neutral-400 dark:text-neutral-500"
                                    >
                                        <FileSpreadsheet className="size-3.5" />
                                        <span>Export to Google Forms</span>
                                        <Badge className="ml-1 bg-amber-100 text-[9px] text-amber-800 hover:bg-amber-100 dark:bg-amber-950 dark:text-amber-300">
                                            Coming Soon
                                        </Badge>
                                    </Button>
                                </div>

                                <Button
                                    size="sm"
                                    onClick={handleGenerateTest}
                                    disabled={isGeneratingTest}
                                    className="h-8 gap-1.5 bg-blue-600 px-4 text-xs font-semibold text-white shadow-xs hover:bg-blue-700"
                                >
                                    {isGeneratingTest ? (
                                        <>
                                            <Loader2 className="size-3.5 animate-spin" />
                                            <span>Synthesizing Exam Items...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Play className="size-3.5 fill-current" />
                                            <span>Generate Practice Test</span>
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>

                        {/* Generated Test Preview */}
                        {isTestGenerated ? (
                            <div className="space-y-4">
                                <div className="flex items-center justify-between border-b border-neutral-200 pb-3 dark:border-neutral-800">
                                    <div>
                                        <h4 className="text-xs font-bold tracking-wider text-neutral-900 uppercase dark:text-neutral-100">
                                            Practice Test: {testType === 'multiple_choice' ? 'Multiple Choice' : testType === 'evaluation' ? 'Evaluation & Identification' : 'Essay Examination'}
                                        </h4>
                                        <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                                            Total Limit: {totalTestTime} mins · Per Question: {timePerQuestion === '0' ? 'Untimed' : `${timePerQuestion}s`}
                                        </p>
                                    </div>

                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => setShowAnswerKey(!showAnswerKey)}
                                        className="h-8 text-xs text-blue-600 dark:text-blue-400"
                                    >
                                        {showAnswerKey ? 'Hide Answer Key' : 'Show Answer Key & Explanations'}
                                    </Button>
                                </div>

                                {/* Questions Listing */}
                                {testType === 'multiple_choice' && (
                                    <div className="space-y-4">
                                        {multipleChoiceQuestions.map((q) => (
                                            <div
                                                key={q.id}
                                                className="rounded-lg border border-neutral-200/90 bg-white p-4 shadow-2xs dark:border-neutral-800 dark:bg-neutral-950"
                                            >
                                                <p className="text-xs font-semibold text-neutral-900 dark:text-neutral-100">
                                                    Question {q.id}. {q.question}
                                                </p>
                                                <div className="mt-3 space-y-2">
                                                    {q.options.map((opt) => {
                                                        const isSelected = userAnswers[q.id] === opt;
                                                        return (
                                                            <button
                                                                type="button"
                                                                key={opt}
                                                                onClick={() =>
                                                                    setUserAnswers((prev) => ({
                                                                        ...prev,
                                                                        [q.id]: opt,
                                                                    }))
                                                                }
                                                                className={`flex w-full items-center justify-between rounded-md border p-2.5 text-left text-xs transition-colors ${
                                                                    isSelected
                                                                        ? 'border-blue-500 bg-blue-50/70 font-medium text-blue-900 dark:border-blue-600 dark:bg-blue-950/60 dark:text-blue-200'
                                                                        : 'border-neutral-200/80 bg-white hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:bg-neutral-800'
                                                                }`}
                                                            >
                                                                <span>{opt}</span>
                                                                {isSelected && (
                                                                    <CheckCircle2 className="size-4 text-blue-600 dark:text-blue-400" />
                                                                )}
                                                            </button>
                                                        );
                                                    })}
                                                </div>

                                                {showAnswerKey && (
                                                    <div className="mt-3 rounded-md border border-emerald-200 bg-emerald-50/70 p-2.5 text-xs text-emerald-900 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300">
                                                        <span className="font-bold">Correct Answer:</span> {q.correct}
                                                        <p className="mt-1 text-[11px] opacity-90">{q.explanation}</p>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {testType === 'evaluation' && (
                                    <div className="space-y-4">
                                        {evaluationQuestions.map((q) => (
                                            <div
                                                key={q.id}
                                                className="rounded-lg border border-neutral-200/90 bg-white p-4 shadow-2xs dark:border-neutral-800 dark:bg-neutral-950"
                                            >
                                                <div className="mb-2 flex items-center gap-2">
                                                    <Badge variant="outline" className="text-[10px]">
                                                        {q.type}
                                                    </Badge>
                                                    <span className="text-xs font-bold text-neutral-900 dark:text-neutral-100">
                                                        Item {q.id}
                                                    </span>
                                                </div>
                                                <p className="text-xs text-neutral-800 dark:text-neutral-200">
                                                    {q.question}
                                                </p>

                                                <div className="mt-3">
                                                    <Input
                                                        placeholder="Type your response here..."
                                                        className="h-9 text-xs"
                                                    />
                                                </div>

                                                {showAnswerKey && (
                                                    <div className="mt-3 rounded-md border border-emerald-200 bg-emerald-50/70 p-2.5 text-xs text-emerald-900 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300">
                                                        <span className="font-bold">Answer Key:</span> {q.correct}
                                                        <p className="mt-1 text-[11px] opacity-90">{q.explanation}</p>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {testType === 'essay' && (
                                    <div className="space-y-4">
                                        {essayQuestions.map((q) => (
                                            <div
                                                key={q.id}
                                                className="rounded-lg border border-neutral-200/90 bg-white p-4 shadow-2xs dark:border-neutral-800 dark:bg-neutral-950"
                                            >
                                                <p className="text-xs font-semibold text-neutral-900 dark:text-neutral-100">
                                                    Prompt {q.id}. {q.question}
                                                </p>
                                                <div className="mt-3">
                                                    <textarea
                                                        rows={4}
                                                        placeholder="Write your detailed essay or explanatory answer..."
                                                        className="w-full rounded-md border border-neutral-300 bg-white p-3 text-xs leading-relaxed text-neutral-900 focus:border-blue-500 focus:outline-none dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
                                                    />
                                                </div>

                                                {showAnswerKey && (
                                                    <div className="mt-3 rounded-md border border-blue-200 bg-blue-50/70 p-2.5 text-xs text-blue-900 dark:border-blue-900 dark:bg-blue-950/40 dark:text-blue-300">
                                                        <span className="font-bold">Grading Rubric / Key Insights:</span>
                                                        <p className="mt-1 text-[11px] opacity-90">{q.rubric}</p>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-neutral-300 p-10 text-center dark:border-neutral-800">
                                <ListChecks className="size-8 text-neutral-400" />
                                <h5 className="mt-2 text-xs font-bold text-neutral-900 dark:text-neutral-100">
                                    No Test Generated Yet
                                </h5>
                                <p className="mt-1 max-w-sm text-xs text-neutral-500 dark:text-neutral-400">
                                    Click the <strong>Generate Practice Test</strong> button above to construct interactive questions from your reviewer.
                                </p>
                            </div>
                        )}
                    </div>
                )}

                {/* Tab 3: System Message & Customization */}
                {activeTab === 'prompt' && (
                    <div className="space-y-5 p-6">
                        <div className="rounded-lg border border-blue-100 bg-blue-50/60 p-4 dark:border-blue-900/40 dark:bg-blue-950/30">
                            <h4 className="flex items-center gap-1.5 text-xs font-bold text-blue-900 dark:text-blue-200">
                                <Bot className="size-4" />
                                LLM System Instructions
                            </h4>
                            <p className="mt-1 text-xs text-blue-800/80 dark:text-blue-300/80">
                                Students can tailor the AI instructions to produce specific types of reviewers (e.g. emphasize equations, create flashcard style bullets, or simulate rigorous professor exam summaries).
                            </p>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                                Editable System Message
                            </Label>
                            <textarea
                                value={systemMessage}
                                onChange={(e) => setSystemMessage(e.target.value)}
                                rows={6}
                                className="w-full rounded-lg border border-neutral-300 bg-white p-3 font-mono text-xs text-neutral-900 focus:border-blue-500 focus:outline-none dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-100"
                                placeholder="Enter custom prompt instructions for the LLM..."
                            />
                        </div>

                        {/* Quick Presets */}
                        <div className="space-y-2">
                            <Label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                                Quick Prompt Presets
                            </Label>
                            <div className="flex flex-wrap gap-2">
                                <button
                                    type="button"
                                    onClick={() =>
                                        setSystemMessage(
                                            'Create a high-yield exam cram reviewer with core definitions, bulleted takeaways, common student pitfalls, and 3 practice problems with full explanations.'
                                        )
                                    }
                                    className="rounded-md border border-neutral-200 bg-white px-2.5 py-1 text-xs text-neutral-700 hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300"
                                >
                                    ⚡ High-Yield Exam Cram
                                </button>
                                <button
                                    type="button"
                                    onClick={() =>
                                        setSystemMessage(
                                            'Format this reviewer like flashcards: Concept on top, crisp 1-sentence definition underneath, followed by high-impact mnemonic memory aids.'
                                        )
                                    }
                                    className="rounded-md border border-neutral-200 bg-white px-2.5 py-1 text-xs text-neutral-700 hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300"
                                >
                                    💡 Flashcard & Mnemonics
                                </button>
                                <button
                                    type="button"
                                    onClick={() =>
                                        setSystemMessage(
                                            'Provide a comprehensive university-level technical deep-dive. Include theoretical proofs, architectural schemas, SQL syntax standards, and edge-case exceptions.'
                                        )
                                    }
                                    className="rounded-md border border-neutral-200 bg-white px-2.5 py-1 text-xs text-neutral-700 hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300"
                                >
                                    🎓 Deep Academic Analysis
                                </button>
                            </div>
                        </div>

                        <div className="flex justify-end pt-2">
                            <Button
                                size="sm"
                                onClick={handleRegenerateReviewer}
                                disabled={isRegenerating}
                                className="h-9 gap-1.5 bg-blue-600 px-4 text-xs font-semibold text-white shadow-xs hover:bg-blue-700"
                            >
                                {isRegenerating ? (
                                    <>
                                        <Loader2 className="size-3.5 animate-spin" />
                                        <span>Regenerating with LLM (3s)...</span>
                                    </>
                                ) : (
                                    <>
                                        <RefreshCw className="size-3.5" />
                                        <span>Update & Regenerate Reviewer</span>
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                )}

                {/* Footer buttons */}
                <div className="flex items-center justify-between border-t border-neutral-200 bg-neutral-50/50 px-6 py-4 dark:border-neutral-800 dark:bg-neutral-900/50">
                    <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                        Reviewer saved to your library automatically
                    </p>

                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onOpenChange(false)}
                            className="h-8 px-4 text-xs"
                        >
                            Close
                        </Button>
                        <Button
                            size="sm"
                            onClick={() => {
                                handleSaveContent();
                                onOpenChange(false);
                            }}
                            className="h-8 bg-blue-600 px-4 text-xs font-semibold text-white hover:bg-blue-700"
                        >
                            Save & Finish
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
