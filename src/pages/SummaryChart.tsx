import { Link } from "react-router-dom";

// src/components/SummaryChart.tsx
type SummaryData = {
  label: string;
  count: number;
};

type Props = {
  data: SummaryData[];
};



export const SummaryChart = ({ data }: Props) => {

  
  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      <h2 className="text-lg font-semibold mb-4">System Summary</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {data.map((item, index) => (
          <Link to={`/dashboard/${item.label.toLowerCase()}`} key={index} className="no-underline">

          <div
            key={index}
            className="bg-blue-50 p-4 rounded-lg shadow-sm text-center"
          >
            <h3 className="text-md font-medium text-blue-700">{item.label}</h3>
            <p className="text-2xl font-bold text-blue-900">{item.count}</p>
          </div>

          </Link>

        ))}
      </div>
    </div>
  );
};
