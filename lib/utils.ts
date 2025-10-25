export const getCurrentWeekRange = () => {
  const today = new Date()
  const day = today.getDay()
  const diff = today.getDate() - day + (day === 0 ? -6 : 1)
  const monday = new Date(today.setDate(diff))
  const friday = new Date(today.setDate(diff + 4))
  
  return {
    start: monday.toISOString().split('T')[0],
    end: friday.toISOString().split('T')[0],
    display: `${monday.getDate()} - ${friday.getDate()}/${monday.getMonth() + 1}/${monday.getFullYear()}`
  }
}

export const formatCurrency = (amount: number): string => {
  return `Rp ${amount.toLocaleString('id-ID')}`
}

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('id-ID')
}
