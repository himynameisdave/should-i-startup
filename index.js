#!/usr/bin/env node
"use strict";
const open = require('open');
const req = require('request-promise');
const endpoint = 'https://www.reddit.com/r/shutdown/new/.json';

//  Util for simple promise-based timeout logs
const timeoutMsg = (msg, timeout) => {
  return new Promise((res) => {
    setTimeout(() => {
      res(console.log(msg));
    }, timeout);
  });
};

//  Util that returns a random item from the dataset
const filterShutdowns = (data) => {
  const buildUrl = (perma) => `https://www.reddit.com${perma}`;
  let shutdown = data.map(item => {
    return {
      title: item.data.title,
      url: buildUrl(item.data.permalink)
    };
  });
  return shutdown[Math.floor(Math.random()*shutdown.length)];
};

timeoutMsg("\n\n\nSo, I heard you wanna startup...", 1000)
  .then(() => {
    return timeoutMsg("\n\nYou sure about that?...", 1800);
  })
  .then(() => {
    return timeoutMsg("\n\nListen, you're not the next Zuck, and your app isn't the 'Uber of <whatever>'...", 2000);
  })
  .then(() => {
    return timeoutMsg("\n\nYou're aware that most startups fail, right...?", 2000);
  })
  .then(() => {
    return timeoutMsg("\n\nDon't believe me? Let me show you...", 1500);
  })
  .then(() => {
    return req(endpoint)
  })
  .then((data) => {
    const shutdown = filterShutdowns(JSON.parse(data).data.children);
    console.log(`\n\n"${shutdown.title}"`);
    open(shutdown.url);
    process.exit(0);
  })
  .catch(e => {
    console.warn(e);
    process.exit(1);
  });
