"use client"


import React, { useEffect, useState } from "react";

import { db } from "@/utils/dbconfig";
import { eq, getTableColumns, sql , desc } from "drizzle-orm";
import { Budgets, Expenses } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";

import CardInfo from './_components/CardInfo';
import Barchart from './_components/Barchart';
import BudgetItem from './budgets/_components/BudgetItem'
import ExpenseListTable from './expenses/_components/ExpenseListTable'



function dashboard() {

  const {user} = useUser() ;

 const [budgetList, setBudgetList] = useState();
 const [expensesList , setExpensesList] = useState([])

  useEffect(()=>{
    user&&getBudgetList();
    
    
  } , [user])
  
  
  const getBudgetList = async ()=>{
    
    const result = await db.select({
      ...getTableColumns(Budgets),
      totalSpend: sql `sum(${Expenses.amount})`.mapWith(Number),
      totalItem: sql `count(${Expenses.id})`.mapWith(Number)
    }).from(Budgets)
    .leftJoin(Expenses,eq(Budgets.id,Expenses.budgetId))
    .where(eq(Budgets.createdBy,user?.primaryEmailAddress?.emailAddress))
    .groupBy(Budgets.id)
    .orderBy(desc(Budgets.id))
    
    
    setBudgetList(result);
    getAllExpenses();
}

const getAllExpenses = async()=>{
  const result = await db.select({
    id:Expenses.id,
    name:Expenses.name,
    amount:Expenses.amount,
    createdAt:Expenses.createdAt
  }).from(Budgets)
  .rightJoin(Expenses,eq(Budgets.id,Expenses.budgetId))
  .where(eq(Budgets.createdBy,user?.primaryEmailAddress.emailAddress))
  .orderBy(desc(Expenses.id))

  setExpensesList(result)
}


return (
  <div className='p-8'>
    <h2 className='font-bold text-3xl'>Hi, {user?.fullName} </h2>
    <p className='text-gray-400'>Here's what happenning with your money, Let's Manage your expense !</p>

    {budgetList === undefined ? (
      <p className='font-bold '>Loading Information...</p>
    ) : (
      <CardInfo budgetList={budgetList} />
    )}

    <div className='grid grid-cols-1 md:grid-cols-3 mt-6 gap-5'>
      <div className='md:col-span-2'>
        <Barchart budgetList={budgetList}/>
        
        <ExpenseListTable 
      expensesList={expensesList}
      reFreshData={()=> getBudgetList}/>
      </div>
     
     

      <div className='grid gap-5'>
        <h2 className='font-bold text-lg'>Latest Budgets</h2>
       {budgetList?.map((budget,index)=>(
        <BudgetItem budget={budget} key={index}/>
       ))}
      </div>
    </div>
  </div>
);
}

export default dashboard