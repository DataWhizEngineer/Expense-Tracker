import React from 'react'
import {Trash} from"lucide-react"
import { db } from "@/utils/dbconfig";
import { Expenses , Budgets } from "@/utils/schema";
import { toast } from 'sonner';
import { eq } from "drizzle-orm";

function ExpenseListTable({expensesList , reFreshData}) {

 const deleteExpense = async (expense)=>{
     
    const result=await db.delete(Expenses)
    .where(eq(Expenses.id , expense.id))
    .returning();

    if(result){
        toast('Expense Deleted');
        reFreshData();
    }
 }

  return (
    <div className='mt-3'>
        <h2 className="font-bold text-lg">Latest Expenses</h2>
        <div className='grid grid-cols-4 bg-slate-200 p-2'>
            <h2 claassName='font-bold'>Name</h2>
            <h2 claassName='font-bold'>Amount</h2>
            <h2 claassName='font-bold'>Date</h2>
            <h2 claassName='font-bold'>Action</h2>
        </div>
        {expensesList?.map((expenses , index)=> (
            <div className='grid grid-cols-4 bg-slate-50 p-2'>
            <h2>{expenses.name}</h2>
            <h2>{expenses.amount}</h2>
            <h2>{expenses.createdAt}</h2>
            <h2>
                <Trash className='text-red-600 cursor-pointer'
                onClick={()=> deleteExpense(expenses)}/>
            </h2>
        </div>

        ))}
    </div>
  )
}

export default ExpenseListTable