import { logout } from "@/app/actions/registerActions";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Link from "next/link";
import { CiEdit, CiLogout, CiUser } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";

function ProfilePopper() {
  return (
    <Menu as={"div"}>
      <MenuButton as={"div"}>
        {({ active }) => (
          <div className="flex items-center gap-1">
            <IoIosArrowDown
              className={`${active && "rotate-180"} duration-200`}
              size={14}
            />
            <p className="flex items-center justify-center w-12 h-12 bg-primary text-white rounded-full cursor-pointer text-lg shadow-md">
              ي
            </p>
          </div>
        )}
      </MenuButton>
      <MenuItems
        anchor={{ to: "bottom start", gap: "4px" }}
        transition
        className="flex flex-col gap-2 p-1 min-w-48 bg-white z-[100000] rounded-xl border shadow-2xl origin-top transition duration-200 ease-out data-[closed]:scale-95 data-[closed]:opacity-0 outline-none"
      >
        <MenuItem>
          <Link
            href={"/profile"}
            className="flex items-center gap-2 p-3 hover:bg-gray-300 cursor-pointer duration-100 text-sm rounded-lg"
          >
            <CiUser size={20} />
            <span>الصفحة الشخصية</span>
          </Link>
        </MenuItem>

        <MenuItem>
          <Link
            href={"/edit"}
            className="flex items-center gap-2 p-3 hover:bg-gray-300 cursor-pointer duration-100 text-sm rounded-lg"
          >
            <CiEdit size={20} />
            <span>تعديل البيانات</span>
          </Link>
        </MenuItem>

        <MenuItem>
          <div className="flex items-center gap-2 p-3 cursor-pointer text-sm rounded-lg bg-[red] text-white" onClick={() => logout()}>
            <CiLogout size={20} />
            <p>تسجيل الخروج</p>
          </div>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
}

export default ProfilePopper;
