const uiOptions: ShowUIOptions = {
  width: 500,
  height: 616
};

figma.showUI(__html__, uiOptions);

figma.ui.onmessage = (msg) => {
  figma.closePlugin();
};
