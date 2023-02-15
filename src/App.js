import React from 'react';
import './App.css';

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      userList:[],
      loading: false
    }
    this.getUserList = this.getUserList.bind(this);
  }

  getUserList() {
    this.setState({ loading: true });
    fetch('https://reqres.in/api/users/?per_page=5&pages=2')
    .then(res => res.json())
    .then(res => {
      setTimeout(() => {
        this.setState({ loading: false, userList: res.data });
      }, 2000);
    })
  }

  render() {

      const { userList, loading } = this.state;

    return (
      <div className="Container App">
      <h4 className="d-inline-block">ReactJS DEMO </h4>
      <button className="btn btn -info float-right" onClick={this.getUserList} disabled={loading}>{loading?'loading...' : 'Show user list'}</button>
      <table className="table table-striped">
        <thead className="thead-light">
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Avatar</th>
          </thead>
          <tbody>
            {userList.map(row => <tr>
              <td>{row.first_name}</td>
              <td>{row.last_name}</td>
              <td>{row.email}</td>
              <td><img src={row.avatar} width="50"/></td>
            </tr>)}
            {userList.length === 0 && <tr>
              <td className='text-center' colSpan="4">
                <b> no data found to display.</b>
              </td>
            </tr>}
          </tbody>
      </table>
      </div>
    );
  }
}

export default App;