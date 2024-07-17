"use client";

import { Button } from "@/shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { useRouter } from "next/navigation";

export function NotFound() {
  const router = useRouter();

  return (
    <div className="mx-auto h-screen items-center justify-center flex p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">404 Page Not Found</CardTitle>
          <CardDescription>
            Oops! It looks like the page you&apos;re looking for is out on a
            coffee break. ☕<br />
            <br /> The page you are looking for might have been removed, is
            temporarily unavailable, or maybe it just wandered off. Try heading
            back to the homepage before it gets back!
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4"></CardContent>
        <CardFooter>
          <Button className="w-full" onClick={() => router.replace("/")}>
            Back To Home
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
