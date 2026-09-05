import { ArrowLeft, ArrowRight, ChevronLeft, Eye, EyeOff, LockKeyhole, Mail, Moon, Sparkles, Sun } from "lucide-react";
import { useState } from "react";
import logo from "../assets/logo.png";
import WebThreads from "../components/WebThreads";

const signupRoles = ["student", "industry", "academician", "institution"];
const roleLabels = { student: "Student", industry: "Industry", academician: "Faculty", institution: "Institution" };
const signupFields = {
  student: [
    ["Account details", [["Institution / College Name", true], ["College mail ID", true, "email"], ["Create password", true, "password"]]],
    ["Personal information", [["Full Name", true], ["Mobile Number", true, "tel"], ["Date of Birth", false, "date"], ["Gender", false, "select", ["Female", "Male", "Non-binary", "Prefer not to say"]]]],
    ["Academic information", [["Degree / Program", true], ["Department", true], ["Current Year", true, "select", ["First year", "Second year", "Third year", "Final year"]], ["Graduation Year", true, "number"], ["College ID photo", false, "file"]]],
  ],
  industry: [
    ["Organization information", [["Company / Organization Name", true], ["Official Email", true, "email"], ["Contact Person", true], ["Designation", true], ["Mobile Number", true, "tel"], ["Industry Sector", true], ["Company Website", false, "url"], ["Company Size", false, "select", ["1–10", "11–50", "51–200", "201–500", "500+"]]]],
    ["Collaboration interests", [["Interests", false, "checks", ["Internships", "Recruitment", "Training Programs", "Mentorship", "Live Industry Projects", "Workshops / Guest Lectures", "Research Collaboration", "Consultancy"]]]],
  ],
  academician: [
    ["Personal information", [["Full Name", true], ["Official Email", true, "email"], ["Mobile Number", true, "tel"], ["Designation", true], ["Department", true]]],
    ["Institution information", [["Institution Name", true], ["University / Affiliation", false], ["Years of Experience", false, "number"]]],
    ["Professional interests", [["Research Areas", false], ["Industry Interests", false], ["Preferred Collaboration Areas", false], ["Faculty ID card photo", false, "file"]]],
  ],
  institution: [
    ["Institution information", [["Institution Name", true], ["Official Email", true, "email"], ["Institution Type", true, "select", ["College", "University", "Polytechnic", "Training institute", "Other"]], ["University / Affiliation", false], ["Address", false], ["Contact Person", true], ["Designation", true], ["Contact Number", true, "tel"]]],
    ["Institution profile", [["Number of Students", false, "number"], ["Departments", false], ["Placement Cell Contact", false], ["Website", false, "url"]]],
  ],
};

function SignupForm({ role, theme }) {
  const inputClass = `w-full rounded-xl border px-3.5 py-3 text-sm outline-none transition ${theme.input} focus:ring-4`;
  return <div className="space-y-6">{signupFields[role].map(([section, fields]) => <section key={section}><h3 className={`mb-4 border-b pb-2 text-sm font-semibold ${theme.isLight ? "border-slate-200" : "border-white/10"}`}>{section}</h3><div className="grid gap-4 sm:grid-cols-2">{fields.map(([label, required, type = "text", options]) => <label key={label} className={`block text-sm font-medium ${theme.label}`}>{label}{required && <span className="ml-1 text-sky-500">*</span>}{type === "checks" ? <span className="mt-2 grid gap-2 sm:grid-cols-2">{options.map((option) => <span key={option} className={`flex items-center gap-2 rounded-lg border px-3 py-2.5 text-xs ${theme.isLight ? "border-slate-200 bg-white/60" : "border-white/10 bg-white/[0.04]"}`}><input type="checkbox" className="accent-sky-500" />{option}</span>)}</span> : type === "select" ? <select defaultValue="" className={`mt-1.5 ${inputClass}`}><option value="" disabled>Select an option</option>{options.map((option) => <option key={option}>{option}</option>)}</select> : type === "file" ? <span className={`mt-1.5 flex cursor-pointer items-center gap-2 rounded-xl border border-dashed px-3.5 py-3 text-xs ${theme.isLight ? "border-slate-300 bg-white/60" : "border-white/15 bg-white/[0.04]"}`}><input type="file" className="w-full" accept="image/*,.pdf" /></span> : <input type={type} required={required} className={`mt-1.5 ${inputClass}`} />}</label>)}</div></section>)}</div>;
}

export default function LoginPage({ onBack }) {
  const [showPassword, setShowPassword] = useState(false);
  const [isLightTheme, setIsLightTheme] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const [signupRole, setSignupRole] = useState(null);
  const [loginRole, setLoginRole] = useState("");
  const theme = isLightTheme
    ? {
        page: "bg-[#f4f8ff] text-slate-950",
        overlay: "bg-[radial-gradient(circle_at_18%_15%,rgba(62,99,255,0.17),transparent_29%),radial-gradient(circle_at_80%_88%,rgba(161,74,255,0.13),transparent_32%),linear-gradient(115deg,rgba(244,248,255,0.82),rgba(244,248,255,0.32),rgba(244,248,255,0.84))]",
        divider: "border-slate-900/10",
        muted: "text-slate-600",
        subtle: "text-slate-500",
        badge: "border-sky-500/20 bg-sky-500/10 text-sky-700",
        card: "border-white/80 bg-white/70 shadow-slate-400/20",
        label: "text-slate-700",
        input: "border-slate-200 bg-white/75 text-slate-950 placeholder:text-slate-400 focus:border-sky-500/70 focus:bg-white focus:ring-sky-400/15",
        icon: "text-slate-400",
        utility: "text-slate-600",
        link: "text-sky-700 hover:text-sky-950",
        back: "text-slate-600 hover:text-slate-950",
        copyright: "text-slate-500",
        isLight: true,
      }
    : {
        page: "bg-[#050817] text-white",
        overlay: "bg-[radial-gradient(circle_at_18%_15%,rgba(62,99,255,0.23),transparent_29%),radial-gradient(circle_at_80%_88%,rgba(161,74,255,0.16),transparent_32%),linear-gradient(115deg,rgba(4,7,21,0.74),rgba(4,7,21,0.35),rgba(4,7,21,0.82))]",
        divider: "border-white/10",
        muted: "text-slate-300",
        subtle: "text-slate-400",
        badge: "border-sky-300/20 bg-sky-300/10 text-sky-100",
        card: "border-white/15 bg-slate-950/45 shadow-black/30",
        label: "text-slate-200",
        input: "border-white/10 bg-white/[0.07] text-white placeholder:text-slate-500 focus:border-sky-400/70 focus:bg-white/[0.1] focus:ring-sky-400/10",
        icon: "text-slate-500",
        utility: "text-slate-400",
        link: "text-sky-300 hover:text-sky-100",
        back: "text-slate-300 hover:text-white",
        copyright: "text-slate-400",
        isLight: false,
      };

  return (
    <main className={`relative grid min-h-screen overflow-hidden transition-colors duration-500 ${theme.page} lg:grid-cols-[1.1fr_0.9fr]`}>
      <WebThreads className="pointer-events-none absolute inset-0 opacity-90" />
      <div className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ${theme.overlay}`} />

      <section className={`relative z-10 hidden flex-col justify-between border-r px-10 py-10 ${theme.divider} lg:flex xl:px-16`}>
        <button type="button" onClick={onBack} className="flex w-fit items-center gap-3 text-left">
          <span className="flex h-12 w-11 items-center justify-center rounded-xl bg-white/95 p-1.5 shadow-[0_0_30px_rgba(137,180,255,0.18)]">
            <img src={logo} alt="The Matrixx" className="max-h-full" />
          </span>
          <span>
            <span className="block text-sm font-bold tracking-[0.12em]">THE MATRIXX</span>
            <span className="mt-1 block text-[10px] uppercase tracking-[0.27em] text-sky-200/60">Academia × Industry</span>
          </span>
        </button>

        <div className="max-w-xl pb-10">
          <div className={`mb-6 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium tracking-wide ${theme.badge}`}>
            <Sparkles size={14} /> Your future, connected
          </div>
          <h1 className="text-5xl font-semibold leading-[1.03] tracking-[-0.055em] xl:text-6xl">
            Opportunity moves at the speed of connection.
          </h1>
          <p className={`mt-6 max-w-md text-base leading-8 ${theme.muted}`}>
            Map your skills, build meaningful industry relationships, and discover the next step in your career journey.
          </p>
        </div>

        <p className="text-xs tracking-wide text-slate-400">© 2026 The Matrixx. Built for possibility.</p>
      </section>

      <section className="relative z-10 flex items-center justify-center px-5 py-8 sm:px-8 lg:px-12">
        <div className="w-full max-w-[440px]">
          <button type="button" onClick={onBack} className={`mb-10 flex items-center gap-2 text-sm transition lg:hidden ${theme.back}`}>
            <ArrowLeft size={17} /> Back to home
          </button>

          <div className={`relative rounded-[2rem] border p-6 shadow-2xl backdrop-blur-2xl transition-colors duration-500 sm:p-9 ${theme.card}`}>
            <button type="button" onClick={() => setIsLightTheme((light) => !light)} className={`absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-xl border transition sm:right-7 sm:top-7 ${isLightTheme ? "border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200" : "border-white/10 bg-white/10 text-sky-100 hover:bg-white/15"}`} aria-label={`Switch to ${isLightTheme ? "dark" : "light"} theme`} title={`Switch to ${isLightTheme ? "dark" : "light"} theme`}>
              {isLightTheme ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            <p className={`text-xs font-semibold uppercase tracking-[0.24em] ${isLightTheme ? "text-sky-700" : "text-sky-300"}`}>Member access</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em]">Welcome back.</h2>
            <p className={`mt-3 text-sm leading-6 ${theme.subtle}`}>Sign in to continue to your personalized Matrixx portal.</p>

            <form className="mt-8 space-y-5" onSubmit={(event) => { event.preventDefault(); window.location.hash = loginRole; }}>
              <label className={`block text-sm font-medium ${theme.label}`}>
                Email address
                <span className="relative mt-2 block">
                  <Mail className={`pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 ${theme.icon}`} size={18} />
                  <input type="email" required placeholder="name@example.com" className={`w-full rounded-xl border py-3.5 pl-11 pr-4 outline-none transition ${theme.input} focus:ring-4`} />
                </span>
              </label>

              <label className={`block text-sm font-medium ${theme.label}`}>
                Sign in as
                <select required value={loginRole} onChange={(event) => setLoginRole(event.target.value)} className={`mt-2 w-full rounded-xl border px-4 py-3.5 outline-none transition ${theme.input} focus:ring-4`}>
                  <option value="" disabled>Select your role</option>
                  <option value="student">Student</option>
                  <option value="academician">Academician / Faculty</option>
                  <option value="industry">Industry / Company</option>
                  <option value="institution">Institution</option>
                </select>
              </label>

              <label className={`block text-sm font-medium ${theme.label}`}>
                Password
                <span className="relative mt-2 block">
                  <LockKeyhole className={`pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 ${theme.icon}`} size={18} />
                  <input type={showPassword ? "text" : "password"} required placeholder="Enter your password" className={`w-full rounded-xl border py-3.5 pl-11 pr-12 outline-none transition ${theme.input} focus:ring-4`} />
                  <button type="button" onClick={() => setShowPassword((visible) => !visible)} className={`absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 transition ${theme.utility} ${isLightTheme ? "hover:bg-slate-100 hover:text-slate-950" : "hover:bg-white/10 hover:text-white"}`} aria-label={showPassword ? "Hide password" : "Show password"}>
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </span>
              </label>

              <div className="flex items-center justify-between gap-4 text-sm">
                <label className={`flex cursor-pointer items-center gap-2 ${theme.utility}`}><input type="checkbox" className="h-4 w-4 rounded border-slate-300 bg-white accent-sky-500" /> Remember me</label>
                <button type="button" className={`font-medium transition ${theme.link}`}>Forgot password?</button>
              </div>

              <button type="submit" className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-400 to-indigo-500 px-5 py-3.5 text-sm font-bold text-slate-950 shadow-lg shadow-sky-500/20 transition hover:brightness-110 focus:outline-none focus:ring-4 focus:ring-sky-300/30">
                Sign in <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
              </button>
            </form>

            <div className={`my-6 flex items-center gap-3 text-xs ${theme.utility}`}>
              <span className={`h-px flex-1 ${isLightTheme ? "bg-slate-200" : "bg-white/10"}`} />
              or continue with
              <span className={`h-px flex-1 ${isLightTheme ? "bg-slate-200" : "bg-white/10"}`} />
            </div>
            <button id="gle" type="button" onClick={setTimeout(() => { 
              if (loginRole) window.location.hash = loginRole;
              let gle=document.getElementById("gle")
              gle.textContent="... ... ...";
              },4000) } className={`flex w-full items-center justify-center gap-3 rounded-xl border px-5 py-3 text-sm font-semibold transition ${isLightTheme ? "border-slate-200 bg-white text-slate-700 hover:bg-slate-50" : "border-white/15 bg-white/[0.08] text-slate-100 hover:bg-white/[0.13]"}`}>
              <span className="grid h-5 w-5 place-items-center rounded-full bg-white text-xs font-bold text-[#4285f4]">G</span>
              Continue with Google
            </button>

            <p className={`mt-7 text-center text-sm ${theme.utility}`}>New to The Matrixx? <button type="button" onClick={() => { setSignupRole(null); setSignupOpen(true); }} className={`font-semibold ${theme.link}`}>Create an account</button></p>
          </div>
        </div>
      </section>
      {signupOpen && (
        <div className="fixed inset-0 z-30 overflow-y-auto bg-slate-950/60 px-4 py-6 backdrop-blur-sm sm:px-8 sm:py-10">
          <div className={`relative mx-auto w-full max-w-3xl rounded-[2rem] border p-6 shadow-2xl backdrop-blur-2xl sm:p-9 ${theme.card}`}>
            <button type="button" onClick={() => setSignupOpen(false)} className={`absolute right-5 top-5 rounded-xl border px-3 py-2 text-sm font-medium transition ${isLightTheme ? "border-slate-200 bg-white text-slate-700" : "border-white/15 bg-white/10 text-slate-100"}`}>Close</button>
            {!signupRole ? <>
              <p className={`text-xs font-semibold uppercase tracking-[0.24em] ${isLightTheme ? "text-sky-700" : "text-sky-300"}`}>Create your account</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em]">How will you use Matrixx?</h2>
              <p className={`mt-3 max-w-lg text-sm leading-6 ${theme.subtle}`}>Select a role to see the registration form designed for you.</p>
              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {signupRoles.map((role) => <button type="button" key={role} onClick={() => setSignupRole(role)} className={`rounded-2xl border p-5 text-left transition hover:-translate-y-0.5 hover:border-sky-400/70 ${isLightTheme ? "border-slate-200 bg-white/70 hover:bg-white" : "border-white/10 bg-white/[0.04] hover:bg-white/[0.08]"}`}><span className="block text-base font-semibold">{roleLabels[role]}</span><span className={`mt-1.5 block text-sm ${theme.utility}`}>{role === "student" ? "Academic profile and career opportunities" : role === "industry" ? "Organization and collaboration interests" : role === "academician" ? "Faculty profile and research interests" : "Institution profile and contacts"}</span></button>)}
              </div>
            </> : <>
              <button type="button" onClick={() => setSignupRole(null)} className={`mb-5 flex items-center gap-1 text-sm font-medium ${theme.link}`}><ChevronLeft size={17} /> Change role</button>
              <p className={`text-xs font-semibold uppercase tracking-[0.24em] ${isLightTheme ? "text-sky-700" : "text-sky-300"}`}>{roleLabels[signupRole]} registration</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em]">Create your account.</h2>
              <p className={`mt-3 text-sm ${theme.subtle}`}>Only fields marked with <span className="text-sky-500">*</span> are required.</p>
              <form className="mt-8" onSubmit={(event) => event.preventDefault()}>
                <SignupForm role={signupRole} theme={theme} />
                <button type="submit" className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-400 to-indigo-500 px-5 py-3.5 text-sm font-bold text-slate-950 shadow-lg shadow-sky-500/20 transition hover:brightness-110">Create {roleLabels[signupRole]} account <ArrowRight size={17} /></button>
              </form>
            </>}
          </div>
        </div>
      )}
    </main>
  );
}
