class myVue{
  constructor(data, el) {
    this.data = data;
    this.el = el;

    this.run();
  }

  run() {
    observe(this.data);
    Object.keys(this.data).map(key => this.proxyKey(key));
    new Compiler(this.el, this.data)
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