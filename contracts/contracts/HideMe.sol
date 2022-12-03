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

    /// maps address of user to hash of file type (eg. keccak256("MED_CERT")) to file hash
    mapping(address => mapping(bytes32 => uint256)) public userFileHashes;

    event CommittedFileOld(address indexed user, uint256 hash);
    event SaveIpfsCid(
        address indexed user,
        bytes32 indexed fileType,
        string cid,
        string fileTypeString
    );
    event CommittedFile(
        address indexed user,
        bytes32 indexed fileType,
        uint256 hash,
        string fileTypeString
    );

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    function commitFileHashOld(
        address user,
        uint256 hash //onlyRole(DEFAULT_ADMIN_ROLE)
    ) external {
        uint8 currentIndex = ringBufferIndexes[user];
        ringBufferIndexes[user] = (currentIndex + 1) % RING_BUFFER_SIZE;

        fileHashRingBuffers[user][currentIndex] = hash;

        emit CommittedFileOld(user, hash);
    }

    function commitFileHash(
        address user,
        string memory fileTypeString,
        uint256 hash
    ) external {
        bytes32 fileType = keccak256(abi.encode(fileTypeString));
        userFileHashes[user][fileType] = hash;

        emit CommittedFile(user, fileType, hash, fileTypeString);
    }

    function storeUserCID(
        address user,
        string memory cid,
        string memory fileTypeString // onlyRole(DEFAULT_ADMIN_ROLE)
    ) external {
        bytes32 fileType = keccak256(abi.encode(fileTypeString));

        userCids[user][fileType] = cid;

        emit SaveIpfsCid(user, fileType, cid, fileTypeString);
    }
}
