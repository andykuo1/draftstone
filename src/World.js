import ChunkManager from 'ChunkManager.js';
import { TILE_SIZE } from 'Chunk.js';

import Tile from 'Tile.js';
import TileRegistry from 'TileRegistry.js';
import MapRenderer from 'MapRenderer.js';

TileRegistry.registerTile(1, new Tile());

class World
{
  constructor()
  {
    this.canvas = null;
    this.canvasContext = null;

    this.inputController = null;

    this.tileMode = "add";

    this.chunkManager = new ChunkManager();
    this.mapRenderer = new MapRenderer();
  }

  initialize(app)
  {
    this.canvas = app.canvas;
    this.canvasContext = this.canvas.getContext('2d');

    this.inputController = app.inputController;
  }

  destroy()
  {
    this.canvasContext = null;
    this.canvas = null;

    this.inputController = null;
  }

  update()
  {
    const ctx = this.canvasContext;

    //Clear previous screen buffer
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    ctx.save();
    ctx.lineWidth = 8;
    ctx.strokeRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.restore();

    const pointer = this.inputController.getPointer();
    //ctx.fillRect(pointer.x, pointer.y, 10, 10);

    if (pointer.down)
    {
      const cursor = this.chunkManager.getCursor();
      const HALF_TILE = TILE_SIZE / 2;
      cursor.setWorldPosition(pointer.x - HALF_TILE, pointer.y - HALF_TILE);
      const tile = this.tileMode == "add" ? 1 : 0;
      cursor.setTile(tile);
      cursor.move(1, 0).setTile(tile).move(-1, 0);
      cursor.move(0, 1).setTile(tile).move(0, -1);
      cursor.move(1, 1).setTile(tile).move(-1, -1);
    }

    this.chunkManager.update();
    this.mapRenderer.render(ctx, this.chunkManager.chunks.values());
  }
}

export default World;
