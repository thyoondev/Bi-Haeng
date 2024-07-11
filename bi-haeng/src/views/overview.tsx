"use client";

import Map from "@/features/map/map";
import Settings from "@/widgets/overview/settings";
import Messages from "@/widgets/overview/messages";

const OverView = () => {
  return (
    <>
      <div
        className="relative hidden flex-col items-start gap-8 md:flex"
        x-chunk="dashboard-03-chunk-0"
      >
        <form className="grid w-full items-start gap-6">
          <Settings />
          <Messages />
        </form>
      </div>
      <div className="relative flex h-full min-h flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2 gap-4">
        <Map />
      </div>
    </>
  );
};

export default OverView;
