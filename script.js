 


//   const cityName=document.getElementById('.city');
// const date=document.getElementById('#date'); 
// const temperature=document.getElementById('#temperature');
// const humidity=document.getElementById('#humidity');
// const wind=document.getElementById('#wind');
// const description=document.getElementById('#description');
 

const  searchBox=document.querySelector("#search");
const  SearchBtn=document.querySelector("#SearchBtn");


const apiKey='97cdbdcd15f7bd360eaf5695cc26bcf9';
    const apiUrl='https://api.openweathermap.org/data/2.5/weather?units=metric&q='

    
    async function getWeather(city) {
        const response = await fetch(apiUrl +city+`&appid=${apiKey}`);
        var data = await response.json();
        // console.log(data);

        document.querySelector('#city').innerHTML=data.name;
        document.querySelector('#temperature').innerHTML=Math.round(data.main.temp)+"°C";
        document.querySelector('#humidity').innerHTML=data.main.humidity+"%"; 
        document.querySelector('#humidity').innerHTML=data.wind.speed+"km/h";
        document.querySelector('#description').innerHTML=data.weather[0].description;

        const { lat, lon } = data.coord;

        
        const TimeApiKey='RLSGXSRRNDO3';
        const TimeZonesUrl='http://api.timezonedb.com/v2.1/get-time-zone?format=json'
    
        
          const timeZoneResponse =await fetch(TimeZonesUrl +`&key=${TimeApiKey}`+`&by=position&lat=${lat}`+`&lng=${lon}`);
          const timeZoneData=await timeZoneResponse.json();
          const timeZone = timeZoneData.formatted;
          console.log(timeZoneData );

          console.log(timeZone );
          

          
          function updateLocalTime() {
            const localTime =  timeZone ;
            document.querySelector('#local-time').innerHTML = `Local Time: ${localTime}`;
             
        };
    
        // Update local time every second
        updateLocalTime();
    
      };
          
       
     


      SearchBtn.addEventListener("click",()=>{
        getWeather(searchBox.value);

          searchBox.value="";
      });


     
   
     
 

    