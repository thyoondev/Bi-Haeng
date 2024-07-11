import { Button } from "@/shared/ui/button";
import { DarkModeToggle } from "@/shared/ui/darkModeToggle";
import { TooltipContent, TooltipTrigger } from "@/shared/ui/tooltip";
import { Tooltip } from "@radix-ui/react-tooltip";
import { Map, Plane } from "lucide-react";

const NavLayout = () => {
  return (
    <aside className="inset-y fixed  left-0 z-20 flex h-full flex-col border-r">
      <div className="border-b p-2">
        <Button variant="outline" size="icon" aria-label="Home">
          <Plane className="size-5 fill-foreground" />
        </Button>
      </div>
      <nav className="grid gap-1 p-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-lg bg-muted"
              aria-label="Overview"
            >
              <Map className="size-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={5}>
            Overview
          </TooltipContent>
        </Tooltip>
      </nav>
      <nav className="mt-auto grid gap-1 p-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <DarkModeToggle />
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={5}>
            Theme
          </TooltipContent>
        </Tooltip>
      </nav>
    </aside>
  );
};

export default NavLayout;
