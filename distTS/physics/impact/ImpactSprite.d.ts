/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2018 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */
declare var Class: any;
declare var Components: any;
declare var Sprite: any;
/**
 * @classdesc
 * An Impact Physics Sprite Game Object.
 *
 * A Sprite Game Object is used for the display of both static and animated images in your game.
 * Sprites can have input events and physics bodies. They can also be tweened, tinted, scrolled
 * and animated.
 *
 * The main difference between a Sprite and an Image Game Object is that you cannot animate Images.
 * As such, Sprites take a fraction longer to process and have a larger API footprint due to the Animation
 * Component. If you do not require animation then you can safely use Images to replace Sprites in all cases.
 *
 * @class ImpactSprite
 * @extends Phaser.GameObjects.Sprite
 * @memberOf Phaser.Physics.Impact
 * @constructor
 * @since 3.0.0
 *
 * @extends Phaser.Physics.Impact.Components.Acceleration
 * @extends Phaser.Physics.Impact.Components.BodyScale
 * @extends Phaser.Physics.Impact.Components.BodyType
 * @extends Phaser.Physics.Impact.Components.Bounce
 * @extends Phaser.Physics.Impact.Components.CheckAgainst
 * @extends Phaser.Physics.Impact.Components.Collides
 * @extends Phaser.Physics.Impact.Components.Debug
 * @extends Phaser.Physics.Impact.Components.Friction
 * @extends Phaser.Physics.Impact.Components.Gravity
 * @extends Phaser.Physics.Impact.Components.Offset
 * @extends Phaser.Physics.Impact.Components.SetGameObject
 * @extends Phaser.Physics.Impact.Components.Velocity
 * @extends Phaser.GameObjects.Components.Alpha
 * @extends Phaser.GameObjects.Components.BlendMode
 * @extends Phaser.GameObjects.Components.Depth
 * @extends Phaser.GameObjects.Components.Flip
 * @extends Phaser.GameObjects.Components.GetBounds
 * @extends Phaser.GameObjects.Components.Origin
 * @extends Phaser.GameObjects.Components.Pipeline
 * @extends Phaser.GameObjects.Components.ScaleMode
 * @extends Phaser.GameObjects.Components.ScrollFactor
 * @extends Phaser.GameObjects.Components.Size
 * @extends Phaser.GameObjects.Components.Texture
 * @extends Phaser.GameObjects.Components.Tint
 * @extends Phaser.GameObjects.Components.Transform
 * @extends Phaser.GameObjects.Components.Visible
 *
 * @param {Phaser.Physics.Impact.World} world - [description]
 * @param {number} x - The horizontal position of this Game Object in the world.
 * @param {number} y - The vertical position of this Game Object in the world.
 * @param {string} texture - The key of the Texture this Game Object will use to render with, as stored in the Texture Manager.
 * @param {(string|integer)} [frame] - An optional frame from the Texture this Game Object is rendering with.
 */
declare var ImpactSprite: any;
