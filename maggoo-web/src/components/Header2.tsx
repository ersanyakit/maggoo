import React from "react";
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
  link
} from "@nextui-org/react";
import { Lilita_One } from "next/font/google";

const lilita = Lilita_One({
  weight: "400",
  subsets: ["latin"]
});

export default function Header2() {
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80, // Adjust the offset here
        behavior: "smooth"
      });
      if (isMenuOpen) {
        setIsMenuOpen(false); // Close the menu if it is open
      }
    }
  };
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <Navbar
      isMenuOpen={isMenuOpen}
      maxWidth="full"
      className={` ${lilita.className} bg-header-bg h-24 z-50`}
      onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent className="">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:flex md:hidden sm:text-white"
        />
        <NavbarBrand as={Link} href="/">
          <Image src="/logo/logo.webp" width={200} alt="lgoo" />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="flex sm:hidden gap-4" justify="center">
        <NavbarItem>
          <Button
            onClick={() => scrollToSection("INFO")}
            className={`  text-xl bg-transparent text-white`}>
            P2E
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button
            onClick={() => scrollToSection("PARTNERS")}
            className={`  text-xl bg-transparent text-white`}>
            Partners
          </Button>
        </NavbarItem>

        <NavbarItem>
          <Button
            as={Link}
            href="https://maggooland.gitbook.io/maggooland"
            target="_blank"
            className={` text-xl bg-transparent text-white`}>
            White Paper
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button
            as={Link}
            href="https://app.maggoo.io"
            target="_blank"
            className={` btn btn-primary text-xl`}>
            Launch APP
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu
        className={`${lilita.className} bg-[#09092b] flex flex-col justify-between pb-20 `}>
        <NavbarMenuItem className="pt-10 flex flex-col gap-10 ">
          <Button
            onClick={() => scrollToSection("INFO")}
            className="w-full bg-transparent  justify-start text-white text-3xl "
            href="#"
            size="lg">
            P2E
          </Button>
          <Button
            onClick={() => scrollToSection("PARTNERS")}
            className="w-full text-white bg-transparent justify-start text-3xl "
            href="#"
            size="lg">
            Partners
          </Button>

          <Button
            as={Link}
            className="w-full text-white bg-transparent justify-start  text-3xl"
            href="https://maggooland.gitbook.io/maggooland"
            target="_blank"
            size="lg">
            White Paper
          </Button>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
