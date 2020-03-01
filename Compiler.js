class Compiler{
  constructor(el, viewModel) {
    this.el = el;
    this.viewModel = viewModel;

    this.compileElement(this.el);
  }

  compileElement(el) {
    const regex = /\{\{(.*)\}\}/;
    el.childNodes.forEach(node => {
      const text = node.textContent;
      
      // nodeType === 1 => the node is a text node e.g. span, p
      if(node.nodeType === 1 && regex.test(text)) {
        this.compileText(node, regex.exec(text)[1]);
      }

      if (node.chileNodes && node.chileNodes.length) {
        this.compileElement(node);
      }
    });
  }

  compileText(node, expression) {
    const initText = this.viewModel[expression];
    this.updateText(node, initText);

    new Watcher(this.viewModel, expression, value => {
      this.updateText(node, value);
    })
  }

  updateText(node, value) {
    node.textContent = value === undefined ? '' : value;
  }
}