class WT_MapViewAirplaneLayer extends WT_MapViewCanvasLayer {
    constructor(id = WT_MapViewAirplaneLayer.ID_DEFAULT, configName = WT_MapViewAirplaneLayer.CONFIG_NAME_DEFAULT) {
        super(id, configName);

        this._optsManager = new WT_OptionsManager(this, WT_MapViewAirplaneLayer.OPTIONS_DEF);
    }

    get canvas() {
        return this.canvases[0].canvas;
    }

    get canvasContext() {
        return this.canvases[0].context;
    }

    _drawIconToCanvas(iconImage) {
        this.canvasContext.drawImage(iconImage, 0, 0, this.iconSize, this.iconSize);
    }

    onViewSizeChanged(data) {
    }

    onConfigLoaded() {
        this._setPropertyFromConfig("iconSize");

        this.canvas.width = this.iconSize;
        this.canvas.height = this.iconSize;
        this.canvas.style.left = `${-this.iconSize / 2}px`;
        this.canvas.style.top = `${-this.iconSize / 2}px`;
        this.canvas.style.width = `${this.iconSize}px`;
        this.canvas.style.height = `${this.iconSize}px`;

        let iconImage = document.createElement("img");
        iconImage.onload = this._drawIconToCanvas.bind(this, iconImage);
        iconImage.src = this.config.iconPath;
    }

    onUpdate(data) {
        if (!data.viewPlane) {
            return;
        }
        let iconRotation = data.model.airplane.headingTrue + data.projection.rotation;
        this.canvas.style.transform = `translate(${data.viewPlane.x}px, ${data.viewPlane.y}px) rotate(${iconRotation}deg)`;
    }
}
WT_MapViewAirplaneLayer.ID_DEFAULT = "AirplaneLayer";
WT_MapViewAirplaneLayer.CONFIG_NAME_DEFAULT = "airplane";
WT_MapViewAirplaneLayer.OPTIONS_DEF = {
    iconSize: {default: 60, auto: true}
};