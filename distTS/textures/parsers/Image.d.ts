/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2018 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */
/**
 * Adds an Image Element to a Texture.
 *
 * @function Phaser.Textures.Parsers.Image
 * @memberOf Phaser.Textures.Parsers
 * @private
 * @since 3.0.0
 *
 * @param {Phaser.Textures.Texture} texture - The Texture to add the Frames to.
 * @param {integer} sourceIndex - The index of the TextureSource.
 *
 * @return {Phaser.Textures.Texture} The Texture modified by this parser.
 */
declare var Image: new (width?: number, height?: number) => HTMLImageElement;
