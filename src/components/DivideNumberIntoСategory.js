function DivideNumberIntoСategory({num}){
    let n = num.toString();
  return n.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + " ");
}
export default DivideNumberIntoСategory;