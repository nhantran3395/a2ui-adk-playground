export function FormattedText({ text }: { text: string }) {
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    // Check for bold
    const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
    // Check for italic
    const italicMatch = remaining.match(/\*(.+?)\*/);

    if (boldMatch && (!italicMatch || boldMatch.index! <= italicMatch.index!)) {
      const before = remaining.slice(0, boldMatch.index!);
      if (before) parts.push(before);
      parts.push(
        <strong key={key++} className="font-semibold">
          {boldMatch[1]}
        </strong>,
      );
      remaining = remaining.slice(boldMatch.index! + boldMatch[0].length);
    } else if (italicMatch) {
      const before = remaining.slice(0, italicMatch.index!);
      if (before) parts.push(before);
      parts.push(
        <em key={key++} className="italic">
          {italicMatch[1]}
        </em>,
      );
      remaining = remaining.slice(italicMatch.index! + italicMatch[0].length);
    } else {
      parts.push(remaining);
      break;
    }
  }

  return <>{parts}</>;
}
