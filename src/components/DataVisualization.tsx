
import { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface DataItem {
  region: string;
  revenue: number;
}

interface DataVisualizationProps {
  data: DataItem[];
  title: string;
  description: string;
}

const COLORS = ['#6941C6', '#9E77ED', '#B692F6', '#D9D6FE', '#F4F3FF', '#E0EAFF', '#B9CFFF', '#A5B4FC'];

export function DataVisualization({ data, title, description }: DataVisualizationProps) {
  const [activeTab, setActiveTab] = useState("chart");

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <Card className="w-full bg-[#1A1F2C] dark:bg-[#221F26] border-none">
      <CardHeader>
        <CardTitle className="text-white">{title}</CardTitle>
        <CardDescription className="text-white/70">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs 
          defaultValue="chart" 
          value={activeTab} 
          onValueChange={setActiveTab} 
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-3 mb-4 bg-[#222222] text-white">
            <TabsTrigger 
              value="chart" 
              className="data-[state=active]:bg-[#6941C6] data-[state=active]:text-white"
            >
              Bar Chart
            </TabsTrigger>
            <TabsTrigger 
              value="pie" 
              className="data-[state=active]:bg-[#6941C6] data-[state=active]:text-white"
            >
              Pie Chart
            </TabsTrigger>
            <TabsTrigger 
              value="table" 
              className="data-[state=active]:bg-[#6941C6] data-[state=active]:text-white"
            >
              Table
            </TabsTrigger>
          </TabsList>
          <TabsContent value="chart" className="w-full">
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={data}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 60,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis 
                    dataKey="region" 
                    angle={-45} 
                    textAnchor="end"
                    tick={{fontSize: 12, fill: 'white'}}
                    height={60}
                  />
                  <YAxis 
                    tickFormatter={formatCurrency}
                    tick={{fontSize: 12, fill: 'white'}}
                  />
                  <Tooltip 
                    contentStyle={{backgroundColor: '#333', color: 'white'}} 
                    formatter={(value: number) => formatCurrency(value)} 
                  />
                  <Legend 
                    wrapperStyle={{color: 'white'}} 
                    formatter={(value) => <span className="text-white">{value}</span>}
                  />
                  <Bar dataKey="revenue" fill="#6941C6" name="Revenue" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          <TabsContent value="pie" className="w-full">
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={130}
                    fill="#8884d8"
                    dataKey="revenue"
                    nameKey="region"
                  >
                    {data.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={COLORS[index % COLORS.length]} 
                      />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{backgroundColor: '#333', color: 'white'}} 
                    formatter={(value: number) => formatCurrency(value)} 
                  />
                  <Legend 
                    wrapperStyle={{color: 'white'}} 
                    formatter={(value) => <span className="text-white">{value}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          <TabsContent value="table" className="w-full">
            <div className="border rounded-md overflow-hidden bg-[#222222]">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-[#1A1F2C] border-b">
                    <th className="py-3 px-4 font-medium text-white">Region</th>
                    <th className="py-3 px-4 font-medium text-white">Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr 
                      key={index} 
                      className={`${index % 2 === 0 ? 'bg-[#222222]' : 'bg-[#1A1F2C]'}`}
                    >
                      <td className="py-3 px-4 text-white">{item.region}</td>
                      <td className="py-3 px-4 text-white">{formatCurrency(item.revenue)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
