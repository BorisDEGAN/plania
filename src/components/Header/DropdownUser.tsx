import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { LogOut, Settings, LucideChevronDown } from "lucide-react";
import { userStore } from "@/stores/useUserStore";
import authApi from "@/services/auth.service";
import { useRouter } from "next/navigation";
import useToast from "@/shared/helpers/useToast";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const DropdownUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);

  const { user, clearUser } = userStore()

  const router = useRouter()

  const { toastSuccess } = useToast()

  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  function logout() {
    authApi().signOut().then((response) => {
      clearUser()
      toastSuccess(response.message)
      router.replace("/sign-in")
    });
  }

  return (
    <div className="relative">
      <Link
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4"
        href="#"
      >
        <span className="hidden text-right lg:block">
          <span className="block text-sm font-medium text-black dark:text-white">
            {user?.fullname}
          </span>
        </span>

        <span className="h-12 w-12 rounded-full">
          <Avatar>
            <AvatarFallback>{user.fullname && user.fullname.slice(0, 1)}</AvatarFallback>
          </Avatar>

        </span>

        <LucideChevronDown
          className="hidden sm:block"
        />
      </Link>

      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ${dropdownOpen === true ? "block" : "hidden"
          }`}
      >
        {/* <ul className="flex flex-col gap-5 border-b border-stroke px-6 py-7.5 dark:border-strokedark">
          <li>
            <Link
              href="/settings"
              className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
            >
              <Settings />
              Parametres
            </Link>
          </li>
        </ul> */}
        <button onClick={logout} className="flex items-center gap-3.5 px-6 py-4 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base">
          <LogOut />
          Se déconnecter
        </button>
      </div>
    </div>
  );
};

export default DropdownUser;
