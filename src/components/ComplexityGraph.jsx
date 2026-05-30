import React, { useMemo } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts'

const generateData = (algorithm) => {
  const sizes = [10, 20, 40, 80, 120]

  return sizes.map((n) => {
    let value = 0

    if (['bubble', 'selection', 'insertion'].includes(algorithm)) {
      value = n * n
    } else if (['merge', 'quick', 'heap', 'shell'].includes(algorithm)) {
      value = n * Math.log2(n)
    } else {
      value = n
    }

    return {
      size: n,
      performance: Math.round(value),
    }
  })
}

const algorithmColors = {
  bubble: '#ef4444',
  selection: '#f59e0b',
  insertion: '#10b981',
  merge: '#06b6d4',
  quick: '#3b82f6',
  heap: '#8b5cf6',
  shell: '#ec4899',
}

const formatYAxis = (value) => {
  if (value >= 10000) return `${(value / 1000).toFixed(0)}k`
  if (value >= 1000) return `${(value / 1000).toFixed(1)}k`
  return value
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-xs shadow-lg">
      <p className="text-slate-400">Input Size: <span className="font-semibold text-slate-200">{label}</span></p>
      <p className="text-slate-400" style={{ color: payload[0].color }}>
        Operations: <span className="font-semibold">{payload[0].value.toLocaleString()}</span>
      </p>
    </div>
  )
}

export default function ComplexityGraph({ algorithm }) {
  const data = useMemo(() => generateData(algorithm), [algorithm])

  if (!algorithm) return null

  return (
    <div className="rounded-2xl border border-slate-700/80 bg-slate-900/60 p-4 shadow-xl">
      <div className="mb-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400/80">
          Complexity Visualization
        </p>

        <h3 className="mt-2 text-lg font-semibold text-slate-100">
          {algorithm.charAt(0).toUpperCase() + algorithm.slice(1)} Sort
          Performance
        </h3>
      </div>

      <div className="h-[260px] sm:h-[320px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />

            <XAxis dataKey="size" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 12 }} tickLine={false} />

            <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 12 }} tickLine={false} tickFormatter={formatYAxis} />

            <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#64748b', strokeDasharray: '3 3' }} />

            <Line
              type="monotone"
              dataKey="performance"
              stroke={algorithmColors[algorithm]}
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 5, strokeWidth: 2, stroke: '#fff' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
