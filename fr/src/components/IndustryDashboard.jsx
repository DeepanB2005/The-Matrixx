import CompanyProfile from "./CompanyProfile";
import { useMemo, useState } from "react";
import { BookOpen, BriefcaseBusiness, CheckCircle2, ClipboardCheck, Download, Filter, MailCheck, Search, ShieldCheck, Sparkles, UserRound, Users, Video } from "lucide-react";

const initialJobs = [
  { id: "ai-intern", title: "AI / ML Engineering Intern", type: "Internship", location: "Bengaluru · Hybrid", skills: "Python, machine learning, SQL", applicants: 12, status: "Active" },
  { id: "frontend-role", title: "Frontend Developer", type: "Full-time", location: "Remote · India", skills: "React, JavaScript, accessibility", applicants: 8, status: "Active" },
];

const initialApplicants = [
  { id: "a1", name: "Arjun", role: "AI / ML Engineering Intern", match: 94, stage: "Assessment pending", skills: "Python · ML · SQL" },
  { id: "a2", name: "Deepan", role: "AI / ML Engineering Intern", match: 89, stage: "Interview scheduled", skills: "Python · TensorFlow · APIs" },
  { id: "a3", name: "Arun", role: "Frontend Developer", match: 86, stage: "Shortlisted", skills: "React · TypeScript · CSS" },
];

const contentTypes = ["Training", "Workshop", "Program", "Open hiring program", "Faculty development program"];
const targetAudiences = ["Students", "Faculty", "Institutions"];
const initialContentPosts = [
  { id: "data-workshop", title: "Applied Data Skills Workshop", type: "Workshop", audiences: ["Students"], date: "2026-10-12", description: "A practical introduction to data analysis and responsible AI for early-career talent.", status: "Published" },
  { id: "faculty-program", title: "Industry-ready Teaching Program", type: "Faculty development program", audiences: ["Faculty", "Institutions"], date: "2026-11-05", description: "Professional development sessions for faculty and academic partners.", status: "Published" },
];

const stages = ["Assessment pending", "Shortlisted", "Interview scheduled", "Offer" ];

const skillAliases = {
  "machine learning": ["machine learning", "ml"],
  javascript: ["javascript", "js", "typescript", "ts"],
  accessibility: ["accessibility", "a11y"],
};

const getSkills = (skills = "") => skills.toLowerCase().split(/[,.·]/).map((skill) => skill.trim()).filter(Boolean);

const getMatch = (job, applicant) => {
  const requiredSkills = getSkills(job.skills);
  const applicantSkills = getSkills(applicant.skills);
  const matchedSkills = requiredSkills.filter((skill) => (skillAliases[skill] || [skill]).some((alias) => applicantSkills.some((applicantSkill) => applicantSkill.includes(alias))));
  return {
    score: requiredSkills.length ? Math.round((matchedSkills.length / requiredSkills.length) * 100) : 0,
    matchedSkills,
  };
};

const csvValue = (value) => `"${String(value ?? "").replaceAll('"', '""')}"`;

export default function IndustryDashboard() {
  const [tab, setTab] = useState("profile");
  const [jobs, setJobs] = useState(initialJobs);
  const [applicants, setApplicants] = useState(initialApplicants);
  const [query, setQuery] = useState("");
  const [stageFilter, setStageFilter] = useState("All stages");
  const [notice, setNotice] = useState("");
  const [form, setForm] = useState({ title: "", type: "Internship", location: "", skills: "", description: "", deadline: "" });
  const [reviewRequested, setReviewRequested] = useState(false);
  const [selectedRecruitment, setSelectedRecruitment] = useState({});
  const [contentPosts, setContentPosts] = useState(initialContentPosts);
  const [contentForm, setContentForm] = useState({ title: "", type: "Training", audiences: [], date: "", description: "" });

  const filteredApplicants = useMemo(() => applicants.filter((item) => {
    const matchesQuery = `${item.name} ${item.role} ${item.skills}`.toLowerCase().includes(query.toLowerCase());
    return matchesQuery && (stageFilter === "All stages" || item.stage === stageFilter);
  }), [applicants, query, stageFilter]);
  const jobRecommendations = useMemo(() => Object.fromEntries(jobs.map((job) => [job.id, applicants
    .map((applicant) => ({ ...applicant, ...getMatch(job, applicant) }))
    .filter((applicant) => applicant.score > 0)
    .sort((a, b) => b.score - a.score)])), [jobs, applicants]);

  const postJob = (event) => {
    event.preventDefault();
    if (!form.title || !form.location || !form.skills || !form.description) return;
    setJobs((current) => [{ ...form, id: `job-${Date.now()}`, applicants: 0, status: "Active" }, ...current]);
    setForm({ title: "", type: "Internship", location: "", skills: "", description: "", deadline: "" });
    setNotice("Opportunity published. Candidate matching is now active.");
  };

  const advanceApplicant = (id) => setApplicants((current) => current.map((item) => {
    if (item.id !== id) return item;
    const next = stages[Math.min(stages.indexOf(item.stage) + 1, stages.length - 1)];
    return { ...item, stage: next };
  }));

  const launchAction = (action) => setNotice(`${action} is ready. Candidates will receive an invitation from your hiring workspace.`);

  const downloadApplicants = (job) => {
    const recommendations = jobRecommendations[job.id] || [];
    const rows = [["Job title", "Applicant", "Match score", "Matched skills", "Applicant skills", "Stage"], ...recommendations.map((applicant) => [job.title, applicant.name, `${applicant.score}%`, applicant.matchedSkills.join(", "), applicant.skills, applicant.stage])];
    const csv = rows.map((row) => row.map(csvValue).join(",")).join("\n");
    const link = document.createElement("a");
    link.href = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8;" }));
    link.download = `${job.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}-recommended-applicants.csv`;
    link.click();
    URL.revokeObjectURL(link.href);
    setNotice(`Downloaded ${recommendations.length} recommended applicants for ${job.title}.`);
  };

  const selectForRecruitment = (job) => {
    const recommendations = jobRecommendations[job.id] || [];
    if (!recommendations.length) return;
    const candidateIds = recommendations.map((applicant) => applicant.id);
    setSelectedRecruitment((current) => ({ ...current, [job.id]: candidateIds }));
    setApplicants((current) => current.map((applicant) => candidateIds.includes(applicant.id) && applicant.stage === "Assessment pending" ? { ...applicant, stage: "Shortlisted" } : applicant));
    setNotice(`Recruitment invitations were emailed to ${candidateIds.length} recommended candidate${candidateIds.length === 1 ? "" : "s"} for ${job.title}.`);
  };

  const postContent = (event) => {
    event.preventDefault();
    if (!contentForm.title || !contentForm.description || !contentForm.audiences.length) return;
    setContentPosts((current) => [{ ...contentForm, id: `content-${Date.now()}`, status: "Published" }, ...current]);
    setContentForm({ title: "", type: "Training", audiences: [], date: "", description: "" });
    setNotice(`${contentForm.type} published for ${contentForm.audiences.join(" and ")}.`);
  };

  const toggleContentStatus = (id) => setContentPosts((current) => current.map((post) => post.id === id ? { ...post, status: post.status === "Published" ? "Draft" : "Published" } : post));

  return <section className="mt-6 space-y-6">
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
      <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
        <div><p className="text-xs font-semibold uppercase tracking-[.18em] text-sky-600">Employer workspace</p><h2 className="mt-2 text-2xl font-semibold">From skill demand to better candidates.</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">Define demand, match talent, run assessments and keep developing your hiring pipeline.</p></div>
        <div className="flex items-center gap-3 rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700"><ShieldCheck size={20} />Verified by Matrixx admin</div>
      </div>
      <div className="mt-7 grid gap-2 md:grid-cols-5">{["Define skill demand", "Post opportunities", "AI skill matching", "Assess & interview", "Hire & develop"].map((step, index) => <div key={step} className="flex items-center gap-2"><span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-sky-100 text-xs font-bold text-sky-700">{index + 1}</span><span className="text-xs font-medium text-slate-600">{step}</span>{index < 4 && <span className="hidden h-px flex-1 bg-slate-200 md:block" />}</div>)}</div>
    </div>

    <div className="flex flex-wrap gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">{[["profile", "Company profile", UserRound], ["jobs", "Jobs & applicants", BriefcaseBusiness], ["content", "Programs & content", BookOpen], ["recruitment", "Recruitment", ClipboardCheck]].map(([id, label, Icon]) => <button key={id} type="button" onClick={() => setTab(id)} className={`inline-flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition ${tab === id ? "bg-slate-900 text-white" : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"}`}><Icon size={17} />{label}</button>)}</div>

    {notice && <div className="flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800"><CheckCircle2 size={17} />{notice}</div>}

    {tab === "profile" && <div className="grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
      <CompanyProfile />
      <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"><div className="flex items-center gap-3"><ShieldCheck className="text-emerald-600" /><h3 className="text-lg font-semibold">Admin verification</h3></div><p className="mt-4 text-sm leading-6 text-slate-600">Your organization documents and official domain were reviewed by The Matrixx admin team.</p><div className="mt-5 space-y-3">{["Organization identity confirmed", "Official email domain confirmed", "Recruitment permissions enabled"].map((item) => <p key={item} className="flex items-center gap-2 text-sm text-slate-700"><CheckCircle2 size={16} className="text-emerald-500" />{item}</p>)}</div><button
  type="button"
  onClick={() => {
    setReviewRequested(true);
    setNotice("Verification review request sent to the Matrixx admin team.");
  }}
  className={`mt-6 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
    reviewRequested
      ? "border border-green-200 bg-green-600 text-white hover:bg-green-700"
      : "border border-slate-200 text-slate-700 hover:border-sky-300 hover:text-sky-700"
  }`}
>
  {reviewRequested ? "✓ Review Requested" : "Request profile review"}
</button></aside>
    </div>}

    {tab === "jobs" && <div className="grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
      <form onSubmit={postJob} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"><p className="text-xs font-semibold uppercase tracking-[.18em] text-sky-600">Create opportunity</p><h3 className="mt-2 text-2xl font-semibold">Post a detailed job or internship</h3><div className="mt-5 space-y-3">{[["title", "Role title", "e.g. Data Engineering Intern"], ["location", "Location / work mode", "e.g. Hyderabad · Hybrid"], ["skills", "Required skills", "Python, SQL, communication"]].map(([key, label, placeholder]) => <label key={key} className="block text-sm font-medium text-slate-700">{label}<input value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} placeholder={placeholder} className="mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-3 text-sm outline-none focus:border-sky-400 focus:ring-4 focus:ring-sky-100" /></label>)}<label className="block text-sm font-medium text-slate-700">Opportunity type<select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-3 text-sm"><option>Internship</option><option>Full-time</option><option>Project</option></select></label><label className="block text-sm font-medium text-slate-700">Description<textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Responsibilities, eligibility, stipend or salary, and selection process" rows={4} className="mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-3 text-sm outline-none focus:border-sky-400 focus:ring-4 focus:ring-sky-100" /></label><label className="block text-sm font-medium text-slate-700">Application deadline<input type="date" value={form.deadline} onChange={(e) => setForm({ ...form, deadline: e.target.value })} className="mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-3 text-sm" /></label></div><button type="submit" className="mt-5 w-full rounded-xl bg-sky-600 px-4 py-3 text-sm font-bold text-white hover:bg-sky-700">Publish opportunity</button></form>
      <div className="space-y-4"><div className="flex items-center justify-between"><div><p className="text-xs font-semibold uppercase tracking-[.18em] text-sky-600">Application tracking</p><h3 className="mt-1 text-xl font-semibold">Your active opportunities</h3></div><span className="text-sm text-slate-500">{jobs.length} posted</span></div>{jobs.map((job) => {
        const recommendations = jobRecommendations[job.id] || [];
        const selectedCandidates = selectedRecruitment[job.id] || [];
        const invitationsSent = selectedCandidates.length > 0;
        return <article key={job.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex flex-col justify-between gap-3 sm:flex-row"><div><div className="flex flex-wrap items-center gap-2"><h4 className="font-semibold text-slate-900">{job.title}</h4><span className="rounded-full bg-sky-50 px-2.5 py-1 text-xs font-semibold text-sky-700">{job.type}</span></div><p className="mt-1 text-sm text-slate-500">{job.location} · Deadline {job.deadline || "Open until filled"}</p></div><span className="h-fit rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">{job.status}</span></div><p className="mt-4 text-sm text-slate-600"><span className="font-semibold text-slate-700">Skills:</span> {job.skills}</p><div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4 text-sm"><span className="flex items-center gap-2 text-slate-500"><Users size={16} />{job.applicants} applicants</span><button type="button" onClick={() => { setTab("recruitment"); setNotice(`Reviewing applicants for ${job.title}.`); }} className="font-semibold text-sky-700 hover:text-sky-900">Review candidates →</button></div><div className="mt-5 rounded-xl bg-slate-50 p-4"><div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><div><p className="flex items-center gap-2 text-sm font-bold text-slate-800"><Sparkles size={16} className="text-sky-600" />Recommended applicants</p><p className="mt-1 text-xs text-slate-500">Ranked separately for this job by required-skill coverage.</p></div><div className="flex flex-wrap gap-2"><button type="button" onClick={() => downloadApplicants(job)} className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 transition hover:border-sky-300 hover:text-sky-700"><Download size={15} />Download CSV</button><button type="button" disabled={invitationsSent || !recommendations.length} onClick={() => selectForRecruitment(job)} className={`inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-xs font-bold transition ${invitationsSent ? "bg-emerald-100 text-emerald-700" : "bg-sky-600 text-white hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500"}`}><MailCheck size={15} />{invitationsSent ? "Invitations sent" : "Select for recruitment"}</button></div></div>{invitationsSent && <p className="mt-3 flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-800"><MailCheck size={15} />Email invitations sent to {selectedCandidates.length} selected candidate{selectedCandidates.length === 1 ? "" : "s"}.</p>}<div className="mt-3 space-y-2">{recommendations.length ? recommendations.map((applicant) => <div key={applicant.id} className="flex flex-col gap-2 rounded-lg border border-slate-200 bg-white px-3 py-3 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-sm font-semibold text-slate-800">{applicant.name}</p><p className="mt-0.5 text-xs text-slate-500">Matched: {applicant.matchedSkills.join(", ")}</p></div><span className="w-fit rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700">{applicant.score}% match</span></div>) : <p className="rounded-lg border border-dashed border-slate-300 bg-white px-3 py-4 text-center text-xs text-slate-500">No applicants currently match this job's required skills.</p>}</div></div></article>;
      })}</div>
    </div>}

    {tab === "content" && <div className="grid gap-6 lg:grid-cols-[.9fr_1.1fr]"><form onSubmit={postContent} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"><p className="text-xs font-semibold uppercase tracking-[.18em] text-sky-600">Company publishing workspace</p><h3 className="mt-2 text-2xl font-semibold">Publish programs and content</h3><p className="mt-2 text-sm leading-6 text-slate-500">Share company-led learning, development and hiring initiatives with the right audience.</p><div className="mt-5 space-y-4"><label className="block text-sm font-medium text-slate-700">Title<input value={contentForm.title} onChange={(event) => setContentForm({ ...contentForm, title: event.target.value })} placeholder="e.g. Cloud Skills Bootcamp" className="mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-3 text-sm outline-none focus:border-sky-400 focus:ring-4 focus:ring-sky-100" /></label><label className="block text-sm font-medium text-slate-700">Content type<select value={contentForm.type} onChange={(event) => setContentForm({ ...contentForm, type: event.target.value })} className="mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-3 text-sm">{contentTypes.map((type) => <option key={type}>{type}</option>)}</select></label><fieldset><legend className="text-sm font-medium text-slate-700">Target users</legend><div className="mt-2 grid gap-2 sm:grid-cols-3">{targetAudiences.map((audience) => <label key={audience} className={`flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-2.5 text-sm font-medium ${contentForm.audiences.includes(audience) ? "border-sky-300 bg-sky-50 text-sky-800" : "border-slate-200 text-slate-600"}`}><input type="checkbox" checked={contentForm.audiences.includes(audience)} onChange={() => setContentForm({ ...contentForm, audiences: contentForm.audiences.includes(audience) ? contentForm.audiences.filter((item) => item !== audience) : [...contentForm.audiences, audience] })} />{audience}</label>)}</div></fieldset><label className="block text-sm font-medium text-slate-700">Program date <span className="font-normal text-slate-400">(optional)</span><input type="date" value={contentForm.date} onChange={(event) => setContentForm({ ...contentForm, date: event.target.value })} className="mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-3 text-sm" /></label><label className="block text-sm font-medium text-slate-700">Description<textarea value={contentForm.description} onChange={(event) => setContentForm({ ...contentForm, description: event.target.value })} placeholder="Describe outcomes, eligibility and how the audience can participate." rows={4} className="mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-3 text-sm outline-none focus:border-sky-400 focus:ring-4 focus:ring-sky-100" /></label></div><button type="submit" className="mt-5 w-full rounded-xl bg-sky-600 px-4 py-3 text-sm font-bold text-white hover:bg-sky-700">Publish from your company</button></form><div><div className="flex items-end justify-between"><div><p className="text-xs font-semibold uppercase tracking-[.18em] text-sky-600">Content management</p><h3 className="mt-1 text-xl font-semibold">Your company posts</h3></div><span className="text-sm text-slate-500">{contentPosts.length} total</span></div><div className="mt-4 space-y-4">{contentPosts.map((post) => <article key={post.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex flex-col justify-between gap-3 sm:flex-row"><div><div className="flex flex-wrap items-center gap-2"><h4 className="font-semibold text-slate-900">{post.title}</h4><span className="rounded-full bg-sky-50 px-2.5 py-1 text-xs font-semibold text-sky-700">{post.type}</span></div><p className="mt-2 text-sm leading-6 text-slate-600">{post.description}</p></div><span className={`h-fit rounded-full px-2.5 py-1 text-xs font-bold ${post.status === "Published" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>{post.status}</span></div><div className="mt-4 flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between"><div className="flex flex-wrap gap-2">{post.audiences.map((audience) => <span key={audience} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">{audience}</span>)}{post.date && <span className="self-center text-xs text-slate-500">Date: {post.date}</span>}</div><button type="button" onClick={() => { toggleContentStatus(post.id); setNotice(`${post.title} is now ${post.status === "Published" ? "saved as a draft" : "published"}.`); }} className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-700 hover:border-sky-300 hover:text-sky-700">{post.status === "Published" ? "Unpublish" : "Publish"}</button></div></article>)}</div></div></div>}

    {tab === "recruitment" && <div className="space-y-6"><div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"><div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center"><div><p className="text-xs font-semibold uppercase tracking-[.18em] text-sky-600">Recruitment control room</p><h3 className="mt-2 text-2xl font-semibold">Assess, interview and hire</h3><p className="mt-2 text-sm text-slate-500">Filter AI-matched candidates and move them through your hiring process.</p></div><div className="flex flex-wrap gap-2"><button type="button" onClick={() => launchAction("Assessment template")} className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white"><ClipboardCheck size={16} />Post assessment</button><button type="button" onClick={() => launchAction("Interview room")} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700"><Video size={16} />Launch interviews</button></div></div></div><div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between"><div className="flex items-center gap-2 text-sm font-semibold text-slate-700"><Filter size={17} />Candidate pipeline <span className="text-slate-400">({filteredApplicants.length})</span></div><div className="flex flex-col gap-2 sm:flex-row"><label className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2"><Search size={16} className="text-slate-400" /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search candidates" className="w-full text-sm outline-none sm:w-52" /></label><select value={stageFilter} onChange={(e) => setStageFilter(e.target.value)} className="rounded-xl border border-slate-200 px-3 py-2 text-sm"><option>All stages</option>{stages.map((stage) => <option key={stage}>{stage}</option>)}</select></div></div><div className="mt-5 grid gap-4 xl:grid-cols-2">{filteredApplicants.map((candidate) => <article key={candidate.id} className="rounded-2xl border border-slate-200 p-5"><div className="flex items-start justify-between gap-3"><div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-full bg-sky-100 text-sky-700"><UserRound size={18} /></span><div><h4 className="font-semibold text-slate-900">{candidate.name}</h4><p className="text-xs text-slate-500">{candidate.role}</p></div></div><span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700">{candidate.match}% match</span></div><p className="mt-4 text-sm text-slate-600">{candidate.skills}</p><div className="mt-4 flex items-center justify-between gap-3"><span className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-600">{candidate.stage}</span><button type="button" onClick={() => advanceApplicant(candidate.id)} className="text-xs font-bold text-sky-700 hover:text-sky-900">Move to next stage →</button></div></article>)}</div></div></div>}
  </section>;
}
