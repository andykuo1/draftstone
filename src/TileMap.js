const SIZE = 16;

class TileMap
{
  constructor()
  {
    this._map = new Uint8Array(SIZE * SIZE);
  }

  get map() { return this._map; }

  setTile(x, y, tile)
  {
    this._map[x + y * SIZE] = tile;
  }

  getTile(x, y)
  {
    return this._map[x + y * SIZE];
  }
}
TileMap.SIZE = SIZE;
export default TileMap;
