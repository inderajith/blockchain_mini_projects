import React, {useState, useEffect} from 'react'
import lottery from './lottery';
import web3 from './web3';

function App() {

  const [manager, setManager] = useState('')
  const [players, setplayers] = useState([])
  const [balance, setBalance] = useState('')
  const [value, setValue] = useState('')
  const [accounts, setAccounts] = useState([])
  const [message, setMessage] = useState('')  

    const onSubmit = async (e) => {
      e.preventDefault()

      setMessage('Your transaction is being processing...')
      
      await lottery.methods.participate().send({
        from: accounts[0],
        value: web3.utils.toWei(value, 'ether')
      })
      setMessage('Transaction success')
    }

    const onPickWinner = async () => {
      const accounts = await web3.eth.getAccounts()

      setMessage('Waiting for transaction success...')

      await lottery.methods.pickWinner().send({
        from : accounts[0]
      })

      setMessage('A winner has been picked')
    }
    
    useEffect(() => {
      async function fetchData() {
        console.log('lottery.methods: ', lottery.methods);
        const accountss = await window.ethereum.request({ method: 'eth_accounts' })        
        const managerName = await lottery.methods.manager.call()
        console.log('managerName: ', managerName);
        const players = await lottery.methods.getPlayers().call()
        const balance = await web3.eth.getBalance(lottery.options.address)       
        setAccounts(accountss) 
        // setManager(managerName)
        setplayers(players)
        setBalance(balance)
      }
      fetchData()

    }, [])
    
    // console.log('manager: ', manager);
    return (
      <div>
        <h1>This is lottery contract</h1>
        <p>The contract owner is {manager}</p>
        <p>There are currently {players.length} peoples competiting to win {web3.utils.fromWei(balance, 'ether')} ether</p>
        <hr/>
        <form onSubmit={onSubmit}>
          <h4>Want to try your luck</h4>
          <div>
            <label>Amount of ether to enter</label>
            <input type="text" onChange={(e) => setValue(e.target.value) } value={value} />
          </div>
          <button>Enter</button>
        </form>
        <hr/>

        <h4>Ready to pick a winner!</h4>
        <button onClick={onPickWinner}>Pick Winner</button>
        <hr/>
        <h1>{message}</h1>
    </div>
  );
}

export default App;


// import React, {useState, useEffect} from 'react'

// const App = () => {

//   const [count, setCount] = useState(0)
//   const [countt, setCountt] = useState(110)

//   useEffect(() => {
//     setCount(count + 1)
//     console.log('hi');
//     setCountt(countt + 1)
//     console.log('bye');
//   }, [])

//   console.log('count: ', count);
//   console.log('countttttt: ', countt);
//   return (
//     <div>
//       <h1>hii</h1>
//     </div>
//   )
// }

// export default App

