import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

dotenv.config()

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
)

const studentsData = [
  { name: "Albert", total_weeks: 3, total_paid: 30000 },
  { name: "Darren", total_weeks: 1, total_paid: 10000 },
  { name: "Devina", total_weeks: 2, total_paid: 20000 },
  { name: "Ethan", total_weeks: 1, total_paid: 10000 },
  { name: "Hans", total_weeks: 3, total_paid: 30000 },
  { name: "Isabel", total_weeks: 6, total_paid: 60000 },
  { name: "Meysa", total_weeks: 2, total_paid: 20000 },
  { name: "Melben", total_weeks: 9, total_paid: 90000 },
  { name: "Morgan", total_weeks: 3, total_paid: 30000 },
  { name: "Nesha", total_weeks: 3, total_paid: 30000 },
  { name: "Nicho", total_weeks: 1, total_paid: 10000 },
  { name: "Rebecca", total_weeks: 5, total_paid: 50000 },
  { name: "Sheren", total_weeks: 1, total_paid: 10000 },
  { name: "Shiva", total_weeks: 3, total_paid: 30000 },
  { name: "Steven", total_weeks: 3, total_paid: 30000 },
  { name: "Chloe", total_weeks: 2, total_paid: 20000 },
  { name: "Julieta", total_weeks: 1, total_paid: 10000 },
  { name: "Lovely", total_weeks: 1, total_paid: 10000 },
  { name: "Michelle", total_weeks: 1, total_paid: 10000 },
  { name: "Yenni", total_weeks: 1, total_paid: 10000 },
  { name: "Sultanto", total_weeks: 2, total_paid: 20000 }
]

async function seedData() {
  console.log('🌱 Memulai seeding data siswa...')
  
  // Clear existing data
  await supabase.from('payments').delete().neq('id', '')
  await supabase.from('expenses').delete().neq('id', '')
  await supabase.from('students').delete().neq('id', '')
  
  // Insert students
  for (const student of studentsData) {
    const { data, error } = await supabase
      .from('students')
      .insert([student])
      .select()
    
    if (error) {
      console.error(`❌ Error inserting ${student.name}:`, error)
    } else {
      console.log(`✅ ${student.name} inserted`)
    }
  }
  
  console.log('🎉 Data seeding completed!')
  console.log(`📊 Total ${studentsData.length} siswa telah ditambahkan`)
}

seedData()
