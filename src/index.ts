import {
  JupyterFrontEnd, JupyterFrontEndPlugin
} from '@jupyterlab/application';


/**
 * Initialization data for the example extension.
 */
const extension: JupyterFrontEndPlugin<void> = {
  id: 'example',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
    console.log('JupyterLab extension example is activated!');
  }
};

export default extension;
