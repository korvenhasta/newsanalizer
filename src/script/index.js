import "../pages/style.css";
import GithubApi from './ghapi.js'

//const serverUrl = NODE_ENV === 'development' ? 'http://praktikum.tk/cohort3' : 'https://praktikum.tk/cohort3'

function starter() {
  return {ghApi: new GithubApi()}
}

function getCommitsFromServer() {
  ghApi.getCommit(commits => commits.forEach(commit => {
      console.log(commit);
    })
  );
}

let {ghApi} = starter();
getCommitsFromServer();
