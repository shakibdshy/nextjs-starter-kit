"use client";

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

import { ThemeSwitcher } from "./theme-switcher";

const navigationItems = [
  { name: "Home", href: "/" },
  { name: "Profile", href: "/profile" },
  { name: "Account", href: "/account" },
];

export default function CustomNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // This should be replaced with your actual authentication logic
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link href="/" className="flex items-center gap-2 text-lg font-bold">
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
        {isLoggedIn ? (
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Button isIconOnly variant="light" aria-label="Profile">
                <IconUser />
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">user@example.com</p>
              </DropdownItem>
              <DropdownItem key="settings">My Settings</DropdownItem>
              <DropdownItem key="help_and_feedback">
                Help & Feedback
              </DropdownItem>
              <DropdownItem
                key="logout"
                color="danger"
                onPress={() => setIsLoggedIn(false)}
              >
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : (
          <Button
            color="primary"
            variant="flat"
            onPress={() => setIsLoggedIn(true)}
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
  );
}
