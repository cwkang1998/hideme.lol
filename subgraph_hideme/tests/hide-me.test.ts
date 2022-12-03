import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import { CommittedFile } from "../generated/schema"
import { CommittedFile as CommittedFileEvent } from "../generated/HideMe/HideMe"
import { handleCommittedFile } from "../src/hide-me"
import { createCommittedFileEvent } from "./hide-me-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let user = Address.fromString("0x0000000000000000000000000000000000000001")
    let hash = BigInt.fromI32(234)
    let newCommittedFileEvent = createCommittedFileEvent(user, hash)
    handleCommittedFile(newCommittedFileEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("CommittedFile created and stored", () => {
    assert.entityCount("CommittedFile", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "CommittedFile",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "user",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "CommittedFile",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "hash",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
