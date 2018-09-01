class Tile
{
  constructor(mainColor="slategray", wallColor="black", shadowColor="black")
  {
    this.id = -1;

    this.mainColor = mainColor;
    this.wallColor = wallColor;
    this.shadowColor = shadowColor;
  }

  setID(id)
  {
    this.id = id;
  }
}

export default Tile;
