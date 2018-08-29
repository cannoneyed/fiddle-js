declare module 'osc' {
  export interface UDPPortOptions {
    localAddress?: string;
    localPort?: number;
    remoteAddress?: string;
    remotePort?: number;
    metadata?: boolean;
  }

  export interface UDPPortConstructor {
    new (options: UDPPortOptions): UDPPort;
  }

  export interface UDPPort {
    open: () => void;
    send: (msg: any) => void;
    options: UDPPortOptions;
  }

  export interface OSC {
    UDPPort: UDPPortConstructor;
  }

  const osc: OSC;
  export default osc;
}
