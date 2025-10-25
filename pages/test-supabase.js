import { supabase } from '../lib/supabaseClient'

export default async function TestSupabase() {
  const { data, error } = await supabase.from('students').select('*')

  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>
  return <pre>{JSON.stringify(data, null, 2)}</pre>
}
