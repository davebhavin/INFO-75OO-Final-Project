pragma solidity >=0.4.21 <0.7.0;

contract Artplace {
    string public name;
    uint public ArtworkCount = 0;
    uint public ArtworkCount1 = 0;
    mapping(uint => Artwork) public Artworks;
    mapping(uint => ArtworkAuction) public Artworks1;
    mapping(address => uint) pendingReturns;

    constructor() public {
        name = "Art using Blockchain";
    }

    struct Artwork {
        uint id;
        string Artistname;
        string Artname;
        uint price;
        uint width;
        uint height;
        string Description;
        address payable owner;
        bool purchased;
    }
    struct ArtworkAuction {
        uint id;
        string Artname;
        uint price;
        uint  StartingBlockNum;
        uint  numBlocksActionOpen;
        address payable highestBidder;
        uint  highestBid;
        address payable owner1;
        bool ended;
    }
    event Artworkcreated (
        uint indexed id,
        string Artistname,
        string Artname,
        uint  price,
        uint  width,
        uint  height,
        string  Description,
        address payable indexed owner,
        bool indexed purchased,
        uint timestamp
    );
    event ArtworkPurchased (
        uint indexed id,
        string Artistname,
        string Artname,
        uint  price,
        uint  width,
        uint  height,
        string Description,
        address payable indexed  owner,
        bool indexed purchased,
          uint timestamp
    );
    event madeitavailable (
        uint indexed id,
        string Artistname,
        string Artname,
        uint  price,
        uint  width,
        uint  height,
        string Description,
        address payable indexed  owner,
        bool indexed purchased,
          uint timestamp
    );
    event madeitunavailable (
        uint indexed id,
        string Artistname,
        string Artname,
        uint  price,
        uint  width,
        uint  height,
        string Description,
        address payable indexed  owner,
        bool indexed purchased,
          uint timestamp
    );
    event SomeoneBid(address bidder, uint amount);
    event AuctionEnded(address winner, uint amount);
    function createArtwork(string memory _Artistname,string memory _Artname, uint _price, uint _width,uint _height,string memory _Description) public {
    // Require a valid Artist name
    require(bytes(_Artistname).length > 0);
    require(bytes(_Artname).length > 0);// Require a valid Art
    require(_price > 0);// Require a valid price
    require(_width > 0);// Require a valid width
    require(_height > 0);// Require a valid height
    require(bytes(_Description).length > 0);
    ArtworkCount ++;//increase count
    Artworks[ArtworkCount] = Artwork(ArtworkCount, _Artistname, _Artname,_price,_width,_height,_Description, msg.sender, false);
    emit Artworkcreated(ArtworkCount, _Artistname, _Artname,_price,_width,_height,_Description, msg.sender, false,block.timestamp);// Trigger an event
}

    function purchaseArtwork(uint _id) public payable {
        Artwork memory _artwork = Artworks[_id];//fetch the artwork
        address payable _seller = _artwork.owner;//fetch the owner
        require(_seller != msg.sender);//check seller does not buy the product
        require(_artwork.id > 0 && _artwork.id <= ArtworkCount);//check for valid if
        require(!_artwork.purchased);//check that artwork has not been purchased
        require(msg.value >= _artwork.price);//chcek min balance
        require(!_artwork.purchased);
        _artwork.owner = msg.sender;
        _artwork.purchased = true;
        Artworks[_id] = _artwork;
        address(_seller).transfer(msg.value);
        emit ArtworkPurchased(ArtworkCount, _artwork.Artistname,_artwork.Artname, _artwork.price,_artwork.width,_artwork.height,_artwork.Description, msg.sender, true,block.timestamp);
    }
    function Sellit(uint _id) public  {
        Artwork memory _artwork1 = Artworks[_id];//fetch the artwork
         require((_artwork1.purchased)==true);
         require(_artwork1.owner == msg.sender);
        _artwork1.purchased = false;
         Artworks[_id] = _artwork1;
        emit madeitavailable(ArtworkCount, _artwork1.Artistname,_artwork1.Artname, _artwork1.price,_artwork1.width,_artwork1.height,_artwork1.Description, msg.sender, false,block.timestamp);
    }
    function DontSellit(uint _id) public  {
        Artwork memory _artwork2 = Artworks[_id];//fetch the artwork
        require(_artwork2.owner == msg.sender);
        require(!_artwork2.purchased);//check that artwork has not been purchased
        _artwork2.purchased = true;
         Artworks[_id] = _artwork2;
        emit madeitunavailable(ArtworkCount, _artwork2.Artistname,_artwork2.Artname, _artwork2.price,_artwork2.width,_artwork2.height,_artwork2.Description, msg.sender, true,block.timestamp);
    }

    //auction function
    function createArtwork1(string memory _Artistname, uint _price,uint _numBlocksActionOpen) public {
    // Require a valid Artist name
    require(bytes(_Artistname).length > 0);
    require(_price > 0);// Require a valid price
     require(_numBlocksActionOpen > 0);// Require a valid price
    ArtworkCount1 ++;//increase count
    Artworks1[ArtworkCount1] = ArtworkAuction(ArtworkCount1, _Artistname,_price,block.number,_numBlocksActionOpen,0x0000000000000000000000000000000000000000,0,msg.sender,false);
   // emit Artworkcreated(ArtworkCount, _Artistname, _Artname,_price,_width,_height,_Description, msg.sender, false);// Trigger an event
    }
    function bid(uint _id)  public payable {
        
    ArtworkAuction memory _artwork = Artworks1[_id];//fetch the artwork
    address  _seller = _artwork.owner1;//fetch the owner
    if (block.number <= (_artwork.StartingBlockNum + _artwork.numBlocksActionOpen)) {
    require(msg.value > _artwork.highestBid,"The given box number is not valid please enter valid box");
    require(msg.sender!=_seller);
    if (_artwork.highestBid != 0) {
            pendingReturns[_artwork.highestBidder] += _artwork.highestBid;
        }
    _artwork.highestBidder = msg.sender;
    _artwork.highestBid = msg.value;
        emit SomeoneBid(msg.sender, msg.value);
    }
    else{
        auctionEnd(_id);
    }
    }
    function auctionEnd(uint _id) public {
    ArtworkAuction memory _artwork = Artworks1[_id];//fetch the artwork
    require(block.number > (_artwork.StartingBlockNum + _artwork.numBlocksActionOpen),"auction is still going on");
    require(!_artwork.ended);
    _artwork.ended = true;
      
    _artwork.owner1.transfer(_artwork.highestBid);
        emit AuctionEnded(_artwork.highestBidder, _artwork.highestBid);
    }


}