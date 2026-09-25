"use client";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
const url=process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey=process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
export const supabase: SupabaseClient|null=url&&anonKey?createClient(url,anonKey):null;
export interface HealthData{height?:number;weight?:number;sleepHours?:number;activityMinutes?:number;smokingStatus?:"never"|"former"|"current";systolic?:number;diastolic?:number;restingHR?:number;totalChol?:number;ldl?:number;hdl?:number;sex?:"male"|"female";}
export async function writeHealthTelemetry(data:HealthData){if(!supabase)return{ok:false,reason:"Supabase is not configured."};const{error}=await supabase.from("diagnostic_ledger").insert([{metric_type:"health_session",metric_values:data,source_reference:"HEALTHCARE-2050-DEMO"}]);if(error)return{ok:false,reason:error.message};return{ok:true};}
