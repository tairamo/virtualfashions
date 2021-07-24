import { useEffect, useRef, useState } from "react";

export default function LeadCard(props) {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {props.lead.email ? props.lead.email : "Null"}
      </td>
      {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <input type="checkbox" item onChange={() => setIsSelected(!isSelected)}></input>
              </td> */}
      {/* <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <a href="#" className="text-indigo-600 hover:text-indigo-900">Edit</a>
              </td> */}
    </tr>
  );
}
