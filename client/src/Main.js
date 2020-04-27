import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ModalPage from './Modal';
import Modal from 'react-bootstrap/Modal';
//import showModal from 'react-bootstrap/showModal';
//import isOpen from 'react-bootstrap/isOpen';
//import hideModal from 'react-bootstrap/hideModal';
//import Modal from 'react-bootstrap/Modal';
var QRCode = require('qrcode.react');


class Main extends Component {
  
 

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
          const Artname = this.Artname.value;
          const price = window.web3.toWei(this.price.value.toString(), 'Ether')
          const width = this.width.value;
          const height = this.height.value;
          const Description = this.Description.value;
          this.props.createArtwork(Artistname,Artname,price,width,height,Description);
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
              id="Artname"
              type="text"
              ref={(input) => { this.Artname = input }}
              className="form-control"
              placeholder="Artname"
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
        <input
          id="width"
          type="number"
          ref={(input) => { this.width = input }}
          className="form-control"
          placeholder="width in cm"
          required />
      </div>
      <div className="form-group mr-sm-2">
            <input
              id="height"
              type="number"
              ref={(input) => { this.height = input }}
              className="form-control"
              placeholder="height in cm"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="Description"
              type="text"
              ref={(input) => { this.Description = input }}
              className="form-control"
              placeholder="Description"
              required />
          </div>
         
          
          <button type="submit" className="btn btn-primary">Add Artpiece</button>
        </form>
        <p> </p>
      </div><div id="buy">
        
<div><h1>Buy Artwork</h1><h6>Are you a seller? Check out seller's page</h6><a href = "/seller"><h6>seller</h6></a>
</div><table className="table">

        <thead>
        <tr>
          <th scope="col">Index</th>
          <th scope="col">Artist Name</th>
          <th scope="col">Art Name</th>
          <th scope="col">Price</th>
          <th scope="col">Owner</th>
          <th scope="col">Unique Id</th>
        </tr>
      </thead>
      <tbody id="artlist">
     
      { this.props.Artworks.map((Artwork, key) => {
        console.log(this.props.Artworks)
        return(
          <tr key={key}>
          
            <th scope="row">{Artwork.id.toString()}</th>
            <td>{Artwork.Artistname}</td>
            <td>{Artwork.Artname}</td>
            <td>{window.web3.fromWei(Artwork.price.toString(), 'Ether')} Eth</td>
            <td>{Artwork.owner}</td>
            <td>
            
            
    
         
            <QRCode
            value={Artwork.id}
            size={128}
            bgColor={"#ffffff"}
            fgColor={"#000000"}
            level={"L"}
            includeMargin={false}
            renderAs={"svg"}
           
          />
          </td>
            <td>
              { Artwork.purchased==false && Artwork.owner!=this.props.account
                ? <div><button
                    name={Artwork.id}
                    value={Artwork.price}
                    onClick={(event) => {
                      this.props.purchaseArtwork(event.target.name, event.target.value)
                    }}
                  >
                    Buy
                  </button>
                  
                  </div>
                : null
                
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

export default Main;