/* ── Shared types for Pratiksha Industries ─────────────────────────── */

export type ProductFamily =
  | 'cable-trays'
  | 'tray-accessories'
  | 'wire-mesh'
  | 'earthing'
  | 'cable-glands'
  | 'instrumentation';

export interface ProductFamilyMeta {
  id: ProductFamily;
  name: string;
  short: string;
}

export interface Product {
  slug: string;
  name: string;
  family: ProductFamily;
  index: string;
  code: string;
  summary: string;
  description: string;
  image: string;
  specs: { label: string; value: string }[];
  finishes: string[];
  standards: string[];
  dimensions: { width: string; height: string };
}

export interface Project {
  name: string;
  tagA: string;
  tagB: string;
  image: string;
}

export interface TimelineEntry {
  year: string;
  name: string;
  body: string;
}

export interface Machine {
  name: string;
  qty: string;
  body: string;
  spec: string;
}

export interface InspectionStage {
  no: string;
  tag: string;
  name: string;
  body: string;
}

export interface Industry {
  name: string;
  note: string;
}

export interface OrderStep {
  no: string;
  eta: string;
  name: string;
  body: string;
}

export interface CatalogueFamily {
  name: string;
  items: string[];
  cols?: number;
  span?: string;
}

export interface MaterialFinish {
  name: string;
  note: string;
}

export interface Credential {
  name: string;
  detail: string;
}

export interface NavLink {
  label: string;
  href: string;
  anchor?: boolean;
}

export interface Stat {
  value: string;
  numericValue: number;
  suffix: string;
  label: string;
}
