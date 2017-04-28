import React, { Component } from 'react';
import {Link} from 'react-router';
import _ from "lodash";
import './App.css';
import Header from './Header';
import Map from './Map';
import {menuItems} from './constants';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import {pink500, grey200, grey500} from 'material-ui/styles/colors';
import ContentCreate from 'material-ui/svg-icons/content/create';
import DeleteSweep from 'material-ui/svg-icons/content/delete-sweep';


const paperStyle = {
  padding:30,
  margin: 20,
  height:400,
  width:500,
  textAlign: 'center',
  display: 'inline-block',
};
const paperStyleAdmin = {
  padding:30,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
};
const tableStyles = {
    floatingActionButton: {
      margin: 0,
      top: 'auto',
      right: 20,
      bottom: 20,
      left: 'auto',
      position: 'fixed',
    },
    editButton: {
      fill: grey500
    },
    columns: {
      admin: {
        width: '10%'
      },
      type: {
        width: '40%'
      },
      name: {
        width: '20%'
      },
      short_name: {
        width: '20%'
      },
      actions: {
        width: '10%'
      }
    }
  };


const apiUrl='http://test.poletalks.com/websites/getData';

class App extends Component {

  constructor(props){
      super(props)
      this.state={}

  }
  componentDidMount(){
    fetch(apiUrl)
    .then(d => d.json())
    .then(d => {
      this.setState({
        apiData: d
      })
    })
  }
  render() {
    if(!this.state.apiData) return <p>Loading....</p>
    return (
      <MuiThemeProvider>
        <div className="App">
          <Header menuItems={menuItems}/>
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 m-b-15 card">
              <Paper style={paperStyle} zDepth={3}>
                <FloatingActionButton
                                      mini={true}
                                      backgroundColor={grey200}
                                      iconStyle={tableStyles.editButton}
                                      className="card-edit-button">
                  <ContentCreate  />
                </FloatingActionButton>
                <img src={this.state.apiData.store.image}></img>
                <Divider/>
                <strong>{this.state.apiData.store.name}</strong>
                  <br />
                  <small>{this.state.apiData.store.store_type}</small>
                  <br />
                  {this.state.apiData.store.formatted_address}
                  <br />
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 m-b-15 store-desc">
                  {this.state.apiData.store.description}
                </div>
              </Paper>
            </div>

            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 m-b-15 card">
              <Paper style={paperStyle} zDepth={3}>
                <Map
                  containerElement={
                    <div style={{ height: 100+'%'}}></div>
                  }
                  mapElement={
                    <div style={{ height: 100+'%' }}></div>
                  }
                />
              </Paper>
            </div>
          </div>
          <div className="row">
            <Paper style={paperStyleAdmin} zDepth={3}>
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 m-b-15 ">
                <h3>Store Admins</h3>
                <Divider/>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHeaderColumn style={tableStyles.columns.admin}>ADMIN</TableHeaderColumn>
                      <TableHeaderColumn style={tableStyles.columns.type}>TYPE</TableHeaderColumn>
                      <TableHeaderColumn style={tableStyles.columns.name}>NAME</TableHeaderColumn>
                      <TableHeaderColumn style={tableStyles.columns.short_name}>SHORT NAME</TableHeaderColumn>
                      <TableHeaderColumn style={tableStyles.columns.actions}>ACTIONS</TableHeaderColumn>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {this.state.apiData.store_admins.map(item =>
                      <TableRow key={item._id}>
                        <TableRowColumn style={tableStyles.columns.admin}>{item.login_id}</TableRowColumn>
                        <TableRowColumn style={tableStyles.columns.type}>{item.type}</TableRowColumn>
                        <TableRowColumn style={tableStyles.columns.name}>{item.name}</TableRowColumn>
                        <TableRowColumn style={tableStyles.columns.short_name}>{item.short_name}</TableRowColumn>
                        <TableRowColumn style={tableStyles.columns.actions}>
                            <FloatingActionButton zDepth={0}
                                                  mini={true}
                                                  backgroundColor={grey200}
                                                  iconStyle={tableStyles.editButton}>
                              <ContentCreate  />
                            </FloatingActionButton>
                            <FloatingActionButton zDepth={0}
                                                  mini={true}
                                                  backgroundColor={grey200}
                                                  iconStyle={tableStyles.editButton}>
                              <DeleteSweep  />
                            </FloatingActionButton>
                        </TableRowColumn>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </Paper>
          </div>

        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
