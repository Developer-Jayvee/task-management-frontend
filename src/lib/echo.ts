import { configureEcho } from "@laravel/echo-react";
import axios from "axios";
import Pusher from "pusher-js";

const broadcastAuthUrl = `${import.meta.env.VITE_DOMAIN_URL}/broadcasting/auth`;


console.log("Reverb configuration:", {
    broadcaster: import.meta.env.VITE_BROADCAST,
    keyExists: !!import.meta.env.VITE_REVERB_APP_KEY,
    host: import.meta.env.VITE_REVERB_HOST,
    port: import.meta.env.VITE_REVERB_PORT,
});

window.Pusher = Pusher;
configureEcho({
  broadcaster: import.meta.env.VITE_BROADCAST,

  key: import.meta.env.VITE_REVERB_APP_KEY,

  wsPort: Number(import.meta.env.VITE_REVERB_PORT ?? 8080),
  wssPort: Number(import.meta.env.VITE_REVERB_PORT ?? 443),

  forceTLS: import.meta.env.VITE_REVERB_SCHEME === "https",
  enabledTransports: ["ws"],

  authEndpoint: broadcastAuthUrl,

  authorizer: (channel: { name: string }) => ({
    authorize: (
      socketId: string,
      callback: (error: boolean, data: unknown) => void,
    ) => {
      axios
        .post(
          broadcastAuthUrl,
          {
            socket_id: socketId,
            channel_name: channel.name,
          },
          {
            withCredentials: true,
            withXSRFToken: true,
            headers: {
              Accept: "application/json",
            },
          },
        )
        .then((response) => callback(false, response.data))
        .catch((error) => {
          console.error(
            "Broadcast authorization failed:",
            error.response?.status,
            error.response?.data,
          );
          callback(true, error);
        });
    },
  }),
});
