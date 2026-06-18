"use client";

import { Bookmark, Inbox, Star, EyeOff, Tag, X } from "lucide-react";
import type { Filter } from "@/lib/data";

interface SidebarProps {
  filter: Filter;
  setFilter: (f: Filter) => void;
  selectedTags: string[];
  setSelectedTags: (tags: string[]) => void;
  allTags: string[];
  totalCount: number;
  unreadCount: number;
  importantCount: number;
}

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}

function NavItem({ icon: Icon, label, count, active, onClick }: NavItemProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
        active
          ? "bg-violet-50 text-violet-700 font-medium"
          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
      }`}
    >
      <span className="flex items-center gap-2.5">
        <Icon className="w-4 h-4" />
        {label}
      </span>
      <span
        className={`text-xs px-1.5 py-0.5 rounded-full ${
          active
            ? "bg-violet-100 text-violet-600"
            : "bg-slate-100 text-slate-500"
        }`}
      >
        {count}
      </span>
    </button>
  );
}

export default function Sidebar({
  filter,
  setFilter,
  selectedTags,
  setSelectedTags,
  allTags,
  totalCount,
  unreadCount,
  importantCount,
}: SidebarProps) {
  function toggleTag(tag: string) {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  }

  return (
    <aside className="w-64 shrink-0 bg-white border-r border-slate-200 flex flex-col h-full">
      {/* Brand */}
      <div className="px-5 pt-5 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center shadow-sm">
            <Bookmark className="w-4 h-4 text-white fill-white" />
          </div>
          <div>
            <p className="font-semibold text-slate-900 leading-none">
              Curately
            </p>
            <p className="text-xs text-slate-400 mt-0.5">AI 북마크 큐레이터</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="px-3 py-4 flex flex-col gap-0.5">
        <NavItem
          icon={Inbox}
          label="전체"
          count={totalCount}
          active={filter === "all"}
          onClick={() => setFilter("all")}
        />
        <NavItem
          icon={EyeOff}
          label="미읽음"
          count={unreadCount}
          active={filter === "unread"}
          onClick={() => setFilter("unread")}
        />
        <NavItem
          icon={Star}
          label="중요"
          count={importantCount}
          active={filter === "important"}
          onClick={() => setFilter("important")}
        />
      </nav>

      <div className="mx-4 border-t border-slate-100" />

      {/* Tags */}
      <div className="px-4 py-4 flex-1 overflow-y-auto">
        <div className="flex items-center justify-between mb-3">
          <span className="flex items-center gap-1.5 text-xs font-medium text-slate-400 uppercase tracking-wider">
            <Tag className="w-3 h-3" />
            태그
          </span>
          {selectedTags.length > 0 && (
            <button
              onClick={() => setSelectedTags([])}
              className="text-xs text-violet-500 hover:text-violet-700 flex items-center gap-0.5"
            >
              <X className="w-3 h-3" />
              초기화
            </button>
          )}
        </div>
        <div className="flex flex-col gap-0.5">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`flex items-center gap-2 px-2 py-1.5 rounded-md text-sm transition-colors text-left ${
                selectedTags.includes(tag)
                  ? "bg-violet-50 text-violet-700 font-medium"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                  selectedTags.includes(tag) ? "bg-violet-500" : "bg-slate-300"
                }`}
              />
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-slate-100">
        <p className="text-xs text-slate-400 text-center">
          AI가 매일 요약을 업데이트합니다
        </p>
      </div>
    </aside>
  );
}
