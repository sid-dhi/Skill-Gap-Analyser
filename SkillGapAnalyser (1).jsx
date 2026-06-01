import { useState, useEffect, useCallback } from "react";

const PROFESSIONS = {
  frontend: {
    label: "Frontend Developer",
    icon: "🖥️",
    color: "#6366f1",
    bg: "#eef2ff",
    skills: ["HTML/CSS", "JavaScript", "React", "TypeScript", "Git", "Testing", "Performance", "Accessibility"],
    targets: [9, 9, 9, 8, 8, 7, 7, 7],
  },
  datascience: {
    label: "Data Scientist",
    icon: "📊",
    color: "#0ea5e9",
    bg: "#e0f2fe",
    skills: ["Python", "Statistics", "ML/AI", "SQL", "Data Viz", "Deep Learning", "Big Data", "Communication"],
    targets: [9, 9, 9, 8, 8, 7, 7, 8],
  },
  ux: {
    label: "UX Designer",
    icon: "🎨",
    color: "#ec4899",
    bg: "#fce7f3",
    skills: ["Figma", "User Research", "Prototyping", "Wireframing", "Usability Testing", "Visual Design", "Information Architecture", "Design Systems"],
    targets: [9, 8, 9, 8, 8, 8, 7, 7],
  },
  devops: {
    label: "DevOps Engineer",
    icon: "⚙️",
    color: "#f59e0b",
    bg: "#fef3c7",
    skills: ["Linux", "Docker", "Kubernetes", "CI/CD", "Cloud (AWS/GCP)", "Scripting", "Monitoring", "Security"],
    targets: [9, 9, 8, 9, 9, 8, 8, 7],
  },
  pm: {
    label: "Product Manager",
    icon: "🧭",
    color: "#10b981",
    bg: "#d1fae5",
    skills: ["Strategy", "Roadmapping", "Data Analysis", "Stakeholder Mgmt", "User Research", "Agile/Scrum", "Communication", "Technical Literacy"],
    targets: [8, 9, 8, 9, 8, 8, 9, 7],
  },
  cybersec: {
    label: "Cybersecurity Analyst",
    icon: "🔒",
    color: "#ef4444",
    bg: "#fee2e2",
    skills: ["Networking", "Linux", "Threat Analysis", "Cryptography", "SIEM Tools", "Pen Testing", "Compliance", "Incident Response"],
    targets: [9, 8, 9, 8, 8, 7, 7, 9],
  },
};

const COURSES = {
  frontend: [
    { skill: "React", title: "React - The Complete Guide", provider: "Udemy", url: "https://www.udemy.com/course/react-the-complete-guide-incl-redux/" },
    { skill: "TypeScript", title: "TypeScript for Developers", provider: "Frontend Masters", url: "https://frontendmasters.com/courses/typescript-v4/" },
    { skill: "Testing", title: "JavaScript Testing Best Practices", provider: "GitHub", url: "https://github.com/goldbergyoni/javascript-testing-best-practices" },
    { skill: "Performance", title: "Web Performance Fundamentals", provider: "Frontend Masters", url: "https://frontendmasters.com/courses/web-perf/" },
    { skill: "Accessibility", title: "Web Accessibility by Google", provider: "Udacity", url: "https://www.udacity.com/course/web-accessibility--ud891" },
    { skill: "JavaScript", title: "JavaScript: The Hard Parts", provider: "Frontend Masters", url: "https://frontendmasters.com/courses/javascript-hard-parts-v2/" },
    { skill: "Git", title: "Git & GitHub Crash Course", provider: "freeCodeCamp", url: "https://www.freecodecamp.org/news/git-and-github-crash-course/" },
    { skill: "HTML/CSS", title: "Responsive Web Design", provider: "freeCodeCamp", url: "https://www.freecodecamp.org/learn/2022/responsive-web-design/" },
  ],
  datascience: [
    { skill: "Python", title: "Python for Data Science", provider: "Coursera", url: "https://www.coursera.org/specializations/python" },
    { skill: "ML/AI", title: "Machine Learning Specialization", provider: "Coursera", url: "https://www.coursera.org/specializations/machine-learning-introduction" },
    { skill: "Statistics", title: "Statistics with Python", provider: "Coursera", url: "https://www.coursera.org/specializations/statistics-with-python" },
    { skill: "Deep Learning", title: "Deep Learning Specialization", provider: "Coursera", url: "https://www.coursera.org/specializations/deep-learning" },
    { skill: "SQL", title: "SQL for Data Analysis", provider: "Mode Analytics", url: "https://mode.com/sql-tutorial/" },
    { skill: "Data Viz", title: "Data Visualization with Python", provider: "Coursera", url: "https://www.coursera.org/learn/python-for-data-visualization" },
    { skill: "Big Data", title: "Big Data Specialization", provider: "Coursera", url: "https://www.coursera.org/specializations/big-data" },
    { skill: "Communication", title: "Data Science Communication", provider: "edX", url: "https://www.edx.org/learn/data-science" },
  ],
  ux: [
    { skill: "Figma", title: "Figma UI/UX Design Essentials", provider: "Udemy", url: "https://www.udemy.com/course/figma-ux-ui-design-user-experience-tutorial-course/" },
    { skill: "User Research", title: "UX Research & Strategy", provider: "Interaction Design Foundation", url: "https://www.interaction-design.org/courses/user-research-methods-and-best-practices" },
    { skill: "Prototyping", title: "Rapid Prototyping", provider: "Coursera", url: "https://www.coursera.org/learn/ui-design-prototyping-evaluation" },
    { skill: "Usability Testing", title: "Conducting Usability Testing", provider: "Nielsen Norman Group", url: "https://www.nngroup.com/courses/usability-testing/" },
    { skill: "Design Systems", title: "Design Systems with Figma", provider: "Skillshare", url: "https://www.skillshare.com/en/classes/Design-Systems-in-Figma" },
    { skill: "Visual Design", title: "Graphic Design Fundamentals", provider: "Coursera", url: "https://www.coursera.org/learn/fundamentals-of-graphic-design" },
    { skill: "Information Architecture", title: "Information Architecture", provider: "Interaction Design Foundation", url: "https://www.interaction-design.org/courses/information-architecture-how-to-structure-websites-and-apps" },
    { skill: "Wireframing", title: "UX Wireframing Masterclass", provider: "Udemy", url: "https://www.udemy.com/course/wireframing/" },
  ],
  devops: [
    { skill: "Docker", title: "Docker Mastery", provider: "Udemy", url: "https://www.udemy.com/course/docker-mastery/" },
    { skill: "Kubernetes", title: "Kubernetes for Developers", provider: "Linux Foundation", url: "https://training.linuxfoundation.org/training/kubernetes-for-developers/" },
    { skill: "CI/CD", title: "GitLab CI/CD Pipeline", provider: "Udemy", url: "https://www.udemy.com/course/gitlab-ci-pipelines-ci-cd-and-devops-for-beginners/" },
    { skill: "Cloud (AWS/GCP)", title: "AWS Certified Solutions Architect", provider: "A Cloud Guru", url: "https://acloudguru.com/course/aws-certified-solutions-architect-associate-saa-c03" },
    { skill: "Linux", title: "Linux Command Line Basics", provider: "Udemy", url: "https://www.udemy.com/course/linux-command-line-volume1/" },
    { skill: "Monitoring", title: "Prometheus & Grafana", provider: "Udemy", url: "https://www.udemy.com/course/monitoring-and-alerting-with-prometheus/" },
    { skill: "Security", title: "DevSecOps Fundamentals", provider: "Pluralsight", url: "https://www.pluralsight.com/paths/devsecops" },
    { skill: "Scripting", title: "Shell Scripting for Automation", provider: "Udemy", url: "https://www.udemy.com/course/shell-scripting-linux/" },
  ],
  pm: [
    { skill: "Roadmapping", title: "Product Management Fundamentals", provider: "Coursera", url: "https://www.coursera.org/learn/uva-darden-digital-product-management" },
    { skill: "Stakeholder Mgmt", title: "Stakeholder Management", provider: "LinkedIn Learning", url: "https://www.linkedin.com/learning/stakeholder-management" },
    { skill: "Agile/Scrum", title: "Professional Scrum Product Owner", provider: "Scrum.org", url: "https://www.scrum.org/assessments/professional-scrum-product-owner-i-certification" },
    { skill: "Data Analysis", title: "Product Analytics Fundamentals", provider: "Amplitude", url: "https://academy.amplitude.com/product-analytics-certification" },
    { skill: "Strategy", title: "Business Strategy Specialization", provider: "Coursera", url: "https://www.coursera.org/specializations/business-strategy" },
    { skill: "Communication", title: "Effective Communication for PMs", provider: "LinkedIn Learning", url: "https://www.linkedin.com/learning/communication-foundations" },
    { skill: "User Research", title: "Design Thinking for Product", provider: "IDEO U", url: "https://www.ideou.com/courses/design-thinking" },
    { skill: "Technical Literacy", title: "Technical Skills for PMs", provider: "Pragmatic Institute", url: "https://www.pragmaticinstitute.com/product/" },
  ],
  cybersec: [
    { skill: "Networking", title: "CompTIA Network+", provider: "CompTIA", url: "https://www.comptia.org/certifications/network" },
    { skill: "Threat Analysis", title: "Cybersecurity Threat Intelligence", provider: "Coursera", url: "https://www.coursera.org/learn/ibm-cybersecurity-analyst" },
    { skill: "Pen Testing", title: "Ethical Hacking Bootcamp", provider: "Udemy", url: "https://www.udemy.com/course/learn-ethical-hacking-from-scratch/" },
    { skill: "SIEM Tools", title: "SOC Analyst Training", provider: "Cybrary", url: "https://www.cybrary.it/career-path/soc-analyst/" },
    { skill: "Cryptography", title: "Cryptography I", provider: "Coursera", url: "https://www.coursera.org/learn/crypto" },
    { skill: "Linux", title: "Linux for Security Professionals", provider: "SANS", url: "https://www.sans.org/courses/linux-fundamentals/" },
    { skill: "Compliance", title: "Cybersecurity Compliance", provider: "ISACA", url: "https://www.isaca.org/credentialing/cism" },
    { skill: "Incident Response", title: "Incident Response & Forensics", provider: "Cybrary", url: "https://www.cybrary.it/course/incident-response/" },
  ],
};

const STEPS = ["select", "assess", "results", "courses", "tracker"];

function RadarChart({ skills, current, targets, color }) {
  const n = skills.length;
  const cx = 160, cy = 160, r = 120;
  const angleStep = (2 * Math.PI) / n;
  const getPoint = (i, val, maxVal = 10) => {
    const angle = i * angleStep - Math.PI / 2;
    const radius = (val / maxVal) * r;
    return { x: cx + radius * Math.cos(angle), y: cy + radius * Math.sin(angle) };
  };
  const targetPts = targets.map((v, i) => getPoint(i, v));
  const currentPts = current.map((v, i) => getPoint(i, v));
  const toPath = (pts) => pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ") + "Z";
  const gridLevels = [2, 4, 6, 8, 10];

  return (
    <svg viewBox="0 0 320 320" style={{ width: "100%", maxWidth: 320 }}>
      {gridLevels.map(level => {
        const pts = skills.map((_, i) => getPoint(i, level));
        return <polygon key={level} points={pts.map(p => `${p.x},${p.y}`).join(" ")} fill="none" stroke="#e5e7eb" strokeWidth="0.5" />;
      })}
      {skills.map((_, i) => {
        const pt = getPoint(i, 10);
        return <line key={i} x1={cx} y1={cy} x2={pt.x} y2={pt.y} stroke="#e5e7eb" strokeWidth="0.5" />;
      })}
      <path d={toPath(targetPts)} fill={color + "22"} stroke={color} strokeWidth="1.5" strokeDasharray="5,3" />
      <path d={toPath(currentPts)} fill={color + "44"} stroke={color} strokeWidth="2" />
      {currentPts.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r="3.5" fill={color} />)}
      {skills.map((skill, i) => {
        const angle = i * angleStep - Math.PI / 2;
        const labelR = r + 22;
        const lx = cx + labelR * Math.cos(angle);
        const ly = cy + labelR * Math.sin(angle);
        const anchor = Math.abs(Math.cos(angle)) < 0.1 ? "middle" : Math.cos(angle) < 0 ? "end" : "start";
        const gap = targets[i] - current[i];
        return (
          <text key={i} x={lx} y={ly} textAnchor={anchor} dominantBaseline="middle" fontSize="9" fill={gap > 2 ? "#ef4444" : gap > 0 ? "#f59e0b" : "#10b981"} fontWeight="600">
            {skill.length > 9 ? skill.slice(0, 8) + "…" : skill}
          </text>
        );
      })}
    </svg>
  );
}

function BarChart({ skills, current, targets, color }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {skills.map((skill, i) => {
        const gap = targets[i] - current[i];
        const pct = (current[i] / targets[i]) * 100;
        return (
          <div key={i}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4, fontSize: 12 }}>
              <span style={{ fontWeight: 500, color: "#374151" }}>{skill}</span>
              <span style={{ color: gap > 2 ? "#ef4444" : gap > 0 ? "#f59e0b" : "#10b981", fontWeight: 600, fontSize: 11 }}>
                {current[i]}/10 {gap > 0 ? `(gap: ${gap})` : "✓"}
              </span>
            </div>
            <div style={{ height: 8, background: "#f3f4f6", borderRadius: 99, overflow: "hidden", position: "relative" }}>
              <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: `${(targets[i] / 10) * 100}%`, background: "#e5e7eb", borderRadius: 99 }} />
              <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: `${Math.min(pct, 100)}%`, background: pct >= 100 ? "#10b981" : pct >= 70 ? color : "#f59e0b", borderRadius: 99, transition: "width 0.6s ease" }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

const STATUS_OPTS = ["Not Started", "In Progress", "Completed"];
const STATUS_COLORS = { "Not Started": "#9ca3af", "In Progress": "#f59e0b", "Completed": "#10b981" };
const STATUS_BG = { "Not Started": "#f9fafb", "In Progress": "#fef3c7", "Completed": "#d1fae5" };

export default function App() {
  const [step, setStep] = useState("select");
  const [profession, setProfession] = useState(null);
  const [ratings, setRatings] = useState({});
  const [courseProgress, setCourseProgress] = useState({});
  const [coursePct, setCoursePct] = useState({});

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("skillgap_v1") || "{}");
      if (saved.profession) setProfession(saved.profession);
      if (saved.ratings) setRatings(saved.ratings);
      if (saved.courseProgress) setCourseProgress(saved.courseProgress);
      if (saved.coursePct) setCoursePct(saved.coursePct);
      if (saved.step) setStep(saved.step);
    } catch {}
  }, []);

  const persist = useCallback((updates) => {
    const state = { profession, ratings, courseProgress, coursePct, step, ...updates };
    localStorage.setItem("skillgap_v1", JSON.stringify(state));
  }, [profession, ratings, courseProgress, coursePct, step]);

  const goTo = (s) => { setStep(s); persist({ step: s }); };

  const selectProfession = (key) => {
    const prof = PROFESSIONS[key];
    const defaultRatings = {};
    prof.skills.forEach(s => { defaultRatings[s] = 5; });
    setProfession(key);
    setRatings(defaultRatings);
    persist({ profession: key, ratings: defaultRatings, step: "assess" });
    setStep("assess");
  };

  const updateRating = (skill, val) => {
    const next = { ...ratings, [skill]: val };
    setRatings(next);
    persist({ ratings: next });
  };

  const updateCourseStatus = (key, status) => {
    const next = { ...courseProgress, [key]: status };
    setCourseProgress(next);
    persist({ courseProgress: next });
  };

  const updateCoursePct = (key, pct) => {
    const next = { ...coursePct, [key]: pct };
    setCoursePct(next);
    persist({ coursePct: next });
  };

  const reset = () => {
    localStorage.removeItem("skillgap_v1");
    setProfession(null); setRatings({}); setCourseProgress({}); setCoursePct({});
    setStep("select");
  };

  const prof = profession ? PROFESSIONS[profession] : null;
  const current = prof ? prof.skills.map(s => ratings[s] ?? 5) : [];
  const targets = prof ? prof.targets : [];
  const courses = profession ? COURSES[profession] : [];

  const totalGap = prof ? prof.skills.reduce((sum, s, i) => sum + Math.max(0, targets[i] - (ratings[s] ?? 5)), 0) : 0;
  const readyPct = prof ? Math.round((current.reduce((a, b) => a + b, 0) / targets.reduce((a, b) => a + b, 0)) * 100) : 0;
  const completedCourses = Object.values(courseProgress).filter(s => s === "Completed").length;
  const inProgressCourses = Object.values(courseProgress).filter(s => s === "In Progress").length;

  const priorityCourses = prof ? courses
    .map(c => ({ ...c, gap: Math.max(0, (targets[prof.skills.indexOf(c.skill)] ?? 0) - (ratings[c.skill] ?? 5)) }))
    .sort((a, b) => b.gap - a.gap)
    .slice(0, 5) : [];

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", minHeight: "100vh", background: "#f8fafc" }}>
      {/* Header */}
      <div style={{ background: "#fff", borderBottom: "1px solid #e5e7eb", padding: "0 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 60 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: prof?.color || "#6366f1", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>
              {prof?.icon || "🎯"}
            </div>
            <span style={{ fontWeight: 700, fontSize: 17, color: "#111827", letterSpacing: "-0.3px" }}>Skill Gap Analyser</span>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            {STEPS.map((s, i) => {
              const labels = ["Career", "Assess", "Analysis", "Courses", "Tracker"];
              const active = step === s;
              const disabled = s !== "select" && !profession;
              return (
                <button key={s} onClick={() => !disabled && goTo(s)} style={{ padding: "5px 12px", borderRadius: 6, border: "1px solid " + (active ? (prof?.color || "#6366f1") : "#e5e7eb"), background: active ? (prof?.bg || "#eef2ff") : "transparent", color: active ? (prof?.color || "#6366f1") : "#6b7280", fontSize: 12, fontWeight: active ? 600 : 400, cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.4 : 1, transition: "all 0.15s" }}>
                  {labels[i]}
                </button>
              );
            })}
            {profession && <button onClick={reset} style={{ padding: "5px 12px", borderRadius: 6, border: "1px solid #fecaca", background: "transparent", color: "#ef4444", fontSize: 12, cursor: "pointer" }}>Reset</button>}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 24px" }}>

        {/* STEP: SELECT */}
        {step === "select" && (
          <div>
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <h1 style={{ fontSize: 28, fontWeight: 800, color: "#111827", margin: "0 0 8px", letterSpacing: "-0.5px" }}>What's your target career?</h1>
              <p style={{ color: "#6b7280", fontSize: 15, margin: 0 }}>Choose a profession to get started with your personalised skill gap analysis.</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 14 }}>
              {Object.entries(PROFESSIONS).map(([key, p]) => (
                <button key={key} onClick={() => selectProfession(key)} style={{ background: "#fff", border: "1.5px solid #e5e7eb", borderRadius: 14, padding: "20px 22px", textAlign: "left", cursor: "pointer", transition: "all 0.18s", display: "flex", alignItems: "center", gap: 16 }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = p.color; e.currentTarget.style.boxShadow = `0 4px 16px ${p.color}22`; e.currentTarget.style.transform = "translateY(-1px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "#e5e7eb"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "none"; }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: p.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0 }}>{p.icon}</div>
                  <div>
                    <div style={{ fontWeight: 700, color: "#111827", fontSize: 15 }}>{p.label}</div>
                    <div style={{ color: "#9ca3af", fontSize: 12, marginTop: 3 }}>{p.skills.length} core skills assessed</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP: ASSESS */}
        {step === "assess" && prof && (
          <div>
            <div style={{ marginBottom: 28 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: prof.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>{prof.icon}</div>
                <h1 style={{ fontSize: 22, fontWeight: 800, color: "#111827", margin: 0 }}>Rate your {prof.label} skills</h1>
              </div>
              <p style={{ color: "#6b7280", fontSize: 14, margin: 0, paddingLeft: 46 }}>Slide each bar to reflect your current proficiency (0 = no experience, 10 = expert).</p>
            </div>
            <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 16, padding: "24px 28px", display: "flex", flexDirection: "column", gap: 22 }}>
              {prof.skills.map((skill, i) => {
                const val = ratings[skill] ?? 5;
                const target = targets[i];
                const gap = target - val;
                return (
                  <div key={skill}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, alignItems: "center" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ fontWeight: 600, color: "#374151", fontSize: 14 }}>{skill}</span>
                        <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 99, background: gap > 2 ? "#fee2e2" : gap > 0 ? "#fef3c7" : "#d1fae5", color: gap > 2 ? "#b91c1c" : gap > 0 ? "#92400e" : "#065f46", fontWeight: 600 }}>
                          target: {target}/10
                        </span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ fontSize: 20, fontWeight: 800, color: prof.color, minWidth: 24, textAlign: "right" }}>{val}</span>
                        <span style={{ fontSize: 11, color: gap > 0 ? "#9ca3af" : "#10b981" }}>
                          {gap > 0 ? `${gap} to go` : "✓ ready"}
                        </span>
                      </div>
                    </div>
                    <input type="range" min={0} max={10} step={1} value={val}
                      onChange={e => updateRating(skill, parseInt(e.target.value))}
                      style={{ width: "100%", accentColor: prof.color }} />
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "#d1d5db", marginTop: 2 }}>
                      <span>Beginner</span><span>Intermediate</span><span>Expert</span>
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{ marginTop: 20, display: "flex", justifyContent: "flex-end" }}>
              <button onClick={() => goTo("results")} style={{ padding: "12px 28px", borderRadius: 10, background: prof.color, color: "#fff", fontWeight: 700, fontSize: 15, border: "none", cursor: "pointer" }}>
                Analyse my gaps →
              </button>
            </div>
          </div>
        )}

        {/* STEP: RESULTS */}
        {step === "results" && prof && (
          <div>
            <div style={{ marginBottom: 24 }}>
              <h1 style={{ fontSize: 22, fontWeight: 800, color: "#111827", margin: "0 0 4px" }}>Your Gap Analysis</h1>
              <p style={{ color: "#6b7280", fontSize: 14, margin: 0 }}>Here's where you stand vs. the target proficiency for a {prof.label}.</p>
            </div>

            {/* Summary cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 24 }}>
              {[
                { label: "Readiness", value: readyPct + "%", color: readyPct >= 80 ? "#10b981" : readyPct >= 60 ? "#f59e0b" : "#ef4444", bg: readyPct >= 80 ? "#d1fae5" : readyPct >= 60 ? "#fef3c7" : "#fee2e2" },
                { label: "Total Skill Gap", value: totalGap, color: totalGap < 5 ? "#10b981" : totalGap < 15 ? "#f59e0b" : "#ef4444", bg: totalGap < 5 ? "#d1fae5" : totalGap < 15 ? "#fef3c7" : "#fee2e2" },
                { label: "Skills to Improve", value: prof.skills.filter((s, i) => (ratings[s] ?? 5) < targets[i]).length + "/" + prof.skills.length, color: prof.color, bg: prof.bg },
              ].map(card => (
                <div key={card.label} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: "16px 20px", textAlign: "center" }}>
                  <div style={{ fontSize: 11, color: "#9ca3af", fontWeight: 500, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.5px" }}>{card.label}</div>
                  <div style={{ fontSize: 28, fontWeight: 800, color: card.color }}>{card.value}</div>
                </div>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 14, padding: "20px 24px" }}>
                <h2 style={{ fontSize: 14, fontWeight: 700, color: "#374151", margin: "0 0 16px" }}>Skill Radar</h2>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <RadarChart skills={prof.skills} current={current} targets={targets} color={prof.color} />
                </div>
                <div style={{ display: "flex", gap: 16, justifyContent: "center", fontSize: 11, color: "#6b7280", marginTop: 8 }}>
                  <span style={{ display: "flex", alignItems: "center", gap: 4 }}><span style={{ width: 14, height: 2, background: prof.color, display: "inline-block", borderRadius: 2 }}></span>Current</span>
                  <span style={{ display: "flex", alignItems: "center", gap: 4 }}><span style={{ width: 14, height: 2, background: prof.color, opacity: 0.4, display: "inline-block", borderRadius: 2, borderTop: `2px dashed ${prof.color}` }}></span>Target</span>
                </div>
              </div>
              <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 14, padding: "20px 24px" }}>
                <h2 style={{ fontSize: 14, fontWeight: 700, color: "#374151", margin: "0 0 16px" }}>Skill Breakdown</h2>
                <BarChart skills={prof.skills} current={current} targets={targets} color={prof.color} />
              </div>
            </div>

            <div style={{ marginTop: 20, display: "flex", gap: 10, justifyContent: "flex-end" }}>
              <button onClick={() => goTo("courses")} style={{ padding: "11px 24px", borderRadius: 10, background: prof.color, color: "#fff", fontWeight: 700, fontSize: 14, border: "none", cursor: "pointer" }}>
                See course recommendations →
              </button>
            </div>
          </div>
        )}

        {/* STEP: COURSES */}
        {step === "courses" && prof && (
          <div>
            <div style={{ marginBottom: 24 }}>
              <h1 style={{ fontSize: 22, fontWeight: 800, color: "#111827", margin: "0 0 4px" }}>Recommended Courses</h1>
              <p style={{ color: "#6b7280", fontSize: 14, margin: 0 }}>Sorted by your biggest skill gaps — tackle the top ones first.</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {courses
                .map(c => ({ ...c, gap: Math.max(0, (targets[prof.skills.indexOf(c.skill)] ?? 0) - (ratings[c.skill] ?? 5)), idx: prof.skills.indexOf(c.skill) }))
                .sort((a, b) => b.gap - a.gap)
                .map((course, i) => {
                  const key = `${profession}_${i}`;
                  const status = courseProgress[key] || "Not Started";
                  return (
                    <div key={i} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: "16px 20px", display: "flex", alignItems: "center", gap: 16 }}>
                      <div style={{ width: 36, height: 36, borderRadius: 99, background: prof.bg, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, color: prof.color, fontSize: 14, flexShrink: 0 }}>{i + 1}</div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                          <span style={{ fontWeight: 700, color: "#111827", fontSize: 14 }}>{course.title}</span>
                          {course.gap > 0 && <span style={{ fontSize: 10, padding: "2px 7px", borderRadius: 99, background: "#fee2e2", color: "#b91c1c", fontWeight: 600, flexShrink: 0 }}>gap: {course.gap}</span>}
                        </div>
                        <div style={{ fontSize: 12, color: "#6b7280" }}>
                          <span style={{ padding: "2px 8px", background: "#f3f4f6", borderRadius: 6, marginRight: 6 }}>{course.provider}</span>
                          <span style={{ color: prof.color, fontWeight: 500 }}>{course.skill}</span>
                        </div>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
                        <span style={{ padding: "5px 12px", borderRadius: 99, background: STATUS_BG[status], color: STATUS_COLORS[status], fontSize: 11, fontWeight: 600 }}>{status}</span>
                        <a href={course.url} target="_blank" rel="noreferrer" style={{ padding: "7px 14px", borderRadius: 8, background: prof.bg, color: prof.color, fontWeight: 600, fontSize: 12, textDecoration: "none", border: `1px solid ${prof.color}33` }}>
                          View →
                        </a>
                      </div>
                    </div>
                  );
                })}
            </div>
            <div style={{ marginTop: 20, display: "flex", justifyContent: "flex-end" }}>
              <button onClick={() => goTo("tracker")} style={{ padding: "11px 24px", borderRadius: 10, background: prof.color, color: "#fff", fontWeight: 700, fontSize: 14, border: "none", cursor: "pointer" }}>
                Track my progress →
              </button>
            </div>
          </div>
        )}

        {/* STEP: TRACKER */}
        {step === "tracker" && prof && (
          <div>
            <div style={{ marginBottom: 24 }}>
              <h1 style={{ fontSize: 22, fontWeight: 800, color: "#111827", margin: "0 0 4px" }}>Progress Tracker</h1>
              <p style={{ color: "#6b7280", fontSize: 14, margin: 0 }}>Update your status and completion percentage as you work through each course.</p>
            </div>

            {/* Progress summary */}
            <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 14, padding: "20px 24px", marginBottom: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <span style={{ fontWeight: 700, color: "#374151", fontSize: 14 }}>Overall Progress</span>
                <span style={{ fontWeight: 800, color: prof.color, fontSize: 16 }}>{completedCourses}/{courses.length} completed</span>
              </div>
              <div style={{ height: 10, background: "#f3f4f6", borderRadius: 99, overflow: "hidden" }}>
                <div style={{ height: "100%", background: prof.color, borderRadius: 99, width: `${(completedCourses / courses.length) * 100}%`, transition: "width 0.5s ease" }} />
              </div>
              <div style={{ display: "flex", gap: 20, marginTop: 12, fontSize: 12, color: "#6b7280" }}>
                <span>✅ {completedCourses} completed</span>
                <span>🔄 {inProgressCourses} in progress</span>
                <span>⏳ {courses.length - completedCourses - inProgressCourses} not started</span>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {courses.map((course, i) => {
                const key = `${profession}_${i}`;
                const status = courseProgress[key] || "Not Started";
                const pct = coursePct[key] ?? (status === "Completed" ? 100 : 0);
                return (
                  <div key={i} style={{ background: "#fff", border: `1.5px solid ${status === "Completed" ? "#6ee7b7" : status === "In Progress" ? "#fde68a" : "#e5e7eb"}`, borderRadius: 12, padding: "16px 20px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                      <div>
                        <div style={{ fontWeight: 700, color: "#111827", fontSize: 14 }}>{course.title}</div>
                        <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 2 }}>{course.provider} · {course.skill}</div>
                      </div>
                      <div style={{ display: "flex", gap: 6 }}>
                        {STATUS_OPTS.map(s => (
                          <button key={s} onClick={() => { updateCourseStatus(key, s); if (s === "Completed") updateCoursePct(key, 100); if (s === "Not Started") updateCoursePct(key, 0); }}
                            style={{ padding: "5px 10px", borderRadius: 8, border: "1px solid " + (status === s ? STATUS_COLORS[s] : "#e5e7eb"), background: status === s ? STATUS_BG[s] : "transparent", color: status === s ? STATUS_COLORS[s] : "#9ca3af", fontSize: 11, fontWeight: status === s ? 700 : 400, cursor: "pointer" }}>
                            {s === "Not Started" ? "Not started" : s === "In Progress" ? "In progress" : "✓ Done"}
                          </button>
                        ))}
                      </div>
                    </div>
                    {status !== "Not Started" && (
                      <div>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#6b7280", marginBottom: 6 }}>
                          <span>Completion</span>
                          <span style={{ fontWeight: 600, color: prof.color }}>{pct}%</span>
                        </div>
                        <input type="range" min={0} max={100} step={5} value={pct}
                          onChange={e => updateCoursePct(key, parseInt(e.target.value))}
                          style={{ width: "100%", accentColor: STATUS_COLORS[status] }} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
