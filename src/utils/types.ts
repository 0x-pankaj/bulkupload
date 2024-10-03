export interface ClauseList {
  id: string;
  clause_id: string | null;
  clause_no: string;
  clause_desc: string;
}

export interface Clause {
  id: string;
  chapter_id: string | null;
  section_id: string | null;
  subsection_id: string | null;
  clause_list: ClauseList[];
}

export interface Subsection {
  id: string;
  section_id: string | null;
  subsection_no: string | null;
  subsection_desc: string | null;
  clauses: Clause[];
}

export interface Section {
  id: string;
  amend_id: string;
  section_no: string | null;
  section_head: string | null;
  section_desc: string | null;
  chapter_id: string | null;
  subsections: Subsection[];
  clauses: Clause[];
}

export interface Chapter {
  id: string;
  amend_id: string;
  chapter_no: string | null;
  chapter_head: string | null;
  sections: Section[];
  clause: Clause[];
}

export interface Preamble {
  id: string;
  amend_id: string;
  preamble_desc: string | null;
}

export interface Amendment {
  id: string;
  act_id: string;
  amendment_head: string | null;
  amendment_num: number | null;
  amendment_year_bs: number | null;
  amendment_date: string | null;
  content: string | null;
  preambles: Preamble | null;
  chapters: Chapter[];
  section: Section[];
  definition: Definition | null;
}

export interface Definition {
  id: string;
  amend_id: string;
  definition_desc: string | null;
  definition_list: DefinitionOf[];
}

export interface DefinitionOf {
  id: string;
  definiton_id: string;
  definition_glossary_key: string | null;
  definition_no: string | null;
  definition_no_desc: string | null;
}

export interface Act {
  id: string;
  act_name: string | null;
  act_year_ad: number | null;
  act_year_bs: number | null;
  act_number: string | null;
  act_date: string | null;
  act_desc: string | null;
  is_active: boolean;
  category_id: string;
  amendment: Amendment[];
}