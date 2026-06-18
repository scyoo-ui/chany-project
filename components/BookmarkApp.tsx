"use client";

import { useState } from "react";
import { Search, Plus, BookmarkX, LayoutGrid, List } from "lucide-react";
import { MOCK_BOOKMARKS, type Bookmark, type Filter } from "@/lib/data";
import Sidebar from "@/components/Sidebar";
import BookmarkCard from "@/components/BookmarkCard";
import AddBookmarkModal from "@/components/AddBookmarkModal";

type ViewMode = "grid" | "list";

export default function BookmarkApp() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(MOCK_BOOKMARKS);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  const allTags = Array.from(new Set(bookmarks.flatMap((b) => b.tags))).sort();
  const unreadCount = bookmarks.filter((b) => !b.isRead).length;
  const importantCount = bookmarks.filter((b) => b.isImportant).length;

  const filtered = bookmarks
    .filter((b) => {
      if (filter === "unread") return !b.isRead;
      if (filter === "important") return b.isImportant;
      return true;
    })
    .filter((b) => {
      if (selectedTags.length === 0) return true;
      return selectedTags.some((t) => b.tags.includes(t));
    })
    .filter((b) => {
      if (!search.trim()) return true;
      const q = search.toLowerCase();
      return (
        b.title.toLowerCase().includes(q) ||
        b.summary.toLowerCase().includes(q) ||
        b.tags.some((t) => t.toLowerCase().includes(q))
      );
    });

  function toggleRead(id: string) {
    setBookmarks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, isRead: !b.isRead } : b))
    );
  }

  function toggleImportant(id: string) {
    setBookmarks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, isImportant: !b.isImportant } : b))
    );
  }

  function handleAdd(data: { url: string; title: string; tags: string[] }) {
    let domain = data.url;
    try {
      domain = new URL(data.url).hostname.replace("www.", "");
    } catch {
      /* URL parsing failed — use raw input */
    }

    const newBookmark: Bookmark = {
      id: Date.now().toString(),
      url: data.url,
      domain,
      title: data.title || domain,
      summary: "AI가 요약을 생성 중입니다...",
      tags: data.tags,
      savedAt: new Date().toISOString().split("T")[0],
      isRead: false,
      isImportant: false,
      aiInsight: "방금 저장됨 · AI 분석 중",
      insightType: "info",
    };

    setBookmarks((prev) => [newBookmark, ...prev]);
    setIsModalOpen(false);
  }

  const filterLabels: Record<Filter, string> = {
    all: "전체",
    unread: "미읽음",
    important: "중요",
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar
        filter={filter}
        setFilter={setFilter}
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
        allTags={allTags}
        totalCount={bookmarks.length}
        unreadCount={unreadCount}
        importantCount={importantCount}
      />

      <main className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center gap-3 shrink-0">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="제목, 요약, 태그 검색..."
              className="w-full pl-9 pr-4 py-2 text-base text-slate-900 placeholder:text-slate-400 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-shadow"
            />
          </div>
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === "grid"
                  ? "bg-white text-violet-600 shadow-sm"
                  : "text-slate-400 hover:text-slate-600"
              }`}
              title="그리드 보기"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === "list"
                  ? "bg-white text-violet-600 shadow-sm"
                  : "text-slate-400 hover:text-slate-600"
              }`}
              title="리스트 보기"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-violet-600 text-white text-sm font-medium rounded-lg hover:bg-violet-700 transition-colors shadow-sm shrink-0"
          >
            <Plus className="w-4 h-4" />
            북마크 추가
          </button>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {/* Filter bar */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-1">
              {(["all", "unread", "important"] as Filter[]).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    filter === f
                      ? "bg-violet-600 text-white"
                      : "text-slate-500 hover:bg-slate-200 hover:text-slate-700"
                  }`}
                >
                  {filterLabels[f]}
                  {f === "unread" && unreadCount > 0 && (
                    <span className="ml-1.5 text-xs opacity-80">({unreadCount})</span>
                  )}
                </button>
              ))}
            </div>
            <p className="text-sm text-slate-400">
              {filtered.length}개
              {selectedTags.length > 0 && (
                <span className="ml-1">· {selectedTags.join(", ")} 필터 중</span>
              )}
            </p>
          </div>

          {/* Grid / List */}
          {filtered.length > 0 ? (
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
                  : "flex flex-col gap-3"
              }
            >
              {filtered.map((bookmark) => (
                <BookmarkCard
                  key={bookmark.id}
                  bookmark={bookmark}
                  onToggleRead={() => toggleRead(bookmark.id)}
                  onToggleImportant={() => toggleImportant(bookmark.id)}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-slate-400">
              <BookmarkX className="w-12 h-12 mb-4 opacity-40" />
              <p className="text-sm font-medium">북마크가 없습니다</p>
              <p className="text-xs mt-1">
                {search ? `"${search}" 검색 결과 없음` : "조건에 맞는 북마크가 없습니다"}
              </p>
            </div>
          )}
        </div>
      </main>

      {isModalOpen && (
        <AddBookmarkModal onClose={() => setIsModalOpen(false)} onAdd={handleAdd} />
      )}
    </div>
  );
}
