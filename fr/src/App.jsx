import logo from "./assets/logo.png";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Particles from "./components/Particles";
import SpiralParticles from "./components/SpiralParticles";
import SoftAurora from "./components/SoftAurora";

import {
  ArrowRight,
  ArrowUpRight,
  Award,
  BriefcaseBusiness,
  Building2,
  Check,
  CircleDot,
  FileCheck2,
  GraduationCap,
  Handshake,
  Layers3,
  LineChart,
  MapPin,
  Menu,
  Network,
  Rocket,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  X,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*                             Utility components                             */
/* -------------------------------------------------------------------------- */

const cx = (...classes) => classes.filter(Boolean).join(" ");

function SectionLabel({ children }) {
  return (
    <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-sky-700">
      <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-sky-500 to-violet-500 shadow-[0_0_12px_rgba(99,102,241,0.35)]" />
      {children}
    </div>
  );
}

function GlassPanel({ className = "", children }) {
  return (
    <div
      className={cx(
        "gradient-border border border-sky-100/80 bg-white/80 shadow-[0_25px_80px_rgba(59,130,246,0.10)] backdrop-blur-xl",
        className
      )}
    >
      {children}
    </div>
  );
}

function MagneticButton({ children, className = "", onClick, variant = "primary" }) {
  const ref = useRef(null);

  const handleMove = (event) => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;

    el.style.transform = `translate(${x * 0.06}px, ${y * 0.06}px)`;
  };

  const reset = () => {
    if (ref.current) {
      ref.current.style.transform = "translate(0, 0)";
    }
  };

  return (
    <button
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      onClick={onClick}
      className={cx(
        "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-5 py-3 text-sm font-semibold transition-all duration-300",
        variant === "primary"
          ? "bg-gradient-to-r from-sky-200 to-indigo-300 border-green-200 border-2 text-slate-900 shadow-[0_10px_30px_rgba(59,130,246,0.22)] hover:from-sky-600 hover:to-indigo-600 hover:shadow-[0_14px_38px_rgba(99,102,241,0.28)]"
          : "gradient-border border border-sky-200 bg-white text-slate-700 shadow-sm hover:bg-indigo-50 hover:text-indigo-700",
        className
      )}
    >
      <span className="relative z-10">{children}</span>
      {variant === "primary" && (
        <span className="absolute inset-0 translate-y-full bg-white/45 transition-transform duration-500 group-hover:translate-y-0" />
      )}
    </button>
  );
}

function TiltCard({ children, className = "", intensity = 10 }) {
  const ref = useRef(null);

  const handleMove = (event) => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;

    const rotateY = (px - 0.5) * intensity;
    const rotateX = (0.5 - py) * intensity;

    el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
  };

  const reset = () => {
    if (ref.current) {
      ref.current.style.transform =
        "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)";
    }
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className={cx(
        "transition-transform duration-300 will-change-transform",
        className
      )}
    >
      {children}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                          Interactive hero network                          */
/* -------------------------------------------------------------------------- */

const orbitNodes = [
  { x: 50, y: 18, label: "Skills", color: "cyan" },
  { x: 78, y: 35, label: "Jobs", color: "blue" },
  { x: 82, y: 68, label: "Industry", color: "violet" },
  { x: 57, y: 86, label: "Projects", color: "cyan" },
  { x: 27, y: 74, label: "Learning", color: "green" },
  { x: 19, y: 38, label: "Academia", color: "amber" },
];

function colorClass(color) {
  const map = {
    cyan: "border-sky-200 bg-sky-50 text-sky-700",
    blue: "border-blue-200 bg-blue-50 text-blue-700",
    violet: "border-violet-200 bg-violet-50 text-violet-700",
    green: "border-emerald-200 bg-emerald-50 text-emerald-700",
    amber: "border-amber-200 bg-amber-50 text-amber-700",
  };
  return map[color];
}

function SkillOrbit() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[560px]">
      <div className="absolute inset-[8%] rounded-full border border-sky-200/70" />
      <div className="absolute inset-[18%] rounded-full border border-slate-200" />
      <div className="absolute inset-[30%] rounded-full border border-slate-200" />

      <div className="absolute left-1/2 top-1/2 z-20 flex h-36 w-36 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[2rem] border border-sky-200 bg-white/90 p-5 text-center shadow-[0_0_80px_rgba(59,130,246,0.12)] backdrop-blur-xl">
        <div>
          <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-50 text-sky-600">
            <Network size={22} />
          </div>
          <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Portal Core</p>
          <p className="mt-1 text-lg font-semibold text-slate-900">Skill Graph</p>
        </div>
      </div>

      {orbitNodes.map((node, index) => (
        <div
          key={node.label}
          className="absolute z-20 -translate-x-1/2 -translate-y-1/2 animate-[float_5s_ease-in-out_infinite]"
          style={{
            left: `${node.x}%`,
            top: `${node.y}%`,
            animationDelay: `${index * 0.35}s`,
          }}
        >
          <div
            className={cx(
              "rounded-2xl border px-4 py-2.5 text-sm font-medium shadow-xl backdrop-blur-xl",
              colorClass(node.color)
            )}
          >
            {node.label}
          </div>
        </div>
      ))}

      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full opacity-70"
        fill="none"
      >
        {orbitNodes.map((node) => (
          <line
            key={`line-${node.label}`}
            x1="50"
            y1="50"
            x2={node.x}
            y2={node.y}
            stroke="rgba(99,102,241,0.22)"
            strokeWidth="0.25"
            strokeDasharray="1.5 1.5"
          />
        ))}
      </svg>

      <div className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-50 blur-3xl" />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                              Main application                              */
/* -------------------------------------------------------------------------- */

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeRole, setActiveRole] = useState("Students");

  const roleData = useMemo(
    () => ({
      Students: {
        icon: GraduationCap,
        accent: "cyan",
        headline: "Know what to learn before you apply.",
        text:
          "Assess your technical and soft skills, discover gaps, build a verified portfolio, and get matched to relevant learning, internships and entry-level opportunities.",
        items: [
          "Skill assessment & profiling",
          "Industry-aligned skill gap analysis",
          "Internship and job matching",
          "Learning & certification recommendations",
          "Verified digital portfolio",
          "Application and progress tracking",
        ],
      },
      Academicians: {
        icon: Users,
        accent: "violet",
        headline: "Bring industry context into academia.",
        text:
          "Find faculty internships, industrial training, FDPs, consultancy opportunities, live projects and collaborative research pathways in one place.",
        items: [
          "Faculty internship discovery",
          "Industrial training opportunities",
          "FDP and mentorship programs",
          "Consultancy and research collaboration",
          "Guest lectures & workshops",
          "Industry project discovery",
        ],
      },
      Industries: {
        icon: Building2,
        accent: "blue",
        headline: "Find people by capability, not only by resume.",
        text:
          "Publish internships, projects, apprenticeships, training programs and jobs with explicit skill requirements and connect with candidates who match them.",
        items: [
          "Post internships and jobs",
          "Define required skill sets",
          "Candidate compatibility matching",
          "Recruitment and application tracking",
          "Training and certification programs",
          "Mentorship and innovation challenges",
        ],
      },
      Institutions: {
        icon: LineChart,
        accent: "emerald",
        headline: "See the employability picture across the institution.",
        text:
          "Monitor skill development, internship participation, placement readiness, recruitment outcomes and skill-demand trends using analytics-driven dashboards.",
        items: [
          "Student skill development analytics",
          "Internship participation tracking",
          "Placement readiness monitoring",
          "Recruitment outcome dashboards",
          "Industry demand trend analysis",
          "Institution-level reporting",
        ],
      },
    }),
    []
  );

  const active = roleData[activeRole];
  const ActiveIcon = active.icon;

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
          }
        });
      },
      { threshold: 0.12 }
    );

    const sections = document.querySelectorAll(".reveal");
    sections.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const navItems = [
    ["Vision", "#vision"],
    ["Platform", "#platform"],
    ["Roles", "#roles"],
    ["Workflow", "#workflow"],
    ["Impact", "#impact"],
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f6faff] text-slate-900">
      {/* ------------------------------------------------------------------ */}
      {/*                         Global background                         */}
      {/* ------------------------------------------------------------------ */}
      <div className="pointer-events-none fixed inset-0 -z-20 bg-[radial-gradient(circle_at_10%_10%,rgba(56,189,248,0.16),transparent_30%),radial-gradient(circle_at_90%_20%,rgba(139,92,246,0.14),transparent_32%),radial-gradient(circle_at_50%_80%,rgba(16,185,129,0.08),transparent_30%)]" />
      <div className="pointer-events-none fixed inset-0 -z-10 opacity-[0.45] [background-image:linear-gradient(rgba(99,102,241,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.055)_1px,transparent_1px)] [background-size:42px_42px]" />

      {/* ------------------------------------------------------------------ */}
      {/*                               Navbar                               */}
      {/* ------------------------------------------------------------------ */}
      <header className="sticky top-0 z-50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
          <a href="#top" className="group flex items-center gap-3">
            <div className="relative flex h-16 w-14 items-center justify-center  bg-sky-50">
              <img src={logo} alt="The Matrixx" />
            </div>
            <div>
              <p className="text-sm font-bold tracking-[0.08em] text-slate-900">
                The <span className="text-sky-600">Matrixx</span>
              </p>
              <p className="text-[10px] uppercase tracking-[0.24em] text-slate-900/35">
                Academia × Industry
              </p>
            </div>
          </a>

          <nav className="hidden items-center gap-7 lg:flex">
            {navItems.map(([label, href]) => (
              <a
                key={label}
                href={href}
                className="text-sm text-slate-900/55 transition hover:text-slate-900"
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <MagneticButton variant="ghost">Sign in</MagneticButton>
            <MagneticButton>
              Explore Portal
              <ArrowRight size={16} />
            </MagneticButton>
          </div>

          <button
            className="rounded-xl border border-slate-200 bg-slate-50 p-2.5 lg:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-sky-100 bg-white/95 px-5 py-5 lg:hidden">
            <div className="flex flex-col gap-4">
              {navItems.map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="text-sm text-slate-900/70"
                >
                  {label}
                </a>
              ))}
              <div className="mt-2 flex gap-3">
                <MagneticButton variant="ghost">Sign in</MagneticButton>
                <MagneticButton>Open Portal</MagneticButton>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* ------------------------------------------------------------------ */}
      {/*                                Hero                                */}
      {/* ------------------------------------------------------------------ */}
      <section id="top" className="relative isolate overflow-hidden bg-gradient-to-br from-cyan-50/80 via-white/40 to-violet-100/60">
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-45">
          <SoftAurora
            className="h-full w-full"
            speed={0.6}
            scale={1.8}
            brightness={1.2}
            color1="#f8fafc"
            color2="#e100ff"
            noiseFrequency={2.6}
            noiseAmplitude={1.15}
            bandHeight={0.52}
            bandSpread={1.18}
            octaveDecay={0.12}
            layerOffset={1.4}
            colorSpeed={1.1}
            mouseInfluence={0.22}
            enableMouseInteraction={true}
            lightMode={false}
          />
        </div>
        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-5 pb-24 pt-20 md:px-8 md:pt-10 lg:grid-cols-[1.06fr_0.94fr] lg:pb-32">
          <div className="reveal max-w-3xl">
            <SectionLabel>ACADEMIA × INDUSTRY COLLABORATION</SectionLabel>

            <h1 className="text-balance text-4xl font-semibold leading-[0.98] tracking-[-0.055em] sm:text-6xl lg:text-[5rem]">
              Turn the
              <span className="bg-gradient-to-r from-sky-500 to-violet-500 bg-clip-text text-transparent"> skills gap </span>
              into a visible path.
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-8 text-slate-900/58 sm:text-lg">
              One portal connecting students, academicians, industries and
              institutions around the complete journey — from skill assessment
              and learning to internships, projects and placements.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <MagneticButton>
                Start with Skill Assessment
                <ArrowRight size={17} />
              </MagneticButton>
              <MagneticButton variant="ghost">
                See how the portal works
                <ArrowUpRight size={17} />
              </MagneticButton>
            </div>

            <div className="mt-10 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                ["01", "Assess"],
                ["02", "Map"],
                ["03", "Experience"],
                ["04", "Place"],
              ].map(([num, label]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-sky-100 bg-white/75 p-4"
                >
                  <p className="text-[10px] tracking-[0.2em] text-sky-600/65">
                    {num}
                  </p>
                  <p className="mt-1 text-sm font-medium text-slate-900/85">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal lg:justify-self-end">
            <GlassPanel className="relative overflow-hidden rounded-[2rem] p-10">
              <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-sky-100 blur-3xl" />
              <div className="absolute -bottom-16 -left-16 h-44 w-44 rounded-full bg-violet-200/40 blur-3xl" />
              <div className="relative mb-2 flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.22em] text-slate-900/35">
                    LIVE PORTAL MODEL
                  </p>
                  <p className="mt-1 text-lg font-semibold">
                    From capability to opportunity
                  </p>
                </div>
                <div className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[10px] uppercase tracking-[0.15em] text-emerald-300">
                  Connected
                </div>
              </div>

              <SkillOrbit />

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
                  <p className="text-xs text-slate-900/35">Candidate fit</p>
                  <p className="mt-1 text-2xl font-semibold">87%</p>
                  <p className="mt-1 text-xs text-emerald-300">+12% this month</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
                  <p className="text-xs text-slate-900/35">Skill coverage</p>
                  <p className="mt-1 text-2xl font-semibold">42 / 48</p>
                  <p className="mt-1 text-xs text-sky-600">Industry mapped</p>
                </div>
              </div>
            </GlassPanel>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/*                              Problem                                */}
      {/* ------------------------------------------------------------------ */}
      <section id="vision" className="border-y border-cyan-200/70 bg-gradient-to-br from-cyan-100/70 via-white/70 to-amber-50/80">
        <div className="mx-auto max-w-7xl px-5 py-24 md:px-8">
          <div className="reveal grid gap-12 lg:grid-cols-[0.82fr_1.18fr]">
            <SpiralParticles className="pointer-events-none absolute  opacity-80" />
            <div>
              <SectionLabel>The gap</SectionLabel>
              <h2 className="max-w-xl text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                Three groups.
                <span className="text-slate-900/40"> One disconnected system.</span>
              </h2>
              <p className="mt-5 max-w-lg text-base leading-8 text-slate-900/52">
                Students need clarity. Industries need relevant capabilities.
                Academicians need industry exposure. The portal is designed to
                make the relationships between all three visible and actionable.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {[
                {
                  icon: GraduationCap,
                  title: "Students",
                  text: "Unsure which skills matter most for the career they want.",
                },
                {
                  icon: Building2,
                  title: "Industries",
                  text: "Spend time finding candidates whose capabilities match actual needs.",
                },
                {
                  icon: Users,
                  title: "Academia",
                  text: "Has limited visibility into practical industry pathways and collaboration.",
                },
              ].map((item) => (
                <TiltCard key={item.title}>
                  <GlassPanel className="h-full rounded-3xl p-6">
                    <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50">
                      <item.icon size={20} className="text-sky-600" />
                    </div>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-900/48">
                      {item.text}
                    </p>
                  </GlassPanel>
                </TiltCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/*                              Platform                               */}
      {/* ------------------------------------------------------------------ */}
      <section id="platform" className="bg-gradient-to-r from-violet-100 to-emerald-50/60">
        
        <div className="mx-auto max-w-7xl px-5 py-10 md:px-8">

          <div className="reveal mb-4 max-w-3xl">
            <SectionLabel>Platform architecture</SectionLabel>
            <h2 className="text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
              Not another job board.
              <span className="bg-gradient-to-r from-sky-500 to-violet-500 bg-clip-text text-transparent"> A career capability system.</span>
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-900/50">
              Every major feature is tied to the complete lifecycle of skill
              development, internships and placements.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-12">
            <TiltCard className="lg:col-span-7">
              <GlassPanel className="h-full rounded-[2rem] p-7">
                
                <div className="flex items-start justify-between">
                  <div>

                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 text-sky-600">
                      <Target size={22} />
                    </div>
                    <h3 className="mt-5 text-2xl font-semibold">
                      Skill Assessment → Skill Profile
                    </h3>
                    <p className="mt-3 max-w-xl text-sm leading-7 text-slate-900/50">
                      Questionnaires and aptitude tests produce a visible
                      technical + soft-skill profile with strengths and gaps
                      compared against current industry requirements.
                    </p>
                  </div>

                  <span className="rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs text-sky-600">
                    Core
                  </span>
                </div>

                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  {[
                    ["Technical", "Python, SQL, React, ML"],
                    ["Soft skills", "Communication, teamwork"],
                    ["Gap score", "8 skills to strengthen"],
                  ].map(([k, v]) => (
                    <div
                      key={k}
                      className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4"
                    >
                      <p className="text-xs text-slate-900/32">{k}</p>
                      <p className="mt-2 text-sm text-slate-900/82">{v}</p>
                    </div>
                  ))}
                </div>
              </GlassPanel>
            </TiltCard>

            <TiltCard className="lg:col-span-5">
              <GlassPanel className="h-full rounded-[2rem] p-7">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50 text-violet-600">
                  <Sparkles size={22} />
                </div>
                <h3 className="mt-5 text-2xl font-semibold">
                  Personalized Learning
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-900/50">
                  Connect identified gaps to relevant training, certifications,
                  workshops, mentorship and career guidance.
                </p>

                <div className="mt-7 space-y-3">
                  {[
                    ["Cloud Fundamentals", "92% relevant"],
                    ["Applied ML", "88% relevant"],
                    ["Data Visualization", "81% relevant"],
                  ].map(([name, score]) => (
                    <div
                      key={name}
                      className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-sm text-slate-900/78">{name}</span>
                        <span className="text-xs text-sky-600">{score}</span>
                      </div>
                      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-100">
                        <div className="h-full w-[84%] rounded-full bg-sky-500" />
                      </div>
                    </div>
                  ))}
                </div>
              </GlassPanel>
            </TiltCard>

            <TiltCard className="lg:col-span-4">
              <GlassPanel className="h-full rounded-[2rem] p-7">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                  <BriefcaseBusiness size={22} />
                </div>
                <h3 className="mt-5 text-xl font-semibold">
                  Internship & Job Matching
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-900/50">
                  Match candidates to roles using skills, career interests and
                  eligibility rather than relying only on generic keywords.
                </p>
              </GlassPanel>
            </TiltCard>

            <TiltCard className="lg:col-span-4">
              <GlassPanel className="h-full rounded-[2rem] p-7">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                  <FileCheck2 size={22} />
                </div>
                <h3 className="mt-5 text-xl font-semibold">
                  Verified Digital Portfolio
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-900/50">
                  Keep verified skills, certifications, projects, internships
                  and achievements together as a live employability record.
                </p>
              </GlassPanel>
            </TiltCard>

            <TiltCard className="lg:col-span-4">
              <GlassPanel className="h-full rounded-[2rem] p-7">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
                  <Handshake size={22} />
                </div>
                <h3 className="mt-5 text-xl font-semibold">
                  Collaboration Layer
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-900/50">
                  Mentorships, guest lectures, workshops, innovation challenges,
                  live projects and research partnerships.
                </p>
              </GlassPanel>
            </TiltCard>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/*                                Roles                                */}
      {/* ------------------------------------------------------------------ */}
      <section
        id="roles"
        className="relative overflow-hidden border-y border-violet-200/70 bg-gradient-to-br from-violet-100/60 via-white/75 to-sky-100/70"
      >
        
        <div className="mx-auto max-w-7xl px-5 py-24 md:px-8">
          <div className="reveal mb-12 relative z-10">
            <SectionLabel>One platform, different views</SectionLabel>
            <h2 className="max-w-3xl text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
              The dashboard changes with the role.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-900/50">
              Each participant sees the information and actions that matter to
              their part of the ecosystem.
            </p>
          </div>

          <div className="reveal grid gap-6 lg:grid-cols-[0.42fr_0.58fr]">
            <div className="rounded-[2rem] border border-slate-200 bg-white/75 p-3">
              {Object.keys(roleData).map((role) => {
                const Icon = roleData[role].icon;
                const isActive = role === activeRole;

                return (
                  <button
                    key={role}
                    onClick={() => setActiveRole(role)}
                    className={cx(
                      "group mb-2 flex w-full items-center justify-between rounded-2xl px-5 py-4 text-left transition-all",
                      isActive
                        ? "bg-gradient-to-r from-sky-50 to-indigo-50 shadow-md"
                        : "hover:bg-sky-50/70"
                    )}
                  >
                    <span className="flex items-center gap-3">
                      <span
                        className={cx(
                          "flex h-10 w-10 items-center justify-center rounded-xl border",
                          isActive
                            ? "border-sky-200 bg-sky-50 text-sky-600"
                            : "border-slate-200 bg-slate-50 text-slate-900/42"
                        )}
                      >
                        <Icon size={18} />
                      </span>
                      <span>
                        <span className="block text-sm font-semibold">
                          {role}
                        </span>
                        <span className="block text-xs text-slate-900/35">
                          Role dashboard
                        </span>
                      </span>
                    </span>
                    <ArrowRight
                      size={17}
                      className={cx(
                        "transition-transform",
                        isActive
                          ? "translate-x-0 text-sky-600"
                          : "-translate-x-1 text-slate-900/20"
                      )}
                    />
                  </button>
                );
              })}
            </div>

            <GlassPanel className="rounded-[2rem] p-7 md:p-9">
              <div className="flex flex-col gap-7">
                <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
                  <div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 text-sky-600">
                      <ActiveIcon size={22} />
                    </div>
                    <h3 className="mt-5 max-w-2xl text-3xl font-semibold tracking-[-0.03em]">
                      {active.headline}
                    </h3>
                    <p className="mt-4 max-w-2xl leading-8 text-slate-900/50">
                      {active.text}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3">
                    <p className="text-[10px] uppercase tracking-[0.18em] text-slate-900/30">
                      Access
                    </p>
                    <p className="mt-1 text-sm text-emerald-300">
                      Role-based
                    </p>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {active.items.map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50/80 p-4"
                    >
                      <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sky-50 text-sky-600">
                        <Check size={13} />
                      </div>
                      <span className="text-sm leading-6 text-slate-900/72">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </GlassPanel>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/*                              Workflow                               */}
      {/* ------------------------------------------------------------------ */}
      <section id="workflow" className="bg-gradient-to-b from-amber-50/70 via-white/80 to-cyan-50/70">
        <div className="mx-auto max-w-7xl px-5 py-24 md:px-8">
          <div className="reveal max-w-3xl">
            <SectionLabel>End-to-end workflow</SectionLabel>
            <h2 className="text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
              A system that moves with the student.
            </h2>
          </div>

          <div className="reveal mt-14 grid gap-4 md:grid-cols-5">
            {[
              {
                n: "01",
                icon: Search,
                title: "Assess",
                text: "Questionnaires, aptitude tests and skill signals.",
              },
              {
                n: "02",
                icon: Layers3,
                title: "Profile",
                text: "Technical + soft-skill map and gap identification.",
              },
              {
                n: "03",
                icon: Sparkles,
                title: "Develop",
                text: "Learning, certifications, mentorship and training.",
              },
              {
                n: "04",
                icon: BriefcaseBusiness,
                title: "Experience",
                text: "Internships, live projects, apprenticeships and workshops.",
              },
              {
                n: "05",
                icon: Rocket,
                title: "Place",
                text: "Skill-matched opportunities and recruitment tracking.",
              },
            ].map((item, index) => {
              const Icon = item.icon;

              return (
                <div key={item.n} className="relative">
                  <TiltCard>
                    <GlassPanel className="h-full rounded-3xl p-5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold tracking-[0.16em] text-sky-600/60">
                          {item.n}
                        </span>
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-slate-50">
                          <Icon size={16} className="text-sky-600" />
                        </div>
                      </div>
                      <h3 className="mt-7 text-lg font-semibold">{item.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-slate-500">
                        {item.text}
                      </p>
                    </GlassPanel>
                  </TiltCard>

                  {index < 4 && (
                    <div className="pointer-events-none absolute right-[-16px] top-1/2 hidden h-px w-8 bg-gradient-to-r from-sky-300/50 to-transparent md:block" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/*                               Metrics                               */}
      {/* ------------------------------------------------------------------ */}
      <section
        id="impact"
        className="border-y border-emerald-200/70 bg-gradient-to-br from-emerald-100/65 via-cyan-50/70 to-violet-100/70"
      >
        <div className="mx-auto max-w-7xl px-5 py-24 md:px-8">

          <div className="reveal grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <SectionLabel>Institutional visibility</SectionLabel>
              <h2 className="text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                From individual progress to ecosystem intelligence.
              </h2>
              <p className="mt-5 max-w-xl leading-8 text-slate-900/50">
                Dashboards and analytics allow institutions and industries to
                understand skill development, placement readiness, recruitment
                outcomes and skill-demand trends.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  icon: Award,
                  value: "Verified",
                  title: "Digital portfolio",
                  text: "Skills, certifications, projects and achievements.",
                },
                {
                  icon: LineChart,
                  value: "Live",
                  title: "Analytics",
                  text: "Institution and industry level reporting.",
                },
                {
                  icon: ShieldCheck,
                  value: "Secure",
                  title: "Document management",
                  text: "Resumes, certificates, reports and academic records.",
                },
                {
                  icon: MapPin,
                  value: "Connected",
                  title: "Opportunity discovery",
                  text: "Internships, jobs, training and collaboration programs.",
                },
              ].map((item) => (
                <TiltCard key={item.title}>
                  <GlassPanel className="rounded-3xl p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-50">
                        <item.icon size={19} className="text-sky-600" />
                      </div>
                      <span className="text-xs font-medium uppercase tracking-[0.16em] text-slate-900/25">
                        {item.value}
                      </span>
                    </div>
                    <h3 className="mt-6 text-lg font-semibold">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-500">
                      {item.text}
                    </p>
                  </GlassPanel>
                </TiltCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/*                             Final CTA                               */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative overflow-hidden bg-gradient-to-r from-sky-100/60 via-violet-100/65 to-amber-100/60">
        <Particles className="pointer-events-none absolute inset-0 -z-10 opacity-80" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-50 blur-[110px]" />

        <div className="relative z-10 mx-auto max-w-5xl px-5 py-28 text-center md:px-8">
          <SectionLabel>Build employability as a system</SectionLabel>

          <h2 className="text-balance text-4xl font-semibold tracking-[-0.05em] sm:text-6xl">
            Skills should lead somewhere.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-900/48 sm:text-lg">
            Assess capability. Close the gaps. Build experience. Connect with
            industry. Track the journey. Make every step visible.
          </p>

          <div className="mt-9 flex justify-center">
            <MagneticButton className="px-7 py-3.5 text-base">
              Enter the Portal
              <ArrowRight size={18} />
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/*                               Footer                                */}
      {/* ------------------------------------------------------------------ */}
      <footer className="border-t border-violet-200/70 bg-gradient-to-r from-slate-50 via-cyan-50/70 to-violet-50/70">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-10 md:flex-row md:items-center md:justify-between md:px-8">
          <div>
            <p className="text-sm font-semibold text-slate-900/85">
              The Matrixx — Academia × Industry Collaboration Portal
            </p>
            <p className="mt-1 text-xs text-slate-900/32">
              Skill mapping • Internships • Learning • Placements • Collaboration
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-900/30">
            <CircleDot size={13} className="text-sky-600" />
            Prototype landing experience
          </div>
        </div>
      </footer>

      {/* ------------------------------------------------------------------ */}
      {/*                                Styles                               */}
      {/* ------------------------------------------------------------------ */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sorts+Mill+Goudy:ital@0;1&display=swap');

        html {
          background: #f6faff;
        }

        body {
          margin: 0;
          background:
            radial-gradient(circle at 20% 0%, rgba(56, 189, 248, 0.10), transparent 35%),
            radial-gradient(circle at 80% 10%, rgba(139, 92, 246, 0.08), transparent 30%),
             #f6faff;
          font-family: "Sorts Mill Goudy", Georgia, serif;
        }

        ::selection {
          background: rgba(99, 102, 241, 0.14);
          color: #0f172a;
        }

        .gradient-border {
          position: relative;
          border-color: transparent;
          background-image:
            linear-gradient(rgba(255, 255, 255, 0.82), rgba(255, 255, 255, 0.82)),
            linear-gradient(115deg, #38bdf8, #818cf8, #a78bfa, #34d399, #38bdf8);
          background-origin: border-box;
          background-clip: padding-box, border-box;
          background-size: 100% 100%, 300% 300%;
          animation: border-slide 8s linear infinite;
        }

        @keyframes border-slide {
          0% {
            background-position: 0 0, 0% 50%;
          }
          50% {
            background-position: 0 0, 100% 50%;
          }
          100% {
            background-position: 0 0, 0% 50%;
          }
        }

        .reveal {
          opacity: 0;
          transform: translateY(18px);
          transition:
            opacity 700ms ease,
            transform 700ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .reveal-visible {
          opacity: 1;
          transform: translateY(0);
        }

        @keyframes float {
          0%, 100% {
            transform: translate(-50%, -50%) translateY(0);
          }
          50% {
            transform: translate(-50%, -50%) translateY(-8px);
          }
        }

        #particles-background canvas {
          display: block;
          width: 100% !important;
          height: 100% !important;
        }

        .hero-particles {
          position: absolute;
          inset: 0;
          z-index: 0;
          width: 100%;
          height: 100%;
          min-height: 760px;
          overflow: hidden;
          opacity: 0.9;
        }

        .hero-particles canvas {
          display: block;
          width: 100%;
          height: 100%;
        }

        .text-balance {
          text-wrap: balance;
        }
      `}</style>
    </div>
  );
}