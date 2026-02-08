export interface JsonTemplate {
  id: string;
  name: string;
  description: string;
  schema: Record<string, string>;
  systemPrompt: string;
}

export const jsonTemplates: JsonTemplate[] = [
  {
    id: "mutual-fund",
    name: "Mutual Fund Factsheet",
    description: "Extract structured data from mutual fund factsheets",
    schema: {
      fundName: "string - Name of the mutual fund",
      amcName: "string - Asset Management Company name",
      nav: "number - Current Net Asset Value",
      expenseRatio: "number - Expense ratio as percentage",
      aum: "string - Assets Under Management",
      returns1Y: "number - 1-year return percentage",
      returns3Y: "number - 3-year return percentage (annualized)",
      returns5Y: "number - 5-year return percentage (annualized)",
      riskLevel: "string - Risk level (Low/Medium/High)",
      category: "string - Fund category (Equity/Debt/Hybrid/etc)",
      managerName: "string - Fund manager name",
      inceptionDate: "string - Fund inception date",
    },
    systemPrompt: `You are an expert at extracting structured data from mutual fund factsheets.
Extract the following information from the provided markdown content and return it as valid JSON.
Use the exact field names specified below. For numeric values, extract just the number.
For dates, use YYYY-MM-DD format if possible.
If a field is not found, use null.

Required fields:
- fundName: string
- amcName: string
- nav: number (or null)
- expenseRatio: number (or null)
- aum: string
- returns1Y: number (or null)
- returns3Y: number (or null)
- returns5Y: number (or null)
- riskLevel: string
- category: string
- managerName: string
- inceptionDate: string

Return ONLY valid JSON, no additional text or explanation.`,
  },
];

export function getTemplate(id: string): JsonTemplate | undefined {
  return jsonTemplates.find((t) => t.id === id);
}
