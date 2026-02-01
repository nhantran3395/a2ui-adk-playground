import { ActionButton, Button, Heading, Text } from "@react-spectrum/s2";
import PlusIcon from "@react-spectrum/s2/icons/Add";

interface ChatHistoryItem {
  id: string;
  title: string;
}

const recentChats: ChatHistoryItem[] = [
  { id: "1", title: "Frontend UI Refactor" },
  { id: "2", title: "Marketing Strategy Q4" },
  { id: "3", title: "Weather App Logic" },
];

function AppLogo() {
  return (
    <div className="p-4 flex items-center gap-2">
      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm font-bold">
        ✦
      </div>
      <Heading level={1}>Simple Chat</Heading>
    </div>
  );
}

export function LeftSidebar({ onNewChat }: { onNewChat: () => void }) {
  return (
    <div className="w-64 bg-gray-50 border-r border-gray-200 flex flex-col h-full">
      <AppLogo />

      <div className="px-3 mb-4">
        <Button variant="secondary" onPress={onNewChat}>
          <PlusIcon />
          <Text>New Chat</Text>
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto px-3">
        <Text>Recent</Text>
        <div className="space-y-1">
          {recentChats.map((chat) => (
            <ActionButton key={chat.id} isQuiet>
              <Text>{chat.title}</Text>
            </ActionButton>
          ))}
        </div>
      </div>

      <div className="p-3 border-t border-gray-200">
        <ActionButton isQuiet>
          <Text>Appearance</Text>
        </ActionButton>
      </div>
    </div>
  );
}
