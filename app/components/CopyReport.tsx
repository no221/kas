'use client'
import { Student, Payment } from '@/types'
import { getCurrentWeekRange, formatDate } from '@/lib/utils'

interface CopyReportProps {
  students: Student[]
  payments: Payment[]
  currentWeek: string
}

export default function CopyReport({ students, payments, currentWeek }: CopyReportProps) {
  
  const copyReportToClipboard = () => {
    const reportText = generateReportText()
    navigator.clipboard.writeText(reportText)
    alert('📋 Laporan berhasil disalin ke clipboard!')
  }

  const generateReportText = () => {
    const weekText = currentWeek
    const currentMonthPayments = payments.filter(p => {
      const paymentDate = new Date(p.date_paid)
      return paymentDate.getMonth() === 9 && paymentDate.getFullYear() === 2025 // October 2025
    })

    const paidStudents = currentMonthPayments
      .map(payment => {
        const student = students.find(s => s.id === payment.student_id)
        return student ? { ...student, payment } : null
      })
      .filter(Boolean) as { name: string; total_weeks: number; total_paid: number; payment: Payment }[]

    const paidStudentNames = paidStudents.map(ps => ps.name)
    const unpaidStudents = students.filter(s => !paidStudentNames.includes(s.name))

    let report = `*A. Kas (${weekText}) :*\n\n`

    // List semua siswa dengan total minggu
    students.forEach((student, index) => {
      report += `${index + 1}. *${student.name}* ${student.total_weeks} minggu (${student.total_paid}k)\n`
    })

    report += `\n*B. Uang buat sir bayu*\n(pernikahan (5k) + uang duka (5k)\n*Total/org: Rp10.000*\n\n`
    report += `*Di talangin uang kas: total utk ${students.length} anak × 10k = Rp${students.length * 10000}*\n\n`
    report += `*Yang udh bayar:*\n`

    // List yang sudah bayar
    paidStudents.forEach((student, index) => {
      const formattedDate = formatDate(student.payment.date_paid).replace(/\//g, '/')
      report += `${index + 1}. *${student.name}:*✅️ 10k (${formattedDate})\n`
    })

    // List yang belum bayar
    unpaidStudents.forEach((student, index) => {
      report += `${paidStudents.length + index + 1}. *${student.name}:*\n`
    })

    return report
  }

  const previewReport = () => {
    return generateReportText().split('\n').map((line, index) => (
      <div key={index} className={`${line.startsWith('*') ? 'font-semibold' : ''} ${line.includes('✅') ? 'text-green-600' : ''}`}>
        {line}
      </div>
    ))
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">📋 Laporan Kas</h2>
        <button
          onClick={copyReportToClipboard}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2 font-medium"
        >
          📋 Copy Laporan
        </button>
      </div>

      <div className="bg-gray-50 p-4 rounded border max-h-80 overflow-y-auto">
        <div className="text-sm whitespace-pre-wrap font-mono">
          {previewReport()}
        </div>
      </div>
      
      <p className="text-xs text-gray-500 mt-2">
        Klik "Copy Laporan" untuk menyalin format yang sudah disiapkan
      </p>
    </div>
  )
}
