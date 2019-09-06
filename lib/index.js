import { ICommandPalette, MainAreaWidget } from '@jupyterlab/apputils';
import { Widget } from '@phosphor/widgets';
;
class APODWidget extends Widget {
    /**
    * Construct a new APOD widget.
    */
    constructor() {
        super();
        this.addClass('my-apodWidget');
        // Add an image element to the panel
        this.img = document.createElement('img');
        this.node.appendChild(this.img);
        // Add a summary element to the panel
        this.summary = document.createElement('p');
        this.node.appendChild(this.summary);
    }
    /**
    * Handle update requests for the widget.
    */
    async onUpdateRequest(msg) {
        const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=${this.randomDate()}`);
        if (!response.ok) {
            const data = await response.json();
            if (data.error) {
                this.summary.innerText = data.error.message;
            }
            else {
                this.summary.innerText = response.statusText;
            }
            return;
        }
        const data = await response.json();
        if (data.media_type === 'image') {
            // Populate the image
            this.img.src = data.url;
            this.img.title = data.title;
            this.summary.innerText = data.title;
            if (data.copyright) {
                this.summary.innerText += ` (Copyright ${data.copyright})`;
            }
        }
        else {
            this.summary.innerText = 'Random APOD fetched was not an image.';
        }
    }
    /**
     * Get a random date string in YYYY-MM-DD format.
     */
    randomDate() {
        const start = new Date(2010, 1, 1);
        const end = new Date();
        const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
        return randomDate.toISOString().slice(0, 10);
    }
}
/**
* Activate the APOD widget extension.
*/
function activate(app, palette) {
    console.log('JupyterLab extension example is activated!');
    // Create a single widget
    const content = new APODWidget();
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
            // Refresh the picture in the widget
            content.update();
            // Activate the widget
            app.shell.activateById(widget.id);
        }
    });
    // Add the command to the palette.
    palette.addItem({ command, category: 'Tutorial' });
}
;
/**
 * Initialization data for the example extension.
 */
const extension = {
    id: 'example',
    autoStart: true,
    requires: [ICommandPalette],
    activate: activate
};
export default extension;
