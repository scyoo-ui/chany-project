"use client";

import { Star, ExternalLink, Eye, EyeOff, Sparkles } from "lucide-react";
import type { Bookmark } from "@/lib/data";
import { getTagColor, getDomainColor, formatDate } from "@/lib/utils";

interface BookmarkCardProps {
  bookmark: Bookmark;
  onToggleRead: () => void;
  onToggleImportant: () => void;
}

const insightStyles = {
  warning: "bg-amber-50 text-amber-700 border-amber-200",
  info: "bg-blue-50 text-blue-700 border-blue-200",
  success: "bg-emerald-50 text-emerald-700 border-emerald-200",
};

export default function BookmarkCard({
  bookmark,
  onToggleRead,
  onToggleImportant,
}: BookmarkCardProps) {
  const domainInitial = bookmark.domain.charAt(0).toUpperCase();
  const domainColor = getDomainColor(bookmark.domain);

  return (
    <article
      className={`bg-white rounded-xl border flex flex-col transition-shadow hover:shadow-md ${
        bookmark.isRead ? "border-slate-200" : "border-violet-200"
      }`}
    >
      {/* Card Header */}
      <div className="px-4 pt-4 flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <div
            className={`w-6 h-6 rounded-md ${domainColor} flex items-center justify-center shrink-0`}
          >
            <span className="text-white text-xs font-bold">{domainInitial}</span>
          </div>
          <a
            href={bookmark.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-slate-400 hover:text-violet-600 truncate flex items-center gap-1 transition-colors"
          >
            {bookmark.domain}
            <ExternalLink className="w-3 h-3 shrink-0" />
          </a>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={onToggleImportant}
            className={`p-1 rounded-md transition-colors ${
              bookmark.isImportant
                ? "text-amber-400 hover:text-amber-500"
                : "text-slate-300 hover:text-amber-400"
            }`}
            title={bookmark.isImportant ? "중요 해제" : "중요 표시"}
          >
            <Star className={`w-4 h-4 ${bookmark.isImportant ? "fill-current" : ""}`} />
          </button>
          <button
            onClick={onToggleRead}
            className={`p-1 rounded-md transition-colors ${
              bookmark.isRead
                ? "text-slate-300 hover:text-slate-500"
                : "text-violet-500 hover:text-violet-700"
            }`}
            title={bookmark.isRead ? "미읽음으로 변경" : "읽음으로 변경"}
          >
            {bookmark.isRead ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Title & Summary */}
      <div className="px-4 pt-3 flex-1">
        <h2 className="text-sm font-semibold text-slate-900 leading-snug mb-2">
          {bookmark.title}
          {!bookmark.isRead && (
            <span className="ml-2 inline-flex items-center text-xs font-medium text-violet-600 bg-violet-50 px-1.5 py-0.5 rounded-full">
              미읽음
            </span>
          )}
        </h2>
        <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
          {bookmark.summary}
        </p>
      </div>

      {/* Tags */}
      <div className="px-4 pt-3 flex flex-wrap gap-1.5">
        {bookmark.tags.map((tag) => (
          <span
            key={tag}
            className={`text-xs px-2 py-0.5 rounded-full font-medium ${getTagColor(tag)}`}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* AI Insight */}
      <div className="px-4 pt-3 pb-4">
        <div
          className={`flex items-start gap-1.5 text-xs px-3 py-2 rounded-lg border ${
            insightStyles[bookmark.insightType]
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 mt-0.5 shrink-0" />
          <span>{bookmark.aiInsight}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 pb-3 border-t border-slate-100 pt-2.5">
        <span className="text-xs text-slate-400">{formatDate(bookmark.savedAt)} 저장</span>
      </div>
    </article>
  );
}
