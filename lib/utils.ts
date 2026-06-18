const TAG_COLORS = [
  "bg-violet-100 text-violet-700",
  "bg-blue-100 text-blue-700",
  "bg-emerald-100 text-emerald-700",
  "bg-amber-100 text-amber-700",
  "bg-rose-100 text-rose-700",
  "bg-cyan-100 text-cyan-700",
  "bg-orange-100 text-orange-700",
  "bg-indigo-100 text-indigo-700",
];

const DOMAIN_COLORS = [
  "bg-violet-500",
  "bg-blue-500",
  "bg-emerald-500",
  "bg-amber-500",
  "bg-rose-500",
  "bg-cyan-500",
  "bg-orange-500",
  "bg-indigo-500",
];

function hashString(str: string, mod: number): number {
  let hash = 0;
  for (const char of str) {
    hash = (hash * 31 + char.charCodeAt(0)) % mod;
  }
  return hash;
}

export function getTagColor(tag: string): string {
  return TAG_COLORS[hashString(tag, TAG_COLORS.length)];
}

export function getDomainColor(domain: string): string {
  return DOMAIN_COLORS[hashString(domain, DOMAIN_COLORS.length)];
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("ko-KR", {
    month: "short",
    day: "numeric",
  });
}
