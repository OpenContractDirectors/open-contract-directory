// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract Registry {
    event ContractRegistered(uint256 id, Contract c);
    event DeploymentRegistered(uint256 id, Deployment d);
    event FrontendRegistered(uint256 id, Frontend f);
    event ContractCertified(uint256 id, ContractCertificate c);
    event FrontendCertified(uint256 id, FrontendCertificate c);

    error ContractNotFound(uint256 id);
    error FrontendNotFound(uint256 id);

    struct Contract {
        string metadataHash;
    }

    struct Frontend {
        uint256 contractID;
        string ipfsHash;
    }

    struct ContractCertificate {
        uint256 contractID;
        address certifier;
    }

    struct FrontendCertificate {
        uint256 frontendID;
        address certifier;
    }

    struct Deployment {
        uint256 contractID;
        uint8 chainID;
        address contractAddress;
    }

    Contract[] private contracts;
    Deployment[] private deployments;
    Frontend[] private frontends;
    ContractCertificate[] private contractCertificates;
    FrontendCertificate[] private frontendCertificates;

    function registerContract(Contract memory c) external returns (uint256) {
        uint256 id = contracts.length;
        contracts.push(c);
        emit ContractRegistered(id, c);
        return id;
    }

    function registerDeployment(
        Deployment memory d
    ) external returns (uint256) {
        if (d.contractID >= contracts.length) {
            revert ContractNotFound(d.contractID);
        }
        uint256 id = deployments.length;
        deployments.push(d);
        emit DeploymentRegistered(id, d);
        return id;
    }

    function registerFrontend(Frontend memory f) external returns (uint256) {
        if (f.contractID >= contracts.length) {
            revert ContractNotFound(f.contractID);
        }
        uint256 id = frontends.length;
        frontends.push(f);
        emit FrontendRegistered(id, f);
        return id;
    }

    function certifyContract(uint256 contractID) external returns (uint256) {
        if (contractID >= contracts.length) {
            revert ContractNotFound(contractID);
        }
        uint256 id = contractCertificates.length;
        ContractCertificate memory a = ContractCertificate(
            contractID,
            msg.sender
        );
        contractCertificates.push(a);
        emit ContractCertified(contractID, a);
        return id;
    }

    function certifyFrontend(uint256 frontendID) external returns (uint256) {
        if (frontendID >= frontends.length) {
            revert FrontendNotFound(frontendID);
        }
        uint256 id = frontendCertificates.length;
        FrontendCertificate memory a = FrontendCertificate(
            frontendID,
            msg.sender
        );
        frontendCertificates.push(a);
        emit FrontendCertified(frontendID, a);
        return id;
    }

    function getContract(uint256 id) external view returns (Contract memory) {
        return contracts[id];
    }

    function getNumContracts() external view returns (uint256) {
        return contracts.length;
    }

    function getFrontend(uint256 id) external view returns (Frontend memory) {
        return frontends[id];
    }

    function getNumFrontends() external view returns (uint256) {
        return frontends.length;
    }

    function getDeployment(
        uint256 id
    ) external view returns (Deployment memory) {
        return deployments[id];
    }

    function getNumDeployments() external view returns (uint256) {
        return deployments.length;
    }

    function getContractCertificate(
        uint256 id
    ) external view returns (ContractCertificate memory) {
        return contractCertificates[id];
    }

    function getNumContractCertificates() external view returns (uint256) {
        return contractCertificates.length;
    }

    function getFrontendCertificate(
        uint256 id
    ) external view returns (FrontendCertificate memory) {
        return frontendCertificates[id];
    }

    function getNumFrontendCertificates() external view returns (uint256) {
        return frontendCertificates.length;
    }
}
