import { Alert, AlertDescription, AlertTitle } from "@/shared/ui/alert";
import { AlertTriangle } from "lucide-react";

export function APIAlert() {
  return (
    <Alert variant="default">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Notice</AlertTitle>
      <AlertDescription>
        We&apos;re using the API from{" "}
        <a
          href="https://aviation-edge.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary"
        >
          aviation-edge.com.
        </a>{" "}
        Occasionally, their list might show some flights as &quot;offline&quot;
        even though they&apos;re in the air. Thanks for understanding!
        <br />
        <br />
        Safe travels!
      </AlertDescription>
    </Alert>
  );
}
