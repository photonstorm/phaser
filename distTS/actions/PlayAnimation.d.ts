/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2018 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */
/**
 * Play an animation with the given key, starting at the given startFrame on all Game Objects in items.
 *
 * @function Phaser.Actions.PlayAnimation
 * @since 3.0.0
 *
 * @generic {Phaser.GameObjects.GameObject[]} G - [items,$return]
 *
 * @param {(array|Phaser.GameObjects.GameObject[])} items - An array of Game Objects. The contents of this array are updated by this Action.
 * @param {string} key - The name of the animation to play.
 * @param {(string|integer)} [startFrame] - The starting frame of the animation with the given key.
 *
 * @return {(array|Phaser.GameObjects.GameObject[])} The array of Game Objects that was passed to this Action.
 */
declare var PlayAnimation: (items: any, key: any, startFrame: any) => any;
