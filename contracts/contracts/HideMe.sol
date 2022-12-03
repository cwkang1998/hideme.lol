// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.17;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract HideMe is AccessControl {
    uint8 public constant RING_BUFFER_SIZE = 5;
    /// maps address of user to ring buffer
    mapping(address => uint256[RING_BUFFER_SIZE]) public fileHashRingBuffers;
    /// maps address of user to the current ring buffer index to store
    mapping(address => uint8) public ringBufferIndexes;
    /// maps address of user to hash of file type (eg. keccak256("MED_CERT")) to CID in IPFS
    mapping(address => mapping(bytes32 => string)) public userCids;

    event CommittedFile(address indexed user, uint256 hash);
    event SaveIpfsCid(address indexed user, bytes32 indexed fileType, string cid);

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    function commitFileHash(address user, uint256 hash) external onlyRole(DEFAULT_ADMIN_ROLE) {
        uint8 currentIndex = ringBufferIndexes[user];
        ringBufferIndexes[user] = (currentIndex + 1) % RING_BUFFER_SIZE;

        fileHashRingBuffers[user][currentIndex] = hash;

        emit CommittedFile(user, hash);
    }

    function storeUserCID(address user, bytes32 fileType, string memory cid) external onlyRole(DEFAULT_ADMIN_ROLE) {
        userCids[user][fileType] = cid;

        emit SaveIpfsCid(user, fileType, cid);
    }
}