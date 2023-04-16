export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const options = {
    day: "numeric" as const,
    month: "short" as const,
    year: "numeric" as const,
  };
  return date.toLocaleDateString("en-US", options);
}

