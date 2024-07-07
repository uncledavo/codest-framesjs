import * as Comlink from 'comlink';
import { ProtocolConfiguration } from './components/protocol-config-button';

interface DebuggerInterface {
  impersonateUser: (fid: number) => void;
  setUrlAndRefresh: (url: string) => Promise<void>;
  refreshUrl: () => void;
}

export function setupComlinkHandler(
  setProtocolConfiguration: React.Dispatch<React.SetStateAction<ProtocolConfiguration | null>>,
  setFid: (fid: number) => void,
  refreshUrl: () => void,
  router: any  // Use 'any' to avoid type conflicts
): void {
  const debuggerInterface: DebuggerInterface = {
    impersonateUser: (fid: number) => {
      console.log(`Impersonating user with FID: ${fid}`);
      try {
        setFid(fid);
        setProtocolConfiguration({ protocol: 'farcaster', specification: 'farcaster' });
        console.log(`User impersonation complete for FID: ${fid}`);
      } catch (error) {
        console.error('Failed to impersonate user:', error);
      }
    },
    setUrlAndRefresh: async (url: string) => {
      console.log(`Setting URL and refreshing: ${url}`);
      try {
        await router.push(`?url=${encodeURIComponent(url)}`);
        refreshUrl();
        console.log(`URL set and refreshed successfully: ${url}`);
      } catch (error) {
        console.error('Failed to set URL and refresh:', error);
      }
    },
    refreshUrl: () => {
      console.log('Refreshing URL');
      try {
        refreshUrl();
        console.log('URL refreshed successfully');
      } catch (error) {
        console.error('Failed to refresh URL:', error);
      }
    },
  };

  try {
    console.log('Setting up Comlink handler');
    Comlink.expose(debuggerInterface);
    console.log('Comlink handler set up successfully');
  } catch (error) {
    console.error('Failed to set up Comlink handler:', error);
  }
}