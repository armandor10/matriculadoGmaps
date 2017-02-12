app.controller("MapsController", function($scope, uiGmapGoogleMapApi, matriculadoService) {
  
  // Define variables for our Map object
  /*var areaLat      = 10.461835,
      areaLng      = -73.253903,
      areaZoom     = 14;*/

  uiGmapGoogleMapApi.then(function(maps) {
    
    $scope.markerseleted=null;
    $scope.modelseleted;
    $scope.ubicacion =false ;
    var marker = undefined;
    var myInterval;
    var ban;

    function loadMaticulado() {
        var promiseGet = matriculadoService.getAll2(); //The Method Call from service
        promiseGet.then(function (pl) {
          $scope.markers = [];
          $scope.map.markers = [];
          angular.forEach(pl.data, function (value, key) {
              var marker = {
                           id: value.id,
                           latitude: value.ubicacion.latitud,
                           longitude: value.ubicacion.longitud,
                           title: value.razonSocial_nombre,
                           address: value.direccion,
                           ownerName: value.propietario,
                           phone: value.telefono,
                           matricula: value.noMatricula
                         };

            $scope.markers.push(marker);
          });          
          $scope.map.markers = $scope.markers;
        },
        function (errorPl) {
         $log.error('Error al cargar los establecimientos', errorPl);
       });       
    };

    loadMaticulado();
    $scope.load = loadMaticulado;
    
    var data = {};
    $scope.markerControl = {};

    function initMap() {
        data.map = {
            zoom: 14,
            center: {
                latitude: 10.461835,
                longitude: -73.253903
            }, events: {
                click: function (mapModel, eventName, originalEventArgs, ok) {
                    if ($scope.ubicacion) {
                        var e = originalEventArgs[0];
                        var lat = e.latLng.lat(), lon = e.latLng.lng();
                        $scope.map.markers = [];
                        marker = {
                            id: Date.now(),
                            latitude: lat,
                            longitude: lon
                        };
                        $scope.map.markers.push(marker);
                        $scope.$apply();
                    }
                }
            },
            options: {
                scrollwheel: false
            },
            markersEvents: {
                click: function (marker, eventName, model, arguments) {
                    //console.log('Marker was clicked (' + marker + ', ' + eventName);//+', '+mydump(model, 0)+', '+mydump(arguments)+')');
                    $scope.map.window.model = model;
                    $scope.map.window.title = model.title;
                    $scope.map.window.show = true;

                    //alert(JSON.stringify(model));
                    //console.log(marker);
                    toggleBounce(marker);
                    $scope.modelselected = model;
                    //alert('C'+model.id);
                    $('#C' + model.id).trigger('click');
                    //$('.collapsible').collapsible();
                }
            },
            window: {
                marker: {},
                show: false,
                closeClick: function () {
                    this.show = false;
                },
                options: {}, // define when map is ready
                title: ''
            }
        };
        $scope.map = data.map;
    };
    initMap();

    $scope.searchUbicacion = function () {
        $scope.ubicacion = true;
        marker = undefined;
        $('#modal1').closeModal();
        $scope.map.markers = [];
        //initMap();
    };

    $scope.setUbicacion = function () {
        if (!marker) {
            Materialize.toast("Elija una ubicación ",3000,'rounded'); 
        } else {
            $scope.ubicacion = false;
            console.log($scope.modelselected);
            $scope.modelselected.latitude = marker.latitude;
            $scope.modelselected.longitude = marker.longitude;
            $('#modal1').openModal({ dismissible: false });

        }
    };

    $scope.onMarkerClicked = function (m) {
        //this.windowOptions = !this.windowOptions;
        console.log('Marker was clicked');
        console.log(m);
    };

    $scope.closeClick = function () {
        this.window = false;
    };

    function toggleBounce(marker) {
        if($scope.markerseleted != null){
        $scope.markerseleted.setAnimation(null);
        }          
        marker.setAnimation(google.maps.Animation.BOUNCE);
        $scope.markerseleted = marker;
    };

    $scope.map.visualRefresh = true;

    $scope.listClickEvent = function (index){
        var marker = $scope.map.markers[index];
        var mar = $scope.markerControl.getPlurals().get(marker.id);
        $scope.modelselected = mar.model;
        toggleBounce(mar.gObject);
    };

    // Updating the collapsible (los establecimientos en el collapsible)
    $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
        //you also get the actual event object
        //do stuff, execute functions -- whatever...
        $('.collapsible').collapsible();
        $('select').material_select();

    });

    $scope.openModal = function (matriculado) {
        $scope.modelselected = matriculado;
        ban = false;
        $('#modal1').openModal({ dismissible: false });
    };

    $scope.addEstablishment = function(){ 
        ban = true;
        $scope.modelselected = {};
        $('#modal1').openModal({ dismissible: false });
    };

    function isEmpty(obj) {
        // null and undefined are "empty"
        if (obj == null) return true;
        // Assume if it has a length property with a non-zero value
        // that that property is correct.
        if (obj.length > 0) return false;
        if (obj.length === 0) return true;
        // Otherwise, does it have any properties of its own?
        // Note that this doesn't handle
        // toString and valueOf enumeration bugs in IE < 9
        for (var key in obj) {
            if (hasOwnProperty.call(obj, key)) return false;
        }
        return true;
    };

    function validarMatriculado(m) {
        console.log(m);
        if( isEmpty(m.noMatricula) ||
            isEmpty(m.razonSocial_nombre)||
            isEmpty(m.propietario)||
            isEmpty(m.direccion)||
            isEmpty(m.telefono)||
            isEmpty(m.ubicacion.latitud.toString())||
            isEmpty(m.ubicacion.longitud.toString())) {
            Materialize.toast("Complete todos los campos", 3000, 'rounded');
            return false;
        }
        return true;

    };

    $scope.saveEstablishment = function(){
        var matriculado = {};
        matriculado.ubicacion = {};
        matriculado.noMatricula = $scope.modelselected.matricula;
        matriculado.razonSocial_nombre = $scope.modelselected.title;
        matriculado.propietario = $scope.modelselected.ownerName;
        matriculado.direccion = $scope.modelselected.address;
        matriculado.telefono = $scope.modelselected.phone;
        matriculado.ubicacion.latitud = $scope.modelselected.latitude;
        matriculado.ubicacion.longitud = $scope.modelselected.longitude;
        if(!validarMatriculado(matriculado)) return true;

        if(ban){
            var promisePost = matriculadoService.postMatriculado(matriculado);
            promisePost.then(function (d) {
                console.log(d);
                Materialize.toast("Establecimiento guardado", 3000, 'rounded');
                loadMaticulado();

            }, function (err) {
                if(err.status == 401){
                    alert(err.data.message);
                    console.log(err.data.exception);
                }else{
                        Materialize.toast("Error al procesar la solicitud",3000,'rounded');                       
                }
                console.log(err);
            });

        }else{
            var promisePost = matriculadoService.put($scope.modelselected.id, matriculado);
            promisePost.then(function (d) {
                console.log(d.data);
                Materialize.toast("Establecimiento actualizado",3000,'rounded');               
                loadMaticulado();
            }, function (err) {
                if(err.status == 401){
                    alert(err.data.message);
                    console.log(err.data.exception);
                }else{
                        Materialize.toast("Error al procesar la solicitud",3000,'rounded');                       
                }
                console.log(err);
            });

        }
        $('#modal1').closeModal();

    };

    $scope.deleteEstablishment = function (id) {
        matriculadoService.delete(id)
        .then(function (resp) {
            Materialize.toast("Establecimiento eliminado", 3000, 'rounded');
            loadMaticulado();
        }, function (err) {
            console.log(err);
        });
    };

});
});
