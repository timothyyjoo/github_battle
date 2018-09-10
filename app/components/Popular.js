var React = require('react');
var PropTypes = require("prop-types");
var api = require('../utils/api');


function SelectLanguage (props) {
  let languages = ["All", 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];

  return (
    <ul className="languages">
      {languages.map((lang) =>  {
        return(
          <li
            style={lang === props.selectedLanguage ? {color: "#d0021b"} : null}
            onClick={props.onSelect.bind(null, lang)}
            key={lang}>
            {lang}
          </li>
        )
      })}
    </ul>
  )
};


function RepoGrid (props) {
  console.log(props)
  return(
    <ul className="popular-list">

      {props.repos.map(function (repo, index) {
        return(
          <li
            key={repo.name}
            className="popular-item">
              <div className="popular-rank">#{index + 1}</div>
                <ul className='space-list-items'>
                  <li>
                    <img
                      className='avatar'
                      src={repo.owner.avatar_url}
                      alt={'Avatar for ' + repo.owner.login}
                    />
                  </li>
                  <li><a href={repo.html_url}>{repo.name}</a></li>
                  <li>@{repo.owner.login}</li>
                  <li>{repo.stargazers_count} stars</li>
                </ul>
          </li>
        )
      })}
    </ul>
  )

RepoGrid.propTypes = {
  repos: PropTypes.array.isRequired
}
};

SelectLanguage.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
}
//three parts of a component:
//state
//lifecycle methods
//ui




class Popular extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      selectedLanguage: 'All',
      repos: null
    };

    this.updateLanguage = this.updateLanguage.bind(this);
  }

  componentDidMount ()  {
    //AJAX REQUEST
    this.updateLanguage(this.state.selectedLanguage)
  }

  updateLanguage(lang) {
    this.setState( () => {
      return {
        selectedLanguage: lang,
        repos: null
      }
    });

    api.fetchPopularRepos(lang)
      .then(function (repos) {
        this.setState(function () {
          return {
            repos: repos
          }
        })
      }.bind(this));
  }

  render() {
    return (
      <div>
        <SelectLanguage
          selectedLanguage={this.state.selectedLanguage}
          onSelect={this.updateLanguage}
          />
          {!this.state.repos
            ? <p> LOADING </p>
            : <RepoGrid repos={this.state.repos} />}

          // {JSON.stringify(this.state.repos, null, 2)}
      </div>
    )
  }
}

module.exports = Popular;
