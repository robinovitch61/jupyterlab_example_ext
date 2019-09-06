import { ICommandPalette, MainAreaWidget } from '@jupyterlab/apputils';
import { Widget } from '@phosphor/widgets';
/**
 * Initialization data for the example extension.
 */
const extension = {
    id: 'example',
    autoStart: true,
    requires: [ICommandPalette],
    activate: (app, palette) => {
        console.log('JupyterLab extension example is activated!');
        // Create a blank content widget inside of a MainAreaWidget
        const content = new Widget();
        const widget = new MainAreaWidget({ content });
        widget.id = 'apod-jupyterlab';
        widget.title.label = 'Astronomy Picture';
        widget.title.closable = true;
        // Add an application command
        const command = 'apod:open';
        app.commands.addCommand(command, {
            label: 'Random Astronomy Picture',
            execute: () => {
                if (!widget.isAttached) {
                    // Attach the widget to the main work area if it's not there
                    app.shell.add(widget, 'main');
                }
                // Activate the widget
                app.shell.activateById(widget.id);
            }
        });
        // Add the command to the palette.
        palette.addItem({ command, category: 'Tutorial' });
    }
};
export default extension;
