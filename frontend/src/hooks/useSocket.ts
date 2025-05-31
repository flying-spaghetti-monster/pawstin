import { useEffect, useMemo, useState } from 'react';
import SocketApi from '../api/socket';

export const useConnectSocket = () => {
  const [notifications, setNotifications] = useState();

  const connectSocket = () => {
    SocketApi.createConnection();
    SocketApi.socket?.on('client-message', (data) => {
      setNotifications(data);
    })
  }

  useEffect(() => {
    connectSocket();
  }, []);

  const socketData = useMemo(
    () => ({
      notifications,

    }),
    [
      notifications,

    ]
  );

  return socketData;
}