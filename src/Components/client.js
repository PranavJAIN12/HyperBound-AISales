
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qrnzawlfaxjttsltusqx.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFybnphd2xmYXhqdHRzbHR1c3F4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ4Mjg1MzEsImV4cCI6MjA0MDQwNDUzMX0.JcFoNL_9Qam0poe7mKs7AZrS3Di2x0n5Ot3xOVRrWjc'
export const supabase = createClient(supabaseUrl, supabaseKey)