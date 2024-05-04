import { Image } from "@nextui-org/image";
import { Link } from "react-router-dom";
import User from "./user";

function Profile() {
  return (
    <div className="fixed top-0 left-0 w-full z-10 p-4 bg-background shadow flex items-center justify-between w-full">
      <div>
        <Link to="/">
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
