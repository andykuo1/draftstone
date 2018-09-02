import Chunk from 'Chunk.js';
import TileCursor from 'TileCursor.js';

const MAX_INACTIVE_TIME = 5000;

class ChunkManager
{
  constructor()
  {
    this.chunks = new Map();
    this.nullChunk = new Chunk(this);

    this.cursor = new TileCursor(this);
  }

  update()
  {
    const currentTime = this.getCurrentChunkTime();
    for(let [key, chunk] of this.chunks)
    {
      if (currentTime - chunk.getLastActiveTime() > MAX_INACTIVE_TIME)
      {
        this.chunks.delete(key);
      }
      else
      {
        chunk.update();
      }
    }
  }

  getCursor()
  {
    return this.cursor;
  }

  getChunk(chunkCoordX, chunkCoordY, isActive=true)
  {
    const chunkHash = hash2D(chunkCoordX, chunkCoordY);
    if (this.chunks.has(chunkHash))
    {
      const chunk = this.chunks.get(chunkHash);
      if (isActive)
      {
        chunk.setActiveTime(this.getCurrentChunkTime());
      }
      return chunk;
    }
    else
    {
      if (isActive)
      {
        return this.loadChunk(chunkCoordX, chunkCoordY);
      }
      else
      {
        return this.nullChunk;
      }
    }
  }

  loadChunk(chunkCoordX, chunkCoordY)
  {
    const chunkHash = hash2D(chunkCoordX, chunkCoordY);
    if (this.chunks.has(chunkHash))
    {
      throw new Error("Found chunk already loaded at (" + chunkCoordX + ", " + chunkCoordY + ")");
    }
    else
    {
      const chunk = new Chunk(chunkCoordX, chunkCoordY);
      chunk.setActiveTime(this.getCurrentChunkTime());
      this.chunks.set(chunkHash, chunk);
      return chunk;
    }
  }

  unloadChunk(chunkCoordX, chunkCoordY)
  {
    const chunkHash = hash2D(chunkCoordX, chunkCoordY);
    if (this.chunks.has(chunkHash))
    {
      const chunk = this.chunks.get(chunkHash);
      this.chunks.delete(chunkHash);
      return chunk;
    }
    else
    {
      throw new Error("Cannot find loaded chunk at (" + chunkCoordX + ", " + chunkCoordY + ")");
    }
  }

  isChunkLoaded(chunkCoordX, chunkCoordY)
  {
    const chunkHash = hash2D(chunkCoordX, chunkCoordY);
    return this.chunks.has(chunkHash);
  }

  getCurrentChunkTime()
  {
    return Date.now();
  }
}

function hash2D(x, y)
{
  return (53 + hashInt(x)) * 53 + hashInt(y);
}

//Robert Jenkin's 32 bit integer hash function
function hashInt(a)
{
  a = (a+0x7ed55d16) + (a<<12);
  a = (a^0xc761c23c) ^ (a>>19);
  a = (a+0x165667b1) + (a<<5);
  a = (a+0xd3a2646c) ^ (a<<9);
  a = (a+0xfd7046c5) + (a<<3);
  a = (a^0xb55a4f09) ^ (a>>16);
  return a;
}

export default ChunkManager;
