'use client'
import { Student, Payment } from '@/types'
import { getCurrentWeekRange, formatCurrency, formatDate } from '@/lib/utils'

interface StudentListProps {
  students: Student[]
  payments: Payment[]
  onAddPayment: (studentId: string, amount: number) => void
  currentWeek: string
}

export default function StudentList({ 
  students, 
  payments, 
  onAddPayment, 
  currentWeek 
}: StudentListProps) {
  
  const getPaymentStatus = (studentId: string) => {
    const weekRange = getCurrentWeekRange()
    const hasPaid = payments.some(p => 
      p.student_id === studentId && 
      p.week_start === weekRange.start
    )
    return hasPaid
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">📊 Daftar Siswa - Minggu {currentWeek}</h2>
        <span className="text-sm text-gray-500">
          Total: {students.length} siswa
        </span>
      </div>
      
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {students.map((student) => {
          const hasPaid = getPaymentStatus(student.id)
          
          return (
            <div key={student.id} className={`flex justify-between items-center p-3 border rounded ${
              hasPaid ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'
            }`}>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-medium">{student.name}</p>
                  {hasPaid && (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                      ✅ Lunas
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500">
                  {student.total_weeks} minggu ({formatCurrency(student.total_paid)})
                </p>
              </div>
              
              <button
                onClick={() => onAddPayment(student.id, 10000)}
                disabled={hasPaid}
                className={`px-3 py-2 rounded text-sm font-medium ${
                  hasPaid 
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                    : 'bg-green-500 text-white hover:bg-green-600'
                }`}
              >
                {hasPaid ? 'Sudah Bayar' : 'Bayar 10k'}
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
