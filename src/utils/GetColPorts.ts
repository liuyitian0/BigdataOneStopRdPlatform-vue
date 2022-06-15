export function GetColPorts(tab: String, tabcol: String, col: String, x: String, y: String) {
  // export function GetColRectDataGraph(tab:String,tabcol:String,col:String) {
  return {
    "ports": [{
      "id": tabcol,
      "group": "list",
      "attrs": {
        "portNameLabel": {
          "text": col
        },
        "portTypeLabel": {
          "text": "String"
        }
      }
    }]
  }

};