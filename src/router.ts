import Vue from 'vue';
import Router from 'vue-router';
import Index from './Index.vue';
import DataLineage from './DataLineage.vue';
import Abc from './Abc.vue';
import Graph from './components/Graph.vue';

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
  ],
});
