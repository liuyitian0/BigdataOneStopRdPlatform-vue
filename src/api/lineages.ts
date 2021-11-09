import axios from 'axios';
// const fs = require('fs');
// const path = require('path');

function getFlowChartData() {
  return new Promise((resolve, reject) => {
    axios.get('api/getFlowChartData').then(resolve).catch(reject);
  });
}

function getLineagesMenuData() {
  return new Promise((resolve, reject) => {
    axios.get('api/getLineagesMenuData').then(resolve).catch(reject);
  });
}

// function getJonsFile() {
// }

export default {
  getFlowChartData,
  getLineagesMenuData,
};
