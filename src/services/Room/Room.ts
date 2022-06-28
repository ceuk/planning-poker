/* eslint-disable no-useless-constructor */
import Peer, { DataConnection } from 'peerjs'
import { PayloadAction } from '@reduxjs/toolkit'
import { addConnection, createRoomError, joinRoomError, removeConnection, updateConnectionStatus } from '@/state/slices/room'
import { AppDispatch } from '@/state/store'

abstract class Room {
  public appDispatch: AppDispatch | null = null
  public peer: Peer | null = null

  constructor(public roomId: string, public userName: string) { }

  public broadcast(_: PayloadAction<unknown>, __?: string) {}

  public destroy() {
    this.peer?.destroy()
  }

  protected onPeerOpen() {
    this.peer?.on('disconnected', this.onPeerClosed.bind(this))
  }

  protected onPeerClosed() {
    this.dispatch(updateConnectionStatus(false))
  }

  protected onPeerError(err: Error) {
    this.dispatch(createRoomError(err))
  }

  protected onReceiveData(data: PayloadAction<unknown>) {
    this.dispatch(data)
  }

  protected dispatch(action: PayloadAction<unknown>) {
    if (this.appDispatch) {
      this.appDispatch(action)
    }
  }
}

class RoomClient extends Room {
  private hostConnection: DataConnection | null = null

  constructor(public roomId: string, public userName: string) {
    super(roomId, userName)
    this.peer = new Peer()
    this.peer.on('open', this.onPeerOpen.bind(this))
    this.peer.on('error', this.onPeerError.bind(this))
  }

  protected override onPeerOpen() {
    super.onPeerOpen()
    if (this.peer) {
      this.hostConnection = this.peer.connect(this.roomId, { label: this.userName })
      this.hostConnection.on('open', this.onHostConnection.bind(this))
    }
  }

  public override broadcast(data: PayloadAction<unknown>) {
    this.hostConnection?.send(data)
  }

  protected onHostConnection() {
    this.dispatch(updateConnectionStatus(true))
    if (this.hostConnection) {
      this.hostConnection.on('data', this.onReceiveData.bind(this))
      this.hostConnection.on('close', this.onPeerClosed.bind(this))
      this.hostConnection.on('error', this.onPeerError.bind(this))
    }
  }

  protected onPeerError(err: Error) {
    this.dispatch(joinRoomError(err))
  }
}

class RoomHost extends Room {
  private connections: Map<string, DataConnection> = new Map()

  constructor(public roomId: string, public userName: string) {
    super(roomId, userName)
    this.peer = new Peer(roomId)
    this.peer.on('open', this.onPeerOpen.bind(this))
    this.peer.on('error', this.onPeerError.bind(this))
  }

  protected override onPeerOpen() {
    super.onPeerOpen()
    this.dispatch(updateConnectionStatus(true))
    this.peer?.on('connection', this.onReceiveConnection.bind(this))
  }

  public sendTo(clientId: string, data: PayloadAction<unknown>) {
    this.connections.get(clientId)?.send(data)
  }

  public override broadcast(data: PayloadAction<unknown>, originPeerId?: string) {
    this.connections.forEach((storedConnection, storedConnectionId) => {
      if (originPeerId !== storedConnectionId) {
        storedConnection.send(data)
      }
    })
  }

  private onReceiveConnection(connection: DataConnection) {
    connection.on('open', () => {
      const updatePayload = { id: connection.peer, name: connection.label }
      this.connections.set(connection.peer, connection)
      this.dispatch(addConnection(updatePayload))
      this.broadcast(addConnection(updatePayload), connection.peer)
      connection.on('data', this.onReceiveData.bind(this))
      connection.on('close', () => this.onReceiveDisconnection(connection))
    })
  }

  private onReceiveDisconnection(connection: DataConnection) {
    const updatePayload = { id: connection.peer, name: connection.label }
    this.connections.delete(connection.peer)
    this.dispatch(removeConnection(updatePayload))
    this.broadcast(removeConnection(updatePayload))
  }
}

class RoomInterface {
  static Peer: Peer | null

  private static AppDispatch: AppDispatch | null
  private static Instance: Room | null

  private constructor() {}

  public static Create(roomId: string, userName: string) {
    if (RoomInterface.Instance?.roomId === roomId &&
        RoomInterface instanceof RoomHost) {
      return
    }
    RoomInterface.Disconnect()
    RoomInterface.Instance = new RoomHost(roomId, userName)
    RoomInterface.Instance.appDispatch = RoomInterface.AppDispatch
  }

  public static Join(roomId: string, userName: string) {
    if (RoomInterface.Instance?.roomId === roomId) {
      return
    }
    RoomInterface.Disconnect()
    RoomInterface.Instance = new RoomClient(roomId, userName)
    RoomInterface.Instance.appDispatch = RoomInterface.AppDispatch
  }

  static Disconnect() {
    RoomInterface.Instance?.destroy()
    RoomInterface.Instance = null
  }

  static DispatchToClient(clientId: string, action: PayloadAction<unknown>) {
    if (RoomInterface.Instance instanceof RoomHost) {
      RoomInterface.Instance.sendTo(clientId, action)
    }
  }

  static Broadcast(action: PayloadAction<unknown>, originPeerId?: string) {
    RoomInterface?.Instance?.broadcast(action, originPeerId)
  }

  static get MyID() {
    return RoomInterface.Instance?.peer?.id
  }

  static set Dispatch(dispatch: AppDispatch | null) {
    RoomInterface.AppDispatch = dispatch
    if (RoomInterface.Instance) {
      RoomInterface.Instance.appDispatch = dispatch
    }
  }

  static get Dispatch() { return null }
}

export default RoomInterface
