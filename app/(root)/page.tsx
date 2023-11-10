import { UserButton } from "@clerk/nextjs";

function SetupPage(): React.ReactElement {
  return (
    <div className="p-4">
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}

export default SetupPage;
