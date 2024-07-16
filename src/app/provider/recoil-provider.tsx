"use client";

import { useEffect } from "react";
import { RecoilRoot, useRecoilSnapshot } from "recoil";

function DebugObserver(): React.ReactNode {
  const snapshot = useRecoilSnapshot();
  useEffect(() => {
    console.debug("The following atoms were modified:");
    for (const node of (snapshot as any).getNodes_UNSTABLE({
      isModified: true,
    })) {
      console.debug(node.key, snapshot.getLoadable(node));
    }
  }, [snapshot]);

  return null;
}

export function RecoilProvider({ children }: { children: React.ReactNode }) {
  return (
    <RecoilRoot>
      <DebugObserver />
      {children}
    </RecoilRoot>
  );
}
