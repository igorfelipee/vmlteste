import React, { Component } from 'react';
import './SideBar.css';
import $ from 'jquery';
import {Link} from 'react-router';
export default class SideBar extends Component{
  constructor(){
    super();
    this.state = {repos: []};
  }
  componentDidMount(){
    const repositories = [];
      $.ajax({
        url:"https://api.github.com/orgs/globocom/repos?&per_page=100&page=1",
        dataType: 'json',
        success:function(resposta){
          console.log('Fez a requisição');
          repositories.push(resposta);
          repositories[0].sort(function(a, b){
            return b.stargazers_count - a.stargazers_count;
          });
          this.setState({repos: repositories[0]});
        }.bind(this)
      })

  }
  render() {
    console.log('render');
    return (
      <div className="sidebar">
        <h1 className="brand">Globo.com<br/> <small>Repositórios</small></h1>
        <ul>
          {
              this.state.repos.map(function(repo){
                return(
                  <Link to={`/${repo.name}`} key={repo.id}>
                    <li className="repository">
                      <h2>{repo.name}</h2>
                      <small>{repo.description}</small><br/>
                      <span><i className="fa fa-star" aria-hidden="true"></i> {repo.stargazers_count}</span>
                      <span><i className="fa fa-code-fork" aria-hidden="true"></i> {repo.forks_count}</span>
                    </li>
                  </Link>
                );
              })
          }
        </ul>
      </div>
    );
  }
}
