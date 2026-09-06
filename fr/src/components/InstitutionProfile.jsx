import { useState } from "react";
import { Building2, Globe, Mail, MapPin, Pencil, Phone, Save, Users, X } from "lucide-react";

const initialInstitution = {
  institutionName: "Kongu Engineering College",
  institutionType: "Autonomous engineering institution",
  description: "Kongu Engineering College is committed to developing industry-ready graduates through strong academics, applied learning and meaningful industry partnerships.",
  email: "principal@kongu.edu",
  phone: "+91 4259 226000",
  contactPerson: "Institution administrator",
  designation: "Placement and industry relations coordinator",
  studentCount: "8,500+ students",
  facultyCount: "450+ faculty members",
  reg:"45-46/91-AICTE/586",
  accreditation: "NAAC A++ · NBA accredited programs",
  location: "Perundurai, Erode, Tamil Nadu, India",
  councilling_code:"2711",
  website: "https://kongu.ac.in",
  linkedin: "https://linkedin.com/school/kongu-engineering-college",
  departments: "Computer Science, IT, AI & Data Science, ECE, EEE, Mechanical, Civil",
  focusAreas: "Artificial Intelligence, Cloud Computing, Cybersecurity, Data Analytics, Advanced Manufacturing",
};

export default function InstitutionProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [institution, setInstitution] = useState(initialInstitution);
  const [notice, setNotice] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInstitution((current) => ({ ...current, [name]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    setNotice("Institution profile updated successfully.");
  };

  return <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
      <div className="flex items-start gap-4">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-amber-700"><Building2 size={30} /></div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[.18em] text-amber-600">Institution profile</p>
          <h3 className="mt-2 text-2xl font-semibold text-slate-900">{institution.institutionName}</h3>
          <p className="mt-1 text-sm text-slate-500">{institution.institutionType} · {institution.location}</p>
          <div className="mt-3 flex flex-wrap gap-2"><span className="rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-bold text-emerald-700">Level 3 Verified</span><span className="rounded-full bg-amber-100 px-3 py-1.5 text-xs font-semibold text-amber-700">Academic Institution</span></div>
        </div>
      </div>
      {!isEditing ? <button type="button" onClick={() => { setIsEditing(true); setNotice(""); }} className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"><Pencil size={16} />Edit Profile</button> : <div className="flex gap-2"><button type="button" onClick={() => setIsEditing(false)} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"><X size={16} />Cancel</button><button type="button" onClick={handleSave} className="inline-flex items-center gap-2 rounded-xl bg-amber-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-amber-700"><Save size={16} />Save Changes</button></div>}
    </div>

    {notice && <p className="mt-5 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">{notice}</p>}

    {!isEditing ? <div className="mt-8 space-y-6">
      <div><h4 className="text-sm font-bold text-slate-900">About Institution</h4><p className="mt-2 text-sm leading-6 text-slate-600">{institution.description}</p></div>
      <div><h4 className="mb-3 text-sm font-bold text-slate-900">Institution Information</h4><dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{[["Official Email", institution.email, Mail], ["Contact Person", institution.contactPerson, Users], ["Designation", institution.designation, Users], ["Students", institution.studentCount, Users], ["Faculty", institution.facultyCount, Users], ["councilling code", institution.councilling_code, Building2], ["Accreditation", institution.accreditation, Building2], ["Location", institution.location, MapPin], ["Institutional_Register_NO", institution.reg, MapPin]].map(([label, value, Icon]) => <div key={label} className="rounded-xl bg-slate-50 p-4"><div className="flex items-center gap-2"><Icon size={15} className="text-amber-600" /><dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</dt></div><dd className="mt-2 text-sm font-medium text-slate-800">{value}</dd></div>)}</dl></div>
      <div><h4 className="mb-3 text-sm font-bold text-slate-900">Contact & Online Presence</h4><div className="grid gap-4 sm:grid-cols-2"><InfoItem icon={Globe} label="Website" value={institution.website} accent /><InfoItem label="LinkedIn" value={institution.linkedin} accent /><InfoItem icon={Mail} label="Official Email" value={institution.email} /><InfoItem icon={Phone} label="Phone" value={institution.phone} /></div></div>
      <div className="grid gap-4 md:grid-cols-2"><InfoBlock title="Departments and Programs" value={institution.departments} /><InfoBlock title="Academic Focus Areas" value={institution.focusAreas} /></div>
    </div> : <div className="mt-8 space-y-6">
      <ProfileSection title="Basic Institution Information"><div className="grid gap-5 md:grid-cols-2"><Input label="Institution Name" name="institutionName" value={institution.institutionName} onChange={handleChange} required /><Input label="Institution Type" name="institutionType" value={institution.institutionType} onChange={handleChange} /><Input label="Student Count" name="studentCount" value={institution.studentCount} onChange={handleChange} /><Input label="Faculty Count" name="facultyCount" value={institution.facultyCount} onChange={handleChange} /><Input label="Established Year" name="establishedYear" value={institution.establishedYear} onChange={handleChange} /><Input label="Accreditation" name="accreditation" value={institution.accreditation} onChange={handleChange} /></div><Textarea label="Institution Description" name="description" value={institution.description} onChange={handleChange} /></ProfileSection>
      <ProfileSection title="Contact Information"><div className="grid gap-5 md:grid-cols-2"><Input label="Official Email" name="email" type="email" value={institution.email} onChange={handleChange} /><Input label="Phone Number" name="phone" value={institution.phone} onChange={handleChange} /><Input label="Contact Person" name="contactPerson" value={institution.contactPerson} onChange={handleChange} /><Input label="Designation" name="designation" value={institution.designation} onChange={handleChange} /></div></ProfileSection>
      <ProfileSection title="Location"><div className="grid gap-5 md:grid-cols-2"><Input label="Campus" name="campus" value={institution.campus} onChange={handleChange} /><Input label="Location" name="location" value={institution.location} onChange={handleChange} /></div></ProfileSection>
      <ProfileSection title="Online Presence"><div className="grid gap-5 md:grid-cols-2"><Input label="Institution Website" name="website" value={institution.website} onChange={handleChange} /><Input label="LinkedIn Institution Page" name="linkedin" value={institution.linkedin} onChange={handleChange} /></div></ProfileSection>
      <ProfileSection title="Departments & Academic Focus"><Textarea label="Departments and Programs" name="departments" value={institution.departments} onChange={handleChange} placeholder="Computer Science, ECE, Mechanical..." /><Textarea label="Academic Focus Areas" name="focusAreas" value={institution.focusAreas} onChange={handleChange} placeholder="AI, Cloud Computing, Cybersecurity..." /></ProfileSection>
    </div>}
  </article>;
}

function Input({ label, name, value, onChange, type = "text", required = false }) {
  return <div><label className="mb-2 block text-sm font-semibold text-slate-700">{label}{required && <span className="ml-1 text-red-500">*</span>}</label><input type={type} name={name} value={value} onChange={onChange} className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-100" /></div>;
}

function Textarea({ label, name, value, onChange, placeholder }) {
  return <div className="mt-5"><label className="mb-2 block text-sm font-semibold text-slate-700">{label}</label><textarea name={name} value={value} onChange={onChange} rows={4} placeholder={placeholder} className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-100" /></div>;
}

function ProfileSection({ title, children }) {
  return <section className="rounded-2xl border border-slate-200 bg-slate-50/50 p-5"><h4 className="mb-5 text-base font-bold text-slate-900">{title}</h4>{children}</section>;
}

function InfoItem({ icon: Icon, label, value, accent = false }) {
  return <div className="rounded-xl bg-slate-50 p-4"><div className="flex items-center gap-2 text-slate-500">{Icon && <Icon size={15} />}<span className="text-xs font-semibold uppercase tracking-wide">{label}</span></div><p className={`mt-2 text-sm font-medium ${accent ? "text-amber-600" : "text-slate-800"}`}>{value}</p></div>;
}

function InfoBlock({ title, value }) {
  return <div className="rounded-2xl border border-slate-200 p-5"><h4 className="text-sm font-bold text-slate-900">{title}</h4><p className="mt-3 text-sm leading-6 text-slate-600">{value}</p></div>;
}
