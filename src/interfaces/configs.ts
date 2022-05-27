export interface Configs {
  render: {
    cache: boolean;
  };
  moleculer: {
    namespace: string;
    nodeID: string;
    transporter: string;
    registry: {
      strategy: string;
      discoverer: string;
    };
    web: {
      enabled: boolean;
      port: number;
      host: string;
    };
  };
}
