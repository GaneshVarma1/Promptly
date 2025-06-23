"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useUser, useClerk } from "@clerk/nextjs";
import { useIsMobile } from "@/hooks/use-mobile";
import {
    ImageIcon,
    FileUp,
    Figma,
    MonitorIcon,
    CircleUserRound,
    ArrowUpIcon,
    Paperclip,
    PlusIcon,
} from "lucide-react";

interface UseAutoResizeTextareaProps {
    minHeight: number;
    maxHeight?: number;
}

function useAutoResizeTextarea({
    minHeight,
    maxHeight,
}: UseAutoResizeTextareaProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const adjustHeight = useCallback(
        (reset?: boolean) => {
            const textarea = textareaRef.current;
            if (!textarea) return;

            if (reset) {
                textarea.style.height = `${minHeight}px`;
                return;
            }

            textarea.style.height = `${minHeight}px`;
            const newHeight = Math.max(
                minHeight,
                Math.min(
                    textarea.scrollHeight,
                    maxHeight ?? Number.POSITIVE_INFINITY
                )
            );
            textarea.style.height = `${newHeight}px`;
        },
        [minHeight, maxHeight]
    );

    useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = `${minHeight}px`;
        }
    }, [minHeight]);

    useEffect(() => {
        const handleResize = () => adjustHeight();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [adjustHeight]);

    return { textareaRef, adjustHeight };
}

export interface PromptlyChatProps {
    onPromptSubmit?: (prompt: string) => void;
}

export function PromptlyChat({ onPromptSubmit }: PromptlyChatProps) {
    const [value, setValue] = useState("");
    const { isSignedIn } = useUser();
    const clerk = useClerk();
    const isMobile = useIsMobile();
    const { textareaRef, adjustHeight } = useAutoResizeTextarea({
        minHeight: 60,
        maxHeight: 200,
    });

    const handleAuthAction = () => {
        if (!isSignedIn) {
            clerk.openSignIn({});
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            if (value.trim()) {
                if (onPromptSubmit) {
                    onPromptSubmit(value.trim());
                }
                setValue("");
                adjustHeight(true);
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-full w-full max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground font-sussie text-center leading-tight px-2">
                How can I help you craft the perfect prompt today?
            </h1>

            <div className="w-full flex flex-col items-center justify-center">
                <div className="relative bg-card rounded-xl border border-border w-full shadow-lg">
                    <div className="overflow-y-auto">
                        <Textarea
                            ref={textareaRef}
                            value={value}
                            onChange={(e) => {
                                setValue(e.target.value);
                                adjustHeight();
                            }}
                            onKeyDown={handleKeyDown}
                            placeholder="Let's craft the perfect prompt together..."
                            className={cn(
                                "w-full px-3 py-3 sm:px-4",
                                "resize-none",
                                "bg-transparent",
                                "border-none",
                                "text-foreground text-sm sm:text-base",
                                "focus:outline-none",
                                "focus-visible:ring-0 focus-visible:ring-offset-0",
                                "placeholder:text-muted-foreground placeholder:text-sm sm:placeholder:text-base",
                                "min-h-[60px]"
                            )}
                            style={{
                                overflow: "hidden",
                            }}
                        />
                    </div>

                    <div className="flex items-center justify-between p-2 sm:p-3">
                        <div className="flex items-center gap-1 sm:gap-2">
                            <button
                                type="button"
                                className="group p-1.5 sm:p-2 hover:bg-accent rounded-lg transition-colors flex items-center gap-1"
                            >
                                <Paperclip className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground" />
                                <span className="text-xs text-muted-foreground hidden sm:group-hover:inline transition-opacity">
                                    Attach
                                </span>
                            </button>
                        </div>
                        <div className="flex items-center gap-1.5 sm:gap-2">
                            <button
                                type="button"
                                className="px-2 py-1 rounded-lg text-xs sm:text-sm text-muted-foreground transition-colors border border-dashed border-border hover:border-border hover:bg-accent flex items-center justify-between gap-1"
                            >
                                <PlusIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                <span className="hidden xs:inline">Project</span>
                            </button>
                            <button
                                type="button"
                                className={cn(
                                    "px-1.5 py-1.5 rounded-lg text-sm transition-colors border border-border hover:border-border hover:bg-accent flex items-center justify-between gap-1",
                                    value.trim()
                                        ? "bg-primary text-primary-foreground"
                                        : "text-muted-foreground"
                                )}
                                onClick={() => {
                                    if (value.trim()) {
                                        if (onPromptSubmit) {
                                            onPromptSubmit(value.trim());
                                        }
                                        setValue("");
                                        adjustHeight(true);
                                    }
                                }}
                                disabled={!value.trim()}
                            >
                                <ArrowUpIcon
                                    className={cn(
                                        "w-3.5 h-3.5 sm:w-4 sm:h-4",
                                        value.trim()
                                            ? "text-primary-foreground"
                                            : "text-muted-foreground"
                                    )}
                                />
                                <span className="sr-only">Send</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Action buttons with responsive layout */}
                <div className={cn(
                    "flex items-center justify-center gap-2 sm:gap-3 mt-4 sm:mt-6 flex-wrap",
                    isMobile ? "max-w-full" : ""
                )}>
                    <ActionButton
                        icon={<FileUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                        label="Upload File"
                        shortLabel="Upload"
                        onClick={handleAuthAction}
                        isMobile={isMobile}
                    />
                    <ActionButton
                        icon={<MonitorIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                        label="Templates"
                        shortLabel="Templates"
                        onClick={handleAuthAction}
                        isMobile={isMobile}
                    />
                    <ActionButton
                        icon={<Figma className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                        label="Gallery"
                        shortLabel="Gallery"
                        onClick={handleAuthAction}
                        isMobile={isMobile}
                    />
                    <ActionButton
                        icon={<CircleUserRound className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                        label="My Prompts"
                        shortLabel="Mine"
                        onClick={handleAuthAction}
                        isMobile={isMobile}
                    />
                    <ActionButton
                        icon={<PlusIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                        label="New Prompt"
                        shortLabel="New"
                        onClick={handleAuthAction}
                        isMobile={isMobile}
                    />
                </div>
            </div>
        </div>
    );
}

interface ActionButtonProps {
    icon: React.ReactNode;
    label: string;
    shortLabel?: string;
    onClick?: () => void;
    isMobile?: boolean;
}

function ActionButton({ icon, label, shortLabel, onClick, isMobile }: ActionButtonProps) {
    const displayLabel = isMobile && shortLabel ? shortLabel : label;
    
    return (
        <button
            type="button"
            onClick={onClick}
            className={cn(
                "flex items-center gap-1.5 sm:gap-2 px-2.5 py-1.5 sm:px-3 sm:py-2",
                "text-xs sm:text-sm text-muted-foreground hover:text-foreground",
                "transition-colors border border-border rounded-lg hover:bg-accent",
                "min-w-0 flex-shrink-0"
            )}
        >
            {icon}
            <span className="truncate">{displayLabel}</span>
        </button>
    );
} 