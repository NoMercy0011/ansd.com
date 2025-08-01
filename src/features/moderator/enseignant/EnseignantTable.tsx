// import { EnseignantIdType } from "@/src/types/type";

// interface EnseignantTableProps {
//   data: EnseignantIdType | undefined;
//   columns: {
//     header: string;
//     accessor: string;
//     render?: (value: string) => React.ReactNode;
//   }[];
// }

// export default function EnseignantTable({ data, columns }: EnseignantTableProps) {
//   return (
//     <div className="overflow-x-auto border border-gray-200 rounded-lg">
//       <table className="min-w-full divide-y divide-gray-200">
//         <thead className="bg-gray-50">
//           <tr>
//             {columns.map((column, idx) => (
//               <th 
//                 key={idx} 
//                 className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//               >
//                 {column.header}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody className="bg-white divide-y divide-gray-200">
//           {data?.map((enseignant) => (
//             <tr key={enseignant.id_enseignant} className="hover:bg-gray-50">
//               {columns.map((column, colIdx) => (
//                 <td key={colIdx} className="px-6 py-4 whitespace-nowrap text-sm">
//                     {column.render 
//                     ? column.render(enseignant[column.accessor]) 
//                     : enseignant[column.accessor]
//                   }
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }