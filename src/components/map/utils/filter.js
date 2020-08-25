import geo from '../static/clipped_poly';
import pdk from '../static/pdk';
import cloneDeep from 'lodash/cloneDeep';
import lulc from '../static/lulc';
import dutch from '../static/tamilnadu';
import KODAVASAL from '../static/kodavasal';
import village from '../static/village';

export const filterGeo = (checked) => {
    var f;
    f = cloneDeep(geo);
    if (checked)
        f.features = f.features.filter(feature => checked.indexOf(feature.properties.yield) !== -1);
    return f;
};

export const filterLulc = (legends, main) => {
    var f;
    f = cloneDeep(lulc);
    return f;
};

export const getTamilNadu = () => {
    var f;
    f = cloneDeep(dutch)
    return f;
}

export const border = (checked) => {
    var f;
    f = cloneDeep(pdk);
    if (checked)
        f.features = f.features.filter(feature => checked.indexOf(feature.properties.yield) !== -1);
    return f;
};

export const getKodavasal = () => {
    var f;
    f = cloneDeep(KODAVASAL)
    return f;
}

export const getVillage = () => {
    var f;
    f = cloneDeep(village);
    return f;
}