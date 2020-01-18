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

//let activeTab = () =>{}
let URL_list = ["https://www.youtube.com/", "https://www.netflix.com/", "https://www.hulu.com/","https://www.hbo.com/","https://www.xfinity.com/", "https://www.crunchyroll.com/","https://www.disneyplus.com/", "https://www.apple.com/apple-tv-plus/","https://www.cinemax.com/","https://www.amazon.com/Prime-Video/","https://www.adultswim.com/streams", "https://www.fubo.tv/"]
chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, (tabs) => {
  let url = tabs[0].url;
  alert(tabs.toString())
  alert(url)

  if (URL_list.includes(url)){ 
    let timeStart = Date.now()
    console.log(url, timeStart) //returns the url with a time stamp to the function that calcs delta to next time
    let printVar = url + ' ' + timeStart
    alert(printVar); //url and time must be concatonated  parse at "/" number junction 
  
  }
  else {
      let timeEnd = Date.now() 
      console.log(url, timeEnd) //returns the time stamp for non important websites  no deltas will be calced from these only to these
      let printVar2 = url + ' ' + timeEnd
      alert(printVar2);

  }

});
