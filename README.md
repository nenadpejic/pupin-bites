# Pupin Bites

Pupin Bites is made with the intention to help company employees choose a restaurant for ordering food that day. Vote on a restorant, create your order and receive a .csv file.

Live version is [here](https://pupin-bites.netlify.app)

Code is [here](https://github.com/nenadpejic/pupin-bites)

[![thumbnail](https://user-images.githubusercontent.com/50808282/103687188-29cb3400-4f90-11eb-9c41-d577b729eb93.jpg)](https://pupin-bites.netlify.app)

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Credits](#credits)
- [Contributors](#contributors)

## Features

Employees can:
- view all active orders and polls
- add restaurants to poll where they vote for the desired restaurant
- make orders from restaurants with the most votes
- make order independently of a poll
- add and delete restaurants and meals from the database
- export all orders to a CSV file

Application has:
- Landing page - for the public, you can choose the option of Log in or Sign up from the navbar.
- Log in page - if you already have an account
- Signup page - if you want to make an account, redirects to Log in button if signed up successfully

Private routes

- Home - for viewing active polls and orders, search by name, creating a poll or creating order without a poll
- Poll-create - all users can create a poll
- Poll-complete - for all users after voting, the creator can finish poll on this page by clicking the Finish poll button, if not, it will end after 30 minutes
- Single-order-create - all users can create order, if redirected from a poll, the restaurant is already chosen, if redirected from home page - you can choose a restaurant
- Single-order-add - every user can add items to an active order
- Single-order-view - all users can view their order here, the creator can see list of all items here and finish order + export to .csv file (can be opened by Excel)
- Settings page - for adding and deleting restaurants and meals

## Technologies

- react ^17.0.1
- react-router-dom ^5.2.0
- lodash ^4.17.20
- axios ^0.21.0
- react-csv

## Installation

Previously required the installation of NodeJS (v12.14.0 or newer).

- Clone git repository
- Run "npm install" command in NodeJS
- Run "npm install react-csv"

Starting the project

- Run "npm start" command in NodeJS

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Credits

Application was created during "JS Ojačavanje" workshop organised by [SVEA Economy](https://www.svea.com/) and [IT Bootcamp](https://itbootcamp.rs/).

## Contributors

<a href="https://github.com/nenadpejic/pupin-bites/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=nenadpejic/pupin-bites" />
</a>
