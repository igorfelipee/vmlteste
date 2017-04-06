import React, { Component, PureComponent } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import './RepoDetails.css';
import $ from 'jquery';

class RepoDetails extends PureComponent{

  constructor(props){
    super(props);
    this.state = {repo: {}, commits: []};
    this.getCommits = this.getCommits.bind(this);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  getCommits(){
    var actualRepo = window.location.pathname;
    var page = localStorage.getItem('page');
    console.log(page);
    $.get({
      url:"https://api.github.com/repos/globocom"+actualRepo+"/commits?per_page=20&page="+page,
      dataType: 'json',
      success:function(resposta){
        if(resposta.length < 20){
          document.getElementById("btn").style.visibility = "hidden";
        }
        for(var i = 0; i< resposta.length; i++){
          let commits = this.state.commits;
          commits.push(resposta[i]);
        }
        var commits = this.state.commits;
        this.setState({commits: commits});
      }.bind(this)
    })
    var next = parseInt(page) + 1;
    localStorage.setItem('page', next);
  }
  componentDidMount(){
    var actualRepo = window.location.pathname;
    $.ajax({
      url:"https://api.github.com/repos/globocom"+actualRepo,
      dataType: 'json',
      success:function(resposta){
        console.log(resposta);
        this.setState({repo: resposta});
      }.bind(this)
    })
    localStorage.setItem('page', 1);
    this.getCommits();
  }
  render(){
    return(
      <div className="repo-details">
        <h1>{this.state.repo.full_name} -
          <small> {this.state.repo.description}
            <span><i className="fa fa-star" aria-hidden="true"></i> {this.state.repo.stargazers_count}</span>
            <span><i className="fa fa-code-fork" aria-hidden="true"></i> {this.state.repo.forks_count}</span>
          </small>
        </h1>
        <h2>Commits <i className="fa fa-github-alt" aria-hidden="true"></i></h2>
        {
            this.state.commits.map(function(commit){
              return(
                <a href={commit.url} target="_blank" key={commit.sha}>
                  <div className="commit">
                    <span>{commit.commit.message}</span>
                  </div>
                </a>
              );
            })
        }
        <input className="btn right" id="btn" type="button" value="Carregar +" onClick={this.getCommits}/>
      </div>
    );
  }
}
export default RepoDetails;
