"use client"
import { usePathname } from "next/navigation";


export function Footer() {
  const pathname = usePathname();
  const isPage = pathname === "/";
  return (
    <>
      {!isPage && (
        <footer className="border-t absolute  bottom-0 w-full py-6 md:px-8 md:py-0 bg-[#0e0e0e] h-[5%]">
          <div className="container flex flex-col items-center justify-center gap-4 md:h-14 md:flex-row">
            <p className="text-center text-sm leading-loose text-muted-foreground">
              Built by Founders for Founders | Daftar Operating System Technology Version Beta 1.1
            </p>
          </div>
        </footer>
      )}
    </>
  )
} 