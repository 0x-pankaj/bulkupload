import { NextRequest, NextResponse } from 'next/server';
import { createBulkActs, createBulkAmendments, createBulkChapters, createBulkClauseLists, createBulkClauses, createBulkDefinitionOf, createBulkDefinitions, createBulkPreambles, createBulkSections, createBulkSubsections } from '@/actions/uploader';

export async function POST(request: NextRequest) {
  try {
    const jsonData = await request.json();
    console.log('Received data in API route:', JSON.stringify(jsonData, null, 2));

    const uploadFunctions = [
      { func: createBulkActs, data: jsonData.act, name: 'Acts' },
      { func: createBulkAmendments, data: jsonData.amendment, name: 'Amendments' },
      { func: createBulkPreambles, data: jsonData.preamble, name: 'Preambles' },
      { func: createBulkChapters, data: jsonData.chapter, name: 'Chapters' },
      { func: createBulkSections, data: jsonData.section, name: 'Sections' },
      { func: createBulkSubsections, data: jsonData.subsection, name: 'Subsections' },
      { func: createBulkClauses, data: jsonData.clause, name: 'Clauses' },
      { func: createBulkClauseLists, data: jsonData.clause_list, name: 'Clause Lists' },
      { func: createBulkDefinitions, data: jsonData.definitions, name: 'Definitions' },
      { func: createBulkDefinitionOf, data: jsonData.definitions_of, name: 'Definition Lists' },
    ];

    const results = [];

    for (const { func, data, name } of uploadFunctions) {
      if (data && data.length > 0) {
        console.log(`Processing ${name}:`, JSON.stringify(data, null, 2));
        await func(data);
        results.push(`Successfully uploaded ${name}.`);
      } else {
        results.push(`Skipped ${name} - no data available.`);
      }
    }

    return NextResponse.json({ success: true, results });
  } catch (error) {
    console.error('Error in bulk upload API route:', error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}