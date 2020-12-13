// console.log(Date.now())

var str = "King bed,Lipsy Sofa";
  var res = str.split(",");
  console.log(res)

  var a = str.split(",").map((val)=>{
      return ('ini '+ val)
  })

  console.log(a)