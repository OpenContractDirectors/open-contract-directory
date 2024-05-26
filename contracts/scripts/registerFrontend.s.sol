// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "forge-std/Vm.sol";
import {Registry} from "../src/Registry.sol";

contract RegisterFrontend is Script {
    function run() external {
        address registryAddress = vm.envAddress("REGISTRY_ADDRESS");
        string memory ipfsHash = vm.envString("IPFS_HASH");
        uint256 contractID = vm.envUint("CONTRACT_ID");

        Registry r = Registry(registryAddress);
        Registry.Frontend memory f = Registry.Frontend({
            contractID: contractID,
            ipfsHash: ipfsHash
        });

        vm.recordLogs();
        vm.broadcast();
        r.registerFrontend(f);

        Vm.Log[] memory entries = vm.getRecordedLogs();
        assert(entries.length == 1);
        assert(entries[0].topics[0] == Registry.FrontendRegistered.selector);
        (uint256 frontendID, Registry.Frontend memory f2) = abi.decode(
            entries[0].data,
            (uint256, Registry.Frontend)
        );
        console.log("Frontend ID: ", frontendID);
    }
}
