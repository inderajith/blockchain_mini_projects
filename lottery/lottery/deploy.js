const HDWalletProvider = require('truffle-hdwallet-provider')
const Web3 = require('web3')
const datas = require('./compile')

const interfaces = datas.abi
const bytecode = datas.evm.bytecode.object

const provider = new HDWalletProvider(
    /*Your mnemonic phrase*/,
    'https://rinkeby.infura.io/v3/12127aefa90747dc9bffa66b113b3924'
)

const web3 = new Web3(provider)

const deploy = async () => {
    const accounts = await web3.eth.getAccounts()

    console.log('Attempting to deploy contract from ', accounts[0]);

    const result = await new web3.eth.Contract(interfaces)
                                 .deploy({data: bytecode})
                                 .send({gas: '1000000', from: accounts[0]})
    console.log(interfaces);                                 
    console.log('Contract deployed to ', result.options.address);
}

deploy()