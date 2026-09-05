import { useEffect, useRef, useState } from "react";
import {
  BriefcaseBusiness,
  Camera,
  CheckCircle2,
  FileText,
  GraduationCap,
  Mic,
  Play,
  Sparkles,
  Target,
  X,
} from "lucide-react";
import CareerAndLearning from "./CareerAndLearning";

const journeyCards = [
  { id: "student-profile", title: "Profile", detail: "Complete your career profile", icon: FileText },
  { id: "student-assessment", title: "Assessment", detail: "Skill gap and performance", icon: Target },
  { id: "student-opportunities", title: "Internships & jobs", detail: "Roles matched to you", icon: BriefcaseBusiness },
  { id: "student-recommendations", title: "Career & courses", detail: "Your next learning steps", icon: GraduationCap },
];

const assessmentQuestions = [
  { area: "Practical programming", question: "Which practice best improves the reliability of a web application?", options: ["Writing automated tests", "Avoiding code reviews", "Skipping documentation", "Deploying only once"], answer: 0 },
  { area: "CS core foundations", question: "What is the safest action when a password may have been exposed?", options: ["Share it with a teammate", "Change it and enable MFA", "Keep using it", "Post it in a ticket"], answer: 1 },
  { area: "AI and data fundamentals", question: "A good AI model evaluation should primarily use:", options: ["Only training data", "A held-out test set", "Random guesses", "The model's source code"], answer: 1 },
  { area: "Practical programming", question: "What makes a Git change easier for a team to review?", options: ["Small focused commits", "One huge commit", "No commit messages", "Deleting the branch"], answer: 0 },
  { area: "CS core foundations", question: "Which principle limits the impact of a compromised account?", options: ["Least privilege", "Shared passwords", "Open access", "Disabled logs"], answer: 0 },
  { area: "Practical programming", question: "Which HTTP status code usually indicates that a requested resource was not found?", options: ["200", "301", "404", "500"], answer: 2 },
  { area: "CS core foundations", question: "What is the main purpose of encryption in transit?", options: ["Make files smaller", "Protect data while it travels", "Increase screen brightness", "Replace backups"], answer: 1 },
  { area: "AI and data fundamentals", question: "Before deploying an AI feature, which step helps identify unfair outcomes?", options: ["Testing it with representative data", "Removing all logging", "Using one example", "Skipping evaluation"], answer: 0 },
  { area: "Practical programming", question: "What helps a development team recover quickly from a production issue?", options: ["A documented rollback plan", "Deleting monitoring", "Avoiding alerts", "Hiding errors"], answer: 0 },
  { area: "AI and data fundamentals", question: "Which data structure follows a first-in, first-out order?", options: ["Stack", "Queue", "Tree", "Graph"], answer: 1 },
];

export default function StudentCareerJourney() {
  const [profile, setProfile] = useState({ name: "", resume: "", interest: "", specialization: "", preference: "", skills: "" });
  const [profileSaved, setProfileSaved] = useState(false);
  const [activePage, setActivePage] = useState("student-profile");
  const [assessmentOpen, setAssessmentOpen] = useState(false);
  const [cameraError, setCameraError] = useState("");
  const [mediaReady, setMediaReady] = useState(false);
  const [cameraEnabled, setCameraEnabled] = useState(true);
  const [microphoneEnabled, setMicrophoneEnabled] = useState(true);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [attempts, setAttempts] = useState(0);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const profileComplete = Object.values(profile).every(Boolean);
  const score = result?.score ?? 0;

  const goToPage = (id) => setActivePage(id);
  const updateProfile = (field, value) => setProfile((current) => ({ ...current, [field]: value }));

  const stopMedia = () => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
  };

  const startAssessment = async () => {
    if (!profileComplete) {
      goToPage("student-profile");
      return;
    }
    setCameraError("");
    setMediaReady(false);
    setCameraEnabled(true);
    setMicrophoneEnabled(true);
    setAnswers({});
    setAssessmentOpen(true);
    try {
      if (document.documentElement.requestFullscreen) {
        try {
          await document.documentElement.requestFullscreen();
        } catch {
          // The assessment can still proceed when a browser blocks fullscreen.
        }
      }
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      streamRef.current = stream;
      if (videoRef.current) videoRef.current.srcObject = stream;
      setMediaReady(true);
    } catch {
      setCameraError("Camera and microphone access is required to start this assessment. Allow access in your browser and try again.");
    }
  };

  const closeAssessment = () => {
    stopMedia();
    setMediaReady(false);
    if (document.fullscreenElement) document.exitFullscreen?.();
    setAssessmentOpen(false);
  };

  const submitAssessment = () => {
    const correct = assessmentQuestions.reduce((total, item, index) => total + (answers[index] === item.answer ? 1 : 0), 0);
    const skillScores = ["Practical programming", "CS core foundations", "AI and data fundamentals"].map((area) => {
      const questions = assessmentQuestions.filter((item) => item.area === area);
      const correctAnswers = questions.filter((item) => answers[assessmentQuestions.indexOf(item)] === item.answer).length;
      return { area, score: Math.round((correctAnswers / questions.length) * 100) };
    });
    setResult({ score: Math.round((correct / assessmentQuestions.length) * 100), skillScores, completedAt: new Date().toLocaleDateString() });
    setAttempts((count) => count + 1);
    closeAssessment();
    goToPage("student-assessment");
  };

  const toggleMedia = (kind) => {
    const tracks = kind === "video" ? streamRef.current?.getVideoTracks() : streamRef.current?.getAudioTracks();
    const enabled = !(tracks?.[0]?.enabled ?? true);
    tracks?.forEach((track) => { track.enabled = enabled; });
    if (kind === "video") setCameraEnabled(enabled);
    else setMicrophoneEnabled(enabled);
  };

  useEffect(() => () => stopMedia(), []);

  const skillGaps = result?.skillScores?.map(({ area, score: skillScore }) => [area, 100 - skillScore, skillScore]) ?? [];

  return <section className="mt-6 space-y-6" aria-label="Student career journey">
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {journeyCards.map(({ id, title, detail, icon: Icon }) => <button key={id} type="button" onClick={() => goToPage(id)} className={`group rounded-2xl border bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-sky-300 hover:shadow-md ${activePage === id ? "border-sky-400 ring-2 ring-sky-100" : "border-slate-200"}`}>
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-sky-50 text-sky-600"><Icon size={19} /></span>
        <p className="mt-4 font-semibold text-slate-900">{title}</p><p className="mt-1 text-sm text-slate-500">{detail}</p>
      </button>)}
    </div>

    {activePage === "student-profile" && <section id="student-profile" className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start"><div><p className="text-xs font-semibold uppercase tracking-[.18em] text-sky-600">Step 1–5</p><h2 className="mt-2 text-2xl font-semibold">Build your assessment profile</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">Your interests, specialization and resume skills tailor the assessment and recommendations.</p></div>{profileSaved && <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700"><CheckCircle2 size={16} /> Profile complete</span>}</div>
      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <input value={profile.name} onChange={(e) => updateProfile("name", e.target.value)} placeholder="Full name" className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-sky-500" />
        <label className="cursor-pointer rounded-xl border border-dashed border-slate-300 px-4 py-3 text-sm text-slate-500 hover:border-sky-400">{profile.resume || "Upload resume (PDF/DOC)"}<input type="file" accept=".pdf,.doc,.docx" className="sr-only" onChange={(e) => updateProfile("resume", e.target.files?.[0]?.name || "")} /></label>
        <input value={profile.skills} onChange={(e) => updateProfile("skills", e.target.value)} placeholder="Resume skills (e.g. React, Python)" className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-sky-500" />
        <select value={profile.interest} onChange={(e) => updateProfile("interest", e.target.value)} className="rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-600"><option value="">Area of interest</option><option>Software development</option><option>CS core</option><option>Artificial intelligence</option></select>
        <input value={profile.specialization} onChange={(e) => updateProfile("specialization", e.target.value)} placeholder="Specialization" className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-sky-500" />
        <select value={profile.preference} onChange={(e) => updateProfile("preference", e.target.value)} className="rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-600"><option value="">Career preference</option><option>Internship</option><option>Full-time role</option><option>Higher studies</option></select>
      </div>
      <button type="button" onClick={() => { if (profileComplete) { setProfileSaved(true); goToPage("student-assessment"); } }} disabled={!profileComplete} className="mt-5 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-40">Save and unlock assessment</button>
    </section>}

    {activePage === "student-assessment" && <section id="student-assessment" className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center"><div><p className="text-xs font-semibold uppercase tracking-[.18em] text-sky-600">Step 6–8</p><h2 className="mt-2 text-2xl font-semibold">Skill assessment & gap analysis</h2><p className="mt-2 text-sm text-slate-500">Personalized for {profile.interest || "your chosen area"}. You can take the assessment as often as you need.</p></div><button type="button" onClick={startAssessment} disabled={!profileSaved || !profileComplete} className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-40"><Play size={16} /> Start assessment</button></div>
      {!profileSaved && <p className="mt-5 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800">Complete and save every profile field, including your resume, to unlock the assessment.</p>}
      {result && <div className="mt-6 grid gap-5 xl:grid-cols-[.55fr_1fr_1.35fr]"><div className="rounded-2xl bg-slate-900 p-6 text-white"><p className="text-sm text-slate-300">Latest assessment score</p><p className="mt-2 text-5xl font-semibold">{score}%</p><p className="mt-4 text-sm text-slate-300">Attempt {attempts} · {result.completedAt}</p></div><div className="rounded-2xl bg-slate-50 p-6"><p className="font-semibold">Priority skill gaps</p><div className="mt-4 space-y-4">{skillGaps.map(([skill, gap, skillScore]) => <div key={skill}><div className="flex justify-between gap-3 text-sm"><span>{skill}</span><span className="whitespace-nowrap font-semibold text-sky-700">{gap}% gap</span></div><div className="mt-2 h-2 rounded-full bg-slate-200"><div className="h-2 rounded-full bg-sky-500" style={{ width: `${gap}%` }} /></div><p className="mt-1 text-xs text-slate-500">Assessment score: {skillScore}%</p></div>)}</div></div><div className="rounded-2xl border border-slate-200 bg-white p-6"><div className="flex items-start justify-between gap-3">
        <div><p className="font-semibold">Skill-gap visualization</p>
        <p className="mt-1 text-sm text-slate-500">Latest assessment: skill vs remaining gap.</p></div>
        <div className="flex gap-3 whitespace-nowrap text-xs text-slate-500"><span><i className="mr-1 inline-block h-2 w-2 rounded-sm bg-sky-500" />Skill</span><span><i className="mr-1 inline-block h-2 w-2 rounded-sm bg-indigo-300" />Gap</span></div></div>
        <div className="mt-6 flex h-52 items-end gap-4 border-b border-l border-slate-200 px-4 pt-4">{skillGaps.map(([skill, gap, skillScore]) => <div key={skill} className="flex h-full flex-1 flex-col justify-end">
          <div className="flex flex-1 items-end justify-center gap-2"><div className="relative w-1/3 rounded-t-md bg-sky-500" style={{ height: `${Math.max(skillScore, 3)}%` }}><span className="absolute -top-5 left-1/2 -translate-x-1/2 text-xs font-semibold text-sky-700">{skillScore}</span></div>
          <div className="relative w-1/3 rounded-t-md bg-indigo-300" style={{ height: `${Math.max(gap, 3)}%` }}><span className="absolute -top-5 left-1/2 -translate-x-1/2 text-xs font-semibold text-indigo-700">{gap}</span></div></div>
          <p className="mt-3 min-h-10 text-center text-[11px] leading-4 text-slate-600">{skill}</p></div>)}</div>
      
          </div> 
      
      <button className="p-3 bg-green-400 rounded-2xl shadow-2xs shadow-gray-200" type="button" onClick={() => goToPage("student-recommendations")}>Explore course recommendations for upskilling</button>
      </div>}
    </section>}

    {activePage === "student-opportunities" && <section id="student-opportunities" className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7"><p className="text-xs font-semibold uppercase tracking-[.18em] text-sky-600">Step 9</p><h2 className="mt-2 text-2xl font-semibold">Internship and job recommendations</h2><div className="mt-5 grid gap-4 md:grid-cols-3">{["Frontend development intern", "Security operations trainee", "Junior AI engineering intern"].map((role) => <div key={role} className="rounded-2xl bg-slate-50 p-5"><BriefcaseBusiness className="text-sky-600" size={20} /><p className="mt-4 font-semibold">{role}</p><p className="mt-2 text-sm text-slate-500">Matched to your profile and assessment insights.</p></div>)}</div></section>}
    {activePage === "student-recommendations" && <CareerAndLearning profile={profile} result={result} onViewAssessment={() => goToPage("student-assessment")} />}

    {assessmentOpen && <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950 p-4 text-white sm:p-8"><div className="mx-auto max-w-5xl"><div className="flex items-center justify-between"><div><p className="text-sm text-sky-300">Full-screen assessment</p><h2 className="text-2xl font-semibold">{profile.interest} skill assessment</h2></div><button type="button" onClick={closeAssessment} className="rounded-xl bg-white/10 p-3 hover:bg-white/20" aria-label="Close assessment"><X /></button></div><div className="mt-6 grid gap-6 lg:grid-cols-[.65fr_1.35fr]"><aside className="rounded-2xl bg-white/10 p-5"><div className="relative aspect-video overflow-hidden rounded-xl bg-slate-800"><video ref={videoRef} autoPlay muted playsInline className="h-full w-full object-cover" />{!mediaReady && <div className="absolute inset-0 grid place-items-center text-slate-400"><Camera /></div>}</div><div className="mt-4 flex gap-3"><button type="button" onClick={() => toggleMedia("video")} className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-sm hover:bg-white/20"><Camera size={15} /> Camera {cameraEnabled ? "on" : "off"}</button><button type="button" onClick={() => toggleMedia("audio")} className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-sm hover:bg-white/20"><Mic size={15} /> Mic {microphoneEnabled ? "on" : "off"}</button></div>{cameraError && <p className="mt-4 text-sm leading-6 text-rose-300">{cameraError}</p>}</aside><main className="space-y-5">{assessmentQuestions.map((item, index) => <div key={item.question} className="rounded-2xl bg-white p-5 text-slate-900"><p className="font-medium">{index + 1}. {item.question}</p><div className="mt-4 grid gap-2">{item.options.map((option, optionIndex) => <label key={option} className={`cursor-pointer rounded-xl border px-4 py-3 text-sm ${answers[index] === optionIndex ? "border-sky-500 bg-sky-50" : "border-slate-200"}`}><input type="radio" name={`question-${index}`} className="mr-3" checked={answers[index] === optionIndex} onChange={() => setAnswers((current) => ({ ...current, [index]: optionIndex }))} />{option}</label>)}</div></div>)}<button type="button" disabled={!mediaReady} onClick={submitAssessment} className="w-full rounded-xl bg-sky-500 px-5 py-3 font-semibold text-white hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-40">Submit assessment</button></main></div></div></div>}
  </section>;
}
