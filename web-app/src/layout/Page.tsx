import { LeftSidebar } from "./left-sidebar";
import { MainContent } from "./main-content";

export function Page() {
  return (
    <section className="flex w-screen h-screen">
      <LeftSidebar onNewChat={() => {}} />
      <MainContent />
    </section>
  );
}
