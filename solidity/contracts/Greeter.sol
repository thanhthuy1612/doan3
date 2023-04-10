// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "hardhat/console.sol";

contract Greeter {
  string private greeting;

  constructor(string memory _greeting) {
    console.log("Deploy a Greeter with greeting", _greeting);
    greeting = _greeting;
  }
}
