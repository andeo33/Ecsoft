/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface MetaData {
  title: string;
  description: string;
  keywords: string;
  h1: string;
}

export interface SecurityScores {
  seo: number;
  performance: number;
  mobile: number;
  security: number;
}

export interface DetailedIssue {
  title: string;
  severity: "high" | "medium" | "low";
  recommendation: string;
}

export interface SeoAudit {
  strengths: string[];
  detailedIssues: DetailedIssue[];
}

export interface CopyAudit {
  tone: string;
  valuePropClarity: string;
  suggestions: string[];
}

export interface DesignAudit {
  layoutStyle: string;
  typographyFeel: string;
  mobileResponsiveAudit: string;
  improvements: string[];
}

export interface ActionPlanItem {
  priority: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
  item: string;
  estimate: string;
  completed?: boolean;
}

export interface OverviewSection {
  industry: string;
  targetAudience: string;
  trustSignals: string[];
  coreOffering: string;
}

export interface AuditReport {
  url: string;
  siteName: string;
  statusCode: number;
  responseTime: number;
  pageSize: number;
  meta: MetaData;
  scores: SecurityScores;
  techStack: string[];
  overview: OverviewSection;
  seoAudit: SeoAudit;
  copyAudit: CopyAudit;
  designAudit: DesignAudit;
  actionPlan: ActionPlanItem[];
}
