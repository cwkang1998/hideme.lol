import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
  CommittedFile,
  RoleAdminChanged,
  RoleGranted,
  RoleRevoked,
  SaveIpfsCid
} from "../generated/HideMe/HideMe"

export function createCommittedFileEvent(
  user: Address,
  hash: BigInt
): CommittedFile {
  let committedFileEvent = changetype<CommittedFile>(newMockEvent())

  committedFileEvent.parameters = new Array()

  committedFileEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  committedFileEvent.parameters.push(
    new ethereum.EventParam("hash", ethereum.Value.fromUnsignedBigInt(hash))
  )

  return committedFileEvent
}

export function createSaveIpfsCidEvent(
  user: Address,
  fileType: Bytes,
  cid: string
): SaveIpfsCid {
  let saveIpfsCidEvent = changetype<SaveIpfsCid>(newMockEvent())

  saveIpfsCidEvent.parameters = new Array()

  saveIpfsCidEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  saveIpfsCidEvent.parameters.push(
    new ethereum.EventParam("fileType", ethereum.Value.fromFixedBytes(fileType))
  )
  saveIpfsCidEvent.parameters.push(
    new ethereum.EventParam("cid", ethereum.Value.fromString(cid))
  )

  return saveIpfsCidEvent
}
