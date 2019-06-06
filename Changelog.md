# 1.3.2

* npm fixup

# 1.3.1

* Upgrade mocha, addressing code injection vulnerability in mocha dependency.

# 1.3.0

* Example: Formatter for update game event handles more game data.
* Bulk: The threshold handling works now correct. The threshold counts the incominge messages and flushes the bulk if the count of messages consumed are greater or equal the threshold.
* Bulk: LobbyRemove-Message flushes the bulk. Stopped games are immediately announced.

# 1.2.1

* On plain http servers use ws-Protocol.

# 1.2.0

* Example: use my name.
* Documentation: game events documented.
* Example: show only milestones.
* Example: No messages for place changes *in* branches.
* Event/Update: added functionality to detect branch changes.

# 1.1.0

* Example: Start event formatter creates now watch url.
* ServerInfo: Lobby expects now a server url. WebSocket-Url and Watch-Url can then computed.
* Sinks: You can now add multiple sinks.
* Example: spectator info removed. It was to spammy.
* Example: Superfluous space in stop formatter removed.

# 1.0.2

* Fixed typo in README.md

# 1.0.1

* Added a keyword to package.json.

# 1.0.0

* Initial release.
