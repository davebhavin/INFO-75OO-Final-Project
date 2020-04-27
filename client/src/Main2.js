import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar,Nav,Form,FormControl,Button} from 'react-bootstrap/';


class Main2 extends Component {

  render() {
    //const web3 = await getWeb3();
    return (
   <div id='lol'>
   <div class="row">
   <div class="col-md-11 offset-md-11"><a class="btn btn-primary1" href="/" role="button">Home</a></div>
   </div>
      <div id="add">
        <h1>Add Artwork</h1>
        <form onSubmit={(event) => {
          event.preventDefault()
          const Artistname = this.Artistname.value;
          const price = window.web3.toWei(this.price.value.toString(), 'Ether')
          const numBlocksActionOpen = this.numBlocksActionOpen.value;
          this.props.createArtwork1(Artistname,price,numBlocksActionOpen);
        }}>
          <div className="form-group mr-sm-2">
            <input
              id="Artistname"
              type="text"
              ref={(input) => { this.Artistname = input }}
              className="form-control"
              placeholder="Artistname"
              required />
          </div>
          <div className="form-group mr-sm-2">
          <input
            id="productPrice"
            type="number"
            ref={(input) => { this.price = input }}
            className="form-control"
            placeholder="Product Price"
            required />
        </div>
        <div className="form-group mr-sm-2">
      <div className="form-group mr-sm-2">
            <input
              id="height"
              type="number"
              ref={(input) => { this.numBlocksActionOpen = input }}
              className="form-control"
              placeholder="height in cm"
              required />
          </div>
       
         </div>
          
          <button type="submit" className="btn btn-primary">Add Artpiece</button>
        </form>
      </div><div id="buy">
        
<div><h1>Buy Artwork</h1><h6>Are you a seller? Check out seller's page</h6><a href = "/seller"><h6>seller</h6></a>
</div><table className="table">

        <thead>
        <tr>
          <th scope="col">Index</th>
          <th scope="col">Artist Name</th>
          <th scope="col">Price</th>
          <th scope="col">Owner</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody id="artlist">
     
      { this.props.Artworks1.map((Artwork, key) => {
        //console.log(this.props.Artworks1)
        console.log(Artwork)
        return(
          <tr key={key}>
          
            <th scope="row">{Artwork.id.toString()}</th>
            <td>{Artwork.Artname}</td>
            <td>{window.web3.fromWei(Artwork.highestBid.toString(), 'Ether')} Eth</td>
            <td>{Artwork.owner1}</td>
            
            <td>
              { Artwork.ended==false && Artwork.owner1!=this.props.account
                ?
                <div id="add">
        <form onSubmit={(event) => {
          event.preventDefault()
         
          const Artname = this.Artname.value;
          console.log(Artname,Artwork.highestBid);
          this.props.bid(Artwork.id,Artname*1000000000000000000)
        }}>
          
          <div className="form-group mr-sm-2">
            <input
              id="Artname"
              type="number"
              ref={(input) => { this.Artname = input }}
              className="form-control"
              placeholder="your bid"
              required />
          </div>
          
        
         
          
          <button type="submit" className="btn btn-primary">Add Artpiece</button>
        </form>
        <p> </p>
      </div>
                : Artwork.ended==true ? <h6 className="H6">SOLD</h6>:null
              }
              </td>
             
          </tr>
         
        )
      })}
      
      </tbody>
        </table>
      </div>
      </div>
     
      
    );
  }
}

export default Main2;