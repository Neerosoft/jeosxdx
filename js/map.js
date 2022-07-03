

var map = L.map('main_map').setView([9.040056313077315, -79.53380603405931],13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


L.marker([9.040056313077315, -79.53380603405931]).addTo(map)
L.marker([9.039323361065048, -79.53295748772834]).addTo(map)
L.marker([9.040157430215306, -79.53272570967906]).addTo(map)


/*
$.ajax({
    
    dataType: "json",
    url: "api/bicicletas",
    success: function(result){
        console.log("se ejecuto "+result);
        result.bicicletas.forEach(function(bici){
            L.marker(bici.ubicacion,{title:bici.id}).addTo(map);
        });

        }   

});
*/

//el codigo expuesto por el prf no me funciona. 

$.ajax({
		
		dataType: "json",
		url:  "api/bicicletas",
		type: "GET",
		success: function(result){
			console.log("se ejecuto "+result);
			result.bicicletas.forEach(function(bici){
			    L.marker(bici.ubicacion,{title:bici.id}).addTo(map);
			});
	
		}   
	 
})
	 




   /* .bindPopup('Universidad Tecnológica de Panamá.')
    .openPopup();*/



/*var map=L.map('main_map').setView([-34.6012424,-58.3861497],13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map)

var map = L.map('map').setView([51.505, -0.09], 13);*/
