/**
 * Initialization data for the example extension.
 */
const extension = {
    id: 'example',
    autoStart: true,
    activate: (app) => {
        console.log('JupyterLab extension example is activated!');
    }
};
export default extension;
