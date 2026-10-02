// Temporary market availability controls.
// Canada can be re-enabled by changing this flag to true when its payment processor is ready.
export const MARKET_CONFIG = {
  canadaEnabled: false,
} as const;

export const isMarketEnabled = (market: 'nigeria' | 'canada') =>
  market === 'nigeria' || MARKET_CONFIG.canadaEnabled;
