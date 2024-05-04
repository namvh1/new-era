import { Image } from "@nextui-org/image";
import { Link } from "@nextui-org/react";
import User from "./user";

function Profile() {
  return (
    <div className="fixed top-0 left-0 w-full z-50 p-4 bg-background shadow flex items-center justify-between w-full">
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
      <div className="flex items-center gap-8">
        <Link className="cursor-pointer" href="/">Home</Link>
        <Link className="cursor-pointer" href="/leaderboard">Leader Board</Link>
      </div>
      <User />
    </div>
  );
}

export default Profile;
