import { ActionButton, Button, Heading, Text } from "@react-spectrum/s2";
import PlusIcon from "@react-spectrum/s2/icons/Add";

interface ChatHistoryItem {
  id: string;
  title: string;
}

// Mock chat history data
const recentChats: ChatHistoryItem[] = [
  { id: "1", title: "Frontend UI Refactor" },
  { id: "2", title: "Marketing Strategy Q4" },
  { id: "3", title: "Weather App Logic" },
];

export function Sidebar({ onNewChat }: { onNewChat: () => void }) {
  return (
    <div className="w-64 bg-gray-50 border-r border-gray-200 flex flex-col h-full">
      {/* Logo */}
      <div className="p-4 flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm font-bold">
          ✦
        </div>
        <Heading level={1} UNSAFE_className="text-xl font-semibold">
          Simple Chat
        </Heading>
      </div>

      {/* New Chat Button */}
      <div className="px-3 mb-4">
        <Button
          variant="secondary"
          onPress={onNewChat}
          UNSAFE_className="w-full justify-start"
        >
          <PlusIcon />
          <Text>New Chat</Text>
        </Button>
      </div>

      {/* Recent Chats */}
      <div className="flex-1 overflow-y-auto px-3">
        <Text UNSAFE_className="text-xs font-medium text-red-500 uppercase mb-2 block px-2">
          Recent
        </Text>
        <div className="space-y-1">
          {recentChats.map((chat) => (
            <ActionButton
              key={chat.id}
              isQuiet
              UNSAFE_className="w-full justify-start text-left px-2 py-1.5"
            >
              <Text UNSAFE_className="text-sm text-gray-700 truncate">
                {chat.title}
              </Text>
            </ActionButton>
          ))}
        </div>
      </div>

      {/* Appearance Toggle */}
      <div className="p-3 border-t border-gray-200">
        <ActionButton isQuiet UNSAFE_className="w-full justify-start">
          <Text UNSAFE_className="text-sm">Appearance</Text>
        </ActionButton>
      </div>
    </div>
  );
}
