// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "forge-std/Vm.sol";
import {Registry} from "../src/Registry.sol";

contract RegisterContract is Script {
    function run() external {
        address registryAddress = vm.envAddress("REGISTRY_ADDRESS");
        string memory metadataHash = vm.envString("METADATA_HASH");

        Registry r = Registry(registryAddress);
        Registry.Contract memory c = Registry.Contract({
            metadataHash: metadataHash
        });

        vm.recordLogs();
        vm.broadcast();
        r.registerContract(c);

        Vm.Log[] memory entries = vm.getRecordedLogs();
        assert(entries.length == 1);
        assert(entries[0].topics[0] == Registry.ContractRegistered.selector);
        (uint256 contractID, Registry.Contract memory c2) = abi.decode(
            entries[0].data,
            (uint256, Registry.Contract)
        );
        console.log("Contract ID: ", contractID);
    }
}
