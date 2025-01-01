"use client";

import { useEffect } from "react";
import { cn } from "~/lib/utils";

import { Icon } from "~/components/global";
import { Button } from "~/components/ui/button";

import useRouter from "~/hooks/usePRouter";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset?: () => void }) {
  const router = useRouter();
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div
      className={cn(
        "mx-auto h-full w-full max-w-screen-md",
        "flex flex-grow flex-col items-center justify-center gap-2",
      )}
    >
      <Icon
        name='CircleX'
        className='size-10 stroke-destructive'
      />
      <div className='flex flex-col'>
        <span className='text-center text-destructive'>Something went wrong</span>
        <span className='text-center text-sm text-destructive'>More details can be found in the console</span>
      </div>
      <code className='my-4 w-full whitespace-pre-wrap rounded-[var(--radius)] bg-muted px-3 py-1.5 text-sm text-muted-foreground'>
        {error.message}
      </code>

      <div className='flex w-full items-center gap-2'>
        <Button
          className='w-full'
          onClick={() => {
            if (reset) reset();
            else router.refresh();
          }}
        >
          Try again
        </Button>
        <Button
          variant={"outline"}
          className='w-full'
          onClick={() => router.back()}
        >
          Back to previous page
        </Button>
      </div>
    </div>
  );
}
