import Image from "next/image";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Products", href: "#products" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

const services = [
  {
    title: "Graphic Design",
    description:
      "Layout support for brochures, business cards, signs, vehicle wraps, banners, and more.",
  },
  {
    title: "Production & Installation",
    description:
      "Vehicle wraps, wall graphics, vinyl applications, indoor signage, and outdoor signage installed with care.",
  },
  {
    title: "Pickup & Delivery",
    description:
      "Fast local pickup and delivery, with simple mileage-based pricing for Southlake and the surrounding area.",
  },
];

const productCards = [
  {
    title: "Vehicle Wraps",
    image: "/assets/preview-29.jpg",
    alt: "Colorful Royal Rugs vehicle wrap in production",
  },
  {
    title: "Indoor Signage",
    image: "/assets/hero1.jpg",
    alt: "Large wall mural installed in a conference room",
  },
  {
    title: "Outdoor Signage",
    image: "/assets/img_2111.jpg",
    alt: "Custom Mike's Barber Shop sign",
  },
  {
    title: "Custom Graphics",
    image: "/assets/hero3.jpg",
    alt: "Office wall graphics with large typography",
  },
];

const galleryImages = [
  {
    src: "/assets/hero2.jpg",
    alt: "Long historical wall graphic installation",
  },
  {
    src: "/assets/preview-15.jpg",
    alt: "Printed custom sign and graphics project",
  },
  {
    src: "/assets/preview-18.jpg",
    alt: "Large format printed graphics project",
  },
  {
    src: "/assets/preview-21.jpg",
    alt: "Installed custom branding graphic",
  },
  {
    src: "/assets/preview-30.jpg",
    alt: "Commercial graphics production example",
  },
  {
    src: "/assets/img_2166.jpg",
    alt: "Custom printed sign detail",
  },
];

export default function Home() {
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
            {navItems.map((item) => (
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
            href="tel:8174219422"
            className="rounded-full border border-sky-400/50 px-4 py-2 text-sm font-bold text-sky-100 transition hover:border-sky-300 hover:bg-sky-400/10"
          >
            817-421-9422
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
              Serving DFW since 1996
            </p>
            <h1 className="max-w-4xl text-5xl font-black uppercase tracking-tight text-white sm:text-6xl lg:text-7xl">
              Large format graphics that turn spaces and vehicles into brands.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-stone-200">
              Design Werks specializes in printing and installing vehicle wraps,
              indoor signage, outdoor signage, trade show graphics, banners,
              business cards, brochures, postcards, and custom graphics.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a
                href="#contact"
                className="rounded-full bg-sky-400 px-7 py-4 text-center text-sm font-black uppercase tracking-[0.18em] text-stone-950 transition hover:bg-sky-300"
              >
                Start a Project
              </a>
              <a
                href="#products"
                className="rounded-full border border-white/30 px-7 py-4 text-center text-sm font-black uppercase tracking-[0.18em] text-white transition hover:border-white hover:bg-white/10"
              >
                View Work
              </a>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {productCards.slice(0, 4).map((card, index) => (
              <div
                key={card.title}
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
              About Us
            </p>
            <h2 className="mt-4 text-4xl font-black uppercase tracking-tight sm:text-5xl">
              Experience, speed, and craftsmanship under one roof.
            </h2>
          </div>
          <div className="grid gap-6 text-lg leading-8 text-stone-700">
            <p>
              Design Werks has served the DFW area since 1996. With more than
              65 years of combined industry experience, the team focuses on
              large format graphics from concept and design through printing,
              finishing, and installation.
            </p>
            <p>
              The goal is straightforward: excellent customer service, quality
              products, and fast turnaround for businesses that need to look
              sharp in the real world.
            </p>
          </div>
        </div>
      </section>

      <section id="products" className="bg-stone-100 px-5 py-24 text-stone-950 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.3em] text-sky-700">
                Products
              </p>
              <h2 className="mt-4 text-4xl font-black uppercase tracking-tight sm:text-5xl">
                Built for walls, windows, fleets, events, and print.
              </h2>
            </div>
            <p className="max-w-xl text-lg leading-8 text-stone-700">
              Vehicle wraps, indoor signage, outdoor signage, trade show
              graphics, banners, business cards, brochures, postcards, and more.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {productCards.map((card) => (
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

      <section className="bg-white px-5 py-24 text-stone-950 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.3em] text-sky-700">
                Recent Work
              </p>
              <h2 className="mt-4 text-4xl font-black uppercase tracking-tight sm:text-5xl">
                Real projects from the Design Werks portfolio.
              </h2>
            </div>
            <a
              href="#contact"
              className="text-sm font-black uppercase tracking-[0.22em] text-sky-700 transition hover:text-sky-900"
            >
              Request a quote
            </a>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {galleryImages.map((image) => (
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
            Our Services
          </p>
          <h2 className="mt-4 max-w-4xl text-4xl font-black uppercase tracking-tight text-white sm:text-5xl">
            From layout to installation, everything is handled with one local
            team.
          </h2>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {services.map((service) => (
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
              Delivery
            </p>
            <p className="mt-4 text-lg leading-8">
              1-10 miles: $15 · 11-20 miles: $25 · Over 20 miles: call for
              pricing.
            </p>
          </div>
        </div>
      </section>

      <section id="contact" className="bg-white px-5 py-24 text-stone-950 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.3em] text-sky-700">
              Get In Touch
            </p>
            <h2 className="mt-4 text-4xl font-black uppercase tracking-tight sm:text-5xl">
              Ready for graphics that get noticed?
            </h2>
            <div className="mt-8 space-y-5 text-lg leading-8 text-stone-700">
              <p>
                725 Commerce St, Suite 120
                <br />
                Southlake, Texas 76092
              </p>
              <p>
                <a className="font-bold text-stone-950" href="tel:8174219422">
                  817-421-9422
                </a>
              </p>
              <p>
                <a
                  className="font-bold text-stone-950"
                  href="mailto:steven@designwerksonline.com"
                >
                  steven@designwerksonline.com
                </a>
                <br />
                <a
                  className="font-bold text-stone-950"
                  href="mailto:stephanie@designwerksonline.com"
                >
                  stephanie@designwerksonline.com
                </a>
              </p>
            </div>
          </div>
          <form
            action="mailto:steven@designwerksonline.com"
            className="rounded-[2rem] bg-stone-100 p-6 shadow-2xl shadow-stone-300/40 sm:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="grid gap-2 text-sm font-bold uppercase tracking-[0.18em] text-stone-600">
                Name
                <input
                  name="name"
                  className="rounded-2xl border border-stone-200 bg-white px-4 py-3 text-base font-normal normal-case tracking-normal text-stone-950 outline-none transition focus:border-sky-500"
                  placeholder="Enter name"
                />
              </label>
              <label className="grid gap-2 text-sm font-bold uppercase tracking-[0.18em] text-stone-600">
                Email
                <input
                  name="email"
                  type="email"
                  className="rounded-2xl border border-stone-200 bg-white px-4 py-3 text-base font-normal normal-case tracking-normal text-stone-950 outline-none transition focus:border-sky-500"
                  placeholder="Enter email"
                />
              </label>
            </div>
            <label className="mt-5 grid gap-2 text-sm font-bold uppercase tracking-[0.18em] text-stone-600">
              Message
              <textarea
                name="message"
                rows={6}
                className="rounded-2xl border border-stone-200 bg-white px-4 py-3 text-base font-normal normal-case tracking-normal text-stone-950 outline-none transition focus:border-sky-500"
                placeholder="Tell us about your project"
              />
            </label>
            <button
              type="submit"
              className="mt-6 w-full rounded-full bg-stone-950 px-7 py-4 text-sm font-black uppercase tracking-[0.18em] text-white transition hover:bg-sky-700"
            >
              Submit Inquiry
            </button>
          </form>
        </div>
      </section>

      <footer className="bg-stone-950 px-5 py-10 text-stone-400 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 text-sm md:flex-row md:items-center md:justify-between">
          <p>Copyright 2026 Design Werks. Demo site built from public source content.</p>
          <a
            href="https://www.facebook.com/designwerkssouthlake/"
            target="_blank"
            rel="noreferrer"
            className="font-bold text-white transition hover:text-sky-300"
          >
            Facebook
          </a>
        </div>
      </footer>
    </main>
  );
}
