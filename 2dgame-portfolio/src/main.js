import { dialogueData, scaleFactor } from "./constants";
import { k } from "./kaboomCtx";
import { displayDialogue, setCamScale } from "./utils";

// load sprite sheet and define animations for character movement
k.loadSprite("spritesheet", "./spritesheet.png", {
  sliceX: 39, // number of horizontal frames
  sliceY: 31, // number of vertical frames
  // animation from different angles (facing down, side and up)
  anims: {
    "idle-down": 936,
    "walk-down": { from: 936, to: 939, loop: true, speed: 8 },
    "idle-side": 975,
    "walk-side": { from: 975, to: 978, loop: true, speed: 8 },
    "idle-up": 1014,
    "walk-up": { from: 1014, to: 1017, loop: true, speed: 8 },
  },
});

// load the game map background image and set the bg color behind it
k.loadSprite("map", "./map.png");
k.setBackground(k.Color.fromHex("#311047"));

// main game scene
k.scene("main", async () => {
  // load map data
  const mapData = await (await fetch("./map.json")).json();
  const layers = mapData.layers;

  // make it a game object
  const map = k.add([k.sprite("map"), k.pos(0), k.scale(scaleFactor)]);

  // define player character with properties and animations
  const player = k.make([
    k.sprite("spritesheet", { anim: "idle-down" }), // default animation
    k.area({ shape: new k.Rect(k.vec2(0, 3), 10, 10) }), // defines collision area
    k.body(), // enables physics properties
    k.anchor("center"), // centers player sprite
    k.pos(), // initial position
    k.scale(scaleFactor), //scaling
    {
      speed: 250, // player movement speed
      direction: "down", // default direction
      isInDialogue: false, // / tracks if player is in dialogue
    },
    "player", // assigns "player" tag
  ]);

  // iterate through map layers to add objects
  for (const layer of layers) {
    if (layer.name === "boundaries") {
      // create solid boundary objects
      for (const boundary of layer.objects) {
        map.add([
          k.area({
            shape: new k.Rect(k.vec2(0), boundary.width, boundary.height),
          }),
          k.body({ isStatic: true }), // makes it non-movable
          k.pos(boundary.x, boundary.y),
          boundary.name,
        ]);

        // check for collisions with named boundaries
        if (boundary.name) {
          player.onCollide(boundary.name, () => {
            player.isInDialogue = true; // prevents movement during dialogue
            displayDialogue(dialogueData[boundary.name], () => {
              player.isInDialogue = false; // resumes movement after dialogue
            });
          });
        }
      }
      continue;
    }
    if (layer.name === "spawnpoints") {
      for (const entity of layer.objects) {
        if (entity.name === "player") {
          // set the player's position based on the map's coordinates
          player.pos = k.vec2(
            (map.pos.x + entity.x) * scaleFactor,
            (map.pos.y + entity.y) * scaleFactor
          );
          k.add(player);
          continue;
        }
      }
    }
  }

  setCamScale(k);

  k.onResize(() => {
    setCamScale(k);
  });

  // continuously update camera position to follow the player
  k.onUpdate(() => {
    k.camPos(player.pos.x, player.pos.y + 100);
  });

  // move player with a left mouse click, unless in dialogue
  k.onMouseDown((mouseBtn) => {
    if (mouseBtn !== "left" || player.isInDialogue) return;

    const worldMousePos = k.toWorld(k.mousePos());
    player.moveTo(worldMousePos, player.speed);

    const mouseAngle = player.pos.angle(worldMousePos);

    const lowerBound = 50;
    const upperBound = 125;

    //character looks up when walking up
    if (
      mouseAngle > lowerBound &&
      mouseAngle < upperBound &&
      player.curAnim() !== "walk-up"
    ) {
      player.play("walk-up");
      player.direction = "up";
      return;
    }

    //character looks down when walking down
    if (
      mouseAngle < -lowerBound &&
      mouseAngle > -upperBound &&
      player.curAnim() !== "walk-down"
    ) {
      player.play("walk-down");
      player.direction = "down";
      return;
    }

    //character looks to the correct side when walking to in that direction
    if (Math.abs(mouseAngle) > upperBound) {
      player.flipX = false;
      if (player.curAnim() !== "walk-side") player.play("walk-side");
      player.direction = "right";
      return;
    }

    if (Math.abs(mouseAngle) < lowerBound) {
      player.flipX = true;
      if (player.curAnim() !== "walk-side") player.play("walk-side");
      player.direction = "left";
      return;
    }

    // makes the character stop
    k.onMouseRelease(() => {
      if (player.direction === "down") {
        player.play("idle-down");
        return;
      }
      if (player.direction === "up") {
        player.play("idle-up");
        return;
      }

      player.play("idle-side");
    });

    // k.onMouseRelease(stopAnims);
  });
});

k.go("main"); // goes to default scene when loads
