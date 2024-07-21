import { RxHamburgerMenu } from "react-icons/rx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

interface MobileMenuProps {
  username: string;
}

const MobileMenu = ({ username }: MobileMenuProps) => {
  return (
    <div className="md:hidden bg-white">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="text-blue-600">
            <RxHamburgerMenu size={28} />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white">
          <DropdownMenuLabel>
            <Link href={`/`}>홈</Link>
          </DropdownMenuLabel>
          {/* <DropdownMenuSeparator /> */}
          <DropdownMenuItem>
            <Link href={`/profile/${username}`}>내정보</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href={"/chats"}>채팅</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default MobileMenu;
