import React, { useState, useEffect } from 'react';
import { 
  Users, 
  GraduationCap, 
  BookOpen, 
  Calendar, 
  TrendingUp, 
  Bell,
  Settings,
  FileText,
  Award,
  Clock,
  BarChart3,
  PieChart,
  Activity,
  ChevronRight,
  Search,
  Filter,
  Plus,
  Download,
  Eye,
  Edit,
  Trash2,
  Menu,
  X
} from 'lucide-react';

const LovaAdminDashboard = () => {
  const [activeModule, setActiveModule] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Données mock
  const mockData = {
    stats: {
      students: 1247,
      teachers: 45,
      classes: 28,
      subjects: 156
    },
    recentActivity: [
      { id: 1, type: 'student', action: 'Nouvel étudiant inscrit', name: 'Marie Rakoto', time: '2h' },
      { id: 2, type: 'teacher', action: 'Enseignant ajouté', name: 'Paul Andry', time: '4h' },
      { id: 3, type: 'class', action: 'Classe créée', name: 'Terminale C', time: '1j' },
      { id: 4, type: 'grade', action: 'Notes saisies', name: 'Mathématiques - 2nde A', time: '2j' }
    ],
    topClasses: [
      { name: 'Terminale A', students: 32, average: 16.5 },
      { name: '1ère S', students: 28, average: 15.8 },
      { name: '2nde C', students: 35, average: 14.2 },
      { name: '3ème A', students: 30, average: 13.9 }
    ],
    monthlyStats: [
      { month: 'Jan', students: 1200, teachers: 42 },
      { month: 'Fév', students: 1220, teachers: 43 },
      { month: 'Mar', students: 1235, teachers: 44 },
      { month: 'Avr', students: 1247, teachers: 45 }
    ]
  };

  const modules = [
    { id: 'dashboard', name: 'Dashboard', icon: BarChart3 },
    { id: 'students', name: 'Étudiants', icon: Users },
    { id: 'teachers', name: 'Enseignants', icon: GraduationCap },
    { id: 'classes', name: 'Classes', icon: BookOpen },
    { id: 'subjects', name: 'Matières', icon: FileText },
    { id: 'schedule', name: 'Emploi du temps', icon: Calendar },
    { id: 'reports', name: 'Bulletins', icon: Award },
    { id: 'certificates', name: 'Certificats', icon: FileText },
    { id: 'settings', name: 'Paramètres', icon: Settings }
  ];

  const StatCard = ({ title, value, icon: Icon, color, trend }) => (
    <div className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-${color} group hover:scale-105`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-gray-800 mt-2">{value.toLocaleString()}</p>
          {trend && (
            <div className="flex items-center mt-2">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-green-500 text-sm font-medium">+{trend}%</span>
            </div>
          )}
        </div>
        <div className={`p-4 rounded-full bg-${color} bg-opacity-10 group-hover:bg-opacity-20 transition-all duration-300`}>
          <Icon className={`h-8 w-8 text-${color}`} />
        </div>
      </div>
    </div>
  );

  const ActivityItem = ({ activity }) => (
    <div className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
      <div className={`p-2 rounded-full mr-3 ${
        activity.type === 'student' ? 'bg-orange-100 text-orange-600' :
        activity.type === 'teacher' ? 'bg-pink-100 text-pink-700' :
        activity.type === 'class' ? 'bg-sky-100 text-sky-700' :
        'bg-gray-100 text-gray-600'
      }`}>
        {activity.type === 'student' && <Users className="h-4 w-4" />}
        {activity.type === 'teacher' && <GraduationCap className="h-4 w-4" />}
        {activity.type === 'class' && <BookOpen className="h-4 w-4" />}
        {activity.type === 'grade' && <Award className="h-4 w-4" />}
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-800">{activity.action}</p>
        <p className="text-xs text-gray-500">{activity.name}</p>
      </div>
      <span className="text-xs text-gray-400">{activity.time}</span>
    </div>
  );

  const ClassCard = ({ classData }) => (
    <div className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-bold text-gray-800">{classData.name}</h3>
        <span className="text-2xl font-bold text-green-600">{classData.average}</span>
      </div>
      <div className="flex items-center text-sm text-gray-600">
        <Users className="h-4 w-4 mr-1" />
        <span>{classData.students} étudiants</span>
      </div>
      <div className="mt-3 bg-gray-200 rounded-full h-2">
        <div 
          className="bg-gradient-to-r from-orange-400 to-pink-500 h-2 rounded-full transition-all duration-500"
          style={{ width: `${(classData.average / 20) * 100}%` }}
        />
      </div>
    </div>
  );

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Étudiants" 
          value={mockData.stats.students} 
          icon={Users} 
          color="orange-600" 
          trend={5.2}
        />
        <StatCard 
          title="Enseignants" 
          value={mockData.stats.teachers} 
          icon={GraduationCap} 
          color="pink-700" 
          trend={2.1}
        />
        <StatCard 
          title="Classes" 
          value={mockData.stats.classes} 
          icon={BookOpen} 
          color="sky-700" 
          trend={12.5}
        />
        <StatCard 
          title="Matières" 
          value={mockData.stats.subjects} 
          icon={FileText} 
          color="orange-600" 
          trend={8.3}
        />
      </div>

      {/* Charts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Feed */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">Activité Récente</h2>
            <Activity className="h-5 w-5 text-gray-500" />
          </div>
          <div className="space-y-2">
            {mockData.recentActivity.map(activity => (
              <ActivityItem key={activity.id} activity={activity} />
            ))}
          </div>
        </div>

        {/* Top Classes */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">Meilleures Classes</h2>
            <Award className="h-5 w-5 text-gray-500" />
          </div>
          <div className="space-y-4">
            {mockData.topClasses.map((classData, index) => (
              <ClassCard key={index} classData={classData} />
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Actions Rapides</h2>
          <div className="space-y-3">
            <button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 px-4 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 flex items-center justify-center">
              <Plus className="h-5 w-5 mr-2" />
              Nouvel Étudiant
            </button>
            <button className="w-full bg-gradient-to-r from-pink-600 to-pink-700 text-white py-3 px-4 rounded-lg hover:from-pink-700 hover:to-pink-800 transition-all duration-300 flex items-center justify-center">
              <Plus className="h-5 w-5 mr-2" />
              Nouvel Enseignant
            </button>
            <button className="w-full bg-gradient-to-r from-sky-600 to-sky-700 text-white py-3 px-4 rounded-lg hover:from-sky-700 hover:to-sky-800 transition-all duration-300 flex items-center justify-center">
              <Download className="h-5 w-5 mr-2" />
              Exporter Bulletins
            </button>
            <button className="w-full bg-gradient-to-r from-gray-600 to-gray-700 text-white py-3 px-4 rounded-lg hover:from-gray-700 hover:to-gray-800 transition-all duration-300 flex items-center justify-center">
              <FileText className="h-5 w-5 mr-2" />
              Certificats
            </button>
          </div>
        </div>
      </div>

      {/* Performance Chart */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Évolution Mensuelle</h2>
        <div className="h-64 flex items-end justify-between bg-gray-50 rounded-lg p-4">
          {mockData.monthlyStats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="flex space-x-2 mb-2">
                <div 
                  className="w-8 bg-gradient-to-t from-orange-400 to-orange-500 rounded-t"
                  style={{ height: `${(stat.students / 1300) * 200}px` }}
                />
                <div 
                  className="w-8 bg-gradient-to-t from-pink-500 to-pink-600 rounded-t"
                  style={{ height: `${(stat.teachers / 50) * 200}px` }}
                />
              </div>
              <span className="text-sm font-medium text-gray-600">{stat.month}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-4 space-x-6">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-gradient-to-r from-orange-400 to-orange-500 rounded mr-2" />
            <span className="text-sm text-gray-600">Étudiants</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-gradient-to-r from-pink-500 to-pink-600 rounded mr-2" />
            <span className="text-sm text-gray-600">Enseignants</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderModuleContent = () => {
    if (activeModule === 'dashboard') return renderDashboard();
    
    return (
      <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
        <div className="mb-6">
          <div className="w-20 h-20 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Settings className="h-10 w-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Module en Développement</h2>
          <p className="text-gray-600">
            Le module "{modules.find(m => m.id === activeModule)?.name}" sera bientôt disponible avec toutes ses fonctionnalités CRUD.
          </p>
        </div>
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="font-semibold text-gray-800 mb-3">Fonctionnalités prévues :</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-600">
            <div className="flex items-center">
              <Plus className="h-4 w-4 mr-2 text-green-500" />
              Création
            </div>
            <div className="flex items-center">
              <Eye className="h-4 w-4 mr-2 text-blue-500" />
              Consultation
            </div>
            <div className="flex items-center">
              <Edit className="h-4 w-4 mr-2 text-orange-500" />
              Modification
            </div>
            <div className="flex items-center">
              <Trash2 className="h-4 w-4 mr-2 text-red-500" />
              Suppression
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-2xl transform transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="p-6 bg-gradient-to-r from-orange-500 to-pink-600">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mr-3">
                <GraduationCap className="h-6 w-6 text-orange-500" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Lova</h1>
                <p className="text-orange-100 text-sm">Admin Dashboard</p>
              </div>
            </div>
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden text-white hover:bg-white hover:bg-opacity-20 p-1 rounded"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        <nav className="mt-6 px-4">
          {modules.map(module => (
            <button
              key={module.id}
              onClick={() => setActiveModule(module.id)}
              className={`w-full flex items-center px-4 py-3 mb-2 rounded-lg transition-all duration-200 ${
                activeModule === module.id 
                  ? 'bg-gradient-to-r from-orange-500 to-pink-600 text-white shadow-lg' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <module.icon className="h-5 w-5 mr-3" />
              <span className="font-medium">{module.name}</span>
              {activeModule === module.id && <ChevronRight className="h-4 w-4 ml-auto" />}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden mr-4 p-2 rounded-lg hover:bg-gray-100"
              >
                <Menu className="h-5 w-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  {modules.find(m => m.id === activeModule)?.name || 'Dashboard'}
                </h1>
                <p className="text-gray-600 text-sm">
                  {currentTime.toLocaleDateString('fr-FR', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Rechercher..." 
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <button className="relative p-2 text-gray-600 hover:text-orange-500 transition-colors">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
              </button>
              <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">A</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {renderModuleContent()}
        </main>
      </div>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default LovaAdminDashboard;