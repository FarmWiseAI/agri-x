import React, { Component } from "react";
import OlMap from "ol/Map";
import OlView from "ol/View";
import OlLayerTile from "ol/layer/Tile";
import TileLayer from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS';
import GeoJSON from 'ol/format/GeoJSON';
import OlSourceOSM from "ol/source/OSM";
import Zoom from 'ol/control/Zoom';
import { defaults } from 'ol/interaction'
import Draw from 'ol/interaction/Draw';
import { doubleClick } from 'ol/events/condition';
import Select from 'ol/interaction/Select';
import { Fill, Stroke, Style, Text } from 'ol/style';
import windowDimensions from 'react-window-dimensions';
import PropType from 'prop-types';
import axios from 'axios';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import './styles/map.scss';
import MapControl from './MapControls';
import 'ol/ol.css';
import './Map.css';
import { message, Checkbox, Card, Typography, Button, Icon, Collapse, Badge, Progress, Slider, } from 'antd';
import { border } from './utils/filter';
import cloneDeep from 'lodash/cloneDeep';
import Popup from 'ol-popup';

const { Text: TypographyText } = Typography;
const CheckboxGroup = Checkbox.Group;
const { Panel } = Collapse;

const center = [0, 0];

const plainOptions = ['Crop standing for full season', 'Crops failed end-season', 'Crops failed mid-season', 'Crops failed in 30 days'];

const generateStyle = (strokeClr, fillClr, text, txtFillClr) => new Style({
  stroke: new Stroke({
    color: strokeClr,
    width: 1
  }),
  fill: new Fill({
    color: fillClr
  }),
  text: new Text({
    text: text,
    fill: new Fill({
      color: txtFillClr
    })
  })
});

const styleBorder = feature => {
  const { yield: y } = feature.values_;
  switch (y) {
    case 'Crop standing for full season':
      return generateStyle('#000', 'rgb(135, 208, 104, 0.3)', feature.values_.BLKNAME, '#000');
    case 'Crops failed end-season':
      return generateStyle('#000', 'rgba(250, 218, 94, 0.3)', feature.values_.BLKNAME, '#000');
    case 'Crops failed mid-season':
      return generateStyle('#000', 'rgba(255, 99, 71, 0.3)', feature.values_.BLKNAME, '#000');
    case 'Crops failed in 30 days':
      return generateStyle('#000', 'rgba(211, 211, 211, 0.3)', feature.values_.BLKNAME, '#000');
    default:
      return generateStyle('#000', 'rgba(255, 255, 0, 0)', feature.values_.BLKNAME, '#000');
  }
}

const normaliseBorder = feature => {
    return generateStyle('#000', 'rgba(255, 255, 0, 0)', feature.values_.BLKNAME, '#000');
}

let popup;

const marks = {
  0: {
    label: < strong >01/10/2020</strong>
  },
  10: {
    label: < strong >08/10/2020</strong>
  },
  20: {
    label: < strong >15/10/2020</strong>
  },
  30: {
    label: < strong >22/10/2020</strong>
  },
  40: {
    label: < strong >29/10/2020</strong>
  },
  50: {
    label: < strong >05/11/2020</strong>
  },
  60: {
    label: < strong >12/11/2020</strong>
  },
  70: {
    label: < strong >19/11/2020</strong>
  },
  80: {
    label: < strong >26/11/2020</strong>
  },
  90: {
    label: < strong >03/12/2020</strong>
  },
  100: {
    label: < strong >10/12/2020</strong>
  }
};

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zoom: 1,
      showSubmit: false,
      level: -1,
      time: 0,
      timeline: 'pause',
      visibleLayer: ['profile', 'yield', 'ndvi'],
      checkedList: ['Crop standing for full season', 'Crops failed end-season', 'Crops failed mid-season', 'Crops failed in 30 days']
    };
    this.draw = null;
  }
  profit = (y) => {
    switch (y) {
      case 'Crop standing for full season':
        return '$54000'
      case 'Crops failed end-season':
        return '$4000'
      case 'Crops failed mid-season':
        return '$900'
      case 'Crops failed in 30 days':
        return '$0'
      default:
        return 'NA'
    }
  }
  showPop = () => {
    this.olmap.on('pointermove', (event) => {
      if (event)
        this.olmap.forEachFeatureAtPixel(event.pixel,
          feature => {
            const { values_ } = feature;
            if (values_) {
              popup.show(event.coordinate, `<div><p>Area: ${values_.AREA}sq.km</p><p>Expected Claim Amount: ${this.profit(values_.yield) || 0}</p></div>`);
            }
          },
          {
            layerFilter: (layer) => {
              return (layer.type === new VectorLayer().type) ? true : false;
            }, hitTolerance: 6
          }
        );
    });
  }
  configureMap = () => {
    let boundarySource = new VectorSource();
    this.boundaryLayer = new VectorLayer({
      source: boundarySource,
      style: f => styleBorder(f)
    });
    this.boundaryLayer.setZIndex(2);
    let borderSource = new VectorSource();
    this.borderLayer = new VectorLayer({
      source: borderSource,
      style: f => normaliseBorder(f)
    });
    this.borderLayer.setZIndex(0);
    this.geoTiff = new TileLayer({
      source: new TileWMS({
        url: 'http://13.93.35.162:8080/geoserver/agrix/wms',
        params: { 'LAYERS': 'agrix:ricemap', 'TILED': true },
        transition: 0
      })
    })
    this.geoTiff.setZIndex(0);

    this.ndvi = new TileLayer({
      source: new TileWMS({
        url: 'http://13.93.35.162:8080/geoserver/agrix/wms',
        params: { 'LAYERS': `agrix:ndvi1`, 'TILED': true },
        transition: 0
      })
    })
    this.ndvi.setZIndex(1);
    this.view = new OlView({
      center,
      zoom: this.state.zoom
    })
    var raster = new OlLayerTile({
      source: new OlSourceOSM()
    });

    this.olmap = new OlMap({
      interactions: defaults({
        doubleClickZoom: false
      }),
      target: null,
      layers: [
        raster,
        this.boundaryLayer,
        this.geoTiff,
        this.ndvi,
        this.borderLayer,
      ],
      controls: [
        new Zoom({
          className: 'zoom'
        })
      ],
      view: this.view
    });
  }

  updateMap() {
    if (this.olmap)
      this.olmap.getView().setZoom(this.state.zoom);
  }

  componentDidMount() {
    this.configureMap();
    this.olmap.setTarget("draw-map");
    this.olmap.on("moveend", () => {
      let zoom = this.olmap.getView().getZoom();
      this.setState({ zoom });
    });
    if (this.props.logged) {
      let hide = message.loading('Loading Analysis for Thirvarur : 621821', 0);
      let boundarySource = new VectorSource({
        features: (new GeoJSON({
          dataProjection: 'EPSG:4326',
          featureProjection: 'EPSG:3857'
        })).readFeatures(border())
      });
      this.olmap.getLayers().array_[1].setSource(boundarySource);
      this.olmap.getLayers().array_[4].setSource(boundarySource);

      this.olmap.addInteraction(this.select);
      setTimeout(() => {
        this.olmap.getView().fit([8823982.406776493, 1150810.877901873, 8879364.36451017, 1233892.0199781533], { duration: 2000 });
        popup = new Popup();
        this.olmap.addOverlay(popup);
        this.showPop();
        hide();
      }, 1000);
      this.select.on('select', e => {
        try {
          if (e.selected[0].values_.BLOCKS_)
            this.fitToExtent(e.target.getFeatures().getArray()[0]);
        } catch (e) {
          console.log(e);
        }
      });
    } else {
      this.clearLayers();
      this.olmap.removeInteraction(this.select);
      this.select.removeEventListener('select');
    }
  }
  select = new Select({
    condition: doubleClick
  })
  fitToExtent = feature => {
    let extent = feature.getGeometry().getExtent();
    this.olmap.getView().fit(extent, { duration: 2000 });
  }
  selectArea = (source, id) => {
    const { level } = this.state;
    let url = `https://agrix-api.herokuapp.com/server/api/division?level=${this.state.level}`;
    if (level === 1)
      url += `&blockId=${id}`;
    if (level === 0 || (level === 1 && id)) {
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
        if (level === 0) {
          layer = this.olmap.getLayers().array_[1]
          this.setState({ level: 1 });
        } else if (level === 1) {
          layer = this.olmap.getLayers().array_[3];
        }
        layer.setSource(boundarySource);
        setTimeout(() => {
          if (level === 1) {
            this.fitToExtent(source.getFeatures().getArray()[0])
          }
        }, 500);
        hide();
      }, res => { if (level === 0) hide(); });
    }
  }
  clearLayers = () => {
    let layers = this.olmap.getLayers().array_;
    layers.forEach(layer => {
      layer.getSource().clear();
    });
  }
  toggleEdit = (edit) => {
    if (edit) {
      this.olmap.getLayers().array_[2].getSource().clear();
      this.draw = new Draw({
        source: this.drawSource,
        type: 'Polygon'
      });
      this.draw.on('drawend', () => {
        this.setState({
          showSubmit: true
        });
      });
      this.olmap.addInteraction(this.draw);
    } else {
      this.olmap && this.draw && this.olmap.removeInteraction(this.draw);
      this.draw && this.draw.removeEventListener('drawend');
      this.draw = null;
    }
  }
  clearDraw = () => {
    this.olmap && this.draw && this.olmap.removeInteraction(this.draw);
    this.draw && this.draw.removeEventListener('drawend');
    this.draw = null;
    this.olmap.getLayers().array_[2].getSource().clear();
  }
  handleSubmit = (showSubmit) => {
    this.setState({ showSubmit });
  }
  onChange = checkedList => {
    this.setState({ checkedList });
    this.update(checkedList)
  }
  update = checkedList => {
    let boundarySource = new VectorSource({
      features: (new GeoJSON({
        dataProjection: 'EPSG:4326',
        featureProjection: 'EPSG:3857'
      })).readFeatures(border(checkedList))
    });
    this.olmap.getLayers().array_[1].setSource(boundarySource);
    this.olmap.addInteraction(this.select);
  }
  runTimeline = () => {
    this.runner = setInterval(() => {
      const { time } = this.state;
      let ndviIndex = (time / 10);
      if (time >= 40)
        ndviIndex += 1;
      this.ndvi.getSource().updateParams({ 'LAYERS': `agrix:ndvi${ndviIndex}` });
      this.setState(state => {
        if (state.time === 100) {
          clearInterval(this.runner);
          return { time: 0, timeline: 'pause' }
        }
        return { time: state.time + 10 }
      });
    }, 2000);
  }
  play = () => {
    this.setState(state => state.timeline === 'pause' ? { timeline: 'play' } : { timeline: 'pause' }, () => {
      if (this.state.timeline === 'play')
        this.runTimeline();
      else if (this.runner) {
        clearInterval(this.runner);
      }
    });
  }
  onChangeSlider = time => {
    let ndviIndex = time / 10;
    if (time >= 40)
      ndviIndex += 1;
    this.ndvi.getSource().updateParams({ 'LAYERS': `agrix:ndvi${ndviIndex}` });
    clearInterval(this.runner);
    this.setState({ time, timeline: 'pause' });
  }
  formatter = value => {
    return marks[value].label;
  }
  genExtra = layer => (
    <Icon
      type={this.state.visibleLayer.indexOf(layer) !== -1 ? 'eye' : 'eye-invisible'}
      onClick={event => {
        event.stopPropagation();
        let visibleLayer = cloneDeep(this.state.visibleLayer);
        const available = this.state.visibleLayer.indexOf(layer) !== -1;
        if (available)
          visibleLayer.splice(this.state.visibleLayer.indexOf(layer), 1);
        else
          visibleLayer.push(layer);
        this.setState({ visibleLayer });
        switch (layer) {
          case 'profile':
            this.geoTiff.setVisible(!available);
            break;
          case 'yield':
            this.boundaryLayer.setVisible(!available);
            break;
          case 'ndvi':
            this.ndvi.setVisible(!available);
            break;
          default:
        }
      }}
    />
  );
  render() {
    this.updateMap();
    return (
      <>
        {this.state && this.state.visibleLayer && <Card style={{ position: 'absolute', width: '26%', zIndex: 1, top: 70, right: 20 }}>
          <TypographyText strong>Legends</TypographyText><br />
          <Collapse defaultActiveKey={['1']} accordion>
            <Panel header="Crop Profile" key="1" extra={this.genExtra('yield')}>
              <CheckboxGroup
                className='filter-checkbox'
                style={{ float: 'right', paddingLeft: '30px' }}
                options={plainOptions}
                value={this.state.checkedList}
                onChange={this.onChange}
              />
            </Panel>
            <Panel header="Rice Map - Probability" key="2" extra={this.genExtra('profile')}>
              <Badge color='blue' text={'90% and above'} /><br />
              <Badge color='green' text={'50% to 90%'} /><br />
              <Badge color='red' text={'below 50%'} />
            </Panel>
            <Panel header="NDVI" key="3" extra={this.genExtra('ndvi')}>
              <div style={{ display: 'flex' }}>
                <TypographyText>-1</TypographyText>
                <Progress strokeColor={{ '0%': '#FFF', '100%': '#006400' }} percent={100} showInfo={false} />
                <TypographyText>+1</TypographyText>
              </div>
            </Panel>
          </Collapse>
        </Card>}
        <div id="draw-map" style={{ width: "100%", height: `${this.props.height - 67}px` }}></div>
        {this.props.logged && <MapControl
          editAction={this.toggleEdit}
          clearDraw={this.clearDraw}
          handleSubmit={this.handleSubmit}
          submit={this.state.showSubmit} draw={true} />}
        {this.state && this.state.timeline && <>
          <div style={{ height: 3, backgroundImage: `linear-gradient(to right, #A33582, #17468B)`, position: 'fixed', bottom: 50, width:'100%' }}></div>
          <div style={{ position: 'fixed', bottom: 0, height: 50, backgroundColor: `white`, width: '100%', paddingTop: 5, display: 'flex' }}>
            <div className='filter-checkbox'>
              <Button shape="circle" onClick={this.play}>
                {this.state.timeline === 'pause' ? <Icon type="play-circle" theme="filled" /> : <Icon type="pause" />}
              </Button>
            </div>
            <Slider marks={marks} step={10} style={{ marginLeft: 20, width: '90%' }} value={this.state.time} onChange={this.onChangeSlider} tipFormatter={this.formatter} />
          </div>
        </>}
      </>
    )
  }
}
Map.propTypes = {
  height: PropType.number
}
export default windowDimensions()(Map);
