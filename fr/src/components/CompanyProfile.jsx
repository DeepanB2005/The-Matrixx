import { useState } from "react";
import {
  Building2,
  Globe,
  Mail,
  Phone,
  MapPin,
  Users,
  Pencil,
  Save,
  X,
  BriefcaseBusiness,
} from "lucide-react";
export default function CompanyProfile() {
  const [isEditing, setIsEditing] = useState(false);

  const [company, setCompany] = useState({
    companyName: "InnovateTech Labs",
    industry: "AI & Software Products",
    description:
      "InnovateTech Labs builds AI-powered software products and provides technology solutions for modern businesses.",
    email: "talent@innovatetech.example",
    phone: "+91 98765 43210",
    contactPerson: "Deepa R.",
    designation: "Talent Acquisition Manager",
    companySize: "201–500 employees",
    foundedYear: "2018",
    website: "https://innovatetech.example",
    linkedin: "https://linkedin.com/company/innovatetech",
    location: "Bengaluru, Karnataka, India",
    headquarters: "Bengaluru",
    companyType: "Private",
    registrationNumber: "U72900KA2018PTC000000",
    technologies:
      "Python, React, Node.js, AI, Machine Learning, AWS, PostgreSQL",
    domains:
      "Artificial Intelligence, SaaS, Cloud Computing, Data Analytics",
    hiringAreas:
      "Software Development, AI/ML, Data Science, Cloud Engineering",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCompany((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // Connect this to your FastAPI PUT/PATCH endpoint later
    console.log("Updated company profile:", company);
    setIsEditing(false);
  };

  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      {/* HEADER */}
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">

        <div className="flex items-start gap-4">

          {/* Company Logo */}
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-sky-100 text-sky-700">
            <Building2 size={30} />
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[.18em] text-sky-600">
              Company Profile
            </p>

            <h3 className="mt-2 text-2xl font-semibold text-slate-900">
              {company.companyName}
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              {company.industry} · {company.location}
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              <span className="rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-bold text-emerald-700">
                Level 3 Verified
              </span>

              <span className="rounded-full bg-sky-100 px-3 py-1.5 text-xs font-semibold text-sky-700">
                Industry Partner
              </span>
            </div>
          </div>
        </div>

        {/* EDIT / SAVE BUTTONS */}
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            <Pencil size={16} />
            Edit Profile
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={() => setIsEditing(false)}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
            >
              <X size={16} />
              Cancel
            </button>

            <button
              onClick={handleSave}
              className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sky-700"
            >
              <Save size={16} />
              Save Changes
            </button>
          </div>
        )}
      </div>

      {/* VIEW MODE */}
      {!isEditing ? (
        <div className="mt-8 space-y-6">

          {/* ABOUT */}
          <div>
            <h4 className="text-sm font-bold text-slate-900">
              About Company
            </h4>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              {company.description}
            </p>
          </div>

          {/* BASIC INFORMATION */}
          <div>
            <h4 className="mb-3 text-sm font-bold text-slate-900">
              Company Information
            </h4>

            <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

              {[
                ["Official Email", company.email, Mail],
                ["Contact Person", company.contactPerson, Users],
                ["Designation", company.designation, BriefcaseBusiness],
                ["Company Size", company.companySize, Users],
                ["Founded", company.foundedYear, Building2],
                ["Company Type", company.companyType, Building2],
                ["Location", company.location, MapPin],
                ["Headquarters", company.headquarters, MapPin],
                ["Registration No.", company.registrationNumber, Building2],
              ].map(([label, value, Icon]) => (
                <div
                  key={label}
                  className="rounded-xl bg-slate-50 p-4"
                >
                  <div className="flex items-center gap-2">
                    <Icon size={15} className="text-sky-600" />

                    <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      {label}
                    </dt>
                  </div>

                  <dd className="mt-2 text-sm font-medium text-slate-800">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* CONTACT + LINKS */}
          <div>
            <h4 className="mb-3 text-sm font-bold text-slate-900">
              Contact & Online Presence
            </h4>

            <div className="grid gap-4 sm:grid-cols-2">

              <div className="rounded-xl bg-slate-50 p-4">
                <div className="flex items-center gap-2 text-slate-500">
                  <Globe size={15} />
                  <span className="text-xs font-semibold uppercase tracking-wide">
                    Website
                  </span>
                </div>

                <p className="mt-2 text-sm font-medium text-sky-600">
                  {company.website}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <div className="flex items-center gap-2 text-slate-500">
                  <span className="text-xs font-semibold uppercase tracking-wide">
                    LinkedIn
                  </span>
                </div>

                <p className="mt-2 truncate text-sm font-medium text-sky-600">
                  {company.linkedin}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <div className="flex items-center gap-2 text-slate-500">
                  <Mail size={15} />
                  <span className="text-xs font-semibold uppercase tracking-wide">
                    Official Email
                  </span>
                </div>

                <p className="mt-2 text-sm font-medium text-slate-800">
                  {company.email}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <div className="flex items-center gap-2 text-slate-500">
                  <Phone size={15} />
                  <span className="text-xs font-semibold uppercase tracking-wide">
                    Phone
                  </span>
                </div>

                <p className="mt-2 text-sm font-medium text-slate-800">
                  {company.phone}
                </p>
              </div>

            </div>
          </div>

          {/* TECHNOLOGY & BUSINESS DOMAINS */}
          <div className="grid gap-4 md:grid-cols-2">

            <div className="rounded-2xl border border-slate-200 p-5">
              <h4 className="text-sm font-bold text-slate-900">
                Technologies
              </h4>

              <div className="mt-3 flex flex-wrap gap-2">
                {company.technologies
                  .split(",")
                  .map((technology) => (
                    <span
                      key={technology}
                      className="rounded-lg bg-sky-50 px-3 py-1.5 text-xs font-semibold text-sky-700"
                    >
                      {technology.trim()}
                    </span>
                  ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 p-5">
              <h4 className="text-sm font-bold text-slate-900">
                Business Domains
              </h4>

              <div className="mt-3 flex flex-wrap gap-2">
                {company.domains
                  .split(",")
                  .map((domain) => (
                    <span
                      key={domain}
                      className="rounded-lg bg-violet-50 px-3 py-1.5 text-xs font-semibold text-violet-700"
                    >
                      {domain.trim()}
                    </span>
                  ))}
              </div>
            </div>

          </div>

          {/* HIRING AREAS */}
          <div className="rounded-2xl border border-slate-200 p-5">
            <h4 className="text-sm font-bold text-slate-900">
              Current Hiring Areas
            </h4>

            <p className="mt-2 text-sm text-slate-600">
              {company.hiringAreas}
            </p>
          </div>

        </div>
      ) : (

        /* EDIT MODE */
        <div className="mt-8 space-y-8">

          {/* SECTION 1 */}
          <ProfileSection title="Basic Company Information">

            <div className="grid gap-5 md:grid-cols-2">

              <Input
                label="Company Name"
                name="companyName"
                value={company.companyName}
                onChange={handleChange}
                required
              />

              <Input
                label="Industry / Sector"
                name="industry"
                value={company.industry}
                onChange={handleChange}
              />

              <Input
                label="Company Size"
                name="companySize"
                value={company.companySize}
                onChange={handleChange}
              />

              <Input
                label="Founded Year"
                name="foundedYear"
                value={company.foundedYear}
                onChange={handleChange}
              />

              <Input
                label="Company Type"
                name="companyType"
                value={company.companyType}
                onChange={handleChange}
              />

              <Input
                label="Registration Number"
                name="registrationNumber"
                value={company.registrationNumber}
                onChange={handleChange}
              />

            </div>

            <Textarea
              label="Company Description"
              name="description"
              value={company.description}
              onChange={handleChange}
            />

          </ProfileSection>

          {/* SECTION 2 */}
          <ProfileSection title="Contact Information">

            <div className="grid gap-5 md:grid-cols-2">

              <Input
                label="Official Email"
                name="email"
                type="email"
                value={company.email}
                onChange={handleChange}
              />

              <Input
                label="Phone Number"
                name="phone"
                value={company.phone}
                onChange={handleChange}
              />

              <Input
                label="Contact Person"
                name="contactPerson"
                value={company.contactPerson}
                onChange={handleChange}
              />

              <Input
                label="Designation"
                name="designation"
                value={company.designation}
                onChange={handleChange}
              />

            </div>

          </ProfileSection>

          {/* SECTION 3 */}
          <ProfileSection title="Location">

            <div className="grid gap-5 md:grid-cols-2">

              <Input
                label="Headquarters"
                name="headquarters"
                value={company.headquarters}
                onChange={handleChange}
              />

              <Input
                label="Location"
                name="location"
                value={company.location}
                onChange={handleChange}
              />

            </div>

          </ProfileSection>

          {/* SECTION 4 */}
          <ProfileSection title="Online Presence">

            <div className="grid gap-5 md:grid-cols-2">

              <Input
                label="Company Website"
                name="website"
                value={company.website}
                onChange={handleChange}
              />

              <Input
                label="LinkedIn Company Page"
                name="linkedin"
                value={company.linkedin}
                onChange={handleChange}
              />

            </div>

          </ProfileSection>

          {/* SECTION 5 */}
          <ProfileSection title="Technology & Business Capabilities">

            <Textarea
              label="Technologies Used"
              name="technologies"
              value={company.technologies}
              onChange={handleChange}
              placeholder="Python, React, AWS, PostgreSQL..."
            />

            <Textarea
              label="Business Domains"
              name="domains"
              value={company.domains}
              onChange={handleChange}
              placeholder="AI, SaaS, FinTech, Healthcare..."
            />

            <Textarea
              label="Current Hiring Areas"
              name="hiringAreas"
              value={company.hiringAreas}
              onChange={handleChange}
              placeholder="Software Development, AI/ML..."
            />

          </ProfileSection>

        </div>
      )}
    </article>
  );
}


/* -----------------------------
   REUSABLE INPUT COMPONENT
------------------------------ */

function Input({
  label,
  name,
  value,
  onChange,
  type = "text",
  required = false,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-700">
        {label}

        {required && (
          <span className="ml-1 text-red-500">*</span>
        )}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
      />
    </div>
  );
}


/* -----------------------------
   REUSABLE TEXTAREA COMPONENT
------------------------------ */

function Textarea({
  label,
  name,
  value,
  onChange,
  placeholder,
}) {
  return (
    <div className="mt-5">
      <label className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
      </label>

      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows={4}
        placeholder={placeholder}
        className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
      />
    </div>
  );
}


/* -----------------------------
   SECTION WRAPPER
------------------------------ */

function ProfileSection({ title, children }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-slate-50/50 p-5">

      <h4 className="mb-5 text-base font-bold text-slate-900">
        {title}
      </h4>

      {children}

    </section>
  );
}
