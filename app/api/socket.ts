import { initSocket } from "./socket/route";


export const config = {
  api: { bodyParser: false },
};

export default function handler(req: any, res: any) {
  if (!res.socket.server.io) {
    console.log("🌐 Initializing Socket.IO");
    const io = initSocket(res.socket.server);
    res.socket.server.io = io;
  }
  res.end();
}
