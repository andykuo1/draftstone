const LOAD_WAITTIME = 20;

class ImageLoader
{
  constructor()
  {
    this.cachedImages = new Map();

    this.loadQueue = [];
    this.loadTimeout = null;
  }

  queueImage(url, callback=null)
  {
    this.loadQueue.push({ url: url, callback: callback });
  }

  flush(callback=null)
  {
    const loadCount = this.loadQueue.length;
    let success = [];
    let failure = [];

    let i = loadCount;
    while(i-- >= 0)
    {
      const imgArgs = this.loadQueue.shift();
      const imgURL = imgArgs.url;
      const imgCallback = imgArgs.callback;

      const img = new Image();
      img.onload = function() {
        success.push(img);
        if (imgCallback)
        {
          imgCallback(img, null);
        }

        //Check if this is the last loaded image
        if (callback && loadCount <= success.length + failure.length)
        {
          callback(success, failure);
        }
      };
      img.onerror = function() {
        failure.push(img);
        if (imgCallback)
        {
          imgCallback(null, img);
        }

        //Check if this is the last loaded image
        if (callback && loadCount <= success.length + failure.length)
        {
          callback(success, failure);
        }
      };
      img.src = imgURL;
      this.cachedImages.set(imgURL, img);
    }
  }

  getImage(url, callback=null)
  {
    if (this.cachedImages.has(url))
    {
      return this.cachedImages.get(url);
    }
    else if (callback)
    {
      this.queueImage(url, callback);
      this.flush();
    }
    else
    {
      throw new Error("Could not find cached image with url \'" + url + "\'");
    }
  }
}

export default ImageLoader;
