  import React, { Component } from "react";
  import 'bootstrap/dist/css/bootstrap.min.css';
  import LPage from './LPage';
  import "./App.css";
  import Navbar from './navbar';
  import Main from './Main';
  import Seller from './Seller';
  import _ from 'lodash';

  import getWeb3 from "./getWeb3";
  import Artplace from './contracts/Artplace.json'
  import Audit from "./Audit";
  import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

  class App extends Component {
    
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

          const ArtworkCount = await instance.methods.ArtworkCount().call();
          const createArtwork = await instance.events.createArtwork;
          const purchaseArtwork= await instance.events.purchaseArtwork;
          this.setState({ web3, instance ,ArtworkCount,createArtwork,purchaseArtwork}, this.runExample);
          for (var i = 1; i <= ArtworkCount; i++) {
            const Artwork = await instance.methods.Artworks(i).call()
            this.setState({
              Artworks: [...this.state.Artworks, Artwork]
            })
          }
          console.log(this.state.Artworks)
      
          this.setState({ loading: false});
        } catch (error) {
          alert(
            `Failed to load web3, accounts, or contract. Check console for details.`,
          );
          console.error(error);
        }
       
       


  }
  componentWillMount() {
    this.initialState = this.state;
}
  
  constructor(props) {
  super(props)
  
    this.state = {
      dir:"",
    account: '',
    name: [],
    ArtworkCount: 0,
    Ecount: [],
    Time: [],
    Artworks: [],
    loading: true
  }
  this.showProfile = this.showProfile.bind(this);
  this.createArtwork = this.createArtwork.bind(this);
  this.showusingID = this.showusingID.bind(this);
  this.purchaseArtwork = this.purchaseArtwork.bind(this);
  this.Sellit = this.Sellit.bind(this);
  this.DontSellit = this.DontSellit.bind(this);
  }
 
  createArtwork(Artistname,Artname,price,width,height,Description) {
  this.setState({ loading: true })
  this.state.instance.methods.createArtwork(Artistname,Artname,price,width,height,Description).send({ from: this.state.account })
  .once('receipt', (receipt) => {
  this.setState({ loading: false })
  })
  }
  showProfile(owners){
    this.setState(this.initialState)
    this.state.instance.events.Artworkcreated({
         filter: { owner: owners},
         fromBlock: 0
     }).on('data', event => {
      this.setState({
        Ecount: [...this.state.Ecount, Object.values(event)],
      })
    })
    this.state.instance.events.ArtworkPurchased({
         filter: { owner: owners},
         fromBlock: 0
     }).on('data', event => {
      this.setState({
        Ecount: [...this.state.Ecount, Object.values(event)],
      })
    })
    this.state.instance.events.madeitavailable({
         filter: { owner: owners},
         fromBlock: 0
     }).on('data', event => {
      this.setState({
        Ecount: [...this.state.Ecount, Object.values(event)],
      })
    })
    this.state.instance.events.madeitunavailable({
         filter: { owner: owners},
         fromBlock: 0
     }).on('data', event => {
      this.setState({
        Ecount: [...this.state.Ecount, Object.values(event)],
      })
    })
    }
  
    showusingBot= () => {
      this.setState(this.initialState)
      this.state.instance.events.Artworkcreated({
           filter: { purchased: !true},
           fromBlock: 0
       }).on('data', event => {
        this.setState({
          Ecount: [...this.state.Ecount, Object.values(event)],
        })
      })
      this.state.instance.events.madeitavailable({
        filter: { purchased: !true},
        fromBlock: 0
    }).on('data', event => {
    this.setState({
      Ecount: [...this.state.Ecount, Object.values(event)],
    })
    })
      }
      showallEvents= () => {
        this.setState(this.initialState)
        this.state.instance.events.allEvents({
             fromBlock: 0
         }).on('data', event => {
          this.setState({
            Ecount: [...this.state.Ecount, Object.values(event)],
          })
        })
        }
        showArtworkcreated= () => {
          this.setState(this.initialState)
          this.state.instance.events.Artworkcreated({
               fromBlock: 0
           }).on('data', event => {
            this.setState({
              Ecount: [...this.state.Ecount, Object.values(event)],
            })
          })
          }
          showArtworkPurchased= () => {
            this.setState(this.initialState)
            this.state.instance.events.ArtworkPurchased({
                 fromBlock: 0
             }).on('data', event => {
              this.setState({
                Ecount: [...this.state.Ecount, Object.values(event)],
              })
            })
            }

      showusingSellable= () => {
        this.setState(this.initialState)
        this.state.instance.events.Artworkcreated({
             filter: { purchased: true.toString()},
             fromBlock: 0
         }).on('data', event => {
          this.setState({
            Ecount: [...this.state.Ecount, Object.values(event)],
          })
        })
        this.state.instance.events.ArtworkPurchased({
          filter: { purchased: true.toString()},
          fromBlock: 0
      }).on('data', event => {
       this.setState({
         Ecount: [...this.state.Ecount, Object.values(event)],
       })
     })
     this.state.instance.events.madeitavailable({
            filter: { purchased: true.toString()},
            fromBlock: 0
        }).on('data', event => {
        this.setState({
          Ecount: [...this.state.Ecount, Object.values(event)],
        })
      })
      this.state.instance.events.madeitunavailable({
        filter: { purchased: true.toString()},
        fromBlock: 0
      }).on('data', event => {
      this.setState({
      Ecount: [...this.state.Ecount, Object.values(event)],
      })
      })
     
        }
      showusingID = ids => {
        this.setState(this.initialState)
        this.state.instance.events.Artworkcreated({
          filter: { id: ids},
          fromBlock: 0,
        }
        )
        .on('data', event => {
          this.setState({
            Ecount: [...this.state.Ecount, Object.values(event)],
          })
        })
        this.state.instance.events.ArtworkPurchased({
          filter: { id: ids},
          fromBlock: 0,
        }
        )
        .on('data', event => {
          this.setState({
            Ecount: [...this.state.Ecount, Object.values(event)],
          })
        })
       
      }

  purchaseArtwork(id, price) {
    this.setState({ loading: true })
    this.state.instance.methods.purchaseArtwork(id).send({ from: this.state.account, value: price })
    .once('receipt', (receipt) => {
    this.setState({ loading: false })
  })
  }
  Sellit(id) {
    this.setState({ loading: true })
    this.state.instance.methods.Sellit(id).send({ from: this.state.account })
    .once('receipt', (receipt) => {
    this.setState({ loading: false })
  })
  }
  DontSellit(id) {
    this.setState({ loading: true })
    this.state.instance.methods.DontSellit(id).send({ from: this.state.account })
    .once('receipt', (receipt) => {
    this.setState({ loading: false })
  })
  }
  
  
    render() {
      return (
        
        <Router>
        <div>
          <hr />

          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/trad">
            <Navbar account={this.state.account} />
            <div className="container-fluid mt-5">
              <div className="row">
              <main role="main" className="col-lg-12 d-flex">
                  { this.state.loading 
                  ? <div id="loader" className="text-center"><p className="text-center">Loading...</p></div>
                  : <Main 
                  account={this.state.account}
                  Artworks={this.state.Artworks}
                  createArtwork={this.createArtwork}
                  purchaseArtwork={this.purchaseArtwork}
                  Sellit={this.Sellit}
                  purchaseArtwork={this.purchaseArtwork}
                  DontSellit={this.DontSellit}
                  /> 
                    }
                      
              </main>
              </div>
            </div>
            </Route>
            <Route path="/seller">
            <Navbar account={this.state.account} />
            <div className="container-fluid mt-5">
              <div className="row">
              <main role="main" className="col-lg-12 d-flex">
                  { this.state.loading 
                  ? <div id="loader" className="text-center"><p className="text-center">Loading...</p></div>
                  : <Seller 
                  account={this.state.account}
                  Artworks={this.state.Artworks}
                  Ecount={this.state.Ecount}
                  Time={this.state.Time}
                  createArtwork={this.createArtwork}
                  purchaseArtwork={this.purchaseArtwork}
                  Sellit={this.Sellit}
                  purchaseArtwork={this.purchaseArtwork}
                  DontSellit={this.DontSellit}
                  showusingSellable={this.showusingSellable}
                  showArtworkPurchased={this.showArtworkPurchased}
                  /> 
                    }
                      
              </main>
              </div>
            </div>
            </Route>
            <Route path="/audit">
              <Audit 
              //Artworks={this.state.Artworks}
              instance={this.state.instance}
              Ecount={this.state.Ecount}
              Time={this.state.Time}
                  createArtwork={this.createArtwork}
                  showProfile={this.showProfile}
                  showusingID={this.showusingID}
                  showusingBot={this.showusingBot}
                  showusingSellable={this.showusingSellable}
                  showArtworkPurchased={this.showArtworkPurchased}
                  showArtworkcreated={this.showArtworkcreated}
                  showallEvents={this.showallEvents}
                //  DontSellit={this.DontSellit}
                  />
            </Route>
          </Switch>
        </div>
      </Router>
      );
    }
    
  }

  function Home() {
    return (
      
      <div class="card-group">
      <div class="card">
          <div class="card-body">
              <h4 class="card-title">Regular Trading</h4>
              <p class="card-text">Here the seller, have the option to sell to the buyer suing traditional buying/seling methods in a decentraized manner.</p><Link to="/trad">Trade</Link></div>
      </div>
      <div class="card">
          <div class="card-body">
              <h4 class="card-title">Auction</h4>
              <p class="card-text">comming soon</p><Link to="/trad"></Link></div>
      </div>
      <div class="card">
          <div class="card-body">
              <h4 class="card-title">Audit</h4>
              <p class="card-text">Auditing the smart contract's events</p><Link to="/audit">Audit</Link></div>
      </div>

      <input type="file" id="input" multiple>
     
      </input>
  </div>
      

    );
  }

  

  export default App;
