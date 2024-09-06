import React, { useEffect } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
  Image,
  Avatar,
} from "@nextui-org/react";
import { useRouter } from "next/router";
import ConnectButton from "./ConnectButton";

export default function Header2() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleMenuClick = (path: string) => {
    setIsMenuOpen(false); // Menüyü kapat
    router.replace(path); // Sayfayı değiştir
  };

  return (
    <Navbar
      maxWidth="full"
      isMenuOpen={isMenuOpen}
      className={`bg-header-bg h-24 fixed z-[10]`}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:flex md:hidden sm:text-white"
        />
        <NavbarBrand className="flex gap-2">
          <Link href="/">
            <Image
              radius="none"
              src="/logo/logo-symbol.png"
              width={60}
              alt="logo"
            />
            <Image
              radius="none"
              src="/logo/logo-text.svg"
              width={150}
              alt="logo"
            />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        className="flex sm:hidden gap-4 text-white"
        justify="center"
      >
        <NavbarItem>
          <Button
            onClick={() => router.push("/eggs")}
            className={
              router.asPath === "/eggs" || router.asPath === "/"
                ? "text-2xl bg-transparent text-primary-300"
                : "text-2xl bg-transparent text-white"
            }
          >
            Eggs & Boxes
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button
            onClick={() => router.push("/marketplace")}
            className={
              router.asPath.startsWith("/marketplace")
                ? "text-2xl bg-transparent text-primary-300"
                : "text-2xl bg-transparent text-white"
            }
          >
            Marketplace
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button
            onClick={() => router.push("/upgrade")}
            className={
              router.asPath === "/upgrade"
                ? "text-2xl bg-transparent text-primary-300"
                : "text-2xl bg-transparent text-white"
            }
          >
            Upgrade
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button
            onClick={() => router.push("/stake")}
            className={
              router.asPath === "/stake"
                ? "text-2xl bg-transparent text-primary-300"
                : "text-2xl bg-transparent text-white"
            }
          >
            Stake
          </Button>
        </NavbarItem>

        <NavbarItem>
          <Button
            onClick={() => router.push("/stats")}
            className={
              router.asPath === "/stats"
                ? "text-2xl bg-transparent text-primary-300"
                : "text-2xl bg-transparent text-white"
            }
          >
            Statistics
          </Button>
        </NavbarItem>

        <NavbarItem>
          <Button
            onClick={() => router.push("/profile")}
            className={
              router.asPath === "/profile"
                ? "text-2xl bg-transparent text-primary-300"
                : "text-2xl bg-transparent text-white"
            }
          >
            Profile
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <ConnectButton />
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu className="bg-[#09092b] flex flex-col justify-between pb-20 z-[99999]">
        <NavbarMenuItem className="pt-10 flex flex-col gap-10">
          <Button
            className="w-full bg-transparent justify-start text-white text-3xl"
            onClick={() => handleMenuClick("/eggs")}
          >
            Eggs & Boxes
          </Button>
          <Button
            onClick={() => handleMenuClick("/marketplace")}
            className="w-full text-white bg-transparent justify-start text-3xl"
          >
            Marketplace
          </Button>
          <Button
            onClick={() => handleMenuClick("/upgrade")}
            className="w-full text-white bg-transparent justify-start text-3xl"
          >
            Upgrade
          </Button>
          <Button
            className="w-full text-white bg-transparent justify-start text-3xl"
            onClick={() => handleMenuClick("/stake")}
          >
            {"Stake"}
          </Button>
          <Button
            className="w-full text-white bg-transparent justify-start text-3xl"
            onClick={() => handleMenuClick("/stats")}
          >
            {"Statistics"}
          </Button>
          <Button
            className="w-full text-white bg-transparent justify-start text-3xl"
            onClick={() => handleMenuClick("/profile")}
          >
            Profile
          </Button>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
