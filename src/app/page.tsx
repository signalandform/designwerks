import Image from "next/image";
import { ContactForm } from "@/components/contact-form";
import { getHomeContent } from "@/lib/cms/site-content";
import type { ContactEmail } from "@/lib/cms/types";

export const dynamic = "force-dynamic";

function emailDisplay(email: ContactEmail): string {
  if (email.label) return email.label;
  return email.href.replace(/^mailto:/i, "");
}

export default async function Home() {
  const content = await getHomeContent();
  const heroCards = content.products.cards.slice(0, 4);

  return (
    <main className="min-h-screen bg-stone-950 text-white">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-stone-950/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <a href="#home" className="flex items-center gap-3">
            <Image
              src="/assets/pasted-svg-731691x258.svg"
              alt="Design Werks"
              width={146}
              height={52}
              priority
              className="h-11 w-auto"
            />
            <span className="sr-only">Design Werks home</span>
          </a>
          <nav
            className="hidden items-center gap-7 text-sm font-semibold uppercase tracking-[0.22em] text-white/70 md:flex"
            aria-label="Primary navigation"
          >
            {content.navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="transition hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <a
            href={content.header.phoneHref}
            className="rounded-full border border-sky-400/50 px-4 py-2 text-sm font-bold text-sky-100 transition hover:border-sky-300 hover:bg-sky-400/10"
          >
            {content.header.phoneDisplay}
          </a>
        </div>
      </header>

      <section
        id="home"
        className="relative isolate flex min-h-screen items-center overflow-hidden px-5 pt-28 sm:px-8"
      >
        <Image
          src="/assets/legends-of-southlake.jpg"
          alt="Aerial view of Southlake, Texas"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.35),transparent_34%),linear-gradient(90deg,rgba(12,10,9,0.98),rgba(12,10,9,0.74),rgba(12,10,9,0.3))]" />
        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-14 py-20 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="mb-5 text-sm font-bold uppercase tracking-[0.35em] text-sky-300">
              {content.hero.kicker}
            </p>
            <h1 className="max-w-4xl text-5xl font-black uppercase tracking-tight text-white sm:text-6xl lg:text-7xl">
              {content.hero.title}
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-stone-200">
              {content.hero.subtitle}
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a
                href="#contact"
                className="rounded-full bg-sky-400 px-7 py-4 text-center text-sm font-black uppercase tracking-[0.18em] text-stone-950 transition hover:bg-sky-300"
              >
                {content.hero.primaryCtaLabel}
              </a>
              <a
                href="#products"
                className="rounded-full border border-white/30 px-7 py-4 text-center text-sm font-black uppercase tracking-[0.18em] text-white transition hover:border-white hover:bg-white/10"
              >
                {content.hero.secondaryCtaLabel}
              </a>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {heroCards.map((card, index) => (
              <div
                key={`${card.title}-${index}`}
                className={`group overflow-hidden rounded-3xl border border-white/10 bg-white/10 shadow-2xl shadow-black/30 ${
                  index === 1 ? "sm:mt-10" : ""
                }`}
              >
                <Image
                  src={card.image}
                  alt={card.alt}
                  width={607}
                  height={455}
                  sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 90vw"
                  className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="p-4 text-sm font-black uppercase tracking-[0.18em] text-white">
                  {card.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="bg-white px-5 py-24 text-stone-950 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.3em] text-sky-700">
              {content.about.label}
            </p>
            <h2 className="mt-4 text-4xl font-black uppercase tracking-tight sm:text-5xl">
              {content.about.headline}
            </h2>
          </div>
          <div className="grid gap-6 text-lg leading-8 text-stone-700">
            {content.about.paragraphs.map((paragraph, index) => (
              <p key={`${index}-${paragraph.slice(0, 24)}`}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section id="products" className="bg-stone-100 px-5 py-24 text-stone-950 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.3em] text-sky-700">
                {content.products.label}
              </p>
              <h2 className="mt-4 text-4xl font-black uppercase tracking-tight sm:text-5xl">
                {content.products.headline}
              </h2>
            </div>
            <p className="max-w-xl text-lg leading-8 text-stone-700">
              {content.products.blurb}
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {content.products.cards.map((card) => (
              <article
                key={card.title}
                className="overflow-hidden rounded-3xl bg-white shadow-xl shadow-stone-300/40"
              >
                <Image
                  src={card.image}
                  alt={card.alt}
                  width={607}
                  height={455}
                  sizes="(min-width: 1024px) 24vw, (min-width: 768px) 48vw, 95vw"
                  className="aspect-[4/3] w-full object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-black uppercase tracking-tight">
                    {card.title}
                  </h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="gallery" className="bg-white px-5 py-24 text-stone-950 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.3em] text-sky-700">
                {content.gallery.label}
              </p>
              <h2 className="mt-4 text-4xl font-black uppercase tracking-tight sm:text-5xl">
                {content.gallery.headline}
              </h2>
            </div>
            <a
              href="#contact"
              className="text-sm font-black uppercase tracking-[0.22em] text-sky-700 transition hover:text-sky-900"
            >
              {content.gallery.ctaLabel}
            </a>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {content.gallery.images.map((image) => (
              <Image
                key={image.src}
                src={image.src}
                alt={image.alt}
                width={607}
                height={455}
                sizes="(min-width: 1024px) 31vw, (min-width: 640px) 48vw, 95vw"
                className="aspect-[4/3] rounded-3xl object-cover shadow-xl shadow-stone-300/50"
              />
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="bg-stone-950 px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-[0.3em] text-sky-300">
            {content.services.label}
          </p>
          <h2 className="mt-4 max-w-4xl text-4xl font-black uppercase tracking-tight text-white sm:text-5xl">
            {content.services.headline}
          </h2>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {content.services.items.map((service) => (
              <article
                key={service.title}
                className="rounded-3xl border border-white/10 bg-white/[0.06] p-8"
              >
                <h3 className="text-2xl font-black uppercase tracking-tight text-white">
                  {service.title}
                </h3>
                <p className="mt-5 text-base leading-7 text-stone-300">
                  {service.description}
                </p>
              </article>
            ))}
          </div>
          <div className="mt-8 rounded-3xl border border-sky-300/25 bg-sky-300/10 p-8 text-stone-100">
            <p className="text-sm font-black uppercase tracking-[0.25em] text-sky-200">
              {content.services.deliveryTitle}
            </p>
            <p className="mt-4 text-lg leading-8">{content.services.deliveryBody}</p>
          </div>
        </div>
      </section>

      <section id="contact" className="bg-white px-5 py-24 text-stone-950 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.3em] text-sky-700">
              {content.contact.label}
            </p>
            <h2 className="mt-4 text-4xl font-black uppercase tracking-tight sm:text-5xl">
              {content.contact.headline}
            </h2>
            <div className="mt-8 space-y-5 text-lg leading-8 text-stone-700">
              <p>
                {content.contact.addressLines.map((line, index) => (
                  <span key={`${index}-${line}`}>
                    {index > 0 ? <br /> : null}
                    {line}
                  </span>
                ))}
              </p>
              {content.contact.phones.map((phone) => (
                <p key={phone.href}>
                  <a className="font-bold text-stone-950" href={phone.href}>
                    {phone.display}
                  </a>
                </p>
              ))}
              {content.contact.emails.map((email) => (
                <p key={email.href}>
                  <a className="font-bold text-stone-950" href={email.href}>
                    {emailDisplay(email)}
                  </a>
                </p>
              ))}
            </div>
          </div>
          <ContactForm />
        </div>
      </section>

      <footer className="bg-stone-950 px-5 py-10 text-stone-400 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 text-sm md:flex-row md:items-center md:justify-between">
          <p>{content.footer.copyright}</p>
          <a
            href={content.footer.facebookUrl}
            target="_blank"
            rel="noreferrer"
            className="font-bold text-white transition hover:text-sky-300"
          >
            {content.footer.facebookLabel}
          </a>
        </div>
      </footer>
    </main>
  );
}
