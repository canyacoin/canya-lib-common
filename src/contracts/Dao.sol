pragma solidity 0.4.24;
import "../../node_modules/zos-lib/contracts/migrations/Migratable.sol";
import "../../node_modules/openzeppelin-solidity/contracts/math/SafeMath.sol";
import "../../node_modules/openzeppelin-solidity/contracts/token/ERC20/StandardToken.sol";
import "../../node_modules/openzeppelin-solidity/contracts/ownership/Ownable.sol";


contract Dao is Migratable, Ownable {
    using SafeMath for uint256;
  
    StandardToken private canyaCoin;

    struct App {
        address owner;
        uint256 balance;
    }
    
    mapping (address=>uint256) internal usersPayment;
    mapping (address=>uint256) internal usersBalance;
    mapping (bytes32=>App) internal apps;

    event CreatedUserEscrow(address indexed user, uint256 amount);
    event UnlockedUserEscrow(address indexed user, uint256 amount);
    event PaidUser(address indexed user, uint256 amount);
    
    event DepositedToApp(address indexed owner, bytes32 indexed appId, uint256 amount);
    event WithdrawnFromApp(address indexed owner, bytes32 indexed appId, uint256 amount);

    modifier isAmountEscrowed(uint256 _amount) {
        require(_amount > 0);
        require(canyaCoin.transferFrom(msg.sender, address(this), _amount));
        _;
    }

    function initialize(StandardToken _token) public isInitializer("Dao", "0.1") {
        require(_token != address(0));
        canyaCoin = _token;
    }

    function createUserEscrow(uint256 _amount)
    public isAmountEscrowed(_amount) 
    returns (bool) {
        usersBalance[msg.sender] = usersBalance[msg.sender].add(_amount);
        emit CreatedUserEscrow(msg.sender, _amount);
        return true;
    }

    function balanceOfUser(address _user) 
    public view 
    returns (uint256) {
        return usersBalance[_user];
    }

    function unlockUserEscrow(address _user, uint256 _amount)    
    public 
    onlyOwner
    returns (bool) {        
        require(_user != address(0));
        require(_amount > 0 && _amount <= usersBalance[_user]);
        
        usersBalance[_user] = usersBalance[_user].sub(_amount);
        
        canyaCoin.transfer(_user, _amount);

        emit UnlockedUserEscrow(_user, _amount);
        
        return true;
    }

    function payUser(address _user, uint256 _amount)    
    public 
    onlyOwner
    returns (bool) {        
        require(_user != address(0));
        require(_amount > 0);
        
        usersPayment[_user] = usersPayment[_user].add(_amount);
        
        canyaCoin.transfer(_user, _amount);

        emit PaidUser(_user, _amount);
        
        return true;
    }

    function paymentsOfUser(address _user)
    public view 
    returns (uint256) {
        return usersPayment[_user];
    }

    function depositToApp(bytes32 _appId, uint256 _amount)
    public
    isAmountEscrowed(_amount)
    returns (bool) {
        apps[_appId].owner = msg.sender;
        apps[_appId].balance = apps[_appId].balance.add(_amount);

        emit DepositedToApp(msg.sender, _appId, _amount);   

        return true;
    }

    function balanceOfApp(bytes32 _appId)
    public view 
    returns (uint256) {
        return apps[_appId].balance;
    }

    function withdrawFromApp(address _appOwner, bytes32 _appId, uint256 _amount)
    public 
    onlyOwner
    returns (bool) {
        require(_appOwner != address(0));
        require(_amount > 0 && _amount <= apps[_appId].balance);
        require(apps[_appId].owner == _appOwner);      
        
        apps[_appId].balance = apps[_appId].balance.sub(_amount);

        canyaCoin.transfer(_appOwner, _amount);

        emit WithdrawnFromApp(_appOwner, _appId, _amount);
        
        return true;
    }

}