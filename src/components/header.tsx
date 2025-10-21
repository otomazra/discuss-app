import Link from "next/link";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Input,
} from "@nextui-org/react";
import React from "react";
import HeaderAuth from "./header-auth";
import SearchInput from "@/components/search-input";

export default function Header() {

  return (
    <Navbar className="shadow mb-6">
      <NavbarBrand>
        <Link href="/" className="">
          Discuss
        </Link>
      </NavbarBrand>
      <NavbarContent justify="center">
        <NavbarItem>
          <SearchInput />
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <HeaderAuth />
      </NavbarContent>
    </Navbar>
  );
}
