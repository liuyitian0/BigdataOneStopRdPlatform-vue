export function GetTabRectNode(N1: String, N2: String) {
  let node1 =
  {
    id: N1,
    width: 280,
    height: 38,
    attrs: {
      body: {
        fill: '#F39C12',
        stroke: '#000',
        rx: 22,
        ry: 22,
      },
      label: {
        text: N1,
        fill: '#333',
        fontSize: 18,
        fontWeight: 'bold',
        fontVariant: 'small-caps',
      },
    },
  }

  let node2 =
  {
    id: N2,
    width: 280,
    height: 38,
    attrs: {
      body: {
        fill: '#F39C12',
        stroke: '#000',
        rx: 22,
        ry: 22,
      },
      label: {
        text: N2,
        fill: '#333',
        fontSize: 18,
        fontWeight: 'bold',
        fontVariant: 'small-caps',
      },
    },
  }

  return [node1, node2]
}


export function GetTabRectEdge(e1: String, e2: String) {
  let edge =
  {
    source: e1,  //node1
    target: e2,  //node2
    attrs: {
      line: {
        stroke: 'green',
      },
    },
  }

  return [edge]
}