/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2018 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */
declare var GetCenterX: any;
declare var GetTop: any;
declare var SetBottom: any;
declare var SetCenterX: any;
/**
 * Takes given Game Object and aligns it so that it is positioned next to the top center position of the other.
 *
 * @function Phaser.Display.Align.To.TopCenter
 * @since 3.0.0
 *
 * @generic {Phaser.GameObjects.GameObject} G - [gameObject,$return]
 *
 * @param {Phaser.GameObjects.GameObject} gameObject - The Game Object that will be positioned.
 * @param {Phaser.GameObjects.GameObject} alignTo - The Game Object to base the alignment position on.
 * @param {number} [offsetX=0] - Optional horizontal offset from the position.
 * @param {number} [offsetY=0] - Optional vertical offset from the position.
 *
 * @return {Phaser.GameObjects.GameObject} The Game Object that was aligned.
 */
declare var TopCenter: (gameObject: any, alignIn: any, offsetX: any, offsetY: any) => any;
