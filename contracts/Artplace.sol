pragma solidity >=0.4.21 <0.7.0;

contract Artplace {
    string public name;
    uint public ArtworkCount = 0;
    mapping(uint => Artwork) public Artworks;

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
    event Artworkcreated (
        uint indexed id,
        string Artistname,
        string Artname,
        uint  price,
        uint  width,
        uint  height,
        string  Description,
        address payable indexed owner,
        bool indexed purchased
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
        bool indexed purchased
    );
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
    emit Artworkcreated(ArtworkCount, _Artistname, _Artname,_price,_width,_height,_Description, msg.sender, false);// Trigger an event
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
        emit ArtworkPurchased(ArtworkCount, _artwork.Artistname,_artwork.Artname, _artwork.price,_artwork.width,_artwork.height,_artwork.Description, msg.sender, true);
    }
    
}