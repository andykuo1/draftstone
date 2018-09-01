export const CHUNK_SIZE = 16;
export const TILE_SIZE = 16;
export const BORDER_NORTH = 8;
export const BORDER_WEST = 1;
export const BORDER_SOUTH = 2;
export const BORDER_EAST = 4;
export const BORDER_ALL = 15;

class TileMap
{
  constructor()
  {
    this._tiles = new Uint8Array(CHUNK_SIZE * CHUNK_SIZE);
    this._metas = new Uint8Array(CHUNK_SIZE * CHUNK_SIZE);

    this._dirty = false;
  }

  update(forceUpdate=this._dirty)
  {
    if (forceUpdate)
    {
      let metadata;
      let n, s, w, e;
      const length = this._tiles.length;
      for(let i = 0; i < length; ++i)
      {
        if (this._tiles[i] <= 0) continue;

        metadata = 0;
        n = i - CHUNK_SIZE;
        s = i + CHUNK_SIZE;
        w = i - 1;
        e = i + 1;
        if (w >= 0 && w < length && this._tiles[w] <= 0)
        {
          metadata |= 1;
        }
        if (s >= 0 && s < length && this._tiles[s] <= 0)
        {
          metadata |= 2;
        }
        if (e >= 0 && e < length && this._tiles[e] <= 0)
        {
          metadata |= 4;
        }
        if (n >= 0 && n < length && this._tiles[n] <= 0)
        {
          metadata |= 8;
        }
        this._metas[i] = metadata;
      }
    }
  }

  setTile(posX, posY, tile)
  {
    let xCoord = Math.floor(posX);
    let yCoord = Math.floor(posY);
    if (xCoord < 0) return;
    if (xCoord >= CHUNK_SIZE) return;
    if (yCoord < 0) return;
    if (yCoord >= CHUNK_SIZE) return;
    this._tiles[xCoord + yCoord * CHUNK_SIZE] = tile;

    this._dirty = true;
  }

  getTile(posX, posY)
  {
    let xCoord = Math.round(posX);
    let yCoord = Math.round(posY);
    if (xCoord < 0) return 0;
    if (xCoord >= CHUNK_SIZE) return 0;
    if (yCoord < 0) return 0;
    if (yCoord >= CHUNK_SIZE) return 0;
    return this._tiles[xCoord + yCoord * CHUNK_SIZE];
  }
}

export default TileMap;
