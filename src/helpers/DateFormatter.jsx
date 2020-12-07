export const dateFormatter=(n)=>{
    var today = new Date(n);
    var dd = ((today.getDate() < 10)?"0":"") + today.getDate()
    var mm = (((today.getMonth()+1) < 10)?"0":"") + (today.getMonth()+1)
    var yyyy = today.getFullYear()
    var hr = ((today.getHours() < 10)?"0":"") + today.getHours()
    var mn = ((today.getMinutes() < 10)?"0":"") + today.getMinutes()
    var sec = ((today.getSeconds() < 10)?"0":"") + today.getSeconds()
  
    // today =dd + '-' + mm + '-' + yyyy
    today = yyyy + '-' + mm + '-' + dd + ' ' + hr + ':' + mn + ':' + sec
    return today
}