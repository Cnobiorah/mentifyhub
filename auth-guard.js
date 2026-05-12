// MentifyHub — shared auth guard
// Provides requireAuth() and guardAuth() used by all protected pages.
// Must be loaded after supabase-js and config.js.

(function() {
  // Initialise a single shared Supabase client on window.mhSb
  if (!window.mhSb && window.supabase && window.MH_SUPABASE_URL) {
    window.mhSb = window.supabase.createClient(
      window.MH_SUPABASE_URL,
      window.MH_SUPABASE_ANON_KEY
    );
  }

  /**
   * requireAuth() — used by mentor-dashboard, sessions, reviews, etc.
   * Returns the authenticated user object, or null (and redirects) if not signed in.
   * @param {string} returnTo  — page to return to after sign-in
   */
  window.requireAuth = async function(returnTo) {
    const sb = window.mhSb;
    if (!sb) return null;
    const { data: { user }, error } = await sb.auth.getUser();
    if (error) console.error("requireAuth error:", error);
    if (!user) {
      const rt = returnTo ? `&returnTo=${encodeURIComponent(returnTo)}` : "";
      window.location.href = `auth.html?mode=signin${rt}`;
      return null;
    }
    return user;
  };

  /**
   * guardAuth() — used by mentee-dashboard, messages, etc.
   * Sets window.mhCurrentUser. Returns true if authenticated, false otherwise.
   * @param {string} returnTo  — page to return to after sign-in
   */
  window.guardAuth = async function(returnTo) {
    const sb = window.mhSb;
    if (!sb) return false;
    const { data: { session }, error } = await sb.auth.getSession();
    if (error) console.error("guardAuth error:", error);
    if (!session) {
      const rt = returnTo ? `?returnTo=${encodeURIComponent(returnTo)}` : "";
      window.location.href = `auth.html?mode=signin${rt}`;
      return false;
    }
    window.mhCurrentUser = session.user;
    return true;
  };

  /**
   * requireAdmin() — used by admin.html only.
   * Checks session AND that email is in MH_ADMIN_EMAILS.
   * Returns user or null.
   */
  window.requireAdmin = async function() {
    const sb = window.mhSb;
    if (!sb) return null;
    const { data: { session } } = await sb.auth.getSession();
    if (!session) {
      window.location.href = "auth.html?mode=signin&returnTo=admin.html";
      return null;
    }
    const adminEmails = window.MH_ADMIN_EMAILS || [];
    if (adminEmails.length > 0 && !adminEmails.includes(session.user.email)) {
      // Not an admin — redirect away silently
      window.location.href = "mentee-dashboard.html";
      return null;
    }
    return session.user;
  };

  /**
   * Determine the correct dashboard URL for the signed-in user.
   */
  window.getDashboardUrl = async function() {
    const sb = window.mhSb;
    if (!sb) return "index.html";
    try {
      const { data: { session } } = await sb.auth.getSession();
      if (!session) return "auth.html";
      const { data: mp } = await sb.from("mentors").select("user_id").eq("user_id", session.user.id).maybeSingle();
      return mp ? "mentor-dashboard.html" : "mentee-dashboard.html";
    } catch(e) {
      return "mentor-dashboard.html";
    }
  };
})();
