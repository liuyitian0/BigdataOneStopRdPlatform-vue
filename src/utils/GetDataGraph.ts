export function getDrawGraph() {

 
  let node = {
    shape: 'rect',
    id: null,  //node1
    x: 40, 
    y: 500,     
    width: 200,   
    height: 40, 
    attrs: {
      body: {
        fill: '#F39C12',
        stroke: '#000',
        rx: 22,
        ry: 22,
      },
      label: {
        text: null,// dcl_zssys_web_ply_base
        fill: '#333',
        fontSize: 16,
        fontWeight: 'bold',
        fontVariant: 'small-caps',
      },
    },
   }
  
   let  edge =   
      {
        source: null,  //node1
        target: null,  //node2
        attrs: {
          line: {
            stroke: 'orange',
          },
        },
      }

  return [node,edge];
  
}