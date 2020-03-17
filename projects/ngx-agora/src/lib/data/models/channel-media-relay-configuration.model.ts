export interface ChannelMediaRelayConfiguration {
    removeDestChannelInfo: (channelName: string) => void;
    setDestChannelInfo: (channelName: string, destInfo: any) => void;
    setSrcChannelInfo: (srcInfo: any) => void;
}