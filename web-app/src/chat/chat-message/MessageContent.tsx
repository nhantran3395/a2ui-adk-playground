import { Heading } from "@react-spectrum/s2";

import { FormattedText } from "./FormattedText";

export function MessageContent({ content }: { content: string }) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let currentList: string[] = [];
  let listType: "ul" | "ol" | null = null;
  let inHeading = false;

  const flushList = () => {
    if (currentList.length > 0 && listType) {
      if (listType === "ul") {
        elements.push(
          <ul key={elements.length} className="list-disc ml-4 space-y-2">
            {currentList.map((item, i) => (
              <li key={i}>
                <FormattedText text={item} />
              </li>
            ))}
          </ul>,
        );
      } else {
        elements.push(
          <ol key={elements.length} className="list-decimal ml-4 space-y-2">
            {currentList.map((item, i) => (
              <li key={i}>
                <FormattedText text={item} />
              </li>
            ))}
          </ol>,
        );
      }
      currentList = [];
      listType = null;
    }
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    // Headings
    if (trimmed.startsWith("## ")) {
      flushList();
      elements.push(
        <Heading key={index} level={3}>
          {trimmed.slice(3)}
        </Heading>,
      );
      inHeading = true;
      return;
    }

    if (trimmed.startsWith("# ")) {
      flushList();
      elements.push(
        <Heading key={index} level={2}>
          {trimmed.slice(2)}
        </Heading>,
      );
      inHeading = true;
      return;
    }

    // Bullet lists
    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      if (listType !== "ul") {
        flushList();
        listType = "ul";
      }
      currentList.push(trimmed.slice(2));
      inHeading = false;
      return;
    }

    // Numbered lists
    const numberedMatch = trimmed.match(/^\d+\.\s+(.*)$/);
    if (numberedMatch) {
      if (listType !== "ol") {
        flushList();
        listType = "ol";
      }
      currentList.push(numberedMatch[1]);
      inHeading = false;
      return;
    }

    // Empty line
    if (trimmed === "") {
      flushList();
      if (!inHeading) {
        elements.push(<div key={index} className="h-2" />);
      }
      inHeading = false;
      return;
    }

    // Regular paragraph
    flushList();
    elements.push(
      <p key={index} className="text-gray-700 leading-relaxed">
        <FormattedText text={trimmed} />
      </p>,
    );
    inHeading = false;
  });

  flushList();

  return <div className="space-y-2">{elements}</div>;
}
