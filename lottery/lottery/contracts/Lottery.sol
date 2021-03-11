//SPDX-License-Identifier: UNLICENSED

pragma solidity >0.7.0;

contract Lottery{
    address public manager;
    address[] public  players;
    
    constructor(){
        manager = msg.sender;
    }
    
    function participate() public payable{
        require(msg.value > 0.01 ether, "minimum 0.01 ether is needed to participate");
        players.push(msg.sender);
    }
    
    function random() public view returns(uint){
        return uint(keccak256(abi.encodePacked(block.timestamp, block.difficulty, players)));
    }
    
    function pickWinner() public verify {
        uint winner = random() % players.length;
        payable(players[winner]).transfer(address(this).balance);
        players = new address payable[](0);
        
    }
    
    function getPlayers() public view returns( address[] memory ){
        return players;
    }
    
    modifier verify(){
        require(msg.sender == manager);
        _;
    }
    
    
}

