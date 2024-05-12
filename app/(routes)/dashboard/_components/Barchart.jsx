import React from 'react'
import {
    BarChart,
    Bar,
    CartesianGrid,
    XAxis,
    YAxis,
    Legend,
    ResponsiveContainer,
    Tooltip,
} from "recharts";

function Barchart({budgetList}) {
  return (
    <div className='border rounded-lg p-5'>
        <h2 className='font-bold text-lg mb-4'>Activity</h2>
        <ResponsiveContainer width={'80%'} height={300}>
        <BarChart width={500} height={300} data={budgetList} margin={{top:7}}>
          
            <Tooltip className='bg-gray-100'/>
            <XAxis dataKey="name" />
            <YAxis />
            <Legend/>
            <Bar dataKey="totalSpend" stackId="a" fill="#4845d2" />
            <Bar dataKey="amount" stackId="a" fill="#C3C2FF" />
        </BarChart>
        </ResponsiveContainer>
    </div>
  )
}

export default Barchart