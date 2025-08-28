import { Hello } from '@/sources/actions/admin/client.action';
import React from 'react'

export default async function register() {
    const message = await Hello();
  return (
    <div className="absolute position-absolute top-[45%] left-[45%] text-3xl font-bold text-slate-900 bg-red-600 rounded-2xl border border-slate-400">
      <div className='p-4 shadow-2xl'>
        { message.data }
      </div>
    </div>
  )
}


// "use client"
// import React, { useState, useEffect, useMemo, useRef } from 'react';
// import { 
//     Book, FileText, Users, ShoppingCart, Factory, Package, CalendarDays,
//     LayoutDashboard, Wrench, X, Printer, Send, TrendingUp, TrendingDown, Bell,
//     FileSignature, FileClock, Scissors, Layers, Copy, Hash, Mail, Palette, Save, Edit, MoreVertical, PlusCircle, Trash2, CheckCircle, Truck, DollarSign, AlertTriangle, RefreshCw, Tag, Search, BarChart as BarChartIcon, Target, Lightbulb, Plus, Building, UserCheck, Clock, Wifi, Car, Settings2, Zap, Percent, ChevronDown, Eye, ShieldCheck, Facebook, MessageSquare, AtSign, Building2, UserPlus, ShoppingBasket, Users2, Ticket, BrainCircuit, PencilRuler, Info, MessageCircle, ThumbsUp, ListChecks, Wallet, UserCog, Filter, ArrowUp, ArrowDown, Bot, Sun, Moon
// } from 'lucide-react';

// // --- MOCK DATA (VERSION COMPLETE RESTAURÉE AVEC NIF/STAT) ---
// const initialData = {
//   clients: [
//     { 
//       id: 1, name: 'Nexus Corp', contact: 'Jean Dupont', email: 'jean.dupont@nexus.com', phone: ['0340123456', '0321122334'],
//       adresse: { ville: 'Analakely', rue: '12 Rue de l\'Indépendance' },
//       nif: '1234567890123456', stat: '6543210987654321',
//       statut: 'Fidèle', sourceAcquisition: 'Site Web', reseauxSociaux: 'nexuscorp.fb', nombreCommandes: 8, retours: 0, montantTotalAchats: 37500000,
//       soldeClient: 500000, lastOrderDate: new Date(new Date().setDate(new Date().getDate() - 10)).toISOString(), dateCreation: '2024-01-15T10:00:00Z', commercialId: 1,
//       feedbackHistory: [
//           { orderNumber: 'FAC-12345', feedback: 'Très bonne qualité d\'impression, livraison rapide.', date: '2025-07-15T10:00:00Z', score: 9 }
//       ],
//       notes: [
//           { id: 1, date: '2025-07-10T09:00:00Z', content: 'Appel pour discuter du projet de catalogue annuel. Préfère une finition mate.' },
//           { id: 2, date: '2025-07-12T15:30:00Z', content: 'Envoi des échantillons de papier couché 300g.' }
//       ]
//     },
//     { 
//       id: 2, name: 'Quantum Solutions', contact: 'Marie Curie', email: 'marie.curie@quantum.fr', phone: ['0338765432', ''],
//       adresse: { ville: 'Ambanidia', rue: '45 Avenue de la Science' },
//       nif: '2345678901234567', stat: '7654321098765432',
//       statut: 'Actif', sourceAcquisition: 'Recommandation', reseauxSociaux: 'quantum.solutions', nombreCommandes: 5, retours: 1, montantTotalAchats: 28500000,
//       soldeClient: 0, lastOrderDate: new Date(new Date().setDate(new Date().getDate() - 45)).toISOString(), dateCreation: '2025-02-20T10:00:00Z', commercialId: 2,
//       feedbackHistory: [
//           { orderNumber: 'FAC-67890', feedback: 'Un article abîmé sur la commande, mais le reste était parfait.', date: '2025-06-10T14:30:00Z', score: 7 }
//       ],
//       notes: []
//     },
//   ],
//   stockItems: [
//       { id: 101, name: "Stylo Bille Bleu", price: 1500, stock: 250, seuilAlerte: 50, type: "vente-directe" },
//       { id: 102, name: "Cahier A5 96p", price: 5400, stock: 120, seuilAlerte: 30, type: "vente-directe" },
//       { id: 103, name: "Ramette Papier A4", price: 16500, stock: 15, seuilAlerte: 20, type: "vente-directe" },
//       { id: 104, name: "Carnet de notes", price: 6600, stock: 150, seuilAlerte: 40, type: "vente-directe" },
//   ],
//   otherServices: {
//     "Conception & Retouche": [
//         { id: 201, name: "Livre/Magazine (Simple)", price: 5000, unit: "/page" },
//         { id: 202, name: "Livre/Magazine (Complexe)", price: 10000, unit: "/page" },
//     ],
//     "Supports de Communication": [
//         { id: 205, name: "Carte de Visite (Simple)", price: 30000 },
//         { id: 206, name: "Carte de Visite (Complexe)", price: 50000 },
//     ],
//     "Identité Visuelle": [
//         { id: 221, name: "Logo (Simple)", price: 100000 },
//         { id: 222, name: "Logo (Complexe)", price: 600000 },
//     ]
//   },
//   personnel: [
//       { id: 'pao', name: 'Équipe PAO' },
//       { id: 'impression', name: 'Équipe Impression' },
//       { id: 'finition', 'name': 'Équipe Finition' },
//   ],
//   commerciaux: [
//       { id: 1, name: 'Jean Vendeur' },
//       { id: 2, name: 'Marie Commerciale' },
//   ],
//   promoCodes: [
//       { code: 'REMISE10', percentage: 10 },
//       { code: 'SOLDE2025', percentage: 20 },
//   ]
// };

// // --- GLOBAL BUSINESS SETTINGS ---
// const businessConfig = {
//     nomEntreprise: "A.N.S. Orion",
//     adresseEntreprise: "Lot ABC 123, Antananarivo, Madagascar",
//     contactEntreprise: "contact@ans-orion.mg | +261 34 00 000 00",
//     nif: "1234567890",
//     stat: "0987654321",
//     loyerMensuel: 3600000, taxeAnnuelle: 3000000, internetMensuel: 180000,
//     heuresTravailMois: 192, joursTravailAn: 365,
//     margeCiblePct: 25,
// };

// // --- RAW MATERIAL STOCK ---
// const rawMaterialStock = {
//     papier: [ { id: '80g', name: '80g Offset', unitPrice: 150 }, { id: '135g', name: '135g Couché', unitPrice: 360 }, { id: '300g', name: '300g Couché Mat', unitPrice: 750 } ]
// };

// // --- PRODUCT CONFIGURATION DATA ---
// const productConfig = {
//     livre: {
//         title: "Livre", type: "impression", icon: <Book />,
//         steps: [
//             { id: 'typeImpression', title: 'Type d\'Impression', options: [ { value: 'numerique', label: 'Numérique' }, { value: 'offset', label: 'Offset' } ]},
//             { id: 'dimension', title: 'Dimension', options: [ { value: 'A3', label: 'A3' }, { value: 'A4', label: 'A4' }, { value: 'A5', label: 'A5' }, { value: 'A6', label: 'A6' } ]},
//             { id: 'papier', title: 'Papier', options: [ { value: '80g', label: '80g Offset' }, { value: '135g', name: '135g Couché' }, { value: '300g', name: '300g Couché Mat' } ]},
//             { id: 'couleur', title: 'Couleur', options: [ { value: 'NB', label: 'Noir & Blanc' }, { value: 'Couleur', label: 'Couleur' } ]},
//             { id: 'reliure', title: 'Reliure', options: [ { value: 'spirale', label: 'Spirale', price: 7500 }, { value: 'dos-carre', label: 'Dos Carré Collé', price: 15000 } ]},
//             { id: 'pelliculage', title: 'Pelliculage', options: [ { value: 'aucun', label: 'Aucun' }, { value: 'mat', label: 'Mat' }, { value: 'brillant', label: 'Brillant' } ]},
//             { id: 'finitionSpeciale', title: 'Finition Spéciale', options: [ { value: 'aucune', label: 'Aucune' }, { value: 'vernis', label: 'Vernis Sélectif' }, { value: 'dorure', label: 'Dorure à chaud' } ]},
//             { id: 'maquette', title: 'Maquette', options: [ { value: 'client', label: 'Fournie' }, { value: 'creation', label: 'Création' } ]},
//             { id: 'quantite', title: 'Quantité', type: 'number' },
//         ]
//     }
// };
// const defaultProductionSteps = [
//     { id: 1, name: 'Préparation PAO', completed: false, assigneA: '' },
//     { id: 2, name: 'Impression', completed: false, assigneA: '' },
//     { id: 3, name: 'Finition (Découpe, Pliage)', completed: false, assigneA: '' },
//     { id: 4, name: 'Assemblage & Reliure', completed: false, assigneA: '' },
//     { id: 5, name: 'Contrôle Qualité', completed: false, assigneA: '' },
//     { id: 6, name: 'Emballage', completed: false, assigneA: '' },
// ];

// // --- UI COMPONENTS (UNIFIED DESIGN) ---
// const SectionTitle = ({ title, subtitle }) => ( <div className="mb-8"><h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">{title}</h1>{subtitle && <p className="text-slate-500 dark:text-slate-400 mt-1 text-lg">{subtitle}</p>}</div> );
// const Button = ({ children, onClick, variant = 'primary', icon: Icon, className = '', disabled = false, ...props }) => {
//     const base = "px-5 py-2.5 font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-4";
//     const variants = { 
//         primary: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-300 dark:focus:ring-red-800", 
//         secondary: "bg-slate-200 hover:bg-slate-300 text-slate-800 focus:ring-slate-300 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600 dark:focus:ring-slate-600",
//         danger: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-300 dark:focus:ring-red-800", 
//         ghost: "bg-transparent hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 focus:ring-slate-200 dark:focus:ring-slate-600", 
//         success: "bg-emerald-500 hover:bg-emerald-600 text-white focus:ring-emerald-300 dark:focus:ring-emerald-800" 
//     };
//     return <button onClick={onClick} disabled={disabled} className={`${base} ${variants[variant]} ${className}`} {...props}>{Icon && <Icon size={18} />}{children}</button>;
// }
// const Input = React.forwardRef((props, ref) => <input ref={ref} {...props} className={`w-full p-3 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors placeholder:text-slate-400 dark:placeholder:text-slate-500 ${props.className || ''}`} />);
// const Textarea = React.forwardRef((props, ref) => <textarea ref={ref} {...props} rows="3" className={`w-full p-3 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors placeholder:text-slate-400 dark:placeholder:text-slate-500 ${props.className || ''}`} />);
// const Select = React.forwardRef((props, ref) => <select ref={ref} {...props} className={`w-full p-3 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors appearance-none bg-no-repeat bg-right pr-8 ${props.className || ''}`} style={{backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%2364748b' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.5rem center', backgroundSize: '1.5em 1.5em'}}>{props.children}</select>);

// const Accordion = ({ title, icon: Icon, children, defaultOpen = true }) => {
//     const [isOpen, setIsOpen] = useState(defaultOpen);
//     return (
//         <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden bg-white dark:bg-slate-800 shadow-sm">
//             <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center p-4 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
//                 <div className="flex items-center font-semibold text-slate-700 dark:text-slate-200 gap-3">{Icon && <Icon size={20} className="text-red-500"/>}<span>{title}</span></div>
//                 <ChevronDown size={20} className={`transition-transform text-slate-500 dark:text-slate-400 ${isOpen ? 'rotate-180' : ''}`} />
//             </button>
//             {isOpen && <div className="p-4 pt-0 space-y-4 text-sm">{children}</div>}
//         </div>
//     );
// };
// const Toast = ({ message, type, onDismiss }) => {
//     const toastTypes = {
//         success: { icon: <CheckCircle size={20} />, bar: 'bg-emerald-500', text: 'text-emerald-500' },
//         error: { icon: <AlertTriangle size={20} />, bar: 'bg-red-500', text: 'text-red-500' },
//         info: { icon: <Info size={20} />, bar: 'bg-blue-500', text: 'text-blue-500' },
//     };
//     useEffect(() => { const timer = setTimeout(onDismiss, 5000); return () => clearTimeout(timer); }, [onDismiss]);
//     return (
//         <div className={`flex items-center bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 p-4 rounded-xl shadow-2xl animate-slide-up-fast border-l-4 ${toastTypes[type]?.bar}`}>
//             <div className={`mr-4 ${toastTypes[type]?.text}`}>{toastTypes[type]?.icon || <Info size={20} />}</div>
//             <div className="flex-1 font-medium">{message}</div>
//             <button onClick={onDismiss} className="ml-4 text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"><X size={18} /></button>
//         </div>
//     );
// };
// const ToastContainer = ({ toasts, onDismiss }) => (
//     <div className="fixed bottom-8 right-8 z-[100] space-y-3">
//         {toasts.map(toast => <Toast key={toast.id} {...toast} onDismiss={() => onDismiss(toast.id)} />)}
//     </div>
// );
// const ProgressBar = ({ value, color = 'bg-red-600' }) => (
//     <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5">
//         <div className={`${color} h-2.5 rounded-full transition-all duration-500`} style={{ width: `${value}%` }}></div>
//     </div>
// );
// const StatCard = ({ title, value, icon, color, trend }) => (
//     <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md border border-slate-200 dark:border-slate-700 flex items-center space-x-4 transition-all hover:shadow-lg hover:scale-[1.02]">
//         <div className={`p-4 rounded-full ${color}`}>
//             {icon}
//         </div>
//         <div>
//             <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
//             <div className="flex items-baseline gap-2">
//                 <p className="text-3xl font-bold text-slate-800 dark:text-slate-100">{value}</p>
//                 {trend && (
//                     <span className={`flex items-center text-sm font-semibold ${trend.direction === 'up' ? 'text-emerald-500' : 'text-red-500'}`}>
//                         {trend.direction === 'up' ? <ArrowUp size={14}/> : <ArrowDown size={14}/>}
//                         {trend.value}
//                     </span>
//                 )}
//             </div>
//         </div>
//     </div>
// );

// // --- MODALS (UNIFIED DESIGN) ---
// const ModalWrapper = ({ children, onClose, title }) => (
//     <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm animate-fade-in" onClick={onClose}>
//         <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-md p-6 m-4 transform animate-slide-up" onClick={e => e.stopPropagation()}>
//             <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-200 dark:border-slate-700">
//                 <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">{title}</h3>
//                 <button onClick={onClose} className="text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"><X size={20}/></button>
//             </div>
//             {children}
//         </div>
//     </div>
// );

// const PaymentModal = ({ total, client, onClose, onConfirm, actionType }) => {
//     const [acompte, setAcompte] = useState(0);
//     const [soldeUtilise, setSoldeUtilise] = useState(0);
//     const [paymentMethod, setPaymentMethod] = useState('espece');
    
//     useEffect(() => { if (actionType === 'ticket') { setAcompte(total); } }, [actionType, total]);

//     const resteAPayer = total - acompte - soldeUtilise;
//     const title = actionType === 'facture' ? 'Générer Facture' : 'Créer un Ticket';
//     const buttonLabel = actionType === 'facture' ? 'Confirmer et Facturer' : 'Confirmer et Créer Ticket';

//     const handleSoldeChange = (e) => {
//         let value = parseFloat(e.target.value) || 0;
//         if (value > client.soldeClient) value = client.soldeClient;
//         if (value < 0) value = 0;
//         setSoldeUtilise(value);
//     };

//     return (
//         <ModalWrapper onClose={onClose} title={title}>
//             <div className="space-y-4">
//                 <p className="text-slate-600 dark:text-slate-300 text-center">Montant total à payer : <span className="font-bold text-2xl text-red-600 block mt-1">{total.toLocaleString('fr-FR')} Ar</span></p>
//                 <div className="p-4 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 rounded-lg">
//                     <label className="block text-sm font-medium text-emerald-800 dark:text-emerald-300 mb-1">Solde client disponible: {client.soldeClient.toLocaleString('fr-FR')} Ar</label>
//                     <Input type="number" value={soldeUtilise} onChange={handleSoldeChange} placeholder="Montant du solde à utiliser" />
//                     {total > client.soldeClient && <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-1">Le solde est insuffisant pour couvrir la totalité.</p>}
//                 </div>
//                 <div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Acompte complémentaire</label><Input type="number" value={acompte} onChange={e => setAcompte(parseFloat(e.target.value) || 0)} placeholder="0" disabled={actionType === 'ticket'} /></div>
//                 <div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Mode de paiement (pour l'acompte)</label><Select value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)}><option value="espece">Espèce</option><option value="mvola">MVola</option><option value="orange-money">Orange Money</option><option value="airtel-money">Airtel Money</option><option value="carte-bancaire">Carte Bancaire</option><option value="cheque">Chèque</option><option value="virement">Virement</option></Select></div>
//                 <hr className="border-slate-200 dark:border-slate-700"/><p className="text-slate-600 dark:text-slate-300 text-center">Reste à payer : <span className="font-bold text-xl text-slate-800 dark:text-slate-100 block mt-1">{resteAPayer.toLocaleString('fr-FR')} Ar</span></p>
//             </div>
//             <div className="flex justify-end space-x-3 pt-4 mt-6"><Button type="button" variant="secondary" onClick={onClose}>Annuler</Button><Button type="button" variant="success" onClick={() => onConfirm({ total, acompte, soldeUtilise, resteAPayer, paymentMethod })}>{buttonLabel}</Button></div>
//         </ModalWrapper>
//     );
// };
// const FinalizePaymentModal = ({ invoice, onClose, onConfirm }) => {
//     if (!invoice) return null;
//     return (
//         <ModalWrapper onClose={onClose} title="Clôturer la Facture">
//             <div className="space-y-4"><p className="text-slate-700 dark:text-slate-300">Vous êtes sur le point de finaliser le paiement pour la facture <strong>#{invoice.docNumber}</strong>.</p><p className="text-slate-600 dark:text-slate-400">Montant restant à payer : <span className="font-bold text-lg text-red-600">{invoice.resteAPayer.toLocaleString('fr-FR')} Ar</span></p><p className="text-sm text-slate-500 dark:text-slate-400">En confirmant, le statut de la facture passera à "Payée" et le montant total sera ajouté au chiffre d'affaires.</p></div>
//             <div className="flex justify-end space-x-3 pt-4 mt-6"><Button type="button" variant="secondary" onClick={onClose}>Annuler</Button><Button type="button" variant="success" icon={CheckCircle} onClick={() => onConfirm(invoice.id)}>Confirmer le Paiement</Button></div>
//         </ModalWrapper>
//     );
// };
// const ClientModal = ({ client, onClose, onSave, commerciaux }) => {
//     const [formData, setFormData] = useState({ id: client?.id || null, name: client?.name || '', contact: client?.contact || '', email: client?.email || '', phone: client?.phone || ['', ''], adresse: { ville: client?.adresse?.ville || '', rue: client?.adresse?.rue || '', }, nif: client?.nif || '', stat: client?.stat || '', statut: client?.statut || 'Actif', sourceAcquisition: client?.sourceAcquisition || 'Appel Direct', reseauxSociaux: client?.reseauxSociaux || '', commercialId: client?.commercialId || '' });
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         if (name === 'phone1' || name === 'phone2') { const newPhones = [...formData.phone]; newPhones[name === 'phone1' ? 0 : 1] = value; setFormData(prev => ({ ...prev, phone: newPhones })); } 
//         else if (name === 'ville' || name === 'rue') { setFormData(prev => ({ ...prev, adresse: { ...prev.adresse, [name]: value } })); } 
//         else { setFormData(prev => ({ ...prev, [name]: value })); }
//     };
//     const handleSubmit = (e) => { e.preventDefault(); onSave(formData); };
//     return (
//         <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm animate-fade-in" onClick={onClose}>
//             <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-3xl p-6 m-4 transform animate-slide-up" onClick={e => e.stopPropagation()}>
//                 <div className="flex justify-between items-center mb-4"><h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">{client ? "Modifier la fiche client" : "Ajouter un nouveau client"}</h3><button onClick={onClose} className="text-slate-400 hover:text-slate-800 p-1 rounded-full hover:bg-slate-100 transition-colors"><X size={20}/></button></div>
//                 <form onSubmit={handleSubmit} className="space-y-6"><div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
//                     <div className="space-y-4">
//                         <h4 className="font-semibold text-slate-600 dark:text-slate-300 border-b pb-2 border-slate-200 dark:border-slate-700">Identité & Commercial</h4>
//                         <div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Nom de la société</label><Input name="name" value={formData.name} onChange={handleChange} required /></div>
//                         <div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Nom du contact</label><Input name="contact" value={formData.contact} onChange={handleChange} required /></div>
//                         <div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Nom Facebook / Social</label><Input name="reseauxSociaux" value={formData.reseauxSociaux} onChange={handleChange} /></div>
//                         <div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Commercial Assigné</label><Select name="commercialId" value={formData.commercialId} onChange={handleChange}><option value="">-- Aucun --</option>{commerciaux.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}</Select></div>
//                     </div>
//                     <div className="space-y-4">
//                         <h4 className="font-semibold text-slate-600 dark:text-slate-300 border-b pb-2 border-slate-200 dark:border-slate-700">Coordonnées & Fiscalité</h4>
//                         <div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email</label><Input type="email" name="email" value={formData.email} onChange={handleChange} required /></div>
//                         <div className="grid grid-cols-2 gap-4">
//                             <div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Téléphone 1</label><Input name="phone1" value={formData.phone[0]} onChange={handleChange} /></div>
//                             <div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Téléphone 2</label><Input name="phone2" value={formData.phone[1]} onChange={handleChange} /></div>
//                         </div>
//                         <div className="grid grid-cols-2 gap-4">
//                             <div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">NIF</label><Input name="nif" value={formData.nif} onChange={handleChange} /></div>
//                             <div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">STAT</label><Input name="stat" value={formData.stat} onChange={handleChange} /></div>
//                         </div>
//                         <div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Adresse (Rue, Ville)</label><div className="flex gap-4"><Input name="rue" value={formData.adresse.rue} onChange={handleChange} placeholder="Rue" /><Input name="ville" value={formData.adresse.ville} onChange={handleChange} placeholder="Ville" required /></div></div>
//                     </div>
//                 </div><div className="flex justify-end space-x-3 pt-4 border-t border-slate-200 dark:border-slate-700 mt-6"><Button type="button" variant="secondary" onClick={onClose}>Annuler</Button><Button type="submit" variant="primary">Enregistrer</Button></div></form>
//             </div>
//         </div>
//     );
// };
// const ClientDetailsModal = ({ client, onClose, userRole, onOpenCreditModal, onSaveNote, invoices, proformas }) => {
//     const [activeTab, setActiveTab] = useState('details');
//     const [newNote, setNewNote] = useState('');
//     const notesContainerRef = useRef(null);
//     if (!client) return null;

//     useEffect(() => {
//         if (activeTab === 'notes' && notesContainerRef.current) {
//             notesContainerRef.current.scrollTop = notesContainerRef.current.scrollHeight;
//         }
//     }, [client.notes, activeTab]);

//     const handleAddNote = () => {
//         if (newNote.trim() === '') return;
//         onSaveNote(client.id, newNote);
//         setNewNote('');
//     };
    
//     const clientActivity = useMemo(() => {
//         const clientInvoices = invoices.filter(inv => inv.client.id === client.id);
//         const clientProformas = proformas.filter(p => p.client.id === client.id);
//         const allActivity = [
//             ...clientInvoices.map(i => ({...i, docType: 'Facture'})),
//             ...clientProformas.map(p => ({...p, docType: 'Proforma'}))
//         ];
//         return allActivity.sort((a,b) => new Date(b.date) - new Date(a.date)).slice(0, 10);
//     }, [client, invoices, proformas]);

//     return (
//         <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm animate-fade-in" onClick={onClose}>
//             <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-4xl p-6 m-4 transform animate-slide-up flex flex-col" onClick={e => e.stopPropagation()}>
//                 <div className="flex justify-between items-center mb-4 border-b dark:border-slate-700 pb-3"><h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">Détails du Client: {client.name}</h3><button onClick={onClose} className="text-slate-400 hover:text-slate-800 p-1 rounded-full"><X size={20}/></button></div>
//                 <div className="border-b border-slate-200 dark:border-slate-700 mb-4">
//                     <nav className="-mb-px flex space-x-6">
//                         <button onClick={() => setActiveTab('details')} className={`py-3 px-1 border-b-2 font-medium text-sm ${activeTab === 'details' ? 'border-red-500 text-red-600' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:border-slate-600'}`}>Détails & Performance</button>
//                         <button onClick={() => setActiveTab('activity')} className={`py-3 px-1 border-b-2 font-medium text-sm ${activeTab === 'activity' ? 'border-red-500 text-red-600' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:border-slate-600'}`}>Activité Récente</button>
//                         <button onClick={() => setActiveTab('notes')} className={`py-3 px-1 border-b-2 font-medium text-sm ${activeTab === 'notes' ? 'border-red-500 text-red-600' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:border-slate-600'}`}>Notes & Historique</button>
//                     </nav>
//                 </div>
//                 <div className="overflow-y-auto max-h-[70vh] pr-2">
//                     {activeTab === 'details' && (
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                             <div className="space-y-4 text-slate-700 dark:text-slate-300">
//                                 <h4 className="font-semibold text-slate-700 dark:text-slate-200">Informations Générales</h4>
//                                 <p className="text-sm"><strong className="text-slate-500 dark:text-slate-400 w-24 inline-block">Contact:</strong> {client.contact}</p>
//                                 <p className="text-sm"><strong className="text-slate-500 dark:text-slate-400 w-24 inline-block">Email:</strong> {client.email}</p>
//                                 <p className="text-sm"><strong className="text-slate-500 dark:text-slate-400 w-24 inline-block">Téléphones:</strong> {client.phone.filter(Boolean).join(', ')}</p>
//                                 <p className="text-sm"><strong className="text-slate-500 dark:text-slate-400 w-24 inline-block">Adresse:</strong> {client.adresse.rue}, {client.adresse.ville}</p>
//                                 <p className="text-sm"><strong className="text-slate-500 dark:text-slate-400 w-24 inline-block">NIF:</strong> {client.nif || 'N/A'}</p>
//                                 <p className="text-sm"><strong className="text-slate-500 dark:text-slate-400 w-24 inline-block">STAT:</strong> {client.stat || 'N/A'}</p>
//                             </div>
//                             <div className="space-y-4">
//                                 <h4 className="font-semibold text-slate-700 dark:text-slate-200">Indicateurs de Performance</h4>
//                                 <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
//                                     <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Nombre de commandes</span>
//                                     <span className="text-lg font-bold text-blue-600">{client.nombreCommandes}</span>
//                                 </div>
//                                 {userRole === 'admin' && (
//                                     <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
//                                         <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Montant total des achats</span>
//                                         <span className="text-lg font-bold text-emerald-600">{client.montantTotalAchats.toLocaleString('fr-FR')} Ar</span>
//                                     </div>
//                                 )}
//                                 <div className="flex items-center justify-between p-3 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg border border-emerald-200 dark:border-emerald-800">
//                                     <span className="text-sm font-medium text-emerald-800 dark:text-emerald-300">Solde du compte</span>
//                                     <span className="text-lg font-bold text-emerald-800 dark:text-emerald-300">{client.soldeClient.toLocaleString('fr-FR')} Ar</span>
//                                 </div>
//                                 <Button variant="success" icon={PlusCircle} onClick={() => onOpenCreditModal(client)} className="w-full">Créditer le compte</Button>
//                             </div>
//                         </div>
//                     )}
//                     {activeTab === 'activity' && (
//                         <div className="space-y-3">
//                             {clientActivity.length > 0 ? clientActivity.map(doc => (
//                                 <div key={`${doc.docType}-${doc.id}`} className="p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg border dark:border-slate-700 grid grid-cols-4 gap-4 text-sm">
//                                     <span className="text-slate-700 dark:text-slate-300">{doc.docType} <strong className="font-mono">{doc.docNumber || doc.proformaNumber}</strong></span>
//                                     <span className="text-slate-600 dark:text-slate-400">{new Date(doc.date).toLocaleDateString('fr-FR')}</span>
//                                     <span className="font-semibold text-slate-800 dark:text-slate-200">{doc.totalPrice.toLocaleString('fr-FR')} Ar</span>
//                                     <span className="text-slate-700 dark:text-slate-300">{doc.paymentStatus || doc.status}</span>
//                                 </div>
//                             )) : <p className="text-sm text-slate-500 dark:text-slate-400 text-center py-4">Aucune activité récente.</p>}
//                         </div>
//                     )}
//                      {activeTab === 'notes' && (
//                         <div className="space-y-4">
//                              <div>
//                                 <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-2">Ajouter une note</h4>
//                                 <Textarea value={newNote} onChange={(e) => setNewNote(e.target.value)} placeholder="Écrire une note sur le client..."/>
//                                 <Button onClick={handleAddNote} className="mt-2">Enregistrer la note</Button>
//                             </div>
//                             <h4 className="font-semibold text-slate-700 dark:text-slate-200 pt-4 border-t dark:border-slate-700">Historique des Notes</h4>
//                             <div ref={notesContainerRef} className="space-y-3 max-h-60 overflow-y-auto pr-2">
//                                 {client.notes && client.notes.length > 0 ? [...client.notes].reverse().map((note) => (
//                                     <div key={note.id} className="p-3 bg-slate-100 dark:bg-slate-700/50 rounded-lg border dark:border-slate-700">
//                                         <p className="text-xs text-slate-500 dark:text-slate-400">{new Date(note.date).toLocaleString('fr-FR')}</p>
//                                         <p className="text-sm text-slate-800 dark:text-slate-200 mt-1">{note.content}</p>
//                                     </div>
//                                 )) : <p className="text-sm text-slate-500 dark:text-slate-400 text-center py-4">Aucune note pour ce client.</p>}
//                             </div>
//                             <h4 className="font-semibold text-slate-700 dark:text-slate-200 pt-4 border-t dark:border-slate-700">Historique des Retours & Satisfactions</h4>
//                             <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
//                                 {client.feedbackHistory && client.feedbackHistory.length > 0 ? [...client.feedbackHistory].reverse().map((fb, index) => (
//                                     <div key={index} className="p-3 bg-slate-100 dark:bg-slate-700/50 rounded-lg border dark:border-slate-700">
//                                         <p className="text-xs text-slate-500 dark:text-slate-400">Commande #{fb.orderNumber} - {new Date(fb.date).toLocaleDateString('fr-FR')}</p>
//                                         <p className="text-sm text-slate-800 dark:text-slate-200 mt-1">"{fb.feedback}"</p>
//                                         {fb.score && <p className="text-xs font-bold text-blue-600 dark:text-blue-400 mt-1">Score: {fb.score}/10</p>}
//                                     </div>
//                                 )) : <p className="text-sm text-slate-500 dark:text-slate-400 text-center py-4">Aucun historique de feedback.</p>}
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };
// const AddCreditModal = ({ client, onClose, onAddCredit }) => {
//     const [amount, setAmount] = useState(0);
//     if (!client) return null;
//     return (
//         <ModalWrapper onClose={onClose} title={`Créditer le compte de ${client.name}`}>
//             <div className="space-y-4">
//                 <p className="text-slate-700 dark:text-slate-300">Solde actuel : <span className="font-bold">{client.soldeClient.toLocaleString('fr-FR')} Ar</span></p>
//                 <div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Montant à ajouter</label><Input type="number" value={amount} onChange={e => setAmount(parseFloat(e.target.value) || 0)} placeholder="0" /></div>
//             </div>
//             <div className="flex justify-end space-x-3 pt-4 mt-6"><Button variant="secondary" onClick={onClose}>Annuler</Button><Button variant="success" onClick={() => onAddCredit(client.id, amount)} disabled={amount <= 0}>Ajouter Crédit</Button></div>
//         </ModalWrapper>
//     );
// };
// const PrintableDocumentModal = ({ doc, onClose }) => {
//     if (!doc) return null;
//     const handlePrint = () => {
//         const printContents = document.getElementById('printable-area').innerHTML;
//         const originalContents = document.body.innerHTML;
//         const tailwind = '<script src="https://cdn.tailwindcss.com"></script>';
//         document.body.innerHTML = `<html><head><title>Print</title>${tailwind}</head><body>${printContents}</body></html>`;
//         setTimeout(() => {
//             window.print();
//             document.body.innerHTML = originalContents;
//             window.location.reload();
//         }, 500);
//     };
//     return (
//         <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm animate-fade-in" onClick={onClose}>
//             <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl p-4 sm:p-6 lg:p-8 m-4 transform animate-slide-up flex flex-col" onClick={e => e.stopPropagation()}>
//                 <div id="printable-area" className="p-8 text-slate-800 bg-white flex-grow">
//                     <header className="flex justify-between items-start border-b pb-4 mb-8"><h1 className="text-2xl font-bold text-red-600">{businessConfig.nomEntreprise}</h1><div className="text-right"><h2 className="text-3xl font-bold uppercase">{doc.type}</h2><p>#{doc.docNumber}</p><p>Date: {new Date(doc.date).toLocaleDateString('fr-FR')}</p></div></header>
//                     <section className="grid grid-cols-2 gap-8 mb-8">
//                         <div><h3 className="text-lg font-semibold mb-2 border-b">Client</h3><div className="text-sm"><p className="font-bold">{doc.client?.name || 'N/A'}</p><p>{doc.client?.adresse?.rue || ''}, {doc.client?.adresse?.ville || ''}</p><p>Contact: {doc.client?.contact || ''} ({doc.client?.email || ''})</p></div></div>
//                         <div><h3 className="text-lg font-semibold mb-2 border-b">Société</h3><div className="text-sm"><p>{businessConfig.adresseEntreprise}</p><p>{businessConfig.contactEntreprise}</p><p>NIF: {businessConfig.nif} / STAT: {businessConfig.stat}</p></div></div>
//                     </section>
//                     <section>
//                         <table className="w-full text-sm">
//                             <thead className="bg-slate-100"><tr><th className="p-2 text-left font-semibold">Désignation</th><th className="p-2 text-right font-semibold">Qté</th><th className="p-2 text-right font-semibold">P.U. HT</th><th className="p-2 text-right font-semibold">Remise %</th><th className="p-2 text-right font-semibold">Total HT</th></tr></thead>
//                             <tbody>{doc.items.map(item => (<tr key={item.id} className="border-b"><td className="p-2 align-top"><p className="font-semibold">{item.designation}</p><p className="text-xs text-blue-600 font-semibold pl-2">Type: {item.typeDeVente}</p><p className="text-xs text-slate-500 pl-2">{item.detailedDescription}</p></td><td className="p-2 text-right">{item.quantite}</td><td className="p-2 text-right">{item.prixUnitaire.toLocaleString('fr-FR')} Ar</td><td className="p-2 text-right">{item.remise || 0}%</td><td className="p-2 text-right font-medium">{(item.quantite * item.prixUnitaire * (1 - (item.remise || 0) / 100)).toLocaleString('fr-FR')} Ar</td></tr>))}</tbody>
//                         </table>
//                     </section>
//                     <section className="flex justify-end mt-8">
//                         <div className="w-full max-w-xs space-y-2">
//                             <div className="flex justify-between"><span className="font-semibold">Total HT:</span><span>{doc.subTotal.toLocaleString('fr-FR')} Ar</span></div>
//                             <div className="flex justify-between"><span className="font-semibold">TVA (20%):</span><span>{(doc.totalPrice - doc.subTotal).toLocaleString('fr-FR')} Ar</span></div>
//                             <div className="flex justify-between text-xl font-bold border-t pt-2"><span >Total TTC:</span><span>{doc.totalPrice.toLocaleString('fr-FR')} Ar</span></div>
//                             <div className="flex justify-between text-sm"><span className="font-semibold">Acompte versé:</span><span>{doc.acompte.toLocaleString('fr-FR')} Ar</span></div>
//                             <div className="flex justify-between font-bold text-red-600"><span >Reste à payer:</span><span>{doc.resteAPayer.toLocaleString('fr-FR')} Ar</span></div>
//                         </div>
//                     </section>
//                     <footer className="text-center text-xs text-slate-500 border-t mt-12 pt-4"><p>Arrêtée la présente facture à la somme de : {doc.totalPrice.toLocaleString('fr-FR')} Ariary.</p><p>Merci de votre confiance.</p></footer>
//                 </div>
//                 <div className="flex justify-end gap-3 p-4 bg-slate-50 border-t rounded-b-xl"><Button variant="secondary" onClick={onClose}>Fermer</Button><Button variant="primary" icon={Printer} onClick={handlePrint}>Imprimer</Button></div>
//             </div>
//         </div>
//     );
// };
// const OrderDetailsModal = ({ order, onClose, onFinalizeOrder, onToggleStep, personnel, userRole }) => {
//     const [finalizationData, setFinalizationData] = useState({
//         dechets: order?.dechets || [],
//         responsableDechets: order?.responsableDechets || '',
//         causeDechets: order?.causeDechets || '',
//         satisfactionClient: order?.satisfactionClient || '',
//         retours: order?.retours || 0,
//         satisfactionScore: order?.satisfactionScore || 0,
//     });
//     if (!order) return null;

//     const handleDechetChange = (index, field, value) => {
//         const updated = [...finalizationData.dechets];
//         const val = (field === 'quantite' || field === 'cout') ? parseFloat(value) || 0 : value;
//         updated[index][field] = val;
//         setFinalizationData(prev => ({ ...prev, dechets: updated }));
//     };
//     const addDechet = () => setFinalizationData(prev => ({ ...prev, dechets: [...prev.dechets, {id: Date.now(), nom: '', quantite: 1, cout: 0}] }));
//     const removeDechet = (id) => setFinalizationData(prev => ({ ...prev, dechets: prev.dechets.filter(d => d.id !== id) }));
//     const totalDechetsCost = useMemo(() => finalizationData.dechets.reduce((acc, d) => acc + (d.quantite * d.cout), 0), [finalizationData.dechets]);

//     const handleChange = (field, value) => {
//         setFinalizationData(prev => ({ ...prev, [field]: value }));
//     };
//     const handleSubmit = () => {
//         onFinalizeOrder(order.id, finalizationData);
//         onClose();
//     };
    
//     const initialCost = order.items.reduce((acc, item) => acc + (item.financials?.coutDeRevient || 0), 0);
//     const finalProfit = (order.totalPrice || 0) - initialCost - totalDechetsCost;
//     const finalMargin = (order.totalPrice || 0) > 0 ? (finalProfit / order.totalPrice) * 100 : 0;

//     return (
//         <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm animate-fade-in" onClick={onClose}>
//             <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-4xl p-6 m-4 transform animate-slide-up flex flex-col" onClick={e => e.stopPropagation()}>
//                 <div className="flex justify-between items-center mb-4 border-b dark:border-slate-700 pb-3"><h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">Détails de la Commande #{order.orderNumber}</h3><button onClick={onClose} className="text-slate-400 hover:text-slate-800 p-1 rounded-full"><X size={20}/></button></div>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 overflow-y-auto max-h-[80vh] pr-2">
//                     <div className="space-y-4">
//                         <Accordion title="Spécifications Techniques" icon={PencilRuler} defaultOpen={true}>
//                             {order.items.map(item => (
//                                 <div key={item.id} className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg border dark:border-slate-700">
//                                     <p className="font-bold text-blue-600 dark:text-blue-400">{item.designation} (x{item.quantite})</p>
//                                     <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{item.detailedDescription}</p>
//                                 </div>
//                             ))}
//                         </Accordion>
//                         <Accordion title="Suivi de Production" icon={ListChecks} defaultOpen={true}>
//                             {order.productionSteps.map(step => (
//                                 <div key={step.id} className="grid grid-cols-3 items-center gap-2 p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md">
//                                     <label className="flex items-center space-x-3 col-span-2 cursor-pointer">
//                                         <input type="checkbox" checked={step.completed} onChange={() => onToggleStep(order.id, step.id, 'completed')} className="h-5 w-5 rounded border-slate-300 dark:border-slate-600 text-red-600 focus:ring-red-500 bg-slate-100 dark:bg-slate-900" />
//                                         <span className={`flex-1 ${step.completed ? 'text-slate-400 dark:text-slate-500 line-through' : 'text-slate-700 dark:text-slate-300'}`}>{step.name}</span>
//                                     </label>
//                                     <Select value={step.assigneA} onChange={(e) => onToggleStep(order.id, step.id, 'assigneA', e.target.value)} className="p-1 text-xs">
//                                         <option value="">-- Assigner --</option>
//                                         {personnel.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
//                                     </Select>
//                                 </div>
//                             ))}
//                         </Accordion>
//                         {userRole === 'admin' && (
//                              <Accordion title="Analyse de Rentabilité" icon={BarChartIcon} defaultOpen={false}>
//                                 <div className="space-y-2 text-sm p-2 text-slate-700 dark:text-slate-300">
//                                     <div className="flex justify-between"><span>Prix de Vente HT:</span> <span className="font-semibold">{(order.subTotal || 0).toLocaleString('fr-FR')} Ar</span></div>
//                                     <div className="flex justify-between"><span>Coût de revient estimé:</span> <span className="font-semibold">{initialCost.toLocaleString('fr-FR')} Ar</span></div>
//                                     <div className="flex justify-between"><span>Coût des déchets:</span> <span className="font-semibold text-red-600">{totalDechetsCost.toLocaleString('fr-FR')} Ar</span></div>
//                                     <div className="flex justify-between font-bold border-t dark:border-slate-700 pt-2 mt-2"><span>Bénéfice Net Final:</span> <span className={finalProfit > 0 ? 'text-emerald-600' : 'text-red-600'}>{finalProfit.toLocaleString('fr-FR')} Ar</span></div>
//                                     <div className="flex justify-between font-bold"><span>Marge Nette Finale:</span> <span className={finalMargin > businessConfig.margeCiblePct ? 'text-emerald-600' : 'text-red-600'}>{finalMargin.toFixed(1)}%</span></div>
//                                 </div>
//                             </Accordion>
//                         )}
//                     </div>
//                     <div className="space-y-6">
//                         <Accordion title="Finalisation & Retours" icon={CheckCircle} defaultOpen={true}>
//                             <div className="space-y-3">
//                                 <div>
//                                     <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 flex items-center"><Trash2 size={14} className="mr-2"/>Gestion des déchets</label>
//                                     {finalizationData.dechets.map((d, i) => (
//                                         <div key={d.id} className="grid grid-cols-12 gap-2 items-center mb-2">
//                                             <Input value={d.nom} onChange={e => handleDechetChange(i, 'nom', e.target.value)} placeholder="Nom déchet" className="p-1 text-xs col-span-5"/>
//                                             <Input type="number" value={d.quantite} onChange={e => handleDechetChange(i, 'quantite', e.target.value)} placeholder="Qté" className="p-1 text-xs col-span-2"/>
//                                             <Input type="number" value={d.cout} onChange={e => handleDechetChange(i, 'cout', e.target.value)} placeholder="Coût U." className="p-1 text-xs col-span-3"/>
//                                             <button onClick={() => removeDechet(d.id)} className="text-red-500 col-span-2"><Trash2 size={14}/></button>
//                                         </div>
//                                     ))}
//                                     <Button onClick={addDechet} variant="ghost" className="text-xs p-1 mt-1"><Plus size={14}/> Ajouter déchet</Button>
//                                     <div className="flex justify-between font-bold border-t dark:border-slate-700 pt-1 mt-2 text-red-700"><span>Coût Total Déchets:</span><span>{totalDechetsCost.toLocaleString('fr-FR')} Ar</span></div>
//                                 </div>
//                                 <div className="grid grid-cols-2 gap-3">
//                                     <div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Responsable</label><Input value={finalizationData.responsableDechets} onChange={e => handleChange('responsableDechets', e.target.value)} /></div>
//                                     <div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Cause</label><Input value={finalizationData.causeDechets} onChange={e => handleChange('causeDechets', e.target.value)} /></div>
//                                 </div>
//                                 <div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 flex items-center"><MessageCircle size={14} className="mr-2"/>Satisfaction Client (Commentaire)</label><Textarea value={finalizationData.satisfactionClient} onChange={e => handleChange('satisfactionClient', e.target.value)} /></div>
//                                 <div className="grid grid-cols-2 gap-3">
//                                     <div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 flex items-center"><ThumbsUp size={14} className="mr-2"/>Score (/10)</label><Input type="number" value={finalizationData.satisfactionScore} onChange={e => handleChange('satisfactionScore', parseInt(e.target.value) || 0)} /></div>
//                                     <div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 flex items-center"><TrendingDown size={14} className="mr-2"/>Retours</label><Input type="number" value={finalizationData.retours} onChange={e => handleChange('retours', parseInt(e.target.value) || 0)} /></div>
//                                 </div>
//                             </div>
//                         </Accordion>
//                         <Button variant="success" icon={Save} onClick={handleSubmit} className="w-full">Sauvegarder et Clôturer les Détails</Button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// // --- PAGE COMPONENTS (UNIFIED DESIGN) ---
// const ClientsPage = ({ clients, setClients, onOpenDetails, userRole, commerciaux }) => {
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [editingClient, setEditingClient] = useState(null);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [filters, setFilters] = useState({ commercialId: 'all' });

//     const openModal = (client = null) => { setEditingClient(client); setIsModalOpen(true); };
//     const closeModal = () => { setEditingClient(null); setIsModalOpen(false); };
//     const handleSave = (clientData) => { 
//         if (editingClient) { 
//             setClients(clients.map(c => c.id === clientData.id ? {...c, ...clientData} : c)); 
//         } else { 
//             const newClient = { ...clientData, id: Date.now(), nombreCommandes: 0, retours: 0, montantTotalAchats: 0, feedbackHistory: [], soldeClient: 0, dateCreation: new Date().toISOString(), notes: [] }; 
//             setClients([...clients, newClient]); 
//         } 
//         closeModal(); 
//     };
//     const handleDelete = (clientId) => { if (window.confirm("Êtes-vous sûr de vouloir supprimer ce client ?")) { setClients(clients.filter(c => c.id !== clientId)); } };
    
//     const getClientStatusInfo = (client) => {
//         const thirtyDaysAgo = new Date();
//         thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
//         if (client.lastOrderDate && new Date(client.lastOrderDate) < thirtyDaysAgo) return { text: 'Inactif', style: 'bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-300' };
//         if (client.nombreCommandes > 10 && client.montantTotalAchats > 20000000) return { text: 'VIP', style: 'bg-amber-200 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300' };
//         if (client.nombreCommandes > 5) return { text: 'Fidèle', style: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300' };
//         if (client.nombreCommandes > 1) return { text: 'Actif', style: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300' };
//         return { text: 'Nouveau', style: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300' };
//     };

//     const filteredClients = useMemo(() => {
//         return clients.filter(client => {
//             const searchMatch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) || client.contact.toLowerCase().includes(searchTerm.toLowerCase());
//             const commercialMatch = filters.commercialId === 'all' || client.commercialId === parseInt(filters.commercialId);
//             return searchMatch && commercialMatch;
//         });
//     }, [clients, searchTerm, filters]);

//     return (
//         <div className="animate-fade-in">
//             <div className="flex justify-between items-center mb-6"><SectionTitle title="Clients" subtitle="Gérez votre base de données clients." /><Button variant="primary" icon={PlusCircle} onClick={() => openModal()}>Ajouter un client</Button></div>
//             <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border dark:border-slate-700 mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="relative">
//                     <Input type="text" placeholder="Rechercher un client par nom ou contact..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10"/>
//                     <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20}/>
//                 </div>
//                 <div>
//                      <Select value={filters.commercialId} onChange={e => setFilters(prev => ({...prev, commercialId: e.target.value}))}>
//                         <option value="all">Tous les commerciaux</option>
//                         {commerciaux.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
//                     </Select>
//                 </div>
//             </div>
//             <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden"><table className="w-full min-w-max"><thead className="bg-slate-50 dark:bg-slate-700/50"><tr><th className="p-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-300 uppercase">Société</th><th className="p-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-300 uppercase">Contact</th><th className="p-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-300 uppercase">NIF / STAT</th><th className="p-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-300 uppercase">Commandes</th>{userRole === 'admin' && <th className="p-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-300 uppercase">Total Achats (Ar)</th>}<th className="p-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-300 uppercase">Statut</th><th className="p-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-300 uppercase">Actions</th></tr></thead><tbody className="divide-y divide-slate-200 dark:divide-slate-700">{filteredClients.map((client) => {
//                 const statusInfo = getClientStatusInfo(client);
//                 return (
//                 <tr key={client.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"><td className="p-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-slate-200 flex items-center gap-2">{client.name} {statusInfo.text === 'Inactif' && <Clock size={14} className="text-orange-500" title="Client inactif, relance suggérée"/>}</td><td className="p-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">{client.contact}</td><td className="p-4 whitespace-nowrap text-xs text-slate-500 dark:text-slate-400 font-mono"><div>{client.nif}</div><div>{client.stat}</div></td><td className="p-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400 text-center">{client.nombreCommandes}</td>{userRole === 'admin' && <td className="p-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">{client.montantTotalAchats.toLocaleString('fr-FR')}</td>}<td className="p-4 whitespace-nowrap text-sm"><span className={`px-2 py-1 text-xs font-medium rounded-full ${statusInfo.style}`}>{statusInfo.text}</span></td><td className="p-4 whitespace-nowrap text-sm font-medium"><div className="flex items-center space-x-1"><Button variant="ghost" icon={Eye} onClick={() => onOpenDetails(client)} className="p-2 h-auto" /><Button variant="ghost" icon={Edit} onClick={() => openModal(client)} className="p-2 h-auto"><span className="sr-only">Modifier</span></Button><Button variant="ghost" icon={Trash2} onClick={() => handleDelete(client.id)} className="p-2 h-auto text-red-500 hover:text-red-500"><span className="sr-only">Supprimer</span></Button></div></td></tr>
//             )})}</tbody></table></div>
//             {isModalOpen && <ClientModal client={editingClient} onClose={closeModal} onSave={handleSave} commerciaux={commerciaux} />}
//         </div>
//     );
// };
// const ProformaPage = ({ initialProforma, clients, onBack, savedProformas, onSaveProforma, onInitiatePayment, onModifyProforma, onAddItemToProforma, onPrepareAndPrint, onDuplicateDocument }) => {
//     const [proforma, setProforma] = useState(null);
//     const [searchTerm, setSearchTerm] = useState('');
//     useEffect(() => { setProforma(initialProforma ? {...initialProforma} : null); }, [initialProforma]);
    
//     const filteredProformas = useMemo(() => {
//         return savedProformas.filter(p => 
//             (p.proformaNumber && p.proformaNumber.toLowerCase().includes(searchTerm.toLowerCase())) ||
//             (p.client && p.client.name && p.client.name.toLowerCase().includes(searchTerm.toLowerCase()))
//         );
//     }, [savedProformas, searchTerm]);

//     const handleItemChange = (itemId, field, value) => {
//         const newItems = proforma.items.map(item => { if (item.id === itemId) { const val = (field === 'quantite' || field === 'prixUnitaire' || field === 'remise') ? parseFloat(value) || 0 : value; return { ...item, [field]: val }; } return item; });
//         updateProformaItems(newItems);
//     };
//     const updateProformaItems = (items) => {
//         const subTotal = items.reduce((acc, item) => acc + (item.quantite * item.prixUnitaire * (1 - (item.remise || 0) / 100)), 0);
//         const tvaRate = proforma?.tvaRate || 20;
//         setProforma(prev => ({...prev, items, subTotal, totalPrice: subTotal * (1 + tvaRate / 100) }));
//     };
//     const handleFieldChange = (field, value) => { setProforma(prev => ({...prev, [field]: value})); };
//     const proformaEditor = (
//         <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 border border-slate-200 dark:border-slate-700">
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6"><div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Client</label><Select value={proforma?.clientId || ''} onChange={e => handleFieldChange('clientId', e.target.value)} disabled><option value="">-- Client --</option>{clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}</Select></div><div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Délai d'exécution (jours)</label><Input type="number" value={proforma?.delai || 7} onChange={e => handleFieldChange('delai', parseInt(e.target.value))}/></div><div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">N° Proforma</label><Input value={proforma?.proformaNumber || ''} disabled /></div></div>
//             <div className="overflow-x-auto mb-4 -mx-4 px-4"><table className="w-full"><thead><tr><th className="p-2 text-left text-sm font-semibold text-slate-600 dark:text-slate-300 w-2/5">Désignation</th><th className="p-2 text-left text-sm font-semibold text-slate-600 dark:text-slate-300">Qté</th><th className="p-2 text-left text-sm font-semibold text-slate-600 dark:text-slate-300">P.U. (Ar)</th><th className="p-2 text-left text-sm font-semibold text-slate-600 dark:text-slate-300">Remise (%)</th><th className="p-2 text-left text-sm font-semibold text-slate-600 dark:text-slate-300">Total (Ar)</th></tr></thead><tbody>{proforma?.items.map(item => (<tr key={item.id} className="border-b border-slate-200 dark:border-slate-700"><td className="p-2"><Input value={item.designation} onChange={e => handleItemChange(item.id, 'designation', e.target.value)} /></td><td className="p-2"><Input type="number" value={item.quantite} onChange={e => handleItemChange(item.id, 'quantite', e.target.value)} className="w-20" /></td><td className="p-2"><Input type="number" step="0.01" value={item.prixUnitaire} onChange={e => handleItemChange(item.id, 'prixUnitaire', e.target.value)} className="w-28" /></td><td className="p-2"><Input type="number" value={item.remise || 0} onChange={e => handleItemChange(item.id, 'remise', e.target.value)} className="w-20" /></td><td className="p-2 text-slate-800 dark:text-slate-200 font-medium">{(item.quantite * item.prixUnitaire * (1 - (item.remise || 0)/100)).toLocaleString('fr-FR')}</td></tr>))}</tbody></table></div>
//             <Button variant="ghost" icon={PlusCircle} onClick={() => onAddItemToProforma(proforma)} className="text-sm">Ajouter un nouvel article</Button>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4"><div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Remarques</label><Textarea value={proforma?.remarques || ''} onChange={e => handleFieldChange('remarques', e.target.value)} /></div><div className="space-y-2 text-right bg-slate-50 dark:bg-slate-700/50 p-4 rounded-lg"><div className="flex justify-between items-center"><span className="text-slate-600 dark:text-slate-300">Total HT :</span><span className="font-bold text-slate-800 dark:text-slate-200">{proforma?.subTotal.toLocaleString('fr-FR') || '0'} Ar</span></div><div className="flex justify-between items-center"><span className="text-slate-600 dark:text-slate-300">TVA (20%) :</span><span className="font-bold text-slate-800 dark:text-slate-200">{(proforma?.totalPrice - proforma?.subTotal).toLocaleString('fr-FR') || '0'} Ar</span></div><hr className="my-2 border-slate-200 dark:border-slate-700"/><div className="flex justify-between items-center text-xl"><span className="font-bold text-slate-800 dark:text-slate-100">Total TTC :</span><span className="font-extrabold text-red-600">{proforma?.totalPrice.toLocaleString('fr-FR') || '0'} Ar</span></div></div></div>
//             <div className="flex justify-between items-center mt-8 pt-6 border-t border-slate-200 dark:border-slate-700"><Button variant="secondary" onClick={onBack}>Retourner au Point de Vente</Button><div className="flex gap-3"><Button variant="success" icon={Save} onClick={() => onSaveProforma(proforma)} disabled={!proforma}>Enregistrer</Button><Button variant="primary" icon={FileSignature} onClick={() => onInitiatePayment('facture', proforma)} disabled={!proforma || !proforma.id}>Facturer</Button><Button variant="primary" icon={Ticket} onClick={() => onInitiatePayment('ticket', proforma)} disabled={!proforma || !proforma.id}>Créer un Ticket</Button></div></div>
//         </div>
//     );
//     return (
//         <div className="animate-fade-in space-y-8">
//             <SectionTitle title="Factures Proforma" subtitle="Créez, sauvegardez et gérez vos propositions commerciales." />
//             {proforma ? proformaEditor : <div className="text-center p-12 bg-white dark:bg-slate-800 rounded-xl shadow-sm border dark:border-slate-700"><p className="text-slate-500 dark:text-slate-400">Convertissez une commande ou sélectionnez une proforma enregistrée pour commencer.</p></div>}
//             <div>
//                 <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4">Proformas Enregistrées</h3>
//                  <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border dark:border-slate-700 mb-6">
//                     <div className="relative">
//                         <Input type="text" placeholder="Rechercher par N° ou nom client..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10"/>
//                         <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20}/>
//                     </div>
//                 </div>
//                 <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden"><table className="w-full">
//                     <thead className="bg-slate-50 dark:bg-slate-700/50"><tr><th className="p-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-300 uppercase">N° Proforma</th><th className="p-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-300 uppercase">Date</th><th className="p-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-300 uppercase">Client</th><th className="p-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-300 uppercase">Total TTC</th><th className="p-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-300 uppercase">Statut</th><th className="p-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-300 uppercase">Actions</th></tr></thead>
//                     <tbody className="divide-y divide-slate-200 dark:divide-slate-700">{filteredProformas.length > 0 ? filteredProformas.map(p => {
//                         const isOverdue = new Date() - new Date(p.date) > 3 * 24 * 60 * 60 * 1000 && p.status !== 'Convertie';
//                         return (
//                         <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"><td className="p-4 text-sm text-slate-500 dark:text-slate-400 font-mono flex items-center gap-2">#{p.proformaNumber} {isOverdue && <Clock size={14} className="text-orange-500" title="Relance suggérée"/>}</td><td className="p-4 text-sm text-slate-500 dark:text-slate-400">{new Date(p.date).toLocaleDateString('fr-FR')}</td><td className="p-4 text-sm font-medium text-slate-900 dark:text-slate-200">{p.client.name}</td><td className="p-4 text-sm font-semibold text-slate-800 dark:text-slate-200">{p.totalPrice.toLocaleString('fr-FR')} Ar</td><td className="p-4"><span className={`px-2 py-1 text-xs font-medium rounded-full ${p.status === 'Convertie' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300' : 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300'}`}>{p.status}</span></td><td className="p-4 flex items-center gap-1"><Button variant="ghost" icon={Copy} onClick={() => onDuplicateDocument(p)} className="p-2 h-auto" title="Dupliquer" /><Button variant="ghost" icon={Edit} onClick={() => onModifyProforma(p)} className="p-2 h-auto" title="Modifier" /><Button variant="ghost" icon={Eye} onClick={() => onPrepareAndPrint(p)} className="p-2 h-auto" title="Visualiser" /></td></tr>
//                     )}) : (<tr><td colSpan="6" className="p-8 text-center text-slate-500 dark:text-slate-400">Aucune proforma enregistrée.</td></tr>)}</tbody>
//                 </table></div>
//             </div>
//         </div>
//     );
// };
// const ItemConfigurator = ({ userRole, onAddToCart }) => {
//     const product = productConfig.livre;
//     const [configuration, setConfiguration] = useState({});
//     const [personnel, setPersonnel] = useState([{ id: 1, salaireMensuel: 1000000 }]);
//     const [prixUnitaireForceHT, setPrixUnitaireForceHT] = useState(0);
//     const [prixTotalForceHT, setPrixTotalForceHT] = useState(0);
//     const [nombreFeuillesPapier, setNombreFeuillesPapier] = useState(0);
//     const [prixUnitairePapierManuel, setPrixUnitairePapierManuel] = useState(0);
//     const [autresConsommables, setAutresConsommables] = useState([]);
//     const [simParams, setSimParams] = useState({ heuresPrepa: 1, heuresImpression: 2, heuresFinition: 1, consommationKWH: 5, coutParKWH: 600, margeDechetsPct: 10, coutDeplacement: 30000, coutMaintenance: 0, margeCiblePct: businessConfig.margeCiblePct });

//     const resetConfiguration = () => {
//         const initialConfig = {};
//         product.steps.forEach(step => {
//             if(step.type === 'number') initialConfig[step.id] = 1000;
//             else if (step.options?.length > 0) initialConfig[step.id] = step.options[0].value;
//         });
//         setConfiguration(initialConfig);
//         setPrixUnitaireForceHT(0);
//         setPrixTotalForceHT(0);
//         setAutresConsommables([]);
//         setPersonnel([{ id: 1, salaireMensuel: 1000000 }]);
//     };
//     useEffect(resetConfiguration, [product]);
    
//     useEffect(() => { setNombreFeuillesPapier(configuration.quantite || 0); }, [configuration.quantite]);
//     useEffect(() => { const selectedPaper = rawMaterialStock.papier.find(p => p.id === configuration.papier); if (selectedPaper) setPrixUnitairePapierManuel(selectedPaper.unitPrice); }, [configuration.papier]);

//     const handleSelect = (stepId, value) => setConfiguration(prev => ({ ...prev, [stepId]: value }));
//     const handleQuantityChange = (value) => {
//         const newQuantite = parseInt(value, 10) || 0;
//         setConfiguration(prev => ({...prev, quantite: newQuantite }));
//         if (prixUnitaireForceHT > 0) {
//             setPrixTotalForceHT(prixUnitaireForceHT * newQuantite);
//         }
//     };
//     const handleSimParamChange = (param, value) => setSimParams(prev => ({...prev, [param]: parseFloat(value) || 0}));
//     const handleConsommableChange = (index, field, value) => { const updated = [...autresConsommables]; updated[index][field] = value; setAutresConsommables(updated); };
//     const addConsommable = () => setAutresConsommables([...autresConsommables, {id: Date.now(), nom: '', cout: 0}]);
//     const removeConsommable = (id) => setAutresConsommables(autresConsommables.filter(c => c.id !== id));
//     const handlePersonnelChange = (id, value) => setPersonnel(personnel.map(p => p.id === id ? {...p, salaireMensuel: parseFloat(value) || 0} : p));
//     const addPersonnel = () => setPersonnel([...personnel, {id: Date.now(), salaireMensuel: 1000000}]);
//     const removePersonnel = (id) => setPersonnel(personnel.filter(p => p.id !== id));

//     const financials = useMemo(() => {
//         const dureeTotaleProjetAvecMarge = (simParams.heuresPrepa + simParams.heuresImpression + simParams.heuresFinition) * 2;
//         const coutPapierBase = prixUnitairePapierManuel * nombreFeuillesPapier;
//         const coutPapierAvecDechet = coutPapierBase * (1 + (simParams.margeDechetsPct / 100));
//         const coutAutresConsommables = autresConsommables.reduce((acc, item) => acc + parseFloat(item.cout || 0), 0);
//         const totalCoutsMatieres = coutPapierAvecDechet + coutAutresConsommables;
//         const coutTotalMainOeuvre = personnel.reduce((acc, p) => acc + (p.salaireMensuel / businessConfig.heuresTravailMois) * dureeTotaleProjetAvecMarge, 0);
//         const coutElectricite = simParams.consommationKWH * simParams.coutParKWH;
//         const totalCoutsProduction = coutTotalMainOeuvre + coutElectricite;
//         const coutHoraireStructurel = (businessConfig.loyerMensuel / businessConfig.heuresTravailMois) + ((businessConfig.taxeAnnuelle / businessConfig.joursTravailAn) / 8) + (businessConfig.internetMensuel / businessConfig.heuresTravailMois);
//         const coutStructurelProjet = coutHoraireStructurel * dureeTotaleProjetAvecMarge;
//         const coutsExploitationDirects = simParams.coutDeplacement + simParams.coutMaintenance;
//         const totalChargesFrais = coutStructurelProjet + coutsExploitationDirects;
//         const coutDeRevient = totalCoutsMatieres + totalCoutsProduction + totalChargesFrais;
//         const prixDeVenteSuggere = coutDeRevient * (1 + (simParams.margeCiblePct / 100));
//         const prixDeVenteFinal = prixTotalForceHT > 0 ? prixTotalForceHT : prixDeVenteSuggere;
//         const beneficeNet = prixDeVenteFinal - coutDeRevient;
//         const margeNettePct = prixDeVenteFinal > 0 ? (beneficeNet / prixDeVenteFinal) * 100 : 0;
//         return { totalCoutsMatieres, totalCoutsProduction, totalChargesFrais, coutDeRevient, prixDeVenteSuggere, beneficeNet, margeNettePct, coutTotalMainOeuvre, prixDeVenteFinal };
//     }, [configuration, simParams, autresConsommables, prixTotalForceHT, nombreFeuillesPapier, prixUnitairePapierManuel, personnel]);
    
//     useEffect(() => { 
//         if(financials.prixDeVenteSuggere && prixTotalForceHT === 0) { 
//             const total = financials.prixDeVenteSuggere;
//             setPrixTotalForceHT(total);
//             setPrixUnitaireForceHT(total / (configuration.quantite || 1));
//         } 
//     }, [financials.prixDeVenteSuggere, configuration.quantite]);
    
//     const handlePrixUnitaireForceChange = (value) => {
//         const newPrixUnitaire = parseFloat(value) || 0;
//         setPrixUnitaireForceHT(newPrixUnitaire);
//         setPrixTotalForceHT(newPrixUnitaire * (configuration.quantite || 0));
//     };

//     const handlePrixTotalForceChange = (value) => {
//         const newPrixTotal = parseFloat(value) || 0;
//         setPrixTotalForceHT(newPrixTotal);
//         setPrixUnitaireForceHT(newPrixTotal / (configuration.quantite || 1));
//     };
    
//     const getDetailedDescription = () => {
//         return product.steps.filter(step => step.type !== 'number' && configuration[step.id]).map(step => { const option = step.options.find(o => o.value === configuration[step.id]); return option ? `${step.title}: ${option.label}` : null; }).filter(Boolean).join(' / ');
//     };

//     const handleAddToCart = () => {
//         const item = { id: Date.now(), designation: `Service d'Impression : ${product.title}`, detailedDescription: getDetailedDescription(), quantite: configuration.quantite, prixUnitaire: financials.prixDeVenteFinal / (configuration.quantite || 1), remise: 0, typeDeVente: 'Impression', configuration, financials, };
//         onAddToCart(item);
//         resetConfiguration();
//     };
    
//     const MargeIndicator = () => {
//         const isTargetMet = financials.margeNettePct >= simParams.margeCiblePct;
//         const color = isTargetMet ? 'text-emerald-600' : 'text-red-600';
//         const icon = isTargetMet ? <CheckCircle size={16} /> : <AlertTriangle size={16} />;
//         return <span className={`flex items-center gap-1 font-bold ${color}`}>{icon} {financials.margeNettePct?.toFixed(1) || '0.0'} %</span>;
//     };

//     return (
//         <Accordion title="Ajouter un article d'impression" icon={Wrench} defaultOpen={false}>
//             <div className="flex flex-col lg:flex-row gap-8">
//               <div className="w-full lg:w-1/2 space-y-4">
//               {product.steps.map(step => (
//                 <div key={step.id}>
//                   <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-2 flex items-center">
//                     {step.icon || <Layers/>} 
//                     <span className="ml-2">{step.title}</span>
//                   </h4>
//                   {step.type === 'number' ? <Input type="number" value={configuration.quantite || ''} onChange={e => handleQuantityChange(e.target.value)} placeholder="Ex: 1000" /> : 
//                   <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
//                     {step.options.map(option => (
//                       <button key={option.value} onClick={() => handleSelect(step.id, option.value)} className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${configuration[step.id] === option.value ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500 dark:hover:border-red-500'}`}>
//                         <span className="font-semibold block">{option.label}</span>
//                       </button>))}
//                   </div>}
//               </div>))}
//               </div>
//                 <div className="w-full lg:w-1/2 space-y-4">
//                     <div className="bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 p-4 rounded-lg">
//                         <h4 className="font-bold text-yellow-800 dark:text-yellow-300 mb-2">Évaluation en temps réel</h4>
//                         <div className="text-sm space-y-1 text-slate-700 dark:text-slate-300">
//                             <div className="flex justify-between"><span>Prix Unitaire HT:</span><span className="font-semibold">{prixUnitaireForceHT.toLocaleString('fr-FR')} Ar</span></div>
//                             <div className="flex justify-between font-bold"><span>Total Article HT:</span><span className="font-semibold">{prixTotalForceHT.toLocaleString('fr-FR')} Ar</span></div>
//                         </div>
//                     </div>
//                     {userRole === 'admin' && (
//                         <Accordion title="Calcul du Coût de Revient" icon={BarChartIcon} defaultOpen={true}>
//                             <Accordion title="Coûts Matières & Consommables" icon={Copy} defaultOpen={false}><div className="grid grid-cols-2 gap-2"><div><label className="text-xs text-slate-500 dark:text-slate-400">Nb. feuilles papier</label><Input type="number" value={nombreFeuillesPapier} onChange={e => setNombreFeuillesPapier(parseFloat(e.target.value) || 0)} className="p-1 text-sm"/></div><div><label className="text-xs text-slate-500 dark:text-slate-400">P.U. papier (Ar)</label><Input type="number" step="0.01" value={prixUnitairePapierManuel} onChange={e => setPrixUnitairePapierManuel(parseFloat(e.target.value) || 0)} className="p-1 text-sm"/></div></div><div><label className="text-xs text-slate-500 dark:text-slate-400">Marge de gâche / déchets (%)</label><Input type="number" value={simParams.margeDechetsPct} onChange={e => handleSimParamChange('margeDechetsPct', e.target.value)} className="p-1 text-sm"/></div><div><label className="text-xs text-slate-500 dark:text-slate-400">Autres consommables</label>{autresConsommables.map((c, i) => ( <div key={c.id} className="flex items-center gap-2 mt-1"><Input value={c.nom} onChange={e => handleConsommableChange(i, 'nom', e.target.value)} placeholder="Ex: Encre" className="p-1 text-xs"/><Input type="number" value={c.cout} onChange={e => handleConsommableChange(i, 'cout', e.target.value)} placeholder="Coût" className="p-1 text-xs w-20"/><button onClick={() => removeConsommable(c.id)} className="text-red-500"><Trash2 size={14}/></button></div> ))}<Button onClick={addConsommable} variant="ghost" className="text-xs p-1 mt-1"><Plus size={14}/> Ajouter</Button></div><div className="flex justify-between font-bold border-t dark:border-slate-600 pt-1 text-slate-800 dark:text-slate-200"><span className="text-slate-600 dark:text-slate-300">Total Matières:</span><span>{financials.totalCoutsMatieres?.toLocaleString('fr-FR') || '0'} Ar</span></div></Accordion>
//                             <Accordion title="Coûts de Production" icon={Factory} defaultOpen={false}><div className="grid grid-cols-3 gap-2"><div><label className="text-xs text-slate-500 dark:text-slate-400">Prépa (h)</label><Input type="number" value={simParams.heuresPrepa} onChange={e => handleSimParamChange('heuresPrepa', e.target.value)} className="p-1 text-sm"/></div><div><label className="text-xs text-slate-500 dark:text-slate-400">Impr. (h)</label><Input type="number" value={simParams.heuresImpression} onChange={e => handleSimParamChange('heuresImpression', e.target.value)} className="p-1 text-sm"/></div><div><label className="text-xs text-slate-500 dark:text-slate-400">Finition (h)</label><Input type="number" value={simParams.heuresFinition} onChange={e => handleSimParamChange('heuresFinition', e.target.value)} className="p-1 text-sm"/></div></div><div className="text-xs text-slate-500 dark:text-slate-400 p-2 bg-blue-50 dark:bg-blue-900/30 rounded">Temps total x2 (marge) : <strong>{((simParams.heuresPrepa + simParams.heuresImpression + simParams.heuresFinition) * 2)}h</strong></div><div><label className="text-xs text-slate-500 dark:text-slate-400 flex items-center mt-2"><Users2 size={12} className="mr-1"/>Personnel</label>{personnel.map((p, i) => (<div key={p.id} className="flex items-center gap-2 mt-1"><Input type="number" value={p.salaireMensuel} onChange={e => handlePersonnelChange(p.id, e.target.value)} placeholder="Salaire mensuel" className="p-1 text-xs"/><button onClick={() => removePersonnel(p.id)} className="text-red-500"><Trash2 size={14}/></button></div>))}<Button onClick={addPersonnel} variant="ghost" className="text-xs p-1 mt-1"><Plus size={14}/> Ajouter personne</Button></div><div className="grid grid-cols-2 gap-2 pt-2 border-t dark:border-slate-600 mt-2"><div><label className="text-xs text-slate-500 dark:text-slate-400">Électricité (kWh)</label><Input type="number" value={simParams.consommationKWH} onChange={e => handleSimParamChange('consommationKWH', e.target.value)} className="p-1 text-sm"/></div><div><label className="text-xs text-slate-500 dark:text-slate-400">Coût (Ar/kWh)</label><Input type="number" step="0.01" value={simParams.coutParKWH} onChange={e => handleSimParamChange('coutParKWH', e.target.value)} className="p-1 text-sm"/></div></div><div className="flex justify-between font-bold border-t dark:border-slate-600 pt-1 text-slate-800 dark:text-slate-200"><span className="text-slate-600 dark:text-slate-300">Total Production:</span><span>{financials.totalCoutsProduction?.toLocaleString('fr-FR') || '0'} Ar</span></div></Accordion>
//                             <Accordion title="Charges & Frais d'Exploitation" icon={Building} defaultOpen={false}><div className="flex justify-between text-slate-700 dark:text-slate-300"><span className="text-slate-500 dark:text-slate-400">Charges structurelles (prorata):</span><span className="font-semibold">{financials.totalChargesFrais?.toLocaleString('fr-FR') || '0'} Ar</span></div><div><label className="text-xs text-slate-500 dark:text-slate-400 flex items-center"><Car size={12} className="mr-1"/>Déplacement</label><Input type="number" value={simParams.coutDeplacement} onChange={e => handleSimParamChange('coutDeplacement', e.target.value)} className="p-1 text-sm"/></div><div><label className="text-xs text-slate-500 dark:text-slate-400 flex items-center"><Wrench size={12} className="mr-1"/>Maintenance</label><Input type="number" value={simParams.coutMaintenance} onChange={e => handleSimParamChange('coutMaintenance', e.target.value)} className="p-1 text-sm"/></div></Accordion>
//                             <div className="flex justify-between font-bold text-lg p-2 rounded-md bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-100"><span>Coût de Revient Total:</span><span>{financials.coutDeRevient?.toLocaleString('fr-FR') || '0'} Ar</span></div>
//                         </Accordion>
//                     )}
//                     <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
//                         <h3 className="font-bold text-lg text-blue-800 dark:text-blue-300 border-b border-blue-200 dark:border-blue-800 pb-2 mb-3 flex items-center"><DollarSign size={20} className="mr-2"/>Prix de Vente de l'Article</h3>
//                         <div className="space-y-3 text-sm">
//                             <div className="grid grid-cols-2 gap-2">
//                                 <div><label className="text-xs font-medium text-slate-700 dark:text-slate-300">P.U. Forcé (HT)</label><Input type="number" value={prixUnitaireForceHT} onChange={e => handlePrixUnitaireForceChange(e.target.value)} className="p-2 text-lg font-bold text-blue-600 dark:text-blue-400"/></div>
//                                 <div><label className="text-xs font-medium text-slate-700 dark:text-slate-300">Total Forcé (HT)</label><Input type="number" value={prixTotalForceHT} onChange={e => handlePrixTotalForceChange(e.target.value)} className="p-2 text-lg font-bold text-blue-600 dark:text-blue-400"/></div>
//                             </div>
//                             {userRole === 'admin' && (<><div className="flex justify-between items-center"><div><label className="text-xs text-slate-500 dark:text-slate-400">Marge Souhaitée (%)</label><Input type="number" value={simParams.margeCiblePct} onChange={e => handleSimParamChange('margeCiblePct', e.target.value)} className="p-1 text-sm w-20"/></div><div className="text-right"><div className="text-xs text-slate-500 dark:text-slate-400">Marge Nette Réelle</div><MargeIndicator /></div></div><div className={`flex justify-between font-bold p-2 rounded-md ${financials.beneficeNet > 0 ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300' : 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300'}`}><span>Bénéfice Net:</span><span>{financials.beneficeNet?.toLocaleString('fr-FR') || '0'} Ar</span></div></>)}
//                         </div>
//                     </div>
//                     <Button variant="success" icon={ShoppingBasket} onClick={handleAddToCart} disabled={prixTotalForceHT <= 0} className="w-full">Ajouter au Panier</Button>
//                 </div>
//             </div>
//         </Accordion>
//     );
// };
// const OtherServicesBrowser = ({ services, onAddToCart }) => {
//     return (
//         <Accordion title="Ajouter un autre service" icon={BrainCircuit} defaultOpen={true}>
//             {Object.entries(services).map(([category, serviceList]) => (
//                 <Accordion key={category} title={category} defaultOpen={false}>
//                     <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//                         {serviceList.map(service => (<button key={service.id} onClick={() => onAddToCart({ id: Date.now(), serviceId: service.id, designation: service.name, quantite: 1, prixUnitaire: service.price, remise: 0, typeDeVente: 'Service', detailedDescription: `Prestation de service - ${service.name}` })} className="p-4 border dark:border-slate-700 rounded-lg text-center hover:border-red-500 dark:hover:border-red-500 hover:shadow-sm transition-all bg-white dark:bg-slate-800"><span className="font-semibold block text-slate-800 dark:text-slate-200">{service.name}</span><span className="text-sm text-slate-500 dark:text-slate-400 block">{service.price.toLocaleString('fr-FR')} Ar {service.unit}</span></button>))}
//                     </div>
//                 </Accordion>
//             ))}
//         </Accordion>
//     );
// };
// const ManualItemEntry = ({ onAddToCart, title, icon, type, addNotification }) => {
//     const [item, setItem] = useState({ designation: '', detailedDescription: '', quantite: 1, prixUnitaire: 0 });
//     const handleChange = (field, value) => {
//         const val = (field === 'quantite' || field === 'prixUnitaire') ? parseFloat(value) || 0 : value;
//         setItem(prev => ({ ...prev, [field]: val }));
//     };
//     const handleAddToCart = () => {
//         if (!item.designation || item.prixUnitaire <= 0) { addNotification("Veuillez renseigner la désignation et le prix.", "error"); return; }
//         onAddToCart({ ...item, id: Date.now(), typeDeVente: type, designation: `${type}: ${item.designation}` });
//         addNotification(`${item.designation} ajouté au panier.`, "success");
//         setItem({ designation: '', detailedDescription: '', quantite: 1, prixUnitaire: 0 });
//     };
//     return (
//         <Accordion title={title} icon={icon} defaultOpen={false}>
//             <div className="space-y-3">
//                 <Input placeholder={`Nom du service (${type})`} value={item.designation} onChange={e => handleChange('designation', e.target.value)} />
//                 <Textarea placeholder="Description détaillée..." value={item.detailedDescription} onChange={e => handleChange('detailedDescription', e.target.value)} />
//                 <div className="grid grid-cols-2 gap-4">
//                     <Input type="number" placeholder="Quantité" value={item.quantite} onChange={e => handleChange('quantite', e.target.value)} />
//                     <Input type="number" placeholder="Prix Unitaire HT (Ar)" value={item.prixUnitaire} onChange={e => handleChange('prixUnitaire', e.target.value)} />
//                 </div>
//                 <Button variant="success" icon={ShoppingBasket} onClick={handleAddToCart} className="w-full">Ajouter au Panier</Button>
//             </div>
//         </Accordion>
//     );
// };
// const StockItemBrowser = ({ stockItems, onAddToCart }) => {
//     const [searchTerm, setSearchTerm] = useState('');
//     const filteredStockItems = stockItems.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    
//     const handleAddToCart = (stockItem) => {
//         const cartItem = { id: Date.now(), stockId: stockItem.id, designation: stockItem.name, quantite: 1, prixUnitaire: stockItem.price, remise: 0, typeDeVente: 'Vente Directe', detailedDescription: `Article en stock - ${stockItem.name}` };
//         onAddToCart(cartItem);
//     };

//     return (
//         <Accordion title="Ajouter un article en stock (Vente Directe)" icon={Tag} defaultOpen={true}>
//             <div className="relative mb-4"><Input type="text" placeholder="Rechercher un article en stock..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10"/><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20}/></div>
//             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-60 overflow-y-auto pr-2">{filteredStockItems.map(item => (<button key={item.id} onClick={() => handleAddToCart(item)} className="p-4 border dark:border-slate-700 rounded-lg text-center hover:border-red-500 dark:hover:border-red-500 hover:shadow-sm transition-all disabled:opacity-50 bg-white dark:bg-slate-800" disabled={item.stock <= 0}><span className="font-semibold block text-slate-800 dark:text-slate-200">{item.name}</span><span className="text-sm text-slate-500 dark:text-slate-400 block">{item.price.toLocaleString('fr-FR')} Ar</span><span className={`text-xs ${item.stock > item.seuilAlerte ? 'text-emerald-600' : 'text-red-600'}`}>Stock: {item.stock}</span></button>))}</div>
//         </Accordion>
//     );
// };
// const PointDeVentePage = ({ clients, stockItems, otherServices, onConvertToProforma, onInitiatePayment, userRole, initialCartData, onSaveAndReturnToProforma, addNotification, savedInvoices, savedProformas, promoCodes }) => {
//     const [selectedClientId, setSelectedClientId] = useState(initialCartData?.clientId || '');
//     const [orderSource, setOrderSource] = useState(initialCartData?.orderSource || 'Appel Direct');
//     const [cartItems, setCartItems] = useState(initialCartData?.items || []);
//     const [isClientLocked, setIsClientLocked] = useState(!!initialCartData);
//     const [promoCodeInput, setPromoCodeInput] = useState('');
//     const [appliedPromo, setAppliedPromo] = useState(null);
    
//     const handleAddToCart = (item) => {
//         setCartItems(prev => {
//             if (item.stockId) {
//                 const existingItem = prev.find(cartItem => cartItem.stockId === item.stockId);
//                 if (existingItem) { return prev.map(cartItem => cartItem.id === existingItem.id ? { ...cartItem, quantite: cartItem.quantite + 1 } : cartItem ); }
//             }
//             return [...prev, item];
//         });
//         addNotification(`${item.designation} ajouté au panier.`, 'success');
//     };
    
//     const handleUpdateCartItem = (itemId, field, value) => {
//         setCartItems(prev => prev.map(item => { 
//           if (item.id === itemId) { 
//             const val = (field === 'quantite' || field === 'prixUnitaire' || field === 'remise') ? parseFloat(value) || 0 : value; 
//             return { ...item, [field]: val }; 
//           } 
//           return item; }));
//     };

//     const handleRemoveFromCart = (itemId) => setCartItems(prev => prev.filter(item => item.id !== itemId));
    
//     const cartSubTotal = useMemo(() => cartItems.reduce((acc, item) => acc + (item.quantite * item.prixUnitaire * (1 - (item.remise || 0) / 100)), 0), [cartItems]);
    
//     const handleApplyPromoCode = () => {
//         const code = promoCodes.find(c => c.code.toUpperCase() === promoCodeInput.toUpperCase());
//         if (code) {
//             setAppliedPromo(code);
//             addNotification(`Code promo "${code.code}" appliqué !`, 'success');
//         } else {
//             addNotification("Code promo invalide.", "error");
//             setAppliedPromo(null);
//         }
//     };
    
//     const discountAmount = useMemo(() => {
//         if (!appliedPromo) return 0;
//         return cartSubTotal * (appliedPromo.percentage / 100);
//     }, [appliedPromo, cartSubTotal]);

//     const subTotalAfterDiscount = cartSubTotal - discountAmount;
//     const tvaRate = 20;
//     const tvaAmount = subTotalAfterDiscount * (tvaRate / 100);
//     const cartTotalTTC = subTotalAfterDiscount + tvaAmount;

//     const getCartData = () => ({ clientId: selectedClientId, orderSource, items: cartItems, subTotal: subTotalAfterDiscount, totalPrice: cartTotalTTC, tvaRate, delai: 7, remarques: "Commande multi-articles", typeDeVente: cartItems.some(i => i.typeDeVente === 'Impression') ? 'Mixte' : 'Vente Directe', requiresProduction: cartItems.some(item => item.typeDeVente === 'Impression'), });
//     const handleFinalizeAndReturn = () => { const updatedProformaData = { ...initialCartData, items: cartItems }; onSaveAndReturnToProforma(updatedProformaData); };
    
//     const commercialKpis = useMemo(() => {
//         const proformasEnAttente = savedProformas.filter(p => p.status !== 'Convertie').length;
//         const facturesARecouvrer = savedInvoices.filter(inv => inv.paymentStatus === 'En Recouvrement').length;
//         const totalResteAPayer = savedInvoices.reduce((acc, inv) => acc + inv.resteAPayer, 0);
//         return { proformasEnAttente, facturesARecouvrer, totalResteAPayer };
//     }, [savedProformas, savedInvoices]);

//     if (!isClientLocked) {
//         return (
//             <div className="animate-fade-in max-w-lg mx-auto mt-10"><div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 border border-slate-200 dark:border-slate-700 text-center"><UserPlus size={48} className="mx-auto text-red-500 mb-4" /><h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">Démarrer une nouvelle vente</h2><p className="text-slate-500 dark:text-slate-400 mb-6">Veuillez sélectionner un client et la source de la demande pour commencer.</p><div className="space-y-4 text-left"><div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Client</label><Select value={selectedClientId} onChange={e => setSelectedClientId(e.target.value)}><option value="">-- Sélectionner un client --</option>{clients.map(c => <option key={c.id} value={c.id}>{c.name} {c.soldeClient > 0 ? '💰' : ''}</option>)}</Select></div><div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Source de la commande</label><Select value={orderSource} onChange={e => setOrderSource(e.target.value)}><option>Facebook</option><option>WhatsApp</option><option>Appel Direct</option><option>Email</option><option>Visite</option><option>Salon</option></Select></div></div><Button onClick={() => setIsClientLocked(true)} disabled={!selectedClientId} className="w-full mt-6">Commencer la configuration</Button></div></div>
//         );
//     }

//     const selectedClient = clients.find(c => c.id === parseInt(selectedClientId));

//     return (
//         <div className="animate-fade-in space-y-8">
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 <StatCard title="Proformas en attente" value={commercialKpis.proformasEnAttente} icon={<FileClock size={24} className="text-white"/>} color="bg-yellow-500" trend={{direction: 'up', value: '+2'}}/>
//                 <StatCard title="Factures à recouvrer" value={commercialKpis.facturesARecouvrer} icon={<AlertTriangle size={24} className="text-white"/>} color="bg-orange-500" />
//                 <StatCard title="Total Reste à Payer" value={`${commercialKpis.totalResteAPayer.toLocaleString('fr-FR')} Ar`} icon={<Wallet size={24} className="text-white"/>} color="bg-red-500" />
//             </div>
//             <div className="flex flex-col lg:flex-row gap-8">
//                 <div className="w-full lg:w-2/3 space-y-6">
//                 <StockItemBrowser stockItems={stockItems} onAddToCart={handleAddToCart} />
//                 <OtherServicesBrowser services={otherServices} onAddToCart={handleAddToCart} />
//                 <ManualItemEntry onAddToCart={handleAddToCart} title="Ajouter un service de Livraison" icon={Truck} type="Livraison" addNotification={addNotification} />
//                 <ManualItemEntry onAddToCart={handleAddToCart} title="Ajouter un article manuel personnalisé" icon={PencilRuler} type="Manuel" addNotification={addNotification} />
//                 <ItemConfigurator userRole={userRole} onAddToCart={handleAddToCart} />
//                 </div>
//                 <div className="w-full lg:w-1/3">
//                     <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-slate-200 dark:border-slate-700 sticky top-8 space-y-4">
//                         <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 border-b border-slate-200 dark:border-slate-700 pb-3 mb-4 flex items-center"><ShoppingCart size={20} className="mr-2"/> Panier pour {selectedClient?.name}</h3>
//                         <div className="space-y-3 max-h-[30rem] overflow-y-auto pr-2 -mr-2">
//                             {cartItems.length > 0 ? cartItems.map((item, index) => (
//                                 <div key={`${item.id}-${index}`} className="text-sm p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg border border-slate-200 dark:border-slate-700">
//                                     <div className="flex justify-between items-start"><p className="font-semibold text-slate-800 dark:text-slate-200 flex-1 pr-2">{item.designation}</p><Button variant="ghost" className="p-1 h-auto text-red-500" onClick={() => handleRemoveFromCart(item.id)}><Trash2 size={16}/></Button></div>
//                                     <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{item.detailedDescription}</p>
//                                     <div className="flex items-center gap-2 mt-2">
//                                         <div className="flex-1"><label className="text-xs text-slate-500 dark:text-slate-400">Qté</label><Input type="number" value={item.quantite} onChange={e => handleUpdateCartItem(item.id, 'quantite', e.target.value)} className="p-1 text-sm w-full"/></div>
//                                         <div className="flex-1"><label className="text-xs text-slate-500 dark:text-slate-400">P.U. HT</label><Input type="number" step="0.01" value={item.prixUnitaire} onChange={e => handleUpdateCartItem(item.id, 'prixUnitaire', e.target.value)} className="p-1 text-sm w-full"/></div>
//                                         <div className="flex-1"><label className="text-xs text-slate-500 dark:text-slate-400">Remise %</label><Input type="number" value={item.remise} onChange={e => handleUpdateCartItem(item.id, 'remise', e.target.value)} className="p-1 text-sm w-full"/></div>
//                                     </div>
//                                 </div>
//                             )) : <p className="text-sm text-slate-500 dark:text-slate-400 text-center py-8">Le panier est vide.</p>}
//                         </div>
//                         {cartItems.length > 0 && (
//                             <>
//                              <div className="border-t border-slate-200 dark:border-slate-700 pt-4 mt-4 space-y-2">
//                                 <div className="flex justify-between text-slate-600 dark:text-slate-300"><span >Sous-total HT :</span><span className="font-bold text-slate-800 dark:text-slate-200">{cartSubTotal.toLocaleString('fr-FR')} Ar</span></div>
//                                 <div className="border-t border-slate-200 dark:border-slate-700 pt-2 mt-2">
//                                     <div className="flex gap-2">
//                                         <Input value={promoCodeInput} onChange={(e) => setPromoCodeInput(e.target.value)} placeholder="Code promo" className="p-2 text-sm"/>
//                                         <Button onClick={handleApplyPromoCode} className="px-3 py-2 text-sm">Appliquer</Button>
//                                     </div>
//                                     {appliedPromo && <p className="text-xs text-emerald-600 mt-1">Remise de {appliedPromo.percentage}% appliquée ! (-{discountAmount.toLocaleString('fr-FR')} Ar)</p>}
//                                 </div>
//                                 <div className="flex justify-between text-slate-600 dark:text-slate-300"><span >Total HT après remise :</span><span className="font-bold text-slate-800 dark:text-slate-200">{subTotalAfterDiscount.toLocaleString('fr-FR')} Ar</span></div>
//                                 <div className="flex justify-between text-slate-600 dark:text-slate-300"><span >TVA ({tvaRate}%) :</span><span className="font-bold text-slate-800 dark:text-slate-200">{tvaAmount.toLocaleString('fr-FR')} Ar</span></div>
//                                 <hr className="my-2 border-slate-200 dark:border-slate-700"/><div className="flex justify-between items-center text-xl"><span className="font-bold text-slate-800 dark:text-slate-100">Total TTC :</span><span className="font-extrabold text-red-600">{cartTotalTTC.toLocaleString('fr-FR')} Ar</span></div>
//                             </div>
//                             <div className="border-t border-slate-200 dark:border-slate-700 pt-4 mt-2">
//                                 <h4 className="font-semibold text-sm mb-2 text-slate-700 dark:text-slate-300">Produits Recommandés</h4>
//                                 <div className="flex gap-2">
//                                     <button onClick={() => handleAddToCart({ id: Date.now(), serviceId: 205, designation: 'Carte de Visite (Simple)', quantite: 1, prixUnitaire: 30000, remise: 0, typeDeVente: 'Service' })} className="text-xs p-2 border dark:border-slate-600 rounded-lg flex-1 text-center hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300">Cartes de Visite</button>
//                                     <button onClick={() => handleAddToCart({ id: Date.now(), serviceId: 213, designation: 'Roll-Up/Banner (Simple)', quantite: 1, prixUnitaire: 80000, remise: 0, typeDeVente: 'Service' })} className="text-xs p-2 border dark:border-slate-600 rounded-lg flex-1 text-center hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300">Roll-Up</button>
//                                 </div>
//                             </div>
//                             </>
//                         )}
//                         <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-700">
//                             {initialCartData ? ( <Button variant="success" icon={Save} onClick={handleFinalizeAndReturn} disabled={cartItems.length === 0} className="w-full">Mettre à jour la Proforma</Button> ) : (
//                                 <>
//                                     <Button variant="secondary" icon={FileClock} onClick={() => onConvertToProforma(getCartData())} disabled={cartItems.length === 0} className="w-full">Créer la Proforma</Button>
//                                     <div className="flex gap-2"><Button variant="primary" icon={FileSignature} onClick={() => onInitiatePayment('facture', getCartData())} disabled={cartItems.length === 0} className="w-full">Facturer</Button><Button variant="primary" icon={Ticket} onClick={() => onInitiatePayment('ticket', getCartData())} disabled={cartItems.length === 0} className="w-full">Ticket</Button></div>
//                                 </>
//                             )}
//                     </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };
// const FacturesPage = ({ invoices, onFinalizeInvoice, setActiveSideMenu, onPrepareAndPrint, onUpdateInvoiceStatus, onDuplicateDocument }) => {
//     const [menuOpen, setMenuOpen] = useState(null);
//     const [filters, setFilters] = useState({ status: 'all', startDate: '', endDate: '' });

//     const handleFilterChange = (field, value) => {
//         setFilters(prev => ({ ...prev, [field]: value }));
//     };

//     const filteredInvoices = useMemo(() => {
//         return invoices.filter(inv => {
//             const statusMatch = filters.status === 'all' || inv.paymentStatus === filters.status;
//             const startDateMatch = !filters.startDate || new Date(inv.date) >= new Date(filters.startDate);
//             const endDateMatch = !filters.endDate || new Date(inv.date) <= new Date(filters.endDate);
//             return statusMatch && startDateMatch && endDateMatch;
//         });
//     }, [invoices, filters]);

//     const getStatusInfo = (status) => {
//         switch(status) {
//             case 'Payée': return { text: 'Payée', style: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300' };
//             case 'Partielle': return { text: 'Partielle', style: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300' };
//             case 'En Recouvrement': return { text: 'En Recouvrement', style: 'bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300' };
//             default: return { text: 'Non Payée', style: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300' };
//         }
//     };

//     return (
//         <div className="animate-fade-in">
//             <div className="flex justify-between items-start mb-6"><SectionTitle title="Factures & Tickets" subtitle="Archive de toutes les factures et tickets finalisés." /><Button variant="primary" icon={PlusCircle} onClick={() => setActiveSideMenu('point-de-vente')}>Nouvelle Vente</Button></div>
            
//             <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border dark:border-slate-700 mb-6">
//                 <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
//                     <div>
//                         <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Statut</label>
//                         <Select value={filters.status} onChange={e => handleFilterChange('status', e.target.value)}>
//                             <option value="all">Tous</option>
//                             <option value="Payée">Payée</option>
//                             <option value="Partielle">Partielle</option>
//                             <option value="Non Payée">Non Payée</option>
//                             <option value="En Recouvrement">En Recouvrement</option>
//                         </Select>
//                     </div>
//                      <div>
//                         <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Date de début</label>
//                         <Input type="date" value={filters.startDate} onChange={e => handleFilterChange('startDate', e.target.value)} />
//                     </div>
//                      <div>
//                         <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Date de fin</label>
//                         <Input type="date" value={filters.endDate} onChange={e => handleFilterChange('endDate', e.target.value)} />
//                     </div>
//                     <Button variant="ghost" onClick={() => setFilters({ status: 'all', startDate: '', endDate: '' })}><RefreshCw size={16} className="mr-2"/>Réinitialiser</Button>
//                 </div>
//             </div>

//             <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden"><table className="w-full">
//                 <thead className="bg-slate-50 dark:bg-slate-700/50"><tr>
//                 <th className="p-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-300 uppercase">N° Doc</th>
//                 <th className="p-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-300 uppercase">Type</th>
//                 <th className="p-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-300 uppercase">Date</th>
//                 <th className="p-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-300 uppercase">Client</th>
//                 <th className="p-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-300 uppercase">Total TTC</th>
//                 <th className="p-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-300 uppercase">Reste</th>
//                 <th className="p-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-300 uppercase">Statut</th>
//                 <th className="p-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-300 uppercase">Action</th>
//                 </tr>
//                 </thead>
//                 <tbody className="divide-y divide-slate-200 dark:divide-slate-700">{filteredInvoices.length > 0 ? filteredInvoices.map(inv => {
//                     const statusInfo = getStatusInfo(inv.paymentStatus);
//                     const isOverdue = new Date() - new Date(inv.date) > 15 * 24 * 60 * 60 * 1000 && inv.resteAPayer > 0;
//                     return (
//                     <tr key={inv.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
//                         <td className="p-4 text-sm text-slate-500 dark:text-slate-400 font-mono flex items-center gap-2">#{inv.docNumber} {isOverdue && <Clock size={14} className="text-orange-500" title="Paiement en retard"/>}</td>
//                         <td className="p-4 text-sm font-medium capitalize text-slate-700 dark:text-slate-300">{inv.type}</td><td className="p-4 text-sm text-slate-500 dark:text-slate-400">{new Date(inv.date).toLocaleDateString('fr-FR')}</td>
//                         <td className="p-4 text-sm font-medium text-slate-900 dark:text-slate-200">{inv.client.name}</td>
//                         <td className="p-4 text-sm font-semibold text-slate-800 dark:text-slate-200">{inv.totalPrice.toLocaleString('fr-FR')} Ar</td>
//                         <td className="p-4 text-sm font-bold text-red-600">{inv.resteAPayer.toLocaleString('fr-FR')} Ar</td>
//                         <td className="p-4">
//                             <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusInfo.style}`}>{statusInfo.text}</span>
//                         </td>
//                         <td className="p-4 flex items-center gap-1 relative">{inv.resteAPayer > 0 && ( 
//                             <Button variant="success" onClick={() => onFinalizeInvoice(inv)} className="py-1 px-2 text-xs">Finaliser</Button> )}
//                             <Button variant="ghost" icon={Copy} onClick={() => onDuplicateDocument(inv)} className="p-2 h-auto" title="Dupliquer" /><Button variant="ghost" icon={Eye} onClick={() => onPrepareAndPrint(inv)} className="p-2 h-auto" title="Visualiser" /><Button variant="ghost" icon={MoreVertical} onClick={() => setMenuOpen(menuOpen === inv.id ? null : inv.id)} className="p-2 h-auto" />
//                     {menuOpen === inv.id && (
//                         <div className="absolute right-0 top-10 mt-2 w-48 bg-white dark:bg-slate-900 rounded-md shadow-lg z-10 border dark:border-slate-700">
//                             <button onClick={() => { onUpdateInvoiceStatus(inv.id, 'En Recouvrement'); setMenuOpen(null); }} className="block w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700">Marquer "En Recouvrement"</button>
//                             <button onClick={() => { onUpdateInvoiceStatus(inv.id, 'Partielle'); setMenuOpen(null); }} className="block w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700">Marquer "Partielle"</button>
//                         </div>
//                     )}
//                     </td></tr>
//                 )}) : (<tr><td colSpan="8" className="p-8 text-center text-slate-500 dark:text-slate-400">Aucune facture ne correspond à vos critères.</td></tr>)}</tbody>
//             </table></div>
//         </div>
//     );
// };
// const Countdown = ({ deadline }) => {
//     const calculateTimeLeft = () => { const difference = +new Date(deadline) - +new Date(); let timeLeft = {}; if (difference > 0) { timeLeft = { j: Math.floor(difference / (1000 * 60 * 60 * 24)), h: Math.floor((difference / (1000 * 60 * 60)) % 24), m: Math.floor((difference / 1000 / 60) % 60), }; } return timeLeft; };
//     const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
//     useEffect(() => { const timer = setTimeout(() => setTimeLeft(calculateTimeLeft()), 1000); return () => clearTimeout(timer); });
//     const timerComponents = Object.entries(timeLeft).map(([interval, value]) => ( <span key={interval}>{`${value}${interval}`} </span> ));
//     return <span>{timerComponents.length ? timerComponents : 'En retard'}</span>;
// };
// const CommandesPage = ({ orders, onUpdateStatus, onOpenDetails, onSendSurvey }) => {
//     const [searchTerm, setSearchTerm] = useState('');
//     const getPaymentStatus = (order) => { if (order.resteAPayer <= 0) return <span className="px-2 py-1 text-xs font-medium rounded-full bg-emerald-100 text-emerald-800">Payée</span>; if (order.acompte > 0) return <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">Partielle</span>; return <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">Non Payée</span>; };
//     const calculateProgress = (steps) => {
//         if (!steps || steps.length === 0) return 0;
//         const completedSteps = steps.filter(s => s.completed).length;
//         return (completedSteps / steps.length) * 100;
//     };
    
//     const filteredOrders = useMemo(() => {
//         return orders.filter(order => 
//             order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             order.client.name.toLowerCase().includes(searchTerm.toLowerCase())
//         );
//     }, [orders, searchTerm]);

//     return (
//         <div className="animate-fade-in">
//             <SectionTitle title="Tableau de Bord de Production" subtitle="Suivez l'état d'avancement de chaque commande en temps réel." />
//              <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border dark:border-slate-700 mb-6">
//                 <div className="relative">
//                     <Input type="text" placeholder="Rechercher par N° de commande ou nom client..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10"/>
//                     <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20}/>
//                 </div>
//             </div>
//             <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden"><table className="w-full">
//                 <thead className="bg-slate-50 dark:bg-slate-700/50"><tr><th className="p-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-300 uppercase">Commande</th><th className="p-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-300 uppercase">Client</th><th className="p-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-300 uppercase">Désignation</th><th className="p-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-300 uppercase">Deadline</th><th className="p-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-300 uppercase">Progression</th><th className="p-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-300 uppercase">Statut Prod.</th><th className="p-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-300 uppercase">Satisfaction</th><th className="p-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-300 uppercase">Action</th></tr></thead>
//                 <tbody className="divide-y divide-slate-200 dark:divide-slate-700">{filteredOrders.length > 0 ? filteredOrders.map(order => {
//                     const progress = calculateProgress(order.productionSteps);
//                     return (
//                     <tr key={order.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"><td className="p-4 text-sm text-slate-500 dark:text-slate-400 font-mono">#{order.orderNumber}</td><td className="p-4 text-sm font-medium text-slate-900 dark:text-slate-200">{order.client.name}</td><td className="p-4 text-sm text-slate-600 dark:text-slate-300">{order.items[0].designation} (x{order.items[0].quantite})</td><td className="p-4 text-sm text-slate-500 dark:text-slate-400"><Countdown deadline={order.deadline} /></td><td className="p-4 w-40"><div className="flex items-center gap-2"><ProgressBar value={progress} /><span className="text-xs font-semibold text-slate-600 dark:text-slate-400">{Math.round(progress)}%</span></div></td><td className="p-4"><Select value={order.status} onChange={(e) => onUpdateStatus(order.id, e.target.value)} className={`p-1 text-xs border-none rounded bg-transparent`}><option value="En attente">En attente</option><option value="En production">En production</option><option value="Prête à livrer">Prête à livrer</option><option value="Expédié">Expédié</option></Select></td><td className="p-4 text-sm text-slate-700 dark:text-slate-300">{order.status === 'Expédié' && order.satisfactionScore === undefined ? (<Button variant="ghost" className="p-1 h-auto text-xs" onClick={() => onSendSurvey(order.id)}>Envoyer enquête</Button>) : order.satisfactionScore ? `${order.satisfactionScore}/10` : 'N/A'}</td><td className="p-4"><Button variant="ghost" icon={Eye} onClick={() => onOpenDetails(order)} className="p-2 h-auto" title="Détails de production" /></td></tr>
//                 )}) : (<tr><td colSpan="9" className="p-8 text-center text-slate-500 dark:text-slate-400">Aucune commande ne correspond à vos critères.</td></tr>)}</tbody>
//             </table></div>
//         </div>
//     );
// };
// const AutomatisationPage = ({ promoCodes, onAddPromoCode, onDeletePromoCode }) => {
//     const [newCode, setNewCode] = useState('');
//     const [newPercentage, setNewPercentage] = useState(0);

//     const handleAdd = () => {
//         if (newCode.trim() && newPercentage > 0) {
//             onAddPromoCode({ code: newCode.toUpperCase(), percentage: newPercentage });
//             setNewCode('');
//             setNewPercentage(0);
//         }
//     };

//     return (
//         <div className="animate-fade-in space-y-8">
//             <SectionTitle title="Moteur d'Automatisation" subtitle="Créez des workflows intelligents et gérez vos offres commerciales." />
//             <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border dark:border-slate-700">
//                 <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-4 pb-4 border-b dark:border-slate-700">Gestion des Codes Promotionnels</h3>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
//                     <Input value={newCode} onChange={(e) => setNewCode(e.target.value)} placeholder="Nouveau code (ex: PROMO25)"/>
//                     <Input type="number" value={newPercentage} onChange={(e) => setNewPercentage(parseInt(e.target.value) || 0)} placeholder="Pourcentage (ex: 15)"/>
//                     <Button onClick={handleAdd} icon={PlusCircle}>Ajouter le code</Button>
//                 </div>
//                 <div className="space-y-2">
//                     {promoCodes.map(code => (
//                         <div key={code.code} className="p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg border dark:border-slate-700 flex items-center justify-between">
//                             <div className="flex items-center gap-4">
//                                 <Tag className="text-red-500"/>
//                                 <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">{code.code}</span>
//                                 <span className="text-sm text-slate-600 dark:text-slate-300">Offre une remise de {code.percentage}%</span>
//                             </div>
//                             <Button variant="ghost" icon={Trash2} onClick={() => onDeletePromoCode(code.code)} className="text-red-500"/>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//             <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border dark:border-slate-700">
//                 <div className="flex items-center justify-between mb-4 pb-4 border-b dark:border-slate-700">
//                     <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">Règles d'Automatisation (Workflow)</h3>
//                     <Button variant="primary" icon={PlusCircle}>Nouvelle Règle</Button>
//                 </div>
//                 <div className="space-y-4">
//                     <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg border dark:border-slate-700 flex items-center justify-between">
//                         <div className="flex items-center">
//                             <Zap size={20} className="text-yellow-500 mr-4"/>
//                             <div className="text-slate-700 dark:text-slate-300">
//                                 <p className="font-semibold">Si <span className="text-blue-600 dark:text-blue-400">Facture a +30 jours de retard</span> ET <span className="text-blue-600 dark:text-blue-400">Client est VIP</span></p>
//                                 <p className="text-sm">Alors <span className="text-emerald-600 dark:text-emerald-400">Envoyer email de relance "VIP"</span> ET <span className="text-emerald-600 dark:text-emerald-400">Notifier le Directeur</span></p>
//                             </div>
//                         </div>
//                         <span className="px-2 py-1 text-xs font-medium rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300">Active</span>
//                     </div>
//                      <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg border dark:border-slate-700 flex items-center justify-between">
//                         <div className="flex items-center">
//                             <Zap size={20} className="text-yellow-500 mr-4"/>
//                             <div className="text-slate-700 dark:text-slate-300">
//                                 <p className="font-semibold">Si <span className="text-blue-600 dark:text-blue-400">Nouveau client est créé</span></p>
//                                 <p className="text-sm">Alors <span className="text-emerald-600 dark:text-emerald-400">Envoyer email de bienvenue</span> ET <span className="text-emerald-600 dark:text-emerald-400">Assigner une tâche "Appel de courtoisie"</span></p>
//                             </div>
//                         </div>
//                         <span className="px-2 py-1 text-xs font-medium rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300">Active</span>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// };

// const ThemeSwitcher = ({ theme, setTheme }) => {
//     const toggleTheme = () => {
//         const newTheme = theme === 'light' ? 'dark' : 'light';
//         setTheme(newTheme);
//     };

//     return (
//         <button onClick={toggleTheme} className="p-2 rounded-full text-slate-400 hover:bg-slate-700 hover:text-white transition-colors">
//             {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
//         </button>
//     );
// };

// // --- Main App Component ---
// export default function App() {
//     const [theme, setTheme] = useState('light');
//     const [activeSideMenu, setActiveSideMenu] = useState('point-de-vente');
//     const [data, setData] = useState(initialData);
//     const [proformaDataForView, setProformaDataForView] = useState(null);
//     const [cartDataForProforma, setCartDataForProforma] = useState(null);
//     const [savedProformas, setSavedProformas] = useState([
//         { id: 99, proformaNumber: 'PRO-DEMO01', date: new Date(new Date().setDate(new Date().getDate() - 4)).toISOString(), client: initialData.clients[0], status: 'Sauvegardée', items: [{id: 1, designation: 'Flyers A5', quantite: 1000, prixUnitaire: 125, remise: 0}], totalPrice: 150000, subTotal: 125000, acompte: 0, resteAPayer: 150000, type: 'proforma' }
//     ]);
//     const [savedInvoices, setSavedInvoices] = useState([
//         { id: 98, docNumber: 'FAC-DEMO02', type: 'facture', client: initialData.clients[1], date: new Date(new Date().setDate(new Date().getDate() - 20)).toISOString(), items: [{id: 1, designation: 'Dépliants'}], totalPrice: 450000, acompte: 100000, resteAPayer: 350000, paymentStatus: 'Partielle' }
//     ]);
//     const [savedOrders, setSavedOrders] = useState([]);
//     const [paymentModalData, setPaymentModalData] = useState(null);
//     const [finalizeModalData, setFinalizeModalData] = useState(null);
//     const [printableDoc, setPrintableDoc] = useState(null);
//     const [orderDetailsModalData, setOrderDetailsModalData] = useState(null);
//     const [clientDetailsModalData, setClientDetailsModalData] = useState(null);
//     const [addCreditModalData, setAddCreditModalData] = useState(null);
//     const [userRole, setUserRole] = useState('admin');
//     const [notifications, setNotifications] = useState([]);

//     useEffect(() => {
//         document.documentElement.className = theme;
//     }, [theme]);

//     const addNotification = (message, type = 'success') => { setNotifications(prev => [...prev, { id: Date.now(), message, type }]); };
//     const dismissNotification = (id) => { setNotifications(prev => prev.filter(n => n.id !== id)); };

//     const handleConvertToProforma = (cartData) => { if (!cartData.clientId) { addNotification("Erreur : Client non sélectionné.", "error"); return; } const client = data.clients.find(c => c.id === parseInt(cartData.clientId)); const newProforma = { ...cartData, id: Date.now(), proformaNumber: `PRO-${Date.now().toString().slice(-6)}`, date: new Date().toISOString(), client, status: 'Brouillon', type: 'proforma' }; setProformaDataForView(newProforma); setActiveSideMenu('factures_proforma'); };
//     const handleSaveProforma = (proformaToSave) => { if (!proformaToSave) return; const existingIndex = savedProformas.findIndex(p => p.id === proformaToSave.id); if (existingIndex > -1) { const updatedProformas = [...savedProformas]; updatedProformas[existingIndex] = proformaToSave; setSavedProformas(updatedProformas); addNotification(`Proforma #${proformaToSave.proformaNumber} mise à jour.`, "info"); } else { const client = data.clients.find(c => c.id === parseInt(proformaToSave.clientId)); const newProforma = { ...proformaToSave, id: Date.now(), client, status: 'Sauvegardée' }; setSavedProformas(prev => [newProforma, ...prev]); addNotification(`Proforma #${newProforma.proformaNumber} enregistrée pour ${client.name}.`, "success"); } setProformaDataForView(null); };
//     const handleModifyProforma = (proformaToModify) => { setProformaDataForView(proformaToModify); setActiveSideMenu('factures_proforma'); window.scrollTo(0, 0); };
//     const handleAddItemToProforma = (proformaData) => { setCartDataForProforma(proformaData); setActiveSideMenu('point-de-vente'); };
//     const handleSaveAndReturnToProforma = (updatedProformaData) => { const subTotal = updatedProformaData.items.reduce((acc, item) => acc + (item.quantite * item.prixUnitaire * (1 - (item.remise || 0) / 100)), 0); const tvaRate = updatedProformaData.tvaRate || 20; const totalPrice = subTotal * (1 + tvaRate / 100); const finalData = { ...updatedProformaData, subTotal, totalPrice }; setProformaDataForView(finalData); setCartDataForProforma(null); setActiveSideMenu('factures_proforma'); };
//     const handleInitiatePayment = (type, sourceDocument) => { if (!sourceDocument.clientId) { addNotification("Veuillez sélectionner un client.", "error"); return; } const client = data.clients.find(c => c.id === parseInt(sourceDocument.clientId)); setPaymentModalData({ type, sourceDocument, client }); };
//     const handleConfirmPayment = (paymentInfo) => {
//         const { type, sourceDocument } = paymentModalData;
//         const client = data.clients.find(c => c.id === parseInt(sourceDocument.clientId));
//         const docNumber = `${type.slice(0,3).toUpperCase()}-${Date.now().toString().slice(-6)}`;
//         const acompteTotal = paymentInfo.acompte + paymentInfo.soldeUtilise;
        
//         let paymentStatus = 'Non Payée';
//         if (paymentInfo.resteAPayer <= 0) paymentStatus = 'Payée';
//         else if (acompteTotal > 0) paymentStatus = 'Partielle';
        
//         const newInvoice = { id: Date.now(), docNumber, type, client, date: new Date().toISOString(), items: sourceDocument.items, totalPrice: sourceDocument.totalPrice, subTotal: sourceDocument.subTotal, acompte: acompteTotal, resteAPayer: paymentInfo.resteAPayer, typeDeVente: sourceDocument.typeDeVente, requiresProduction: sourceDocument.requiresProduction, paymentStatus };
//         setSavedInvoices(prev => [newInvoice, ...prev]);
        
//         setData(prevData => ({ ...prevData, clients: prevData.clients.map(c => c.id === client.id ? { ...c, nombreCommandes: c.nombreCommandes + 1, montantTotalAchats: c.montantTotalAchats + newInvoice.totalPrice, soldeClient: c.soldeClient - paymentInfo.soldeUtilise, lastOrderDate: new Date().toISOString() } : c ) }));

//         if (sourceDocument.proformaNumber) {
//             setSavedProformas(prev => prev.map(p => p.proformaNumber === sourceDocument.proformaNumber ? { ...p, status: 'Convertie' } : p));
//         }

//         if (newInvoice.requiresProduction) { 
//             const deadline = new Date(); 
//             deadline.setDate(deadline.getDate() + (sourceDocument.delai || 7)); 
//             const newOrder = { id: newInvoice.id, orderNumber: docNumber, client, clientId: client.id, date: new Date().toISOString(), items: sourceDocument.items, status: 'En attente', delai: sourceDocument.delai, acompte: acompteTotal, resteAPayer: paymentInfo.resteAPayer, deadline: deadline.toISOString(), dechets: [], responsableDechets: '', causeDechets: '', satisfactionClient: '', retours: 0, productionSteps: defaultProductionSteps.map(s => ({...s})), totalPrice: newInvoice.totalPrice, subTotal: newInvoice.subTotal }; 
//             setSavedOrders(prev => [newOrder, ...prev]); 
//             addNotification(`Facture #${newInvoice.docNumber} créée. La commande est en suivi de production.`, "success"); 
//         } else { 
//             addNotification(`${type.charAt(0).toUpperCase() + type.slice(1)} #${newInvoice.docNumber} créé.`, "success"); 
//         }
        
//         const newStock = [...data.stockItems]; sourceDocument.items.forEach(cartItem => { if(cartItem.typeDeVente === 'Vente Directe') { const stockIndex = newStock.findIndex(stockItem => stockItem.id === cartItem.stockId); if(stockIndex > -1) { newStock[stockIndex].stock -= cartItem.quantite; } } }); setData(prev => ({...prev, stockItems: newStock}));
//         setPaymentModalData(null);
//     };
//     const handleFinalizeInvoice = (invoiceId) => { setSavedInvoices(prevInvoices => prevInvoices.map(inv => inv.id === invoiceId ? { ...inv, acompte: inv.totalPrice, resteAPayer: 0, paymentStatus: 'Payée' } : inv)); setSavedOrders(prevOrders => prevOrders.map(order => order.id === invoiceId ? { ...order, acompte: order.totalPrice, resteAPayer: 0 } : order)); const finalizedInvoice = savedInvoices.find(inv => inv.id === invoiceId); addNotification(`Facture #${finalizedInvoice.docNumber} clôturée.`, "success"); setFinalizeModalData(null); };
//     const handleUpdateOrderStatus = (orderId, newStatus) => { setSavedOrders(prevOrders => prevOrders.map(order => order.id === orderId ? { ...order, status: newStatus } : order )); };
//     const handleUpdateInvoiceStatus = (invoiceId, newStatus) => { setSavedInvoices(prevInvoices => prevInvoices.map(inv => inv.id === invoiceId ? { ...inv, paymentStatus: newStatus } : inv)); addNotification(`Statut de la facture mis à jour.`, "info"); };
//     const handlePrepareAndPrintDocument = (doc) => {
//         if (!doc) return;
//         const subTotal = doc.subTotal || (doc.totalPrice / 1.2);
//         const acompte = doc.acompte || 0;
//         const totalPrice = doc.totalPrice || 0;

//         const printable = {
//             type: doc.type === 'proforma' ? 'Facture Proforma' : (doc.type && typeof doc.type === 'string' ? doc.type.charAt(0).toUpperCase() + doc.type.slice(1) : 'Document'),
//             docNumber: doc.proformaNumber || doc.docNumber,
//             date: doc.date,
//             client: doc.client,
//             items: doc.items || [],
//             subTotal: subTotal,
//             totalPrice: totalPrice,
//             acompte: acompte,
//             resteAPayer: doc.resteAPayer !== undefined ? doc.resteAPayer : totalPrice - acompte,
//         };
//         setPrintableDoc(printable);
//     };
//     const handleFinalizeOrder = (orderId, finalizationData) => {
//         const order = savedOrders.find(o => o.id === orderId);
//         setSavedOrders(prevOrders => prevOrders.map(o => o.id === orderId ? { ...o, ...finalizationData } : o));
        
//         setData(prevData => ({ ...prevData, clients: prevData.clients.map(c => {
//             if (c.id === order.clientId) {
//                 const newHistory = [...(c.feedbackHistory || [])];
//                 if (finalizationData.satisfactionClient) {
//                     newHistory.push({ orderNumber: order.orderNumber, feedback: finalizationData.satisfactionClient, date: new Date().toISOString(), score: finalizationData.satisfactionScore });
//                 }
//                 return { ...c, retours: (c.retours || 0) + finalizationData.retours, feedbackHistory: newHistory };
//             }
//             return c;
//         })}));

//         addNotification(`Les détails de finalisation pour la commande #${order.orderNumber} ont été enregistrés.`, "success");
//     };
//     const handleToggleProductionStep = (orderId, stepId, field, value) => {
//         setSavedOrders(prevOrders => prevOrders.map(order => {
//             if (order.id === orderId) {
//                 const newSteps = order.productionSteps.map(step => step.id === stepId ? { ...step, [field]: value !== undefined ? value : !step[field] } : step);
//                 const allStepsCompleted = newSteps.every(s => s.completed);
//                 const currentStatus = order.status;
//                 let newStatus = currentStatus;
//                 if (allStepsCompleted && currentStatus !== 'Expédié') {
//                     newStatus = 'Prête à livrer';
//                 } else if (!allStepsCompleted && currentStatus === 'Prête à livrer') {
//                     newStatus = 'En production';
//                 }
//                 return { ...order, productionSteps: newSteps, status: newStatus };
//             }
//             return order;
//         }));
//     };
//     const handleAddCredit = (clientId, amount) => {
//         setData(prevData => ({ ...prevData, clients: prevData.clients.map(c => c.id === clientId ? { ...c, soldeClient: c.soldeClient + amount } : c)}));
//         addNotification(`Le compte a été crédité de ${amount.toLocaleString('fr-FR')} Ar.`, "success");
//         setAddCreditModalData(null);
//         setClientDetailsModalData(prev => ({...prev, soldeClient: prev.soldeClient + amount}));
//     };
//     const handleSaveClientNote = (clientId, noteContent) => {
//         setData(prevData => ({...prevData, clients: prevData.clients.map(c => {
//             if (c.id === clientId) {
//                 const newNote = { id: Date.now(), date: new Date().toISOString(), content: noteContent };
//                 const updatedNotes = [...(c.notes || []), newNote];
//                 return { ...c, notes: updatedNotes };
//             }
//             return c;
//         })}));
//         addNotification("Note ajoutée au client.", "success");
//     };
//     const handleDuplicateDocument = (doc) => {
//         const client = data.clients.find(c => c.id === doc.client.id);
//         if (!client) {
//             addNotification("Client non trouvé pour la duplication.", "error");
//             return;
//         }
//         const cartData = {
//             clientId: client.id,
//             orderSource: 'Duplication',
//             items: doc.items.map((item, index) => ({...item, id: `${Date.now()}-${index}`})),
//         };
//         setCartDataForProforma(cartData);
//         setActiveSideMenu('point-de-vente');
//         addNotification(`Document #${doc.docNumber || doc.proformaNumber} dupliqué dans le panier.`, "info");
//     };
//     const handleSendSurvey = (orderId) => {
//         addNotification(`Enquête de satisfaction envoyée pour la commande #${orderId}.`, "info");
//     };
//     const handleAddPromoCode = (newPromo) => {
//         setData(prev => ({...prev, promoCodes: [...prev.promoCodes, newPromo]}));
//         addNotification(`Code promo ${newPromo.code} ajouté.`, 'success');
//     };
//     const handleDeletePromoCode = (codeToDelete) => {
//         setData(prev => ({...prev, promoCodes: prev.promoCodes.filter(c => c.code !== codeToDelete)}));
//         addNotification(`Code promo ${codeToDelete} supprimé.`, 'info');
//     };

//     const sidebarLinks = [ 
//         { id: 'point-de-vente', label: 'Point de Vente', icon: <ShoppingBasket /> }, 
//         { id: 'clients', label: 'Clients', icon: <Users /> }, 
//         { id: 'factures_proforma', label: 'Proformas', icon: <FileClock /> }, 
//         { id: 'factures_commerciales', label: 'Factures & Tickets', icon: <FileSignature /> }, 
//         { id: 'commandes', label: 'Commandes', icon: <ShoppingCart /> }, 
//         { id: 'automatisation', label: 'Automatisation', icon: <Bot /> }, 
//     ];

//     const renderView = () => {
//         switch (activeSideMenu) {
//             case 'clients': return <ClientsPage clients={data.clients} setClients={(newClients) => setData(prev => ({...prev, clients: newClients}))} onOpenDetails={setClientDetailsModalData} userRole={userRole} commerciaux={data.commerciaux} />;
//             case 'point-de-vente': return <PointDeVentePage clients={data.clients} stockItems={data.stockItems} otherServices={data.otherServices} onConvertToProforma={handleConvertToProforma} onInitiatePayment={handleInitiatePayment} userRole={userRole} initialCartData={cartDataForProforma} onSaveAndReturnToProforma={handleSaveAndReturnToProforma} addNotification={addNotification} savedInvoices={savedInvoices} savedProformas={savedProformas} promoCodes={data.promoCodes} />;
//             case 'factures_proforma': return <ProformaPage initialProforma={proformaDataForView} clients={data.clients} onBack={() => { setActiveSideMenu('point-de-vente'); setProformaDataForView(null); }} savedProformas={savedProformas} onSaveProforma={handleSaveProforma} onInitiatePayment={handleInitiatePayment} onModifyProforma={handleModifyProforma} onAddItemToProforma={handleAddItemToProforma} onPrepareAndPrint={handlePrepareAndPrintDocument} onDuplicateDocument={handleDuplicateDocument} />;
//             case 'factures_commerciales': return <FacturesPage invoices={savedInvoices} onFinalizeInvoice={(inv) => setFinalizeModalData(inv)} setActiveSideMenu={setActiveSideMenu} onPrepareAndPrint={handlePrepareAndPrintDocument} onUpdateInvoiceStatus={handleUpdateInvoiceStatus} onDuplicateDocument={handleDuplicateDocument} />;
//             case 'commandes': return <CommandesPage orders={savedOrders} onUpdateStatus={handleUpdateOrderStatus} onOpenDetails={setOrderDetailsModalData} onSendSurvey={handleSendSurvey} />;
//             case 'automatisation': return <AutomatisationPage promoCodes={data.promoCodes} onAddPromoCode={handleAddPromoCode} onDeletePromoCode={handleDeletePromoCode} />;
//             default: return <PointDeVentePage clients={data.clients} stockItems={data.stockItems} otherServices={data.otherServices} onConvertToProforma={handleConvertToProforma} onInitiatePayment={handleInitiatePayment} userRole={userRole} initialCartData={cartDataForProforma} onSaveAndReturnToProforma={handleSaveAndReturnToProforma} addNotification={addNotification} savedInvoices={savedInvoices} savedProformas={savedProformas} promoCodes={data.promoCodes} />;
//         }
//     };
    
//     return (
//         <div className={`${theme} font-sans`}>
//             <div className="min-h-screen bg-slate-100 dark:bg-slate-900 flex flex-col">
//                 <header className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-700 flex items-center justify-between px-6 py-2 z-20 flex-shrink-0 sticky top-0">
//                     <div className="flex items-center space-x-3">
//                         <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center shadow-md"><span className="text-white text-xl font-bold">ans</span></div>
//                         <div className="flex items-baseline">
//                             <h1 className="text-lg font-bold text-slate-800 dark:text-slate-100">ORION</h1>
//                             <span className="ml-2 text-xs font-mono bg-red-100 text-red-700 px-1.5 py-0.5 rounded">v59</span>
//                         </div>
//                     </div>
//                     <nav className="flex items-center space-x-2"><button className={`px-4 py-2 font-semibold rounded-lg text-sm capitalize text-red-600`}>Commercial</button></nav>
//                     <div className="flex items-center space-x-4">
//                         <ThemeSwitcher theme={theme} setTheme={setTheme} />
//                         <div className="flex items-center space-x-2"><ShieldCheck size={16} className="text-slate-500"/><select value={userRole} onChange={e => setUserRole(e.target.value)} className="bg-slate-100 dark:bg-slate-700 border-slate-300 dark:border-slate-600 rounded-md text-sm p-1 text-slate-800 dark:text-slate-200"><option value="admin">Admin</option><option value="vendeur">Vendeur</option></select></div>
//                         <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">Directeur</span><img src="https://placehold.co/40x40/1e293b/FFFFFF?text=DG" alt="Avatar" className="w-9 h-9 rounded-full" />
//                     </div>
//                 </header>
//                 <div className="flex flex-1 overflow-hidden">
//                     <aside className="w-64 bg-slate-800 dark:bg-slate-900 text-white flex-shrink-0 flex flex-col p-4 border-r border-slate-200 dark:border-slate-700">
//                         <div className="mb-4 p-2"><h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Menu</h2></div>
//                         <nav className="flex flex-col space-y-1">{sidebarLinks.map(link => (<a key={link.id} href="#" onClick={(e) => { e.preventDefault(); setActiveSideMenu(link.id); setCartDataForProforma(null); }} className={`flex items-center space-x-3 p-3 rounded-lg transition-colors text-sm font-medium ${activeSideMenu === link.id ? 'bg-red-600 text-white' : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'}`}>{link.icon}<span>{link.label}</span></a>))}</nav>
//                     </aside>
//                     <main className="flex-1 flex flex-col overflow-y-auto bg-slate-100 dark:bg-gray-900 p-6 lg:p-8 transition-all duration-300">
//                         {renderView()}
//                         <ToastContainer toasts={notifications} onDismiss={dismissNotification} />
//                         {paymentModalData && <PaymentModal total={paymentModalData.sourceDocument.totalPrice} client={paymentModalData.client} onClose={() => setPaymentModalData(null)} onConfirm={handleConfirmPayment} actionType={paymentModalData.type} />}
//                         {finalizeModalData && <FinalizePaymentModal invoice={finalizeModalData} onClose={() => setFinalizeModalData(null)} onConfirm={handleFinalizeInvoice} />}
//                         {printableDoc && <PrintableDocumentModal doc={printableDoc} onClose={() => setPrintableDoc(null)} />}
//                         {orderDetailsModalData && <OrderDetailsModal order={orderDetailsModalData} onClose={() => setOrderDetailsModalData(null)} onFinalizeOrder={handleFinalizeOrder} onToggleStep={handleToggleProductionStep} personnel={data.personnel} userRole={userRole} />}
//                         {clientDetailsModalData && <ClientDetailsModal client={clientDetailsModalData} onClose={() => setClientDetailsModalData(null)} userRole={userRole} onOpenCreditModal={setAddCreditModalData} onSaveNote={handleSaveClientNote} invoices={savedInvoices} proformas={savedProformas} />}
//                         {addCreditModalData && <AddCreditModal client={addCreditModalData} onClose={() => setAddCreditModalData(null)} onAddCredit={handleAddCredit} />}
//                     </main>
//                 </div>
//             </div>
//         </div>
//     );
// }
