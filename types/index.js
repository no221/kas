export interface Student {
  id: string
  name: string
  total_weeks: number
  total_paid: number
  created_at: string
}

export interface Payment {
  id: string
  student_id: string
  student?: Student
  amount: number
  week_start: string
  week_end: string
  date_paid: string
  created_at: string
}

export interface Expense {
  id: string
  name: string
  qty: number
  price: number
  date: string
  notes?: string
  created_at: string
}

export interface Summary {
  total_income: number
  total_expenses: number
  balance: number
}

export interface MonthlyReport {
  month: string
  total_income: number
  total_expenses: number
  balance: number
  payments: Payment[]
  expenses: Expense[]
}
