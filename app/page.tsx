'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Student, Payment, Expense, Summary } from '@/types'
import { getCurrentWeekRange } from '@/lib/utils'
import Dashboard from './components/Dashboard'
import StudentList from './components/StudentList'
import ExpenseManager from './components/ExpenseManager'
import CopyReport from './components/CopyReport'

export default function KasKelas() {
  const [students, setStudents] = useState<Student[]>([])
  const [payments, setPayments] = useState<Payment[]>([])
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [summary, setSummary] = useState<Summary>({ 
    total_income: 0, 
    total_expenses: 0, 
    balance: 0 
  })
  const [loading, setLoading] = useState(true)
  const [currentWeek, setCurrentWeek] = useState('')

  useEffect(() => {
    loadData()
    const weekRange = getCurrentWeekRange()
    setCurrentWeek(weekRange.display)
  }, [])

  async function loadData() {
    try {
      setLoading(true)
      
      // Load students
      const { data: studentsData } = await supabase
        .from('students')
        .select('*')
        .order('name')
      
      // Load payments dengan student data
      const { data: paymentsData } = await supabase
        .from('payments')
        .select('*, student:students(name)')
        .order('date_paid', { ascending: false })
      
      // Load expenses
      const { data: expensesData } = await supabase
        .from('expenses')
        .select('*')
        .order('date', { ascending: false })
      
      // Load summary
      const { data: summaryData } = await supabase
        .from('summary_kas')
        .select('*')
        .single()

      if (studentsData) setStudents(studentsData)
      if (paymentsData) setPayments(paymentsData)
      if (expensesData) setExpenses(expensesData)
      if (summaryData) setSummary(summaryData)
      
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddPayment = async (studentId: string, amount: number) => {
    const weekRange = getCurrentWeekRange()
    
    const { error } = await supabase.from('payments').insert({
      student_id: studentId,
      amount: amount,
      week_start: weekRange.start,
      week_end: weekRange.end,
      date_paid: new Date().toISOString().split('T')[0]
    })

    if (!error) {
      loadData() // Reload data untuk update summary
    } else {
      console.error('Error adding payment:', error)
      alert('Error menambahkan pembayaran')
    }
  }

  const handleAddExpense = async (name: string, qty: number, price: number, notes?: string) => {
    const { error } = await supabase.from('expenses').insert({
      name,
      qty,
      price,
      notes,
      date: new Date().toISOString().split('T')[0]
    })

    if (!error) {
      loadData()
    } else {
      console.error('Error adding expense:', error)
      alert('Error menambahkan pengeluaran')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat data kas kelas...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">💰 Kas Kelas</h1>
          <p className="text-gray-600">Sistem manajemen uang kas kelas yang mudah dan efisien</p>
        </div>

        {/* Dashboard Summary */}
        <Dashboard summary={summary} />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Kolom Kiri */}
          <div className="space-y-6">
            <StudentList 
              students={students}
              payments={payments}
              onAddPayment={handleAddPayment}
              currentWeek={currentWeek}
            />
            <CopyReport 
              students={students}
              payments={payments}
              currentWeek={currentWeek}
            />
          </div>

          {/* Kolom Kanan */}
          <div className="space-y-6">
            <ExpenseManager 
              expenses={expenses}
              onAddExpense={handleAddExpense}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-500 text-sm mt-12">
          <p>Sistem Kas Kelas • Dibuat dengan ❤️ untuk kemudahan mengelola keuangan kelas</p>
        </div>
      </div>
    </div>
  )
}
