import { useEffect, useRef, useState } from "react";

const useBroadCaster = (channelname, onMessage) => {
  const ChannerlRef = useRef(null);
  useEffect(() => {
    const channel = new BroadcastChannel(channelname);
    ChannerlRef.current = channel;

    if (onMessage && typeof onMessage === "function") {
      channel.onmessage = (e) => {
        onMessage(e.data);
      };
    }
    return () => {
      channel.close();
    };
  }, [channelname, onMessage]);
  const SendMessage = (msg) => {
    if (ChannerlRef.current) {
      ChannerlRef.current.postMessage(msg);
    }
  };
  return { SendMessage: SendMessage };
};

export default useBroadCaster;
