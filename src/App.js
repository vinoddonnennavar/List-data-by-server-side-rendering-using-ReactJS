import React, { Component } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import { Row } from "react-bootstrap";
import './index.css';

export default class App extends Component {
  constructor() {
    super();
    this.getFlights = this.getFlights.bind(this);
    this.state = {
      flights: [],
      launchSuccess: true,
      landSuccess: true,
    };
    this.setFilter = this.setFilter.bind(this);
    this.setFilterLaunch = this.setFilter.bind(this);
    this.setFilterLand = this.setFilter.bind(this);
  }
  componentDidMount() {
    this.getFlights();
  }
  setFilter(e){
    var launchYear = e.target.id;
    alert(launchYear)
  } 
 
  async getFlights() {
    let flightsData = await axios
      .get(
        "https://api.spaceXdata.com/v3/launches?limit=100"
      )
      .then((res) => {
        console.log(res.data);
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
    this.setState(
      {
        flights: flightsData,
      },
      () => {
        console.log(this.state);
      }
    );
  }
  render() {
    const { flights, launchSuccess, landSuccess } = this.state;
    fetch('https://api.spaceXdata.com/v3/launches?limit=100&launch_success=' + launchSuccess + '&land_success=' + landSuccess )
    return (
      <div className="container-fluid">
        <Row>
          <div className="d-flex flex-nowrap">
            <div className="container">
              <div className="">
                <h1>SpaceX Launch Programs</h1>
                <div className="filters" >
                  <h4>Filters</h4>
                  <p id="filter">Launch Date</p>
                    <button type="button" onClick={this.setFilter} className="active" id="2006">2006</button>
                    <button type="button" onClick={this.setFilter} id="2007">2007</button>
                    <button type="button" onClick={this.setFilter} id="2008">2008</button>
                    <button type="button" onClick={this.setFilter} id="2009">2009</button>
                    <button type="button" onClick={this.setFilter} id="2010">2010</button>
                    <button type="button" onClick={this.setFilter} id="2011">2011</button>
                    <button type="button" onClick={this.setFilter} id="2012">2012</button>
                    <button type="button" onClick={this.setFilter} id="2013">2013</button>
                    <button type="button" onClick={this.setFilter} id="2014">2014</button>
                    <button type="button" onClick={this.setFilter} id="2015">2015</button>
                    <button type="button" onClick={this.setFilter} id="2016">2016</button>
                    <button type="button" onClick={this.setFilter} id="2017">2017</button>
                    <button type="button" onClick={this.setFilter} id="2018">2018</button>
                    <button type="button" onClick={this.setFilter} id="2019">2019</button>
                    <button type="button" onClick={this.setFilter} id="2020">2020</button>
                  <p id="launch">Successful Launch</p>
                    <button type="button" onClick={this.setFilterLaunch} id="trueLaunch">True</button>
                    <button type="button" onClick={this.setFilterLaunch} id="falseLaunch">False</button>
                  <p id="land">Successful Landing</p>
                    <button type="button" onClick={this.setFilterLand} id="true">True</button>
                    <button type="button" onClick={this.setFilterLand} id="false">False</button>
                </div>
              </div>
            </div>
          </div>
          {flights.map((flight) => {
            return (
              <div className="d-flex flex-nowrap" key={flight.flight_number}>
                <div className="container">
                  <div className="card">
                    <img
                      src={flight.links.mission_patch_small}
                      alt="img"
                      style={{ width: "auto" }}
                    />
                    <h4>
                      {flight.mission_name}
                      <b>{" #" + flight.flight_number}</b>
                    </h4>
                    <h4>
                      Mission Ids:<b>{" " + flight.mission_id}</b>
                    </h4>
                    <h4>
                      Launch year:<b>{" " + flight.launch_year}</b>
                    </h4>
                    <h4>
                      Successful Launch:<b>{" " + flight.launch_success}</b>
                    </h4>
                    <h4>
                      Successful Landing:
                      <b>
                        {" " + flight.rocket.first_stage.cores[0].land_success}
                      </b>
                    </h4>
                  </div>
                </div>
              </div>
            );
          })}
        </Row>
      </div>
    );
  }
}