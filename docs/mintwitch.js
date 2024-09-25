/* 
  python3 -m http.server
*/

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

// This is only called through function getLiveFollowingStreams()
function twitchLogin(){
  let clientId = config.clientID; //maybe put in global?
  let clientSecret = config.clientSecret; //maybe put into global?

  // this is non-client request
  // let url = `https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`;
  // this is implicit grant request
  let url = `https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=${clientId}&redirect_uri=http://localhost:8000&scopes=user%3Aread%3Afollows`;
  // this is device code grant flow 
  // let url = `https://id.twitch.tv/oauth2/device?client_id=${clientId}&scopes=user%3Aread%3Afollows`;
  // console.log(url);
  return fetch(url, { method: 'POST', })
  .then((res) => res.json())
  .then((data) => {
    // console.log('twitchLogin() completed. ' + data.token_type + ' ' + data.access_token);
    console.log(data);
    // access_token = data.access_token;
    // token_type = data.token_type;

    return data});
}

// Call this function in html
async function getLiveFollowingStreams(){
  const endpoint = 'https://api.twitch.tv/helix/streams/followed';

  let authorizationObject = await twitchLogin();
  let { access_token, expires_in, token_type } = authorizationObject;

  // [non-client request] token_type first letter must be uppercase
  // token_type =
  // token_type.substring(0, 1).toUpperCase() +
  // token_type.substring(1, token_type.length);

  // [non-client request]
  // let authorization = `${token_type} ${access_token}`;
  // console.log(authorization);

  let headers = {
    'user_id':authorizationObject.user_code,
  };

  fetch(endpoint, {
    headers,
  })
  .then((res) => res.json())
  // .then((data) => renderStreams(data));
  console.log(res);
  console.log('getLiveFollowingStreams finished');
}

// Adding embed of stream
function addEmbed(channelName){

  // Clears submit box
  document.getElementById('twitchNameSearch').value="";
  // console.log("Cleared textbox?");

  // if stream already exists or not
  if (document.getElementById(channelName+'ID') !== null) {
    // console.log("caught, refreshing")
    document.getElementById(channelName + 'ID').remove();
    addEmbed(channelName);
  } else {
    // console.log("not caught, creating")
    // Creating stream name id string
    var channelnameStreamDivID = channelName + 'ID'

    // Setting variables for name ID to hold button name
    // console.log("starting function for " + channelName);
    var channelnameButtonID = channelName + "button"

    // Creating containerLvl2 and set naming ID
    // console.log("creating div");
    var newTwitchEmbed = document.createElement('article');
    newTwitchEmbed.id = channelnameStreamDivID;

    // Creating button element to close
    // console.log("creating button");
    var closeButt = document.createElement('BUTTON');
    closeButt.id=channelnameButtonID+"close";
    closeButt.innerHTML="x";

    // Creating button element for refresh
    var refreshButt = document.createElement('BUTTON');
    refreshButt.id=channelnameButtonID+"refresh";
    refreshButt.innerHTML="re"

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
    closeButt.addEventListener('click',() => {
      // console.log('click');
      document.getElementById(channelnameStreamDivID).remove();
      // document.getElementById(channelnameButtonIDclose).remove();
      // document.getElementById(channelnameButtonIDrefresh).remove();
    })

    refreshButt.addEventListener('click',()=>{
      console.log("testing refresh");
      document.getElementById(channelName + 'ID').remove();
      addEmbed(channelName);
    })

    // Appending button into ContainerLvl2
    // console.log("appending button");
    document.getElementById(channelnameStreamDivID).appendChild(closeButt);
    document.getElementById(channelnameStreamDivID).appendChild(refreshButt);
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

function refreshAll(){
  var streamname ="";
  // console.log("refreshing all ip. There are total of "+document.getElementById('twitch-container').childElementCount);
  // TODO
  for (let i = 0; i < document.getElementById('twitch-container').childElementCount; i++) {
    // streamname= document.getElementById('twitch-container').firstElementChild.id.substring(0,document.getElementById('twitch-container').firstElementChild.id.length-2);
    // console.log(streamname);
    addEmbed(document.getElementById('twitch-container').firstElementChild.id.substring(0,document.getElementById('twitch-container').firstElementChild.id.length-2));
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
