import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


class Seller extends Component {

  render() {
    //const web3 = await getWeb3();
    console.log(this.props.Artworks.id);
    return (
      
        <div id="lol">
        <div class="row">
        <div class="col-md-11 offset-md-10"><a class="btn btn-primary2" href="/" role="button">Home</a></div>
        </div>
      <div id="buy">
        
        <h1>Buy Artwork</h1>
        <table className="table">

        <thead>
        <tr>
          <th scope="col">Index</th>
          <th scope="col">Artist Name</th>
          <th scope="col">Art Name</th>
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
            <td>{Artwork.Artname}</td>
            <td>{window.web3.fromWei(Artwork.price.toString(), 'Ether')} Eth</td>
            <td>{Artwork.owner}</td>
              <td>
               
              { Artwork.purchased==true && Artwork.owner==this.props.account
                ? <button
               
                    id={Artwork.id}
                    onClick={(event) => {
                      this.props.Sellit(Artwork.id)
                    }}
                  >
                    sellitagain
                  </button>
                : null
              }
              </td>
              <td>
              { Artwork.purchased==false && Artwork.owner==this.props.account
                ? <button
                    name={Artwork.id}
                    onClick={(event) => {
                      this.props.DontSellit(event.target.name)
                    }}
                  >
                    Take it off the market
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
      </div>
    );
  }
}

export default Seller;