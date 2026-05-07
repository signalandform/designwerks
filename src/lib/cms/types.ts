export type NavItem = { label: string; href: string };

export type ProductCard = { title: string; image: string; alt: string };

export type GalleryImage = { src: string; alt: string };

export type ServiceItem = { title: string; description: string };

export type ContactEmail = { label?: string; href: string };

export type ContactPhone = { display: string; href: string };

export type HomeContent = {
  navItems: NavItem[];
  header: {
    phoneDisplay: string;
    phoneHref: string;
  };
  hero: {
    kicker: string;
    title: string;
    subtitle: string;
    primaryCtaLabel: string;
    secondaryCtaLabel: string;
  };
  about: {
    label: string;
    headline: string;
    paragraphs: string[];
  };
  products: {
    label: string;
    headline: string;
    blurb: string;
    cards: ProductCard[];
  };
  gallery: {
    label: string;
    headline: string;
    ctaLabel: string;
    images: GalleryImage[];
  };
  services: {
    label: string;
    headline: string;
    items: ServiceItem[];
    deliveryTitle: string;
    deliveryBody: string;
  };
  contact: {
    label: string;
    headline: string;
    addressLines: string[];
    phones: ContactPhone[];
    emails: ContactEmail[];
  };
  footer: {
    copyright: string;
    facebookUrl: string;
    facebookLabel: string;
  };
};

export type InquiryRow = {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
  read_at: string | null;
  archived: boolean;
};
