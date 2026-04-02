"use client";

import { AnimatePresence, motion } from "framer-motion";
import { LockKeyhole, Minus, Plus, RefreshCcw, Save, ShieldCheck, Sparkles, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { usePortfolio } from "@/components/providers/portfolio-provider";
import {
  adminPassword,
  defaultPortfolioData,
  mockOtp,
  type ContactInfo,
  type PortfolioData,
  type Project,
  type Skill
} from "@/data/portfolio";

type AdminPanelProps = {
  isOpen: boolean;
  onClose: () => void;
};

const emptyProject: Project = {
  title: "New Project",
  strapline: "Project positioning statement",
  problem: "Describe the problem being solved.",
  solution: "Describe the implemented solution.",
  tech: ["Next.js", "Automation"],
  outcome: "Describe the measurable or practical outcome."
};

const emptySkill: Skill = {
  name: "New Skill",
  level: 60,
  note: "Short context"
};

export function AdminPanel({ isOpen, onClose }: AdminPanelProps) {
  const { portfolio, savePortfolio, resetPortfolio } = usePortfolio();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authMode, setAuthMode] = useState<"password" | "otp">("password");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [draft, setDraft] = useState<PortfolioData>(portfolio);

  useEffect(() => {
    setDraft(portfolio);
  }, [portfolio]);

  useEffect(() => {
    if (!isOpen) {
      setPassword("");
      setOtp("");
      setOtpSent(false);
      setIsAuthenticated(false);
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  const projectCount = draft.projects.length;
  const skillCount = useMemo(
    () => draft.skills.reduce((total, category) => total + category.items.length, 0),
    [draft.skills]
  );

  function authenticate() {
    if (authMode === "password" && password === adminPassword) {
      setIsAuthenticated(true);
      return;
    }

    if (authMode === "otp" && otp === mockOtp) {
      setIsAuthenticated(true);
      return;
    }

    window.alert("Invalid admin credentials. This mock panel accepts the demo secret only.");
  }

  function updateField<K extends keyof PortfolioData>(key: K, value: PortfolioData[K]) {
    setDraft((current) => ({ ...current, [key]: value }));
  }

  function updateContact<K extends keyof ContactInfo>(key: K, value: ContactInfo[K]) {
    setDraft((current) => ({
      ...current,
      contact: {
        ...current.contact,
        [key]: value
      }
    }));
  }

  function updateProject(index: number, field: keyof Project, value: string | string[]) {
    setDraft((current) => ({
      ...current,
      projects: current.projects.map((project, itemIndex) =>
        itemIndex === index ? { ...project, [field]: value } : project
      )
    }));
  }

  function removeProject(index: number) {
    setDraft((current) => ({
      ...current,
      projects: current.projects.filter((_, itemIndex) => itemIndex !== index)
    }));
  }

  function updateSkill(categoryIndex: number, skillIndex: number, field: keyof Skill, value: string | number) {
    setDraft((current) => ({
      ...current,
      skills: current.skills.map((category, currentCategoryIndex) =>
        currentCategoryIndex === categoryIndex
          ? {
              ...category,
              items: category.items.map((skill, currentSkillIndex) =>
                currentSkillIndex === skillIndex ? { ...skill, [field]: value } : skill
              )
            }
          : category
      )
    }));
  }

  function removeSkill(categoryIndex: number, skillIndex: number) {
    setDraft((current) => ({
      ...current,
      skills: current.skills.map((category, currentCategoryIndex) =>
        currentCategoryIndex === categoryIndex
          ? {
              ...category,
              items: category.items.filter((_, currentSkillIndex) => currentSkillIndex !== skillIndex)
            }
          : category
      )
    }));
  }

  function saveChanges() {
    savePortfolio(draft);
    onClose();
  }

  function resetChanges() {
    if (!window.confirm("Reset the site content back to the default portfolio content?")) {
      return;
    }
    resetPortfolio();
    setDraft(defaultPortfolioData);
  }

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.3 }}
            className="relative max-h-[92vh] w-full max-w-6xl overflow-hidden rounded-[2rem] border border-white/10 bg-bg/95 shadow-2xl shadow-black/40"
          >
            <div className="flex items-center justify-between border-b border-border/60 px-6 py-5">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-accent">Hidden Admin Feature</p>
                <h3 className="mt-2 font-display text-2xl font-semibold text-text">Portfolio System Console</h3>
                <p className="mt-1 text-sm text-muted">
                  Edit live content, add projects, and evolve the portfolio without changing code.
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-surface/70 text-text"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {!isAuthenticated ? (
              <div className="grid gap-8 px-6 py-8 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="rounded-[1.75rem] border border-border/60 bg-surface/70 p-6">
                  <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                    <Sparkles className="h-3.5 w-3.5" />
                    Differentiator Feature
                  </div>
                  <h4 className="mt-5 font-display text-2xl font-semibold text-text">
                    Built to show system thinking, not just styling.
                  </h4>
                  <p className="mt-4 max-w-xl text-sm leading-7 text-muted">
                    This hidden console demonstrates content architecture, role-based editing UX, and a mock secure
                    access layer recruiters can immediately recognize as product-minded engineering.
                  </p>

                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-3xl border border-border/60 bg-bg/70 p-4">
                      <p className="text-xs uppercase tracking-[0.24em] text-muted">Projects</p>
                      <p className="mt-2 font-display text-2xl font-semibold text-text">{projectCount}</p>
                      <p className="mt-1 text-sm text-muted">Editable portfolio case studies</p>
                    </div>
                    <div className="rounded-3xl border border-border/60 bg-bg/70 p-4">
                      <p className="text-xs uppercase tracking-[0.24em] text-muted">Skills</p>
                      <p className="mt-2 font-display text-2xl font-semibold text-text">{skillCount}</p>
                      <p className="mt-1 text-sm text-muted">Structured by category and level</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-[1.75rem] border border-border/60 bg-surface/70 p-6">
                  <div className="flex rounded-full border border-border/60 bg-bg/60 p-1">
                    <button
                      type="button"
                      onClick={() => setAuthMode("password")}
                      className={`flex-1 rounded-full px-4 py-2 text-sm ${authMode === "password" ? "bg-text text-bg" : "text-muted"}`}
                    >
                      Password
                    </button>
                    <button
                      type="button"
                      onClick={() => setAuthMode("otp")}
                      className={`flex-1 rounded-full px-4 py-2 text-sm ${authMode === "otp" ? "bg-text text-bg" : "text-muted"}`}
                    >
                      OTP
                    </button>
                  </div>

                  <div className="mt-6 space-y-4">
                    <div className="rounded-3xl border border-border/60 bg-bg/70 p-4 text-sm text-muted">
                      <p className="flex items-center gap-2 font-medium text-text">
                        <ShieldCheck className="h-4 w-4 text-accent" />
                        Demo credentials
                      </p>
                      <p className="mt-2">Password: system-architect</p>
                      <p className="mt-1">OTP: 2604 after requesting code</p>
                    </div>

                    {authMode === "password" ? (
                      <label className="block">
                        <span className="mb-2 block text-sm text-muted">Admin password</span>
                        <div className="flex items-center rounded-2xl border border-border/70 bg-bg/70 px-4">
                          <LockKeyhole className="h-4 w-4 text-muted" />
                          <input
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            type="password"
                            placeholder="Enter password"
                            className="w-full bg-transparent px-3 py-3 text-sm text-text outline-none"
                          />
                        </div>
                      </label>
                    ) : (
                      <div className="space-y-4">
                        <button
                          type="button"
                          onClick={() => setOtpSent(true)}
                          className="rounded-full border border-border/70 bg-bg px-4 py-2 text-sm font-medium text-text"
                        >
                          Send mock OTP
                        </button>
                        {otpSent ? (
                          <div className="rounded-2xl border border-accent/20 bg-accent/10 px-4 py-3 text-sm text-accent">
                            Demo OTP generated: {mockOtp}
                          </div>
                        ) : null}
                        <label className="block">
                          <span className="mb-2 block text-sm text-muted">Enter OTP</span>
                          <input
                            value={otp}
                            onChange={(event) => setOtp(event.target.value)}
                            placeholder="4-digit code"
                            className="w-full rounded-2xl border border-border/70 bg-bg/70 px-4 py-3 text-sm text-text outline-none"
                          />
                        </label>
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={authenticate}
                      className="w-full rounded-full bg-text px-5 py-3 text-sm font-semibold text-bg shadow-glow"
                    >
                      Enter Console
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="max-h-[calc(92vh-92px)] overflow-y-auto px-6 py-8">
                <div className="grid gap-8 xl:grid-cols-[0.8fr_1.2fr]">
                  <div className="space-y-5">
                    <div className="rounded-[1.5rem] border border-border/60 bg-surface/70 p-5">
                      <p className="text-xs uppercase tracking-[0.24em] text-muted">Content Ops</p>
                      <div className="mt-4 space-y-3">
                        <button
                          type="button"
                          onClick={saveChanges}
                          className="flex w-full items-center justify-center gap-2 rounded-full bg-text px-4 py-3 text-sm font-semibold text-bg"
                        >
                          <Save className="h-4 w-4" />
                          Save Live Changes
                        </button>
                        <button
                          type="button"
                          onClick={resetChanges}
                          className="flex w-full items-center justify-center gap-2 rounded-full border border-border/70 bg-bg px-4 py-3 text-sm font-medium text-text"
                        >
                          <RefreshCcw className="h-4 w-4" />
                          Reset Content
                        </button>
                      </div>
                    </div>

                    <div className="rounded-[1.5rem] border border-border/60 bg-surface/70 p-5">
                      <p className="text-xs uppercase tracking-[0.24em] text-muted">Quick Edit</p>
                      <div className="mt-4 space-y-4">
                        <label className="block">
                          <span className="mb-2 block text-sm text-muted">Short intro</span>
                          <textarea
                            rows={4}
                            value={draft.shortIntro}
                            onChange={(event) => updateField("shortIntro", event.target.value)}
                            className="w-full rounded-3xl border border-border/70 bg-bg/70 px-4 py-3 text-sm text-text outline-none"
                          />
                        </label>
                        <label className="block">
                          <span className="mb-2 block text-sm text-muted">Career goal</span>
                          <textarea
                            rows={4}
                            value={draft.careerGoal}
                            onChange={(event) => updateField("careerGoal", event.target.value)}
                            className="w-full rounded-3xl border border-border/70 bg-bg/70 px-4 py-3 text-sm text-text outline-none"
                          />
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div className="rounded-[1.5rem] border border-border/60 bg-surface/70 p-5">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs uppercase tracking-[0.24em] text-muted">Projects</p>
                          <h4 className="mt-2 font-display text-xl font-semibold text-text">
                            Add and update case studies
                          </h4>
                        </div>
                        <button
                          type="button"
                          onClick={() => updateField("projects", [...draft.projects, emptyProject])}
                          className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-bg px-4 py-2 text-sm font-medium text-text"
                        >
                          <Plus className="h-4 w-4" />
                          Add project
                        </button>
                      </div>

                      <div className="mt-5 space-y-5">
                        {draft.projects.map((project, index) => (
                          <div key={`${project.title}-${index}`} className="rounded-3xl border border-border/60 bg-bg/65 p-4">
                            <div className="grid gap-4 md:grid-cols-2">
                              <label className="block">
                                <span className="mb-2 block text-sm text-muted">Title</span>
                                <input
                                  value={project.title}
                                  onChange={(event) => updateProject(index, "title", event.target.value)}
                                  className="w-full rounded-2xl border border-border/70 bg-surface/80 px-4 py-3 text-sm text-text outline-none"
                                />
                              </label>
                              <label className="block">
                                <span className="mb-2 block text-sm text-muted">Strapline</span>
                                <input
                                  value={project.strapline}
                                  onChange={(event) => updateProject(index, "strapline", event.target.value)}
                                  className="w-full rounded-2xl border border-border/70 bg-surface/80 px-4 py-3 text-sm text-text outline-none"
                                />
                              </label>
                            </div>
                            <div className="mt-4 grid gap-4">
                              <label className="block">
                                <span className="mb-2 block text-sm text-muted">Problem</span>
                                <textarea
                                  rows={3}
                                  value={project.problem}
                                  onChange={(event) => updateProject(index, "problem", event.target.value)}
                                  className="w-full rounded-3xl border border-border/70 bg-surface/80 px-4 py-3 text-sm text-text outline-none"
                                />
                              </label>
                              <label className="block">
                                <span className="mb-2 block text-sm text-muted">Solution</span>
                                <textarea
                                  rows={3}
                                  value={project.solution}
                                  onChange={(event) => updateProject(index, "solution", event.target.value)}
                                  className="w-full rounded-3xl border border-border/70 bg-surface/80 px-4 py-3 text-sm text-text outline-none"
                                />
                              </label>
                              <label className="block">
                                <span className="mb-2 block text-sm text-muted">Outcome</span>
                                <textarea
                                  rows={3}
                                  value={project.outcome}
                                  onChange={(event) => updateProject(index, "outcome", event.target.value)}
                                  className="w-full rounded-3xl border border-border/70 bg-surface/80 px-4 py-3 text-sm text-text outline-none"
                                />
                              </label>
                              <label className="block">
                                <span className="mb-2 block text-sm text-muted">Tech stack</span>
                                <input
                                  value={project.tech.join(", ")}
                                  onChange={(event) =>
                                    updateProject(
                                      index,
                                      "tech",
                                      event.target.value
                                        .split(",")
                                        .map((item) => item.trim())
                                        .filter(Boolean)
                                    )
                                  }
                                  className="w-full rounded-2xl border border-border/70 bg-surface/80 px-4 py-3 text-sm text-text outline-none"
                                />
                              </label>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-[1.5rem] border border-border/60 bg-surface/70 p-5">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs uppercase tracking-[0.24em] text-muted">Skills</p>
                          <h4 className="mt-2 font-display text-xl font-semibold text-text">Update strengths in place</h4>
                        </div>
                      </div>

                      <div className="mt-5 space-y-5">
                        {draft.skills.map((category, categoryIndex) => (
                          <div key={category.title} className="rounded-3xl border border-border/60 bg-bg/65 p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-display text-lg font-semibold text-text">{category.title}</p>
                                <p className="mt-1 text-sm text-muted">{category.description}</p>
                              </div>
                              <button
                                type="button"
                                onClick={() =>
                                  setDraft((current) => ({
                                    ...current,
                                    skills: current.skills.map((item, index) =>
                                      index === categoryIndex ? { ...item, items: [...item.items, emptySkill] } : item
                                    )
                                  }))
                                }
                                className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-surface/80 px-3 py-2 text-xs font-medium text-text"
                              >
                                <Plus className="h-3.5 w-3.5" />
                                Add skill
                              </button>
                            </div>
                            <div className="mt-4 grid gap-3">
                              {category.items.map((skill, skillIndex) => (
                                <div key={`${skill.name}-${skillIndex}`} className="grid gap-3 md:grid-cols-[1fr_100px_1.1fr]">
                                  <input
                                    value={skill.name}
                                    onChange={(event) =>
                                      updateSkill(categoryIndex, skillIndex, "name", event.target.value)
                                    }
                                    className="rounded-2xl border border-border/70 bg-surface/80 px-4 py-3 text-sm text-text outline-none"
                                  />
                                  <input
                                    type="number"
                                    min={0}
                                    max={100}
                                    value={skill.level}
                                    onChange={(event) =>
                                      updateSkill(categoryIndex, skillIndex, "level", Number(event.target.value))
                                    }
                                    className="rounded-2xl border border-border/70 bg-surface/80 px-4 py-3 text-sm text-text outline-none"
                                  />
                                  <input
                                    value={skill.note ?? ""}
                                    onChange={(event) =>
                                      updateSkill(categoryIndex, skillIndex, "note", event.target.value)
                                    }
                                    className="rounded-2xl border border-border/70 bg-surface/80 px-4 py-3 text-sm text-text outline-none"
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
