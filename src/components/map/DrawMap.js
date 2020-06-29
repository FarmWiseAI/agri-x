import React, { useState, useEffect, useRef } from "react";
import OlMap from "ol/Map";
import OlView from "ol/View";
import OlLayerTile from "ol/layer/Tile";
import GeoJSON from 'ol/format/GeoJSON';
import OlSourceOSM from "ol/source/OSM";
import Zoom from 'ol/control/Zoom';
import { defaults } from 'ol/interaction'
import Draw from 'ol/interaction/Draw';
import { doubleClick } from 'ol/events/condition';
import Select from 'ol/interaction/Select';
import { Fill, Stroke, Style, Text} from 'ol/style';
import windowDimensions from 'react-window-dimensions';
import axios from 'axios';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import './styles/map.scss';
import MapControl from './MapControls';
import 'ol/ol.css';
import { message } from 'antd';
import './Map.css';

const center = [0, 0];

const styleBorder = feature => new Style({
  stroke: new Stroke({
    color: '#0099FF',
    width: 1
  }),
  fill: new Fill({
    color: 'rgba(0, 0, 0, 0)'
  })
});

const styleDt = feature => new Style({
  stroke: new Stroke({
    color: '#A03582',
    width: 2
  }),
  fill: new Fill({
    color: 'rgba(255, 255, 0, 0.1)'
  }),
  text: new Text({
    text: feature.values_.BLKNAME,
    fill: new Fill({
      color: '#f56a00'
    })
  })
});
let olmap = null;
const defaultZoom = 1;
const defaultShowSubmit = false;
const defaultLevel = -1;
let draw = null;
const drawSource = new VectorSource({ wrapX: false });
const drawVector = new VectorLayer({ source: drawSource });
const drawNewPoly = { source: drawSource, type: 'Polygon'};

const Map = ({height,width,logged}) => {

  const [zoom, setZoom] = useState(defaultZoom);
  const [showSubmit, setShowSubmit] = useState(defaultShowSubmit);
  //const [level, setLevel] = useState(defaultLevel);
  let level = useRef(defaultLevel);

  const handleSubmit = (showSubmit) => {
    setShowSubmit(showSubmit);
  }

  const toggleEdit = (edit) => {
    if (edit) {
        olmap.getLayers().array_[2].getSource().clear();
        draw = new Draw(drawNewPoly);
        draw.on('drawend', () => { setShowSubmit(true) });
        olmap.addInteraction(draw);
    } else {
        olmap && draw && olmap.removeInteraction(draw);
        draw && draw.removeEventListener('drawend');
        draw = null;
    }
}

  const clearDraw = () => {
    toggleEdit(false);
    olmap.getLayers().array_[2].getSource().clear();
  }

  const fitToExtent = feature => {
    olmap.getView().fit(feature.getGeometry().getExtent(), { duration: 2000 });
  }

  const selectArea = (source, id) => {
    let url = `https://agrix-api.herokuapp.com/server/api/division?level=${level.current}`;
    let {current} = level;
    if (current === 1)
      url += `&blockId=${id}`;
    if (current === 0 || (current === 1 && id)) {
      let hide = message.loading('Loading Map', 0);
      axios.get(url).then(res => {
        if (!res.data.status)
          return;
        let boundarySource = new VectorSource({
          features: (new GeoJSON({
            dataProjection: 'EPSG:4326',
            featureProjection: 'EPSG:3857'
          })).readFeatures(res.data.data)
        });
        let layer;
        if (current === 0) {
          layer = olmap.getLayers().array_[1]
          //setLevel(1);
          level.current = 1;
        } else if (level.current === 1) {
          layer = olmap.getLayers().array_[3];
        }
        layer.setSource(boundarySource);
        setTimeout(() => {
          if (level.current === 1) {
            fitToExtent(source.getFeatures().getArray()[0])
          }
        }, 500);
        hide();
      }, res => { if (level.current === 0) hide(); });
    }
  }

  const select = new Select({
    condition: doubleClick
  })

  const clearLayers = () => {
    let layers = olmap.getLayers().array_;
    layers.forEach(layer => {
      layer.getSource().clear();
    });
  }

  //componentDidMount
  useEffect(()=>{
    const boundarySource = new VectorSource();
    const boundaryLayer = new VectorLayer({ source: boundarySource, style: f => styleBorder(f) });
    const level1Source = new VectorSource();
    const level1Layer = new VectorLayer({ source: level1Source, style: f => styleDt(f) });
  
    const view = new OlView({center, zoom: zoom});
    const raster = new OlLayerTile({
      source: new OlSourceOSM()
    });
    olmap = new OlMap({
      interactions: defaults({
        doubleClickZoom: false
      }),
      target: null,
      layers: [
        raster,
        boundaryLayer,
        drawVector,
        level1Layer
      ],
      controls: [
        new Zoom({
          className: 'zoom'
        })
      ],
      view: view
    });
    olmap.setTarget("draw-map");
    olmap.on("moveend", () => {
      let newZoom = olmap.getView().getZoom();
      setZoom(newZoom);
    });
    // eslint-disable-next-line
  },[]);

  //componentDidUpdate
  useEffect(()=>{
      if (logged && level.current === -1) {
        let hide = message.loading('Loading Map', 0);
        axios.get(`https://agrix-api.herokuapp.com/server/api/location/geojson`).then(res => {
          if (!res.data.status) {
            return;
          }
          //setLevel(0);
          level.current = 0;
          let boundarySource = new VectorSource({
            features: (new GeoJSON({
              dataProjection: 'EPSG:4326',
              featureProjection: 'EPSG:3857'
            })).readFeatures(res.data.data)
          });
          olmap.getLayers().array_[1].setSource(boundarySource);
          setTimeout(() => {
            fitToExtent(olmap.getLayers().array_[1].getSource().getFeatures()[0])
            hide();
            message.info('Hint: Double click to load districts!')
          }, 1000);
          olmap.addInteraction(select);
          select.on('select', e => {
            try {
                const id = e.selected[0].getProperties('values_').OBJECTID;
                selectArea(e.target, id);
                if (e.selected[0].values_.BLOCKS_)
                  fitToExtent(e.target.getFeatures().getArray()[0])              
            } catch (e) {
              console.log(e);
            }
          });
        });
      } else {
          clearLayers();
          olmap.removeInteraction(select);
          select.removeEventListener('select');
      } 
      // eslint-disable-next-line
    },[logged]);
  
  //updateMap
  return (
    <>
    {olmap && olmap.getView().setZoom(zoom)}
      <div id="draw-map" style={{ width: "100%", height: `${height - 67}px` }}></div>
      {logged && <MapControl
        editAction={toggleEdit}
        clearDraw={clearDraw}
        handleSubmit={handleSubmit}
        submit={showSubmit}/>}
    </>
  )
}

export default windowDimensions()(Map);