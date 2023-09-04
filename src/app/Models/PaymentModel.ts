export class PaymentModel  {
  id: number;
  creationTime: undefined;
  creatorUserId: number | undefined;
  lastModificationTime:  | undefined;
  lastModifierUserId: number | undefined;
  isDeleted: boolean;
  deleterUserId: number | undefined;
  deletionTime:  undefined;
  tenantId: number;
  accountId: number;
  receiptId: number;
  sendingAmount: number;
  customerName: string | undefined;
  senderAccountNo: string | undefined;
  recieverAccountNo: string | undefined;
  cnic: string | undefined;
  address: string | undefined;
}
