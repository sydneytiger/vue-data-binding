class myVue{
  constructor(data, el, expressioin) {
    this.data = data;
    this.el = el;
    this.expressioin = expressioin;

    this.run();
  }

  run() {
    observe(this.data);
    this.el.innerHTML = this.data[this.expressioin];
    new Watcher(this, this.expressioin, value => {
      this.el.innerHTML = value;
    });
    
    Object.keys(this.data).map(key => this.proxyKey(key));
  }

  proxyKey(key) {
    Object.defineProperty(this, key, {
      enumerable: true,
      configurable: true,
      get: () => {
        return this.data[key];
      },
      set: (newValue) => {
        this.data[key] = newValue;
      }
    });
  }
}