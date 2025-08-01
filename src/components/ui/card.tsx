// import { ReactNode } from "react";
// import { LucideIcon } from "lucide-react";

// interface CardProps {
//   title: string;
//   children: ReactNode;
//   className?: string;
//   action?: ReactNode;
// }

// export function Card({ title, children, className = "", action }: CardProps) {
//   return (
//     <div className={`bg-white rounded-xl border border-gray-200 overflow-hidden ${className}`}>
//       <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
//         <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
//         {action}
//       </div>
//       <div className="p-6">
//         {children}
//       </div>
//     </div>
//   );
// }

// interface CardStatProps {
//   title: string;
//   value: string;
//   change: string;
//   icon: LucideIcon;
//   color: string;
// }

// export function CardStat({ title, value, change, icon: Icon, color }: CardStatProps) {
//   const colorClasses = [
//     {sky: "bg-sky-100 text-sky-600"},
//     {pink: "bg-pink-100 text-pink-600"},
//     {orange: "bg-orange-100 text-orange-600"},
//     {purple: "bg-purple-100 text-purple-600"}
// ];

//   return (
//     <div className="bg-white rounded-xl border border-gray-200 p-6">
//       <div className="flex justify-between">
//         <div>
//           <p className="text-sm font-medium text-gray-500">{title}</p>
//           <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
//           <p className={`text-sm font-medium ${change.startsWith("+") ? "text-green-600" : "text-red-600"} mt-1`}>
//             {change}
//           </p>
//         </div>
//         <div className={`h-12 w-12 rounded-lg flex items-center justify-center ${colorClasses[color]}`}>
//           <Icon className="h-6 w-6" />
//         </div>
//       </div>
//     </div>
//   );
// }

// interface CardChartProps {
//   type: "bar" | "pie" | "line";
//   data: any;
//   options?: any;
// }

// export function CardChart({ type, data, options }: CardChartProps) {
//   // En production, vous utiliseriez react-chartjs-2 ou un autre librairie
//   // Ceci est une simulation pour le prototype
//   return (
//     <div className="h-64">
//       <div className="w-full h-full flex items-center justify-center bg-gray-50 rounded-lg">
//         <div className="text-center p-4">
//           <p className="text-gray-500 mb-2">[Graphique {type} interactif]</p>
//           <p className="text-xs text-gray-400">En production: données dynamiques avec animations fluides</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export function CardTable({ columns, data }: { columns: string[]; data: any[] }) {
//   return (
//     <div className="overflow-x-auto">
//       <table className="min-w-full divide-y divide-gray-200">
//         <thead className="bg-gray-50">
//           <tr>
//             {columns.map((column, index) => (
//               <th key={index} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 {column}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody className="bg-white divide-y divide-gray-200">
//           {data.map((row, rowIndex) => (
//             <tr key={rowIndex}>
//               {columns.map((column, colIndex) => (
//                 <td key={colIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                   {row[column.toLowerCase().replace(/ /g, '_')]}
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }