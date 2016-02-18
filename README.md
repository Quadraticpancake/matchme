# MatchMe
Be the best matchmaker ever

<hr>

## Team

 - __Development Team Members__: [Alex Bailey](https://github.com/staybailey), [Rachel RoseFigura](https://github.com/rachelrf), [Jay Chen](https://github.com/jchen85), [Ian Liu](https://github.com/ianbruin)
 
<hr>

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Architecture](#architecture)
1. [API](#api)

<hr>
## Usage

MatchMe is a gamified dating web application wherein users act as matchmakers instead of browsing for themselves. Fun for both those on and off the dating market, MatchMe lets users choose matches for other random compatible users by selecting which of the two candidates is the best match for that person. MatchMe also includes chatting and other features for an fun way to find your next friend or date. Visit [matchme1.herokuapp.com](http://matchme1.herokuapp.com) to check it out! To run locally, clone down the repo and follow these steps: 1. run 'npm install' 2. run 'npm run test' to run populate the database and run database tests. 3. start the server with 'npm start' 4. visit http://localhost:3000/.

<hr>
## Requirements

- Node 0.10.x
- Express 
- Postgresql 9.1.x
- React 
- Redux 

<hr>
## Architecture
### Database Schema
<h4>PostgreSQL database</h4>
![](http://imgur.com/u1jYgAh.png)

<hr>

## API
##### Public End Points
|Request|URL|Response|
|---|---|---|
|Get Triad of Candidates for User|/api/candidates/:user_id|triadObj|
|Add Match Event|/api/pairs|connectedPairObj || false|
|Get Match Score|/api/matchmakerScore/:user_id|userScoreObj|
|Get Chat Data for User|/api/chats/:user_id|chatObj|
|Post New User|/api/users|userObj|
|Get User Info (login)|/api/users/:facebook_id|userObj|
|Update User Info|/api/users/:userID|userObj|
|Like/Unlike Match|/api/chatsheart|heartInfoObj|
|Connect with Points|/api/purchases/candidate|score (Int)|
|Delete Match|/api/pairs/:pair_id/close|pair_id (Int)|
|Update Profile Picture|/api/users/:user_id/pictures |userObj|
|Get User's Photo Album|/api/users/:user_id/album |albumObj|
|Update User's Photo Album|/api/users/:user_id/album |ablumObj|
|Get Recommendation|/api/users/:user_id/recommendation |recommendationObj|
