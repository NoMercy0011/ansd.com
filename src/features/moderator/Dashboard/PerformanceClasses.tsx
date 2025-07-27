// components/dashboard/PerformanceClasses.tsx
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Enregistrer tous les éléments nécessaires
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

interface ClassPerformance {
  className: string;
  averageGrade: number;
  successRate: number;
  topStudents: number;
}

interface PerformanceClassesProps {
  data?: ClassPerformance[];
}

const mockData: ClassPerformance[] = [
  { className: "Terminale A", averageGrade: 15.2, successRate: 92, topStudents: 12 },
  { className: "Terminale B", averageGrade: 14.7, successRate: 88, topStudents: 9 },
  { className: "1ère A", averageGrade: 13.5, successRate: 85, topStudents: 8 },
  { className: "1ère B", averageGrade: 12.9, successRate: 82, topStudents: 6 },
  { className: "2nde A", averageGrade: 12.3, successRate: 78, topStudents: 5 },
  { className: "2nde B", averageGrade: 11.8, successRate: 75, topStudents: 4 },
];

export default function PerformanceClasses({ data = mockData }: PerformanceClassesProps) {
  const chartData = {
    labels: data.map(item => item.className),
    datasets: [
      {
        label: 'Moyenne de classe',
        data: data.map(item => item.averageGrade),
        backgroundColor: 'rgba(234, 88, 12, 0.7)',
        borderColor: 'rgba(234, 88, 12, 1)',
        borderWidth: 1,
        yAxisID: 'y',
      },
      {
        label: 'Taux de réussite (%)',
        data: data.map(item => item.successRate),
        backgroundColor: 'rgba(14, 165, 233, 0.7)',
        borderColor: 'rgba(14, 165, 233, 1)',
        borderWidth: 1,
        yAxisID: 'y1',
        type: 'line' as const,
        // Configuration spécifique pour la ligne
        tension: 0.1,
        pointRadius: 5,
        pointHoverRadius: 7,
      }
    ],
  };

  const options = {
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    scales: {
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        title: {
          display: true,
          text: 'Moyenne /20',
        },
        max: 20,
        min: 0,
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        title: {
          display: true,
          text: 'Réussite %',
        },
        max: 100,
        min: 0,
        grid: {
          drawOnChartArea: false,
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          afterBody: (context: any) => {
            const dataIndex = context[0].dataIndex;
            return [
              `Élèves excellents: ${data[dataIndex].topStudents}`,
              `Taux réussite: ${data[dataIndex].successRate}%`
            ];
          }
        }
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Performance des Classes</h3>
        <select className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-1 text-sm">
          <option>Cette année</option>
          <option>Trimestre 1</option>
          <option>Trimestre 2</option>
          <option>Trimestre 3</option>
        </select>
      </div>
      <div className="h-80">
        <Bar data={chartData} options={options} />
      </div>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        {data.slice(0, 3).map((classItem) => (
          <div key={classItem.className} className="bg-gray-50 p-3 rounded-lg">
            <h4 className="font-medium text-gray-900">{classItem.className}</h4>
            <div className="flex justify-between mt-2">
              <span className="text-sm text-gray-500">Moyenne:</span>
              <span className="font-medium">{classItem.averageGrade}/20</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Réussite:</span>
              <span className="font-medium">{classItem.successRate}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}