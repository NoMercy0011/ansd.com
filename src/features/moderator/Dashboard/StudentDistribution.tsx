// components/dashboard/StudentDistribution.tsx
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface LevelDistribution {
  level: string;
  count: number;
  male: number;
  female: number;
}

interface StudentDistributionProps {
  data?: LevelDistribution[];
}

const mockData: LevelDistribution[] = [
  { level: "Terminale", count: 320, male: 150, female: 170 },
  { level: "Première", count: 280, male: 130, female: 150 },
  { level: "Seconde", count: 310, male: 145, female: 165 },
  { level: "Troisième", count: 250, male: 120, female: 130 },
  { level: "Autres", count: 88, male: 40, female: 48 },
];

export default function StudentDistribution({ data = mockData }: StudentDistributionProps) {
  const chartData = {
    labels: data.map(item => item.level),
    datasets: [
      {
        label: 'Nombre d\'élèves',
        data: data.map(item => item.count),
        backgroundColor: [
          'rgba(234, 88, 12, 0.7)',
          'rgba(219, 39, 119, 0.7)',
          'rgba(14, 165, 233, 0.7)',
          'rgba(139, 92, 246, 0.7)',
          'rgba(20, 184, 166, 0.7)'
        ],
        borderColor: [
          'rgba(234, 88, 12, 1)',
          'rgba(219, 39, 119, 1)',
          'rgba(14, 165, 233, 1)',
          'rgba(139, 92, 246, 1)',
          'rgba(20, 184, 166, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          afterBody: (context: any) => {
            const dataIndex = context[0].dataIndex;
            return [
              `Garçons: ${data[dataIndex].male} (${Math.round((data[dataIndex].male / data[dataIndex].count) * 100)}%)`,
              `Filles: ${data[dataIndex].female} (${Math.round((data[dataIndex].female / data[dataIndex].count) * 100)}%)`
            ];
          }
        }
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Répartition des Élèves</h3>
        <div className="flex space-x-2">
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
            Total: {data.reduce((sum, item) => sum + item.count, 0)} élèves
          </span>
        </div>
      </div>
      <div className="h-80">
        <Pie data={chartData} options={options} />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4">
        {data.map((level) => (
          <div key={level.level} className="border-l-4 border-orange-500 pl-3">
            <h4 className="font-medium text-gray-900">{level.level}</h4>
            <div className="flex justify-between text-sm mt-1">
              <span className="text-gray-500">Garçons</span>
              <span>{level.male}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Filles</span>
              <span>{level.female}</span>
            </div>
            <div className="mt-1">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-orange-500 h-2 rounded-full" 
                  style={{ width: `${(level.count / data.reduce((sum, item) => sum + item.count, 0)) * 100}%` }}
                ></div>
              </div>
              <div className="text-right text-xs text-gray-500 mt-1">
                {Math.round((level.count / data.reduce((sum, item) => sum + item.count, 0)) * 100)}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}