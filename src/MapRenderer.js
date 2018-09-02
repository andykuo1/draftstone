import TileRegistry from 'TileRegistry.js';
import { TILE_SIZE, CHUNK_SIZE,
  BORDER_NORTH, BORDER_WEST,
  BORDER_SOUTH, BORDER_EAST,
  BORDER_ALL } from 'Chunk.js';

class MapRenderer
{
  renderMapArray(ctx, mapArray)
  {
    let mapTile;
    const length = mapArray.length;
    for(let i = 0; i < length; ++i)
    {
      mapTile = mapArray[i];
      if (mapTile > 0)
      {
        ctx.fillRect((i % CHUNK_SIZE) * TILE_SIZE, Math.floor(i / CHUNK_SIZE) * TILE_SIZE, TILE_SIZE, TILE_SIZE);
      }
    }
  }

  renderMapLayer(ctx, tilemap, borderOnly=0, outline=false)
  {
    let tile;
    let meta;
    let prev;
    let x, y;
    const size = TILE_SIZE;

    const tiles = tilemap._tiles;
    const metas = tilemap._metas;
    const length = tiles.length;
    for(let i = 0; i < length; ++i)
    {
      tile = tiles[i];
      meta = metas[i];
      if (tile > 0 && (borderOnly <= 0 || (meta & borderOnly) > 0))
      {
        x = (i % CHUNK_SIZE) * TILE_SIZE;
        y = Math.floor(i / CHUNK_SIZE) * TILE_SIZE;

        if (outline && meta > 0)
        {
          ctx.lineWidth = 4;
          ctx.beginPath();
          ctx.moveTo(x, y);
          if ((meta & BORDER_NORTH) > 0)
          {
            ctx.lineTo(x + size, y);
          }
          else
          {
            ctx.moveTo(x + size, y);
          }
          if ((meta & BORDER_EAST) > 0)
          {
            ctx.lineTo(x + size, y + size);
          }
          else
          {
            ctx.moveTo(x + size, y + size);
          }
          if ((meta & BORDER_SOUTH) > 0)
          {
            ctx.lineTo(x, y + size);
          }
          else
          {
            ctx.moveTo(x, y + size);
          }
          if ((meta & BORDER_WEST) > 0)
          {
            ctx.lineTo(x, y);
          }
          else
          {
            ctx.moveTo(x, y);
          }
          ctx.stroke();
        }

        ctx.fillRect(x, y, size, size);
      }
    }
  }

  renderChunk(ctx, chunk)
  {
    ctx.save();
    ctx.translate(chunk.chunkCoordX * CHUNK_SIZE * TILE_SIZE, chunk.chunkCoordY * CHUNK_SIZE * TILE_SIZE);

    const WALL_SIZE = Math.floor((TILE_SIZE * 2) / 3);
    const SHADOW_SIZE = Math.floor((WALL_SIZE * 2) / 3);

    for(let i = 1; i < CHUNK_SIZE; ++i)
    {
      ctx.beginPath();
      ctx.moveTo(i * TILE_SIZE, 0);
      ctx.lineTo(i * TILE_SIZE, CHUNK_SIZE * TILE_SIZE);
      ctx.moveTo(0, i * TILE_SIZE);
      ctx.lineTo(CHUNK_SIZE * TILE_SIZE, i * TILE_SIZE);
      ctx.stroke();
    }

    ctx.fillStyle = "lightgray";
    ctx.translate(SHADOW_SIZE, 0);
    this.renderMapLayer(ctx, chunk, BORDER_EAST);
    ctx.translate(-SHADOW_SIZE, 0);

    ctx.fillStyle = "black";
    this.renderMapLayer(ctx, chunk, BORDER_SOUTH);

    /*
    ctx.filter = "blur(4px)";
    ctx.fillStyle = "black";
    this.renderMapLayer(ctx, tilemap, BORDER_ALL);
    */

    ctx.fillStyle = "gold";
    ctx.translate(0, -WALL_SIZE);
    this.renderMapLayer(ctx, chunk);
    ctx.translate(0, WALL_SIZE);

    ctx.restore();
  }

  render(ctx, chunks)
  {
    for(let chunk of chunks)
    {
      this.renderChunk(ctx, chunk);
    }
  }
}

export default MapRenderer;
