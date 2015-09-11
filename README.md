# Connect-U

[![Build Status](https://travis-ci.org/tgebhart/connect-u.svg?branch=master)](https://travis-ci.org/tgebhart/connect-u)

Connect-U is a corporate-student portal developed for the Design-U group at the University of Minnesota. Through the app, corporate clients are able to post jobs, track job progress, and view student portfolios. On the student side, users are able to view all posted jobs from their dashboard, accept open jobs, post updates on their work, and seek assistance via either the forum or direct messaging.

## Nerd stuff

Connect-U is a MEAN variant implementing Angular on the front end, Node.js on the back end, and AWS for database and hosting.

## Running Locally

Get the source

    $ git clone https://github.com/tgebhart/connect-u.git
    $ cd connect-u

Packages

    $ npm install
    $ bower install

Install lineman

    $ sudo npm install -g lineman

Run

    $ lineman run

Then open <localhost:8000> in your browser to see it running.
