var XLSX = require('xlsx');
var fs = require('fs')
var workbook = XLSX.readFile('testdata1.xlsx');
var sheet_name_list = workbook.SheetNames;
var readResult = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]])
var list = []
var list2=[]
var list3=[]
var result=[]
readResult.forEach(function(elem, index) {
  list.push(
    {
      'first':elem.lv1,
      'index':index
    }
  )
  list2.push(
    {
      'first':elem.lv2,
      'index':index
    }
  )
  list3.push(
    {
      'first':elem.lv3,
      'index':index
    }
  )
})
for (let index = 0; index < list.length; index++) {
  if(!result.some(item=>item.name===list[index].first)) {
    result.push({
      name:list[index].first,
      children:[]
    })
  }
}
for(let index = 0; index < list.length; index++){
  for (let index2 = 0; index2 < list2.length; index2++) {
    for (let index3 = 0; index3 < result.length; index3++) {
    if(result[index3].children===undefined){
      result[index3].children=[{
          name:list2[index2].first
        }]
    }
    else{
      if(!result[index3].children.map(x=>x.name).includes(list2[index2].first)){
        if(list[index].index===list2[index2].index){
          result[index3].children.push(
            {
              name:list2[index2].first,
              children:[],
            }
          )
        }
      }
    }
  }
}
}
for(let index1 = 0; index1 < list.length; index1++) {
  for (let index2 = 0; index2 < list2.length; index2++) {
    for (let index3 = 0; index3 < list3.length; index3++) {
      for (let index4 = 0; index4 < result.length; index4++) {
        for (let index5 = 0; index5 < result[index4].children.length; index5++) {
        if(list[index1].index===list3[index3].index && list[index1].index===list2[index2].index){
          if(result[index4].children.map(x=>x.name).includes(list2[index2].first)){
            if(!result[index4].children.filter(x=>x.name===list2[index2].first)[0].children.map(x=>x.name).includes(list3[index3].first)){
            result[index4].children.filter(x=>x.name===list2[index2].first)[0].children.push(
              {
                name:list3[index3].first
              }
            )
            }
          }
        }
      }
      }
    }
  }
}

console.log(JSON.stringify(result))
fs.writeFile('data.json',JSON.stringify(result),function(err){
  if(err) throw err;
})
