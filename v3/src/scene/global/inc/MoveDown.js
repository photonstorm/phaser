//  If the arguments are strings they are assumed to be keys, otherwise they are Scene objects
//  You can only swap the positions of Active (rendering / updating) Scenes. If a Scene is not active it cannot be moved.

/**
 * [description]
 *
 * @method Phaser.Scenes.GlobalSceneManager#moveDown
 * @since 3.0.0
 *
 * @param {string|Phaser.Scene} scene - [description]
 */
var MoveDown = function (scene)
{
    if (typeof scene === 'string') { scene = this.getScene(scene); }

    var index = this.getActiveSceneIndex(scene);

    if (index > 0)
    {
        // Swap the scene with the scene behind it in the active scenes array
        var sceneB = this.active[index - 1];
        this.active[index - 1] = scene;
        this.active[index] = sceneB;

        // Move the scene behind that scene in the scenes array
        this.scenes.splice(this.getSceneIndex(scene), 1);
        index = this.getSceneIndex(sceneB);
        this.scenes.splice(index, 0, scene);
    }
};

module.exports = MoveDown;
