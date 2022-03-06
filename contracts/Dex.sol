// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 < 0.9.0;
pragma abicoder v2;

import "./Wallet.sol";
import "hardhat/console.sol";

contract Dex is Wallet {

  using SafeMath for uint256;

  enum Side {BUY, SELL} // 0, 1

  struct Order {
    uint256 id;
    address trader;
    Side side;
    bytes32 ticker;
    uint256 amount;
    uint256 price;
    uint256 filled;
  }

  uint public nextOrderId = 0;

  // as enum
  // order.side = Side.BUY;
  // as boolean
  // order.BUY = true;

  mapping(bytes32 => mapping(uint256 => Order[])) public OrderBook;

  event LimitOrder(Side side, bytes32 indexed ticker, uint256 amount, uint256 price);
  event MarketOrder(Side side, bytes32 indexed ticker, uint256 amount);

  function getOrderBook(bytes32 ticker, Side side) public view returns(Order[] memory) {
    return OrderBook[ticker][uint(side)];
    //getOrderBook(bytes32("LINK"), Side.BUY); Filip converts it here but says it's not
    //necessary as we have done it above
  }

  function depositEth() external payable {
    balances[msg.sender][bytes32("ETH")] = balances[msg.sender][bytes32("ETH")].add(msg.value);
  }

  function createLimitOrder(Side side, bytes32 ticker, uint256 amount, uint256 price) public {
      if(side == Side.BUY) {
        require(balances[msg.sender]["ETH"] >= amount.mul(price), "Not enough Eth balance");
        
      } else if (side == Side.SELL) {
        require(balances[msg.sender][ticker] >= amount, "Low token balance");
      }

      // order is maintained
      Order[] storage orders = OrderBook[ticker][uint(side)];
      orders.push(
        Order(nextOrderId, msg.sender, side, ticker, amount, price, 0));

       //Bubble sort
      uint i = orders.length > 0 ? orders.length - 1 : 0;
      //defines the start, if array is empty it equals 0; if not...it starts one before the last index

      // older way to write this condition:
      /*
      uint i = 0;
      if (orders.length > 0) {
        //subtract 1 from index orders.length
          i = orders.length -1
         // or else
      } else {
        i = 0
      }
      */

      // STEPS FOR BUBBLE SORT FUNCTION EXPLAINED

      // check first if any sorting is necessary
      // example: [10, 5, 3] -> no sorting needed

      // [10, 5, 6] => here, we need sorting -> index - 1 is #5; we save it into memory
      // 5 // Order memory swap = orders[i - 1]; // saved to memory
      // 6 // orders[i - 1] = orders[i]; 6 is moved (- 1) in the array 
      // [10, 6,]
      // orders[i] = swap; (5 was in memory)
      // result reposition index ftom
      // [10, 6, 5]
      //         *
      // i--;
      // [10, 6, 5]
      //      *
      // compare again
      // 10 > 6 -> okay
      // done

      // for Selling is the opposite: [1, 5, 10] -> is 5 < 10; then okay and so on...

      if(side == Side.BUY){
        while(i > 0) {
          if (orders[i - 1].price > orders[i].price) {
            break; // if index minus 1; price is greater than the next indexed order price, stop - it's already ordered
          }
          Order memory swap = orders[i - 1];
          orders[i - 1] = orders[i];
          orders[i] = swap;
          i--; // this swaps the orders so that they are in the correct order
        }
        
      }
      else if(side == Side.SELL){
        while(i > 0) {
          if (orders[i -1].price < orders[i].price) {
            break;
          }
          Order memory swap = orders[i - 1];
          orders[i - 1] = orders[i];
          orders[i] = swap;
          i--;
        }
        
      }
      nextOrderId++;

      emit LimitOrder(side, ticker, amount, price);
      
  }

  function createMarketOrder(Side side, bytes32 ticker, uint amount) public {
    if(side == Side.SELL) {
      // wrap this into an if statement for sell orders
      require(balances[msg.sender]["ETH"] >= amount, "Insufficient balance");
    }

    uint orderBookSide;

    if(side == Side.BUY) {
      orderBookSide = 1;
    } else {
      orderBookSide = 0;
    }
    
    Order[] storage orders = OrderBook[ticker][orderBookSide];

    uint totalFilled = 0;

    for (uint256 i = 0; i < orders.length && totalFilled < amount; i++) {

      uint leftToFill = amount.sub(totalFilled); //amount minus totalFill // 200
      uint availableToFill = orders[i].amount.sub(orders[i].filled); //order.amount - order.filled // 100
      uint filled = 0;
      
      // how much we can fill from order[i]
      // update totalFilled; (once exiting loop)
      if(availableToFill > leftToFill) {
        filled = leftToFill; //fill the entire market order
      } else { //availableToFill <= leftToFill
        filled = availableToFill; //fill as much as is available in order[i]
      }

      totalFilled = totalFilled.add(filled);
      orders[i].filled = orders[i].filled.add(filled);
      uint cost = filled.mul(orders[i].price);

      // execute the trade & shift balances between buyer/seller (of each order -- subtract the balance)
      if(side == Side.BUY) {
        //verify buyer has enough ETH to cover the purchase (require)
         require(balances[msg.sender]["ETH"] >= cost);
         //execute the trade:

         //msg.sender is the buyer
         //transfer (add) ETH from Buyer to Seller and (sub) cost
         balances[msg.sender][ticker] = balances[msg.sender][ticker].add(filled);
         balances[msg.sender]["ETH"] = balances[msg.sender]["ETH"].sub(cost);

         //transfer (sub) Tokens from Seller to Buyer and (add) cost
         balances[orders[i].trader][ticker] = balances[orders[i].trader][ticker].sub(filled);
         balances[orders[i].trader]["ETH"] = balances[orders[i].trader]["ETH"].add(cost);
           
      }
      else if(side == Side.SELL) {
        //execute the trade:

        //msg.sender is the seller
        //transfer (sub) ETH from Buyer to Seller and (add) cost
        balances[msg.sender][ticker] = balances[msg.sender][ticker].sub(filled);
        balances[msg.sender]["ETH"] = balances[msg.sender]["ETH"].add(cost);
        
        //transfer (add) Tokens from Seller to Buyer and (sub) cost
        balances[orders[i].trader][ticker] = balances[orders[i].trader][ticker].add(filled);
        balances[orders[i].trader]["ETH"] = balances[orders[i].trader]["ETH"].sub(cost);
      }
    }

    //loop through the orderbook and remove 100% of filled orders

  // [1,6,4,7,2] random, unsororted array
  // delete 6
  // pop[i] replace it with last element [i] 
  // [1,[2]4,7]
  // [1,2,4,7,10] sorted array

  // now delete 2 -- we must shift array
  // [1,2,4,7,10]
  //   [i+1] = [i]
  // [1,4,4,7,10]
  //     [i+1] = [i]
  // [1,4,7,7,10]
  //       [i+1] = [i]
  // [1,2,7,10,10]
  // pop[i] (last element)
  // [1,2,7,10]
  //-------------------
  // best prices are at top of array for BUY orders

  /*
  [
    Order(amount=10, filled=10), // order is completely filled
    Order(amount=100, filled=100), // order is completely filled
    Order(amount=25, filled=10), // here we can stop our loop since the order is only partially filled
    Order(amount=200, filled=0),
  ]
  */
  
  // continue to loop if our orders are filled and amounts are met and when the length of the array is greater than zero, otherwise, stop
    while(orders.length > 0 && orders[0].filled == orders[0].amount) {
      // Remove the top element in the orders array by overwriting every element
      // with the next element in the order list
      for(uint256 i = 0; i < orders.length - 1; i++) {
        orders[i] = orders[i + 1];
      }
      orders.pop();

      emit MarketOrder(side, ticker, amount);

       /*
        [ Order(amount=10, filled=10), // order is replaced by the next
          orders[i + 1]
          Order(amount=100, filled=100),
  
          Order(amount=100, filled=100), // order needs to be popped
          orders.pop()
         
          Order(amount=25, filled=10), // here we can stop our loop since the order is only partially filled
          Order(amount=200, filled=0),
        ]
      */

    }

  }
  
  

}