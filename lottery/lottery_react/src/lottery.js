import web3 from './web3'

const address = '0x610A81E921B2dA10C6F284683786709b9d312D09'

const abi = [
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor',
    constant: undefined,
    payable: undefined,
    signature: 'constructor'      
  },
  {
    inputs: [],
    name: 'getPlayers',
    outputs: [ [Object] ],        
    stateMutability: 'view',      
    type: 'function',
    constant: true,
    payable: undefined,
    signature: '0x8b5b9ccc'
  },
  {
    inputs: [],
    name: 'manager',
    outputs: [ [Object] ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
    payable: undefined,
    signature: '0x481c6a75'
  },
  {
    inputs: [],
    name: 'participate',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
    constant: undefined,
    payable: true,
    signature: '0xd11711a2'
  },
  {
    inputs: [],
    name: 'pickWinner',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
    constant: undefined,
    payable: undefined,
    signature: '0x5d495aea'
  },
  {
    inputs: [ [Object] ],
    name: 'players',
    outputs: [ [Object] ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
    payable: undefined,
    signature: '0xf71d96cb'
  },
  {
    inputs: [],
    name: 'random',
    outputs: [ [Object] ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
    payable: undefined,
    signature: '0x5ec01e4d'
  }
]

  export default new web3.eth.Contract(abi, address)