"use client";

import Link from "next/link";
import { ArrowLeft, CheckCircle2, Mail, Phone } from "lucide-react";

import { usePortfolio } from "@/components/providers/portfolio-provider";
import { ResumeDownloadButton } from "@/components/ui/resume-download-button";

export function ResumeShell() {
  const { portfolio } = usePortfolio();
  const contactLinks = [portfolio.contact.linkedin, portfolio.contact.github].filter(Boolean) as string[];

  return (
    <main className="min-h-screen px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-muted transition hover:text-text">
            <ArrowLeft className="h-4 w-4" />
            Back to portfolio
          </Link>
          <ResumeDownloadButton />
        </div>

        <article className="overflow-hidden rounded-[2rem] border border-border/70 bg-white p-8 shadow-2xl shadow-black/10 sm:p-12">
          <header className="border-b border-slate-200 pb-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <h1 className="font-display text-4xl font-semibold text-slate-950">
                  {portfolio.fullName || portfolio.name}
                </h1>
                <p className="mt-3 text-lg font-medium text-slate-700">{portfolio.role}</p>
                <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">
                  {portfolio.professionalIdentity}
                </p>
              </div>
              <div className="space-y-3 text-sm text-slate-600">
                {portfolio.contact.emails.map((email) => (
                  <p key={email} className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    {email}
                  </p>
                ))}
                <p className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  {portfolio.contact.phone}
                </p>
                <p>{portfolio.contact.location}</p>
                {portfolio.contact.addressLines?.map((line) => (
                  <p key={line}>{line}</p>
                ))}
                {contactLinks.map((link) => (
                  <p key={link}>{link.replace("https://", "")}</p>
                ))}
              </div>
            </div>
          </header>

          <section className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-8">
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-700">
                  Summary
                </h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">{portfolio.heroBlurb}</p>
              </div>

              <div>
                <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-700">
                  Experience
                </h2>
                <div className="mt-4 space-y-6">
                  {portfolio.experience.map((item) => (
                    <div key={`${item.role}-${item.company}`}>
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <h3 className="text-base font-semibold text-slate-900">{item.role}</h3>
                          <p className="text-sm text-slate-700">{item.company}</p>
                        </div>
                        <p className="text-xs uppercase tracking-[0.16em] text-slate-500">{item.duration}</p>
                      </div>
                      <p className="mt-3 text-sm leading-7 text-slate-600">{item.summary}</p>
                      <ul className="mt-3 space-y-2">
                        {item.highlights.map((highlight) => (
                          <li key={highlight} className="flex gap-2 text-sm leading-7 text-slate-600">
                            <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-sky-600" />
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-700">
                  Projects
                </h2>
                <div className="mt-4 space-y-5">
                  {portfolio.projects.map((project) => (
                    <div key={project.title}>
                      <h3 className="text-base font-semibold text-slate-900">{project.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-slate-600">
                        {project.solution}
                      </p>
                      <p className="mt-2 text-sm leading-7 text-slate-600">
                        Outcome: {project.outcome}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-700">
                  Skills
                </h2>
                <div className="mt-4 space-y-4">
                  {portfolio.skills.map((category) => (
                    <div key={category.title}>
                      <h3 className="text-sm font-semibold text-slate-900">{category.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-slate-600">
                        {category.items.map((item) => item.name).join(", ")}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-700">
                  Certifications & Achievements
                </h2>
                <div className="mt-4 space-y-3">
                  {portfolio.certifications.map((certification) => (
                    <div key={certification.title}>
                      <h3 className="text-sm font-semibold text-slate-900">
                        {certification.title}
                      </h3>
                      <p className="mt-1 text-sm leading-7 text-slate-600">
                        {certification.issuer} | {certification.note}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-700">
                  Career Goal
                </h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">{portfolio.careerGoal}</p>
              </div>
            </div>
          </section>
        </article>
      </div>
    </main>
  );
}
