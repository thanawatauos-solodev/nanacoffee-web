const bahtFormatter = new Intl.NumberFormat("th-TH", { maximumFractionDigits: 0 });

export function formatBaht(amount: number): string {
  return `฿${bahtFormatter.format(amount)}`;
}
