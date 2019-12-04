const ctrack = new p5(
  (p) => {

    let cam;

    p.x = 0;
    p.y = 0;

    p.targetRed = 252;
    p.targetGreen = 0;
    p.targetBlue = 0;

    p.displayWidth = 640;
    p.displayHeight = 480;

    let trackCanvas;

    let showingNow = false;

    // p.threshold_slider = null;

    p.setup = () => {
      cam = p.createCapture(p.VIDEO);
      cam.size(640, 480);
      cam.hide();
      // p.threshold_slider = createSlider(0, 100, 0, 1);
      trackCanvas = p.createCanvas(640, 480);
      trackCanvas.hide();
    };

    p.draw = () => {
      cam.loadPixels();
      const tracked = doTrack();
      p.x = tracked.x;
      p.y = tracked.y;

      if(showingNow) {
        p.background(0);
        p.translate(640, 0);
        p.scale(-1,1);
        p.image(cam,0,0, 640,480);
        p.translate(0, 0);
        p.scale(1,1);
        p.fill(0,0,250, 170);
        p.ellipse(p.x, p.y, 50,50);
      }
    };

    p.showCanvas = () => {
      trackCanvas.show();
      showingNow = true;
    };

    p.hideCanvas = () => {
      trackCanvas.hide();
      showingNow = false;
    };

    p.setDisplaySize = (width, height) => {
      p.displayWidth = width;
      p.displayHeight = height;
    }

    function doTrack() {
      let sumx = 0;
      let sumy = 0;
      let count = 0;

      const threshold = 212;

      for (let i = 0; i < 640 * 480; i++) {
        const camred = cam.pixels[i * 4];
        const camgreen = cam.pixels[i * 4 + 1];
        const camblue = cam.pixels[i * 4 + 2];

        const dist_to_col = easyDist(camred, camgreen, camblue, p.targetRed, p.targetGreen, p.targetBlue);
        if (dist_to_col < threshold) {
          const y = Math.floor(i / 480);
          const x = i % 640;
          count++;
          sumx += x;
          sumy += y;
        }
      }
      let targetX = sumx/count;
      let targetY = sumy/count;
      targetX = p.map(targetX, 0, 640, p.displayWidth, 0);
      targetY = p.map(targetY, 0, 480, 0, p.displayHeight);
      return { x: targetX, y: targetY };
    }

    function easyDist(x1, y1, z1, x2, y2, z2) {
      return Math.abs(x1-x2) + Math.abs(y1-y2) + Math.abs(z1-z2);
      // return (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2) + (z1 - z2) * (z1 - z2);
    }
  }
);

ctrack.setDisplaySize(600, 400);