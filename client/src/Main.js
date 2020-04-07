import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


class Main extends Component {

  render() {
    //const web3 = await getWeb3();
    return (
        
      <div id="content">
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
        
        <h2>Buy Artwork</h2>
        <table className="table">

        <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Artist Name</th>
          <th scope="col">Price</th>
          <th scope="col">Owner</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody id="artlist">
      { this.props.Artworks.map((Artwork, key) => {
        return(
          <tr key={key}>
          
            <th scope="row">{Artwork.id.toString()}</th>
            <td>{Artwork.Artistname}</td>
            <td>{window.web3.fromWei(Artwork.price.toString(), 'Ether')} Eth</td>
            <td>{Artwork.owner}</td>
            <td>
              { !Artwork.purchased
                ? <button
                    name={Artwork.id}
                    value={Artwork.price}
                    onClick={(event) => {
                      this.props.purchaseArtwork(event.target.Artistname, event.target.value)
                    }}
                  >
                    Buy
                  </button>
                : null
              }
              </td>
          </tr>
          
        )
      })}
      
      </tbody>
        </table>
      </div>
      
    );
  }
}

export default Main;