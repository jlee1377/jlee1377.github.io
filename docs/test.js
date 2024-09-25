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


/*
const urlParams = new URLSearchParams(window.location.search);
const runtest = urlParams.get('test');

  var options = {
    width: 800,
    height: 500,
    channel: "monstercat",
    layout: 'video-with-chat'
  };
  var player = new Twitch.Embed("test", options);

  if (runtest) {
    log('run test');
    player.addEventListener(Twitch.Embed.VIDEO_READY, function() {
      log('Attempt volumne and unmute');
      player.setVolume(0.1);
      player.setMuted(false);
    });
  }

  function log(txt, other) {
    var sp = document.createElement('div');
    sp.textContent = new Date().getTime() + ': ' + txt;

    var t = other ? 'logb' : 'log';
    document.getElementById(t).prepend(sp);
  }

  player.addEventListener(Twitch.Embed.VIDEO_READY, function() {
    log('The video is ready');
  })
  player.addEventListener(Twitch.Embed.VIDEO_PLAY, function() {
    log('The video is playing');
  })

  document.getElementById('play').addEventListener('click', (e) => {
    log('Attempt Play');
    player.play();
  });
  document.getElementById('pause').addEventListener('click', (e) => {
    log('Attempt Pause');
    player.pause();
  });
  document.getElementById('volume').addEventListener('click', (e) => {
    log('Attempt Volume: ' + document.getElementById('volume_value').value);
    var val = parseFloat(document.getElementById('volume_value').value);
    player.setVolume(val);
  });
  document.getElementById('volume_get').addEventListener('click', (e) => {
    log('Attempt Get Volume');
    log('Volume ' + player.getVolume());
  });

  document.getElementById('mute').addEventListener('click', (e) => {
    log('Attempt Mute');
    player.setMuted(true);
  });
  document.getElementById('unmute').addEventListener('click', (e) => {
    log('Attempt UnMute');
    player.setMuted(false);
  });
  document.getElementById('muted').addEventListener('click', (e) => {
    log('Attempt Get muted');
    log(player.getMuted());
  });

  setInterval(() => {
    var status = '';

    if (player.isPaused()) {
      status += 'Paused ';
    } else {
      status += 'Playing ';
    }

    if (player.getMuted()) {
      status += 'Muted ';
    } else {
      status += 'UnMuted ';
    }
    status += 'Vol: ' + player.getVolume();

    status += ' ' + player.getQuality();

    document.getElementById('status').textContent = status;
  }, 250);

  document.getElementById('change').addEventListener('click', (e) => {
    var channel = document.getElementById('channel').value;
    log('Change channel ' + channel);
    player.setChannel(channel);
  });

  document.getElementById('quality_get').addEventListener('click', (e) => {
    log('Fetch Quality');
    log(player.getQuality());
  });
  document.getElementById('qualities_get').addEventListener('click', (e) => {
    log('Fetch Qualities');

    var target = document.getElementById('quality');
    target.textContent = '';

    var qol = player.getQualities()
    for (var x=0;x<qol.length;x++) {
      var opt = document.createElement('option');
      opt.value = qol[x].group;
      opt.textContent = qol[x].name;
      target.append(opt);
    }
  });
  document.getElementById('quality_change').addEventListener('click', (e) => {
    var target = document.getElementById('quality').value;
    log('Set quality to ' + target);
    player.setQuality(target);
  });

  var events = [
    Twitch.Player.ENDED,
    Twitch.Player.PAUSE,
    Twitch.Player.PLAY,
    Twitch.Player.PLAYBACK_BLOCKED,
    Twitch.Player.PLAYING,
    Twitch.Player.OFFLINE,
    Twitch.Player.ONLINE,
    Twitch.Player.READY
  ]
  for (var x=0;x<events.length;x++) {
    quickBind(events[x]);
  }
  function quickBind(evt) {
    player.addEventListener(evt, (e) => {
      log('Captured ' + evt, true);
    });
  }
*/