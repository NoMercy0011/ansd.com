// "use client"

// import React, { useState, useEffect, useMemo, useContext, createContext, useCallback, useRef } from 'react';
// import { 
//     User, LogIn, LogOut, LayoutDashboard, List, Calendar, Star, FileText, CheckCircle, XCircle, AlertTriangle, Clock, MessageSquare, Target, Send, Eye, EyeOff, Sun, Moon, Edit, Upload, Paperclip, Briefcase, Award, BookOpen, Bell, Play, Pause, Power, MoreHorizontal, Printer, FileInput, HardHat, Wrench, Building, ChevronsUpDown, ChevronRight, FileDown, Search, Command, CornerDownLeft, Lightbulb, X, ThumbsUp, ThumbsDown, Coffee, PlusCircle, Info, ShieldQuestion, BarChart2, TrendingUp, Users
// } from 'lucide-react';

// // --- CONTEXT & HOOKS ---
// const AppContext = createContext();
// const useAppContext = () => useContext(AppContext);
// const DataContext = createContext(null);
// const useData = () => useContext(DataContext);

// // --- CONFIG & MOCK DATA ---
// const ROLES = { ADMIN: 'admin', EMPLOYEE: 'employee' };
// const MOCK_CURRENT_DATE = new Date('2025-08-19T10:30:00'); 
// const WORK_START_TIME = '08:00:00';
// const TASK_TYPES = {
//     impression: { label: 'Impression', icon: Printer, color: 'text-blue-500' },
//     decoupe: { label: 'Découpe', icon: Target, color: 'text-green-500' },
//     nettoyage: { label: 'Nettoyage', icon: HardHat, color: 'text-yellow-500' },
//     controle: { label: 'Contrôle Qualité', icon: CheckCircle, color: 'text-purple-500' },
//     conception: { label: 'Conception', icon: Edit, color: 'text-indigo-500' },
// };
// const LEAVE_TYPES = ['Congé Payé', 'RTT', 'Maladie', 'Congé sans solde', 'Événement familial'];

// const initialData = {
//   generalInfo: [
//     { id: 'GI-1', title: 'Formation sécurité', content: 'Une formation incendie obligatoire aura lieu le vendredi 22 Août à 10h00 en salle de réunion.', icon: HardHat, color: 'text-orange-500' },
//     { id: 'GI-2', title: 'Maintenance réseau', content: 'Le réseau informatique sera indisponible ce Samedi à partir de 18h00 pour maintenance.', icon: Wrench, color: 'text-blue-500' },
//     { id: 'GI-3', title: 'Nouvelle politique RH', content: 'La politique de congés a été mise à jour. Le nouveau document est disponible sur l\'espace RH.', icon: BookOpen, color: 'text-purple-500' },
//   ],
//   personnel: [
//     {
//       id: 'personne-a', matricule: 'E001', name: 'Ando Rakoto', email: 'a.rakoto@ans.mg', password: 'password123', role: ROLES.EMPLOYEE, avatar: 'https://i.pravatar.cc/150?u=personne-a', position: 'Opérateur Prépresse',
//       managerId: 'admin-d', hireDate: new Date('2022-03-15'), jobHistory: ['Opérateur Finition (2022-2024)', 'Opérateur Prépresse (2024-...)'],
//       skills: ['Suite Adobe', 'Maintenance préventive presse Heidelberg', 'CACES 3'],
//       leaveBalance: { paid: 12.5, rtt: 3 },
//       documents: [{id: 'DOC-PERSO-1', type: 'Contrat de Travail', url: '#'}],
//       address: '12 Làlana ny Voninkazo, 101 Antananarivo', phone: '0341234567', rib: 'MG76 3000 4000 0500 0012 3456 789',
//       salary: 1800000,
//       lateArrivals: { month: 2 },
//       lateJustifications: [],
//       performance: {
//           monthlyScore: 8.5,
//           strengths: ['Grande autonomie', 'Qualité de travail constante', 'Respecte les délais'],
//           improvements: ['Communication proactive sur les blocages potentiels', 'Prendre plus d\'initiative sur les problèmes mineurs'],
//       },
//       feedback: [{ date: new Date('2025-07-25'), from: 'Riana Vololona', comment: 'Excellent travail sur le dossier Quantum. Très proactif.', rating: 5 }],
//       objectives: [{ id: 'OBJ-1', text: 'Réduire le taux d\'erreur en conception de 5%', progress: 60 }, { id: 'OBJ-2', text: 'Se former sur la nouvelle découpeuse laser', progress: 20 }],
//     },
//      {
//       id: 'personne-c', matricule: 'E002', name: 'Faly Andriana', email: 'f.andriana@ans.mg', password: 'password123', role: ROLES.EMPLOYEE, avatar: 'https://i.pravatar.cc/150?u=personne-c', position: 'Graphiste',
//       managerId: 'admin-d', hireDate: new Date('2021-09-01'), jobHistory: ['Graphiste Junior (2021-2023)', 'Graphiste (2023-...)'],
//       skills: ['Figma', 'Illustrator', 'Motion Design'],
//       leaveBalance: { paid: 20, rtt: 8 },
//       documents: [{id: 'DOC-PERSO-2', type: 'Contrat de Travail', url: '#'}],
//       address: '45 Arabe ny Repoblika, 101 Antananarivo', phone: '0328765432', rib: 'MG76 1234 5678 9012 3456 7890 123',
//       salary: 2200000,
//       lateArrivals: { month: 0 },
//       lateJustifications: [],
//       performance: {
//           monthlyScore: 9.2,
//           strengths: ['Créativité exceptionnelle', 'Rapidité d\'exécution'],
//           improvements: ['Respect des contraintes techniques d\'impression'],
//       },
//       feedback: [{ date: new Date('2025-08-10'), from: 'Riana Vololona', comment: 'Les propositions pour le client Orinasa Masoandro étaient superbes mais ont nécessité quelques ajustements techniques.', rating: 4 }],
//       objectives: [{ id: 'OBJ-3', text: 'Proposer 3 nouvelles pistes graphiques pour la campagne interne', progress: 100 }],
//     },
//     {
//       id: 'admin-d', matricule: 'A001', name: 'Riana Vololona', email: 'r.vololona@ans.mg', password: 'adminpass', role: ROLES.ADMIN, avatar: 'https://i.pravatar.cc/150?u=admin-d', position: 'Directrice Générale',
//     },
//      {
//       id: 'personne-b', matricule: 'E003', name: 'Mamy Andria', email: 'm.andria@ans.mg', password: 'password123', role: ROLES.EMPLOYEE, avatar: 'https://i.pravatar.cc/150?u=personne-b', position: 'Graphiste',
//     },
//     {
//       id: 'personne-d', matricule: 'E004', name: 'Fara Rasoa', email: 'f.rasoa@ans.mg', password: 'password123', role: ROLES.EMPLOYEE, avatar: 'https://i.pravatar.cc/150?u=personne-d', position: 'Chef d\'atelier',
//     },
//   ],
//   tasks: [
//     { id: 'TSK-007', name: 'Impression Flyers', orderId: 'ORD-01', assignedTo: 'personne-a', type: 'impression', machine: 'Heidelberg XL 106', priority: 'Haute', estimatedDuration: 5400, deadline: new Date('2025-08-19T09:00:00'), status: 'Terminée', elapsedTime: 5600, recap: { quantityDone: 10000, waste: 50, notes: 'RAS', errors: 'Bourrage papier au démarrage', justification: 'Bourrage machine' } },
//     { id: 'TSK-014', name: 'Découpe & Façonnage', orderId: 'ORD-01', assignedTo: 'personne-a', type: 'decoupe', machine: 'Polar 115', priority: 'Haute', estimatedDuration: 7200, deadline: new Date('2025-08-19T09:00:00'), status: 'En retard', elapsedTime: 0, recap: { quantityDone: 0, waste: 0, notes: '', errors: '', justification: '' } },
//     { id: 'TSK-016', name: 'Contrôle Qualité Final', orderId: 'ORD-01', assignedTo: 'personne-a', type: 'controle', machine: 'N/A', priority: 'Moyenne', estimatedDuration: 1800, deadline: new Date('2025-08-20T17:00:00'), status: 'À faire', elapsedTime: 0, recap: { quantityDone: 0, waste: 0, notes: '', errors: '', justification: '' } },
//     { id: 'TSK-021', name: 'Nettoyage Machine', orderId: 'MAINT-01', assignedTo: 'personne-a', type: 'nettoyage', machine: 'Heidelberg XL 106', priority: 'Basse', estimatedDuration: 3600, deadline: new Date('2025-08-22T17:00:00'), status: 'À faire', elapsedTime: 0, recap: { quantityDone: 0, waste: 0, notes: '', errors: '', justification: '' } },
//     { id: 'TSK-022', name: 'Création graphique', orderId: 'ORD-02', assignedTo: 'personne-c', type: 'conception', machine: 'iMac 27"', priority: 'Haute', estimatedDuration: 14400, deadline: new Date('2025-08-21T18:00:00'), status: 'À faire', elapsedTime: 0, recap: { quantityDone: 0, waste: 0, notes: '', errors: '', justification: '' } },
//   ],
//   orders: [
//       { id: 'ORD-01', customerName: 'Orinasa Masoandro', productName: 'Flyers A5 R/V', quantity: 10000, supportType: 'Papier couché 135g', deliveryDate: new Date('2025-08-21') },
//       { id: 'ORD-02', customerName: 'Teknolojia Vaovao', productName: 'Brochure A4', quantity: 2500, supportType: 'Papier recyclé 300g', deliveryDate: new Date('2025-08-26') },
//       { id: 'MAINT-01', customerName: 'Interne', productName: 'Maintenance Hebdomadaire', quantity: 1, supportType: 'N/A', deliveryDate: new Date('2025-08-22') },
//   ],
//   leaveRequests: [
//       { id: 'LR-001', employeeId: 'personne-a', type: 'Congé Payé', startDate: new Date('2025-09-01'), endDate: new Date('2025-09-05'), status: 'Approuvée' },
//       { id: 'LR-003', employeeId: 'personne-a', type: 'RTT', startDate: new Date('2025-08-25'), endDate: new Date('2025-08-25'), status: 'Approuvée' },
//   ],
//   documents: [
//       { id: 'DOC-PAY-0725', name: 'Bulletin de paie Juillet 2025', type: 'Bulletin de paie', month: 'Juillet 2025', employeeId: 'all', url: '#' },
//       { id: 'DOC-COMP-01', name: 'Règlement intérieur', category: 'entreprise', url: '#' },
//   ],
//   announcements: [
//       { id: 'ANN-01', date: new Date('2025-08-18'), title: 'Lancement réussi du projet Quantum Solutions !', content: 'Un travail remarquable qui démontre notre expertise. Bravo à toute l\'équipe pour cet excellent résultat.' },
//       { id: 'ANN-02', date: new Date('2025-08-15'), title: 'Bienvenue à Pierre Martin !', content: 'Nous sommes ravis de l\'accueillir dans l\'équipe Création. N\'hésitez pas à aller le saluer !' },
//   ],
//   rh_requests: [
//       { id: 'RHR-001', employeeId: 'personne-a', type: 'Attestation de travail', status: 'Traité', submittedDate: new Date('2025-07-15')},
//   ],
//   rh_complaints: [],
//   admin_todos: [
//       {id: 'ADM-2', text: "Finaliser l'entretien annuel avant le 30/08", for: 'personne-a', from: 'RH'},
//   ],
//   generalNotes: ''
// };

// // --- HELPERS & UI ---
// const formatDate = (date) => new Date(date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' });
// const formatTime = (date) => new Date(date).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
// const formatDuration = (seconds) => {
//     if (seconds < 0) seconds = 0;
//     const h = Math.floor(seconds / 3600);
//     const m = Math.floor((seconds % 3600) / 60);
//     const s = Math.floor(seconds % 60);
//     return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':');
// };

// const getTaskStatus = (task) => {
//     if (task.status === 'Terminée' || task.status === 'En cours' || task.status === 'En pause') return task.status;
//     if (new Date(task.deadline) < MOCK_CURRENT_DATE) return 'En retard';
//     return 'À faire';
// };

// const calculateLeaveDays = (startDate, endDate) => {
//     const start = new Date(startDate); const end = new Date(endDate); let count = 0;
//     const curDate = new Date(start.getTime());
//     while (curDate <= end) { count++; curDate.setDate(curDate.getDate() + 1); }
//     return count;
// };

// const Button = React.memo(({ children, onClick, variant = 'primary', icon: Icon, className = '', disabled = false, size = 'md' }) => {
//     const base = "font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900";
//     const sizeClasses = {
//         sm: 'px-3 py-1.5 text-sm',
//         md: 'px-4 py-2 text-base',
//         lg: 'px-6 py-3 text-lg'
//     };
//     const variants = { 
//         primary: "bg-red-600 hover:bg-red-700 text-white focus-visible:ring-red-500", 
//         secondary: "bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 border border-slate-300/70 dark:border-slate-600 focus-visible:ring-red-500", 
//         ghost: "bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
//     };
//     return <button onClick={onClick} disabled={disabled} className={`${base} ${sizeClasses[size]} ${variants[variant]} ${className}`}>{Icon && <Icon size={size === 'sm' ? 16 : 20} strokeWidth={2.5} />}{children}</button>;
// });

// const Card = ({ children, className = '', title, titleIcon: TitleIcon, actions }) => (
//     <div className={`bg-white dark:bg-slate-800/50 rounded-xl shadow-lg shadow-slate-200/40 dark:shadow-black/20 border border-slate-200/50 dark:border-slate-700/50 ${className}`}>
//         {title && (
//             <div className="p-4 flex justify-between items-center border-b border-slate-200/50 dark:border-slate-700/50">
//                 <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-3">
//                     {TitleIcon && <TitleIcon className="text-red-500" size={20} />}
//                     {title}
//                 </h2>
//                 {actions && <div>{actions}</div>}
//             </div>
//         )}
//         <div className="p-4 md:p-6">
//             {children}
//         </div>
//     </div>
// );

// const Modal = ({ isOpen, onClose, children, title, maxWidth = 'max-w-2xl' }) => {
//     if (!isOpen) return null;
//     return (
//         <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in" onClick={onClose}>
//             <div className={`bg-slate-50 dark:bg-slate-800 rounded-xl shadow-2xl w-full ${maxWidth} m-4 animate-scale-in border border-slate-200/50 dark:border-slate-700`} onClick={e => e.stopPropagation()}>
//                 <div className="p-6">
//                     {title && <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4">{title}</h3>}
//                     {children}
//                 </div>
//             </div>
//         </div>
//     );
// };

// // --- LOGIN SCREEN ---
// const LoginScreen = ({ onLogin, error, generalInfo }) => {
//     const [matricule, setMatricule] = useState('');
//     const [password, setPassword] = useState('');
//     const [showPassword, setShowPassword] = useState(false);
//     const { theme, setTheme } = useAppContext();

//     const handleSubmit = (e) => { e.preventDefault(); onLogin(matricule, password); };

//     return (
//         <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-900 transition-colors duration-300 p-4 font-sans">
//             <div className="absolute top-5 right-5"><button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400">{theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}</button></div>
//             <div className="w-full max-w-sm mx-auto flex flex-col items-center">
//                  <div className="flex items-center justify-center space-x-3 mb-8">
//                     <div className="w-14 h-14 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center shadow-lg"><span className="text-red-600 text-3xl font-bold">ans</span></div>
//                     <div><h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">ORION</h1><p className="text-sm text-slate-500 dark:text-slate-400">Portail Employé</p></div>
//                 </div>
//                 <div className="bg-white dark:bg-slate-800/50 p-8 rounded-2xl shadow-2xl shadow-slate-200/40 dark:shadow-black/20 border border-slate-200/50 dark:border-slate-700/50 w-full">
//                     <h2 className="text-2xl font-semibold text-slate-700 dark:text-slate-200 mb-6 text-center">Connexion</h2>
//                     {error && <p className="bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 p-3 rounded-lg text-center text-sm mb-4">{error}</p>}
//                     <form onSubmit={handleSubmit} className="space-y-6">
//                         <div><input type="text" value={matricule} onChange={e => setMatricule(e.target.value)} className="w-full p-3 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-red-500" placeholder="Matricule" required /></div>
//                         <div className="relative"><input type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} className="w-full p-3 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-red-500" placeholder="Mot de passe" required /><button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 px-3 text-slate-500">{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button></div>
//                         <Button type="submit" className="w-full !py-3" icon={LogIn}>Se connecter</Button>
//                     </form>
//                 </div>
//                 <div className="mt-8 w-full">
//                     <Card title="Informations Générales" titleIcon={Info}>
//                         <div className="space-y-4">
//                             {generalInfo && generalInfo.map(info => (
//                                 <div key={info.id} className="flex items-start gap-4">
//                                     <div className={`mt-1 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-opacity-10 ${info.color.replace('text-', 'bg-')} ${info.color}`}>
//                                         <info.icon size={16} />
//                                     </div>
//                                     <div>
//                                         <h4 className="font-semibold text-slate-800 dark:text-slate-200">{info.title}</h4>
//                                         <p className="text-sm text-slate-500 dark:text-slate-400">{info.content}</p>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </Card>
//                 </div>
//             </div>
//         </div>
//     );
// };

// const LateArrivalModal = ({ isOpen, onClose, onSubmit, lateDuration }) => {
//     const [justification, setJustification] = useState('');
//     const handleSubmit = (e) => { e.preventDefault(); if(justification) { onSubmit(justification); } };

//     return (
//         <Modal isOpen={isOpen} onClose={() => {}}>
//             <div className="text-center">
//                 <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 dark:bg-red-900/30 mb-4"><AlertTriangle className="h-10 w-10 text-red-600" /></div>
//                 <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Vous êtes en retard !</h3>
//                 <p className="text-slate-500 dark:text-slate-400 mt-2">Vous êtes arrivé avec <span className="font-bold text-red-500 text-lg">{lateDuration}</span> de retard.</p>
//                 <form onSubmit={handleSubmit} className="mt-6 text-left">
//                     <label htmlFor="justification" className="text-sm font-medium text-slate-600 dark:text-slate-300">Veuillez justifier votre retard pour continuer :</label>
//                     <textarea id="justification" value={justification} onChange={(e) => setJustification(e.target.value)} className="w-full mt-2 p-2 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-red-500 focus:border-red-500" rows="3" required />
//                     <Button type="submit" className="w-full mt-4" disabled={!justification}>Envoyer la justification</Button>
//                 </form>
//             </div>
//         </Modal>
//     );
// };


// // --- PORTAL COMPONENTS ---
// const EmployeePortal = ({ user, onLogout }) => {
//     const [activeTab, setActiveTab] = useState('dashboard');
//     const { theme, setTheme } = useAppContext();
    
//     const tabs = [
//         { id: 'dashboard', label: 'Tableau de Bord', icon: LayoutDashboard },
//         { id: 'annuaire', label: 'Annuaire', icon: Users },
//         { id: 'production', label: 'Production', icon: Printer },
//         { id: 'planning', label: 'Mon planning', icon: Calendar },
//         { id: 'rh', label: 'Mon Espace RH', icon: Briefcase },
//     ];

//     const renderContent = () => {
//         switch (activeTab) {
//             case 'production': return <ProductionTab user={user} />;
//             case 'planning': return <PlanningTab user={user} />;
//             case 'rh': return <EspaceRHTab user={user} />;
//             case 'annuaire': return <AnnuaireTab />;
//             case 'dashboard': default: return <DashboardTab user={user} />;
//         }
//     };
    
//     return (
//         <div className="min-h-screen bg-slate-50 dark:bg-slate-900 font-sans flex transition-colors duration-300">
//             <aside className="w-20 lg:w-64 bg-slate-900 text-white flex-shrink-0 flex flex-col p-4 shadow-2xl transition-all duration-300">
//                 <div className="flex items-center justify-center lg:justify-start space-x-3 p-2 mb-6">
//                     <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center shadow-lg"><span className="text-white text-xl font-bold">ans</span></div>
//                     <h1 className="text-xl font-bold text-white hidden lg:block">ORION</h1>
//                 </div>
//                 <nav className="flex flex-col space-y-2">
//                     {tabs.map(tab => (
//                         <a key={tab.id} href="#" onClick={() => setActiveTab(tab.id)} 
//                            className={`flex items-center justify-center lg:justify-start space-x-3 p-3 rounded-lg transition-colors text-sm font-medium group ${activeTab === tab.id ? 'bg-red-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
//                            title={tab.label}>
//                             <tab.icon size={22} />
//                             <span className="hidden lg:inline">{tab.label}</span>
//                         </a>
//                     ))}
//                 </nav>
//                 <div className="mt-auto">
//                     <div className="flex items-center justify-center lg:justify-start mt-4">
//                          <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} className="flex items-center justify-center gap-2 p-3 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white text-xs w-full">
//                             {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
//                             <span className="hidden lg:inline">{theme === 'light' ? 'Mode Sombre' : 'Mode Clair'}</span>
//                         </button>
//                     </div>
//                      <div className="flex items-center justify-center lg:justify-start mt-2">
//                         <button onClick={onLogout} className="flex items-center justify-center gap-2 p-3 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white text-xs w-full">
//                             <LogOut size={20} />
//                             <span className="hidden lg:inline">Déconnexion</span>
//                         </button>
//                     </div>
//                 </div>
//             </aside>
//             <main className="flex-1 flex flex-col">
//                 <header className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg border-b border-slate-200/80 dark:border-slate-700/80 p-4 flex justify-between items-center sticky top-0 z-10">
//                     <div>
//                         <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">Bonjour, {user.name.split(' ')[0]} !</h1>
//                         <p className="text-sm text-slate-500 dark:text-slate-400">Ravi de vous revoir.</p>
//                     </div>
//                     <div className="flex items-center gap-4">
//                         <button onClick={() => useAppContext().setCommandBarOpen(true)} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400">
//                             <Search size={20} />
//                         </button>
//                         <div className="relative">
//                             <Bell size={20} className="text-slate-500 dark:text-slate-400" />
//                             <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">3</span>
//                         </div>
//                         <div className="flex items-center gap-3">
//                             <img src={user.avatar} alt="Avatar" className="w-10 h-10 rounded-full" />
//                             <div className="hidden md:block">
//                                 <p className="font-semibold text-sm text-slate-800 dark:text-slate-100">{user.name}</p>
//                                 <p className="text-xs text-slate-500 dark:text-slate-400">{user.position}</p>
//                             </div>
//                         </div>
//                     </div>
//                 </header>
//                 <div className="p-4 md:p-6 lg:p-8 animate-fade-in flex-1 overflow-y-auto bg-slate-100/50 dark:bg-slate-900/50">{renderContent()}</div>
//             </main>
//         </div>
//     );
// };

// const DashboardTab = ({ user }) => {
//     const { data } = useData();
//     const stats = useMemo(() => {
//         const userTasks = data.tasks.filter(t => t.assignedTo === user.id);
//         return {
//             tasksToDo: userTasks.filter(t => getTaskStatus(t) === 'À faire').length,
//             lateTasks: userTasks.filter(t => getTaskStatus(t) === 'En retard').length,
//             tasksInProgress: userTasks.filter(t => getTaskStatus(t) === 'En cours').length,
//         };
//     }, [data, user]);

//     const StatCard = React.memo(({ icon: Icon, label, value, color }) => (
//         <div className="bg-white dark:bg-slate-800/50 p-5 rounded-xl shadow-lg shadow-slate-200/40 dark:shadow-black/20 border border-slate-200/50 dark:border-slate-700/50 flex items-center gap-5">
//             <div className={`p-3 rounded-full bg-opacity-10 ${color.bg} ${color.text}`}>
//                 <Icon size={24} />
//             </div>
//             <div>
//                 <p className="text-3xl font-bold text-slate-800 dark:text-white">{value}</p>
//                 <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
//             </div>
//         </div>
//     ));
    
//     return (
//         <div className="space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 <StatCard icon={List} label="Tâches à faire" value={stats.tasksToDo} color={{bg: 'bg-blue-500', text: 'text-blue-500'}} />
//                 <StatCard icon={Clock} label="Tâches en cours" value={stats.tasksInProgress} color={{bg: 'bg-yellow-500', text: 'text-yellow-500'}} />
//                 <StatCard icon={AlertTriangle} label="Tâches en retard" value={stats.lateTasks} color={{bg: 'bg-red-500', text: 'text-red-500'}} />
//             </div>

//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//                 <div className="lg:col-span-2">
//                     <Card title="Production de la semaine" titleIcon={BarChart2}>
//                         <div className="h-64 flex items-end justify-center p-4">
//                             <svg viewBox="0 0 400 150" className="w-full h-full">
//                                 <path d="M 20 130 L 70 80 L 120 100 L 170 50 L 220 70 L 270 40 L 320 60 L 370 30" fill="none" stroke="#ef4444" strokeWidth="2" />
//                                 <circle cx="70" cy="80" r="3" fill="#ef4444" /><circle cx="120" cy="100" r="3" fill="#ef4444" /><circle cx="170" cy="50" r="3" fill="#ef4444" /><circle cx="220" cy="70" r="3" fill="#ef4444" /><circle cx="270" cy="40" r="3" fill="#ef4444" /><circle cx="320" cy="60" r="3" fill="#ef4444" /><circle cx="370" cy="30" r="3" fill="#ef4444" />
//                                 <text x="20" y="145" fontSize="12" className="fill-current text-slate-500">Lun</text><text x="70" y="145" fontSize="12" className="fill-current text-slate-500">Mar</text><text x="120" y="145" fontSize="12" className="fill-current text-slate-500">Mer</text><text x="170" y="145" fontSize="12" className="fill-current text-slate-500">Jeu</text><text x="220" y="145" fontSize="12" className="fill-current text-slate-500">Ven</text><text x="270" y="145" fontSize="12" className="fill-current text-slate-500">Sam</text><text x="320" y="145" fontSize="12" className="fill-current text-slate-500">Dim</text>
//                             </svg>
//                         </div>
//                     </Card>
//                 </div>
//                 <div className="lg:col-span-1">
//                     <Card title="Actualités Récentes" titleIcon={Bell}>
//                         <div className="space-y-4">
//                             {data.announcements.map(ann => (
//                                 <div key={ann.id} className="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg">
//                                     <h3 className="font-semibold text-sm text-slate-800 dark:text-slate-200">{ann.title}</h3>
//                                     <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{ann.content}</p>
//                                 </div>
//                             ))}
//                         </div>
//                     </Card>
//                 </div>
//             </div>
//         </div>
//     );
// };

// const AnnuaireTab = () => {
//     const { data } = useData();
//     const [searchTerm, setSearchTerm] = useState('');

//     const filteredPersonnel = useMemo(() => 
//         data.personnel.filter(p => 
//             p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
//             p.position.toLowerCase().includes(searchTerm.toLowerCase())
//         ), [data.personnel, searchTerm]);

//     return (
//         <div className="space-y-6">
//             <div>
//                 <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">Annuaire des Employés</h1>
//                 <p className="text-slate-500 dark:text-slate-400 mt-1">Retrouvez rapidement les membres de votre équipe.</p>
//             </div>
//             <div className="relative">
//                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
//                 <input 
//                     type="text"
//                     placeholder="Rechercher un employé par nom ou poste..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="w-full p-3 pl-12 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-red-500"
//                 />
//             </div>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//                 {filteredPersonnel.map(person => (
//                     <div key={person.id} className="text-center bg-white dark:bg-slate-800/50 p-6 rounded-xl shadow-lg shadow-slate-200/40 dark:shadow-black/20 border border-slate-200/50 dark:border-slate-700/50 transform hover:-translate-y-1 transition-transform duration-300">
//                         <img src={person.avatar} alt={person.name} className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-slate-200 dark:border-slate-700" />
//                         <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">{person.name}</h3>
//                         <p className="text-sm text-red-500">{person.position}</p>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// const FocusModeView = ({ task, onExit }) => {
//     const { data } = useData();
//     const order = data.orders.find(o => o.id === task.orderId);
    
//     return (
//         <div className="fixed inset-0 bg-slate-900/95 backdrop-blur-lg text-white flex flex-col items-center justify-center z-50 animate-fade-in p-8">
//             <button onClick={onExit} className="absolute top-6 right-6 text-slate-400 hover:text-white"><X size={32}/></button>
//             <p className="text-2xl text-red-500 font-bold mb-2">{order.id} - {order.customerName}</p>
//             <h1 className="text-5xl font-bold text-center max-w-4xl">{task.name}</h1>
//             <div className="my-12 text-center">
//                 <p className="text-2xl text-slate-400">Machine</p>
//                 <p className="text-4xl font-semibold">{task.machine}</p>
//             </div>
//             <div className="w-full max-w-md bg-slate-800 p-8 rounded-2xl">
//                 <p className="text-center text-lg text-slate-300 mb-4">Chronomètre</p>
//                 <p className="text-center text-8xl font-mono font-bold tracking-tighter">00:00:00</p>
//             </div>
//             <div className="flex gap-6 mt-12">
//                 <Button onClick={onExit} size="lg" className="!bg-green-600 hover:!bg-green-700" icon={CheckCircle}>Tâche Finie</Button>
//                 <Button onClick={onExit} size="lg" variant="secondary" icon={AlertTriangle}>Signaler un problème</Button>
//             </div>
//         </div>
//     );
// };

// const ProductionTab = ({ user }) => {
//     const { data, setData } = useData();
//     const { setFocusTask } = useAppContext();
//     const [recapModal, setRecapModal] = useState({ isOpen: false, task: null });
//     const [expandedOF, setExpandedOF] = useState({});
    
//     const [workStatus, setWorkStatus] = useState('working'); // 'working' or 'paused'
//     const [workTime, setWorkTime] = useState(0);
//     const [pauseTime, setPauseTime] = useState(0);
//     const [incidentModal, setIncidentModal] = useState(false);

//     const userOrders = useMemo(() => {
//         const tasks = data.tasks.filter(t => t.assignedTo === user.id);
//         const orderIds = [...new Set(tasks.map(t => t.orderId))];
//         return orderIds.map(id => ({
//             ...data.orders.find(o => o.id === id),
//             tasks: tasks.filter(t => t.orderId === id).sort((a,b) => new Date(a.deadline) - new Date(b.deadline))
//         })).sort((a,b) => Math.min(...a.tasks.map(t=>new Date(t.deadline))) - Math.min(...b.tasks.map(t=>new Date(t.deadline))));
//     }, [data, user.id]);

//     useEffect(() => {
//         const interval = setInterval(() => {
//             if (workStatus === 'working') setWorkTime(t => t + 1);
//             else setPauseTime(t => t + 1);
//         }, 1000);
//         return () => clearInterval(interval);
//     }, [workStatus]);

//     const updateTask = useCallback((taskId, updates) => {
//         setData(prev => ({ ...prev, tasks: prev.tasks.map(t => t.id === taskId ? { ...t, ...updates } : t) }));
//     }, [setData]);

//     const handleStart = useCallback((task) => { updateTask(task.id, { status: 'En cours' }); setFocusTask(task); }, [updateTask, setFocusTask]);
//     const handlePauseTask = useCallback((taskId) => { updateTask(taskId, { status: 'En pause' }); }, [updateTask]);
    
//     const handleFinish = useCallback((task) => { setRecapModal({ isOpen: true, task }); }, []);
    
//     const handleRecapSubmit = useCallback((task, recapData) => {
//         updateTask(task.id, { status: 'Terminée', recap: recapData });
//         setRecapModal({ isOpen: false, task: null });
//     }, [updateTask]);
    
//     const toggleOF = useCallback((orderId) => setExpandedOF(prev => ({ ...prev, [orderId]: !prev[orderId] })), []);
    
//     const getStatusBadge = (status) => {
//         const styles = {
//             'En retard': 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300',
//             'En cours': 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 animate-pulse',
//             'En pause': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300',
//             'Terminée': 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300',
//             'À faire': 'bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-300'
//         };
//         return <span className={`px-2 py-1 text-xs font-medium rounded-full ${styles[status]}`}>{status}</span>;
//     };

//     return (
//         <div className="space-y-6">
//             <Card title="Mon Statut" titleIcon={User} actions={
//                 <Button icon={Wrench} variant="secondary" size="sm" onClick={() => setIncidentModal(true)}>Signaler un problème</Button>
//             }>
//                 <div className="flex flex-wrap items-center gap-6">
//                     <div className="flex items-center gap-2">
//                         <Clock size={20} className={workStatus === 'working' ? 'text-green-500' : 'text-slate-400'} />
//                         <div>
//                             <p className="font-mono font-bold text-xl text-slate-800 dark:text-slate-100">{formatDuration(workTime)}</p>
//                             <p className="text-xs text-slate-500">Temps de travail</p>
//                         </div>
//                     </div>
//                     <div className="flex items-center gap-2">
//                         <Coffee size={20} className={workStatus === 'paused' ? 'text-yellow-500' : 'text-slate-400'} />
//                         <div>
//                             <p className="font-mono font-bold text-xl text-slate-800 dark:text-slate-100">{formatDuration(pauseTime)}</p>
//                             <p className="text-xs text-slate-500">Temps de pause</p>
//                         </div>
//                     </div>
//                     {workStatus === 'working' ? (
//                         <Button variant="secondary" icon={Pause} onClick={() => setWorkStatus('paused')}>Prendre une pause</Button>
//                     ) : (
//                         <Button icon={Play} onClick={() => setWorkStatus('working')}>Reprendre le travail</Button>
//                     )}
//                 </div>
//             </Card>

//             <div className="space-y-4">
//                 <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Mes Ordres de Fabrication</h2>
//                 {userOrders.map(order => (
//                     <Card key={order.id} className="!p-0 overflow-hidden">
//                        <div className="p-4 flex justify-between items-center">
//                            <h3 className="font-bold text-slate-800 dark:text-slate-100">{order.id} - {order.productName} <span className="text-sm font-normal text-slate-500">({order.customerName})</span></h3>
//                            <button onClick={() => toggleOF(order.id)}><ChevronsUpDown size={20} className="text-slate-400" /></button>
//                        </div>
//                        {expandedOF[order.id] && (
//                             <div className="border-t dark:border-slate-700/50 overflow-x-auto">
//                                 <table className="w-full text-sm text-left">
//                                     <thead className="text-xs text-slate-700 dark:text-slate-300 uppercase bg-slate-50 dark:bg-slate-700/50">
//                                         <tr>
//                                             <th className="px-4 py-3">Tâche</th><th className="px-4 py-3">Machine</th><th className="px-4 py-3">Deadline</th><th className="px-4 py-3">Statut</th><th className="px-4 py-3 text-center">Actions</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody className="text-slate-600 dark:text-slate-400">
//                                         {order.tasks.map(task => {
//                                             const TaskIcon = TASK_TYPES[task.type]?.icon || List;
//                                             const currentStatus = getTaskStatus(task);
//                                             return (
//                                                 <tr key={task.id} className="border-b dark:border-slate-700/50 last:border-b-0 hover:bg-slate-50 dark:hover:bg-slate-800/30">
//                                                     <td className="px-4 py-3"><div className="flex items-center gap-2 font-semibold text-slate-800 dark:text-slate-100"><TaskIcon size={16} className={TASK_TYPES[task.type]?.color} />{task.name}</div></td>
//                                                     <td className="px-4 py-3">{task.machine}</td>
//                                                     <td className="px-4 py-3">{formatDate(task.deadline)}</td>
//                                                     <td className="px-4 py-3">{getStatusBadge(currentStatus)}</td>
//                                                     <td className="px-4 py-3"><div className="flex items-center justify-center gap-1">
//                                                         {(currentStatus === 'À faire' || currentStatus === 'En retard' || currentStatus === 'En pause') && <button aria-label="Démarrer" onClick={() => handleStart(task)} className="p-2 h-8 w-8 flex items-center justify-center rounded-md bg-green-500 text-white hover:bg-green-600"><Play size={16} /></button>}
//                                                         {currentStatus === 'En cours' && <button aria-label="Pause" onClick={() => handlePauseTask(task.id)} className="p-2 h-8 w-8 flex items-center justify-center rounded-md bg-yellow-500 text-white hover:bg-yellow-600"><Pause size={16} /></button>}
//                                                         {currentStatus !== 'Terminée' && <button aria-label="Terminer" onClick={() => handleFinish(task)} className="p-2 h-8 w-8 flex items-center justify-center rounded-md bg-red-600 text-white hover:bg-red-700"><Power size={16} /></button>}
//                                                     </div></td>
//                                                 </tr>
//                                             );
//                                         })}
//                                     </tbody>
//                                 </table>
//                             </div>
//                         )}
//                     </Card>
//                 ))}
//             </div>
//             {recapModal.isOpen && <RecapModal isOpen={recapModal.isOpen} onClose={() => setRecapModal({isOpen: false, task: null})} task={recapModal.task} onSubmit={handleRecapSubmit} />}
//             {incidentModal && <IncidentModal isOpen={incidentModal} onClose={() => setIncidentModal(false)} />}
//         </div>
//     );
// };

// const RecapModal = ({ isOpen, onClose, task, onSubmit }) => {
//     const [recap, setRecap] = useState(task.recap || { quantityDone: '', waste: '', notes: '', errors: '', justification: '' });
//     const isLate = new Date(task.deadline) < MOCK_CURRENT_DATE;
//     const handleChange = (e) => { setRecap(prev => ({ ...prev, [e.target.name]: e.target.value })); };
//     const handleSubmit = (e) => { e.preventDefault(); onSubmit(task, recap); };

//     return (
//         <Modal isOpen={isOpen} onClose={onClose} title={`Récapitulatif : ${task.name}`}>
//             <form onSubmit={handleSubmit} className="space-y-4">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div><label className="text-sm font-medium text-slate-600 dark:text-slate-300">Quantité produite</label><input type="number" name="quantityDone" value={recap.quantityDone} onChange={handleChange} className="w-full mt-1 p-2 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg" /></div>
//                     <div><label className="text-sm font-medium text-slate-600 dark:text-slate-300">Gâche (unités)</label><input type="number" name="waste" value={recap.waste} onChange={handleChange} className="w-full mt-1 p-2 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg" /></div>
//                 </div>
//                 <div><label className="text-sm font-medium text-slate-600 dark:text-slate-300">Notes générales</label><textarea name="notes" value={recap.notes} onChange={handleChange} rows="3" className="w-full mt-1 p-2 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg"></textarea></div>
//                 <div><label className="text-sm font-medium text-slate-600 dark:text-slate-300">Erreurs ou problèmes rencontrés</label><textarea name="errors" value={recap.errors} onChange={handleChange} rows="2" className="w-full mt-1 p-2 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg"></textarea></div>
//                 {isLate && <div><label className="text-sm font-medium text-red-500">Justification du retard (obligatoire)</label><textarea name="justification" value={recap.justification} onChange={handleChange} rows="2" className="w-full mt-1 p-2 bg-red-50 dark:bg-red-900/20 border border-red-300 dark:border-red-600 rounded-lg" required></textarea></div>}
//                 <div className="flex justify-end gap-3 pt-4 mt-4 border-t dark:border-slate-700">
//                     <Button type="button" variant="secondary" onClick={onClose}>Annuler</Button>
//                     <Button type="submit">Envoyer</Button>
//                 </div>
//             </form>
//         </Modal>
//     );
// };

// const IncidentModal = ({ isOpen, onClose }) => {
//     const [incident, setIncident] = useState('');
//     const handleSubmit = (e) => { e.preventDefault(); console.log('Incident:', incident); onClose(); };
//     return (
//         <Modal isOpen={isOpen} onClose={onClose} title="Signaler un problème">
//             <form onSubmit={handleSubmit}>
//                 <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">Décrivez le problème rencontré. Votre manager et la maintenance seront notifiés.</p>
//                 <textarea value={incident} onChange={(e) => setIncident(e.target.value)} className="w-full mt-1 p-2 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg" rows="5" required />
//                 <div className="flex justify-end gap-3 pt-4 mt-4 border-t dark:border-slate-700">
//                     <Button type="button" variant="secondary" onClick={onClose}>Annuler</Button>
//                     <Button type="submit" icon={Send}>Envoyer</Button>
//                 </div>
//             </form>
//         </Modal>
//     );
// };

// const PlanningTab = ({ user }) => {
//     const { data, setData } = useData();
//     const [leaveModalOpen, setLeaveModalOpen] = useState(false);
//     const userLeaves = useMemo(() => data.leaveRequests.filter(l => l.employeeId === user.id), [data.leaveRequests, user.id]);
    
//     const getLeaveStatusBadge = (status) => {
//         const styles = {
//             'Approuvée': 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300', 
//             'En attente': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300', 
//             'Refusée': 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300'
//         };
//         return <span className={`px-2 py-1 text-xs font-medium rounded-full ${styles[status] || 'bg-slate-100'}`}>{status}</span>;
//     };
    
//     const handleRequestSubmit = (request) => {
//         setData(prev => ({ ...prev, leaveRequests: [...prev.leaveRequests, { ...request, id: `LR-${Date.now()}`, employeeId: user.id, status: 'En attente' }]}));
//         setLeaveModalOpen(false);
//     };

//     return (
//         <div className="space-y-6">
//             <Card title="Mes Congés & Absences" titleIcon={Calendar} actions={<Button onClick={() => setLeaveModalOpen(true)} icon={PlusCircle}>Demander une absence</Button>}>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                     <div className="text-center p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
//                         <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{user.leaveBalance.paid}</p>
//                         <p className="text-sm text-slate-500 dark:text-slate-400">Congés Payés restants</p>
//                     </div>
//                     <div className="text-center p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
//                         <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">{user.leaveBalance.rtt}</p>
//                         <p className="text-sm text-slate-500 dark:text-slate-400">RTT restants</p>
//                     </div>
//                     <div className="text-center p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
//                         <p className="text-3xl font-bold text-slate-600 dark:text-slate-300">{calculateLeaveDays(user.hireDate, MOCK_CURRENT_DATE) > 365 ? 2.5 : 0}</p>
//                         <p className="text-sm text-slate-500 dark:text-slate-400">Acquis ce mois</p>
//                     </div>
//                 </div>
//             </Card>
//             <Card title="Historique de mes demandes" titleIcon={Clock}>
//                 <div className="space-y-2 text-sm">
//                     {userLeaves.map(l => <div key={l.id} className="flex justify-between items-center p-3 bg-slate-100 dark:bg-slate-800 rounded-lg">
//                         <div>
//                             <span className="font-semibold text-slate-800 dark:text-slate-100">{l.type}</span>
//                             <span className="text-slate-500 dark:text-slate-400"> - Du {formatDate(l.startDate)} au {formatDate(l.endDate)}</span>
//                         </div>
//                         {getLeaveStatusBadge(l.status)}
//                     </div>)}
//                 </div>
//             </Card>
//             <LeaveRequestModal isOpen={leaveModalOpen} onClose={() => setLeaveModalOpen(false)} onSubmit={handleRequestSubmit} />
//         </div>
//     );
// };

// const LeaveRequestModal = ({ isOpen, onClose, onSubmit }) => {
//     const [request, setRequest] = useState({ type: LEAVE_TYPES[0], startDate: '', endDate: '', reason: '' });
//     const handleChange = (e) => { setRequest(prev => ({ ...prev, [e.target.name]: e.target.value })); };
//     const handleSubmit = (e) => { e.preventDefault(); onSubmit(request); };

//     return (
//         <Modal isOpen={isOpen} onClose={onClose} title="Nouvelle demande d'absence">
//             <form onSubmit={handleSubmit} className="space-y-4">
//                 <div><label className="text-sm font-medium text-slate-600 dark:text-slate-300">Type d'absence</label><select name="type" value={request.type} onChange={handleChange} className="w-full mt-1 p-2 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg">{LEAVE_TYPES.map(t => <option key={t}>{t}</option>)}</select></div>
//                 <div className="grid grid-cols-2 gap-4">
//                     <div><label className="text-sm font-medium text-slate-600 dark:text-slate-300">Date de début</label><input type="date" name="startDate" value={request.startDate} onChange={handleChange} className="w-full mt-1 p-2 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg" required /></div>
//                     <div><label className="text-sm font-medium text-slate-600 dark:text-slate-300">Date de fin</label><input type="date" name="endDate" value={request.endDate} onChange={handleChange} className="w-full mt-1 p-2 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg" required /></div>
//                 </div>
//                 <div><label className="text-sm font-medium text-slate-600 dark:text-slate-300">Motif (optionnel)</label><textarea name="reason" value={request.reason} onChange={handleChange} rows="2" className="w-full mt-1 p-2 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg"></textarea></div>
//                 <div className="flex justify-end gap-3 pt-4 border-t dark:border-slate-700"><Button type="button" variant="secondary" onClick={onClose}>Annuler</Button><Button type="submit" icon={Send}>Envoyer la demande</Button></div>
//             </form>
//         </Modal>
//     );
// };

// const EspaceRHTab = ({ user }) => {
//     const [activeSubTab, setActiveSubTab] = useState('profil');
//     const subTabs = [
//         { id: 'profil', label: 'Mon profil', icon: User },
//         { id: 'performance', label: 'Performance', icon: Star },
//         { id: 'documents', label: 'Documents', icon: FileText },
//         { id: 'demarches', label: 'Démarches', icon: FileInput },
//     ];
    
//     return (
//         <div>
//             <div className="flex items-center border-b border-slate-200 dark:border-slate-700 mb-6 overflow-x-auto">
//                 {subTabs.map(tab => (
//                     <button key={tab.id} onClick={() => setActiveSubTab(tab.id)} className={`flex-shrink-0 flex items-center gap-2 px-4 py-3 text-sm font-semibold transition-colors ${activeSubTab === tab.id ? 'border-b-2 border-red-500 text-red-600 dark:text-red-500' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'}`}>
//                         <tab.icon size={16} /> {tab.label}
//                     </button>
//                 ))}
//             </div>
//             <div className="animate-fade-in">
//                 {activeSubTab === 'profil' && <ProfileSubTab user={user} />}
//                 {activeSubTab === 'performance' && <PerformanceSubTab user={user} />}
//                 {activeSubTab === 'documents' && <DocumentsSubTab user={user} />}
//                 {activeSubTab === 'demarches' && <DemarchesSubTab user={user} />}
//             </div>
//         </div>
//     );
// };

// const ProfileSubTab = ({ user }) => {
//     const { data } = useData();
//     const manager = data.personnel.find(p => p.id === user.managerId);
//     return (
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//             <Card title="Informations personnelles" className="lg:col-span-1" titleIcon={User}>
//                 <div className="space-y-4 text-sm">
//                     <div><label className="text-xs text-slate-500 dark:text-slate-400">Nom Complet</label><p className="font-semibold text-slate-800 dark:text-slate-100">{user.name}</p></div>
//                     <div><label className="text-xs text-slate-500 dark:text-slate-400">Email</label><p className="font-semibold text-slate-800 dark:text-slate-100">{user.email}</p></div>
//                     <div><label className="text-xs text-slate-500 dark:text-slate-400">Téléphone</label><p className="font-semibold text-slate-800 dark:text-slate-100">{user.phone}</p></div>
//                     <div><label className="text-xs text-slate-500 dark:text-slate-400">Adresse</label><p className="font-semibold text-slate-800 dark:text-slate-100">{user.address}</p></div>
//                 </div>
//             </Card>
//             <Card title="Informations professionnelles" className="lg:col-span-2" titleIcon={Briefcase}>
//                  <div className="space-y-4 text-sm">
//                     <div><label className="text-xs text-slate-500 dark:text-slate-400">Poste</label><p className="font-semibold text-slate-800 dark:text-slate-100">{user.position}</p></div>
//                     <div><label className="text-xs text-slate-500 dark:text-slate-400">Manager</label><p className="font-semibold text-slate-800 dark:text-slate-100">{manager?.name || 'N/A'}</p></div>
//                     <div><label className="text-xs text-slate-500 dark:text-slate-400">Date d'embauche</label><p className="font-semibold text-slate-800 dark:text-slate-100">{formatDate(user.hireDate)}</p></div>
//                     <div><label className="text-xs text-slate-500 dark:text-slate-400">Compétences</label><div className="flex flex-wrap gap-2 mt-1">{user.skills.map((skill, i) => <span key={i} className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-red-900/50 dark:text-red-300">{skill}</span>)}</div></div>
//                 </div>
//             </Card>
//         </div>
//     );
// };

// const PerformanceSubTab = ({ user }) => {
//     const { data } = useData();
//     const employeeData = data.personnel.find(p => p.id === user.id);
//     const perf = employeeData.performance;

//     return (
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             <Card title="Évaluation & Objectifs" titleIcon={TrendingUp}>
//                 <div className="space-y-6">
//                     <div>
//                         <h3 className="font-semibold text-sm mb-2 text-slate-600 dark:text-slate-300">Note du mois : {perf.monthlyScore}/10</h3>
//                         <div className="w-full bg-slate-200 rounded-full h-2.5 dark:bg-slate-700"><div className="bg-red-500 h-2.5 rounded-full" style={{width: `${perf.monthlyScore * 10}%`}}></div></div>
//                     </div>
//                     <div>
//                         <h3 className="font-semibold text-sm mb-2 text-slate-600 dark:text-slate-300">Objectifs</h3>
//                         {employeeData.objectives.map(obj => (
//                             <div key={obj.id} className="mb-3">
//                                 <div className="flex justify-between items-center mb-1"><p className="text-sm text-slate-800 dark:text-slate-200">{obj.text}</p><span className="text-xs font-bold text-slate-500">{obj.progress}%</span></div>
//                                 <div className="w-full bg-slate-200 rounded-full h-1.5 dark:bg-slate-700"><div className="bg-blue-500 h-1.5 rounded-full" style={{width: `${obj.progress}%`}}></div></div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </Card>
//             <Card title="Feedbacks" titleIcon={MessageSquare}>
//                 <div className="space-y-4">
//                     {[...employeeData.feedback].sort((a, b) => b.date - a.date).map((fb, i) => (
//                         <div key={i} className="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg">
//                             <p className="text-sm text-slate-600 dark:text-slate-300 italic">"{fb.comment}"</p>
//                             <p className="text-right text-xs text-slate-500 mt-1">- {fb.from} le {formatDate(fb.date)}</p>
//                         </div>
//                     ))}
//                 </div>
//             </Card>
//         </div>
//     );
// };

// const DocumentsSubTab = ({ user }) => {
//     const { data } = useData();
//     const allDocs = data.documents;
//     return (
//         <Card title="Bibliothèque de documents" titleIcon={BookOpen}>
//             <div className="space-y-2">
//                 {allDocs.map(doc => (
//                     <a href={doc.url} key={doc.id} download className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
//                         <div className="flex items-center gap-3"><FileText size={18} className="text-red-500" /> <span className="font-semibold text-sm text-slate-700 dark:text-slate-200">{doc.name}</span></div>
//                         <FileDown size={18} className="text-slate-400" />
//                     </a>
//                 ))}
//             </div>
//         </Card>
//     );
// };

// const DemarchesSubTab = ({ user }) => {
//     const { data, setData } = useData();
//     const userRequests = data.rh_requests.filter(r => r.employeeId === user.id);
//     const userComplaints = data.rh_complaints.filter(c => c.employeeId === user.id);
//     const handleComplaintSubmit = (complaint) => {
//         setData(prev => ({ ...prev, rh_complaints: [...prev.rh_complaints, { ...complaint, id: `COMP-${Date.now()}`, employeeId: user.id, status: 'Reçu', submittedDate: new Date() }]}));
//     };
    
//     const getStatusBadge = (status) => {
//         const styles = {
//             'Traité': 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300', 
//             'Reçu': 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300',
//         };
//         return <span className={`px-2 py-1 text-xs font-medium rounded-full ${styles[status]}`}>{status}</span>;
//     };

//     return(
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             <ComplaintFormCard onSubmit={handleComplaintSubmit} />
//             <Card title="Suivi de mes démarches" titleIcon={List}>
//                  <div className="space-y-2 text-sm">
//                     {[...userRequests, ...userComplaints].map(r => (
//                         <div key={r.id} className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
//                             <div><p className="font-semibold text-slate-800 dark:text-slate-100">{r.type || r.subject}</p><p className="text-xs text-slate-400">Soumis le {formatDate(r.submittedDate)}</p></div>
//                             {getStatusBadge(r.status)}
//                         </div>
//                     ))}
//                 </div>
//             </Card>
//         </div>
//     );
// };

// const ComplaintFormCard = ({ onSubmit }) => {
//     const [subject, setSubject] = useState('Suggestion générale');
//     const [message, setMessage] = useState('');
//     const [isAnonymous, setIsAnonymous] = useState(false);
//     const handleSubmit = (e) => { e.preventDefault(); if (!message) return; onSubmit({ subject, message, isAnonymous }); setMessage(''); setSubject('Suggestion générale'); setIsAnonymous(false); };

//     return (
//         <Card title="Faire une réclamation / suggestion" titleIcon={ShieldQuestion}>
//             <form onSubmit={handleSubmit} className="space-y-4">
//                 <div>
//                     <label className="text-sm font-medium text-slate-600 dark:text-slate-300">Sujet</label>
//                     <select value={subject} onChange={e => setSubject(e.target.value)} className="w-full mt-1 p-2 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg">
//                         <option>Suggestion générale</option><option>Réclamation (processus/matériel)</option><option>Réclamation (personne)</option><option>Autre</option>
//                     </select>
//                 </div>
//                 <div>
//                     <label className="text-sm font-medium text-slate-600 dark:text-slate-300">Message</label>
//                     <textarea value={message} onChange={e => setMessage(e.target.value)} rows="4" placeholder="Votre message sera transmis à l'administration." className="w-full mt-1 p-2 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg" required />
//                 </div>
//                 <div className="flex items-center gap-2"><input type="checkbox" id="anonymous" checked={isAnonymous} onChange={e => setIsAnonymous(e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500" /><label htmlFor="anonymous" className="text-sm text-slate-600 dark:text-slate-300">Soumettre anonymement</label></div>
//                 <Button type="submit" className="w-full" icon={Send}>Envoyer</Button>
//             </form>
//         </Card>
//     );
// };


// const CommandBar = () => {
//     const { isCommandBarOpen, setCommandBarOpen } = useAppContext();
//     const { data } = useData();
//     const [search, setSearch] = useState('');
//     const [selectedIndex, setSelectedIndex] = useState(0);
//     const inputRef = useRef(null);

//     const results = useMemo(() => {
//         if (!search) return [];
//         const lowerSearch = search.toLowerCase();
//         const tasks = data.tasks.filter(t => t.name.toLowerCase().includes(lowerSearch)).map(t => ({type: 'Tâche', name: t.name, icon: Printer, id: t.id}));
//         const users = data.personnel.filter(p => p.name.toLowerCase().includes(lowerSearch)).map(p => ({type: 'Personne', name: p.name, icon: User, id: p.id}));
//         const docs = data.documents.filter(d => d.name.toLowerCase().includes(lowerSearch)).map(d => ({type: 'Document', name: d.name, icon: FileText, id: d.id}));
//         return [...tasks, ...users, ...docs];
//     }, [search, data]);

//     useEffect(() => { if (isCommandBarOpen) inputRef.current?.focus(); }, [isCommandBarOpen]);
//     useEffect(() => { setSelectedIndex(0); }, [results]);

//     const handleKeyDown = (e) => {
//         if (e.key === 'ArrowDown') { e.preventDefault(); setSelectedIndex(i => (i + 1) % results.length); } 
//         else if (e.key === 'ArrowUp') { e.preventDefault(); setSelectedIndex(i => (i - 1 + results.length) % results.length); } 
//         else if (e.key === 'Enter') { setCommandBarOpen(false); }
//     };

//     if (!isCommandBarOpen) return null;

//     return (
//         <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-start justify-center z-50 pt-20" onClick={() => setCommandBarOpen(false)}>
//             <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-xl border border-slate-200/50 dark:border-slate-700" onClick={e => e.stopPropagation()}>
//                 <div className="flex items-center gap-2 p-3 border-b dark:border-slate-700">
//                     <Search className="text-slate-400" />
//                     <input ref={inputRef} type="text" placeholder="Chercher une tâche, un document, une personne..." value={search} onChange={e => setSearch(e.target.value)} onKeyDown={handleKeyDown} className="w-full bg-transparent focus:outline-none text-slate-800 dark:text-slate-100" />
//                 </div>
//                 <div className="p-2 max-h-96 overflow-y-auto">
//                     {results.length > 0 && <ul>{results.map((r, i) => <li key={r.id} className={`flex justify-between items-center p-3 rounded-md cursor-pointer ${selectedIndex === i ? 'bg-red-600 text-white' : 'hover:bg-slate-100 dark:hover:bg-slate-700'}`}><div className="flex items-center gap-3"><r.icon size={18} /><span>{r.name}</span></div><span className={`text-xs font-semibold ${selectedIndex === i ? 'text-red-200' : 'text-slate-400'}`}>{r.type}</span></li>)}</ul>}
//                 </div>
//             </div>
//         </div>
//     );
// };

// // --- MAIN APP ---
// function App() {
//     const [data, setData] = useState(initialData);
//     const [auth, setAuth] = useState({ user: null, error: '' });
//     const [isLoading, setIsLoading] = useState(true);
    
//     const [theme, setTheme] = useState('dark');
//     const [isCommandBarOpen, setCommandBarOpen] = useState(false);
//     const [focusTask, setFocusTask] = useState(null);
//     const [lateModalInfo, setLateModalInfo] = useState({ isOpen: false, user: null, lateDuration: '' });

//     useEffect(() => { document.documentElement.className = theme; }, [theme]);
//     useEffect(() => { const timer = setTimeout(() => setIsLoading(false), 500); return () => clearTimeout(timer); }, []);

//     useEffect(() => {
//         const handleKeyDown = (e) => { if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); setCommandBarOpen(open => !open); } };
//         window.addEventListener('keydown', handleKeyDown);
//         return () => window.removeEventListener('keydown', handleKeyDown);
//     }, []);

//     const handleLogin = useCallback((matricule, password) => {
//         // For demo, log in as the first employee if any credentials are provided
//         if (matricule && password) {
//             const user = data.personnel.find(p => p.role === ROLES.EMPLOYEE); // Find the first employee
            
//             if (user) {
//                 const today = MOCK_CURRENT_DATE.toISOString().split('T')[0];
//                 const workStartTime = new Date(`${today}T${WORK_START_TIME}`);
//                 const lateDurationMs = MOCK_CURRENT_DATE - workStartTime;

//                 if (lateDurationMs > 0 && user.role !== ROLES.ADMIN) {
//                     setLateModalInfo({
//                         isOpen: true,
//                         user: user,
//                         lateDuration: formatDuration(lateDurationMs / 1000)
//                     });
//                 }
//                 setAuth({ user: user, error: '' });
//             } else {
//                  setAuth({ user: null, error: 'Aucun employé trouvé dans les données.' });
//             }
//         } else {
//             setAuth({ user: null, error: 'Veuillez remplir tous les champs.' });
//         }
//     }, [data.personnel]);
    
//     const handleLogout = () => { setAuth({ user: null, error: '' }); };
    
//     const handleLateJustification = (justification) => {
//         setData(prev => ({
//             ...prev,
//             personnel: prev.personnel.map(p => 
//                 p.id === lateModalInfo.user.id 
//                 ? { ...p, lateJustifications: [...(p.lateJustifications || []), { date: MOCK_CURRENT_DATE, reason: justification }] }
//                 : p
//             )
//         }));
//         setLateModalInfo({ isOpen: false, user: null, lateDuration: '' });
//     };

//     if (isLoading) {
//         return <div className="fixed inset-0 bg-slate-50 dark:bg-slate-900 flex items-center justify-center"><div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div></div>;
//     }

//     const appContextValue = { theme, setTheme, isCommandBarOpen, setCommandBarOpen, focusTask, setFocusTask };

//     return (
//         <DataContext.Provider value={{ data, setData }}>
//             <AppContext.Provider value={appContextValue}>
//                 <CommandBar />
//                 {focusTask && <FocusModeView task={focusTask} onExit={() => setFocusTask(null)} />}
                
//                 {!auth.user ? (
//                     <LoginScreen onLogin={handleLogin} error={auth.error} generalInfo={data.generalInfo} />
//                 ) : (
//                     <>
//                         <LateArrivalModal 
//                             isOpen={lateModalInfo.isOpen}
//                             onClose={() => {}} // Prevent closing
//                             onSubmit={handleLateJustification}
//                             lateDuration={lateModalInfo.lateDuration}
//                         />
//                         <EmployeePortal 
//                             user={auth.user} 
//                             onLogout={handleLogout} 
//                         />
//                     </>
//                 )}
//             </AppContext.Provider>
//         </DataContext.Provider>
//     );
// }

// export default App;
