const dbus = require("dbus-next");
const bus = dbus.sessionBus();

async function getMediaInfo() {
  const result = [];

  try {
    const introspect = await bus.getProxyObject(
      "org.freedesktop.DBus",
      "/org/freedesktop/DBus",
    );

    const dbusInterface = introspect.getInterface("org.freedesktop.DBus");
    const names = await dbusInterface.ListNames();

    const players = names.filter((name) =>
      name.startsWith("org.mpris.MediaPlayer2."),
    );

    for (const player of players) {
      try {
        const obj = await bus.getProxyObject(player, "/org/mpris/MediaPlayer2");
        const props = obj.getInterface("org.freedesktop.DBus.Properties");
        const metadata = await props.Get(
          "org.mpris.MediaPlayer2.Player",
          "Metadata",
        );

        const data = metadata.value;

        result.push({
          player,
          title: data["xesam:title"] ? data["xesam:title"].value : "Unknown",
          artist: data["xesam:artist"] ? data["xesam:artist"].value : "Unknown",
          album: data["xesam:album"] ? data["xesam:album"].value : "Unknown",
          coverArt: data["mpris:artUrl"] ? data["mpris:artUrl"].value : null,
        });
      } catch (error) {
        console.log(`Error fetching metadata from ${player}:`, error);
      }
    }
  } catch (error) {
    console.error("Error fetching media players:", error);
  }

  return result;
}

async function getActivePlayer() {
  const introspect = await bus.getProxyObject(
    "org.freedesktop.DBus",
    "/org/freedesktop/DBus",
  )

  const dbusInterface = introspect.getInterface("org.freedesktop.DBus");
  const names = await dbusInterface.ListNames();

  const players = names.filter((name) =>
    name.startsWith("org.mpris.MediaPlayer2."),
  );
  const activePlayers = [];
  for (const player of players) {
    try {
      const obj = await bus.getProxyObject(player, "/org/mpris/MediaPlayer2");
      activePlayers.push(obj);
    } catch (error) {
      //console.log(`Error fetching metadata from ${player}:`, error);
    }
  }

  const activePlayer = activePlayers[0];

  return activePlayer || null;
}

async function playPause() {
  const player = await getActivePlayer();
  const props = player.getInterface("org.freedesktop.DBus.Properties");
  const status = await props.Get(
    "org.mpris.MediaPlayer2.Player",
    "PlaybackStatus",
  );
  if (status.value === "Playing") {
    const playerInterface = player.getInterface("org.mpris.MediaPlayer2.Player");
    await playerInterface.Pause();
  }
  if (status.value === "Paused") {
    const playerInterface = player.getInterface("org.mpris.MediaPlayer2.Player");
    await playerInterface.Play();
  }
}

async function status() {
  const player = await getActivePlayer();
  const props = player.getInterface("org.freedesktop.DBus.Properties");
  const status = await props.Get(
    "org.mpris.MediaPlayer2.Player",
    "PlaybackStatus",
  );
  return status.value;
}

async function next() {
  const player = await getActivePlayer().then((player) => player.getInterface("org.mpris.MediaPlayer2.Player"));
  await player.Next();
}

async function prev() {
  const player = await getActivePlayer().then((player) => player.getInterface("org.mpris.MediaPlayer2.Player"));
  await player.Previous();
}

module.exports = { getMediaInfo, getActivePlayer, playPause, next, prev, status };
