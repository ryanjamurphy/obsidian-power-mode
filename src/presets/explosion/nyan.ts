// refer https://github.com/hoovercj/vscode-power-mode/issues/1#issuecomment-535331889
// image source: https://nyanpandablog.files.wordpress.com/2016/04/nyan-panda2.gif?w=256

import L from "../../L";
const type = L.nyan();

const config: IExplosion = {
  maxExplosions: 100,
  size: 10,
  frequency: 1,
  explosionOrder: "sequential",
  gifMode: "continue",
  duration: 400,
  offset: 0.26,
  backgroundMode: "image",
  imageList: [
    "data:image/webp;base64,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",
  ],
};

export default { type, config };
