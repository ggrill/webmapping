<script>

    function add_legend() {

        document.getElementById("legend").innerHTML = ""

        var div = document.createElement('div', 'info legend'),
            labels = [];

        console.log(legends[map_name][2])

        legend.innerHTML += '<b>' + legends[map_name][2] + '<br>'
        var legend_length = legends[map_name][0].length

        // loop through our density intervals and generate a label with a colored square for each interval
        for (var i = 0; i < legend_length; i++) {

            const color = legends[map_name][1][i];
            const item = document.createElement('div');
            const key = document.createElement('span');
            key.className = 'legend-key';
            key.style.backgroundColor = color;

            const value = document.createElement('span');
            value.innerHTML = legends[map_name][0][i] + (legends[map_name][0][i + 1] ? '&ndash;' + legends[map_name][0][i + 1] + '<br>' : '+');
            item.appendChild(key);
            item.appendChild(value);
            legend.appendChild(item);
        }
    }

    function add_data_layers() {

        paint = update_style(map_name, legends)

        for (const element of a) {

            map.addLayer({
                "id": element,
                "type": "fill",
                "source": "hb",
                "source-layer": element,
                "layout": {},
                "paint": paint
            });
        }

        map.addLayer({
            "id": "sta",
            "type": "raster",
            "source": "sta",
            "minzoom": 8,
    				"maxzoom": 10


        });

        map.addLayer({
            "id": "sta_labels",
            "type": "raster",
            "source": "sta_labels",
            "minzoom": 8,
    				"maxzoom": 10


        });
    }

    function remove_data_layers() {
        for (const element of a) {
            map.removeLayer(element);
        }

        map.removeLayer("sta")
        map.removeLayer("sta_labels")
    }

    function reload_map() {

        remove_data_layers()
        add_data_layers()
        add_legend()
    }

    // '/tiles/{z}/{y}/{x}.pbf'
    //  source: 'https://hydrolab.s3.us-west-2.amazonaws.com/hydrobasins/tiles/{z}/{y}/{x}.pbf',
    //  source: '/tiles/{z}/{y}/{x}.pbf',
    var map = new maplibregl.Map({
        container: 'map',
        // style: 'style.json',
        center: map_center,
        zoom: startzoom,
        minZoom: 0,
        maxZoom: 8
    });

    map.addSource("hb", {
        "type": "vector",
        "tiles": ["https://f002.backblazeb2.com/file/tilestore/hydroatlas/{z}/{y}/{x}.pbf"]
        //"tiles": ["http://localhost:8082/tiles3_reduced/{z}/{y}/{x}.pbf"]
    });

    map.addSource("sta", {
        "type": "raster",
        "tilesize": 256,
        // "tiles": ["https://hydrolab.s3.us-west-2.amazonaws.com/hydrobasins/tiles/{z}/{y}/{x}.pbf"]
        "tiles": ["https://stamen-tiles.a.ssl.fastly.net/toner-lines/{z}/{x}/{y}.png"]

    });

    map.addSource("sta_labels", {
        "type": "raster",
        'tiles': [
            'https://stamen-tiles.a.ssl.fastly.net/terrain-labels/{z}/{x}/{y}.png'
        ],
        'tileSize': 256,
        'attribution':
            'Map tiles by <a target="_top" rel="noopener" href="http://stamen.com">Stamen Design</a>, under <a target="_top" rel="noopener" href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a target="_top" rel="noopener" href="http://openstreetmap.org">OpenStreetMap</a>, under <a target="_top" rel="noopener" href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>'

    });


    // colors to use for the categories
    const colors = ['#fed976', '#feb24c', '#fd8d3c', '#fc4e2a', '#e31a1c'];

    const a = ["BasinATLAS_v10_lev01", "BasinATLAS_v10_lev02", "BasinATLAS_v10_lev03",
        "BasinATLAS_v10_lev04", "BasinATLAS_v10_lev05", "BasinATLAS_v10_lev06",
        "BasinATLAS_v10_lev07", "BasinATLAS_v10_lev08", "BasinATLAS_v10_lev09",
        "BasinATLAS_v10_lev10", "BasinATLAS_v10_lev11", "BasinATLAS_v10_lev12",];

    // initial map
    var map_name = "{{wf {&quot;path&quot;:&quot;field-name&quot;,&quot;type&quot;:&quot;PlainText&quot;\} }}"

    map.setRenderWorldCopies(true)
    
    map.scrollZoom.setWheelZoomRate(1 / 1);
    
    containerElement = document.getElementById(wrapper_section)

    map.addControl(new maplibregl.FullscreenControl({container: containerElement}));
    
    //onclick support for mobile devices  
		let touchEvent = 'ontouchstart' in window ? 'touchstart' : 'click';

		// navigation controls
		map.addControl(new maplibregl.NavigationControl()); // zoom controls

		// scale bar
		map.addControl(new maplibregl.ScaleControl({
   		 maxWidth: 90,
   		 unit: 'metric',
   		 position: 'bottom-right'
		}));

		// geolocation
		map.addControl(new maplibregl.GeolocateControl({
  		  positionOptions: {
  		      enableHighAccuracy: true
  		  },
  		  trackUserLocation: false
		}));

    map.on('click', (e) => {

        document.getElementById('features').innerHTML =''

        if (map.queryRenderedFeatures(e.point)) {

            const features = map.queryRenderedFeatures(e.point);

            for (const key in features) {

                if (features[key].source === 'hb') {
                    document.getElementById('features').innerHTML +=
                        '<b style="font-size:16pt;">{{wf {&quot;path&quot;:&quot;name&quot;,&quot;type&quot;:&quot;PlainText&quot;\} }}</b>' + '<br>' +
                        '<b style="font-size:14pt;">({{wf {&quot;path&quot;:&quot;attribute-description&quot;,&quot;type&quot;:&quot;PlainText&quot;\} }})</b>' + '<br>' +
                        '<hr>' +
                        '<b>Attribute: </b>' + '{{wf {&quot;path&quot;:&quot;field-name&quot;,&quot;type&quot;:&quot;PlainText&quot;\} }}' +
                        '<hr>' +
                        '<b>Value: </b>' + Math.round((features[key].properties.{{wf {&quot;path&quot;:&quot;field-name&quot;,&quot;type&quot;:&quot;PlainText&quot;\} }} + Number.EPSILON) * 100) / 100 +
                        '<hr>'
                     break;
                }
            }
        }
    });

    add_data_layers()
    add_legend()
    
    //map.on('moveend', function() {
    //		map.setZoom(Math.round(map.getZoom()));
		//});
   
    map.flyTo({
        center: map_center,
        zoom: flytozoom,
        speed: speed,
        curve: 0.7,
        easing(t) {
            return 1 - Math.pow(1 - t, 5);
        }
    });
   

    
    
    $('#fullscreenmap').click(function() {
    	var x = document.getElementsByClassName("maplibregl-ctrl-fullscreen mapboxgl-ctrl-fullscreen")[0].click(); 
    	$(".remove").remove();
    });


  

</script>