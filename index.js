function myVue (data, el, expression) {
  this.data = data;
  observe(data);
  el.innerHTML = this.data[expression];
  new Watcher(this, expression, function(value) {
    el.innerHTML = value;
  })

  return this;
}