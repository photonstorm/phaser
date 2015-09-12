/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2015 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

/**
* Create a new `Button` object. A Button is a special type of Sprite that is set-up to handle Pointer events automatically.
*
* The four states a Button responds to are:
*
* * 'Over' - when the Pointer moves over the Button. This is also commonly known as 'hover'.
* * 'Out' - when the Pointer that was previously over the Button moves out of it.
* * 'Down' - when the Pointer is pressed down on the Button. I.e. touched on a touch enabled device or clicked with the mouse.
* * 'Up' - when the Pointer that was pressed down on the Button is released again.
*
* A different texture/frame and activation sound can be specified for any of the states.
*
* Frames can be specified as either an integer (the frame ID) or a string (the frame name); the same values that can be used with a Sprite constructor.
*
* @class Phaser.Button
* @constructor
* @extends Phaser.Image
* @param {Phaser.Game} game Current game instance.
* @param {number} [x=0] - X position of the Button.
* @param {number} [y=0] - Y position of the Button.
* @param {string} [key] - The image key (in the Game.Cache) to use as the texture for this Button.
* @param {function} [callback] - The function to call when this Button is pressed.
* @param {object} [callbackContext] - The context in which the callback will be called (usually 'this').
* @param {string|integer} [overFrame] - The frame / frameName when the button is in the Over state.
* @param {string|integer} [outFrame] - The frame / frameName when the button is in the Out state.
* @param {string|integer} [downFrame] - The frame / frameName when the button is in the Down state.
* @param {string|integer} [upFrame] - The frame / frameName when the button is in the Up state.
*/
Phaser.Button = function (game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame) {

    x = x || 0;
    y = y || 0;
    key = key || null;
    callback = callback || null;
    callbackContext = callbackContext || this;

    Phaser.Image.call(this, game, x, y, key, outFrame);

    /**
    * The Phaser Object Type.
    * @property {number} type
    * @readonly
    */
    this.type = Phaser.BUTTON;

    /**
    * @property {number} physicsType - The const physics body type of this object.
    * @readonly
    */
    this.physicsType = Phaser.SPRITE;

    /**
    * The name or ID of the Over state frame.
    * @property {string|integer} onOverFrame
    * @private
    */
    this._onOverFrame = null;

    /**
    * The name or ID of the Out state frame.
    * @property {string|integer} onOutFrame
    * @private
    */
    this._onOutFrame = null;

    /**
    * The name or ID of the Down state frame.
    * @property {string|integer} onDownFrame
    * @private
    */
    this._onDownFrame = null;

    /**
    * The name or ID of the Up state frame.
    * @property {string|integer} onUpFrame
    * @private
    */
    this._onUpFrame = null;

    /**
    * The Sound to be played when this Buttons Over state is activated.
    * @property {Phaser.Sound|Phaser.AudioSprite|null} onOverSound
    * @readonly
    */
    this.onOverSound = null;

    /**
    * The Sound to be played when this Buttons Out state is activated.
    * @property {Phaser.Sound|Phaser.AudioSprite|null} onOutSound
    * @readonly
    */
    this.onOutSound = null;

    /**
    * The Sound to be played when this Buttons Down state is activated.
    * @property {Phaser.Sound|Phaser.AudioSprite|null} onDownSound
    * @readonly
    */
    this.onDownSound = null;

    /**
    * The Sound to be played when this Buttons Up state is activated.
    * @property {Phaser.Sound|Phaser.AudioSprite|null} onUpSound
    * @readonly
    */
    this.onUpSound = null;

    /**
    * The Sound Marker used in conjunction with the onOverSound.
    * @property {string} onOverSoundMarker
    * @readonly
    */
    this.onOverSoundMarker = '';

    /**
    * The Sound Marker used in conjunction with the onOutSound.
    * @property {string} onOutSoundMarker
    * @readonly
    */
    this.onOutSoundMarker = '';

    /**
    * The Sound Marker used in conjunction with the onDownSound.
    * @property {string} onDownSoundMarker
    * @readonly
    */
    this.onDownSoundMarker = '';

    /**
    * The Sound Marker used in conjunction with the onUpSound.
    * @property {string} onUpSoundMarker
    * @readonly
    */
    this.onUpSoundMarker = '';

    /**
    * The Signal (or event) dispatched when this Button is in an Over state.
    *
    * The button *may* be put in the Down visual state instead of the Over visual state even though this event fires.
    * This occurs when pointer is pressed over the button, moved off the button, and then moved back over the button.
    * See {#overResumesPressedState} for controlling this behavior.
    *
    * Use the {#isPressed} property to determine the actual logical state.
    *
    * @property {Phaser.Signal} onInputOver
    */
    this.onInputOver = new Phaser.Signal();

    /**
    * The Signal (or event) dispatched when the pointer leaves the button.
    *
    * @property {Phaser.Signal} onInputOut
    */
    this.onInputOut = new Phaser.Signal();

    /**
    * The Signal (or event) dispatched on a pointer Down event.
    *
    * This usualy means that the button is in the 'pressed' of Down visual state.
    * However the Down visual state may occur even if this event does not fire - see {#onInputOver}.
    * Use the {#isPressed} property to determine the actual logical state.
    *
    * @property {Phaser.Signal} onInputDown
    */
    this.onInputDown = new Phaser.Signal();

    /**
    * The Signal (or event) dispatched after a pointer Up event.
    *
    * The Up event can be generated even though the pointer is *not* over the button.
    * Use the `isOver` (3rd) parameter supplied to test for this case.
    * (The {#isPressed} property cannot be used in this case because the pointer is already Up again.)
    *
    * @property {Phaser.Signal} onInputUp
    */
    this.onInputUp = new Phaser.Signal();

    /**
    * If true then onOver events (such as onOverSound) will only be triggered if the Pointer object causing them was the Mouse Pointer.
    * The frame will still be changed as applicable.
    * @property {boolean} onOverMouseOnly
    * @default
    */
    this.onOverMouseOnly = false;

    /**
    * Controls the behavior of pressing the pointer on the button, moving it off the button, and then moving it back on.
    * If the press is resumed the Down visual state will be entered.
    *
    * Valid values are false (never resume), true (resume for all pointer types), and 'cursor-only' (only resume for the mouse).
    *
    * @property {boolean|stream} [overResumesPressedState='cursor-only']
    */
    this.overResumesPressedState = 'cursor-only';
    
    /**
    * When true the the texture frame will *not* be automatically switched on up/down/over/out events.
    * @property {boolean} freezeFrames
    * @default
    */
    this.freezeFrames = false;

    /**
    * When the Button is touched / clicked and then released you can force it to enter a state of "out" instead of "up".
    * @property {boolean} forceOut
    * @default
    */
    this.forceOut = false;

    /**
    * A bitmask of pointers (by Pointer ID) that entered the down state on this button.
    * If any of these pointers moves back over the button it will revert to a 'Down' state instead of 'Over'.
    * @property {integer} _downPointerMask
    * @private
    */
    this._downPointerMask = 0;

    /**
    * A bitmask of pointers (by Pointer ID) that are currently over the button.
    * A button is only 'pressed' if there are any pressed-and-over pointers.
    * @property {integer} _downPointerMask
    * @private
    */
    this._overPointerMask = 0;

    this.inputEnabled = true;
    this.input.start(0, true);
    this.input.useHandCursor = true;

    this.setFrames(overFrame, outFrame, downFrame, upFrame);

    if (callback !== null)
    {
        this.onInputUp.add(callback, callbackContext);
    }

    //  Redirect the input events to here so we can handle animation updates, etc
    this.events.onInputOver.add(this.onInputOverHandler, this);
    this.events.onInputOut.add(this.onInputOutHandler, this);
    this.events.onInputDown.add(this.onInputDownHandler, this);
    this.events.onInputUp.add(this.onInputUpHandler, this);

    this.events.onRemovedFromWorld.add(this.removedFromWorld, this);

};

Phaser.Button.prototype = Object.create(Phaser.Image.prototype);
Phaser.Button.prototype.constructor = Phaser.Button;

//  State constants; local only. These are tied to property names in Phaser.Button.
var STATE_OVER = 'Over';
var STATE_OUT = 'Out';
var STATE_DOWN = 'Down';
var STATE_UP = 'Up';

/**
* Clears all of the frames set on this Button.
*
* @method Phaser.Button#clearFrames
*/
Phaser.Button.prototype.clearFrames = function () {

    this.setFrames(null, null, null, null);

};

/**
* Called when this Button is removed from the World.
*
* @method Phaser.Button#removedFromWorld
* @protected
*/
Phaser.Button.prototype.removedFromWorld = function () {

    this.inputEnabled = false;

};

/**
* Set the frame name/ID for the given state.
*
* @method Phaser.Button#setStateFrame
* @private
* @param {object} state - See `STATE_*`
* @param {number|string} frame - The number or string representing the frame.
* @param {boolean} switchImmediately - Immediately switch to the frame if it was set - and this is true.
*/
Phaser.Button.prototype.setStateFrame = function (state, frame, switchImmediately)
{
    var frameKey = '_on' + state + 'Frame';

    if (frame !== null) // not null or undefined
    {
        this[frameKey] = frame;

        if (switchImmediately)
        {
            this.changeStateFrame(state);
        }
    }
    else
    {
        this[frameKey] = null;
    }

};

/**
* Change the frame to that of the given state, _if_ the state has a frame assigned _and_ if the frames are not currently "frozen".
*
* @method Phaser.Button#changeStateFrame
* @private
* @param {object} state - See `STATE_*`
* @return {boolean} True only if the frame was assigned a value, possibly the same one it already had.
*/
Phaser.Button.prototype.changeStateFrame = function (state) {

    if (this.freezeFrames)
    {
        return false;
    }

    var frameKey = '_on' + state + 'Frame';
    var frame = this[frameKey];

    if (typeof frame === 'string')
    {
        this.frameName = frame;
        return true;
    }
    else if (typeof frame === 'number')
    {
        this.frame = frame;
        return true;
    }
    else
    {
        return false;
    }

};

/**
* Used to manually set the frames that will be used for the different states of the Button.
*
* Frames can be specified as either an integer (the frame ID) or a string (the frame name); these are the same values that can be used with a Sprite constructor.
*
* @method Phaser.Button#setFrames
* @public
* @param {string|integer} [overFrame] - The frame / frameName when the button is in the Over state.
* @param {string|integer} [outFrame] - The frame / frameName when the button is in the Out state.
* @param {string|integer} [downFrame] - The frame / frameName when the button is in the Down state.
* @param {string|integer} [upFrame] - The frame / frameName when the button is in the Up state.
*/
Phaser.Button.prototype.setFrames = function (overFrame, outFrame, downFrame, upFrame) {

    this.setStateFrame(STATE_OVER, overFrame, this.input.pointerOver());
    this.setStateFrame(STATE_OUT, outFrame, !this.input.pointerOver());
    this.setStateFrame(STATE_DOWN, downFrame, this.input.pointerDown());
    this.setStateFrame(STATE_UP, upFrame, this.input.pointerUp());

};

/**
* Set the sound/marker for the given state.
*
* @method Phaser.Button#setStateSound
* @private
* @param {object} state - See `STATE_*`
* @param {Phaser.Sound|Phaser.AudioSprite} [sound] - Sound.
* @param {string} [marker=''] - Sound marker.
*/
Phaser.Button.prototype.setStateSound = function (state, sound, marker) {

    var soundKey = 'on' + state + 'Sound';
    var markerKey = 'on' + state + 'SoundMarker';

    if (sound instanceof Phaser.Sound || sound instanceof Phaser.AudioSprite)
    {
        this[soundKey] = sound;
        this[markerKey] = typeof marker === 'string' ? marker : '';
    }
    else
    {
        this[soundKey] = null;
        this[markerKey] = '';
    }

};

/**
* Play the sound for the given state, _if_ the state has a sound assigned.
*
* @method Phaser.Button#playStateSound
* @private
* @param {object} state - See `STATE_*`
* @return {boolean} True only if a sound was played.
*/
Phaser.Button.prototype.playStateSound = function (state) {

    var soundKey = 'on' + state + 'Sound';
    var sound = this[soundKey];

    if (sound)
    {
        var markerKey = 'on' + state + 'SoundMarker';
        var marker = this[markerKey];

        sound.play(marker);
        return true;
    }
    else
    {
        return false;
    }

};

/**
* Sets the sounds to be played whenever this Button is interacted with. Sounds can be either full Sound objects, or markers pointing to a section of a Sound object.
* The most common forms of sounds are 'hover' effects and 'click' effects, which is why the order of the parameters is overSound then downSound.
*
* Call this function with no parameters to reset all sounds on this Button.
*
* @method Phaser.Button#setSounds
* @public
* @param {Phaser.Sound|Phaser.AudioSprite} [overSound] - Over Button Sound.
* @param {string} [overMarker] - Over Button Sound Marker.
* @param {Phaser.Sound|Phaser.AudioSprite} [downSound] - Down Button Sound.
* @param {string} [downMarker] - Down Button Sound Marker.
* @param {Phaser.Sound|Phaser.AudioSprite} [outSound] - Out Button Sound.
* @param {string} [outMarker] - Out Button Sound Marker.
* @param {Phaser.Sound|Phaser.AudioSprite} [upSound] - Up Button Sound.
* @param {string} [upMarker] - Up Button Sound Marker.
*/
Phaser.Button.prototype.setSounds = function (overSound, overMarker, downSound, downMarker, outSound, outMarker, upSound, upMarker) {

    this.setStateSound(STATE_OVER, overSound, overMarker);
    this.setStateSound(STATE_OUT, outSound, outMarker);
    this.setStateSound(STATE_DOWN, downSound, downMarker);
    this.setStateSound(STATE_UP, upSound, upMarker);

};

/**
* The Sound to be played when a Pointer moves over this Button.
*
* @method Phaser.Button#setOverSound
* @public
* @param {Phaser.Sound|Phaser.AudioSprite} sound - The Sound that will be played.
* @param {string} [marker] - A Sound Marker that will be used in the playback.
*/
Phaser.Button.prototype.setOverSound = function (sound, marker) {

    this.setStateSound(STATE_OVER, sound, marker);

};

/**
* The Sound to be played when a Pointer moves out of this Button.
*
* @method Phaser.Button#setOutSound
* @public
* @param {Phaser.Sound|Phaser.AudioSprite} sound - The Sound that will be played.
* @param {string} [marker] - A Sound Marker that will be used in the playback.
*/
Phaser.Button.prototype.setOutSound = function (sound, marker) {

    this.setStateSound(STATE_OUT, sound, marker);

};

/**
* The Sound to be played when a Pointer presses down on this Button.
*
* @method Phaser.Button#setDownSound
* @public
* @param {Phaser.Sound|Phaser.AudioSprite} sound - The Sound that will be played.
* @param {string} [marker] - A Sound Marker that will be used in the playback.
*/
Phaser.Button.prototype.setDownSound = function (sound, marker) {

    this.setStateSound(STATE_DOWN, sound, marker);

};

/**
* The Sound to be played when a Pointer has pressed down and is released from this Button.
*
* @method Phaser.Button#setUpSound
* @public
* @param {Phaser.Sound|Phaser.AudioSprite} sound - The Sound that will be played.
* @param {string} [marker] - A Sound Marker that will be used in the playback.
*/
Phaser.Button.prototype.setUpSound = function (sound, marker) {

    this.setStateSound(STATE_UP, sound, marker);

};

/**
* True if and only if there is a down pointer that was initially pressed while over the button
* and the pointer is currently over the button.
*
* This should be used to detect the logical 'pressed' state of the button.
*
* @name Phaser.Button#isPressed
* @property {boolean} isPressed
* @readonly
*/
Object.defineProperty(Phaser.Button.prototype, "isPressed", {

    get: function () {

        return (this._overPointerMask & this._downPointerMask) !== 0;

    }

});

/**
* Internal function that handles input events.
*
* @method Phaser.Button#onInputOverHandler
* @protected
* @param {Phaser.Button} sprite - The Button that the event occurred on.
* @param {Phaser.Pointer} pointer - The Pointer that activated the Button.
*/
Phaser.Button.prototype.onInputOverHandler = function (sprite, pointer) {

    //  If the Pointer was only just released then we don't fire an over event
    if (pointer.justReleased())
    {
        return;
    }

    this._overPointerMask |= (1 << pointer.pointerId);

    if ((this._downPointerMask & (1 << pointer.pointerId)) !== 0 &&
        (this.overResumesPressedState === true || (this.overResumesPressedState === 'cursor-only' && pointer.isMouse)))
    {
        // A pressed pointer re-entered the button so go back to 'Down' state, not 'Over'
        this.changeStateFrame(STATE_DOWN);
        this.playStateSound(STATE_DOWN);
        
        // However it is still an InputOver event that occured
        this.onInputOver.dispatch(this, pointer);

        return;
    }

    this.changeStateFrame(STATE_OVER);

    if (this.onOverMouseOnly && !pointer.isMouse)
    {
        return;
    }

    this.playStateSound(STATE_OVER);

    this.onInputOver.dispatch(this, pointer);

};

/**
* Internal function that handles input events.
*
* @method Phaser.Button#onInputOutHandler
* @protected
* @param {Phaser.Button} sprite - The Button that the event occurred on.
* @param {Phaser.Pointer} pointer - The Pointer that activated the Button.
*/
Phaser.Button.prototype.onInputOutHandler = function (sprite, pointer) {

    this._overPointerMask &= ~(1 << pointer.pointerId);

    if (!(this.overResumesPressedState === true || (this.overResumesPressedState === 'cursor-only' && pointer.isMouse)))
    {
        // Don't allow pressed-state resuming so also discredit pointer down flag;
        // otherwise isPressed could still result in a false-positive.
        this._downPointerMask &= ~(1 << pointer.pointerId);
    }

    this.changeStateFrame(STATE_OUT);

    this.playStateSound(STATE_OUT);

    this.onInputOut.dispatch(this, pointer);

};

/**
* Internal function that handles input events.
*
* @method Phaser.Button#onInputDownHandler
* @protected
* @param {Phaser.Button} sprite - The Button that the event occurred on.
* @param {Phaser.Pointer} pointer - The Pointer that activated the Button.
*/
Phaser.Button.prototype.onInputDownHandler = function (sprite, pointer) {

    this._downPointerMask |= (1 << pointer.pointerId);
    this._overPointerMask |= (1 << pointer.pointerId);  // Down implies over
    
    this.changeStateFrame(STATE_DOWN);

    this.playStateSound(STATE_DOWN);

    this.onInputDown.dispatch(this, pointer);
};

/**
* Internal function that handles input events.
*
* @method Phaser.Button#onInputUpHandler
* @protected
* @param {Phaser.Button} sprite - The Button that the event occurred on.
* @param {Phaser.Pointer} pointer - The Pointer that activated the Button.
*/
Phaser.Button.prototype.onInputUpHandler = function (sprite, pointer, isOver) {

    if (isOver)
    {
        // 'Button pressed', for real. Clear multi-touch pressed state.
        this._downPointerMask = 0;
    }
    else
    {
        this._downPointerMask &= ~(1 << pointer.pointerId);
    }

    if (!pointer.isMouse)
    {
        this._overPointerMask &= ~(1 << pointer.pointerId);
    }

    this.playStateSound(STATE_UP);

    //  Input dispatched early, before state change (but after sound)
    this.onInputUp.dispatch(this, pointer, isOver);

    if (this.freezeFrames)
    {
        return;
    }

    if (this.forceOut)
    {
        this.changeStateFrame(STATE_OUT);
    }
    else
    {
        var changedUp = this.changeStateFrame(STATE_UP);
        if (!changedUp)
        {
            //  No Up frame to show..
            if (isOver)
            {
                this.changeStateFrame(STATE_OVER);
            }
            else
            {
                this.changeStateFrame(STATE_OUT);
            }
        }
    }

};
