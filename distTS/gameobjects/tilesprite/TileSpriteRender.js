/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2018 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */
var renderWebGL = require('../../utils/NOOP');
var renderCanvas = require('../../utils/NOOP');
if (typeof WEBGL_RENDERER) {
    renderWebGL = require('./TileSpriteWebGLRenderer');
}
if (typeof CANVAS_RENDERER) {
    renderCanvas = require('./TileSpriteCanvasRenderer');
}
module.exports = {
    renderWebGL: renderWebGL,
    renderCanvas: renderCanvas
};
//# sourceMappingURL=TileSpriteRender.js.map