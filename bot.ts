import {
  WebSocketClient,
  StandardWebSocketClient,
} from "https://deno.land/x/websocket@v0.1.4/mod.ts";

import { connectMainJSON, connectGlobalTLJSON } from "./functions/misskey.ts";

import reply from "./functions/reply.ts";

/** JSDoc for this line */
export default class Bot {
  token?: string;
  endpoint?: string;
  ws?: WebSocketClient;

  constructor() {
    try {
      this.token = Deno.env.get("TOKEN");

      if (this.token === undefined)
        throw new Error("There is no token in the .env");

      this.endpoint = Deno.env.get("URL") + "=" + this.token;
      this.ws = new StandardWebSocketClient(this.endpoint);

      this.ws.on("open", () => {
        if (this.ws === undefined) throw new Error("Unavailable endpoint");
        console.log("🎉 WebSocket Connected ! 🎉");
        this.ws.send(connectMainJSON);
        // this.ws.send(connectGlobalTLJSON);
      });
      this.ws.on("message", (message: any) => {
        const data = JSON.parse(message.data);

        if (data.body.id === "main" && data.body.type === "mention") {
          const result = reply(data.body.body, this.token);
        }
      });
    } catch (e) {
      console.error(e.name + ": " + e.message);
    }
  }
}

const bot = new Bot();
