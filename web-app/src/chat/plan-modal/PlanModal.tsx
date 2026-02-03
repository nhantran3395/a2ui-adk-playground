import { ActionButton, Heading } from "@react-spectrum/s2";
import CloseIcon from "@react-spectrum/s2/icons/Close";

import { MessageContent } from "../chat-message/MessageContent";

interface PlanData {
  title: string;
  content: string;
  version: number;
}

export function PlanModal({
  plan,
  onClose,
}: {
  plan: PlanData;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl max-w-2xl w-full mx-4 max-h-[80vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <Heading level={3}>{plan.title}</Heading>
          <ActionButton isQuiet onPress={onClose} aria-label="Close">
            <CloseIcon />
          </ActionButton>
        </div>
        <div className="p-6 overflow-y-auto prose prose-sm">
          <MessageContent content={plan.content} />
        </div>
      </div>
    </div>
  );
}
