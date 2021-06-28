# I Know That Joint!

***Turn your Spotify player into a fun guessing game***


# Installation

1. Clone or download [this repo](https://github.com/AndrayDomise/i-know-that-joint)
2. Install dependencies: 
`$ npm install`
3. Set environment variables
4. Start the server and run the client:
`$ npm start`
5. Click "Login With Spotify" at the top of the page
6. Once logged in, activate your Spotify player by playing any song and pausing after 5 seconds
7. Refresh the page, and you're good to go!
 

## Playing the Game

1. Click "Go!" to start a track playing
2. Once you know the name of the song, click "I Know That Joint!" to stop the counter and enter your song
3. Type your answer into the text form and hit "enter"

If the song is correct, points will be added to your counter. If incorrect, 25 points will be deducted.

## Development

The game is currently capable of playing in solo mode, with the user score held in state. Next steps are:

1) Add a team mode, for up to four teams to compete
2) Score users and high scores in the game's database
3) Choose from four different playlists: 80s, 90s, 00's, and 10s
4) Voice-to-text, to allow users to speak the answer as well as type