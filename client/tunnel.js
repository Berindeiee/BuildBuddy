import { createLocalTunnel } from '@stacksjs/tunnel';

(async () => {
  try {
    const url = await createLocalTunnel(5173);
    console.log('Publicly shareable URL of your localhost:', url);
  } catch (error) {
    console.error('Error creating local tunnel:', error);
  }
})();
