// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "forge-std/Vm.sol";
import {Registry} from "../src/Registry.sol";

contract RegisterDeployment is Script {
    function run() external {
        address registryAddress = vm.envAddress("REGISTRY_ADDRESS");
        uint256 contractID = vm.envUint("CONTRACT_ID");
        uint256 chainID = vm.envUint("CHAIN_ID");
        address contractAddress = vm.envAddress("CONTRACT_ADDRESS");

        assert(chainID < type(uint8).max);

        Registry r = Registry(registryAddress);
        Registry.Deployment memory d = Registry.Deployment({
            contractID: contractID,
            chainID: uint8(chainID),
            contractAddress: contractAddress
        });

        vm.recordLogs();
        vm.broadcast();
        r.registerDeployment(d);

        Vm.Log[] memory entries = vm.getRecordedLogs();
        assert(entries.length == 1);
        assert(entries[0].topics[0] == Registry.DeploymentRegistered.selector);
        (uint256 deploymentID, Registry.Deployment memory d2) = abi.decode(
            entries[0].data,
            (uint256, Registry.Deployment)
        );
        console.log("Deployment ID: ", deploymentID);
    }
}
