import {
  CommittedFile as CommittedFileEvent,
  RoleAdminChanged as RoleAdminChangedEvent,
  RoleGranted as RoleGrantedEvent,
  RoleRevoked as RoleRevokedEvent,
  SaveIpfsCid as SaveIpfsCidEvent
} from "../generated/HideMe/HideMe"
import {
  CommittedFile,
  RoleAdminChanged,
  RoleGranted,
  RoleRevoked,
  SaveIpfsCid
} from "../generated/schema"

export function handleCommittedFile(event: CommittedFileEvent): void {
  let entity = new CommittedFile(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.user = event.params.user
  entity.hash = event.params.hash

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleSaveIpfsCid(event: SaveIpfsCidEvent): void {
  let entity = new SaveIpfsCid(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.user = event.params.user
  entity.fileType = event.params.fileType
  entity.cid = event.params.cid

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
