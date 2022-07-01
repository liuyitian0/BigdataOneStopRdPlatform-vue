export function GetDataGraph(s: String, t: String) {

  let node = {
    id: t,  //node1
    // x: 1500,
    // y: 1500,
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
        text: t,// dcl_zssys_web_ply_base
        fill: '#333',
        fontSize: 18,
        fontWeight: 'bold',
        fontVariant: 'small-caps',
        // fontVariant: 'normal',  //small-caps 小型大写字母
      },
    },
  }

  let edge =
  {
    source: s,  //node1
    target: t,  //node2
    attrs: {
      line: {
        stroke: 'green',
      },
    },
  }

  return [node, edge];

}