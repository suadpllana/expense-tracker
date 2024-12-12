import React from 'react'
import {useState , useRef , useEffect} from "react"
const Expense = () => {

   

    const [transactions , setTransaction] = useState(() => {
        const savedData = localStorage.getItem("myData");
        return savedData ? JSON.parse(savedData) : [];
      })
    const inputRef = useRef(null)
    const amountRef = useRef(null)

    useEffect(() => {
        localStorage.setItem("myData", JSON.stringify(transactions));
      }, [transactions]);

    function addTransaction(){
        if(inputRef.current.value === "" || amountRef.current.value === "" || amountRef.current.value == 0
           || amountRef.current.value < 0 && Math.abs(amountRef.current.value) > total 
        ){
            return
        }
       
      
        
        setTransaction((prev) =>[
            ...prev, 
            {
                text: inputRef.current.value,
                amount: (parseFloat(amountRef.current.value)).toFixed(2),
                id: Math.random()
            }]
        )
        
      
   
       
        
    }
   
 
    function deleteTransaction(id){
        const filteredTransactions = transactions.filter((transaction) => transaction.id !== id)
        setTransaction(filteredTransactions)
 
    }


    const amount = transactions.map((transaction) => parseFloat(transaction.amount))
    const income = amount.filter(item => item > 0).reduce((acc,item) => (acc + item), 0).toFixed(2)
    const expenses = amount.filter(item => item < 0).reduce((acc,item) => (acc + item),0).toFixed(2) * -1
    const total = amount.reduce((acc,cum) => acc + cum , 0).toFixed(2)
    
  return (
    <div className="container">
        <h1>Expense Tracker</h1>
        <h2>Your Balance <br /> {Number.isInteger(total) ? total + ".00" : total}$</h2>
        <div className="budget">
            <div className="income">Income <br /> <span className="money">{Number.isInteger(income) ? income + ".00" : income}$</span></div>
            <div className="expense">Expenses <br /> <span className="money">{Number.isInteger(expenses) ? expenses + ".00" : expenses}$</span></div>
           
        </div>    



        <h2>History</h2>
        <hr />


        <div className="expenseTracker">
            {transactions.map((transaction) => (
                <>
                 <div key={Math.random()} className="transaction" >
                    <p>{transaction.text} <span>{transaction.amount > 0  ? "+" + transaction.amount + "$"  : transaction.amount + "$"}</span></p>
                    <div className={parseInt(transaction.amount) > 0  ? "green" :"red"}></div>
                    <button className="deleteTransaction" onClick={() => deleteTransaction(transaction.id)}>X</button>
                </div>
               
                </>
               
            ))}

        </div>


        <h2>Add new transaction</h2>
        <hr />
        <p>Transaction Name</p>
        <input type="text" placeholder="Write transaction name"  ref={inputRef}/>
        <p>Transaction Amount</p>
        <p>(<strong>positive - income , negative - expense</strong>)</p>
        <input type="text" placeholder="Write transaction amount" ref={amountRef}/><br /><br />
        <button className="transaction-button" onClick={addTransaction}>Add Transaction</button>
    </div>
  )
}

export default Expense
