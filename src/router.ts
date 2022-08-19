import Vue from 'vue';
import Router from 'vue-router';
import Index from './Index.vue';
import DataLineage from './DataLineage.vue';
import Abc from './Abc.vue';
import Graph from './components/Graph.vue';
import Scheduler from './Scheduler.vue';
import Test from './Test.vue';
import DataServices from './DataServices.vue';
import Indicators from './Indicators.vue';
import RealTimeScreen from './RealTimeScreen.vue';
import DataDictionary from './DataDictionary.vue';
import DataSync from './DataSync.vue';
import DataMap from './DataMap.vue';
import DataAssetHologram from './DataAssetHologram.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index',
    },
    {
      path: '/index',
      name: 'index',
      component: Index,
    },
    {
      path: '/dataLineage',
      name: 'dataLineage',
      component: DataLineage,
    },
    {
      path: '/abc',
      name: 'abc',
      component: Abc,
    },
    {
      path: '/graph',
      name: 'graph',
      component: Graph,
    },
    {
      path: '/scheduler',
      name: 'scheduler',
      component: Scheduler,
    },
    {
      path: '/test',
      name: 'test',
      component: Test,
    },
    {
      path: '/DataServices',
      name: 'DataServices',
      component: DataServices,
    },
    {
      path: '/Indicators',
      name: 'Indicators',
      component: Indicators,
    },
    {
      path: '/RealTimeScreen',
      name: 'RealTimeScreen',
      component: RealTimeScreen,
    },
    {
      path: '/DataDictionary',
      name: 'DataDictionary',
      component: DataDictionary,
    },
    {
      path: '/DataSync',
      name: 'DataSync',
      component: DataSync,
    },
    {
      path: '/DataMap',
      name: 'DataMap',
      component: DataMap,
    },
    {
      path: '/DataAssetHologram',
      name: 'DataAssetHologram',
      component: DataAssetHologram,
    },

  ],
});
