<template>
    <div class="map_container">
        <div id="map"></div>
    </div>
</template>
<script>
export default {
    name: "Map",
    data() {
        return {
            mapInst: null,
            mapOriginData: {},
            projectCount: 0,
            deviceCount: 0
        }
    },
    created() {
        this.getMapData()
    },
    methods: {
        getMapData: function() {
            this.$api.getMapDatas({
                size: 10000,
                index: 0
            }).then(data => {
                if (data.status_code === 0) {
                    if (!data.list) data.list = []
                    this.mapOriginData = data
                    this.projectCount = data.list.length
                    this.deviceCount = data.list.reduce((a, b) => (a.dev_num || a) + b.dev_num)
                    this.initMap();
                } else {

                }
            })
        },
        initMap: function(cb) {
            var gdMap = document.createElement('script');
            gdMap.charset = 'utf-8';
            gdMap.src = 'https://webapi.amap.com/maps?v=1.4.11&key=19128e28725474713958648b66ea8045';
            document.head.appendChild(gdMap);
            gdMap.onload = () => {
                this.mapInst = new AMap.Map('map', {
                    features: ["bg", "road", "point"]
                });
                this.setMapMarker();
                AMap.event.addListener(this.mapInst, "moveend", e => {
                    this.setMapMarker();
                })
            }
            gdMap.onerror = () => {}
        },
        isPositionInRange: function(lng, lat, northeast, southwest) {
            return (lng < northeast.lng && lng > southwest.lng) && (lat < northeast.lat && lat > southwest.lat);
        },
        getOutRangeOverlays: function(northeast, southwest) {
            return this.mapInst.getAllOverlays().filter(marker => {
                var position = marker.getPosition();
                return !this.isPositionInRange(position.lng, position.lat, northeast, southwest);
            });
        },
        setMapMarker: function() {
            var bounds = this.mapInst.getBounds();
            var northeast = bounds.northeast;
            var southwest = bounds.southwest;
            this.mapInst.remove(this.getOutRangeOverlays(northeast, southwest));
            var curMapData = this.mapOriginData.list.filter(item => {
                var isInRange = this.isPositionInRange(item.bD09_lng, item.bD09_lat, northeast, southwest);
                if (isInRange) {
                    var marker = new AMap.Marker({
                        position: [item.bD09_lng, item.bD09_lat]
                    })
                    AMap.event.addListener(marker, "click", e => {
                        console.log(e)
                    })
                    this.mapInst.add(marker);
                }
            })
        }
    }
}

</script>
<style lang="less">

html,body,#app {
    height: 100%;
}

</style>

<style lang="less" scoped="scoped">
.map_container {
    height: 100%;
    width: 100%;
    #map {
        height: 100%;
    }
}
</style>
