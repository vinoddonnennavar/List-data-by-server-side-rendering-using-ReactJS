import React,{Component} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { Row, Col } from 'react-bootstrap';
import Index from './index.css';

export default class App extends Component {
  constructor(){
    super();
    this.getFlights=this.getFlights.bind(this);
    this.state={
      flights:[]
    }
  }
  componentDidMount(){
    this.getFlights();
  }
  
  async getFlights(){
    let flightsData=await axios.get('https://api.spaceXdata.com/v3/launches?limit=100&launch_success=true&land_success=true')
                    .then(res=>{
                      console.log('>>>>>>>>>>>>>>>>>>>>>>>>',res.data[0].rocket.first_stage.cores[0].launch_year);
                      return res.data;
                    })
                    .catch(err=>{
                      console.log(err);
                    })
    this.setState({
      flights:flightsData
    },()=>{console.log(this.state)})
  }
  render(){
    const {flights}=this.state;
    return (
      <div className="App">
        <div >
          <h1>SpaceX Launch Programs</h1>
          <h4>Filters</h4>
          <p>Launch Date</p>
          {console.log('>>>>',flights.launch_year)}
        </div>
        {flights && flights.map(flight=>{
          return(
            
            <div className="d-flex flex-nowrap" key={flight.flight_number} >
              
              <div className="container" >
              {/* <Col md={{ span: 4, offset: 4 }}>
              <Row>
              <img src={flight.links.mission_patch_small} alt="img" style={{width:'auto'}}/>
              </Row>
              <Row>
              <h4 >{flight.mission_name}<b>{' #' + flight.flight_number}</b></h4></Row>
              <Row>
              <h4 >Mission Ids:<b>{' ' + flight.mission_id}</b></h4>
              </Row>
              <Row>
              <h4 >Launch year:<b>{' ' + flight.launch_year}</b></h4>
              </Row>
              <Row>
              <h4 >Successful Launch:<b>{' ' + flight.launch_success}</b></h4>
              </Row>
              <Row>
              <h4 >Successful Landing:<b>{' ' + flight.rocket.first_stage.cores[0].land_success}</b></h4>
              </Row>
              </Col> */}
              <Row>
                <Col md={3}>
                  <div className="grid-container">
                    <img src={flight.links.mission_patch_small} alt="img" style={{width:'auto'}}/>
                    <h4 >{flight.mission_name}<b>{' #' + flight.flight_number}</b></h4>
                    <h4 >Mission Ids:<b>{' ' + flight.mission_id}</b></h4>
                    <h4 >Launch year:<b>{' ' + flight.launch_year}</b></h4>
                    <h4 >Successful Launch:<b>{' ' + flight.launch_success}</b></h4>
                    <h4 >Successful Landing:<b>{' ' + flight.rocket.first_stage.cores[0].land_success}</b></h4>
                  </div>
                </Col>
                
              </Row>
                {/* <h4 ><b>{flight.flight_number}</b></h4>
                <p>{flight.details}</p> */}
              </div>
            </div>
          )
        })}
        
      </div>
    );
  }
}