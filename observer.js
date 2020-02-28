/*
observer class observes the data model and thn use Object.defineProperty
to inject extra functionality in property's getter and setter.
*/
const observe = data => {
  if (!data || typeof data !== 'object') return;

  Object.keys(data).map(key => defineReactive(data, key, data[key]));
}

// implement extrac functionaliy in getter and setter.
const defineReactive = (data, key, value) => {
  observe(value); // recursively 
  var dep = new Dep();
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get: () => {
      // place extrac logic here.
      console.log(`propery ${key} getter as been called returning value ${value}`);
      
      // check if there is any watcher in Dep waiting for registeration
      if(Dep.registerWatcher) {
        dep.addWatcher(Dep.registerWatcher)
      }
      return value;
    },
    set: (newValue) => {
      if (newValue !== value) {
        value = newValue;
        // place extrac logi here.
        console.log(`propery ${key} setter as been called setting value ${newValue}`);

        dep.notify(); // notify watchers to execute update
      }
    }
  });
}