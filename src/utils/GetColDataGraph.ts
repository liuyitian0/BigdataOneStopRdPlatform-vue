export function GetColRectDataGraph(id:String,labelTab:String,idsub:String,col:String,coltype:String) {
    let rect =     {
      "id":id,
      "shape":"er-rect",
      "label":labelTab,  
      "width":150,
      "height":24
    }  
  
    let ports = [
      {
        "id":idsub,
        "group":"list",
        "attrs":{
            "portNameLabel":{
                "text":col
            },
            "portTypeLabel":{
                "text":coltype
            }
        }
      }
    ]

  return [rect,ports];
  };


export function GetColEdgeDataGraph(sid:String,sidsub:String,tid:String,tidsub:String) {

    let edge = {
        "id":sid,
        "shape":"edge",
        "source":{
            "cell":sid,
            "port":sidsub
        },
        "target":{
            "cell":tid,
            "port":tidsub
        },
        "attrs":{
            "line":{
                "stroke":"#A2B1C3",
                "strokeWidth":2
            }
        },
        "zIndex":0
    }

    return [edge];
 };