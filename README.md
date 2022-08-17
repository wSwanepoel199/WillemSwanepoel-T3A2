# Myshalair - a dog breeder's website

## Purpose

The purpose of this website is to have an online presence for a small business that breeds dogs. The owner of the business would like to have a website that allows her to maintain communication with other breeders and with owners of her stock so that she is better able to build a dog-based community.

It impliments material ui and react bootstrap for its styling framework, this is done to emphasize a standard styling criteria while being able to quickly and easily design pages and alter how they render based off a veriety of factors.
Myshalair also impliments a variety of tools specific to react functionality, react-router allows for easy and smart routing and rendering of unique components while material ui's date picker addon makes it easy to select and save dates, using Moment as the main date handling framework due to its ease of use and easily implimented support for a veriety of date formats.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) using the basic template.

## Running Myshalair

### `npm install`

Has to be run inorder to install all dependancies that Myshalair requires to function

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

## Functionality

The primary function of the website is to allow information about breeding dogs to be displayed. Litters produced by breeding dogs will automatically generate information for the puppies. Ownership of a puppy entitles an owner to maintain an account on the website and participate in forum discussions which function to permit the creation of a community. Future litters are also displayed on the website and have the function of allowing the expression of interest in their puppies by prospective customers, which in turn enables litter and customer allocation functionality.

Client rendering will occur for the display pages for dogs and litters, enabling richly animated and responsive user experiences. Server rendering will be used by exception.

## Target audience

People that like cocker spaniels and want to buy prize winning examples in the Brisbane area. One imagines mostly wealthy middle aged women, but one is only imagining.

## Tech stack

The website has a React front end, which makes use of Material Ui and its depenancies, incuding Emotion, fontsource/roboto, date-io and moment. It also impliments reaact-bootstrap for additional styling tools. It uses axios to handle requests and responses from the backend and dnd-kit for drag and drop functionality.

The Rails back end uses a Postgres DB. Images are stored on Cloudinary and their implementation on the website is handled by the activestorage module of Rails. Payment will be handled by Stripe.

The website will be hosted on a Heroku free instance during UAT, with the decision of whether to move it to a more robust instance and the provider of the instance to be made by the customer after UAT.
