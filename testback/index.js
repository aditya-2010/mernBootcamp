console.log("Start");
function getRepos(callback) {
  setTimeout(() => {
    console.log("Reading data form database...");
    callback(["repo1", "repo2", "repo3"]);
  }, 2000);
}
console.log("Finish");

getRepos((repos) => {
  console.log("My repos:", repos);
});

getUser(1, displayUser);

const displayCommits = (commits) => {
  console.log(commits);
};

function displayRepos(repos) {
  getCommits(repos, displayCommits);
}

const displayUser = (user) => {
  getRepos(user.username, displayRepos);
};
