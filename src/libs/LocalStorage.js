const getItem = (name) => {
  try {
    const serializedData = localStorage.getItem(name);
    if(serializedData === null){
      return undefined;
    }
    return JSON.parse(serializedData);
  }
  catch(err){
    return undefined;
  }
}

const saveItem = (name, data) => {
  try{
    const serializedData = JSON.stringify(data);
    localStorage.setItem(name, serializedData);
  }
  catch{
    // logged this somewhere
    return undefined;
  }
}

const dropItem = (name) => {
  try{
    localStorage.removeItem(name);
  }
  catch{
    // logged this somewhere
    return undefined;
  }
}

module.exports = {
  getItem,
  saveItem,
  dropItem
}