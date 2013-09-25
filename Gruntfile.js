module.exports = function (grunt) {

  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  var files = {
    phaser: [
      'src/Intro.js',
      'src/pixi/Pixi.js',
      'src/Phaser.js',
      'src/utils/Utils.js',
      'src/pixi/core/Matrix.js',
      'src/pixi/core/Point.js',
      'src/pixi/core/Rectangle.js',
      'src/pixi/display/DisplayObject.js',
      'src/pixi/display/DisplayObjectContainer.js',
      'src/pixi/display/Sprite.js',
      'src/pixi/display/Stage.js',
      'src/pixi/extras/CustomRenderable.js',
      'src/pixi/extras/Strip.js',
      'src/pixi/extras/Rope.js',
      'src/pixi/extras/TilingSprite.js',
      'src/pixi/filters/FilterBlock.js',
      'src/pixi/filters/MaskFilter.js',
      'src/pixi/primitives/Graphics.js',
      'src/pixi/renderers/canvas/CanvasGraphics.js',
      'src/pixi/renderers/canvas/CanvasRenderer.js',
      'src/pixi/renderers/webgl/WebGLBatch.js',
      'src/pixi/renderers/webgl/WebGLGraphics.js',
      'src/pixi/renderers/webgl/WebGLRenderer.js',
      'src/pixi/renderers/webgl/WebGLRenderGroup.js',
      'src/pixi/renderers/webgl/WebGLShaders.js',
      'src/pixi/text/BitmapText.js',
      'src/pixi/text/Text.js',
      'src/pixi/textures/BaseTexture.js',
      'src/pixi/textures/Texture.js',
      'src/pixi/textures/RenderTexture.js',
      'src/pixi/utils/EventTarget.js',
      'src/pixi/utils/Polyk.js',
      'src/core/Camera.js',
      'src/core/State.js',
      'src/core/StateManager.js',
      'src/core/LinkedList.js',
      'src/core/Signal.js',
      'src/core/SignalBinding.js',
      'src/core/Plugin.js',
      'src/core/PluginManager.js',
      'src/core/Stage.js',
      'src/core/Group.js',
      'src/core/World.js',
      'src/core/Game.js',
      'src/input/Input.js',
      'src/input/Keyboard.js',
      'src/input/Mouse.js',
      'src/input/MSPointer.js',
      'src/input/Pointer.js',
      'src/input/Touch.js',
      'src/input/InputHandler.js',
      'src/gameobjects/Events.js',
      'src/gameobjects/GameObjectFactory.js',
      'src/gameobjects/Sprite.js',
      'src/gameobjects/TileSprite.js',
      'src/gameobjects/Text.js',
      'src/gameobjects/BitmapText.js',
      'src/gameobjects/Button.js',
      'src/gameobjects/Graphics.js',
      'src/gameobjects/RenderTexture.js',
      'src/system/Canvas.js',
      'src/system/StageScaleMode.js',
      'src/system/Device.js',
      'src/system/RequestAnimationFrame.js',
      'src/math/RandomDataGenerator.js',
      'src/math/Math.js',
      'src/math/QuadTree.js',
      'src/geom/Circle.js',
      'src/geom/Point.js',
      'src/geom/Rectangle.js',
      'src/net/Net.js',
      'src/tween/TweenManager.js',
      'src/tween/Tween.js',
      'src/tween/Easing.js',
      'src/time/Time.js',
      'src/animation/AnimationManager.js',
      'src/animation/Animation.js',
      'src/animation/Frame.js',
      'src/animation/FrameData.js',
      'src/animation/Parser.js',
      'src/loader/Cache.js',
      'src/loader/Loader.js',
      'src/loader/Parser.js',
      'src/sound/Sound.js',
      'src/sound/SoundManager.js',
      'src/utils/Debug.js',
      'src/utils/Color.js',
      'src/physics/arcade/ArcadePhysics.js',
      'src/physics/arcade/Body.js',
      'src/particles/Particles.js',
      'src/particles/arcade/ArcadeParticles.js',
      'src/particles/arcade/Emitter.js',
      'src/tilemap/Tilemap.js',
      'src/tilemap/TilemapLayer.js',
      'src/tilemap/Tile.js',
      'src/tilemap/TilemapRenderer.js',
    ],
    physics: [
      'src/physics/advanced/Math.js',
      'src/physics/advanced/Util.js',
      'src/physics/advanced/Collision.js',
      'src/physics/advanced/Body.js',
      'src/physics/advanced/Joint.js',
      'src/physics/advanced/Shape.js',
      'src/physics/advanced/Contact.js',
      'src/physics/advanced/ContactSolver.js',
      'src/physics/advanced/Space.js',
      'src/physics/advanced/joints/Angle.js',
      'src/physics/advanced/joints/Revolute.js',
      'src/physics/advanced/joints/Weld.js',
      'src/physics/advanced/joints/Wheel.js',
      'src/physics/advanced/joints/Prismatic.js',
      'src/physics/advanced/joints/Distance.js',
      'src/physics/advanced/joints/Rope.js',
      'src/physics/advanced/joints/Mouse.js',
      'src/physics/advanced/shapes/Circle.js',
      'src/physics/advanced/shapes/Segment.js',
      'src/physics/advanced/shapes/Poly.js',
      'src/physics/advanced/shapes/Triangle.js',
      'src/physics/advanced/shapes/Box.js',
    ]
  }

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    connect: {
      examples: {
        options: {
          base: 'out/examples',
          keepalive: true
        }
      }
    },
    concat: {
      phaser: {
        options: {
          process: function(src, filepath) {
            if (filepath == 'src/Intro.js') {
              var tmp = grunt.file.read('src/Phaser.js');
              var version = tmp.substr(tmp.indexOf('VERSION:') + 10, 5);
              return src.replace('{buildDate}', (new Date()).toUTCString()).replace('{version}', version);
            }

            return src;
          }
        },
        files: {
          'build/phaser.js': files.phaser,
        }
      }
    },
    uglify: {
      phaser: {
        options: {
          report: 'min'
        },
        files: {
          'build/phaser.min.js': 'build/phaser.js'
        }
      }
    },
    clean: {
      phaser: {
        src: ['build/phaser.js', 'build/phaser.min.js']
      },
      examples: {
        src: ['out/examples/']
      }
    },
    copy: {
      examples: {
        files: [
          {expand: true, cwd: 'examples/assets/', src: ['**'], dest: 'out/examples/assets/'},
          {expand: true, cwd: 'build/', src: ['phaser.js'], dest: 'out/examples/assets/'}
        ]
      }
    },
    assemble: {
      options: {
        layout: 'default.hbs',
        layoutdir: 'build/layouts'
      },
      examples: {
        options: {
          assets: 'out/examples/assets',
          layout: 'example.hbs'
        },
        files: [
          {expand: true, cwd: 'examples/animation', src: ['*.hbs'], dest: 'out/examples/animation'},
          {expand: true, cwd: 'examples/audio', src: ['*.hbs'], dest: 'out/examples/audio'},
          {expand: true, cwd: 'examples/buttons', src: ['*.hbs'], dest: 'out/examples/buttons'},
          {expand: true, cwd: 'examples/camera', src: ['*.hbs'], dest: 'out/examples/camera'},
          {expand: true, cwd: 'examples/collision', src: ['*.hbs'], dest: 'out/examples/collision'},
          {expand: true, cwd: 'examples/display', src: ['*.hbs'], dest: 'out/examples/display'},
          {expand: true, cwd: 'examples/games', src: ['*.hbs'], dest: 'out/examples/games'},
          {expand: true, cwd: 'examples/input', src: ['*.hbs'], dest: 'out/examples/input'},
          {expand: true, cwd: 'examples/particles', src: ['*.hbs'], dest: 'out/examples/particles'},
          {expand: true, cwd: 'examples/quadtree', src: ['*.hbs'], dest: 'out/examples/quadtree'},
          {expand: true, cwd: 'examples/sprites', src: ['*.hbs'], dest: 'out/examples/sprites'},
          {expand: true, cwd: 'examples/text', src: ['*.hbs'], dest: 'out/examples/text'},
          {expand: true, cwd: 'examples/texture-crop', src: ['*.hbs'], dest: 'out/examples/texture-crop'},
          {expand: true, cwd: 'examples/tilemaps', src: ['*.hbs'], dest: 'out/examples/tilemaps'},
          {expand: true, cwd: 'examples/tilesprites', src: ['*.hbs'], dest: 'out/examples/tilesprites'},
          {expand: true, cwd: 'examples/tweens', src: ['*.hbs'], dest: 'out/examples/tweens'},
          {expand: true, cwd: 'examples', src: ['index.hbs'], dest: 'out/examples'},
        ]
      }
    }
  });

  grunt.registerTask('default', ['concat:phaser', 'uglify:phaser']);
  grunt.registerTask('examples', ['clean:examples', 'assemble:examples', 'copy:examples'])

};
