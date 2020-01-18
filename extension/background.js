// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({color: '#3aa757'}, function() {
    console.log('The color is green.');
  });
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostEquals: 'developer.chrome.com'},
      })],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});

// Global watch list
let URL_list = ["https://www.youtube.com/", "https://www.netflix.com/", "https://www.hulu.com/","https://www.hbo.com/","https://www.xfinity.com/", "https://www.crunchyroll.com/","https://www.disneyplus.com/", "https://www.apple.com/apple-tv-plus/","https://www.cinemax.com/","https://www.amazon.com/Prime-Video/","https://www.adultswim.com/streams", "https://www.fubo.tv/",]

//URL Parsing Function 
let IsInList = (url) => {
  URL_list.forEach(element => {
    if (url.includes(element)){
      alert(element)
      return true
    }
  })
  return false 
}
// Global history
let tabHist = []

// Put to server
let server = (url, delta) => {
  let msg = "url: " + url + " delta: " + (delta/1000)
  alert(msg)
}

// Calulate time diff
let deltaCalc = (TH, now) => {
  let delta = now-TH[1]
  let url = TH[0]
  server(url, delta)
  tabHist = []
}

// Listen to tab change
chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, (tabs) => {
    let url = tabs[0].url;
    if (tabHist.length === 2){
      deltaCalc(tabHist, Date.now())
    }
    if (IsInList(url)){ 
        let timeStart = Date.now()
        tabHist = [url, timeStart];
    }
  });
});

// listen to tab close
chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {
  if (tabHist.length === 2){
    deltaCalc(tabHist, Date.now())
  }
});
