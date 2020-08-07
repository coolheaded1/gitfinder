import React, {Component} from 'react';
import './App.css';

const URL = `https://api.github.com/users`

class App extends Component {
  constructor (props) {
    super(props);

    this.state = {
      username: 'coolheaded1',
      name: null,
      avatar: null,
      location: null,
      repos: null,
      followers: null,
      following: null,
      homeUrl: null,
      notFound: null,
      created_at: null,
    }
  }

  fetchProfile = (username) => {
    fetch(`${URL}/${username}`)
      .then(response => response.json())
      .then(user => {
        this.setState({
          username: user.login,
          name: user.name,
          avatar: user.avatar_url,
          repos: user.public_repos,
          followers: user.followers,
          following: user.following,
          homeUrl: user.html_url,
          notFound: user.message,
          created_at: user.created_at,
        })
      })
      .catch(err => console.log('Oops! An error ocurred.'))
  }

  componentDidMount () {
    this.fetchProfile(this.state.username)
  }

  handleSubmit = (e) => {
    e.preventDefault();
    // let username = this.refs.username.value;
    let username = this.state.username;
    this.fetchProfile(username);
  }

  handleChange = (e) => {
    this.setState({
      username: e.target.value,
    })
  }

  render () {
      return (
        <div>
          <nav className="bg-primary p-1 text-light text-center"><br/>
            <p className="github">GitHub Profile Finder</p>
          </nav>
          <div className="container box">
            <div className="row">
              <div className="col-md-12 col-sm-12 mt-4">
                  <div className="mb-5">
                    <form onSubmit={this.handleSubmit}>
                      
                      <input type="search" onChange={this.handleChange} placeholder="Type Username and hit Enter" className="form-control input p-3"/>
                    </form>
                    
                  </div>
                  {
                    this.state.notFound === 'Not Found' ?
                    <div className="p-3 bg-red-500 text-red-300 rounded">
                      <span>Oops! can't find this user. Try again</span>
                    </div>
                    :
                    <div className="container">
                    <div style={{margin: 'auto'}} >
                    <center className="mt-4"> <img src={this.state.avatar} alt="Profile image" style={{borderRadius: '50%', width: 100, height: 100,}} className="shadow-lg"/><br/>
                      <a href={this.state.homeUrl} target="_blank" className="btn btn-primary rounded text-light mt-3">View profile</a></center>
                    </div><br />
                    

                    <div className="shadow p-5 sidebar rounded">
                      <p className="text-primary">Name: {this.state.name}</p>
                      <p className="text-primary">Username: {this.state.username}</p>
                      <p className="text-primary">Joined: {this.state.created_at}</p>
                      <div className="mobile">
                        <p className="text-primary">Followers <sup><span className="badge badge-success p-1">{this.state.followers}</span></sup></p>
                        <p className="text-primary">Following <sup><span className="badge badge-warning p-1">{this.state.following}</span></sup></p>
                        <p className="text-primary">Repositories <sup><span className="badge badge-danger p-1">{this.state.repos}</span></sup></p>
                      </div>

                        <div className="box2 bg-primary rounded text-light text-center p-2">
                          <div className="row">
                            <div className="col-md-4 col-sm-4">
                              <h5>{this.state.followers}</h5>
                              <span>Followers</span>
                            </div>

                            <div className="col-md-4 col-sm-4">
                              <h5>{this.state.following}</h5>
                            <span>Following</span>

                            </div>

                            <div className="col-md-4 col-sm-4">
                              <h5>{this.state.repos}</h5>
                              <span>Repositories</span>

                            </div>
                          </div>
                        </div>
                    </div>
                  </div>
                  }
              </div>
            </div>
          </div>
          <footer>
            <div className="root">Developed by <a href="http://www.twitter.com/Coolheaded8" target="_blank">Coolheaded</a></div>
          </footer>
          
        </div>
      )
    
  }
}
export default App
