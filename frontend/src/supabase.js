import { createClient } from "@supabase/supabase-js";
// Supabaseの認証情報, ダッシュボードから取得
const supabase = createClient(
  "https://your-project.supabase.co", 
  "your-anon-key"                     
);

export default supabase;
