window.addEventListener('load', () => {
   let long;
   let lat;
   const description = document.querySelector('.description');
   const degree = document.querySelector('.degree');
   const location = document.querySelector('.location-timezone');
   const degree_section = document.querySelector('.degree-section');
   const span = document.querySelector('span');

   if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(position => {
         lat = position.coords.latitude;
         long = position.coords.longitude;

         const proxy = 'https://cors-anywhere.herokuapp.com/';
         const api = `${proxy}https://api.darksky.net/forecast/b7e7360fb9afad505644a1aa73193d4d/${lat},${long}`;

         fetch(api).then(data => {
            return data.json().then(data => {
               console.log(data);
               const { temperature, summary, icon } = data.currently;
               degree.textContent = temperature + '°';
               description.textContent = summary;
               location.textContent = data.timezone;

               let celsiusTemp = (temperature - 32) * 5/9;

               setIcons(icon, document.querySelector('.icon'))

               degree_section.addEventListener('click', () => {
                  if(span.textContent == 'F') {
                     span.textContent = 'C';
                     degree.textContent = celsiusTemp.toFixed(2) + '°';
                  } else {
                     span.textContent = 'F';
                     degree.textContent = temperature + '°';
                  }
               });
            });
         });
      });

      function setIcons(icon, IconID) {
         const skycons = new Skycons({ color: "white" });
         const currentIcon = icon.replace(/-/g, "_").toUpperCase();
         skycons.play();
         return skycons.set(IconID, Skycons[currentIcon]);
      }
   } else {
       location.textContent = "Couldn't access location.";
   }
});