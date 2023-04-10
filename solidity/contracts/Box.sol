// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./access-control/Auth.sol";

contract Box {
  uint256 private value;
  Auth private auth;

  event ValueChanged(uint256 _value);

  constructor() {
    auth = new Auth(msg.sender);
  }

  function store(uint256 _value) public {
    require(auth.isAdministrator(msg.sender), "Unauthorized");

    value = _value;
    emit ValueChanged(_value);
  }

  function retrieve() public view returns (uint256) {
    return value;
  }
}
