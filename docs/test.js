console.log("script initi");

// IP add function to auto populate list with user input
function twitchLogin(){
  // let clientId = config.clientID;
  // let clientSecret = config.clientSecret; 

  // this is non-client request
  // let url = `https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`;
  // this is implicit grant request
  let url = `https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=${clientId}&redirect_uri=http://localhost:8000&scopes=user%3Aread%3Afollows&response_type=token`;
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
