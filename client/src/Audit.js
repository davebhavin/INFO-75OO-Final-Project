import React, {useState ,Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Tab from 'react-bootstrap/Tab';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from './navbar.js';



class Audit extends Component {

 
  render() {
    

    return (
     
      
      <div id="haha">
      <div id="audit">
      <Jumbotron fluid>
      <Container>
        <h1>Audit Page</h1>
      </Container>
    </Jumbotron>

        
    <Jumbotron fluid className="jumbo" >
    <Container>
    <div id="all">
    
    <form onSubmit={(event) => {
      event.preventDefault()
      this.props.showallEvents();
    }}>
      <button type="submit" className="btn btn-primary_3">List all events</button>
    </form>
    <form onSubmit={(event) => {
      event.preventDefault()
      this.props.showArtworkcreated();
    }}>
      <button type="submit" className="btn btn-primary_3">List events where artwork was created </button>
    </form>
    <form onSubmit={(event) => {
      event.preventDefault()
      this.props.showArtworkPurchased();
    }}>
      <button type="submit" className="btn btn-primary_3">List events where artwork was purchased</button>
    </form>
    </div>

    <div id="sold">
    <h6>Artwork not for sale</h6>
    <form onSubmit={(event) => {
      event.preventDefault()
      this.props.showusingBot();
    }}>
      <button type="submit" className="btn btn-primary_2">Search</button>
    </form>
    <h6>Artwork for sale</h6>
    <form onSubmit={(event) => {
      event.preventDefault()
      this.props.showusingSellable();
    }}>
      <button type="submit" className="btn btn-primary_2">Search</button>
    </form>
    </div>

    <div id="add1">

        <form onSubmit={(event) => {
          event.preventDefault()
          const owners = this.owner.value;
          this.props.showProfile(owners);
        }}>
        <h5> Search by owner</h5>
        <div className="form-group mr-sm-2">
        <input
          id="owner"
          type="text"
          ref={(input) => { this.owner = input }}
          className="form-control1"
          placeholder="owner"
          required />
      </div>
      <button type="submit" className="btn btn-primary_1">Search</button>
        </form>
    </div>
        <div id="buy1">
        
        
        <form onSubmit={(event) => {
          event.preventDefault()
          const ids = this.id.value;
          this.props.showusingID(ids);
          
        }}>
       <h5>Search using id</h5>
          
        <div className="form-group mr-sm-2">
        <input
          id="id"
          type="text"
          ref={(input) => { this.id = input }}
          className="form-control_1"
          placeholder="id"
          required />
      </div>
          
          <button type="submit" className="btn btn-primary_1">Search</button>
        </form>
        </div>
        
      
        </Container>
        </Jumbotron>
        



        <p> </p>
      </div>


     
      { this.props.Ecount.map((Ecount, key)   => {
        return(
          <Accordion>
          <Card>
          <Accordion.Toggle as={Card.Header} eventKey="0">
          <h5> Details of the artwork ID #{Ecount[8][0]} </h5>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
            <Card className="text-center">
              <Card.Header className="header"><b>Event type:</b> {Ecount[9]}</Card.Header>
              <Card.Body>
              <div class="container">
              <div class="row">
              <div className="col">
              <Card className="body" >
              <Card.Body >
                <Card.Title>Details of the block and transaction:-</Card.Title>
                <Card.Text>
                <b>logIndex:</b> {Ecount[0]}<br />
                <b>transactionIndex:</b> {Ecount[1]}<br />
                <b>transactionHash:</b> {Ecount[2]}<br />
                <b> blockHash:</b> {Ecount[3]}<br />
                <b>blockNumber:</b> {Ecount[4]}<br />
                <b>block address:</b> {Ecount[5]}<br />
                <b>block type:</b> {Ecount[6]}<br />
                <b>block id:</b> {Ecount[7]}<br />
                </Card.Text>
              </Card.Body>
              </Card>
             </div>
              <div class="col">
              <Card className="body">
              <Card.Body >
                <Card.Title>Details of the artwork:-</Card.Title>
                <Card.Text>
                <b>id:</b> {Ecount[8][0]}<br />
                <b>Artistname:</b> {Ecount[8][1]}<br />
                <b>Artname:</b> {Ecount[8][2]}<br />
                <b> price:</b> {Ecount[8][3]} Wei<br />
                <b>width:</b> {Ecount[8][4]}<br />
                <b>height:</b> {Ecount[8][5]}<br />
                <b>Description:</b> {Ecount[8][6]}<br />
                <b>owner:</b> {Ecount[8][7]}<br />
                <b>purchased:</b> {Ecount[8][8].toString()}<br />
                </Card.Text>
              </Card.Body>
              </Card>
              </div>
              </div>
              </div>
            </Card.Body>
              <Card.Footer className="footer">
             
              <div class="col" ><b>Signature:</b> {Ecount[10]} </div>
            
              </Card.Footer>
            </Card>
            
            </Card.Body>
          
          </Accordion.Collapse>
        </Card>
          </Accordion>
     ) })}

 
        
      </div>


    );
    
  }
  
  
}

export default Audit;