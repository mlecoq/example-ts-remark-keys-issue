import { keys } from "ts-transformer-keys";

type ProjectCommonProperties = {
  /** Project Name */
  name: string;
  description?: string;
  /** Client name */
  client?: string;
  report_templates: string[];
  /** Start date (iso format) */
  startDate?: string;
  /** End date (iso format) */
  endDate?: string;
  address?: string;
  zipcode?: string;
  /** City. */
  town?: string;
  state?: string;
  country?: string;
  phone?: string;
  mobile?: string;
  fax?: string;
  email?: string;
  otherEmail?: string;
  archived?: boolean;
};

const test = keys<ProjectCommonProperties>();

console.log(test);
