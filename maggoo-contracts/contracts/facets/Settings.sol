// SPDX-License-Identifier: MIT

pragma solidity 0.8.20;
import "../libs/Modifiers.sol";
contract Settings is Modifiers {

    function setPaused(bool isPaused) external onlyOwner{
        LibSettings.layout().isPaused = isPaused;
    }

    function setFanTokens(address[] calldata tokens) external onlyOwner{
        LibSettings.Layout storage settings = LibSettings.layout();
        uint256 length = tokens.length;
        for(uint256 i;i<length;){
            settings.fanTokens[tokens[i]] = true;
            unchecked{
                i++;
            }
        }
    }

    function setMaggooConfig(uint256 newEggFee, uint256 newMysteryBoxFee) external onlyOwner {
        LibSettings.Layout storage settings = LibSettings.layout();
        settings.eggFee = newEggFee;
        settings.mysteryboxFee = newMysteryBoxFee;
    }

    function getEggAndMysteryBoxFees() external view returns(uint256 eggFee, uint256 mysteryboxFee){
        LibSettings.Layout storage settings = LibSettings.layout();
        eggFee = settings.eggFee;
        mysteryboxFee = settings.mysteryboxFee;
        return (eggFee,mysteryboxFee);
    }

    function setDEXRouter(address routerKEWL,address routerKAYEN) external onlyOwner{
        LibSettings.layout().KEWLRouter = routerKEWL;
        LibSettings.layout().KAYENRouter = routerKAYEN;
    }

    function setKEWLToken(address _kewl) external isValidContract(_kewl) onlyOwner{
        LibSettings.layout().KEWLToken  = _kewl;
    }

    function setWETH9Token(address _weth9,address _wethDefault) external onlyOwner{
        LibSettings.layout().WETH9  = _weth9;
        LibSettings.layout().WETHDEFAULT = _wethDefault;
    }

    function setCNS(address _cns) external isValidContract(_cns) onlyOwner{
        LibSettings.layout().CNS = _cns;
    }

    function setFeeReceiver(address _feeReceiver) external onlyOwner{
        LibSettings.layout().feeReceiver  = _feeReceiver;
    }

    function setFee(uint256 _fee) external onlyOwner{
        LibSettings.layout().fee  = _fee;
    }

    function setETH(address _ether) external onlyOwner{
        LibSettings.layout().ETH = _ether;
    }

    function setValidator(address _validator) external onlyOwner{
        LibSettings.layout().VALIDATOR = _validator;
    }

    function getRoyaltiesReceiver() public view returns(address){
        return LibSettings.layout().feeReceiver;
    }

    function setMarketFeeReceiver(address _feeReceiver) external onlyOwner {
        LibSettings.layout().marketFeeReceiver = _feeReceiver;
    }

    function setMarketFee(uint256 _fee) external onlyOwner {
        LibSettings.layout().marketFee = _fee;
    }

    function setFanTokenWrapper(address wrapper) external onlyOwner{
        LibSettings.layout().FANWRAPPER = wrapper;
    }

    function setMaggooNFTContract(address maggoo) external onlyOwner{
        LibSettings.layout().MAGGOONFT = maggoo;
    }

}
