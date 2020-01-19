//UV is user value based(will eventually be based on the users settings)
//other variables are costs of various servises that could be changed based on what version of ther service the user has
Ne = 0.00;
H = 0.00;
Hu = 0.00;
YT = 0.00;
Xf = 0.00;
Cr = 0.00;
Dp = 0.00;
Ap = 0.00;
Az = 0.00;

var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value / 100; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function () {
  output.innerHTML = this.value / 100;
}
var UV = document.getElementById("myRange").value / 100;
document.getElementById("myRange").addEventListener('change', (event) => {
  var UV = document.getElementById("myRange").value / 100;
  getdata();
  console.log(UV)
});
//helper function that calculates avg value per time
let calculate = (service, time) => {
  //creates defulat Cost(C) value
  let C = 1
  //finds C value based on which servie the average is being calculated for
  if (service == "Netflix") {
    C = Ne;
  }
  if (service == "HBO") {
    C = H;
  }
  if (service == "Hulu") {
    C = Hu;
  }
  if (service == "Youtube") {
    C = YT;
  }
  if (service == "Xfinity") {
    C = Xf;
  }
  if (service == "Crunchyroll") {
    C = Cr;
  }
  if (service == "DisneyPlus") {
    C = Dp;
  }
  if (service == "AppleTV") {
    C = Ap;
  }
  if (service == "AmazonPrime") {
    C = Az;
  }
  //calculates Average cost per time
  if (C == 0) return (0.00).toFixed(2);
  else if (time == 0) return C.toFixed(2)
  else {
    let avg = C / time;
    return avg.toFixed(2);
  }
}
//helper functuin to find color Value based on avg compared to UV
let getColor = (avg, UV) => {
  let Color = "#000000";
  if (avg > 1.2 * UV) {
    if (avg > (UV * 1.6)) Color = "#FF0000";
    else Color = "#FF7000";
  }
  else if (avg <= 1.2 * UV && avg > 0.8 * UV) Color = "#FFE000";
  else if (avg <= 0.8 * UV) {
    if (avg > (UV * 0.4)) Color = "#70FF00";
    else Color = "#00FF00";
  }
  return Color;
}
//helper functuin to find fair bool based on avg compared to UV
let getFair = (avg, UV) => {
  let Fair = true;
  if (avg > UV) Fair = false;
  return Fair;
}
//helper funciton to get the time value for each server
let jsonInt = (json) => {
  return json["integerValue"]
}
//helper funciton to get the time value for each server
let jsonDouble = (json) => {
  if (json['integerValue']) return 0.00
  else return json["doubleValue"]
}
//helper funciton to get the time value for each server
let jsonString = (json) => {
  return json["stringValue"]
}
//funtion that Updates UI values
let updateUI = (data) => {
  TotalTime = 0;
  console.log(data);
  //personal data for each subscription service that month
  Object.entries(data).forEach(([key, value]) => {
    TotalTime += parseInt(value.time);
  })
  //personal totals for the month
  document.getElementById("netflix_cost").innerHTML = data.Netflix.DollarsPerHour;
  document.getElementById("netflix_hours").innerHTML = data.Netflix.time;
  document.getElementById("netflix_color").style.color = data.Netflix.color;
  document.getElementById("Hulu_cost").innerHTML = data.Hulu.DollarsPerHour;
  document.getElementById("hulu_hours").innerHTML = data.Hulu.time;
  document.getElementById("hulu_color").style.color = data.Hulu.color;
  document.getElementById("youtube_cost").innerHTML = data.Youtube.DollarsPerHour;
  document.getElementById("youtube_hours").innerHTML = data.Youtube.time;
  document.getElementById("youtube_color").style.color = data.Youtube.color;
  document.getElementById("HBO_cost").innerHTML = data.HBO.DollarsPerHour;
  document.getElementById("HBO_hours").innerHTML = data.HBO.time;
  document.getElementById("HBO_color").style.color = data.HBO.color;
  document.getElementById("apple_cost").innerHTML = data.AppleTV.DollarsPerHour;
  document.getElementById("apple_hours").innerHTML = data.AppleTV.time;
  document.getElementById("apple_color").style.color = data.AppleTV.color;
  document.getElementById("disney_cost").innerHTML = data.DisneyPlus.DollarsPerHour;
  document.getElementById("disney_hours").innerHTML = data.DisneyPlus.time;
  document.getElementById("disney_color").style.color = data.DisneyPlus.color;
  document.getElementById("Crunchyroll_cost").innerHTML = data.Crunchyroll.DollarsPerHour;
  document.getElementById("Crunchyroll_hours").innerHTML = data.Crunchyroll.time;
  document.getElementById("Crunchyroll_color").style.color = data.Crunchyroll.color;
  document.getElementById("xfinity_cost").innerHTML = data.Xfinity.DollarsPerHour;
  document.getElementById("xfinity_hours").innerHTML = data.Xfinity.time;
  document.getElementById("xfinity_color").style.color = data.Xfinity.color;
  document.getElementById("amazon_cost").innerHTML = data.AmazonPrime.DollarsPerHour;
  document.getElementById("amazon_hours").innerHTML = data.AmazonPrime.time;
  document.getElementById("amazon_color").style.color = data.AmazonPrime.color;


  let Cost = (Ne + H + Hu + YT + Xf + Cr + Dp + Ap + Az);

  document.getElementById("Cost").innerHTML = Cost.toFixed(2);
  document.getElementById("avgCost").innerHTML = (Cost / TotalTime).toFixed(2);
  document.getElementById("avg_color").style.color = getColor((Cost / TotalTime).toFixed(2), UV);
}
function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}
//gets users price information
let email = getCookie('profile');
console.log("cookie: " + document.cookie);
let getdata = () => {
  fetch('https://firestore.googleapis.com/v1/projects/subsaverdotspace/databases/(default)/documents/user_prefs/' + email + '/')
    //applys user preference in pricing
    .then((data) => {
      return data.json();
    })
    .then((json) => {
      let data = json["fields"];
      UV = 1;
      Ne = jsonDouble(data["netflix_price"]);
      H = jsonDouble(data["hbo_price"]);
      Hu = jsonDouble(data["hulu_price"]);
      YT = jsonDouble(data["youtube_price"]);
      Xf = jsonDouble(data["xfinity_price"]);
      Cr = jsonDouble(data["crunchyroll_price"]);
      Dp = jsonDouble(data["disneyplus_price"]);
      Ap = jsonDouble(data["appletv_price"]);
      Az = jsonDouble(data["amazonprime_price"]);
    })
    //gets users data
    .then(() => {
      fetch('https://firestore.googleapis.com/v1/projects/subsaverdotspace/databases/(default)/documents/user_data/' + email + '/')
        //grabs json data from servier
        .then((data) => {
          return data.json();
        })
        .then((json) => {
          // accsesses dara in json file
          let data = json["fields"];
          //finds specific times for each site
          let HBO = jsonDouble(data["time_hbo"]).toFixed(2);
          let Hulu = jsonDouble(data["time_hulu"]).toFixed(2);
          let Netflix = jsonDouble(data["time_netflix"]).toFixed(2);
          let Youtube = jsonDouble(data["time_youtube"]).toFixed(2);
          let Xfinity = jsonDouble(data["time_xfinity"]).toFixed(2);
          let Crunchyroll = jsonDouble(data["time_crunchyroll"]).toFixed(2);
          let DisneyPlus = jsonDouble(data["time_disneyplus"]).toFixed(2);
          let AppleTV = jsonDouble(data["time_appletv"]).toFixed(2);
          let AmazonPrime = jsonDouble(data["time_amazonprime"]).toFixed(2);
          //gets name and sends it to UI
          let Name = jsonString(data["name"]);
          document.getElementById("name").innerHTML = Name
          //creates new json dictonary of values for websites and returns that
          //json for personal data
          let res = {
            "Netflix": Netflix,
            "HBO": HBO,
            "Hulu": Hulu,
            "Youtube": Youtube,
            "Xfinity": Xfinity,
            "Crunchyroll": Crunchyroll,
            "DisneyPlus": DisneyPlus,
            "AppleTV": AppleTV,
            "AmazonPrime": AmazonPrime,
          };
          return res;
        })
        .then((res) => {
          //creating new json to hold newer values
          let UI = {};
          //calculates averages, keep/cancel, and color for each element in the Dictonary
          Object.entries(res).forEach(([key, value]) => {
            //creates temp json to hold temp values before being added to full UI json
            let temp = {}
            temp["time"] = value;
            //calculates avg value per time
            //decides if subscription is good or bad value
            //sends Hex value color code depending on how close it is to baseline
            let avg = calculate(key, value);
            temp["DollarsPerHour"] = avg;
            console.log(UV)
            temp["color"] = getColor(avg, UV);
            temp["Fair"] = getFair(avg, UV);
            //###############################################################################################################
            //old code that sends values to console log
            //
            //
            // if (avg > UV) {
            //     if (avg > (UV * 1.5)) console.log(key + ':$' + avg.toFixed(2) + " per hour: Not Fair" + " | Color: #FF0000");
            //     else console.log(key + ':$' + avg.toFixed(2) + " per hour: Not Fair" + " | Color: #FF7000");
            // }
            // else if (avg == UV) console.log(key + ':$' + avg.toFixed(2) + " per hour: Fair" + " | Color: #FFFF00");
            // else if (avg < UV) {
            //     if (avg > (UV * 0.5)) console.log(key + ':$' + avg.toFixed(2) + " per hour: Fair" + " | Color: #70FF00");
            //     else console.log(key + ':$' + avg.toFixed(2) + " per hour: Fair" + " | Color: #00FF00");
            // }
            //
            //###############################################################################################################

            UI[key] = temp
          })
          return UI;
        })
        //sends UI json to be updated to the website UI
        .then((UI) => {
          updateUI(UI)
        })
        .then(() => {
          fetch('https://firestore.googleapis.com/v1/projects/subsaverdotspace/databases/(default)/documents/global_data/V1/')
            .then((data) => {
              return data.json();
            })
            .then((json) => {
              let data = json["fields"];
              //finds global values 
              let GHBO = jsonDouble(data["global_hbo"]).toFixed(2);
              let GHulu = jsonDouble(data["global_hulu"]).toFixed(2);
              let GNetflix = jsonDouble(data["global_netflix"]).toFixed(2);
              let GYoutube = jsonDouble(data["global_youtube"]).toFixed(2);
              let GXfinity = jsonDouble(data["global_xfinity"]).toFixed(2);
              let GCrunchyroll = jsonDouble(data["global_crunchyroll"]).toFixed(2);
              let GDisneyPlus = jsonDouble(data["global_disneyplus"]).toFixed(2);
              let GAppleTV = jsonDouble(data["global_appletv"]).toFixed(2);
              let GAmazonPrime = jsonDouble(data["global_amazonprime"]).toFixed(2);
              //json for global data to be sent to UI
              let globe = {
                "Netflix": GNetflix,
                "HBO": GHBO,
                "Hulu": GHulu,
                "Youtube": GYoutube,
                "Xfinity": GXfinity,
                "Crunchyroll": GCrunchyroll,
                "DisneyPlus": GDisneyPlus,
                "AppleTV": GAppleTV,
                "AmazonPrime": GAmazonPrime,
              }
              console.log(globe);
              //sending global avg to UI
              document.getElementById("avg_netflix_hours").innerHTML = globe.Netflix
              document.getElementById("avg_hulu_hours").innerHTML = globe.Hulu
              document.getElementById("avg_HBO_hours").innerHTML = globe.HBO
              document.getElementById("avg_youtube_hours").innerHTML = globe.Youtube
              document.getElementById("avg_xfinity_hours").innerHTML = globe.Xfinity
              document.getElementById("avg_Crunchyroll_hours").innerHTML = globe.Crunchyroll
              document.getElementById("avg_disney_hours").innerHTML = globe.DisneyPlus
              document.getElementById("avg_apple_hours").innerHTML = globe.AppleTV
              document.getElementById("avg_amazon_hours").innerHTML = globe.AmazonPrime
            })
        })
    })
}
document.addEventListener("DOMContentLoaded", function(event) { 
  getdata()
});