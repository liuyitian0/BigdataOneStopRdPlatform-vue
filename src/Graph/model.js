let GraphJson = {
  nodes: [],
  endpoints: [],
  edges: [],
  head: '',
};

export default {
  getData() {
    return GraphJson;
  },

  setData(data) {
    GraphJson = data;
  },

  getEndpoints() {
    return GraphJson.endpoints;
  },

  addNode(nodeData) {
    GraphJson.nodes.push(nodeData);
  },

  removeNodeByNodeId(nodeId) {
    GraphJson.nodes = GraphJson.nodes.filter(node => node.id !== nodeId);
  },

  getNodeDataByNodeId(nodeId) {
    return GraphJson.nodes.find(n => n.id === nodeId);
  },

  addEdge(edge) {
    GraphJson.edges.push(edge);
  },

  removeEdge(edge) {
    GraphJson.edges = GraphJson.edges.filter(item => item !== edge);
  },

  getEdgesByPointIds(ids) {
    const data = [];
    GraphJson.edges.forEach((edge) => {
      ids.forEach((id) => {
        if (edge.indexOf(id) > -1) {
          data.push(edge);
        }
      });
    });
    return data;
  },

  removeEdgesByPointIds(ids) {
    ids.forEach((id) => {
      GraphJson.edges = GraphJson.edges.filter(edge => edge.indexOf(id) === -1);
    });
  },

  addEndpoint(point) {
    GraphJson.endpoints.push(point);
  },

  getEndpointsByPointIds(ids) {
    return [...GraphJson.endpoints.filter((point) => {
      if (ids.indexOf(point.id) > -1) {
        return true;
      }
      return false;
    })];
  },

  removeEndpointsByPointIds(ids) {
    ids.forEach((id) => {
      GraphJson.endpoints = GraphJson.endpoints.filter(point => point.id !== id);
    });
  },

  changeNodePos(nodeId, newPosition) {
    const node = GraphJson.nodes.find(n => n.id === nodeId);
    node.position = newPosition;
  },

  changeNodeValue(nodeId, value) {
    const node = GraphJson.nodes.find(n => n.id === nodeId);
    node.data.value = value;
  },

  getHead() {
    return GraphJson.head;
  },
};
