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

module.exports = { getMediaInfo };
