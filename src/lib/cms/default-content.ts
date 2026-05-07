import type { HomeContent } from "./types";

export const DEFAULT_HOME_CONTENT: HomeContent = {
  navItems: [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Products", href: "#products" },
    { label: "Services", href: "#services" },
    { label: "Contact", href: "#contact" },
  ],
  header: {
    phoneDisplay: "817-421-9422",
    phoneHref: "tel:8174219422",
  },
  hero: {
    kicker: "Serving DFW since 1996",
    title:
      "Large format graphics that turn spaces and vehicles into brands.",
    subtitle:
      "Design Werks specializes in printing and installing vehicle wraps, indoor signage, outdoor signage, trade show graphics, banners, business cards, brochures, postcards, and custom graphics.",
    primaryCtaLabel: "Start a Project",
    secondaryCtaLabel: "View Work",
  },
  about: {
    label: "About Us",
    headline: "Experience, speed, and craftsmanship under one roof.",
    paragraphs: [
      "Design Werks has served the DFW area since 1996. With more than 65 years of combined industry experience, the team focuses on large format graphics from concept and design through printing, finishing, and installation.",
      "The goal is straightforward: excellent customer service, quality products, and fast turnaround for businesses that need to look sharp in the real world.",
    ],
  },
  products: {
    label: "Products",
    headline: "Built for walls, windows, fleets, events, and print.",
    blurb:
      "Vehicle wraps, indoor signage, outdoor signage, trade show graphics, banners, business cards, brochures, postcards, and more.",
    cards: [
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
    ],
  },
  gallery: {
    label: "Recent Work",
    headline: "Real projects from the Design Werks portfolio.",
    ctaLabel: "Request a quote",
    images: [
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
    ],
  },
  services: {
    label: "Our Services",
    headline:
      "From layout to installation, everything is handled with one local team.",
    items: [
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
    ],
    deliveryTitle: "Delivery",
    deliveryBody:
      "1-10 miles: $15 · 11-20 miles: $25 · Over 20 miles: call for pricing.",
  },
  contact: {
    label: "Get In Touch",
    headline: "Ready for graphics that get noticed?",
    addressLines: ["725 Commerce St, Suite 120", "Southlake, Texas 76092"],
    phones: [{ display: "817-421-9422", href: "tel:8174219422" }],
    emails: [
      { href: "mailto:steven@designwerksonline.com" },
      { href: "mailto:stephanie@designwerksonline.com" },
    ],
  },
  footer: {
    copyright:
      "Copyright 2026 Design Werks. Demo site built from public source content.",
    facebookUrl: "https://www.facebook.com/designwerkssouthlake/",
    facebookLabel: "Facebook",
  },
};
