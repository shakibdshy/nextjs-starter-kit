"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import { IconPackage, IconUser } from "@tabler/icons-react";
import { signOut, useSession } from "next-auth/react";

import { AuthModal } from "./auth-modal";
import { ThemeSwitcher } from "./theme-switcher";

const navigationItems = [
  { name: "Home", href: "/" },
  { name: "Profile", href: "/profile" },
  { name: "Account", href: "/account" },
];

export default function CustomNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { data: session, status } = useSession();

  const handleSignOut = () => {
    signOut();
  };

  console.log("image", session?.user?.image!);

  return (
    <>
      <Navbar onMenuOpenChange={setIsMenuOpen}>
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <NavbarBrand>
            <Link
              href="/"
              className="flex items-center gap-2 text-lg font-bold"
            >
              <IconPackage />
              Next.js Starter Kit
            </Link>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden gap-4 sm:flex" justify="center">
          {navigationItems.map((item) => (
            <NavbarItem key={item.name}>
              <Link href={item.href}>{item.name}</Link>
            </NavbarItem>
          ))}
        </NavbarContent>

        <NavbarContent justify="end">
          <ThemeSwitcher />
          {status === "authenticated" && session?.user ? (
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Button isIconOnly variant="light" aria-label="Profile">
                  {session.user ? (
                    <Image
                      src={session.user.image!}
                      alt={session.user.name!}
                      width={100}
                      height={100}
                    />
                  ) : (
                    <IconUser />
                  )}
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold">{session.user.email}</p>
                </DropdownItem>
                <DropdownItem key="settings">My Settings</DropdownItem>
                <DropdownItem key="help_and_feedback">
                  Help & Feedback
                </DropdownItem>
                <DropdownItem
                  key="logout"
                  color="danger"
                  onPress={handleSignOut}
                >
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <Button
              color="primary"
              variant="flat"
              onPress={() => setIsAuthModalOpen(true)}
            >
              Sign In
            </Button>
          )}
        </NavbarContent>

        <NavbarMenu>
          {navigationItems.map((item) => (
            <NavbarMenuItem key={item.name}>
              <Link color="foreground" className="w-full" href={item.href}>
                {item.name}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
}
