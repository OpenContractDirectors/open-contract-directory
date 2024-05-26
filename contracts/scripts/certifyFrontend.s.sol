// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "forge-std/Vm.sol";
import {Registry} from "../src/Registry.sol";

contract CertifyFrontend is Script {
    function run() external {
        address registryAddress = vm.envAddress("REGISTRY_ADDRESS");
        uint256 frontendID = vm.envUint("FRONTEND_ID");

        Registry r = Registry(registryAddress);

        vm.recordLogs();
        vm.broadcast();
        r.certifyFrontend(frontendID);

        Vm.Log[] memory entries = vm.getRecordedLogs();
        assert(entries.length == 1);
        assert(entries[0].topics[0] == Registry.FrontendCertified.selector);
        (uint256 certificateID, Registry.FrontendCertificate memory c) = abi
            .decode(entries[0].data, (uint256, Registry.FrontendCertificate));
        console.log("Frontend Certificate ID: ", certificateID);
    }
}
