'use client'
import { useState } from 'react'
import { Expense } from '@/types'
import { formatCurrency, formatDate } from '@/lib/utils'

interface ExpenseManagerProps {
  expenses: Expense[]
  onAddExpense: (name: string, qty: number, price: number, notes?: string) => void
}

export default function ExpenseManager({ expenses, onAddExpense }: ExpenseManagerProps) {
  const [name, setName] = useState('')
  const [qty, setQty] = useState(1)
  const [price, setPrice] = useState(0)
  const [notes, setNotes] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name && price > 0) {
      onAddExpense(name, qty, price, notes)
      setName('')
      setQty(1)
      setPrice(0)
      setNotes('')
    }
  }

  const totalExpenses = expenses.reduce((sum, expense) => sum + (expense.qty * expense.price), 0)

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">💸 Pengeluaran Kas</h2>
      
      {/* Form Tambah Pengeluaran */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-6 p-4 border rounded">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nama Barang/Kebutuhan
            </label>
            <input
              type="text"
              placeholder="Contoh: Fotokopi materi, Aqua galon, dll"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Keterangan (opsional)
            </label>
            <input
              type="text"
              placeholder="Tambahan info..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Jumlah
            </label>
            <input
              type="number"
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              min="1"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Harga Satuan
            </label>
            <input
              type="number"
              placeholder="0"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Total
            </label>
            <div className="w-full p-2 border rounded bg-gray-50">
              <p className="text-lg font-semibold text-red-600">
                {formatCurrency(qty * price)}
              </p>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 font-medium transition-colors"
        >
          💸 Tambah Pengeluaran
        </button>
      </form>

      {/* Daftar Pengeluaran */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-bold text-lg">Riwayat Pengeluaran</h3>
          <p className="text-red-600 font-semibold">
            Total: {formatCurrency(totalExpenses)}
          </p>
        </div>
        
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {expenses.length === 0 ? (
            <p className="text-gray-500 text-center py-4">Belum ada pengeluaran</p>
          ) : (
            expenses.map((expense) => (
              <div key={expense.id} className="flex justify-between items-start p-3 border rounded hover:bg-gray-50">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{expense.name}</p>
                    {expense.notes && (
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {expense.notes}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">
                    {expense.qty} x {formatCurrency(expense.price)} • {formatDate(expense.date)}
                  </p>
                </div>
                <p className="text-red-600 font-semibold">
                  {formatCurrency(expense.qty * expense.price)}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
        }
