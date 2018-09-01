class TileRegistry
{
  constructor()
  {
    this.tileMapping = new Map();
  }

  registerTile(tileID, tile)
  {
    this.tileMapping.set(tileID, tile);
    tile.setID(tileID);
    return tile;
  }

  getTile(tileID)
  {
    return this.tileMapping.get(tileID);
  }
}

export default new TileRegistry();
