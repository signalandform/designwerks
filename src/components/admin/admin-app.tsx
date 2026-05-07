"use client";

import { useState } from "react";
import type {
  ContactEmail,
  ContactPhone,
  GalleryImage,
  HomeContent,
  NavItem,
  ProductCard,
  ServiceItem,
} from "@/lib/cms/types";

const inputClass =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-[#C73A34]/35 focus:ring-offset-0";
const textareaClass =
  `${inputClass} min-h-[88px] resize-y py-3 leading-relaxed`;

function cloneContent(c: HomeContent): HomeContent {
  return structuredClone(c);
}

function Field(props: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-2">
      <label className="text-sm font-medium text-slate-700">{props.label}</label>
      {props.hint ? (
        <p className="-mt-1 text-xs leading-relaxed text-slate-500">{props.hint}</p>
      ) : null}
      {props.children}
    </div>
  );
}

function EditorSection(props: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold tracking-tight text-slate-900">
        {props.title}
      </h2>
      {props.description ? (
        <p className="mt-1.5 max-w-3xl text-sm leading-relaxed text-slate-500">
          {props.description}
        </p>
      ) : null}
      <div className="mt-6 grid gap-5">{props.children}</div>
    </section>
  );
}

const ghostBtnClass =
  "rounded-lg border border-slate-300 px-3 py-2 text-xs font-medium text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-50";
const dangerGhostBtnClass =
  "rounded-lg border border-red-200 px-3 py-2 text-xs font-medium text-[#C73A34] transition-colors hover:bg-red-50";

function NavLinksEditor(props: {
  items: NavItem[];
  onChange: (items: NavItem[]) => void;
}) {
  return (
    <Field
      label="Menu links"
      hint="Each row is one item in the top navigation. Use anchors like #contact so links scroll on the homepage."
    >
      <div className="grid gap-3">
        {props.items.map((item, index) => (
          <div
            key={`nav-${index}`}
            className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:flex-wrap sm:items-end"
          >
            <div className="min-w-[140px] flex-1">
              <span className="mb-1.5 block text-xs text-slate-500">Button text</span>
              <input
                className={inputClass}
                value={item.label}
                placeholder="e.g. Contact"
                onChange={(e) => {
                  const next = [...props.items];
                  next[index] = { ...item, label: e.target.value };
                  props.onChange(next);
                }}
              />
            </div>
            <div className="min-w-[160px] flex-1">
              <span className="mb-1.5 block text-xs text-slate-500">
                Goes to (page anchor)
              </span>
              <input
                className={`${inputClass} font-mono text-xs`}
                value={item.href}
                placeholder="e.g. #contact"
                onChange={(e) => {
                  const next = [...props.items];
                  next[index] = { ...item, href: e.target.value };
                  props.onChange(next);
                }}
              />
            </div>
            <button
              type="button"
              className={dangerGhostBtnClass}
              onClick={() =>
                props.onChange(props.items.filter((_, i) => i !== index))
              }
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          className={`${ghostBtnClass} w-fit`}
          onClick={() =>
            props.onChange([...props.items, { label: "New link", href: "#" }])
          }
        >
          + Add menu link
        </button>
      </div>
    </Field>
  );
}

function ProductCardsEditor(props: {
  cards: ProductCard[];
  onChange: (cards: ProductCard[]) => void;
}) {
  return (
    <Field
      label="Product tiles"
      hint="These appear in the Products section and in the hero photo grid. Image path is under public/, e.g. /assets/photo.jpg."
    >
      <div className="grid gap-4">
        {props.cards.map((card, index) => (
          <div
            key={`card-${index}`}
            className="grid gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 md:grid-cols-[1fr_1fr_auto]"
          >
            <Field label="Title">
              <input
                className={inputClass}
                value={card.title}
                placeholder="e.g. Vehicle wraps"
                onChange={(e) => {
                  const next = [...props.cards];
                  next[index] = { ...card, title: e.target.value };
                  props.onChange(next);
                }}
              />
            </Field>
            <Field
              label="Image file path"
              hint="Starts with /assets/…"
            >
              <input
                className={`${inputClass} font-mono text-xs`}
                value={card.image}
                placeholder="/assets/example.jpg"
                onChange={(e) => {
                  const next = [...props.cards];
                  next[index] = { ...card, image: e.target.value };
                  props.onChange(next);
                }}
              />
            </Field>
            <div className="flex items-end md:justify-end">
              <button
                type="button"
                className={dangerGhostBtnClass}
                onClick={() =>
                  props.onChange(props.cards.filter((_, i) => i !== index))
                }
              >
                Remove
              </button>
            </div>
            <div className="md:col-span-2">
              <Field
                label="Image description (accessibility)"
                hint="Short description for screen readers and SEO."
              >
                <input
                  className={inputClass}
                  value={card.alt}
                  placeholder="What’s in the photo?"
                  onChange={(e) => {
                    const next = [...props.cards];
                    next[index] = { ...card, alt: e.target.value };
                    props.onChange(next);
                  }}
                />
              </Field>
            </div>
          </div>
        ))}
        <button
          type="button"
          className={`${ghostBtnClass} w-fit`}
          onClick={() =>
            props.onChange([
              ...props.cards,
              { title: "", image: "/assets/", alt: "" },
            ])
          }
        >
          + Add product tile
        </button>
      </div>
    </Field>
  );
}

function GalleryImagesEditor(props: {
  images: GalleryImage[];
  onChange: (images: GalleryImage[]) => void;
}) {
  return (
    <Field
      label="Gallery photos"
      hint="Order matches left-to-right on the site. Same path rules as product images."
    >
      <div className="grid gap-3">
        {props.images.map((img, index) => (
          <div
            key={`g-${index}`}
            className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 lg:flex-row lg:items-end"
          >
            <div className="min-w-0 flex-1">
              <span className="mb-1.5 block text-xs text-slate-500">Image path</span>
              <input
                className={`${inputClass} font-mono text-xs`}
                value={img.src}
                placeholder="/assets/gallery-1.jpg"
                onChange={(e) => {
                  const next = [...props.images];
                  next[index] = { ...img, src: e.target.value };
                  props.onChange(next);
                }}
              />
            </div>
            <div className="min-w-0 flex-[1.2]">
              <span className="mb-1.5 block text-xs text-slate-500">
                Description (accessibility)
              </span>
              <input
                className={inputClass}
                value={img.alt}
                placeholder="Describe the photo"
                onChange={(e) => {
                  const next = [...props.images];
                  next[index] = { ...img, alt: e.target.value };
                  props.onChange(next);
                }}
              />
            </div>
            <button
              type="button"
              className={`${dangerGhostBtnClass} shrink-0`}
              onClick={() =>
                props.onChange(props.images.filter((_, i) => i !== index))
              }
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          className={`${ghostBtnClass} w-fit`}
          onClick={() =>
            props.onChange([...props.images, { src: "", alt: "" }])
          }
        >
          + Add gallery photo
        </button>
      </div>
    </Field>
  );
}

function ServicesEditor(props: {
  items: ServiceItem[];
  onChange: (items: ServiceItem[]) => void;
}) {
  return (
    <Field
      label="Service blocks"
      hint="Three columns on desktop — short title plus a short paragraph each."
    >
      <div className="grid gap-4">
        {props.items.map((item, index) => (
          <div
            key={`svc-${index}`}
            className="rounded-xl border border-slate-200 bg-slate-50 p-4"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <Field label="Service name" hint="e.g. Graphic design">
                <input
                  className={inputClass}
                  value={item.title}
                  onChange={(e) => {
                    const next = [...props.items];
                    next[index] = { ...item, title: e.target.value };
                    props.onChange(next);
                  }}
                />
              </Field>
              <button
                type="button"
                className={`${dangerGhostBtnClass} shrink-0 sm:mt-7`}
                onClick={() =>
                  props.onChange(props.items.filter((_, i) => i !== index))
                }
              >
                Remove
              </button>
            </div>
            <div className="mt-4">
              <Field label="Description">
                <textarea
                  className={textareaClass}
                  rows={4}
                  value={item.description}
                  onChange={(e) => {
                    const next = [...props.items];
                    next[index] = { ...item, description: e.target.value };
                    props.onChange(next);
                  }}
                />
              </Field>
            </div>
          </div>
        ))}
        <button
          type="button"
          className={`${ghostBtnClass} w-fit`}
          onClick={() =>
            props.onChange([
              ...props.items,
              { title: "", description: "" },
            ])
          }
        >
          + Add service
        </button>
      </div>
    </Field>
  );
}

function PhonesEditor(props: {
  phones: ContactPhone[];
  onChange: (phones: ContactPhone[]) => void;
}) {
  return (
    <Field
      label="Phone numbers"
      hint="Shown as clickable links. Link value is usually tel: with digits only, e.g. tel:8174219422."
    >
      <div className="grid gap-3">
        {props.phones.map((phone, index) => (
          <div
            key={`ph-${index}`}
            className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:flex-wrap sm:items-end"
          >
            <div className="min-w-[140px] flex-1">
              <span className="mb-1.5 block text-xs text-slate-500">
                Number visitors see
              </span>
              <input
                className={inputClass}
                value={phone.display}
                placeholder="817-421-9422"
                onChange={(e) => {
                  const next = [...props.phones];
                  next[index] = { ...phone, display: e.target.value };
                  props.onChange(next);
                }}
              />
            </div>
            <div className="min-w-[180px] flex-1">
              <span className="mb-1.5 block text-xs text-slate-500">
                Tap-to-call link
              </span>
              <input
                className={`${inputClass} font-mono text-xs`}
                value={phone.href}
                placeholder="tel:8174219422"
                onChange={(e) => {
                  const next = [...props.phones];
                  next[index] = { ...phone, href: e.target.value };
                  props.onChange(next);
                }}
              />
            </div>
            <button
              type="button"
              className={dangerGhostBtnClass}
              onClick={() =>
                props.onChange(props.phones.filter((_, i) => i !== index))
              }
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          className={`${ghostBtnClass} w-fit`}
          onClick={() =>
            props.onChange([
              ...props.phones,
              { display: "", href: "tel:" },
            ])
          }
        >
          + Add phone
        </button>
      </div>
    </Field>
  );
}

function mailtoHref(address: string): string {
  const t = address.trim();
  if (!t) return "";
  return t.toLowerCase().startsWith("mailto:") ? t : `mailto:${t}`;
}

function EmailsEditor(props: {
  emails: ContactEmail[];
  onChange: (emails: ContactEmail[]) => void;
}) {
  return (
    <Field
      label="Email addresses"
      hint="Optional custom label; otherwise the address is shown. Links are built as mailto: automatically."
    >
      <div className="grid gap-3">
        {props.emails.map((email, index) => {
          const addr = email.href.replace(/^mailto:/i, "");
          return (
            <div
              key={`em-${index}`}
              className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:flex-wrap sm:items-end"
            >
              <div className="min-w-[180px] flex-1">
                <span className="mb-1.5 block text-xs text-slate-500">
                  Email address
                </span>
                <input
                  type="email"
                  className={inputClass}
                  value={addr}
                  placeholder="name@business.com"
                  onChange={(e) => {
                    const next = [...props.emails];
                    next[index] = {
                      ...email,
                      href: mailtoHref(e.target.value),
                    };
                    props.onChange(next);
                  }}
                />
              </div>
              <div className="min-w-[160px] flex-1">
                <span className="mb-1.5 block text-xs text-slate-500">
                  Custom label (optional)
                </span>
                <input
                  className={inputClass}
                  value={email.label ?? ""}
                  placeholder="Same as email if empty"
                  onChange={(e) => {
                    const next = [...props.emails];
                    const label = e.target.value.trim();
                    next[index] = {
                      ...email,
                      label: label ? label : undefined,
                    };
                    props.onChange(next);
                  }}
                />
              </div>
              <button
                type="button"
                className={dangerGhostBtnClass}
                onClick={() =>
                  props.onChange(props.emails.filter((_, i) => i !== index))
                }
              >
                Remove
              </button>
            </div>
          );
        })}
        <button
          type="button"
          className={`${ghostBtnClass} w-fit`}
          onClick={() =>
            props.onChange([...props.emails, { href: "mailto:" }])
          }
        >
          + Add email
        </button>
      </div>
    </Field>
  );
}

function AboutParagraphsEditor(props: {
  paragraphs: string[];
  onChange: (paragraphs: string[]) => void;
}) {
  return (
    <Field
      label="Body paragraphs"
      hint="Each block is a separate paragraph on the About section."
    >
      <div className="grid gap-4">
        {props.paragraphs.map((text, index) => (
          <div key={`ab-${index}`} className="flex flex-col gap-2 sm:flex-row sm:items-start">
            <div className="flex-1">
              <span className="mb-1.5 block text-xs font-medium text-slate-500">
                Paragraph {index + 1}
              </span>
              <textarea
                className={textareaClass}
                rows={5}
                value={text}
                onChange={(e) => {
                  const next = [...props.paragraphs];
                  next[index] = e.target.value;
                  props.onChange(next);
                }}
              />
            </div>
            <button
              type="button"
              className={`${dangerGhostBtnClass} shrink-0 sm:mt-6`}
              onClick={() =>
                props.onChange(props.paragraphs.filter((_, i) => i !== index))
              }
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          className={`${ghostBtnClass} w-fit`}
          onClick={() => props.onChange([...props.paragraphs, ""])}
        >
          + Add paragraph
        </button>
      </div>
    </Field>
  );
}

export function SiteContentEditor(props: { initialContent: HomeContent }) {
  const [draft, setDraft] = useState<HomeContent>(() =>
    cloneContent(props.initialContent),
  );
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  function resetDraft() {
    setDraft(cloneContent(props.initialContent));
    setSaveMessage(null);
    setSaveError(null);
  }

  async function saveSections() {
    setSaving(true);
    setSaveMessage(null);
    setSaveError(null);
    try {
      const payload = cloneContent(draft);
      payload.navItems = payload.navItems.filter(
        (n) => n.label.trim() && n.href.trim(),
      );
      payload.products.cards = payload.products.cards.filter(
        (c) => c.title.trim() || c.image.trim(),
      );
      payload.gallery.images = payload.gallery.images.filter((g) =>
        g.src.trim(),
      );
      payload.services.items = payload.services.items.filter((s) =>
        s.title.trim(),
      );
      payload.contact.phones = payload.contact.phones.filter(
        (p) => p.display.trim() && p.href.trim(),
      );
      payload.contact.emails = payload.contact.emails.filter((e) =>
        e.href.replace(/^mailto:/i, "").trim(),
      );
      payload.about.paragraphs = payload.about.paragraphs.filter((p) =>
        p.trim(),
      );

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
      setDraft(cloneContent(payload));
      setSaveMessage("Saved. Open your live site in a new tab to review.");
    } catch (err) {
      setSaveError(
        err instanceof Error ? err.message : "Could not save changes.",
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="flex flex-col gap-8">
            <EditorSection
              title="Header & phone"
              description="Top bar: logo is fixed; you can change the phone number visitors see and tap."
            >
              <div className="grid gap-5 md:grid-cols-2">
                <Field
                  label="Phone number (display)"
                  hint="How it reads in the header, e.g. with dashes."
                >
                  <input
                    className={inputClass}
                    value={draft.header.phoneDisplay}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        header: {
                          ...draft.header,
                          phoneDisplay: e.target.value,
                        },
                      })
                    }
                  />
                </Field>
                <Field
                  label="Phone link"
                  hint="Use tel: and digits for mobile tap-to-call."
                >
                  <input
                    className={`${inputClass} font-mono text-xs`}
                    value={draft.header.phoneHref}
                    placeholder="tel:8174219422"
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        header: { ...draft.header, phoneHref: e.target.value },
                      })
                    }
                  />
                </Field>
              </div>
              <NavLinksEditor
                items={draft.navItems}
                onChange={(navItems) => setDraft({ ...draft, navItems })}
              />
            </EditorSection>

            <EditorSection
              title="Hero (first screen)"
              description="Large headline area when someone lands on your site."
            >
              <Field
                label="Small line above the headline"
                hint="Often used for a tagline or years in business."
              >
                <input
                  className={inputClass}
                  value={draft.hero.kicker}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      hero: { ...draft.hero, kicker: e.target.value },
                    })
                  }
                />
              </Field>
              <Field label="Main headline">
                <textarea
                  className={textareaClass}
                  rows={4}
                  value={draft.hero.title}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      hero: { ...draft.hero, title: e.target.value },
                    })
                  }
                />
              </Field>
              <Field label="Supporting paragraph">
                <textarea
                  className={textareaClass}
                  rows={5}
                  value={draft.hero.subtitle}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      hero: { ...draft.hero, subtitle: e.target.value },
                    })
                  }
                />
              </Field>
              <div className="grid gap-5 md:grid-cols-2">
                <Field label="Primary button text">
                  <input
                    className={inputClass}
                    value={draft.hero.primaryCtaLabel}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        hero: {
                          ...draft.hero,
                          primaryCtaLabel: e.target.value,
                        },
                      })
                    }
                  />
                </Field>
                <Field label="Secondary button text">
                  <input
                    className={inputClass}
                    value={draft.hero.secondaryCtaLabel}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        hero: {
                          ...draft.hero,
                          secondaryCtaLabel: e.target.value,
                        },
                      })
                    }
                  />
                </Field>
              </div>
            </EditorSection>

            <EditorSection
              title="About"
              description="The light section with your story."
            >
              <Field
                label="Small label above the headline"
                hint="Small caps line like “About us”."
              >
                <input
                  className={inputClass}
                  value={draft.about.label}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      about: { ...draft.about, label: e.target.value },
                    })
                  }
                />
              </Field>
              <Field label="Section headline">
                <textarea
                  className={textareaClass}
                  rows={3}
                  value={draft.about.headline}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      about: { ...draft.about, headline: e.target.value },
                    })
                  }
                />
              </Field>
              <AboutParagraphsEditor
                paragraphs={draft.about.paragraphs}
                onChange={(paragraphs) =>
                  setDraft({
                    ...draft,
                    about: { ...draft.about, paragraphs },
                  })
                }
              />
            </EditorSection>

            <EditorSection
              title="Products"
              description="Intro copy plus the grid of product tiles."
            >
              <div className="grid gap-5 md:grid-cols-2">
                <Field label="Small label above headline">
                  <input
                    className={inputClass}
                    value={draft.products.label}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        products: { ...draft.products, label: e.target.value },
                      })
                    }
                  />
                </Field>
                <Field label="Short summary (beside headline on wide screens)">
                  <textarea
                    className={textareaClass}
                    rows={4}
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
                  className={textareaClass}
                  rows={3}
                  value={draft.products.headline}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      products: { ...draft.products, headline: e.target.value },
                    })
                  }
                />
              </Field>
              <ProductCardsEditor
                cards={draft.products.cards}
                onChange={(cards) =>
                  setDraft({
                    ...draft,
                    products: { ...draft.products, cards },
                  })
                }
              />
            </EditorSection>

            <EditorSection
              title="Gallery"
              description="Recent work grid under products."
            >
              <div className="grid gap-5 md:grid-cols-2">
                <Field label="Small label">
                  <input
                    className={inputClass}
                    value={draft.gallery.label}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        gallery: { ...draft.gallery, label: e.target.value },
                      })
                    }
                  />
                </Field>
                <Field
                  label="Link text next to the headline"
                  hint="Usually links down to the contact section."
                >
                  <input
                    className={inputClass}
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
                  className={textareaClass}
                  rows={3}
                  value={draft.gallery.headline}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      gallery: { ...draft.gallery, headline: e.target.value },
                    })
                  }
                />
              </Field>
              <GalleryImagesEditor
                images={draft.gallery.images}
                onChange={(images) =>
                  setDraft({
                    ...draft,
                    gallery: { ...draft.gallery, images },
                  })
                }
              />
            </EditorSection>

            <EditorSection
              title="Services"
              description="Dark section with service cards and delivery note."
            >
              <Field label="Small label">
                <input
                  className={inputClass}
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
                  className={textareaClass}
                  rows={4}
                  value={draft.services.headline}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      services: { ...draft.services, headline: e.target.value },
                    })
                  }
                />
              </Field>
              <ServicesEditor
                items={draft.services.items}
                onChange={(items) =>
                  setDraft({
                    ...draft,
                    services: { ...draft.services, items },
                  })
                }
              />
              <div className="grid gap-5 md:grid-cols-2 md:items-start">
                <Field label="Delivery box — small title">
                  <input
                    className={inputClass}
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
              <Field label="Delivery rates / copy">
                <textarea
                  className={textareaClass}
                  rows={4}
                  value={draft.services.deliveryBody}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      services: {
                        ...draft.services,
                        deliveryBody: e.target.value,
                      },
                    })
                  }
                />
              </Field>
            </EditorSection>

            <EditorSection
              title="Contact & footer"
              description="Address, emails, contact headline, and footer line."
            >
              <Field label="Small label">
                <input
                  className={inputClass}
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
                  className={textareaClass}
                  rows={3}
                  value={draft.contact.headline}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      contact: { ...draft.contact, headline: e.target.value },
                    })
                  }
                />
              </Field>
              <Field
                label="Street address"
                hint="One line per row — same order as on the site."
              >
                <textarea
                  className={textareaClass}
                  rows={4}
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
              <PhonesEditor
                phones={draft.contact.phones}
                onChange={(phones) =>
                  setDraft({
                    ...draft,
                    contact: { ...draft.contact, phones },
                  })
                }
              />
              <EmailsEditor
                emails={draft.contact.emails}
                onChange={(emails) =>
                  setDraft({
                    ...draft,
                    contact: { ...draft.contact, emails },
                  })
                }
              />
              <Field label="Footer copyright line">
                <textarea
                  className={textareaClass}
                  rows={3}
                  value={draft.footer.copyright}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      footer: { ...draft.footer, copyright: e.target.value },
                    })
                  }
                />
              </Field>
              <div className="grid gap-5 md:grid-cols-2">
                <Field label="Facebook button text">
                  <input
                    className={inputClass}
                    value={draft.footer.facebookLabel}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        footer: {
                          ...draft.footer,
                          facebookLabel: e.target.value,
                        },
                      })
                    }
                  />
                </Field>
                <Field label="Facebook page URL">
                  <input
                    className={inputClass}
                    value={draft.footer.facebookUrl}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        footer: {
                          ...draft.footer,
                          facebookUrl: e.target.value,
                        },
                      })
                    }
                  />
                </Field>
              </div>
            </EditorSection>

            <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white px-6 py-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-2 text-sm">
                {saveMessage ? (
                  <p className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 font-medium text-emerald-800">
                    {saveMessage}
                  </p>
                ) : null}
                {saveError ? (
                  <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 font-medium text-[#C73A34]">
                    {saveError}
                  </p>
                ) : null}
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={resetDraft}
                  className="rounded-lg border border-slate-300 px-6 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-50"
                >
                  Discard unsaved changes
                </button>
                <button
                  type="button"
                  disabled={saving}
                  onClick={() => void saveSections()}
                  className="rounded-lg bg-slate-800 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-700 disabled:opacity-50"
                >
                  {saving ? "Saving…" : "Save all homepage changes"}
                </button>
              </div>
            </div>
    </div>
  );
}
