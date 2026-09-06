import CompanyProfile from "./CompanyProfile";
import { useMemo, useState } from "react";
import { BriefcaseBusiness, CheckCircle2, ClipboardCheck, Filter, Search, ShieldCheck, UserRound, Users, Video } from "lucide-react";

const initialJobs = [
  { id: "ai-intern", title: "AI / ML Engineering Intern", type: "Internship", location: "Bengaluru · Hybrid", skills: "Python, machine learning, SQL", applicants: 12, status: "Active" },
  { id: "frontend-role", title: "Frontend Developer", type: "Full-time", location: "Remote · India", skills: "React, JavaScript, accessibility", applicants: 8, status: "Active" },
];

const initialApplicants = [
  { id: "a1", name: "Aarav Mehta", role: "AI / ML Engineering Intern", match: 94, stage: "Assessment pending", skills: "Python · ML · SQL" },
  { id: "a2", name: "Diya Nair", role: "AI / ML Engineering Intern", match: 89, stage: "Interview scheduled", skills: "Python · TensorFlow · APIs" },
  { id: "a3", name: "Kabir Shah", role: "Frontend Developer", match: 86, stage: "Shortlisted", skills: "React · TypeScript · CSS" },
];

const stages = ["Assessment pending", "Shortlisted", "Interview scheduled", "Offer" ];

export default function IndustryDashboard() {
  const [tab, setTab] = useState("profile");
  const [jobs, setJobs] = useState(initialJobs);
  const [applicants, setApplicants] = useState(initialApplicants);
  const [query, setQuery] = useState("");
  const [stageFilter, setStageFilter] = useState("All stages");
  const [notice, setNotice] = useState("");
  const [form, setForm] = useState({ title: "", type: "Internship", location: "", skills: "", description: "", deadline: "" });
    const [reviewRequested, setReviewRequested] = useState(false);

  const filteredApplicants = useMemo(() => applicants.filter((item) => {
    const matchesQuery = `${item.name} ${item.role} ${item.skills}`.toLowerCase().includes(query.toLowerCase());
    return matchesQuery && (stageFilter === "All stages" || item.stage === stageFilter);
  }), [applicants, query, stageFilter]);

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

  return <section className="mt-6 space-y-6">
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
      <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
        <div><p className="text-xs font-semibold uppercase tracking-[.18em] text-sky-600">Employer workspace</p><h2 className="mt-2 text-2xl font-semibold">From skill demand to better candidates.</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">Define demand, match talent, run assessments and keep developing your hiring pipeline.</p></div>
        <div className="flex items-center gap-3 rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700"><ShieldCheck size={20} />Verified by Matrixx admin</div>
      </div>
      <div className="mt-7 grid gap-2 md:grid-cols-5">{["Define skill demand", "Post opportunities", "AI skill matching", "Assess & interview", "Hire & develop"].map((step, index) => <div key={step} className="flex items-center gap-2"><span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-sky-100 text-xs font-bold text-sky-700">{index + 1}</span><span className="text-xs font-medium text-slate-600">{step}</span>{index < 4 && <span className="hidden h-px flex-1 bg-slate-200 md:block" />}</div>)}</div>
    </div>

    <div className="flex flex-wrap gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">{[["profile", "Company profile", UserRound], ["jobs", "Jobs & applicants", BriefcaseBusiness], ["recruitment", "Recruitment", ClipboardCheck]].map(([id, label, Icon]) => <button key={id} type="button" onClick={() => setTab(id)} className={`inline-flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition ${tab === id ? "bg-slate-900 text-white" : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"}`}><Icon size={17} />{label}</button>)}</div>

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
      <div className="space-y-4"><div className="flex items-center justify-between"><div><p className="text-xs font-semibold uppercase tracking-[.18em] text-sky-600">Application tracking</p><h3 className="mt-1 text-xl font-semibold">Your active opportunities</h3></div><span className="text-sm text-slate-500">{jobs.length} posted</span></div>{jobs.map((job) => <article key={job.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex flex-col justify-between gap-3 sm:flex-row"><div><div className="flex flex-wrap items-center gap-2"><h4 className="font-semibold text-slate-900">{job.title}</h4><span className="rounded-full bg-sky-50 px-2.5 py-1 text-xs font-semibold text-sky-700">{job.type}</span></div><p className="mt-1 text-sm text-slate-500">{job.location} · Deadline {job.deadline || "Open until filled"}</p></div><span className="h-fit rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">{job.status}</span></div><p className="mt-4 text-sm text-slate-600"><span className="font-semibold text-slate-700">Skills:</span> {job.skills}</p><div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4 text-sm"><span className="flex items-center gap-2 text-slate-500"><Users size={16} />{job.applicants} applicants</span><button type="button" onClick={() => { setTab("recruitment"); setNotice(`Reviewing applicants for ${job.title}.`); }} className="font-semibold text-sky-700 hover:text-sky-900">Review candidates →</button></div></article>)}</div>
    </div>}

    {tab === "recruitment" && <div className="space-y-6"><div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"><div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center"><div><p className="text-xs font-semibold uppercase tracking-[.18em] text-sky-600">Recruitment control room</p><h3 className="mt-2 text-2xl font-semibold">Assess, interview and hire</h3><p className="mt-2 text-sm text-slate-500">Filter AI-matched candidates and move them through your hiring process.</p></div><div className="flex flex-wrap gap-2"><button type="button" onClick={() => launchAction("Assessment template")} className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white"><ClipboardCheck size={16} />Post assessment</button><button type="button" onClick={() => launchAction("Interview room")} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700"><Video size={16} />Launch interviews</button></div></div></div><div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between"><div className="flex items-center gap-2 text-sm font-semibold text-slate-700"><Filter size={17} />Candidate pipeline <span className="text-slate-400">({filteredApplicants.length})</span></div><div className="flex flex-col gap-2 sm:flex-row"><label className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2"><Search size={16} className="text-slate-400" /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search candidates" className="w-full text-sm outline-none sm:w-52" /></label><select value={stageFilter} onChange={(e) => setStageFilter(e.target.value)} className="rounded-xl border border-slate-200 px-3 py-2 text-sm"><option>All stages</option>{stages.map((stage) => <option key={stage}>{stage}</option>)}</select></div></div><div className="mt-5 grid gap-4 xl:grid-cols-2">{filteredApplicants.map((candidate) => <article key={candidate.id} className="rounded-2xl border border-slate-200 p-5"><div className="flex items-start justify-between gap-3"><div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-full bg-sky-100 text-sky-700"><UserRound size={18} /></span><div><h4 className="font-semibold text-slate-900">{candidate.name}</h4><p className="text-xs text-slate-500">{candidate.role}</p></div></div><span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700">{candidate.match}% match</span></div><p className="mt-4 text-sm text-slate-600">{candidate.skills}</p><div className="mt-4 flex items-center justify-between gap-3"><span className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-600">{candidate.stage}</span><button type="button" onClick={() => advanceApplicant(candidate.id)} className="text-xs font-bold text-sky-700 hover:text-sky-900">Move to next stage →</button></div></article>)}</div></div></div>}
  </section>;
}
