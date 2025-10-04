"use client";
import {
  NavbarItem,
  Button,
  Avatar,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";
import * as actions from "@/actions/index";
import { useSession } from "next-auth/react";
import React from "react";

export default function HeaderAuth() {
  const session = useSession();
  let authContent: React.ReactNode;
  if (session?.status === "loading") {
    authContent = null;
  } else if (session.data?.user) {
    authContent = (
      <Popover placement="left">
        <PopoverTrigger>
          <Avatar
            src={session.data?.user.image || ""}
            className="border border-purple-200 border-1px hover:shadow cursor-pointer"
          />
        </PopoverTrigger>
        <PopoverContent>
          <form action={actions.signOut}>
            <Button type="submit" color="primary" variant="flat">
              Sign Out
            </Button>
          </form>
        </PopoverContent>
      </Popover>
    );
  } else {
    authContent = (
      <>
        <NavbarItem>
          <form action={actions.signIn}>
            <Button type="submit" color="secondary" variant="bordered">
              Sign In
            </Button>
          </form>
        </NavbarItem>
        <NavbarItem>
          <form action={actions.signIn}>
            <Button type="submit" color="primary" variant="flat">
              Sign Up
            </Button>
          </form>
        </NavbarItem>
      </>
    );
  }
  return authContent;
}
