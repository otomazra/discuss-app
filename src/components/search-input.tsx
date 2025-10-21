'use client';

import { useSearchParams } from "next/navigation";
import {Input} from "@nextui-org/react";

export default function SearchInput(){
    const searchParams = useSearchParams();
    return <Input defaultValue={searchParams.get("term") || ""}/>
}