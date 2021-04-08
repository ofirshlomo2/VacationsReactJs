import socketIOClient from 'socket.io-client';
import { useRef, useEffect } from 'react';

const socket = socketIOClient('http://localhost:5000');

function useSocket() {
	return socket;
}

export { useSocket };
