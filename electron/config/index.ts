export const config = {
  browserWindow: {
    height: 1000,
    width: 1500,
  },
  browserUrl: 'http://localhost:3000',
  osc: {
    // This is the port we're listening on.
    localAddress: '127.0.0.1',
    localPort: 57121,

    // This is where sclang is listening for OSC messages.
    remoteAddress: '127.0.0.1',
    remotePort: 57120,
    metadata: true,
  },
};
