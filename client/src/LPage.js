import React, { Component } from 'react';
import getWeb3 from "./getWeb3";
import Navbar from './navbar'
import Artplace from './contracts/Artplace.json'
import 'bootstrap/dist/css/bootstrap.min.css';
import Main from './Main';
import Audit from './Audit';

class LPage extends Component {
    

    componentDidMount = async () => {

            try {
                const web3 = await getWeb3();
                const account = await web3.eth.getAccounts();
                this.setState({ account: account[0] })
                const networkId = await web3.eth.net.getId();
                const deployedNetwork = Artplace.networks[networkId];
                
                
                const instance = new web3.eth.Contract(
                  Artplace.abi,
                  deployedNetwork && deployedNetwork.address,
                );
                
                instance.events.Artworkcreated({
                  filter: {id: '2'}, // ID, OWNER, ADDRESS
                  fromBlock: 0
              }, function(error, event){ console.log(event); })
              
                
                const ArtworkCount = await instance.methods.ArtworkCount().call();
                this.setState({ web3, instance ,ArtworkCount}, this.runExample);
                for (var i = 1; i <= ArtworkCount; i++) {
                  
                  
                  const Artwork = await instance.methods.Artworks(i).call()
                  this.setState({
                    Artworks: [...this.state.Artworks, Artwork]
                  })
                }

               console.log(ArtworkCount.toString());
                console.log("bhavindave");
                this.setState({ loading: false});
              } catch (error) {
                alert(
                  `Failed to load web3, accounts, or contract. Check console for details.`,
                );
                console.error(error);
              }
    
    }



    constructor(props) {
      super(props)
      this.state = {
        account: '',
        createArtwork: '',
        purchaseArtwork: '',
        ArtworkCount: 0,
        Artworks: [],
        loading: true
      }
      this.createArtwork = this.createArtwork.bind(this);
      const ArtworkCount= this.createArtwork;
      this.purchaseArtwork = this.purchaseArtwork.bind(this)
  
    }
  
    createArtwork(Artistname,Artname,price,width,height,Description) {
      this.setState({ loading: true })
      this.state.instance.methods.createArtwork(Artistname,Artname,price,width,height,Description).send({ from: this.state.account })
      .once('receipt', (receipt) => {
        this.setState({ loading: false })
      })
    }
  
    purchaseArtwork(id, price) {
      this.setState({ loading: true })
      this.state.instance.methods.purchaseArtwork(id).send({ from: this.state.account, value: price })
      .once('receipt', (receipt) => {
        this.setState({ loading: false })
      })
    }
  
  render() {

    return (
        
        <div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
          <main role="main" className="col-lg-12 d-flex">
              { this.state.loading 
               ? <div id="loader" className="text-center"><p className="text-center">Loading...</p></div>
               : <Main 
               Artworks={this.state.Artworks}
               createArtwork={this.createArtwork}
               purchaseArtwork={this.purchaseArtwork}
               /> 
                }
                   
           </main>
          </div>
        </div>
      </div>
      
    );
  }
}
export default LPage;