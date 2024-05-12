import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema'
const sql = neon('postgresql://Expensedb_owner:CeViSO2JH1cz@ep-super-frog-a12dfb23.ap-southeast-1.aws.neon.tech/budgets?sslmode=require');
export const db = drizzle(sql , {schema});