import { prisma } from "@/lib/prisma";
import { Act, Amendment, Chapter, Clause, ClauseList, Definition, DefinitionOf, Preamble, Section, Subsection } from "@/utils/types";

export async function createBulkActs(acts: Act[]) {
  try {
    await prisma.act.createMany({ data: acts });
  } catch (error) {
    console.error("Error creating bulk acts:", error);
    throw error;
  }
}

export async function createBulkAmendments(amendments: Amendment[]) {
  try {
    await prisma.amendment.createMany({ data: amendments });
  } catch (error) {
    console.error("Error creating bulk amendments:", error);
    throw error;
  }
}

export async function createBulkPreambles(preambles: Preamble[]) {
  try {
    await prisma.preamble.createMany({ data: preambles });
  } catch (error) {
    console.error("Error creating bulk preambles:", error);
    throw error;
  }
}

export async function createBulkChapters(chapters: Chapter[]) {
  try {
    await prisma.chapter.createMany({ data: chapters });
  } catch (error) {
    console.error("Error creating bulk chapters:", error);
    throw error;
  }
}

export async function createBulkSections(sections: Section[]) {
  try {
    await prisma.section.createMany({ data: sections });
  } catch (error) {
    console.error("Error creating bulk sections:", error);
    throw error;
  }
}

export async function createBulkSubsections(subsections: Subsection[]) {
  try {
    await prisma.subsection.createMany({ data: subsections });
  } catch (error) {
    console.error("Error creating bulk subsections:", error);
    throw error;
  }
}

export async function createBulkClauses(clauses: Clause[]) {
  try {
    await prisma.clause.createMany({ data: clauses });
  } catch (error) {
    console.error("Error creating bulk clauses:", error);
    throw error;
  }
}

export async function createBulkClauseLists(clauseLists: ClauseList[]) {
  try {
    await prisma.clause_list.createMany({ data: clauseLists });
  } catch (error) {
    console.error("Error creating bulk clause lists:", error);
    throw error;
  }
}

export async function createBulkDefinitions(definitions: Definition[]) {
  try {
    await prisma.definition.createMany({ data: definitions });
  } catch (error) {
    console.error("Error creating bulk definitions:", error);
    throw error;
  }
}

export async function createBulkDefinitionOf(definitionsOf: DefinitionOf[]) {
  try {
    await prisma.definition_list.createMany({ data: definitionsOf });
  } catch (error) {
    console.error("Error creating bulk definition lists:", error);
    throw error;
  }
}