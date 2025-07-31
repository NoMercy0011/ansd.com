// "use client";

// import { useState, useRef, useEffect } from 'react';
// import { ChevronUp, ChevronDown, ArrowLeft, Plus, Clock } from 'lucide-react';

// type Day = 'Lundi' | 'Mardi' | 'Mercredi' | 'Jeudi' | 'Vendredi' | 'Samedi';
// type Subject = 'FR' | 'MATH' | 'PC' | 'HG' | 'SV' | 'ANG' | 'ESP' | 'PHILO' | 'SPORT';
// type Professor = 'Dupont' | 'Martin' | 'Lambert' | 'Dubois' | 'Weiss' | 'Sanchez' | 'Rossi' | 'Lefevre' | 'Durand';

// interface Course {
//   professor: Professor;
//   subject: Subject;
//   classroom: string;
//   startTime: string;
//   endTime: string;
// }

// interface TimeSlot {
//   id: string;
//   label: string;
//   timeBlock: 'Matin' | 'Récréation' | 'Après-midi';
//   visible: boolean;
//   timeRange: string;
//   courses: Record<Day, Course | null>;
// }

// const EmploiDuTempsDropdown = () => {
//   const days: Day[] = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
//   const subjects: Subject[] = ['FR', 'MATH', 'PC', 'HG', 'SV', 'ANG', 'ESP', 'PHILO', 'SPORT'];
//   const professors: Professor[] = ['Dupont', 'Martin', 'Lambert', 'Dubois', 'Weiss', 'Sanchez', 'Rossi', 'Lefevre', 'Durand'];
//   const classrooms = ['A04', 'B12', 'Lab1', 'Lab2', 'B07', 'A11', 'A08', 'Gym'];
//   const times = Array.from({length: 13}, (_, i) => `${8 + i}:00`).concat(['21:00']);

//   // État pour le dropdown
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [currentDay, setCurrentDay] = useState<Day | null>(null);
//   const [currentSlot, setCurrentSlot] = useState<string | null>(null);
//   const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   // Initialisation avec des créneaux vides
//   const initialTimeSlots: TimeSlot[] = [
//     { id: '1', label: 'Créneau 1', timeBlock: 'Matin', visible: true, timeRange: '8h-9h', courses: Object.fromEntries(days.map(day => [day, null])) },
//     { id: '2', label: 'Créneau 2', timeBlock: 'Matin', visible: true, timeRange: '9h-10h', courses: Object.fromEntries(days.map(day => [day, null])) },
//     { id: '3', label: 'Pause', timeBlock: 'Récréation', visible: true, timeRange: '10h-10h15', courses: Object.fromEntries(days.map(day => [day, null])) },
//     { id: '4', label: 'Créneau 3', timeBlock: 'Récréation', visible: true, timeRange: '10h15-11h15', courses: Object.fromEntries(days.map(day => [day, null])) },
//     { id: '5', label: 'Créneau 4', timeBlock: 'Après-midi', visible: true, timeRange: '13h30-14h30', courses: Object.fromEntries(days.map(day => [day, null])) },
//     { id: '6', label: 'Créneau 5', timeBlock: 'Après-midi', visible: true, timeRange: '14h30-15h30', courses: Object.fromEntries(days.map(day => [day, null])) },
//     { id: '7', label: 'Créneau 6', timeBlock: 'Après-midi', visible: true, timeRange: '15h30-16h30', courses: Object.fromEntries(days.map(day => [day, null])) }
//   ];

//   const [timeSlots, setTimeSlots] = useState<TimeSlot[]>(initialTimeSlots);
//   const [formData, setFormData] = useState<Partial<Course>>({
//     professor: 'Dupont',
//     subject: 'MATH',
//     classroom: 'B12',
//     startTime: '08:00',
//     endTime: '09:00'
//   });

//   const toggleSlotVisibility = (id: string) => {
//     setTimeSlots(prev => 
//       prev.map(slot => 
//         slot.id === id ? { ...slot, visible: !slot.visible } : slot
//       )
//     );
//   };

//   const subjectColors: Record<Subject, string> = {
//     FR: 'bg-blue-100 text-blue-800 border-blue-200',
//     MATH: 'bg-purple-100 text-purple-800 border-purple-200',
//     PC: 'bg-red-100 text-red-800 border-red-200',
//     HG: 'bg-green-100 text-green-800 border-green-200',
//     SV: 'bg-teal-100 text-teal-800 border-teal-200',
//     ANG: 'bg-yellow-100 text-yellow-800 border-yellow-200',
//     ESP: 'bg-indigo-100 text-indigo-800 border-indigo-200',
//     PHILO: 'bg-pink-100 text-pink-800 border-pink-200',
//     SPORT: 'bg-orange-100 text-orange-800 border-orange-200'
//   };

//   // Ouvrir le dropdown
//   const openDropdown = (day: Day, slotId: string, event: React.MouseEvent) => {
//     const rect = event.currentTarget.getBoundingClientRect();
//     setDropdownPosition({
//       top: rect.bottom + window.scrollY + 5,
//       left: rect.left + window.scrollX
//     });
    
//     setCurrentDay(day);
//     setCurrentSlot(slotId);
//     setDropdownOpen(true);
    
//     // Pré-remplir avec le cours existant s'il y en a un
//     const slot = timeSlots.find(s => s.id === slotId);
//     if (slot && slot.courses[day]) {
//       setFormData({
//         ...slot.courses[day],
//         startTime: slot.courses[day]?.startTime || '08:00',
//         endTime: slot.courses[day]?.endTime || '09:00'
//       });
//     }
//   };

//   // Fermer le dropdown
//   const closeDropdown = () => {
//     setDropdownOpen(false);
//   };

//   // Sauvegarder le cours
//   const saveCourse = () => {
//     if (!currentDay || !currentSlot) return;

//     setTimeSlots(prev =>
//       prev.map(slot => {
//         if (slot.id === currentSlot) {
//           const newCourses = { ...slot.courses };
//           newCourses[currentDay] = formData as Course;
          
//           // Mettre à jour le timeRange si nécessaire
//           let timeRange = slot.timeRange;
//           if (formData.startTime && formData.endTime) {
//             const start = formData.startTime.replace(':', 'h');
//             const end = formData.endTime.replace(':', 'h');
//             timeRange = `${start}-${end}`;
//           }

//           return { ...slot, courses: newCourses, timeRange };
//         }
//         return slot;
//       })
//     );

//     closeDropdown();
//   };

//   // Supprimer le cours
//   const deleteCourse = () => {
//     if (!currentDay || !currentSlot) return;

//     setTimeSlots(prev =>
//       prev.map(slot => {
//         if (slot.id === currentSlot) {
//           const newCourses = { ...slot.courses };
//           newCourses[currentDay] = null;
//           return { ...slot, courses: newCourses };
//         }
//         return slot;
//       })
//     );

//     closeDropdown();
//   };

//   // Gérer le clic en dehors du dropdown
//   const handleClickOutside = (event: MouseEvent) => {
//     if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//       closeDropdown();
//     }
//   };

//   // Effet pour gérer le clic en dehors
//   useEffect(() => {
//     if (dropdownOpen) {
//       document.addEventListener('mousedown', handleClickOutside);
//     } else {
//       document.removeEventListener('mousedown', handleClickOutside);
//     }
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [dropdownOpen]);

//   return (
//     <div className="min-h-screen bg-gray-50 p-4 relative">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="flex items-center mb-6">
//           <button className="mr-4 p-2 rounded-full hover:bg-gray-200">
//             <ArrowLeft size={20} />
//           </button>
//           <h1 className="text-2xl font-bold">Emploi du temps - Terminale A</h1>
//         </div>

//         {/* Tableau principal */}
//         <div className="overflow-x-auto bg-white rounded-lg shadow">
//           <table className="min-w-full">
//             <thead>
//               <tr>
//                 <th className="p-3 font-medium text-left w-40">Créneaux</th>
//                 {days.map(day => (
//                   <th key={day} className="p-3 font-medium text-center">
//                     {day === 'Mercredi' ? 'Mercre.' : day}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {timeSlots.map(slot => (
//                 <tr key={slot.id} className={!slot.visible ? 'hidden' : ''}>
//                   {/* Cellule créneau */}
//                   <td className="border-t p-3">
//                     <div className="flex items-center justify-between">
//                       <div>
//                         <div className="font-medium">{slot.label}</div>
//                         <div className="text-sm text-gray-500">{slot.timeRange}</div>
//                       </div>
//                       <button 
//                         onClick={() => toggleSlotVisibility(slot.id)}
//                         className="p-1 text-gray-500 hover:text-gray-700"
//                       >
//                         {slot.visible ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
//                       </button>
//                     </div>
//                   </td>

//                   {/* Cellules cours */}
//                   {days.map(day => (
//                     <td key={`${slot.id}-${day}`} className="border-t p-3">
//                       {slot.courses[day] ? (
//                         <div 
//                           onClick={(e) => openDropdown(day, slot.id, e)}
//                           className={`p-2 rounded text-center border cursor-pointer hover:shadow-md transition-shadow ${subjectColors[slot.courses[day]!.subject]}`}
//                         >
//                           <div className="font-bold">{slot.courses[day]!.subject}</div>
//                           <div className="text-xs">Pr. {slot.courses[day]!.professor}</div>
//                           <div className="text-xs mt-1">{slot.courses[day]!.classroom}</div>
//                           <div className="text-xs mt-1 flex items-center justify-center">
//                             <Clock size={12} className="mr-1" />
//                             {slot.courses[day]!.startTime} - {slot.courses[day]!.endTime}
//                           </div>
//                         </div>
//                       ) : (
//                         <button 
//                           onClick={(e) => openDropdown(day, slot.id, e)}
//                           className="w-full h-full p-2 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded border border-dashed"
//                         >
//                           <Plus size={20} />
//                         </button>
//                       )}
//                     </td>
//                   ))}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Dropdown pour ajouter/modifier un cours */}
//         {dropdownOpen && (
//           <div 
//             ref={dropdownRef}
//             className="absolute z-50 bg-white rounded-lg shadow-xl border border-gray-200 p-4 w-64"
//             style={{
//               top: `${dropdownPosition.top}px`,
//               left: `${dropdownPosition.left}px`,
//               transform: 'translateX(-50%)'
//             }}
//           >
//             <div className="space-y-3">
//               <div>
//                 <label className="block text-xs font-medium text-gray-500 mb-1">Matière</label>
//                 <select
//                   value={formData.subject}
//                   onChange={(e) => setFormData({...formData, subject: e.target.value as Subject})}
//                   className="w-full p-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-200"
//                 >
//                   {subjects.map(subject => (
//                     <option key={subject} value={subject}>{subject}</option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-xs font-medium text-gray-500 mb-1">Professeur</label>
//                 <select
//                   value={formData.professor}
//                   onChange={(e) => setFormData({...formData, professor: e.target.value as Professor})}
//                   className="w-full p-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-200"
//                 >
//                   {professors.map(prof => (
//                     <option key={prof} value={prof}>Pr. {prof}</option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-xs font-medium text-gray-500 mb-1">Salle</label>
//                 <select
//                   value={formData.classroom}
//                   onChange={(e) => setFormData({...formData, classroom: e.target.value})}
//                   className="w-full p-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-200"
//                 >
//                   {classrooms.map(room => (
//                     <option key={room} value={room}>{room}</option>
//                   ))}
//                 </select>
//               </div>

//               <div className="grid grid-cols-2 gap-2">
//                 <div>
//                   <label className="block text-xs font-medium text-gray-500 mb-1">Début</label>
//                   <input
//                     type="time"
//                     value={formData.startTime}
//                     onChange={(e) => setFormData({...formData, startTime: e.target.value})}
//                     className="w-full p-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-200"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-xs font-medium text-gray-500 mb-1">Fin</label>
//                   <input
//                     type="time"
//                     value={formData.endTime}
//                     onChange={(e) => setFormData({...formData, endTime: e.target.value})}
//                     className="w-full p-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-200"
//                   />
//                 </div>
//               </div>

//               <div className="flex justify-end space-x-2 pt-2">
//                 {timeSlots.find(s => s.id === currentSlot)?.courses[currentDay!] && (
//                   <button 
//                     onClick={deleteCourse}
//                     className="px-3 py-1 text-xs text-red-600 hover:bg-red-50 rounded-lg"
//                   >
//                     Supprimer
//                   </button>
//                 )}
//                 <button 
//                   onClick={saveCourse}
//                   className="px-3 py-1 text-xs bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//                 >
//                   Enregistrer
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Légende */}
//         <div className="mt-6">
//           <h3 className="text-sm font-medium mb-2">Légende des matières :</h3>
//           <div className="flex flex-wrap gap-2">
//             {subjects.map(subject => (
//               <div key={subject} className={`text-xs px-3 py-1 rounded-full ${subjectColors[subject]}`}>
//                 {subject}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EmploiDuTempsDropdown;