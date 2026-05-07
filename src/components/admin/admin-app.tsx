"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { HomeContent, InquiryRow } from "@/lib/cms/types";

function TabButton(props: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={props.onClick}
      className={`rounded-full px-5 py-2 text-xs font-black uppercase tracking-[0.2em] transition ${
        props.active
          ? "bg-sky-400 text-stone-950"
          : "border border-white/15 bg-white/5 text-stone-300 hover:border-white/25"
      }`}
    >
      {props.children}
    </button>
  );
}

function Field(props: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="grid gap-2 text-xs font-bold uppercase tracking-[0.18em] text-stone-400">
      {props.label}
      {props.children}
    </label>
  );
}

export function AdminApp(props: {
  initialContent: HomeContent;
  initialInquiries: InquiryRow[];
}) {
  const router = useRouter();
  const [tab, setTab] = useState<"sections" | "inbox">("sections");
  const [draft, setDraft] = useState<HomeContent>(props.initialContent);
  const [navJson, setNavJson] = useState(() =>
    JSON.stringify(props.initialContent.navItems, null, 2),
  );
  const [cardsJson, setCardsJson] = useState(() =>
    JSON.stringify(props.initialContent.products.cards, null, 2),
  );
  const [galleryJson, setGalleryJson] = useState(() =>
    JSON.stringify(props.initialContent.gallery.images, null, 2),
  );
  const [servicesJson, setServicesJson] = useState(() =>
    JSON.stringify(props.initialContent.services.items, null, 2),
  );
  const [phonesJson, setPhonesJson] = useState(() =>
    JSON.stringify(props.initialContent.contact.phones, null, 2),
  );
  const [emailsJson, setEmailsJson] = useState(() =>
    JSON.stringify(props.initialContent.contact.emails, null, 2),
  );
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  function resetDraft() {
    setDraft(props.initialContent);
    setNavJson(JSON.stringify(props.initialContent.navItems, null, 2));
    setCardsJson(JSON.stringify(props.initialContent.products.cards, null, 2));
    setGalleryJson(JSON.stringify(props.initialContent.gallery.images, null, 2));
    setServicesJson(JSON.stringify(props.initialContent.services.items, null, 2));
    setPhonesJson(JSON.stringify(props.initialContent.contact.phones, null, 2));
    setEmailsJson(JSON.stringify(props.initialContent.contact.emails, null, 2));
    setSaveMessage(null);
    setSaveError(null);
  }

  async function saveSections() {
    setSaving(true);
    setSaveMessage(null);
    setSaveError(null);
    try {
      const navItems = JSON.parse(navJson) as HomeContent["navItems"];
      const cards = JSON.parse(cardsJson) as HomeContent["products"]["cards"];
      const images = JSON.parse(galleryJson) as HomeContent["gallery"]["images"];
      const items = JSON.parse(servicesJson) as HomeContent["services"]["items"];
      const phones = JSON.parse(phonesJson) as HomeContent["contact"]["phones"];
      const emails = JSON.parse(emailsJson) as HomeContent["contact"]["emails"];
      const payload: HomeContent = {
        ...draft,
        navItems,
        products: { ...draft.products, cards },
        gallery: { ...draft.gallery, images },
        services: { ...draft.services, items },
        contact: { ...draft.contact, phones, emails },
      };
      const res = await fetch("/api/admin/site", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = (await res.json().catch(() => null)) as {
        error?: string;
      } | null;
      if (!res.ok) {
        throw new Error(body?.error ?? "Save failed.");
      }
      setDraft(payload);
      setNavJson(JSON.stringify(navItems, null, 2));
      setCardsJson(JSON.stringify(cards, null, 2));
      setGalleryJson(JSON.stringify(images, null, 2));
      setServicesJson(JSON.stringify(items, null, 2));
      setPhonesJson(JSON.stringify(phones, null, 2));
      setEmailsJson(JSON.stringify(emails, null, 2));
      setSaveMessage("Saved. Refresh the public site to verify.");
    } catch (err) {
      setSaveError(
        err instanceof Error
          ? err.message
          : "Could not save. Check JSON blocks for syntax errors.",
      );
    } finally {
      setSaving(false);
    }
  }

  async function toggleRead(inquiry: InquiryRow, read: boolean) {
    const res = await fetch("/api/admin/inquiries", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: inquiry.id, read }),
    });
    if (!res.ok) {
      setSaveError("Could not update inquiry.");
      return;
    }
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-stone-950 px-5 py-12 text-white sm:px-10">
      <div className="mx-auto flex max-w-5xl flex-col gap-8">
        <header className="flex flex-col gap-4 border-b border-white/10 pb-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.3em] text-sky-300">
              Design Werks
            </p>
            <h1 className="mt-2 text-3xl font-black uppercase tracking-tight">
              Lightweight CMS
            </h1>
            <p className="mt-2 max-w-xl text-sm text-stone-400">
              Edit homepage sections or review inquiry inbox. Access is limited to
              Supabase users listed in{" "}
              <span className="font-semibold text-stone-200">dw_site_admins</span>{" "}
              for this deployment&apos;s{" "}
              <span className="font-semibold text-stone-200">SITE_SLUG</span>
              — not every user on the shared database.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <TabButton active={tab === "sections"} onClick={() => setTab("sections")}>
              Sections
            </TabButton>
            <TabButton active={tab === "inbox"} onClick={() => setTab("inbox")}>
              Inbox
            </TabButton>
            <button
              type="button"
              onClick={() => void logout()}
              className="rounded-full border border-white/15 px-5 py-2 text-xs font-black uppercase tracking-[0.2em] text-stone-300 hover:border-white/25"
            >
              Log out
            </button>
          </div>
        </header>

        {tab === "sections" ? (
          <div className="grid gap-10 rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 shadow-inner shadow-black/40">
            <section className="grid gap-4">
              <p className="text-[11px] font-black uppercase tracking-[0.28em] text-sky-300">
                Header & navigation
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Phone display">
                  <input
                    className="rounded-xl border border-white/10 bg-stone-900 px-3 py-2 text-sm font-normal normal-case tracking-normal text-white outline-none focus:border-sky-400"
                    value={draft.header.phoneDisplay}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        header: { ...draft.header, phoneDisplay: e.target.value },
                      })
                    }
                  />
                </Field>
                <Field label="Phone link (tel:)">
                  <input
                    className="rounded-xl border border-white/10 bg-stone-900 px-3 py-2 text-sm font-normal normal-case tracking-normal text-white outline-none focus:border-sky-400"
                    value={draft.header.phoneHref}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        header: { ...draft.header, phoneHref: e.target.value },
                      })
                    }
                  />
                </Field>
              </div>
              <Field label="Navigation JSON">
                <textarea
                  className="min-h-[140px] rounded-xl border border-white/10 bg-stone-950 px-3 py-2 font-mono text-xs leading-relaxed text-emerald-100 outline-none focus:border-sky-400"
                  value={navJson}
                  onChange={(e) => setNavJson(e.target.value)}
                />
              </Field>
            </section>

            <section className="grid gap-4">
              <p className="text-[11px] font-black uppercase tracking-[0.28em] text-sky-300">
                Hero
              </p>
              <Field label="Kicker">
                <input
                  className="rounded-xl border border-white/10 bg-stone-900 px-3 py-2 text-sm font-normal normal-case tracking-normal text-white outline-none focus:border-sky-400"
                  value={draft.hero.kicker}
                  onChange={(e) =>
                    setDraft({ ...draft, hero: { ...draft.hero, kicker: e.target.value } })
                  }
                />
              </Field>
              <Field label="Title">
                <textarea
                  className="min-h-[90px] rounded-xl border border-white/10 bg-stone-900 px-3 py-2 text-sm font-normal normal-case tracking-normal text-white outline-none focus:border-sky-400"
                  value={draft.hero.title}
                  onChange={(e) =>
                    setDraft({ ...draft, hero: { ...draft.hero, title: e.target.value } })
                  }
                />
              </Field>
              <Field label="Subtitle">
                <textarea
                  className="min-h-[110px] rounded-xl border border-white/10 bg-stone-900 px-3 py-2 text-sm font-normal normal-case tracking-normal text-white outline-none focus:border-sky-400"
                  value={draft.hero.subtitle}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      hero: { ...draft.hero, subtitle: e.target.value },
                    })
                  }
                />
              </Field>
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Primary button">
                  <input
                    className="rounded-xl border border-white/10 bg-stone-900 px-3 py-2 text-sm font-normal normal-case tracking-normal text-white outline-none focus:border-sky-400"
                    value={draft.hero.primaryCtaLabel}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        hero: { ...draft.hero, primaryCtaLabel: e.target.value },
                      })
                    }
                  />
                </Field>
                <Field label="Secondary button">
                  <input
                    className="rounded-xl border border-white/10 bg-stone-900 px-3 py-2 text-sm font-normal normal-case tracking-normal text-white outline-none focus:border-sky-400"
                    value={draft.hero.secondaryCtaLabel}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        hero: { ...draft.hero, secondaryCtaLabel: e.target.value },
                      })
                    }
                  />
                </Field>
              </div>
            </section>

            <section className="grid gap-4">
              <p className="text-[11px] font-black uppercase tracking-[0.28em] text-sky-300">
                About
              </p>
              <Field label="Eyebrow label">
                <input
                  className="rounded-xl border border-white/10 bg-stone-900 px-3 py-2 text-sm font-normal normal-case tracking-normal text-white outline-none focus:border-sky-400"
                  value={draft.about.label}
                  onChange={(e) =>
                    setDraft({ ...draft, about: { ...draft.about, label: e.target.value } })
                  }
                />
              </Field>
              <Field label="Headline">
                <textarea
                  className="min-h-[80px] rounded-xl border border-white/10 bg-stone-900 px-3 py-2 text-sm font-normal normal-case tracking-normal text-white outline-none focus:border-sky-400"
                  value={draft.about.headline}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      about: { ...draft.about, headline: e.target.value },
                    })
                  }
                />
              </Field>
              <Field label="Paragraphs (one per block)">
                <textarea
                  className="min-h-[140px] rounded-xl border border-white/10 bg-stone-900 px-3 py-2 text-sm font-normal normal-case tracking-normal text-white outline-none focus:border-sky-400"
                  value={draft.about.paragraphs.join("\n\n")}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      about: {
                        ...draft.about,
                        paragraphs: e.target.value
                          .split(/\n\s*\n/)
                          .map((p) => p.trim())
                          .filter(Boolean),
                      },
                    })
                  }
                />
              </Field>
            </section>

            <section className="grid gap-4">
              <p className="text-[11px] font-black uppercase tracking-[0.28em] text-sky-300">
                Products
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Eyebrow label">
                  <input
                    className="rounded-xl border border-white/10 bg-stone-900 px-3 py-2 text-sm font-normal normal-case tracking-normal text-white outline-none focus:border-sky-400"
                    value={draft.products.label}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        products: { ...draft.products, label: e.target.value },
                      })
                    }
                  />
                </Field>
                <Field label="Intro paragraph">
                  <textarea
                    className="min-h-[90px] rounded-xl border border-white/10 bg-stone-900 px-3 py-2 text-sm font-normal normal-case tracking-normal text-white outline-none focus:border-sky-400"
                    value={draft.products.blurb}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        products: { ...draft.products, blurb: e.target.value },
                      })
                    }
                  />
                </Field>
              </div>
              <Field label="Section headline">
                <textarea
                  className="min-h-[80px] rounded-xl border border-white/10 bg-stone-900 px-3 py-2 text-sm font-normal normal-case tracking-normal text-white outline-none focus:border-sky-400"
                  value={draft.products.headline}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      products: { ...draft.products, headline: e.target.value },
                    })
                  }
                />
              </Field>
              <Field label="Product cards JSON">
                <textarea
                  className="min-h-[220px] rounded-xl border border-white/10 bg-stone-950 px-3 py-2 font-mono text-xs leading-relaxed text-emerald-100 outline-none focus:border-sky-400"
                  value={cardsJson}
                  onChange={(e) => setCardsJson(e.target.value)}
                />
              </Field>
            </section>

            <section className="grid gap-4">
              <p className="text-[11px] font-black uppercase tracking-[0.28em] text-sky-300">
                Gallery
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Eyebrow label">
                  <input
                    className="rounded-xl border border-white/10 bg-stone-900 px-3 py-2 text-sm font-normal normal-case tracking-normal text-white outline-none focus:border-sky-400"
                    value={draft.gallery.label}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        gallery: { ...draft.gallery, label: e.target.value },
                      })
                    }
                  />
                </Field>
                <Field label="Quote link label">
                  <input
                    className="rounded-xl border border-white/10 bg-stone-900 px-3 py-2 text-sm font-normal normal-case tracking-normal text-white outline-none focus:border-sky-400"
                    value={draft.gallery.ctaLabel}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        gallery: { ...draft.gallery, ctaLabel: e.target.value },
                      })
                    }
                  />
                </Field>
              </div>
              <Field label="Section headline">
                <textarea
                  className="min-h-[80px] rounded-xl border border-white/10 bg-stone-900 px-3 py-2 text-sm font-normal normal-case tracking-normal text-white outline-none focus:border-sky-400"
                  value={draft.gallery.headline}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      gallery: { ...draft.gallery, headline: e.target.value },
                    })
                  }
                />
              </Field>
              <Field label="Gallery images JSON">
                <textarea
                  className="min-h-[220px] rounded-xl border border-white/10 bg-stone-950 px-3 py-2 font-mono text-xs leading-relaxed text-emerald-100 outline-none focus:border-sky-400"
                  value={galleryJson}
                  onChange={(e) => setGalleryJson(e.target.value)}
                />
              </Field>
            </section>

            <section className="grid gap-4">
              <p className="text-[11px] font-black uppercase tracking-[0.28em] text-sky-300">
                Services
              </p>
              <Field label="Eyebrow label">
                <input
                  className="rounded-xl border border-white/10 bg-stone-900 px-3 py-2 text-sm font-normal normal-case tracking-normal text-white outline-none focus:border-sky-400"
                  value={draft.services.label}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      services: { ...draft.services, label: e.target.value },
                    })
                  }
                />
              </Field>
              <Field label="Section headline">
                <textarea
                  className="min-h-[90px] rounded-xl border border-white/10 bg-stone-900 px-3 py-2 text-sm font-normal normal-case tracking-normal text-white outline-none focus:border-sky-400"
                  value={draft.services.headline}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      services: { ...draft.services, headline: e.target.value },
                    })
                  }
                />
              </Field>
              <Field label="Service cards JSON">
                <textarea
                  className="min-h-[220px] rounded-xl border border-white/10 bg-stone-950 px-3 py-2 font-mono text-xs leading-relaxed text-emerald-100 outline-none focus:border-sky-400"
                  value={servicesJson}
                  onChange={(e) => setServicesJson(e.target.value)}
                />
              </Field>
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Delivery eyebrow">
                  <input
                    className="rounded-xl border border-white/10 bg-stone-900 px-3 py-2 text-sm font-normal normal-case tracking-normal text-white outline-none focus:border-sky-400"
                    value={draft.services.deliveryTitle}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        services: {
                          ...draft.services,
                          deliveryTitle: e.target.value,
                        },
                      })
                    }
                  />
                </Field>
              </div>
              <Field label="Delivery copy">
                <textarea
                  className="min-h-[90px] rounded-xl border border-white/10 bg-stone-900 px-3 py-2 text-sm font-normal normal-case tracking-normal text-white outline-none focus:border-sky-400"
                  value={draft.services.deliveryBody}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      services: { ...draft.services, deliveryBody: e.target.value },
                    })
                  }
                />
              </Field>
            </section>

            <section className="grid gap-4">
              <p className="text-[11px] font-black uppercase tracking-[0.28em] text-sky-300">
                Contact & footer
              </p>
              <Field label="Eyebrow label">
                <input
                  className="rounded-xl border border-white/10 bg-stone-900 px-3 py-2 text-sm font-normal normal-case tracking-normal text-white outline-none focus:border-sky-400"
                  value={draft.contact.label}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      contact: { ...draft.contact, label: e.target.value },
                    })
                  }
                />
              </Field>
              <Field label="Section headline">
                <textarea
                  className="min-h-[80px] rounded-xl border border-white/10 bg-stone-900 px-3 py-2 text-sm font-normal normal-case tracking-normal text-white outline-none focus:border-sky-400"
                  value={draft.contact.headline}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      contact: { ...draft.contact, headline: e.target.value },
                    })
                  }
                />
              </Field>
              <Field label="Address lines (one per line)">
                <textarea
                  className="min-h-[90px] rounded-xl border border-white/10 bg-stone-900 px-3 py-2 text-sm font-normal normal-case tracking-normal text-white outline-none focus:border-sky-400"
                  value={draft.contact.addressLines.join("\n")}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      contact: {
                        ...draft.contact,
                        addressLines: e.target.value
                          .split("\n")
                          .map((line) => line.trim())
                          .filter(Boolean),
                      },
                    })
                  }
                />
              </Field>
              <Field label="Phones JSON">
                <textarea
                  className="min-h-[120px] rounded-xl border border-white/10 bg-stone-950 px-3 py-2 font-mono text-xs leading-relaxed text-emerald-100 outline-none focus:border-sky-400"
                  value={phonesJson}
                  onChange={(e) => setPhonesJson(e.target.value)}
                />
              </Field>
              <Field label="Emails JSON">
                <textarea
                  className="min-h-[120px] rounded-xl border border-white/10 bg-stone-950 px-3 py-2 font-mono text-xs leading-relaxed text-emerald-100 outline-none focus:border-sky-400"
                  value={emailsJson}
                  onChange={(e) => setEmailsJson(e.target.value)}
                />
              </Field>
              <Field label="Footer copyright">
                <textarea
                  className="min-h-[70px] rounded-xl border border-white/10 bg-stone-900 px-3 py-2 text-sm font-normal normal-case tracking-normal text-white outline-none focus:border-sky-400"
                  value={draft.footer.copyright}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      footer: { ...draft.footer, copyright: e.target.value },
                    })
                  }
                />
              </Field>
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Facebook label">
                  <input
                    className="rounded-xl border border-white/10 bg-stone-900 px-3 py-2 text-sm font-normal normal-case tracking-normal text-white outline-none focus:border-sky-400"
                    value={draft.footer.facebookLabel}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        footer: { ...draft.footer, facebookLabel: e.target.value },
                      })
                    }
                  />
                </Field>
                <Field label="Facebook URL">
                  <input
                    className="rounded-xl border border-white/10 bg-stone-900 px-3 py-2 text-sm font-normal normal-case tracking-normal text-white outline-none focus:border-sky-400"
                    value={draft.footer.facebookUrl}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        footer: { ...draft.footer, facebookUrl: e.target.value },
                      })
                    }
                  />
                </Field>
              </div>
            </section>

            <div className="flex flex-col gap-4 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">
              <div className="space-y-2 text-sm text-stone-400">
                {saveMessage ? (
                  <p className="font-semibold text-emerald-300">{saveMessage}</p>
                ) : null}
                {saveError ? (
                  <p className="font-semibold text-red-300">{saveError}</p>
                ) : null}
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={resetDraft}
                  className="rounded-full border border-white/15 px-6 py-3 text-xs font-black uppercase tracking-[0.2em] text-stone-200 hover:border-white/30"
                >
                  Reset
                </button>
                <button
                  type="button"
                  disabled={saving}
                  onClick={() => void saveSections()}
                  className="rounded-full bg-sky-400 px-8 py-3 text-xs font-black uppercase tracking-[0.2em] text-stone-950 transition hover:bg-sky-300 disabled:opacity-50"
                >
                  {saving ? "Saving…" : "Save homepage"}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid gap-4 rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 shadow-inner shadow-black/40">
            {props.initialInquiries.length === 0 ? (
              <p className="text-sm text-stone-400">
                No inquiries yet — submissions will land here once Supabase is
                configured and the contact form posts successfully.
              </p>
            ) : (
              props.initialInquiries.map((row) => (
                <article
                  key={row.id}
                  className={`rounded-2xl border px-5 py-4 ${
                    row.read_at
                      ? "border-white/10 bg-stone-900/40"
                      : "border-sky-400/40 bg-sky-400/5"
                  }`}
                >
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.25em] text-stone-500">
                        {new Date(row.created_at).toLocaleString()}
                      </p>
                      <p className="mt-2 text-lg font-bold text-white">{row.name}</p>
                      <a
                        className="text-sm font-semibold text-sky-300 hover:text-sky-200"
                        href={`mailto:${row.email}`}
                      >
                        {row.email}
                      </a>
                    </div>
                    <button
                      type="button"
                      onClick={() => void toggleRead(row, !row.read_at)}
                      className="self-start rounded-full border border-white/15 px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-stone-200 hover:border-white/30"
                    >
                      {row.read_at ? "Mark unread" : "Mark read"}
                    </button>
                  </div>
                  <p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-stone-200">
                    {row.message}
                  </p>
                </article>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
