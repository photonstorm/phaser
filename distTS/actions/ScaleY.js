/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2018 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */
var PropertyValueInc = require('./PropertyValueInc');
/**
 * Takes an array of Game Objects, or any objects that have a public `scaleY` property,
 * and then adds the given value to each of their `scaleY` properties.
 *
 * The optional `step` property is applied incrementally, multiplied by each item in the array.
 *
 * To use this with a Group: `ScaleY(group.getChildren(), value, step)`
 *
 * @function Phaser.Actions.ScaleY
 * @since 3.0.0
 *
 * @generic {Phaser.GameObjects.GameObject[]} G - [items,$return]
 *
 * @param {(array|Phaser.GameObjects.GameObject[])} items - The array of items to be updated by this action.
 * @param {number} value - The amount to be added to the `scaleY` property.
 * @param {number} [step=0] - This is added to the `value` amount, multiplied by the iteration counter.
 * @param {integer} [index=0] - An optional offset to start searching from within the items array.
 * @param {integer} [direction=1] - The direction to iterate through the array. 1 is from beginning to end, -1 from end to beginning.
 *
 * @return {(array|Phaser.GameObjects.GameObject[])} The array of objects that were passed to this Action.
 */
var ScaleY = function (items, value, step, index, direction) {
    return PropertyValueInc(items, 'scaleY', value, step, index, direction);
};
module.exports = ScaleY;
//# sourceMappingURL=ScaleY.js.map