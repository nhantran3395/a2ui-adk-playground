import { ActionButton, Heading } from "@react-spectrum/s2";
import CloseIcon from "@react-spectrum/s2/icons/Close";
import EditIcon from "@react-spectrum/s2/icons/Edit";
import SaveFloppyIcon from "@react-spectrum/s2/icons/SaveFloppy";
import UndoIcon from "@react-spectrum/s2/icons/Undo";
import { useState } from "react";

import { MessageContent } from "../chat-message/MessageContent";

interface PlanData {
  title: string;
  content: string;
  version: number;
}

export function PlanModal({
  plan,
  onClose,
  onSave,
}: {
  plan: PlanData;
  onClose: () => void;
  onSave: (content: string) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(plan.content);

  const handleEdit = () => {
    setDraft(plan.content);
    setIsEditing(true);
  };

  const handleSave = () => {
    onSave(draft);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setDraft(plan.content);
    setIsEditing(false);
  };

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
          <div className="flex items-center gap-1">
            {isEditing ? (
              <>
                <ActionButton isQuiet onPress={handleSave} aria-label="Save">
                  <SaveFloppyIcon />
                </ActionButton>
                <ActionButton
                  isQuiet
                  onPress={handleCancel}
                  aria-label="Cancel"
                >
                  <UndoIcon />
                </ActionButton>
              </>
            ) : (
              <ActionButton isQuiet onPress={handleEdit} aria-label="Edit">
                <EditIcon />
              </ActionButton>
            )}
            <ActionButton isQuiet onPress={onClose} aria-label="Close">
              <CloseIcon />
            </ActionButton>
          </div>
        </div>

        {isEditing ? (
          <textarea
            className="flex-1 p-6 overflow-y-auto font-mono text-sm leading-relaxed resize-none focus:outline-none"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            autoFocus
          />
        ) : (
          <div className="p-6 overflow-y-auto prose prose-sm">
            <MessageContent content={plan.content} />
          </div>
        )}
      </div>
    </div>
  );
}
