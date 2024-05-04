import { Image } from "@nextui-org/image";
import User from "./user";
import {Link} from "@nextui-org/react";

function Profile() {
  return (
    <div className="fixed top-0 left-0 w-full z-10 p-4 bg-background shadow flex items-center justify-between w-full">
      <div>
        <Link href="/">
          <Image
            width={48}
            src="/logo.jpg"
            alt="New Era"
            className="rounded-none"
          />
        </Link>
      </div>
      <User />
    </div>
  );
}

export default Profile;
