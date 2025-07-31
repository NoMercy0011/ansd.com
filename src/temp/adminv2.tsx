

// const LovaAdminDashboard = () => {
//   const [activeModule, setActiveModule] = useState('dashboard');
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [currentTime, setCurrentTime] = useState(new Date());

//   useEffect(() => {
//     const timer = setInterval(() => setCurrentTime(new Date()), 1000);
//     return () => clearInterval(timer);
//   }, []);

//   // Données mock
//   const mockData = {
//     stats: {
//       students: 1247,
//       teachers: 45,
//       classes: 28,
//       subjects: 156
//     },
//     recentActivity: [
//       { id: 1, type: 'student', action: 'Nouvel étudiant inscrit', name: 'Marie Rakoto', time: '2h' },
//       { id: 2, type: 'teacher', action: 'Enseignant ajouté', name: 'Paul Andry', time: '4h' },
//       { id: 3, type: 'class', action: 'Classe créée', name: 'Terminale C', time: '1j' },
//       { id: 4, type: 'grade', action: 'Notes saisies', name: 'Mathématiques - 2nde A', time: '2j' }
//     ],
//     topClasses: [
//       { name: 'Terminale A', students: 32, average: 16.5 },
//       { name: '1ère S', students: 28, average: 15.8 },
//       { name: '2nde C', students: 35, average: 14.2 },
//       { name: '3ème A', students: 30, average: 13.9 }
//     ],
//     monthlyStats: [
//       { month: 'Jan', students: 1200, teachers: 42 },
//       { month: 'Fév', students: 1220, teachers: 43 },
//       { month: 'Mar', students: 1235, teachers: 44 },
//       { month: 'Avr', students: 1247, teachers: 45 }
//     ]
//   };

//   const modules = [
//     { id: 'dashboard', name: 'Dashboard', icon: BarChart3 },
//     { id: 'students', name: 'Étudiants', icon: Users },
//     { id: 'teachers', name: 'Enseignants', icon: GraduationCap },
//     { id: 'classes', name: 'Classes', icon: BookOpen },
//     { id: 'subjects', name: 'Matières', icon: FileText },
//     { id: 'schedule', name: 'Emploi du temps', icon: Calendar },
//     { id: 'reports', name: 'Bulletins', icon: Award },
//     { id: 'certificates', name: 'Certificats', icon: FileText },
//     { id: 'settings', name: 'Paramètres', icon: Settings }
//   ];

//   const StatCard = ({ title, value, icon: Icon, color, trend }) => (
//     <div className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-${color} group hover:scale-105`}>
//       <div className="flex items-center justify-between">
//         <div>
//           <p className="text-gray-600 text-sm font-medium">{title}</p>
//           <p className="text-3xl font-bold text-gray-800 mt-2">{value.toLocaleString()}</p>
//           {trend && (
//             <div className="flex items-center mt-2">
//               <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
//               <span className="text-green-500 text-sm font-medium">+{trend}%</span>
//             </div>
//           )}
//         </div>
//         <div className={`p-4 rounded-full bg-${color} bg-opacity-10 group-hover:bg-opacity-20 transition-all duration-300`}>
//           <Icon className={`h-8 w-8 text-${color}`} />
//         </div>
//       </div>
//     </div>
//   );

//   const ActivityItem = ({ activity }) => (
//     <div className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
//       <div className={`p-2 rounded-full mr-3 ${
//         activity.type === 'student' ? 'bg-orange-100 text-orange-600' :
//         activity.type === 'teacher' ? 'bg-pink-100 text-pink-700' :
//         activity.type === 'class' ? 'bg-sky-100 text-sky-700' :
//         'bg-gray-100 text-gray-600'
//       }`}>
//         {activity.type === 'student' && <Users className="h-4 w-4" />}
//         {activity.type === 'teacher' && <GraduationCap className="h-4 w-4" />}
//         {activity.type === 'class' && <BookOpen className="h-4 w-4" />}
//         {activity.type === 'grade' && <Award className="h-4 w-4" />}
//       </div>
//       <div className="flex-1">
//         <p className="text-sm font-medium text-gray-800">{activity.action}</p>
//         <p className="text-xs text-gray-500">{activity.name}</p>
//       </div>
//       <span className="text-xs text-gray-400">{activity.time}</span>
//     </div>
//   );

//   const ClassCard = ({ classData }) => (
//     <div className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow">
//       <div className="flex justify-between items-start mb-3">
//         <h3 className="font-bold text-gray-800">{classData.name}</h3>
//         <span className="text-2xl font-bold text-green-600">{classData.average}</span>
//       </div>
//       <div className="flex items-center text-sm text-gray-600">
//         <Users className="h-4 w-4 mr-1" />
//         <span>{classData.students} étudiants</span>
//       </div>
//       <div className="mt-3 bg-gray-200 rounded-full h-2">
//         <div 
//           className="bg-gradient-to-r from-orange-400 to-pink-500 h-2 rounded-full transition-all duration-500"
//           style={{ width: `${(classData.average / 20) * 100}%` }}
//         />
//       </div>
//     </div>
//   );

//   const renderDashboard = () => (
//     <div className="space-y-6">
//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         <StatCard 
//           title="Étudiants" 
//           value={mockData.stats.students} 
//           icon={Users} 
//           color="orange-600" 
//           trend={5.2}
//         />
//         <StatCard 
//           title="Enseignants" 
//           value={mockData.stats.teachers} 
//           icon={GraduationCap} 
//           color="pink-700" 
//           trend={2.1}
//         />
//         <StatCard 
//           title="Classes" 
//           value={mockData.stats.classes} 
//           icon={BookOpen} 
//           color="sky-700" 
//           trend={12.5}
//         />
//         <StatCard 
//           title="Matières" 
//           value={mockData.stats.subjects} 
//           icon={FileText} 
//           color="orange-600" 
//           trend={8.3}
//         />
//       </div>

//       {/* Charts and Activity */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Activity Feed */}
//         <div className="bg-white rounded-2xl p-6 shadow-lg">
//           <div className="flex items-center justify-between mb-4">
//             <h2 className="text-xl font-bold text-gray-800">Activité Récente</h2>
//             <Activity className="h-5 w-5 text-gray-500" />
//           </div>
//           <div className="space-y-2">
//             {mockData.recentActivity.map(activity => (
//               <ActivityItem key={activity.id} activity={activity} />
//             ))}
//           </div>
//         </div>

//         {/* Top Classes */}
//         <div className="bg-white rounded-2xl p-6 shadow-lg">
//           <div className="flex items-center justify-between mb-4">
//             <h2 className="text-xl font-bold text-gray-800">Meilleures Classes</h2>
//             <Award className="h-5 w-5 text-gray-500" />
//           </div>
//           <div className="space-y-4">
//             {mockData.topClasses.map((classData, index) => (
//               <ClassCard key={index} classData={classData} />
//             ))}
//           </div>
//         </div>

//         {/* Quick Actions */}
//         <div className="bg-white rounded-2xl p-6 shadow-lg">
//           <h2 className="text-xl font-bold text-gray-800 mb-4">Actions Rapides</h2>
//           <div className="space-y-3">
//             <button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 px-4 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 flex items-center justify-center">
//               <Plus className="h-5 w-5 mr-2" />
//               Nouvel Étudiant
//             </button>
//             <button className="w-full bg-gradient-to-r from-pink-600 to-pink-700 text-white py-3 px-4 rounded-lg hover:from-pink-700 hover:to-pink-800 transition-all duration-300 flex items-center justify-center">
//               <Plus className="h-5 w-5 mr-2" />
//               Nouvel Enseignant
//             </button>
//             <button className="w-full bg-gradient-to-r from-sky-600 to-sky-700 text-white py-3 px-4 rounded-lg hover:from-sky-700 hover:to-sky-800 transition-all duration-300 flex items-center justify-center">
//               <Download className="h-5 w-5 mr-2" />
//               Exporter Bulletins
//             </button>
//             <button className="w-full bg-gradient-to-r from-gray-600 to-gray-700 text-white py-3 px-4 rounded-lg hover:from-gray-700 hover:to-gray-800 transition-all duration-300 flex items-center justify-center">
//               <FileText className="h-5 w-5 mr-2" />
//               Certificats
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Performance Chart */}
//       <div className="bg-white rounded-2xl p-6 shadow-lg">
//         <h2 className="text-xl font-bold text-gray-800 mb-4">Évolution Mensuelle</h2>
//         <div className="h-64 flex items-end justify-between bg-gray-50 rounded-lg p-4">
//           {mockData.monthlyStats.map((stat, index) => (
//             <div key={index} className="flex flex-col items-center">
//               <div className="flex space-x-2 mb-2">
//                 <div 
//                   className="w-8 bg-gradient-to-t from-orange-400 to-orange-500 rounded-t"
//                   style={{ height: `${(stat.students / 1300) * 200}px` }}
//                 />
//                 <div 
//                   className="w-8 bg-gradient-to-t from-pink-500 to-pink-600 rounded-t"
//                   style={{ height: `${(stat.teachers / 50) * 200}px` }}
//                 />
//               </div>
//               <span className="text-sm font-medium text-gray-600">{stat.month}</span>
//             </div>
//           ))}
//         </div>
//         <div className="flex justify-center mt-4 space-x-6">
//           <div className="flex items-center">
//             <div className="w-4 h-4 bg-gradient-to-r from-orange-400 to-orange-500 rounded mr-2" />
//             <span className="text-sm text-gray-600">Étudiants</span>
//           </div>
//           <div className="flex items-center">
//             <div className="w-4 h-4 bg-gradient-to-r from-pink-500 to-pink-600 rounded mr-2" />
//             <span className="text-sm text-gray-600">Enseignants</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   // Données mock étendues
//   const mockStudents = [
//     { id: 1, name: 'Andry Rakoto', class: 'Terminale A', age: 17, average: 16.5, photo: '👨‍🎓', status: 'active', subjects: ['Maths', 'Physique', 'Français'] },
//     { id: 2, name: 'Hery Rasolofo', class: '1ère S', age: 16, average: 15.8, photo: '👨‍🎓', status: 'active', subjects: ['Maths', 'SVT', 'Anglais'] },
//     { id: 3, name: 'Naina Andriamana', class: '2nde C', age: 15, average: 17.2, photo: '👩‍🎓', status: 'active', subjects: ['Histoire', 'Géo', 'Français'] },
//     { id: 4, name: 'Miora Razaka', class: 'Terminale B', age: 18, average: 14.8, photo: '👩‍🎓', status: 'active', subjects: ['Philo', 'Français', 'Maths'] },
//     { id: 5, name: 'Tovo Randria', class: '3ème A', age: 14, average: 13.5, photo: '👨‍🎓', status: 'suspended', subjects: ['Maths', 'Sciences', 'Français'] }
//   ];

//   const mockTeachers = [
//     { id: 1, name: 'Dr. Marie Razaf', subject: 'Mathématiques', classes: ['Terminale A', '1ère S'], experience: 15, rating: 4.8, photo: '👩‍🏫', status: 'active' },
//     { id: 2, name: 'Paul Andrianina', subject: 'Physique-Chimie', classes: ['2nde C', '1ère S'], experience: 8, rating: 4.6, photo: '👨‍🏫', status: 'active' },
//     { id: 3, name: 'Lova Ramaroson', subject: 'Français', classes: ['Terminale B', '3ème A'], experience: 12, rating: 4.9, photo: '👩‍🏫', status: 'active' },
//     { id: 4, name: 'Hanta Rakoto', subject: 'Histoire-Géographie', classes: ['2nde C', '1ère S'], experience: 6, rating: 4.4, photo: '👩‍🏫', status: 'vacation' }
//   ];

//   const mockClasses = [
//     { id: 1, name: 'Terminale A', level: 'Terminale', students: 32, teacher: 'Dr. Marie Razaf', average: 16.5, subjects: 12, capacity: 35, room: 'Salle 101' },
//     { id: 2, name: '1ère S', level: '1ère', students: 28, teacher: 'Paul Andrianina', average: 15.8, subjects: 10, capacity: 30, room: 'Salle 102' },
//     { id: 3, name: '2nde C', level: '2nde', students: 35, teacher: 'Lova Ramaroson', average: 14.2, subjects: 8, capacity: 35, room: 'Salle 103' },
//     { id: 4, name: '3ème A', level: '3ème', students: 30, teacher: 'Hanta Rakoto', average: 13.9, subjects: 9, capacity: 32, room: 'Salle 104' }
//   ];

//   const mockSubjects = [
//     { id: 1, name: 'Mathématiques', classes: ['Terminale A', '1ère S', '2nde C'], teacher: 'Dr. Marie Razaf', hours: 6, coefficient: 4 },
//     { id: 2, name: 'Physique-Chimie', classes: ['Terminale A', '1ère S'], teacher: 'Paul Andrianina', hours: 5, coefficient: 3 },
//     { id: 3, name: 'Français', classes: ['Terminale B', '3ème A'], teacher: 'Lova Ramaroson', hours: 4, coefficient: 3 },
//     { id: 4, name: 'Histoire-Géographie', classes: ['2nde C', '1ère S'], teacher: 'Hanta Rakoto', hours: 3, coefficient: 2 },
//     { id: 5, name: 'Anglais', classes: ['Terminale A', '1ère S', '2nde C'], teacher: 'Sofia Rajao', hours: 3, coefficient: 2 }
//   ];

//   const [activeSubModule, setActiveSubModule] = useState('overview');
//   const [selectedStudent, setSelectedStudent] = useState(null);
//   const [selectedTeacher, setSelectedTeacher] = useState(null);
//   const [selectedClass, setSelectedClass] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [modalType, setModalType] = useState('');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterClass, setFilterClass] = useState('all');

//   // Composants réutilisables
//   const SubModuleNav = ({ items, active, onChange }) => (
//     <div className="flex flex-wrap gap-2 mb-6">
//       {items.map(item => (
//         <button
//           key={item.id}
//           onClick={() => onChange(item.id)}
//           className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
//             active === item.id
//               ? 'bg-gradient-to-r from-orange-500 to-pink-600 text-white shadow-lg'
//               : 'bg-white text-gray-600 hover:bg-gray-100 shadow-md'
//           }`}
//         >
//           {item.name}
//         </button>
//       ))}
//     </div>
//   );

//   const DataCard = ({ title, value, icon: Icon, color, subtitle, onClick }) => (
//     <div 
//       className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-${color} cursor-pointer group hover:scale-105`}
//       onClick={onClick}
//     >
//       <div className="flex items-center justify-between">
//         <div>
//           <p className="text-gray-600 text-sm font-medium">{title}</p>
//           <p className="text-3xl font-bold text-gray-800 mt-2">{value}</p>
//           {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
//         </div>
//         <div className={`p-4 rounded-full bg-${color} bg-opacity-10 group-hover:bg-opacity-20 transition-all duration-300`}>
//           <Icon className={`h-8 w-8 text-${color}`} />
//         </div>
//       </div>
//     </div>
//   );

//   const TableRow = ({ item, type, onEdit, onDelete, onView }) => (
//     <tr className="hover:bg-gray-50 transition-colors">
//       <td className="px-6 py-4 whitespace-nowrap">
//         <div className="flex items-center">
//           <div className="text-2xl mr-3">{item.photo}</div>
//           <div>
//             <div className="text-sm font-medium text-gray-900">{item.name}</div>
//             {type === 'student' && <div className="text-sm text-gray-500">{item.class}</div>}
//             {type === 'teacher' && <div className="text-sm text-gray-500">{item.subject}</div>}
//             {type === 'class' && <div className="text-sm text-gray-500">{item.level}</div>}
//           </div>
//         </div>
//       </td>
//       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//         {type === 'student' && `${item.age} ans`}
//         {type === 'teacher' && `${item.experience} ans d'exp.`}
//         {type === 'class' && `${item.students}/${item.capacity} étudiants`}
//       </td>
//       <td className="px-6 py-4 whitespace-nowrap">
//         <div className="flex items-center">
//           <span className="text-sm font-medium text-gray-900 mr-2">
//             {type === 'student' && item.average}
//             {type === 'teacher' && item.rating}
//             {type === 'class' && item.average}
//           </span>
//           <div className="w-16 bg-gray-200 rounded-full h-2">
//             <div 
//               className="bg-gradient-to-r from-orange-400 to-pink-500 h-2 rounded-full"
//               style={{ 
//                 width: `${type === 'student' ? (item.average/20)*100 : type === 'teacher' ? (item.rating/5)*100 : (item.average/20)*100}%` 
//               }}
//             />
//           </div>
//         </div>
//       </td>
//       <td className="px-6 py-4 whitespace-nowrap">
//         <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
//           item.status === 'active' ? 'bg-green-100 text-green-800' : 
//           item.status === 'suspended' ? 'bg-red-100 text-red-800' : 
//           'bg-yellow-100 text-yellow-800'
//         }`}>
//           {item.status === 'active' ? 'Actif' : item.status === 'suspended' ? 'Suspendu' : 'Vacataire'}
//         </span>
//       </td>
//       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
//         <button onClick={() => onView(item)} className="text-sky-600 hover:text-sky-900">
//           <Eye className="h-4 w-4" />
//         </button>
//         <button onClick={() => onEdit(item)} className="text-orange-600 hover:text-orange-900">
//           <Edit className="h-4 w-4" />
//         </button>
//         <button onClick={() => onDelete(item)} className="text-red-600 hover:text-red-900">
//           <Trash2 className="h-4 w-4" />
//         </button>
//       </td>
//     </tr>
//   );

//   // Render des modules
//   const renderStudentsModule = () => {
//     const subModules = [
//       { id: 'overview', name: 'Vue d\'ensemble' },
//       { id: 'by-class', name: 'Par classe' },
//       { id: 'individual', name: 'Performances individuelles' },
//       { id: 'manage', name: 'Gestion' }
//     ];

//     const filteredStudents = mockStudents.filter(student => {
//       const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase());
//       const matchesClass = filterClass === 'all' || student.class === filterClass;
//       return matchesSearch && matchesClass;
//     });

//     if (activeSubModule === 'overview') {
//       return (
//         <div className="space-y-6">
//           <SubModuleNav items={subModules} active={activeSubModule} onChange={setActiveSubModule} />
          
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             <DataCard 
//               title="Total Étudiants" 
//               value={mockStudents.length} 
//               icon={Users} 
//               color="orange-600"
//               subtitle="Tous niveaux confondus"
//             />
//             <DataCard 
//               title="Moyenne Générale" 
//               value="15.36" 
//               icon={BarChart3} 
//               color="pink-700"
//               subtitle="Sur 20 points"
//             />
//             <DataCard 
//               title="Présents Aujourd'hui" 
//               value="1,198" 
//               icon={Activity} 
//               color="sky-700"
//               subtitle="96.1% de présence"
//             />
//             <DataCard 
//               title="Nouveaux ce mois" 
//               value="47" 
//               icon={TrendingUp} 
//               color="orange-600"
//               subtitle="+12% vs mois dernier"
//             />
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             <div className="bg-white rounded-2xl p-6 shadow-lg">
//               <h3 className="text-lg font-bold text-gray-800 mb-4">Répartition par Classe</h3>
//               <div className="space-y-4">
//                 {mockClasses.map(cls => (
//                   <div key={cls.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
//                     <div>
//                       <p className="font-medium text-gray-800">{cls.name}</p>
//                       <p className="text-sm text-gray-600">{cls.students} étudiants</p>
//                     </div>
//                     <div className="text-right">
//                       <p className="text-lg font-bold text-orange-600">{cls.average}</p>
//                       <p className="text-xs text-gray-500">Moyenne</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="bg-white rounded-2xl p-6 shadow-lg">
//               <h3 className="text-lg font-bold text-gray-800 mb-4">Meilleurs Étudiants</h3>
//               <div className="space-y-3">
//                 {mockStudents.sort((a, b) => b.average - a.average).slice(0, 5).map((student, index) => (
//                   <div key={student.id} className="flex items-center p-3 bg-gray-50 rounded-lg">
//                     <div className="text-2xl mr-3">{student.photo}</div>
//                     <div className="flex-1">
//                       <p className="font-medium text-gray-800">{student.name}</p>
//                       <p className="text-sm text-gray-600">{student.class}</p>
//                     </div>
//                     <div className="text-right">
//                       <p className="text-lg font-bold text-green-600">{student.average}</p>
//                       <div className="flex items-center">
//                         {index === 0 && <span className="text-yellow-500">🥇</span>}
//                         {index === 1 && <span className="text-gray-400">🥈</span>}
//                         {index === 2 && <span className="text-yellow-600">🥉</span>}
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       );
//     }

//     if (activeSubModule === 'manage') {
//       return (
//         <div className="space-y-6">
//           <SubModuleNav items={subModules} active={activeSubModule} onChange={setActiveSubModule} />
          
//           <div className="bg-white rounded-2xl p-6 shadow-lg">
//             <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
//               <h2 className="text-xl font-bold text-gray-800 mb-4 lg:mb-0">Gestion des Étudiants</h2>
//               <div className="flex flex-col sm:flex-row gap-3">
//                 <div className="relative">
//                   <Search className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
//                   <input
//                     type="text"
//                     placeholder="Rechercher un étudiant..."
//                     className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                   />
//                 </div>
//                 <select 
//                   className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                   value={filterClass}
//                   onChange={(e) => setFilterClass(e.target.value)}
//                 >
//                   <option value="all">Toutes les classes</option>
//                   {mockClasses.map(cls => (
//                     <option key={cls.id} value={cls.name}>{cls.name}</option>
//                   ))}
//                 </select>
//                 <button 
//                   onClick={() => {setModalType('student'); setIsModalOpen(true);}}
//                   className="bg-gradient-to-r from-orange-500 to-pink-600 text-white px-4 py-2 rounded-lg hover:from-orange-600 hover:to-pink-700 transition-all duration-300 flex items-center"
//                 >
//                   <Plus className="h-4 w-4 mr-2" />
//                   Nouvel Étudiant
//                 </button>
//               </div>
//             </div>

//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Étudiant
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Âge
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Moyenne
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Statut
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {filteredStudents.map(student => (
//                     <TableRow
//                       key={student.id}
//                       item={student}
//                       type="student"
//                       onView={setSelectedStudent}
//                       onEdit={() => console.log('Edit', student)}
//                       onDelete={() => console.log('Delete', student)}
//                     />
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       );
//     }

//     return (
//       <div className="space-y-6">
//         <SubModuleNav items={subModules} active={activeSubModule} onChange={setActiveSubModule} />
//         <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
//           <h3 className="text-xl font-bold text-gray-800 mb-4">
//             {subModules.find(s => s.id === activeSubModule)?.name}
//           </h3>
//           <p className="text-gray-600">Contenu en cours de développement...</p>
//         </div>
//       </div>
//     );
//   };

//   const renderTeachersModule = () => {
//     const subModules = [
//       { id: 'overview', name: 'Vue d\'ensemble' },
//       { id: 'by-subject', name: 'Par matière' },
//       { id: 'performance', name: 'Performances' },
//       { id: 'manage', name: 'Gestion' }
//     ];

//     if (activeSubModule === 'overview') {
//       return (
//         <div className="space-y-6">
//           <SubModuleNav items={subModules} active={activeSubModule} onChange={setActiveSubModule} />
          
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             <DataCard 
//               title="Total Enseignants" 
//               value={mockTeachers.length} 
//               icon={GraduationCap} 
//               color="pink-700"
//               subtitle="Tous statuts confondus"
//             />
//             <DataCard 
//               title="Note Moyenne" 
//               value="4.65" 
//               icon={Award} 
//               color="sky-700"
//               subtitle="Sur 5 étoiles"
//             />
//             <DataCard 
//               title="Présents Aujourd'hui" 
//               value="42" 
//               icon={Activity} 
//               color="orange-600"
//               subtitle="93.3% de présence"
//             />
//             <DataCard 
//               title="Nouveaux ce mois" 
//               value="3" 
//               icon={TrendingUp} 
//               color="pink-700"
//               subtitle="+2 vs mois dernier"
//             />
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             <div className="bg-white rounded-2xl p-6 shadow-lg">
//               <h3 className="text-lg font-bold text-gray-800 mb-4">Répartition par Matière</h3>
//               <div className="space-y-4">
//                 {mockSubjects.map(subject => (
//                   <div key={subject.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
//                     <div>
//                       <p className="font-medium text-gray-800">{subject.name}</p>
//                       <p className="text-sm text-gray-600">{subject.classes.length} classes</p>
//                     </div>
//                     <div className="text-right">
//                       <p className="text-lg font-bold text-pink-600">{subject.hours}h</p>
//                       <p className="text-xs text-gray-500">par semaine</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="bg-white rounded-2xl p-6 shadow-lg">
//               <h3 className="text-lg font-bold text-gray-800 mb-4">Meilleurs Enseignants</h3>
//               <div className="space-y-3">
//                 {mockTeachers.sort((a, b) => b.rating - a.rating).map((teacher, index) => (
//                   <div key={teacher.id} className="flex items-center p-3 bg-gray-50 rounded-lg">
//                     <div className="text-2xl mr-3">{teacher.photo}</div>
//                     <div className="flex-1">
//                       <p className="font-medium text-gray-800">{teacher.name}</p>
//                       <p className="text-sm text-gray-600">{teacher.subject}</p>
//                     </div>
//                     <div className="text-right">
//                       <p className="text-lg font-bold text-yellow-600">{teacher.rating}</p>
//                       <div className="flex items-center">
//                         {index === 0 && <span className="text-yellow-500">🥇</span>}
//                         {index === 1 && <span className="text-gray-400">🥈</span>}
//                         {index === 2 && <span className="text-yellow-600">🥉</span>}
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       );
//     }

//     if (activeSubModule === 'manage') {
//       return (
//         <div className="space-y-6">
//           <SubModuleNav items={subModules} active={activeSubModule} onChange={setActiveSubModule} />
          
//           <div className="bg-white rounded-2xl p-6 shadow-lg">
//             <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
//               <h2 className="text-xl font-bold text-gray-800 mb-4 lg:mb-0">Gestion des Enseignants</h2>
//               <div className="flex flex-col sm:flex-row gap-3">
//                 <div className="relative">
//                   <Search className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
//                   <input
//                     type="text"
//                     placeholder="Rechercher un enseignant..."
//                     className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                   />
//                 </div>
//                 <button 
//                   onClick={() => {setModalType('teacher'); setIsModalOpen(true);}}
//                   className="bg-gradient-to-r from-pink-600 to-pink-700 text-white px-4 py-2 rounded-lg hover:from-pink-700 hover:to-pink-800 transition-all duration-300 flex items-center"
//                 >
//                   <Plus className="h-4 w-4 mr-2" />
//                   Nouvel Enseignant
//                 </button>
//               </div>
//             </div>

//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Enseignant
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Expérience
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Évaluation
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Statut
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {mockTeachers.filter(teacher => 
//                     teacher.name.toLowerCase().includes(searchTerm.toLowerCase())
//                   ).map(teacher => (
//                     <TableRow
//                       key={teacher.id}
//                       item={teacher}
//                       type="teacher"
//                       onView={setSelectedTeacher}
//                       onEdit={() => console.log('Edit', teacher)}
//                       onDelete={() => console.log('Delete', teacher)}
//                     />
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       );
//     }

//     return (
//       <div className="space-y-6">
//         <SubModuleNav items={subModules} active={activeSubModule} onChange={setActiveSubModule} />
//         <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
//           <h3 className="text-xl font-bold text-gray-800 mb-4">
//             {subModules.find(s => s.id === activeSubModule)?.name}
//           </h3>
//           <p className="text-gray-600">Contenu en cours de développement...</p>
//         </div>
//       </div>
//     );
//   };

//   const renderClassesModule = () => {
//     const subModules = [
//       { id: 'overview', name: 'Vue d\'ensemble' },
//       { id: 'by-level', name: 'Par niveau' },
//       { id: 'performance', name: 'Performances' },
//       { id: 'manage', name: 'Gestion' }
//     ];

//     if (activeSubModule === 'overview') {
//       return (
//         <div className="space-y-6">
//           <SubModuleNav items={subModules} active={activeSubModule} onChange={setActiveSubModule} />
          
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             <DataCard 
//               title="Total Classes" 
//               value={mockClasses.length} 
//               icon={BookOpen} 
//               color="sky-700"
//               subtitle="Tous niveaux confondus"
//             />
//             <DataCard 
//               title="Moyenne Générale" 
//               value="15.1" 
//               icon={TrendingUp} 
//               color="orange-600"
//               subtitle="Toutes classes"
//             />
//             <DataCard 
//               title="Capacité Totale" 
//               value="132" 
//               icon={Users} 
//               color="pink-700"
//               subtitle="Places disponibles"
//             />
//             <DataCard 
//               title="Taux d'Occupation" 
//               value="95.5%" 
//               icon={Activity} 
//               color="sky-700"
//               subtitle="Très bon taux"
//             />
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             <div className="bg-white rounded-2xl p-6 shadow-lg">
//               <h3 className="text-lg font-bold text-gray-800 mb-4">Classes par Niveau</h3>
//               <div className="space-y-4">
//                 {['Terminale', '1ère', '2nde', '3ème'].map(level => {
//                   const levelClasses = mockClasses.filter(cls => cls.level === level);
//                   const totalStudents = levelClasses.reduce((sum, cls) => sum + cls.students, 0);
//                   return (
//                     <div key={level} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
//                       <div>
//                         <p className="font-medium text-gray-800">{level}</p>
//                         <p className="text-sm text-gray-600">{levelClasses.length} classes</p>
//                       </div>
//                       <div className="text-right">
//                         <p className="text-lg font-bold text-sky-600">{totalStudents}</p>
//                         <p className="text-xs text-gray-500">étudiants</p>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>

//             <div className="bg-white rounded-2xl p-6 shadow-lg">
//               <h3 className="text-lg font-bold text-gray-800 mb-4">Meilleures Classes</h3>
//               <div className="space-y-3">
//                 {mockClasses.sort((a, b) => b.average - a.average).map((cls, index) => (
//                   <div key={cls.id} className="flex items-center p-3 bg-gray-50 rounded-lg">
//                     <div className="w-12 h-12 bg-gradient-to-r from-sky-400 to-sky-600 rounded-full flex items-center justify-center mr-3">
//                       <BookOpen className="h-6 w-6 text-white" />
//                     </div>
//                     <div className="flex-1">
//                       <p className="font-medium text-gray-800">{cls.name}</p>
//                       <p className="text-sm text-gray-600">{cls.students} étudiants</p>
//                     </div>
//                     <div className="text-right">
//                       <p className="text-lg font-bold text-green-600">{cls.average}</p>
//                       <div className="flex items-center">
//                         {index === 0 && <span className="text-yellow-500">🥇</span>}
//                         {index === 1 && <span className="text-gray-400">🥈</span>}
//                         {index === 2 && <span className="text-yellow-600">🥉</span>}
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       );
//     }

//     if (activeSubModule === 'manage') {
//       return (
//         <div className="space-y-6">
//           <SubModuleNav items={subModules} active={activeSubModule} onChange={setActiveSubModule} />
          
//           <div className="bg-white rounded-2xl p-6 shadow-lg">
//             <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
//               <h2 className="text-xl font-bold text-gray-800 mb-4 lg:mb-0">Gestion des Classes</h2>
//               <div className="flex flex-col sm:flex-row gap-3">
//                 <div className="relative">
//                   <Search className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
//                   <input
//                     type="text"
//                     placeholder="Rechercher une classe..."
//                     className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                   />
//                 </div>
//                 <button 
//                   onClick={() => {setModalType('class'); setIsModalOpen(true);}}
//                   className="bg-gradient-to-r from-sky-600 to-sky-700 text-white px-4 py-2 rounded-lg hover:from-sky-700 hover:to-sky-800 transition-all duration-300 flex items-center"
//                 >
//                   <Plus className="h-4 w-4 mr-2" />
//                   Nouvelle Classe
//                 </button>
//               </div>
//             </div>

//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Classe
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Effectif
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Moyenne
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Professeur Principal
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {mockClasses.filter(cls => 
//                     cls.name.toLowerCase().includes(searchTerm.toLowerCase())
//                   ).map(cls => (
//                     <tr key={cls.id} className="hover:bg-gray-50 transition-colors">
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="flex items-center">
//                           <div className="w-10 h-10 bg-gradient-to-r from-sky-400 to-sky-600 rounded-full flex items-center justify-center mr-3">
//                             <BookOpen className="h-5 w-5 text-white" />
//                           </div>
//                           <div>
//                             <div className="text-sm font-medium text-gray-900">{cls.name}</div>
//                             <div className="text-sm text-gray-500">{cls.room}</div>
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                         <div className="flex items-center">
//                           <span className="mr-2">{cls.students}/{cls.capacity}</span>
//                           <div className="w-16 bg-gray-200 rounded-full h-2">
//                             <div 
//                               className="bg-gradient-to-r from-sky-400 to-sky-600 h-2 rounded-full"
//                               style={{ width: `${(cls.students/cls.capacity)*100}%` }}
//                             />
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="flex items-center">
//                           <span className="text-sm font-medium text-gray-900 mr-2">{cls.average}</span>
//                           <div className="w-16 bg-gray-200 rounded-full h-2">
//                             <div 
//                               className="bg-gradient-to-r from-orange-400 to-pink-500 h-2 rounded-full"
//                               style={{ width: `${(cls.average/20)*100}%` }}
//                             />
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                         {cls.teacher}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
//                         <button onClick={() => setSelectedClass(cls)} className="text-sky-600 hover:text-sky-900">
//                           <Eye className="h-4 w-4" />
//                         </button>
//                         <button onClick={() => console.log('Edit', cls)} className="text-orange-600 hover:text-orange-900">
//                           <Edit className="h-4 w-4" />
//                         </button>
//                         <button onClick={() => console.log('Delete', cls)} className="text-red-600 hover:text-red-900">
//                           <Trash2 className="h-4 w-4" />
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       );
//     }

//     return (
//       <div className="space-y-6">
//         <SubModuleNav items={subModules} active={activeSubModule} onChange={setActiveSubModule} />
//         <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
//           <h3 className="text-xl font-bold text-gray-800 mb-4">
//             {subModules.find(s => s.id === activeSubModule)?.name}
//           </h3>
//           <p className="text-gray-600">Contenu en cours de développement...</p>
//         </div>
//       </div>
//     );
//   };

//   const renderSubjectsModule = () => {
//     const [editingSubject, setEditingSubject] = useState(null);
//     const [subjectForm, setSubjectForm] = useState({
//       name: '',
//       teacher: '',
//       hours: '',
//       coefficient: '',
//       classes: []
//     });

//     const handleSubjectSubmit = (e) => {
//       e.preventDefault();
//       if (editingSubject) {
//         console.log('Updating subject:', subjectForm);
//       } else {
//         console.log('Creating subject:', subjectForm);
//       }
//       setEditingSubject(null);
//       setSubjectForm({ name: '', teacher: '', hours: '', coefficient: '', classes: [] });
//     };

//     const handleEdit = (subject) => {
//       setEditingSubject(subject);
//       setSubjectForm(subject);
//     };

//     return (
//       <div className="space-y-6">
//         <div className="bg-white rounded-2xl p-6 shadow-lg">
//           <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
//             <h2 className="text-xl font-bold text-gray-800 mb-4 lg:mb-0">Gestion des Matières</h2>
//             <div className="flex flex-col sm:flex-row gap-3">
//               <div className="relative">
//                 <Search className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
//                 <input
//                   type="text"
//                   placeholder="Rechercher une matière..."
//                   className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//               </div>
//               <button 
//                 onClick={() => setEditingSubject({})}
//                 className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 flex items-center"
//               >
//                 <Plus className="h-4 w-4 mr-2" />
//                 Nouvelle Matière
//               </button>
//             </div>
//           </div>

//           {editingSubject && (
//             <div className="bg-gray-50 rounded-lg p-6 mb-6">
//               <h3 className="text-lg font-bold text-gray-800 mb-4">
//                 {editingSubject.id ? 'Modifier la matière' : 'Nouvelle matière'}
//               </h3>
//               <form onSubmit={handleSubjectSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Nom de la matière</label>
//                   <input
//                     type="text"
//                     value={subjectForm.name}
//                     onChange={(e) => setSubjectForm({...subjectForm, name: e.target.value})}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Enseignant</label>
//                   <select
//                     value={subjectForm.teacher}
//                     onChange={(e) => setSubjectForm({...subjectForm, teacher: e.target.value})}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                     required
//                   >
//                     <option value="">Sélectionner un enseignant</option>
//                     {mockTeachers.map(teacher => (
//                       <option key={teacher.id} value={teacher.name}>{teacher.name}</option>
//                     ))}
//                   </select>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Heures par semaine</label>
//                   <input
//                     type="number"
//                     value={subjectForm.hours}
//                     onChange={(e) => setSubjectForm({...subjectForm, hours: e.target.value})}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Coefficient</label>
//                   <input
//                     type="number"
//                     value={subjectForm.coefficient}
//                     onChange={(e) => setSubjectForm({...subjectForm, coefficient: e.target.value})}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                     required
//                   />
//                 </div>
//                 <div className="md:col-span-2">
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Classes</label>
//                   <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
//                     {mockClasses.map(cls => (
//                       <label key={cls.id} className="flex items-center">
//                         <input
//                           type="checkbox"
//                           checked={subjectForm.classes.includes(cls.name)}
//                           onChange={(e) => {
//                             const classes = e.target.checked 
//                               ? [...subjectForm.classes, cls.name]
//                               : subjectForm.classes.filter(c => c !== cls.name);
//                             setSubjectForm({...subjectForm, classes});
//                           }}
//                           className="mr-2 text-orange-500 focus:ring-orange-500"
//                         />
//                         <span className="text-sm text-gray-700">{cls.name}</span>
//                       </label>
//                     ))}
//                   </div>
//                 </div>
//                 <div className="md:col-span-2 flex gap-3">
//                   <button 
//                     type="submit"
//                     className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-2 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300"
//                   >
//                     {editingSubject.id ? 'Mettre à jour' : 'Créer'}
//                   </button>
//                   <button 
//                     type="button"
//                     onClick={() => {setEditingSubject(null); setSubjectForm({name: '', teacher: '', hours: '', coefficient: '', classes: []});}}
//                     className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-all duration-300"
//                   >
//                     Annuler
//                   </button>
//                 </div>
//               </form>
//             </div>
//           )}

//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Matière
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Enseignant
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Classes
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Heures/Semaine
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Coefficient
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {mockSubjects.filter(subject => 
//                   subject.name.toLowerCase().includes(searchTerm.toLowerCase())
//                 ).map(subject => (
//                   <tr key={subject.id} className="hover:bg-gray-50 transition-colors">
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="flex items-center">
//                         <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center mr-3">
//                           <FileText className="h-5 w-5 text-white" />
//                         </div>
//                         <div className="text-sm font-medium text-gray-900">{subject.name}</div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                       {subject.teacher}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="flex flex-wrap gap-1">
//                         {subject.classes.map(cls => (
//                           <span key={cls} className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">
//                             {cls}
//                           </span>
//                         ))}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                       {subject.hours}h
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                       {subject.coefficient}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
//                       <button onClick={() => handleEdit(subject)} className="text-orange-600 hover:text-orange-900">
//                         <Edit className="h-4 w-4" />
//                       </button>
//                       <button onClick={() => console.log('Delete', subject)} className="text-red-600 hover:text-red-900">
//                         <Trash2 className="h-4 w-4" />
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const renderScheduleModule = () => {
//     const [selectedDay, setSelectedDay] = useState('lundi');
//     const [selectedSlot, setSelectedSlot] = useState(null);
//     const [scheduleForm, setScheduleForm] = useState({
//       day: '',
//       time: '',
//       subject: '',
//       teacher: '',
//       class: '',
//       room: ''
//     });

//     const days = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
//     const timeSlots = [
//       '07:30-08:20', '08:20-09:10', '09:10-10:00', '10:20-11:10',
//       '11:10-12:00', '12:00-12:50', '14:00-14:50', '14:50-15:40',
//       '15:40-16:30', '16:30-17:20'
//     ];

//     const mockSchedule = {
//       lundi: {
//         '07:30-08:20': { subject: 'Mathématiques', teacher: 'Dr. Marie Razaf', class: 'Terminale A', room: 'Salle 101' },
//         '08:20-09:10': { subject: 'Physique', teacher: 'Paul Andrianina', class: '1ère S', room: 'Salle 102' },
//         '10:20-11:10': { subject: 'Français', teacher: 'Lova Ramaroson', class: 'Terminale B', room: 'Salle 103' },
//         '14:00-14:50': { subject: 'Histoire', teacher: 'Hanta Rakoto', class: '2nde C', room: 'Salle 104' }
//       },
//       mardi: {
//         '07:30-08:20': { subject: 'Anglais', teacher: 'Sofia Rajao', class: 'Terminale A', room: 'Salle 105' },
//         '09:10-10:00': { subject: 'Mathématiques', teacher: 'Dr. Marie Razaf', class: '1ère S', room: 'Salle 101' },
//         '11:10-12:00': { subject: 'SVT', teacher: 'Paul Andrianina', class: '2nde C', room: 'Labo 1' }
//       }
//     };

//     const handleSlotClick = (day, time) => {
//       setSelectedSlot({ day, time });
//       const existing = mockSchedule[day]?.[time];
//       setScheduleForm({
//         day,
//         time,
//         subject: existing?.subject || '',
//         teacher: existing?.teacher || '',
//         class: existing?.class || '',
//         room: existing?.room || ''
//       });
//     };

//     const handleScheduleSubmit = (e) => {
//       e.preventDefault();
//       console.log('Schedule updated:', scheduleForm);
//       setSelectedSlot(null);
//       setScheduleForm({ day: '', time: '', subject: '', teacher: '', class: '', room: '' });
//     };

//     return (
//       <div className="space-y-6">
//         <div className="bg-white rounded-2xl p-6 shadow-lg">
//           <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
//             <h2 className="text-xl font-bold text-gray-800 mb-4 lg:mb-0">Emploi du Temps</h2>
//             <div className="flex flex-wrap gap-2">
//               {days.map(day => (
//                 <button
//                   key={day}
//                   onClick={() => setSelectedDay(day)}
//                   className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
//                     selectedDay === day
//                       ? 'bg-gradient-to-r from-orange-500 to-pink-600 text-white'
//                       : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                   }`}
//                 >
//                   {day.charAt(0).toUpperCase() + day.slice(1)}
//                 </button>
//               ))}
//             </div>
//           </div>

//           <div className="overflow-x-auto">
//             <div className="min-w-full">
//               <div className="grid grid-cols-1 gap-3">
//                 {timeSlots.map(time => (
//                   <div key={time} className="flex items-center border rounded-lg hover:shadow-md transition-shadow">
//                     <div className="w-24 p-3 bg-gray-50 text-center border-r">
//                       <span className="text-sm font-medium text-gray-700">{time}</span>
//                     </div>
//                     <div 
//                       className={`flex-1 p-3 cursor-pointer transition-colors ${
//                         mockSchedule[selectedDay]?.[time] 
//                           ? 'bg-gradient-to-r from-orange-50 to-pink-50 hover:from-orange-100 hover:to-pink-100' 
//                           : 'hover:bg-gray-50'
//                       }`}
//                       onClick={() => handleSlotClick(selectedDay, time)}
//                     >
//                       {mockSchedule[selectedDay]?.[time] ? (
//                         <div>
//                           <div className="font-medium text-gray-800">
//                             {mockSchedule[selectedDay][time].subject}
//                           </div>
//                           <div className="text-sm text-gray-600 mt-1">
//                             {mockSchedule[selectedDay][time].teacher} • {mockSchedule[selectedDay][time].class} • {mockSchedule[selectedDay][time].room}
//                           </div>
//                         </div>
//                       ) : (
//                         <div className="text-gray-400 text-sm">
//                           Cliquez pour ajouter un cours
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>

//         {selectedSlot && (
//           <div className="bg-white rounded-2xl p-6 shadow-lg">
//             <h3 className="text-lg font-bold text-gray-800 mb-4">
//               Programmer un cours - {selectedSlot.day} {selectedSlot.time}
//             </h3>
//             <form onSubmit={handleScheduleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Matière</label>
//                 <select
//                   value={scheduleForm.subject}
//                   onChange={(e) => setScheduleForm({...scheduleForm, subject: e.target.value})}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                   required
//                 >
//                   <option value="">Sélectionner une matière</option>
//                   {mockSubjects.map(subject => (
//                     <option key={subject.id} value={subject.name}>{subject.name}</option>
//                   ))}
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Enseignant</label>
//                 <select
//                   value={scheduleForm.teacher}
//                   onChange={(e) => setScheduleForm({...scheduleForm, teacher: e.target.value})}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                   required
//                 >
//                   <option value="">Sélectionner un enseignant</option>
//                   {mockTeachers.map(teacher => (
//                     <option key={teacher.id} value={teacher.name}>{teacher.name}</option>
//                   ))}
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
//       {/* Sidebar */}
//       <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-2xl transform transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
//         <div className="p-6 bg-gradient-to-r from-orange-500 to-pink-600">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center">
//               <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mr-3">
//                 <GraduationCap className="h-6 w-6 text-orange-500" />
//               </div>
//               <div>
//                 <h1 className="text-xl font-bold text-white">Lova</h1>
//                 <p className="text-orange-100 text-sm">Admin Dashboard</p>
//               </div>
//             </div>
//             <button 
//               onClick={() => setIsSidebarOpen(false)}
//               className="lg:hidden text-white hover:bg-white hover:bg-opacity-20 p-1 rounded"
//             >
//               <X className="h-5 w-5" />
//             </button>
//           </div>
//         </div>
        
//         <nav className="mt-6 px-4">
//           {modules.map(module => (
//             <button
//               key={module.id}
//               onClick={() => setActiveModule(module.id)}
//               className={`w-full flex items-center px-4 py-3 mb-2 rounded-lg transition-all duration-200 ${
//                 activeModule === module.id 
//                   ? 'bg-gradient-to-r from-orange-500 to-pink-600 text-white shadow-lg' 
//                   : 'text-gray-600 hover:bg-gray-100'
//               }`}
//             >
//               <module.icon className="h-5 w-5 mr-3" />
//               <span className="font-medium">{module.name}</span>
//               {activeModule === module.id && <ChevronRight className="h-4 w-4 ml-auto" />}
//             </button>
//           ))}
//         </nav>
//       </div>

//       {/* Main Content */}
//       <div className="lg:ml-64">
//         {/* Header */}
//         <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center">
//               <button 
//                 onClick={() => setIsSidebarOpen(true)}
//                 className="lg:hidden mr-4 p-2 rounded-lg hover:bg-gray-100"
//               >
//                 <Menu className="h-5 w-5" />
//               </button>
//               <div>
//                 <h1 className="text-2xl font-bold text-gray-800">
//                   {modules.find(m => m.id === activeModule)?.name || 'Dashboard'}
//                 </h1>
//                 <p className="text-gray-600 text-sm">
//                   {currentTime.toLocaleDateString('fr-FR', { 
//                     weekday: 'long', 
//                     year: 'numeric', 
//                     month: 'long', 
//                     day: 'numeric' 
//                   })}
//                 </p>
//               </div>
//             </div>
            
//             <div className="flex items-center space-x-4">
//               <div className="relative">
//                 <Search className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
//                 <input 
//                   type="text" 
//                   placeholder="Rechercher..." 
//                   className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>
//               <button className="relative p-2 text-gray-600 hover:text-orange-500 transition-colors">
//                 <Bell className="h-5 w-5" />
//                 <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
//               </button>
//               <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full flex items-center justify-center">
//                 <span className="text-white font-semibold text-sm">A</span>
//               </div>
//             </div>
//           </div>
//         </header>

//         {/* Page Content */}
//         <main className="p-6">
//           {renderModuleContent()}
//         </main>
//       </div>

//       {/* Sidebar Overlay */}
//       {isSidebarOpen && (
//         <div 
//           className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
//           onClick={() => setIsSidebarOpen(false)}
//         />
//       )}
//     </div>
//   );
// };

// export default LovaAdminDashboard;