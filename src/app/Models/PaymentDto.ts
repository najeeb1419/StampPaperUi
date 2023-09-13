export class PaymentDto  {
  id: number;
  tenantId: number;
  accountId: number;
  receiptId: number;
  sendingAmount: number;
  customerName: string | undefined;
  senderAccountNo: string | undefined;
  recieverAccountNo: string | undefined;
  cnic: string | undefined;
  address: string | undefined;
  creationTime:Date

}
