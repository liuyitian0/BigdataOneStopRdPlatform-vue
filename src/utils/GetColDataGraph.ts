export function GetColRectDataGraph(tab:String,tabcol:String,col:String,x:String,y:String) {
// export function GetColRectDataGraph(tab:String,tabcol:String,col:String) {
    return  {
      "id":tab,
      "shape":"er-rect",
      "label":tab,  
      "width":300,
      "height":32,
      "position": {
        "x": x,
        "y": y
      },
      "ports":[{
            "id":tabcol,  
            "group":"list",
            "attrs":{
                "portNameLabel":{
                    "text":col
                },
                "portTypeLabel":{
                    "text":"String"
                }
            }
        }]
    }  

  };


export function GetColEdgeDataGraph(tabjoin:String,stab:String,scol:String,ttab:String,tcol:String) {

    return {

        "id":tabjoin,
        "shape":"edge",
        "source":{
            "cell":stab,
            "port":scol
        },
        "target":{
            "cell":ttab,
            "port":tcol
        },
        "attrs":{
            "line":{
                "stroke":"#A2B1C3",
                "strokeWidth":2
            }
        },
    }
 };