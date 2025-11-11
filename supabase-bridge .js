/*
 * Mentorship.AI — Supabase Bridge (Updated)
 * Plain <script> (no modules). Attach one client + a small API to window.supa.
 *
 * Usage:
 *   <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
 *   <script>
 *     window.SUPABASE_URL = "https://YOURPROJECT.supabase.co";
 *     window.SUPABASE_ANON_KEY = "YOUR_ANON_KEY";
 *   </script>
 *   <script src="./supabase-bridge.js"></script>
 *   <script> window.supa.init(); </script>
 */

(function () {
  const state = { client: null };

  function ensureKeys() {
    if (!window.SUPABASE_URL || !window.SUPABASE_ANON_KEY) {
      console.warn("[supa] Missing SUPABASE_URL or SUPABASE_ANON_KEY");
      return false;
    }
    return true;
  }

  function init() {
    if (state.client) return state.client;
    if (!ensureKeys()) return null;
    state.client = (window.supabase || supabase).createClient(
      window.SUPABASE_URL,
      window.SUPABASE_ANON_KEY
    );
    console.log("[supa] Supabase client ready");
    return state.client;
  }

  function sb() {
    return state.client || init();
  }

  // ========== USERS ==========
  async function upsertUser({ email, name, role } = {}) {
    if (!email) throw new Error("email required");
    const _role = role || "mentee";
    const { data, error } = await sb()
      .from("users")
      .upsert({ email, name: name || null, role: _role })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  // ========== MENTORS ==========
  async function upsertMentorProfile({
    user_email,
    timezone,
    availability,
    types,
    skills,
    topics,
    bio,
    meeting_link,
    linkedin,
  } = {}) {
    if (!user_email) throw new Error("user_email required");
    // ensure a mentor user row exists
    await upsertUser({ email: user_email, role: "mentor" });
    const { data, error } = await sb()
      .from("mentors")
      .upsert({
        user_email,
        timezone: timezone || null,
        availability: availability || null,
        types: types || null,
        skills: skills || null,
        topics: topics || null,
        bio: bio || null,
        meeting_link: meeting_link || null,
        linkedin: linkedin || null,
      }, { onConflict: "user_email" })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  // ========== REQUESTS ==========
  async function createRequest({ mentee_email, mentor_email, note, interests } = {}) {
    if (!mentee_email || !mentor_email) throw new Error("mentee_email and mentor_email required");
    await upsertUser({ email: mentee_email, role: "mentee" });
    await upsertUser({ email: mentor_email, role: "mentor" });
    const { data, error } = await sb()
      .from("requests")
      .insert({
        mentee_email,
        mentor_email,
        status: "pending",
        note: note || null,
        interests: interests || null
      })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async function fetchMentorInbox(mentor_email) {
    if (!mentor_email) throw new Error("mentor_email required");
    // Use the helpful view for names
    const { data, error } = await sb()
      .from("v_requests_with_names")
      .select("*")
      .eq("mentor_email", mentor_email)
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data;
  }

  async function updateRequestStatus(id, status) {
    if (!id) throw new Error("id required");
    if (!["pending","accepted","declined"].includes(status)) {
      throw new Error("status must be pending|accepted|declined");
    }
    const { data, error } = await sb()
      .from("requests")
      .update({ status, decided_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async function listActivePairs(email, perspective /* 'mentee'|'mentor' */) {
    if (!email) throw new Error("email required");
    let q = sb().from("v_requests_with_names").select("*").eq("status","accepted");
    if (perspective === "mentee") q = q.eq("mentee_email", email);
    else if (perspective === "mentor") q = q.eq("mentor_email", email);
    const { data, error } = await q;
    if (error) throw error;
    return data;
  }

  // ========== GOALS ==========
  async function createGoal({ mentee_email, mentor_email, title, notes, status, progress, start_date, due_date } = {}) {
    if (!mentee_email || !title) throw new Error("mentee_email and title required");
    await upsertUser({ email: mentee_email, role: "mentee" });
    if (mentor_email) await upsertUser({ email: mentor_email, role: "mentor" });
    const { data, error } = await sb()
      .from("goals")
      .insert({
        mentee_email,
        mentor_email: mentor_email || null,
        title,
        notes: notes || null,
        status: status || "open",
        progress: typeof progress === "number" ? progress : 0,
        start_date: start_date || null,
        due_date: due_date || null
      })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  // ========== ADMIN HELPERS (for your admin dashboard) ==========
  async function adminFetchRequests(status /* optional */) {
    let q = sb().from("v_requests_with_names").select("*").order("created_at", { ascending: false });
    if (status) q = q.eq("status", status);
    const { data, error } = await q;
    if (error) throw error;
    return data;
  }

  async function adminFetchMentorsJoined() {
    const { data: users, error: e1 } = await sb().from("users").select("*").eq("role","mentor");
    const { data: mentors, error: e2 } = await sb().from("mentors").select("*");
    if (e1) throw e1;
    if (e2) throw e2;
    const byEmail = Object.fromEntries((mentors||[]).map(m=>[m.user_email,m]));
    return (users||[]).map(u => ({
      user_email: u.email,
      name: u.name || "",
      timezone: byEmail[u.email]?.timezone || "",
      availability: (byEmail[u.email]?.availability || []).join("|"),
      types: (byEmail[u.email]?.types || []).join("|"),
      skills: (byEmail[u.email]?.skills || []).join("|"),
      topics: (byEmail[u.email]?.topics || []).join("|"),
      linkedin: byEmail[u.email]?.linkedin || "",
      meeting_link: byEmail[u.email]?.meeting_link || "",
      created_at: byEmail[u.email]?.created_at || ""
    }));
  }

  async function adminFetchMentees() {
    const { data, error } = await sb().from("users").select("*").eq("role","mentee").order("created_at", { ascending: false });
    if (error) throw error;
    return (data||[]).map(u => ({ email: u.email, name: u.name || "", created_at: u.created_at }));
  }

  // Public API
  window.supa = {
    init,
    upsertUser,
    upsertMentorProfile,
    createRequest,
    fetchMentorInbox,
    updateRequestStatus,
    listActivePairs,
    createGoal,

    // admin helpers
    adminFetchRequests,
    adminFetchMentorsJoined,
    adminFetchMentees,
  };
})();
