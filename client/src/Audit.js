import React, {useState ,Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

class Audit extends Component {

    
  render() {
    //const web3 = await getWeb3();
    //console.log(this.props.name);
    return (
     
      
      <div id="lol,">
      <div id="add">
        <h1>Audit page</h1>

        
        
        <form onSubmit={(event) => {
          event.preventDefault()
          const owners = this.owner.value;
          this.props.showProfile(owners);
        }}>
          
        <div className="form-group mr-sm-2">
        <input
          id="owner"
          type="text"
          ref={(input) => { this.owner = input }}
          className="form-control"
          placeholder="owner"
          required />
      </div>
          
          <button type="submit" className="btn btn-primary">Audit Artpiece using owner</button>
        </form>
        <form onSubmit={(event) => {
          event.preventDefault()
          const ids = this.id.value;
          this.props.showusingID(ids);
          
        }}>
          
        <div className="form-group mr-sm-2">
        <input
          id="id"
          type="text"
          ref={(input) => { this.id = input }}
          className="form-control"
          placeholder="id"
          required />
      </div>
          
          <button type="submit" className="btn btn-primary">Audit Artpiece using id</button>
        </form>

<div id="notsold">
        <form onSubmit={(event) => {
          event.preventDefault()
          this.props.showusingBot();
        }}>
          <button type="submit" className="btn btn-primary">Show items which are not sold</button>
        </form>
        </div>

        <p> </p>
      </div><div id="buy">

        <h1>Temperoroy space</h1>
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

          </tr>
        )
      })}
      
      </tbody>
        </table>
      </div>

    
       
      { this.props.name.map((name, key) => {
        return(
      <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
        {name}
        </Card.Text>
      </Card.Body>
    </Card>
     ) })}
        
      </div>


    );
  }
  
}

export default Audit;