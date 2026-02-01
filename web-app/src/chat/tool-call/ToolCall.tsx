import type { ToolCall } from "@copilotkit/shared";
import SearchIcon from "@react-spectrum/s2/icons/Search";
import { Text } from "@react-spectrum/s2";

const getToolIcon = (name: string) => {
  if (name.includes("search") || name.includes("google")) {
    return <SearchIcon />;
  }

  return <SearchIcon />;
};

const getToolDisplayName = (name: string) => {
  return `${name}()`;
};

const getToolArgs = (args: string) => {
  try {
    const parsed = JSON.parse(args);
    if (typeof parsed === "object") {
      return Object.values(parsed).join(", ");
    }
    return args;
  } catch {
    return args;
  }
};

export function ToolCallDisplay({
  toolCall,
  status,
}: {
  toolCall: ToolCall;
  status: "pending" | "success" | "error";
}) {
  const statusColor =
    status === "success"
      ? "text-green-600"
      : status === "error"
      ? "text-red-600"
      : "text-yellow-600";
  const statusText =
    status === "success"
      ? "Success"
      : status === "error"
      ? "Error"
      : "Running...";

  const bgColor =
    toolCall.function.name.includes("search") ||
    toolCall.function.name.includes("google")
      ? "bg-blue-50 border-blue-200"
      : "bg-orange-50 border-orange-200";

  const iconBgColor =
    toolCall.function.name.includes("search") ||
    toolCall.function.name.includes("google")
      ? "bg-blue-100 text-blue-600"
      : "bg-orange-100 text-orange-600";

  return (
    <div className={`rounded-lg border p-3 ${bgColor}`}>
      <div className="flex items-start gap-3">
        <div className={`rounded-lg p-2 ${iconBgColor}`}>
          {getToolIcon(toolCall.function.name)}
        </div>
        <div className="flex-1 min-w-0">
          <Text UNSAFE_className="text-xs font-medium text-blue-600 block">
            {getToolDisplayName(toolCall.function.name)}
          </Text>
          <Text UNSAFE_className="text-sm text-gray-700 truncate block">
            "{getToolArgs(toolCall.function.arguments)}"
          </Text>
          <Text UNSAFE_className={`text-xs font-medium ${statusColor} block`}>
            {statusText}
          </Text>
        </div>
      </div>
    </div>
  );
}
