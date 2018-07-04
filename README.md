# CanPay

Angular component for accepting payments in CAN through a seamless user experience using an a configurable params, [See how does it work.](./src/assets/video/PayInCAN.gif)

## Overview

Accepting payment with token in any dApp can be cumbersome because a developer needs to do mulitple checks and transactions in order to finalize a payment and same applies for the CanYaCoin (CAN). 

To streamline the process, we've created a component that takes care of the following:

- Check for the installed user wallet (Metamask or Trust)
- Guide the user to install or unlock the wallet
- Check the user CAN balance
- Allow a user to buy CAN or ETH (for gas) if he doesn't have enough balance
- Paying in CAN in a dApp, requires 2 transactions:
  - First, user has to authorise a payment from his address to the dApp address
  - Second, the dApp needs to withdraw the authorised funds and complete the user operation.
- Before poping up Metamask dialog to the user to execute a transaction, the wizard explains the transaction purpose and what's going to happen.
- After authorising a payment, the wizard calles (optionally) configured callback so the developer can do the authorised payment through his dApp contract.
- A callback is triggered upon successful completion for the whole operation
- Lastly, the component is configurable so it can be embedded inline or used as popup modal dialog.

## Usage

Component is packed in an npm package and can be used as normal angular module.

### Installation

`npm i @canyaio/canpay-lib`

In your module file:

```javascript
  import { CanpayModule } from 'canpay-lib';

  // include the module in your imported modules with (optional) configuration object
  @NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CanpayModule.forRoot({
      contracts: {
        useTestNet: <TRUE_FALSE>,
        canyaCoinAddress: <CanYaCoin_ADDRESS>,
        canyaAbi: <CanYaCoin_ABI>
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent],
})
```

### Using as Inline-Component

```javascript
  // In your controller file, define an object with the following params
  canPay = {
    dAppName: 'CANWork',
    recepient: <CANWORK_CONTRACT_ADDRESS>,
    amount: <AMOUNT_IN_CAN>,
    complete: <CALLBACK_ON_SUCCESS>,
    cancel: <CALLBACK_ON_CANCEL>
  }
```

```html
  <!-- In your template file -->
  <canyalib-canpay
    [dAppName]="canPay.dAppName"
    [recepient]="canPay.recepient"
    [amount]="canPay.amount"
    (complete)="canPay.complete($event)"
    (cancel)="canPay.cancel($event)"  
  ></canyalib-canpay>
```

### Modal-Component (Popup Dialog)

Nothing to be defiend in the template file, only in the controller file.

```javascript
  // In your controller file, define an object with the following params
  canPay = {
    dAppName: 'CANWork',
    recepient: <CANWORK_CONTRACT_ADDRESS>,
    amount: <AMOUNT_IN_CAN>,
    complete: <CALLBACK_ON_SUCCESS>,
    cancel: <CALLBACK_ON_CANCEL>
  }

  constructor(private canPayService: CanPayService) { }

  open() {
    this.canPayService.open(this.canPay);
  }

  onCancel(){
    this.canPayService.close();
  }
```

## Component Configuration

Here is a list of the full list of peroperties to configure the CANPay component.

| Property | Description |
| --- | --- |
| dAppName | Name of the dApp to be displayed to the user as a merchant name. |
| recepient | The dApp contract address that will receive the payment |
| amount | **Optional** If set, no amount-input-box will be displayed to the user and the specified amount will be forced.|
| minAmount | **Optional** If amount is set, this will be the minum accepted amount from the user.|
| maxAmount | **Optional** If amount is set, this will be the maximum accepted amount from the user.|
| complete | Callback to be triggered upon successful completion of the whole wizard steps. <br/> **Input:** [CanPayData](#canpaydata) |
| cancel | Callback to be triggered if the user cancelled the wizard. <br/> **Input:** [CanPayData](#canpaydata)|
| postAuthorisationProcessName| **Optional** Action name to be exexuted after payment authorisation, *Ex: 'Task Deposit'*. |
| startPostAuthorisationProcess | **Optional** callback to be triggered after a user authorisation for the requested amount. It's used to allow a developer to execute external/extended payment operation from the CanYaCoin contract to the dApp contract. <br/> **Input:** [CanPayData](#canpaydata)|
| postAuthorisationProcessResults | **Optional** if *postAuthorisationProcessName* is set. It's used to notify the wizard of the success or failure of the postAuthorisationProcess.|

## Interfaces

### CANPay

```javascript
interface CanPay {
  dAppName: string;
  operation?: Operation;
  recepient: string;
  amount?: number;
  minAmount?: number;
  maxAmount?: number;
  postAuthorisationProcessName?: string;
  postAuthorisationProcessResults?: ProcessActionResult;
  canyaContract?: Contract;
  startPostAuthorisationProcess?: Function;
  complete: Function;
  cancel?: Function;
  currentStep?: Function;
}
```

### Wizard Steps

The following are the enum for full wizard steps:

```javascript
enum Step {
  metamask = 0,
  paymentAmount = 1,
  balanceCheck = 2,
  buyCan = 3,
  authorisation = 4,
  payment = 5,
  process = 6,
  confirmation = 7,
  completed = 8
}
```

### Operation

Type of CanPay operations, default is Authorise.

```javascript
enum Operation {
  auth = 'Authorise', // Request user authoisation to withdraw CAN
  pay = 'Pay' // Request user to pay CAN directly to the specified recepient
}
```

### ProcessActionResult

A message to notify CANPay with the postAuthorisationProcess execution results.

```javascript
interface ProcessActionResult {
  type: ProcessAction; // { success = 0, error = 1 }
  msg: string; // in case of an error, optional error message to be specified
}
```

### CanPayData

Data passed to the callback functions (complete, cancel and startPostAuthorisationProcess)

| Property | Description |
| --- | --- |
| amount | Amount specified by either the developer or entered by the user |
| account | User eth address |
| balance | User CAN balance |
| step | Current wizard [Step](#wizard-steps)

### View

Customize the wizard UI to fit in small areas

```javascript
enum View {
  Normal, // default
  Compact
}
```

## Helpers

### setProcessResult

A utility function that sets the `postAuthorisationProcessResults` based on the passed in transaction param. See [usage example](./src/app/can-pay-example/can-pay-example.component.ts)

```javascript
function setProcessResult(txOrErr) {
  this.postAuthorisationProcessResults = {
    type: txOrErr.status !== 1 ? ProcessAction.error : ProcessAction.success,
    msg: txOrErr.status !== 1 ? (txOrErr.message || 'Transaction failed') : null
  };
}
```

## Complete Example

The [CanPayExample](./src/app/can-pay-example/can-pay-example.component.ts) is a fully working example on how to use the CanPay with postAuthorisationProcess params.
