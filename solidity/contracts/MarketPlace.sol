// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "@openzeppelin/contracts/utils/Counters.sol"; // Bộ đếm
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol"; // Tiêu chuẩn viết hợp đồng
import "@openzeppelin/contracts/token/ERC721/ERC721.sol"; // Để kế thừa _tokenURL
import "hardhat/console.sol";

contract NFTMarketplace is ERC721URIStorage {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;
  Counters.Counter private _itemsSold;
  uint256 listingPrice = 0.00025 ether; // Giá tiền trả cho sàn
  address payable owner; // địa chỉ chủ chợ
  mapping(uint256 => MarketItem) private idToMarketItem;
  struct MarketItem {
    uint256 tokenId;
    address payable seller; // địa chỉ thg bán
    address payable owner; // địa chỉ ng tạo ra
    uint256 price; // giá nft
    uint time;
    bool sold; //đã được bán hay chưa
  }
  event MarketItemCreated(
    //event
    uint256 indexed tokenId,
    address seller,
    address owner,
    uint256 price,
    uint time,
    bool sold
  );

  constructor() ERC721("ThanhThuy", "TT") {
    owner = payable(msg.sender);
  }

  function updateListingPrice(uint _listingPrice) public payable {
    require(
      owner == msg.sender,
      "Only marketplace owner can update listing price."
    );
    listingPrice = _listingPrice; // điều chỉnh giá thuê sàn
  }

  function getListingPrice() public view returns (uint256) {
    return listingPrice;
  }

  function createToken(
    string memory tokenURI,
    uint256 price
  ) public payable returns (uint) {
    _tokenIds.increment(); //tăng id
    uint256 newTokenId = _tokenIds.current(); //tạo id mới
    _mint(msg.sender, newTokenId); // tạo ra nft
    _setTokenURI(newTokenId, tokenURI);
    createMarketItem(newTokenId, price); // tạo item
    return newTokenId;
  }

  function createMarketItem(uint256 tokenId, uint256 price) private {
    // đẩy item lên sản
    require(price > 0, "Price must be at least 1 wei");
    require(msg.value == listingPrice, "Price must be equal to listing price");
    idToMarketItem[tokenId] = MarketItem(
      tokenId,
      payable(msg.sender),
      payable(address(this)),
      price,
      block.timestamp,
      false
    );
    _transfer(msg.sender, address(this), tokenId);
    emit MarketItemCreated(
      tokenId,
      msg.sender,
      address(this),
      price,
      block.timestamp,
      false
    );
  }

  function resellToken(uint256 tokenId, uint256 price) public payable {
    // bán lại sau khi mua
    require(
      idToMarketItem[tokenId].owner == msg.sender,
      "Only item owner can perform this operation"
    );
    require(msg.value == listingPrice, "Price must be equal to listing price");
    idToMarketItem[tokenId].sold = false;
    idToMarketItem[tokenId].price = price;
    idToMarketItem[tokenId].seller = payable(msg.sender);
    idToMarketItem[tokenId].owner = payable(address(this));
    idToMarketItem[tokenId].time = block.timestamp;
    _itemsSold.decrement();
    _transfer(msg.sender, address(this), tokenId);
  }

  function createMarketSale(uint256 tokenId) public payable {
    // mua item
    uint price = idToMarketItem[tokenId].price;
    address payable creator = idToMarketItem[tokenId].seller;
    require(
      msg.value == price,
      "Please submit the asking price in order to complete the purchase"
    );
    idToMarketItem[tokenId].owner = payable(msg.sender);
    idToMarketItem[tokenId].sold = true;
    idToMarketItem[tokenId].seller = payable(address(0));
    idToMarketItem[tokenId].time = block.timestamp;
    _itemsSold.increment();
    _transfer(address(this), msg.sender, tokenId);
    payable(owner).transfer(listingPrice);
    payable(creator).transfer(msg.value);
  }

  function fetchMarketItems() public view returns (MarketItem[] memory) {
    // lấy tất cả item có trên sàn
    uint itemCount = _tokenIds.current();
    uint unsoldItemCount = _tokenIds.current() - _itemsSold.current();
    uint currentIndex = 0;
    MarketItem[] memory items = new MarketItem[](unsoldItemCount);
    for (uint i = 0; i < itemCount; i++) {
      if (idToMarketItem[i + 1].owner == address(this)) {
        uint currentId = i + 1;
        MarketItem storage currentItem = idToMarketItem[currentId];
        items[currentIndex] = currentItem;
        currentIndex += 1;
      }
    }
    return items;
  }

  function fetchMarketItemsUpComing()
    public
    view
    returns (MarketItem[] memory)
  {
    // lấy tất cả item có trên sàn
    uint totalItemCount = _tokenIds.current();
    uint itemCount = 0;
    uint currentIndex = 0;
    for (uint i = 0; i < totalItemCount; i++) {
      if (
        idToMarketItem[i + 1].owner == address(this) &&
        idToMarketItem[i + 1].time >= block.timestamp - 1 days
      ) {
        itemCount += 1;
      }
    }
    MarketItem[] memory items = new MarketItem[](itemCount);
    for (uint i = 0; i < totalItemCount; i++) {
      if (
        idToMarketItem[i + 1].owner == address(this) &&
        idToMarketItem[i + 1].time >= block.timestamp - 1 days
      ) {
        uint currentId = i + 1;
        MarketItem storage currentItem = idToMarketItem[currentId];
        items[currentIndex] = currentItem;
        currentIndex += 1;
      }
    }
    return items;
  }

  function fetchMarketItemsPast() public view returns (MarketItem[] memory) {
    // lấy tất cả item có trên sàn
    uint totalItemCount = _tokenIds.current();
    uint itemCount = 0;
    uint currentIndex = 0;
    for (uint i = 0; i < totalItemCount; i++) {
      if (
        idToMarketItem[i + 1].owner == address(this) &&
        idToMarketItem[i + 1].time < block.timestamp - 1 days
      ) {
        itemCount += 1;
      }
    }
    MarketItem[] memory items = new MarketItem[](itemCount);
    for (uint i = 0; i < totalItemCount; i++) {
      if (
        idToMarketItem[i + 1].owner == address(this) &&
        idToMarketItem[i + 1].time < block.timestamp - 1 days
      ) {
        uint currentId = i + 1;
        MarketItem storage currentItem = idToMarketItem[currentId];
        items[currentIndex] = currentItem;
        currentIndex += 1;
      }
    }
    return items;
  }

  function fetchMyNFTs() public view returns (MarketItem[] memory) {
    // lấy item của mình đã mua
    uint totalItemCount = _tokenIds.current();
    uint itemCount = 0;
    uint currentIndex = 0;
    for (uint i = 0; i < totalItemCount; i++) {
      // check if nft is mine
      if (idToMarketItem[i + 1].owner == msg.sender) {
        itemCount += 1;
      }
    }
    MarketItem[] memory items = new MarketItem[](itemCount);
    for (uint i = 0; i < totalItemCount; i++) {
      if (idToMarketItem[i + 1].owner == msg.sender) {
        uint currentId = i + 1;
        MarketItem storage currentItem = idToMarketItem[currentId];
        items[currentIndex] = currentItem;
        currentIndex += 1;
      }
    }
    return items;
  }

  function fetchItemsListed() public view returns (MarketItem[] memory) {
    // items tạo ra đang bán
    uint totalItemCount = _tokenIds.current();
    uint itemCount = 0;
    uint currentIndex = 0;
    for (uint i = 0; i < totalItemCount; i++) {
      if (idToMarketItem[i + 1].seller == msg.sender) {
        itemCount += 1;
      }
    }
    MarketItem[] memory items = new MarketItem[](itemCount);
    for (uint i = 0; i < totalItemCount; i++) {
      if (idToMarketItem[i + 1].seller == msg.sender) {
        uint currentId = i + 1;
        MarketItem storage currentItem = idToMarketItem[currentId];
        items[currentIndex] = currentItem;
        currentIndex += 1;
      }
    }
    return items;
  }

  function fetchItemsSeller(
    address sellerAddress
  ) public view returns (MarketItem[] memory) {
    // items theo dia chi
    uint totalItemCount = _tokenIds.current();
    uint itemCount = 0;
    uint currentIndex = 0;
    for (uint i = 0; i < totalItemCount; i++) {
      if (idToMarketItem[i + 1].seller == sellerAddress) {
        itemCount += 1;
      }
    }
    MarketItem[] memory items = new MarketItem[](itemCount);
    for (uint i = 0; i < totalItemCount; i++) {
      if (idToMarketItem[i + 1].seller == sellerAddress) {
        uint currentId = i + 1;
        MarketItem storage currentItem = idToMarketItem[currentId];
        items[currentIndex] = currentItem;
        currentIndex += 1;
      }
    }
    return items;
  }
}
