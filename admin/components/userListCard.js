import Link from "next/link";
import { DEFAULT_PROFILE_IMAGE_URL } from "../constants";

export default function UserListCard({ user }) {
  let profileImage = DEFAULT_PROFILE_IMAGE_URL;

  if (user?.profileUrl) {
    profileImage = user.profileUrl;
  }

  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <div
              className="min-w-2.25 min-h-2.25 max-w-2.25 max-h-2.25 bg-gray-200 bg-cover bg-center rounded-full"
              style={{ backgroundImage: `url(${profileImage})` }}
            ></div>
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">
              {user?.fullname}
            </div>
            <div className="text-sm text-gray-500">{user?.email}</div>
          </div>
        </div>
      </td>
      {/* <td className="px-6 py-4 whitespace-nowrap text-center">
        <div className="text-sm text-gray-900">
          Regional Paradigm Technician
        </div>
        <div className="text-sm text-gray-500">Optimization</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-center">
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
          Active
        </span>
      </td> */}
      {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
        {user.isCreator ? "Creator" : "-"}
      </td> */}
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <Link href={`/${user?.username}`}>
          <a className="text-indigo-600 hover:text-indigo-900">View</a>
        </Link>
      </td>
    </tr>
  );
}
