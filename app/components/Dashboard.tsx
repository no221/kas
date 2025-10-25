'use client'
import { Summary } from '@/types'
import { formatCurrency } from '@/lib/utils'

interface DashboardProps {
  summary: Summary
}

export default function Dashboard({ summary }: DashboardProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white p-6 rounded-lg shadow border-l-4 border-green-500">
        <h3 className="text-lg font-semibold text-gray-600">Total Pemasukan</h3>
        <p className="text-2xl font-bold text-green-600">
          {formatCurrency(summary.total_income)}
        </p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow border-l-4 border-red-500">
        <h3 className="text-lg font-semibold text-gray-600">Total Pengeluaran</h3>
        <p className="text-2xl font-bold text-red-600">
          {formatCurrency(summary.total_expenses)}
        </p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow border-l-4 border-blue-500">
        <h3 className="text-lg font-semibold text-gray-600">Saldo Kas</h3>
        <p className="text-2xl font-bold text-blue-600">
          {formatCurrency(summary.balance)}
        </p>
      </div>
    </div>
  )
}
