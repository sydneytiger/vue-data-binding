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
      const subscriber = {
        update: () => {
          console.log('subscriber.update has been called');
        }
      }
      dep.addSubscriber(subscriber)
      return value;
    },
    set: (newValue) => {
      if (newValue !== value) {
        value = newValue;
        // place extrac logi here.
        console.log(`propery ${key} setter as been called setting value ${newValue}`);
        dep.notify();
      }
    }
  });
}

function Dep() {
  this.subscribers = [];
}

Dep.prototype.addSubscriber = function(subscriber) {
  this.subscribers.push(subscriber);
}

Dep.prototype.notify = function() {
  this.subscribers.map(subscriber => subscriber.update());
}