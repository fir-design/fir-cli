
import chalk from 'chalk';

const log = console.log;

function _fir3d() {
      return `
        ___                     ___     
       /  /\\      ___          /  /\\    
      /  /:/_    /  /\\        /  /::\\   
     /  /:/ /\\  /  /:/       /  /:/\\:\\  
    /  /:/ /:/ /__/::\\      /  /:/~/:/  
   /__/:/ /:/  \\__\\/\\:\\__  /__/:/ /:/___
   \\  \\:\\/:/      \\  \\:\\/\\ \\  \\:\\/:::::/
    \\  \\::/        \\__\\::/  \\  \\::/~~~~ 
     \\  \\:\\        /__/:/    \\  \\:\\     
      \\  \\:\\       \\__\\/      \\  \\:\\    
       \\__\\/                   \\__\\/    
      `
}


//convert fir3d into array seperated by new line
// https://colordesigner.io/gradient-generator
const colorSteps = {
      "pink_blue": [
            "#fa6ec0",
            "#e56fc3",
            "#d06fc5",
            "#bb70c4",
            "#a56fc1",
            "#906ebc",
            "#7c6db5",
            "#696aad",
            "#5867a3",
            "#496398",
            "#3d5f8b",
            "#335a7f",
            "#2d5472",
            "#2b4e65",
            "#2a4858"
      ],
      "blue_lime": [
            "#00fffc",
            "#00fff6",
            "#00ffee",
            "#00ffe5",
            "#00ffdb",
            "#00ffcf",
            "#00ffc2",
            "#00ffb3",
            "#00ffa4",
            "#00ff93",
            "#00ff80",
            "#00ff6c",
            "#00ff56",
            "#1bff3a",
            "#42ff00",
      ],
      "blue_green": [
            "#0c00ff",
            "#0044ff",
            "#005fff",
            "#0071ff",
            "#007eff",
            "#0088ff",
            "#0091ff",
            "#0098f5",
            "#009ed8",
            "#00a4b8",
            "#00aa98",
            "#00af78",
            "#00b45b",
            "#00b73e",
            "#00ba1f"
      ],
      "red_orange": [
            "#ff0042",
            "#ff2c39",
            "#ff432f",
            "#ff5724",
            "#ff6915",
            "#ff7a00",
            "#ff8a00",
            "#ff9a00",
            "#ffa900",
            "#ffb800",
            "#ffc700",
            "#fdd500",
            "#f6e400",
            "#eef100",
            "#e4ff00",
      ],
      "salmon_purple": [
            "#fab06e",
            "#f3a36c",
            "#ec966a",
            "#e38a69",
            "#da7e68",
            "#cf7367",
            "#c46966",
            "#b85f64",
            "#ac5662",
            "#9e4d60",
            "#91455e",
            "#833e5a",
            "#753757",
            "#663052",
            "#582a4d",
      ],
      "purple_gold": [
            "#ff00c6",
            "#ff00b7",
            "#ff00a8",
            "#ff0099",
            "#ff018a",
            "#ff1f7c",
            "#ff336e",
            "#ff4460",
            "#ff5353",
            "#ff6147",
            "#ff6e3b",
            "#ff7b2e",
            "#ff8622",
            "#ff9213",
            "#ff9c00",                      
      ],
      "purple_green": [
            "#ff00a8",
            "#ff0093",
            "#ff007c",
            "#ff1964",
            "#ff3b4b",
            "#ff562e",
            "#ff7000",
            "#ff8700",
            "#ff9d00",
            "#f7b100",
            "#e0c300",
            "#c5d400",
            "#a4e400",
            "#78f200",
            "#1eff00",            
      ]
}


function randomProperty(obj) {
      var keys = Object.keys(obj);
      return obj[keys[keys.length * Math.random() << 0]];
};

function _displayFirAscii() {
      let palette = randomProperty(colorSteps)
      const fir3dArray = fir3d().split('\n')

      fir3dArray.forEach((element, index) => {
            log(chalk.hex(palette[index]).bold(element))
      });
}

export const fir3d = _fir3d;
export const displayFirAscii = _displayFirAscii
