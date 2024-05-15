// cd Documents/GitHub/jlee1377.github.io/docs
// python3 -m http.server

console.log("script initi");

// Add addEventListener to textbox to allow it to be "Enter"able
document.getElementById('twitchNameSearch').addEventListener(
  "keypress", function(enter) {
    // event.preventDefault();
    if (enter.key === 'Enter') {
      document.getElementById("submitButton").click();
    }
  }
)

// Keeping sticky header
// console.log("testing sticky");
window.onscroll = function() {stickyHeader()};
var header = document.getElementById("header");
var sticky = header.offsetTop;

function stickyHeader() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}

// IP add function to auto populate list with user input
// document.getElementById('').
// API login
var access_token;
var token_type;
var authorizationObject;
function twitchLogin(){
  let clientId = 'ggcot3uct35mk6sgtotwuacv0yqq5b';
  let clientSecret = 'u8da27aoe6cvj85bw454opk5czmfyv';
  let authURL = 'https://id.twitch.tv/oauth2/authorize';
  // let tokeURL = 'https://id.twitch.tv/oauth2/token';
  let url = 'https://id.twitch.tv/oauth2/token?client_id='+clientId+'&client_secret='+clientSecret+'&grant_type=client_credentials';

  fetch(url, {
      method: 'POST',
  })
  .then((res) => res.json())
  .then((data) => {
    console.log('twitchLogin() completed. ' + data.token_type + ' ' + data.access_token);
    access_token = data.access_token;
    token_type = data.token_type;
    let { access_token, expires_in, token_type } = authorizationObject;

    return data});
}
async function getLiveFollowingStreams(){
  const endpoint = 'https://api.twitch.tv/helix/streams';
  // try {
    let authorizationObject = await twitchLogin();
    let { access_token, expires_in, token_type } = authorizationObject;
    // token_type first letter must be uppercase
    token_type =
    token_type.substring(0, 1).toUpperCase() +
    token_type.substring(1, token_type.length);

    let authorization = token_type + ' ' + access_token;

    console.log(authorization);

    let headers = {
    authorization,
    'Client-Id': clientId,
    };

    fetch(endpoint, {
    headers,
    })
    .then((res) => res.json())
    .then((data) => renderStreams(data));
    console.log('getLiveFollowingStreams finished');
  // } catch (err) {
  //   console.error('error: ' + err.message)
  // }
}
function renderStreams(data) {
    console.log(JSON.stringify(data));
}

// Adding embed of stream
function addEmbed(channelName){

  // Clears submit box
  document.getElementById('twitchNameSearch').value="";
  console.log("Cleared textbox?");

  // if stream already exists or not
  if (document.getElementById(channelName+'ID') !== null) {
    console.log("caught, skipping")
  } else {
    console.log("not caught, creating")
    // Creating stream name id string
    var channelnameStreamDivID = channelName + 'ID'

    // Setting variables for name ID to hold button name
    // console.log("starting function for " + channelName);
    var channelnameButtonID = channelName + "button"

    // Creating containerLvl2 and set naming ID
    // console.log("creating div");
    var newTwitchEmbed = document.createElement('article');
    newTwitchEmbed.id = channelnameStreamDivID;

    // Creating button element
    // console.log("creating button");
    var butt = document.createElement('BUTTON');
    butt.id=channelnameButtonID;
    // console.log("alt x:");
    butt.innerHTML="x";

    // Creating and setting embed containerLvl2 into containerLvl1
    // console.log("embedding new div into container")
    document.getElementById("twitch-container").appendChild(newTwitchEmbed);

    // Creating embed
    // console.log("creating embed");
    var embed = new Twitch.Embed(channelnameStreamDivID, {
      width: 368,
      height: 207,
      channel: channelName,
      layout: "video",
      parent: ["embed.example.com", "othersite.example.com"]
    });

    // console.log('testing channel name button id')
    // console.log(channelnameButtonID);

    // Adding button listener event
    // console.log("creating button listener");
    butt.addEventListener('click',() => {
      // console.log('click');
      document.getElementById(channelnameStreamDivID).remove();
      document.getElementById(channelnameButtonID).remove();
    })

    // Appending button into ContainerLvl2
    // console.log("appending button");
    document.getElementById(channelnameStreamDivID).appendChild(butt);
    // console.log("attempting to add x");
    // document.getElementById(channelnameButtonID).innerHTML="x";
    // console.log("x appended");

    // Setting embed settings
    // console.log("creating embed listener");
    embed.addEventListener(Twitch.Embed.VIDEO_READY, () => {
      var player = embed.getPlayer();
      player.setQuality("160p");
      player.setVolume("0.01");
      player.play();
    });
  }
}

function clearAll() {
  // console.log('clearing?');
  // not getting through
  while (document.getElementById('twitch-container').firstElementChild) {
    document.getElementById('twitch-container').firstElementChild.remove();
    // console.log('removed '+document.getElementById('twitch-container').firstElementChild.id)
  }
  // document.getElementById('twitch-container').clear();
  // console.log('cleared?')
}
