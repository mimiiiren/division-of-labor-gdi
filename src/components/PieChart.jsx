
import { useState } from 'react';
import { TrendingUp } from 'lucide-react';

export default function WorkHoursPieChart() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Example props
  const user1Name = "Partner 1";
  const user1Hours = 15;
  const user2Name = "Partner 2";
  const user2Hours = 85;

  const chartData = [
    { name: user1Name, hours: Number(user1Hours), fill: '#734444' },
    { name: user2Name, hours: Number(user2Hours), fill: '#C37857' }
  ];

  const totalHours = chartData.reduce((sum, entry) => sum + entry.hours, 0);

  // Calculate SVG paths for donut chart
  const createDonutSegment = (startAngle, endAngle, innerRadius, outerRadius, isActive) => {
    const adjustedOuter = isActive ? outerRadius + 10 : outerRadius;
    
    const startRadians = (startAngle - 90) * Math.PI / 180;
    const endRadians = (endAngle - 90) * Math.PI / 180;
    
    const x1 = 100 + adjustedOuter * Math.cos(startRadians);
    const y1 = 100 + adjustedOuter * Math.sin(startRadians);
    const x2 = 100 + adjustedOuter * Math.cos(endRadians);
    const y2 = 100 + adjustedOuter * Math.sin(endRadians);
    
    const x3 = 100 + innerRadius * Math.cos(endRadians);
    const y3 = 100 + innerRadius * Math.sin(endRadians);
    const x4 = 100 + innerRadius * Math.cos(startRadians);
    const y4 = 100 + innerRadius * Math.sin(startRadians);
    
    const largeArc = endAngle - startAngle > 180 ? 1 : 0;
    
    return `
      M ${x1} ${y1}
      A ${adjustedOuter} ${adjustedOuter} 0 ${largeArc} 1 ${x2} ${y2}
      L ${x3} ${y3}
      A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x4} ${y4}
      Z
    `;
  };

  let currentAngle = 0;
  const segments = chartData.map((entry, index) => {
    const percentage = entry.hours / totalHours;
    const angle = percentage * 360;
    const segment = {
      path: createDonutSegment(currentAngle, currentAngle + angle, 60, 80, index === activeIndex),
      fill: entry.fill,
      startAngle: currentAngle,
      endAngle: currentAngle + angle,
      index
    };
    currentAngle += angle;
    return segment;
  });

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex items-center justify-center">
      <div className="flex flex-col bg-white rounded-lg shadow-lg border border-gray-200 max-w-md w-full">
        <div className="items-center text-center pb-0 pt-6 px-6">
          <h3 className="text-2xl font-semibold tracking-tight text-red-500">
            Work Hours - Donut Chart
          </h3>
          <p className="text-sm text-gray-500 mt-2">Employee Work Distribution</p>
        </div>
        
        <div className="flex-1 pb-0 px-6 h-25 w-25">
          <div className="mx-auto aspect-square max-h-[250px] relative">
            <svg viewBox="0 0 200 200" className="w-25 h-25">
              {segments.map((segment, index) => (
                <path
                  key={index}
                  d={segment.path}
                  fill={segment.fill}
                  stroke="white"
                  strokeWidth="2"
                  onMouseEnter={() => setActiveIndex(index)}
                  className="cursor-pointer transition-all duration-200"
                />
              ))}
            </svg>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">{totalHours}</div>
                <div className="text-sm text-gray-500">Total Hours</div>
              </div>
            </div>
          </div>
          
          <div className="mt-4 flex justify-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span className="text-sm text-gray-700">{user1Name}: {user1Hours}h</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-sm text-gray-700">{user2Name}: {user2Hours}h</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col gap-2 text-sm px-6 pb-6 pt-4">
         
          <div className="text-gray-500 leading-none">
            Showing total work hours distribution
          </div>
        </div>
      </div>
    </div>
  );
}