const assert = require('assert')
const ganache = require('ganache-cli')
const Web3 = require('web3')

const datas = require('../compile')

const interfaces = datas.abi
const bytecode = datas.evm.bytecode.object

const web3 = new Web3(ganache.provider())
let lottery
let accounts

beforeEach(async () => {
    accounts = await web3.eth.getAccounts()    

    lottery = await new web3.eth.Contract(interfaces)
                                .deploy({data: bytecode})
                                .send({from: accounts[0], gas:1000000})
})

describe('Lottery Contract', () => {
    it('deploys contract', () => {
        assert.ok(lottery.options.address)
    })

    // it('allows one account to enter',async () => {
    //     await lottery.methods.participate().send({
    //         from : accounts[0],
    //         value: web3.utils.toWei('0.02', 'ether')
    //     })        

    //     const players = await lottery.methods.getPlayers().call()

    //     assert.strictEqual(accounts[0], players[0])
    //     assert.strictEqual(1, players.length)
    // })

    // it('allows multiple account to enter',async () => {        
    //     await lottery.methods.participate().send({
    //         from : accounts[0],
    //         value: web3.utils.toWei('0.02', 'ether')
    //     })
    //     await lottery.methods.participate().send({
    //         from : accounts[1],
    //         value: web3.utils.toWei('0.02', 'ether')
    //     })
    //     await lottery.methods.participate().send({
    //         from : accounts[2],
    //         value: web3.utils.toWei('0.02', 'ether')
    //     })

    //     const players = await lottery.methods.getPlayers().call()

    //     assert.strictEqual(accounts[0], players[0])
    //     assert.strictEqual(accounts[1], players[1])
    //     assert.strictEqual(accounts[2], players[2])
    //     assert.strictEqual(3, players.length)
    // })

    // it('requires a minimum amount of ether to enter', async () => {
    //     try{
    //         await lottery.methods.participate().send({
    //             from: accounts[0],
    //             value:0
    //         })
    //         assert(false)
    //     }catch(err){
    //         assert(err)
    //     }        
    // })

    // it('only manager can call pick winner', async () => {
    //     try{
    //         await lottery.methods.pickWinner().send({
    //             from: accounts[1]
    //         })
    //         assert(false)
    //     }catch(err){
    //         assert(err)
    //     }
    // })

    it('receives money to ether and resets players', async () => {
        await lottery.methods.participate().send({
            from : accounts[0],
            value: web3.utils.toWei('2', 'ether')
        })      

        const initialBalance = await web3.eth.getBalance(accounts[0]);
        await lottery.methods.pickWinner().send({from : accounts[0]})
        const finalBalance = await web3.eth.getBalance(accounts[0]);
        const difference =  finalBalance - initialBalance        
        const playersLen = await lottery.methods.getPlayers().call()        
        const ethInContract = await web3.eth.getBalance(lottery.options.address)          
        assert.equal(playersLen.length, 0)
        assert.equal(ethInContract, 0)
        assert(difference > web3.utils.toWei('1.8', 'ether'))        
    })
})