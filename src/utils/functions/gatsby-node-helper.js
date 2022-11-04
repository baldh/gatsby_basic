//This function returns an array of valid tags from provided tags array or string
/*
* tags = ["health,help","easy,Indian",null,"dessert,cold","indian,dessert"]
* createTagList(tags) returns the following
* ['health', 'help', 'easy', 'indian', 'dessert', 'cold']
* */
function createTagList(tags) {
  let tagList
  if(Array.isArray(tags)) {
    tagList = tags.filter(tag=>tag).map(tag=>tag.split(",").filter(i=>i!=="")).flat(2)
  } else {
    tagList = tags ? tags.split(",").filter(i=>i!=="") : []
  }
  return Array.from(new Set(tagList.map(tag => tag.toLowerCase().trim().replace(" ","-"))))
}

//This function creates a valid slug from the given string
/*
* str = "Hello World" returns "hello-world"
* str = "How to guide/improve UX" returns "how-to-guide/improve-ux"
* */
function createSlug(str) {
  if(str.includes("/")) return str.toLowerCase().split("/").map(item=> item.replaceAll(/\W/g,"-")).join("/")

  return str.toLowerCase().replaceAll(/\W/g,"-")
}


module.exports = {
  createTagList,
  createSlug
}