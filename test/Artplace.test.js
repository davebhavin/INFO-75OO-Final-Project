const Artplace = artifacts.require('./contracts/Artplace.sol')

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('Artplace', ([deployer,seller,buyer]) => {
  let artplace

  before(async () => {
    artplace = await Artplace.deployed()
  })

  describe('will it deploy', async () => {
    it('deploys successfully', async () => {
      const address = await artplace.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })

    it('has a name', async () => {
      const name = await artplace.name()
      assert.equal(name, 'Art using Blockchain')
    })

  })
  describe('Artworks sell/buy test', async () => {
    let result, ArtworkCount
    before(async () => {
      result = await artplace.createArtwork('Dave','first',web3.utils.toWei('1', 'Ether'),70,50,'My first digital artwork', { from: seller })
      ArtworkCount = await artplace.ArtworkCount()
    })

    it('created art work', async () => {
      // SUCCESS
      assert.equal(ArtworkCount, 1)
      const event = result.logs[0].args
      assert.equal(event.id.toNumber(), ArtworkCount.toNumber(), 'id is correct')
      assert.equal(event.Artistname, 'Dave', 'Artist name is correct')
      assert.equal(event.Artname, 'first', 'art name is correct')
      assert.equal(event.price, '1000000000000000000', 'price is correct')
      assert.equal(event.width,'70', 'width is correct')
      assert.equal(event.height, '50', 'height is correct')
      assert.equal(event.Description, 'My first digital artwork', 'Desc is correct')
      assert.equal(event.owner, seller, 'owner correct')
      assert.equal(event.purchased, false, 'purchased correct')

      // FAILURE: Artwork must have a valid artist name
      await await artplace.createArtwork('','first',web3.utils.toWei('1', 'Ether'),70,50,'My first digital artwork', { from: seller }).should.be.rejected;
      // FAILURE: Artwork must have a valid art name
      await await artplace.createArtwork('Dave','',web3.utils.toWei('1', 'Ether'),70,50,'My first digital artwork', { from: seller }).should.be.rejected;
    })
    it('sells artwork', async () => {
    
      let oldBalance
      oldBalance = await web3.eth.getBalance(seller)
      oldBalance = new web3.utils.BN(oldBalance)// get the sellers information
      result = await artplace.purchaseArtwork(ArtworkCount, { from: buyer, value: web3.utils.toWei('1', 'Ether')})//buyer purchase
    
      // Check logs
      const event = result.logs[0].args
      assert.equal(event.id.toNumber(), ArtworkCount.toNumber(), 'id is correct')
      assert.equal(event.Artistname, 'Dave', 'Artist name is correct')
      assert.equal(event.Artname, 'first', 'art name is correct')
      assert.equal(event.price, '1000000000000000000', 'price is correct')
      assert.equal(event.width,'70', 'width is correct')
      assert.equal(event.height, '50', 'height is correct')
      assert.equal(event.Description, 'My first digital artwork', 'Desc is correct')
      assert.equal(event.owner, buyer, 'owner is correct')
      assert.equal(event.purchased, true, 'purchased is correct')
    
      
      let newBalance
      newBalance = await web3.eth.getBalance(seller)
      newBalance = new web3.utils.BN(newBalance)//checks whether seller have received the funds
    
      let price
      price = web3.utils.toWei('1', 'Ether')
      price = new web3.utils.BN(price)
    
      const exepectedBalance = oldBalance.add(price)
    
      assert.equal(newBalance.toString(), exepectedBalance.toString())
    
      
      await artplace.purchaseArtwork(56, { from: buyer, value: web3.utils.toWei('1', 'Ether')}).should.be.rejected; // FAILURE: artwork must have valid id     
      await artplace.purchaseArtwork(ArtworkCount, { from: buyer, value: web3.utils.toWei('0.5', 'Ether') }).should.be.rejected;// FAILURE: Buyer doesnot have enough ether(money)
      await artplace.purchaseArtwork(ArtworkCount, { from: deployer, value: web3.utils.toWei('1', 'Ether') }).should.be.rejected; // FAILURE: Deployer tries to buy the artwork, i.e., it cannot be purchased twice.
      await artplace.purchaseArtwork(ArtworkCount, { from: buyer, value: web3.utils.toWei('1', 'Ether') }).should.be.rejected;  // buyer cannot be the seller.
    })
  })
})

