import { ActionButton, Text } from "@react-spectrum/s2";
import FileTextIcon from "@react-spectrum/s2/icons/FileText";

export function PlanIndicator({
  title,
  onOpen,
}: {
  title: string;
  onOpen: () => void;
}) {
  return (
    <div className="max-w-5xl mx-auto w-4/5 px-4 pt-2">
      <ActionButton onPress={onOpen} isQuiet>
        <FileTextIcon />
        <Text>Plan: {title}</Text>
      </ActionButton>
    </div>
  );
}
