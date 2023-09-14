import { BankEmployeeDto } from "./BankEmployeeDto";
import { PaymentModel } from "./PaymentModel";

export class BankEmployeeReceiptDto  {
  id: number;
  tenantId: number;
  bankEmployeeId: number;
  bankEmployee: BankEmployeeDto;
  payments: PaymentModel[] | undefined;
  lookUpId: number;
  status: string | undefined;
  amount: number;
  remainingAmount: number;
  style: string | undefined;
  isActive: boolean;
}
