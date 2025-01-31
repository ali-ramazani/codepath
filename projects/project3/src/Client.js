import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://grstisyxkvqgpqxtpqzh.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdyc3Rpc3l4a3ZxZ3BxeHRwcXpoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAyNTExOTMsImV4cCI6MjA0NTgyNzE5M30.ZnQdKETF-XBxUEFDB2kctc5ikxhB6JLaOj1TBulNSLQ';


export const supabase = createClient(supabaseUrl, API_KEY);