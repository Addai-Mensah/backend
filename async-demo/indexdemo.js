console.log("before")
// getUser(1, function(user){
// getRepository(user.gitHubUserName, function(repos){
//     console.log("Repos",repos)
// })
// })


// using promise approach

//  getUser(1)
// .then(user => getRepository(user.gitHubUserName))
// .then(repos => getCommits(repos[0]))
// .then(commits => console.log("commits",commits))

// .catch(err => console.log("Error",err.message))


// using async and await approach
 async function displayCommits(){
    const user = await  getUser(1);
    const repos = await getRepository(user.gitHubUserName);
    const commit = await getCommits(repos[0]);
    console.log(commit);
    
}
displayCommits()

console.log("after");












// this code will not work because getuser is being called earlier than the settiomeout
// function getUser(id){
//     setTimeout(() =>{
//         console.log("reading a user from a database....")
//         return{id:id, gitHubUserName:"kojo"}
//     },2000)
     
// }


function getUser(id){
    return new Promise((resolve,reject) =>{

        setTimeout(() => {
            console.log("Reading a user from a database...");
            resolve( {id:id, gitHubUserName:"kojo"});
        },2000);
    })      
}

function getRepository(username){
    return new Promise((resolve,reject) =>{
        setTimeout (() =>{
            console.log("calling Github API...")
            resolve(["repo1","repo2","repo3"]);
        },2000)
    })
    
}

function getCommits(repo){
    return new Promise ((resolve,reject) =>{
        setTimeout(() =>{
            console.log("calling Github API...")
            resolve(["commit"])
        },2000)
    })
}