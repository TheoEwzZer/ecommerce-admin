import { ReactElement } from "react";

import { BillboardClient } from "./components/client";

function BillboardsPage(): ReactElement {
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient />
      </div>
    </div>
  );
}

export default BillboardsPage;
