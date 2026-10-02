import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://rvcxnffzilvnwvdbncpc.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ2Y3huZmZ6aWx2bnd2ZGJuY3BjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA4ODYwMzgsImV4cCI6MjEwNjQ2MjAzOH0.CBnO_8vbAKrs_QUuTQMaKQJgXPxyF9oP-hbDwYopXdU'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
