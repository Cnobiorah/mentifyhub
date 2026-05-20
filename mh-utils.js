// MentifyHub — shared utilities
// Load after config.js on any page that needs these helpers.

/**
 * Calculate mentor profile completeness (0–100).
 */
window.mentorCompleteness = function(m) {
  function safeArr(v) {
    if (Array.isArray(v)) return v;
    if (typeof v === "string") return v.split(",").map(s => s.trim()).filter(Boolean);
    return [];
  }
  // Only check fields collected by the current onboarding
  const checks = [
    !!m.headline,
    !!m.bio,
    !!m.field,
    !!m.experience,
    !!m.pricing_type,
    !!m.communication,
    !!m.availability,
    !!m.country,
    !!m.timezone,
    safeArr(m.tags).length >= 1,
  ];
  return Math.round(checks.filter(Boolean).length / checks.length * 100);
};

/**
 * Calculate mentee profile completeness (0–100).
 */
window.menteeCompleteness = function(m) {
  function safeArr(v) {
    if (Array.isArray(v)) return v;
    if (typeof v === "string") return v.split(",").map(s => s.trim()).filter(Boolean);
    return [];
  }
  // Only check fields collected by the current onboarding
  const checks = [
    !!m.goal,
    !!m.level,
    !!m.field,
    !!m.bio,
    !!m.communication,
    !!m.availability,
    !!m.country,
    !!m.timezone,
    safeArr(m.tags).length >= 1,
  ];
  return Math.round(checks.filter(Boolean).length / checks.length * 100);
};

/**
 * Escape HTML — safe interpolation into innerHTML / email templates.
 */
window.escHtml = function(s) {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
};

/**
 * Format an ISO date string to a readable local date+time.
 */
window.fmtDate = function(iso) {
  try {
    return new Date(iso).toLocaleString(undefined, {
      year: "numeric", month: "short", day: "2-digit",
      hour: "2-digit", minute: "2-digit"
    });
  } catch(e) { return iso || ""; }
};
