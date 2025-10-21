"use client";

import { useSearchParams } from "next/navigation";
import { Input, Button } from "@nextui-org/react";
import * as actions from "@/actions";

export default function SearchInput() {
  const searchParams = useSearchParams();

  return (
    <form action={actions.search}>
      <Input name = "term" defaultValue={searchParams.get("term") || ""} />
        <Button type="submit">Search</Button>
    </form>
  );
}
