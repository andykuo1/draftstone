import TileMap from 'TileMap.js';
import { TILE_SIZE } from 'TileMap.js';

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

    this.tileMap = new TileMap();
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

    const pointer = this.inputController.getPointer();
    ctx.fillRect(pointer.x, pointer.y, 10, 10);

    if (pointer.down)
    {
      const xx = Math.floor(pointer.x / TILE_SIZE);
      const yy = Math.floor(pointer.y / TILE_SIZE);
      this.tileMap.setTile(xx, yy, 1);
      this.tileMap.update();
    }

    this.mapRenderer.render(ctx, this.tileMap);
  }
}

export default World;
