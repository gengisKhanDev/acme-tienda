Session.set("placesAutocomplete", {});

initPlacesAutocomplete = (selector, callback) => {
  $(document).ready(function(){
    setTimeout(function(){
      var input = document.getElementById(selector);
      var autocomplete = new google.maps.places.Autocomplete(input);
        google.maps.event.addListener(autocomplete, "place_changed", function () {
          var place = autocomplete.getPlace();
          const latlng = {
            lat:place.geometry.location.lat(),
            lng: place.geometry.location.lng()
          };
          const placeObj = {
            address_components: place.address_components,
            formatted_address: place.formatted_address,
            geometry: latlng,
            icon: place.icon,
            id: place.id,
            name: place.name,
            place_id: place.place_id,
            plus_code: place.plus_code,
            reference: place.reference,
            scope: place.scope,
            types: place.types,
            url: place.url,
            vicinity: place.vicinity
          };
          Session.set("placesAutocomplete", placeObj);
          callback(true);
        });
    }, 750);
  });
}