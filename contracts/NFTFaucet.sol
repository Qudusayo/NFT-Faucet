//SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

/// @title MultiFaucetNFT
/// @author 0xPr0f and Qudusayo
/// @notice Test NFT for development

interface IMultiFaucetNFT {
    function mint(address _dst) external;

    function mintBatch(address _dst, uint256 _no) external;
}

contract NFTFaucet {
    address private multiFaucetContract;

    constructor(address _multiFaucetContract) {
        multiFaucetContract = _multiFaucetContract;
    }

    function mint(address _dest, uint256 _amount) public {
        require(_amount <= 10, "Maximum limit is 10");
        if (_amount == 1) {
            IMultiFaucetNFT(multiFaucetContract).mint(_dest);
        } else {
            IMultiFaucetNFT(multiFaucetContract).mintBatch(_dest, _amount);
        }
    }
}
