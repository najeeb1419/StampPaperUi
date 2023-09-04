import { MemberDto } from "./MemberDto";
import { PaymentModel } from "./PaymentModel";

export class ReceiptDto  {
  id: number;
  tenantId: number;
  memberId: number;
  member: MemberDto;
  payments: PaymentModel[] | undefined;
  lookUpId: number;
  status: string | undefined;
  amount: number;
  remainingAmount: number;
  style: string | undefined;
  isActive: boolean;
}
