import { ipcMain } from 'electron';
import Nanotimer from 'nanotimer';
import osc from 'osc';
import { config } from '../config';

class Engine {
  timer = new Nanotimer();
  isPlaying = false;
  currentTime = 0;

  udpPort = new osc.UDPPort(config.osc);

  constructor() {
    ipcMain.on('sequencer:isPlaying', (event: Event, value: boolean) => {
      console.log('is playing!!!', value);
    });

    ipcMain.on('sliderValue', (event: Event, value: number) => {
      this.sendOSC(value);
    });

    // Open the socket.
    this.udpPort.open();
  }

  initialize() {
    console.log('initializing engine...');
  }

  sendOSC = (value: number) => {
    const msg = {
      address: '/slider/value',
      args: [
        {
          type: 'f',
          value,
        },
      ],
    };

    this.udpPort.send(msg);
  };
}

export default new Engine();
