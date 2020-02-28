class Watcher {
  constructor(viewModel, expression, callback){
    this.viewModel = viewModel;
    this.expression = expression;
    this.callback = callback;
    this.value = this.viewModel.data[this.expression];

    this.register(); // register itself to Dep
  }

  update() {
    const newValue = this.viewModel.data[this.expression];
    const oldValue = this.value;
    if (newValue !== oldValue) {
      this.value = newValue;
      this.callback.call(this.viewModel, newValue, oldValue);
    }
  }

  register() {
    Dep.registerWatcher = this;
    // this code invoke the property getter
    // in the getter logic checking Dep.target and then add this watcher instance
    // in to dep subscribers array
    this.viewModel.data[this.expression];
    Dep.registerWatcher = null;
  }
}