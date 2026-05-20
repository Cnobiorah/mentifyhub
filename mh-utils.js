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
  const checks = [
    !!m.headline, !!m.current_title, !!m.experience, !!m.years_experience,
    !!m.bio, !!m.field,
    safeArr(m.best_for).length >= 1,
    safeArr(m.tags).length >= 3,
    !!m.preferred_level, !!m.mentorship_style, !!m.session_duration,
    m.active_slots != null, !!m.pricing_type, !!m.communication,
    !!m.country, !!m.timezone, !!m.availability
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
  const checks = [
    !!m.goal, !!m.level, !!m.current_role, !!m.field_experience_level,
    !!m.preferred_language, !!m.field,
    (Array.isArray(m.help_needed) ? m.help_needed.length >= 1 : !!m.help_needed),
    !!m.timeline, !!m.preferred_session_type,
    safeArr(m.tags).length >= 3,
    !!m.country, !!m.timezone, !!m.availability, !!m.communication
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
